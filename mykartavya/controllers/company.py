import frappe
import random
import string
from datetime import datetime

def after_insert(doc, method):
    if doc.registration_type == "Admin Registration":
        # Approve the company
        frappe.db.set_value("Company", doc.name, "workflow_state", "Approved")
        frappe.db.commit()
    
    # Create SVA User for both registration types
    insert_sva_user(doc)
    
    # Send welcome email
    # send_message(doc)

def get_role_profile(registration_type):
    """Get appropriate role profile based on registration type"""
    role_profile_name = "Company Admin" if registration_type == "Admin Registration" else "Company Admin"
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
        mobile_number=doc.mobile_number
        password = generate_random_password()
        role_profile = get_role_profile(doc.registration_type)
        
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
                "last_name": "",  # Since we only have full name
                "password": incharge_password,
                "mobile_number": doc.volunteering_incharge_phone,
                "confirm_password": incharge_password,
                "custom_company": doc.name,
                "role_profile": "Volunteer Incharge",
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

def send_message(doc):
    """Send welcome email to the new company user"""
    if not doc.email:
        frappe.throw("Email is required for sending notifications.")

    registration_type = "Admin" if doc.registration_type == "Admin Registration" else "Self"
    message = f"""
    Dear {doc.first_name} {doc.last_name},
    
    Welcome to our platform! Your {registration_type} Registration has been completed successfully.
    
    Company Name: {doc.company_name}
    Registration Type: {doc.registration_type}
    
    You can now log in to your account using your email address: {doc.email}
    
    Best regards,
    The Team
    """

    try:
        frappe.sendmail(
            recipients=doc.email,
            subject=f"Welcome - {registration_type} Registration Successful",
            message=message,
            delayed=False
        )
    except Exception as e:
        frappe.log_error(f"Failed to send welcome email: {str(e)}")