import frappe
from frappe import _
from frappe.model.document import Document
from datetime import datetime
import re
import random
import string


class NGOs(Document):
    def validate(self):
        """
        Validate the NGO document before saving
        """
        self.validate_contact_numbers()
        self.validate_website()
        self.validate_pincode()
        self.validate_goals()
        self.validate_ngo_logo()

    def validate_ngo_logo(self):
        if self.registration_type != "Self Registration":
            return 
        file_doc = frappe.db.get_value("File", {"file_url": self.ngo_logo}, ["file_size", "file_name"])

        if not file_doc:
            frappe.throw(f"File not found for NGO Logo: {self.ngo_logo}")

        file_size, file_name = file_doc  # Unpack tuple correctly
        allowed_extensions = {"jpg", "jpeg", "png", "webp"}
        file_extension = file_name.split(".")[-1].lower()
        max_size = 5 * 1024 * 1024  # 5MB in bytes

        if file_extension not in allowed_extensions:
         frappe.throw("Invalid file type. Only JPG, JPEG, PNG, and WEBP are allowed.")

        if file_size > max_size:
            frappe.throw("File size exceeds 5 MB limit.")


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
    if doc.registration_type == "Admin Registration":
        # Approve the NGO
        frappe.db.set_value("NGOs", doc.name, "workflow_state", "Approved")
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
                custom_volunteer_type="NGO Member",
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

def create_sva_user(first_name, email, mobile_number, role_profile, doc, custom_designation=None, custom_volunteer_type=None):
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
            "custom_volunteer_type": custom_volunteer_type,
            "enabled": 1
        })
        
        sva_user.insert(ignore_permissions=True)
        sva_user=frappe.get_doc("SVA User",sva_user.name)
        sva_user.save(ignore_permissions=True)
        
        if sva_user.custom_volunteer_type == "NGO Member":
            frappe.db.set_value("SVA User", sva_user.name, "workflow_state", "Approved",update_modified=False)
            frappe.db.commit()
        
        frappe.msgprint(
            f"{role_profile} SVA User created successfully!\nEmail: {email}\nRole Profile: {role_profile_name}",
            alert=True
        )
            
    except Exception as e:
        frappe.log_error(f"Failed to create {role_profile} SVA User: {str(e)}")
        frappe.throw(f"Failed to create {role_profile} SVA User: {str(e)}")

def generate_random_password(length=10):
    """Generate a strong random password"""
    characters = string.ascii_letters + string.digits + "!@#$%^&*"
    return ''.join(random.choice(characters) for _ in range(length))

    
