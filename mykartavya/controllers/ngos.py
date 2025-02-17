import frappe
import random
import string

def after_insert(doc, method):
    if doc.registration_type == "Admin Registration":
        # Approve the NGO
        frappe.db.set_value("NGOs", doc.name)
        frappe.db.commit()
    # Create SVA User
    insert_sva_user(doc)

def get_role_profile(registration_type):
    """Get appropriate role profile based on registration type"""
    role_profile_name = "NGO Admin"  # Both registration types get NGO Admin role
    role_profile = frappe.db.exists("Role Profile", role_profile_name)
    
    if not role_profile:
        frappe.throw(f"Role Profile '{role_profile_name}' not found. Please create it first.")
    
    return role_profile_name

def insert_sva_user(doc):
    """Create SVA User with appropriate role profile and NGO link"""
    try:
        # Get user details based on registration type
        if doc.registration_type == "Admin Registration":
            first_name = doc.ngo_name
            email = doc.email
            mobile_number = doc.official_contact_number
        else:  # Self Registration
            first_name = doc.ngo_head_name
            email = doc.ngo_head_email
            mobile_number = doc.ngo_head_mobile

        password = generate_random_password()
        role_profile = get_role_profile(doc.registration_type)
        
        # Check if user already exists
        if frappe.db.exists("SVA User", {"email": email}):
            frappe.throw(f"SVA User with email {email} already exists")
        
        sva_user = frappe.get_doc({
            "doctype": "SVA User",
            "email": email,
            "first_name": first_name,
            "last_name": "",  # Since we only have full name
            "password": password,
            "mobile_number": mobile_number,
            "confirm_password": password,
            "role_profile": role_profile,
            "enabled": 1
        })
        
        sva_user.insert(ignore_permissions=True)
        frappe.db.commit()
        
        frappe.msgprint(
            f"NGO Admin SVA User created successfully!\nEmail: {email}\nRole Profile: {role_profile}",
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
