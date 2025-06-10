# Copyright (c) 2025, Aniket Singh and contributors
# For license information, please see license.txt

import frappe
import random
import string
from frappe.model.document import Document
import re
from datetime import datetime
import os


class Company(Document):
    def validate(self):
        self.validate_company_name()
        self.validate_registration_dates()
        # self.validate_address()
        self.validate_organization_details()
        self.validate_company_logo()

    def validate_company_name(self):
        # Check for uniqueness
        existing = frappe.db.exists("Company", {
            "company_name": self.company_name,
            "name": ("!=", self.name)
        })
        if existing:
            frappe.throw("Company Name must be unique")

    def validate_registration_dates(self):
        if self.registration_type == "Self Registration":
            if self.company_registration_date:
                # Ensure company_registration_date is converted from string to date
                if isinstance(self.company_registration_date, str):
                    self.company_registration_date = datetime.strptime(self.company_registration_date, "%Y-%m-%d").date()

                if self.company_registration_date > datetime.now().date():
                    frappe.throw("Company Registration Date cannot be a future date")

        else:  # Admin Registration
            if self.company_registration_year:
                try:
                    year = int(self.company_registration_year)
                    current_year = datetime.now().year
                    if not (1800 <= year <= current_year):
                        frappe.throw("Company Registration Year must be between 1800 and the current year")
                except ValueError:
                    frappe.throw("Invalid Company Registration Year format")

    def validate_address(self):
        if self.pincode:
            if not re.match(r'^\d{6}$', self.pincode):
                frappe.throw("Pincode must be exactly 6 digits")

        # Validate state belongs to country
        if self.state and self.country:
            state = frappe.get_doc("State", self.state)
            if state.country != self.country:
                frappe.throw("Selected State does not belong to the selected Country")

    def validate_organization_details(self):
        if self.registration_type == "Self Registration":
            if self.number_of_employees is not None and self.number_of_employees < 1:
                frappe.throw("Number of Employees must be at least 1")

            if self.volunteering_csr_activities is not None:
                if not (0 <= self.volunteering_csr_activities <= 100):
                    frappe.throw("Volunteering CSR Activities Cost must be between 0 and 100")

            if self.employee_engagement is not None:
                if not (0 <= self.employee_engagement <= 100):
                    frappe.throw("Employee Engagement Coverage must be between 0 and 100")

    def validate_company_logo(self):
        if self.registration_type == "Admin Registration" and self.company_logo:
            # Get file extension
            _, file_extension = os.path.splitext(self.company_logo)
            file_extension = file_extension.lower()

            # Validate file format
            allowed_formats = ['.jpg', '.jpeg', '.png', '.svg', '.webp']
            if file_extension not in allowed_formats:
                frappe.throw("Company Logo must be in JPG, PNG, SVG, WEBP, or JPEG format")

            # Validate file size (1MB to 5MB)
            file_size = frappe.get_doc("File", {"file_url": self.company_logo}).file_size
            max_size = 5 * 1024 * 1024  # 5MB
            if file_size > max_size:
                 frappe.throw("Company Logo file size must be between 1MB and 5MB")

    def before_save(self):
        # Strip whitespace from text fields
        self.company_name = self.company_name.strip()
        self.first_name = self.first_name.strip()
        self.last_name = self.last_name.strip()
        if self.designation:
            self.designation = self.designation.strip()
        else:
            self.designation = ""

        if self.registration_type == "Admin Registration":
            if self.volunteering_incharge_name:
                self.volunteering_incharge_name = self.volunteering_incharge_name.strip()

        if self.india_headquarters_address:
            self.india_headquarters_address = self.india_headquarters_address.strip()

    def after_insert(doc):
        if doc.registration_type == "Admin Registration":
            frappe.db.set_value("Company", doc.name, "workflow_state", "Approved")
            status = frappe.db.get_value("Company", doc.name, "workflow_state")
            frappe.db.set_value("Company", doc.name, "registration_status", status)

        # Create SVA User for both registration types
        insert_sva_user(doc)
        test(doc)

def get_role_profile(registration_type):
    """Get appropriate role profile based on registration type"""
    role_profile_name = "Volunteer"

    role_profile = frappe.db.exists("Role Profile", role_profile_name)

    if not role_profile:
        frappe.throw(f"Role Profile '{role_profile_name}' not found. Please create it first.")

    return role_profile_name

