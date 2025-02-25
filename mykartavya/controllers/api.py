import frappe
from frappe import _

@frappe.whitelist(allow_guest=True)
def sdg_data():
    sdg = frappe.get_all(
        "SDG", 
        fields=["*"]   
    )
    return sdg

@frappe.whitelist(allow_guest=False)
def sva_user_data():
    user = frappe.session.user
    doc = frappe.get_all(
        "SVA User", 
        filters={"email": user}, 
        fields=["name","mobile_number","full_name","first_name","last_name","email","user_image","custom_employee_id","custom_date_of_birth","custom_background_image","custom_company.company_name as custom_company","custom_country","custom_state.state_name as custom_state","custom_city.district_name as custom_city"]
    )
    return doc

@frappe.whitelist()
def update_sva_user(data):
    data = frappe.parse_json(data)
    user_email = frappe.session.user  # Logged-in user's email or user_id (depending on your setup)

    # Fetch the user document using the email (or user_id if applicable)
    user_doc = frappe.get_doc("SVA User", {"email": user_email})

    if user_doc:
        # Validate and update state and city
        state_value = data.get("custom_state")
        city_value = data.get("custom_city")

        if state_value:
            state_record = frappe.get_value("State", {"state_name": state_value}, "name")
            if not state_record:
                return {"success": False, "message": f"State '{state_value}' not found."}
            data["custom_state"] = state_record

        if city_value:
            city_record = frappe.get_value("District", {"district_name": city_value}, "name")
            if not city_record:
                return {"success": False, "message": f"City '{city_value}' not found."}
            data["custom_city"] = city_record

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
        filters={"country": country},
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