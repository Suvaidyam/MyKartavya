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
        self.validate_contact_details()
        # self.validate_address()
        self.validate_organization_details()
        self.validate_company_logo()
        
    def validate_company_name(self):
        if len(self.company_name) > 100:
            frappe.throw("Company Name cannot exceed 100 characters")
            
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

                    
    def validate_contact_details(self):
        # Validate names
        if len(self.first_name) > 100:
            frappe.throw("First Name cannot exceed 100 characters")
            
        if len(self.last_name) > 100:
            frappe.throw("Last Name cannot exceed 100 characters")

        if not self.designation:
            self.designation = ""   

        if len(self.designation) > 100:
            frappe.throw("Designation cannot exceed 100 characters")

        # Email validation
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, self.email):
            frappe.throw("Invalid Email format")
            
        # Phone number validation
        if self.phone and not re.match(r'^\d{10,15}$', self.phone):
            frappe.throw("Phone number must be between 10 and 15 digits")
            
        # Mobile number validation
        if not re.match(r'^\d{10}$', self.mobile_number):
            frappe.throw("Mobile Number must be exactly 10 digits")
            
        # Validate volunteering incharge details if Admin Registration
        if self.registration_type == "Admin Registration":
            if self.volunteering_incharge_email and not re.match(email_pattern, self.volunteering_incharge_email):
                frappe.throw("Invalid Volunteering InCharge Email format")
                
            if self.volunteering_incharge_phone and not re.match(r'^\d{10,15}$', self.volunteering_incharge_phone):
                frappe.throw("Volunteering InCharge Phone must be between 10 and 15 digits")
                    
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
            min_size = 1 * 1024 * 1024  # 1MB in bytes
            max_size = 5 * 1024 * 1024  # 5MB in bytes
            
            if not (min_size <= file_size <= max_size):
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
    

def after_insert(doc, method):
    if doc.registration_type == "Admin Registration":
        # Approve the company
        frappe.db.set_value("Company", doc.name, "workflow_state", "Approved")
        frappe.db.commit()
    
    # Create SVA User for both registration types
    insert_sva_user(doc)

def get_role_profile(registration_type):
    """Get appropriate role profile based on registration type"""
    role_profile_name = "Company Admin"

    role_profile = frappe.db.exists("Role Profile", role_profile_name)
    
    if not role_profile:
        frappe.throw(f"Role Profile '{role_profile_name}' not found. Please create it first.")
    
    return role_profile_name

def insert_sva_user(doc):
    """Create SVA User with appropriate role profile and company link"""
    try:
        # Create Company Admin user
        email = doc.email
        first_name = doc.first_name
        last_name = doc.last_name
        mobile_number = doc.mobile_number
        password = generate_random_password()
        role_profile = get_role_profile(doc.registration_type)
        country=doc.country
        state=doc.state
        city=doc.city
        designation= doc.designation
        
        # Check if user already exists
        if frappe.db.exists("SVA User", {"email": email}):
            frappe.throw(f"SVA User with email {email} already exists")
        
        sva_user = frappe.get_doc({
            "doctype": "SVA User",
            "email": email,
            "first_name": first_name,
            "last_name": last_name,
            "password": password,
            "mobile_number": mobile_number,
            "confirm_password": password,
            "custom_company": doc.name, 
            "role_profile": role_profile,
            "custom_country":country,
            "custom_state":state,
            "custom_city":city, 
            "custom_designation":designation,
            "custom_volunteer_type":"Employee",
            "enabled": 1
        })
        
        sva_user.insert(ignore_permissions=True)
        frappe.db.commit()
        
        frappe.msgprint(
            f"Company Admin SVA User created successfully!\nEmail: {email}\nRole Profile: {role_profile}",
            alert=True
        )
        
        # Create Volunteer Incharge user if Admin Registration
        if doc.registration_type == "Admin Registration":
            incharge_email = doc.volunteering_incharge_email
            incharge_password = generate_random_password()
            
            # Check if incharge user already exists
            if frappe.db.exists("SVA User", {"email": incharge_email}):
                frappe.throw(f"SVA User with email {incharge_email} already exists")
            
            incharge_user = frappe.get_doc({
                "doctype": "SVA User",
                "email": incharge_email,
                "first_name": doc.volunteering_incharge_name,
                "last_name": "",
                "password": incharge_password,
                "mobile_number": doc.volunteering_incharge_phone,
                "confirm_password": incharge_password,
                "custom_company": doc.name,
                "custom_country":country,
                "custom_state":state,
                "custom_city":city,
                "role_profile": "Volunteer Incharge",
                "custom_designation":designation,
                "enabled": 1
            })
            
            incharge_user.insert(ignore_permissions=True)
            frappe.db.commit()
            
            frappe.msgprint(
                f"Volunteer Incharge SVA User created successfully!\nEmail: {incharge_email}\nRole Profile: Volunteer Incharge",
                alert=True
            )
            
    except Exception as e:
        frappe.log_error(f"Failed to create SVA User: {str(e)}")
        frappe.throw(f"Failed to create SVA User: {str(e)}")

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

