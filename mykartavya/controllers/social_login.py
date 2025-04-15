import frappe 
from frappe.integrations.oauth2_logins import decoder_compat, login_via_oauth2, login_via_oauth2_id_token

@frappe.whitelist(allow_guest=True)
def my_login_via_google_method(code: str, state: str):
    # OAuth2 login via Google
    login_via_oauth2("google", code, state, decoder=decoder_compat)
    frappe.local.response["type"] = "redirect"
    frappe.local.response["location"] = "/frontend"

@frappe.whitelist(allow_guest=True)
def my_login_via_office_365_method(code: str, state: str):
    # OAuth2 login via Office 365
    login_via_oauth2_id_token("office_365", code, state, decoder=decoder_compat)
    frappe.local.response["type"] = "redirect"
    frappe.local.response["location"] = "/frontend"