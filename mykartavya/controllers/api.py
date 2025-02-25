import frappe
from frappe import _

@frappe.whitelist(allow_guest=True)
def sdg_data():
    sdg = frappe.get_all(
        "SDG", 
        fields=["*"]   
    )
    return sdg

@frappe.whitelist(allow_guest=True)
def get_login_details(): 
    url=frappe.get_single('Social Login'),
    return(url)

@frappe.whitelist(allow_guest=False)
def sva_user_data():
    user = frappe.session.user
    doc = frappe.get_all(
        "SVA User", 
        filters={"email": user}, 
        fields=["name","mobile_number","full_name","first_name","last_name","email","user_image","custom_employee_id","custom_date_of_birth","custom_background_image","custom_company","custom_country","custom_state","custom_city"]
    )
    return doc

@frappe.whitelist()
def update_sva_user(data):
    data = frappe.parse_json(data)
    user_email = frappe.session.user  # Logged-in user's email or user_id (depending on your setup)

    # Fetch the user document using the email (or user_id if applicable)
    user_doc = frappe.get_doc("SVA User", {"email": user_email})

    if user_doc:
        # Update the document with new data
        user_doc.update(data)
        user_doc.save(ignore_permissions=True)  
        frappe.db.commit()  # Commit the changes to the database
        return {"success": True, "message": "User updated successfully"}
    return {"success": False, "message": "User not found"}

@frappe.whitelist(allow_guest=True)
def country_data():
    country = frappe.get_all(
        "Country", 
        fields=["*"]   
    )
    return country

@frappe.whitelist(allow_guest=True)
def state_data(country):
    state = frappe.get_all(
        "State", 
        filters={"custom_country": country},
        fields=["*"]   
    )
    return state
   

@frappe.whitelist(allow_guest=True)
def city_data(state):
    city = frappe.get_all(
        "District", 
        filters={"state": state},
        fields=["*"]   
    )
    return city
    
@frappe.whitelist(allow_guest=True)
def company_data():
    company = frappe.get_all(
        "Company", 
        fields=["*"]   
    )
    return company