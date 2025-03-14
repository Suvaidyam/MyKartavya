import frappe
from frappe import _
from frappe.model.document import Document
from datetime import datetime
import re
import frappe
import random
import string

class NGOs(Document):
    def validate(self):
        """
        Validate the NGO document before saving
        """
        self.validate_contact_numbers()
        self.validate_email_addresses()
        self.validate_website()
        self.validate_pincode()
        self.validate_goals()
        self.validate_text_lengths()
        
    def validate_text_lengths(self):
        """
        Validate text field lengths
        """
        if len(self.ngo_name) > 255:
            frappe.throw(_("NGO Name cannot exceed 255 characters"))
            
        if self.designation and len(self.designation) > 100:
            frappe.throw(_("Designation cannot exceed 100 characters"))
            
        if self.description and len(self.description) > 2000:
            frappe.throw(_("Description cannot exceed 2000 characters"))
            
        if self.registration_type == 'Admin Registration' and self.location and len(self.location) > 500:
            frappe.throw(_("Location cannot exceed 500 characters"))

    def validate_contact_numbers(self):
        """
        Validate phone number formats
        """
        phone_fields = ['official_contact_number']
        
        if self.registration_type == 'Self Registration':
            phone_fields.extend(['ngo_head_mobile', 'ngo_head_office_number'])

        phone_pattern = re.compile(r'^\d{10}$')
        
        for field in phone_fields:
            value = self.get(field)
            if value:
                # Remove any spaces or hyphens before validation
                cleaned_number = re.sub(r'[\s-]', '', value)
                if not phone_pattern.match(cleaned_number):
                    frappe.throw(
                        _("Invalid phone number format for {0}. Please enter a valid 10-digit phone number.").format(
                            frappe.bold(_(self.meta.get_label(field)))
                        )
                    )

    def validate_email_addresses(self):
        """
        Validate email address formats
        """
        email_fields = ['email']
        
        if self.registration_type == 'Self Registration':
            email_fields.append('ngo_head_email')

        email_pattern = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
        
        for field in email_fields:
            if self.get(field):
                if not email_pattern.match(self.get(field).lower()):
                    frappe.throw(
                        _("Invalid email format for {0}. Please enter a valid email address.").format(
                            frappe.bold(_(self.meta.get_label(field)))
                        )
                    )

    def validate_website(self):
        """
        Validate website URL format
        """
        if self.registration_type == 'Self Registration' and self.website:
            url_pattern = re.compile(
                r'^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$'
            )
            if not url_pattern.match(self.website):
                frappe.throw(_("Invalid website URL format. Please enter a valid URL starting with http:// or https://"))

    def validate_pincode(self):
        """
        Validate pincode format
        """
        if self.registration_type == 'Self Registration' and self.pincode:
            if not re.match(r'^\d{6}$', self.pincode):
                frappe.throw(_("Pincode must be exactly 6 digits"))

    def validate_goals(self):
        """
        Validate that priority goals are not duplicated
        """
        if self.registration_type == 'Admin Registration':
            goals = [
                self.first_priority_goal,
                self.second_priority_goal,
                self.third_priority_goal
            ]
            
            # Remove any None values
            goals = [g for g in goals if g]
            
            if len(set(goals)) != len(goals):
                frappe.throw(_("Priority Goals must be unique. Please select different goals for each priority level."))

def after_insert(doc, method):
    if doc.registration_type == "Self Registration":
        # Approve the NGO
        frappe.db.set_value("NGOs", doc.name, "workflow_state", "Pending Approval")
        frappe.db.commit()
    # Create both NGO Admin and Volunteer users
    create_ngo_users(doc)

def get_role_profile(role_type):
    """Get appropriate role profile"""
    role_profile_name = role_type
    role_profile = frappe.db.exists("Role Profile", role_profile_name)
    
    if not role_profile:
        frappe.throw(f"Role Profile '{role_profile_name}' not found. Please create it first.")
    
    return role_profile_name

def create_ngo_users(doc):
    """Create both NGO Admin and Volunteer users"""
    try:
        # Create NGO Admin user
        if doc.ngo_name and doc.email and doc.official_contact_number:
            create_sva_user(
                first_name=doc.ngo_name,
                email=doc.email,
                mobile_number=doc.official_contact_number,
                role_profile="NGO Admin",
                custom_designation=doc.designation,
                doc=doc
            )

        # Create Volunteer user
        if doc.ngo_head_name and doc.ngo_head_email and doc.ngo_head_mobile:
            create_sva_user(
                first_name=doc.ngo_head_name,
                email=doc.ngo_head_email,
                mobile_number=doc.ngo_head_mobile,
                custom_designation=doc.designation,
                role_profile="Volunteer",
                custom_volunteer_type="NGO Member",
                doc=doc
            )
            
    except Exception as e:
        frappe.log_error(f"Failed to create SVA Users: {str(e)}")
        frappe.throw(f"Failed to create SVA Users: {str(e)}")

def create_sva_user(first_name, email, mobile_number, role_profile, doc,custom_designation=None):
    """Create individual SVA User with appropriate role profile and NGO link"""
    try:
        password = generate_random_password()
        role_profile_name = get_role_profile(role_profile)
        
        # Check if user already exists
        if frappe.db.exists("SVA User", {"email": email}):
            frappe.throw(f"SVA User with email {email} already exists")
        
        sva_user = frappe.get_doc({
            "doctype": "SVA User",
            "email": email,
            "first_name": first_name,
            "last_name": "",
            "new_password": password,
            "mobile_number": mobile_number,
            "role_profile": role_profile_name,
            "custom_country": doc.country,
            "custom_state": doc.state,
            "custom_city": doc.city,
            "custom_ngo": doc.name,
            "custom_designation": custom_designation,
            "custom_volunteer_type":"NGO Member",
            "enabled": 1
        })
        
        sva_user.insert(ignore_permissions=True)
        if sva_user.custom_volunteer_type == "NGO Member":
            sva_user.append("table_pdop", {
                "module": "NGOs",
                "value": doc.name,
            })
        sva_user.save()
        if sva_user.custom_volunteer_type == "NGO Member":
            frappe.db.set_value("SVA User", sva_user.name, "workflow_state", "Approved")

        frappe.db.commit()
        
        frappe.msgprint(
            f"{role_profile} SVA User created successfully!\nEmail: {email}\nRole Profile: {role_profile_name}",
            alert=True
        )
            
    except Exception as e:
        frappe.log_error(f"Failed to create {role_profile} SVA User: {str(e)}")
        frappe.throw(f"Failed to create {role_profile} SVA User: {str(e)}")

def generate_random_password(length=10):
    """Generate a stronger random password"""
    # Include at least one of each: uppercase, lowercase, digit, and special character
    characters = string.ascii_letters + string.digits + "!@#$%^&*"
    password = [
        random.choice(string.ascii_uppercase),
        random.choice(string.ascii_lowercase),
        random.choice(string.digits),
        random.choice("!@#$%^&*")
    ]
    
    # Fill the rest with random characters
    for _ in range(length - 4):
        password.append(random.choice(characters))
    
    # Shuffle the password
    random.shuffle(password)
    return ''.join(password)