def insert_sva_user(doc):
    """SVA User को create करें, और अगर error आए तो 3 बार तक कोशिश करें"""

    max_retries = 3  # अधिकतम 3 बार कोशिश करेंगे
    for attempt in range(max_retries):
        try:
            email = doc.email
            if frappe.db.exists("SVA User", {"email": email}):
                frappe.throw(f"SVA User with email {email} already exists")

            # नया SVA User डॉक्यूमेंट बनाएं
            sva_user = frappe.get_doc({
                "doctype": "SVA User",
                "email": email,
                "first_name": doc.first_name,
                "last_name": doc.last_name,
                "password": generate_random_password(),
                "confirm_password": generate_random_password(),
                "custom_phone_number": str(doc.phone),
                "mobile_number": doc.mobile_number,
                "custom_company": doc.name,
                "role_profile": "Company Admin",
                "custom_country": doc.country,
                "custom_state": doc.state,
                "custom_city": doc.city,
                "custom_designation": doc.designation,
                "custom_volunteer_type": "Employee",
                "enabled": 1
            })

            # DB में insert करें
            sva_user.insert(ignore_permissions=True)

            # Workflow state को "Approved" सेट करें
            if sva_user.custom_volunteer_type == "Employee":
                frappe.db.set_value("SVA User", sva_user.name, "workflow_state", "Approved", update_modified=False)

            # बदलावों को commit करें
            frappe.db.commit()
            return

        except frappe.QueryTimeoutError as e:
            # अगर lock की वजह से error आया, तो दुबारा कोशिश करें
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)  # 1s, फिर 2s, फिर 4s रुकें
                continue
            # 3 बार कोशिश के बाद भी ना हो, तो error दिखाएं
            frappe.throw("SVA User बनाने में database timeout हुआ। कृपया दुबारा प्रयास करें।")

        except Exception as e:
            # कोई और error आए तो log करें और user को दिखाएं
            frappe.throw(f"SVA User बनाने में असफल: {str(e)}")


        # frappe.msgprint(
        #     f"Company Admin SVA User created successfully!\nEmail: {email}\nRole Profile: {role_profile}",
        #     alert=True
        # )

        # # Create Volunteer Incharge user if Admin Registration
        # if doc.registration_type == "Admin Registration":
        #     incharge_email = doc.volunteering_incharge_email
        #     incharge_password = generate_random_password()

        #     # Check if incharge user already exists
        #     if frappe.db.exists("SVA User", {"email": incharge_email}):
        #         frappe.throw(f"SVA User with email {incharge_email} already exists")

        #     incharge_user = frappe.get_doc({
        #         "doctype": "SVA User",
        #         "email": incharge_email,
        #         "first_name": doc.volunteering_incharge_name,
        #         "last_name": "",
        #         "password": incharge_password,
        #         # "custom_phone_number": doc.volunteering_incharge_phone,
        #         "confirm_password": incharge_password,
        #         "custom_company": doc.name,
        #         "custom_country": country,
        #         "custom_state": state,
        #         "custom_city": city,
        #         "role_profile": "Company Admin",
        #         "custom_designation": designation,
        #         "custom_volunteer_type": "Employee",
        #         "enabled": 1
        #     })

        #     incharge_user.insert(ignore_permissions=True)
        #     incharge_user = frappe.get_doc("SVA User", incharge_user.name)
        #     incharge_user.save(ignore_permissions=True)

        #     if incharge_user.custom_volunteer_type == "Employee":
        #         frappe.db.set_value("SVA User", incharge_user.name, "workflow_state", "Approved",update_modified=False)
        #     frappe.db.commit()

        #     frappe.msgprint(
        #         f"Volunteer Incharge SVA User created successfully!\nEmail: {incharge_email}\nRole Profile: Volunteer Incharge",
        #         alert=True
        #     )

  
def generate_random_password(length=10):
    """Generate a stronger random password"""
    characters = string.ascii_letters + string.digits + "!@#$%^&*"
    password = [
        random.choice(string.ascii_uppercase),
        random.choice(string.ascii_lowercase),
        random.choice(string.digits),
        random.choice("!@#$%^&*")
    ]

    for _ in range(length - 4):
        password.append(random.choice(characters))

    random.shuffle(password)
    return ''.join(password)

def test(doc):
    logo = frappe.new_doc("Company Logos")
    logo.update({
        "company_name": doc.company_name,
        "company_logo": doc.company_logo,
        "enabled": 1
    })
    logo.insert(ignore_permissions=True)
