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

