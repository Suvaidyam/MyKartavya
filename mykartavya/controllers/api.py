import frappe

@frappe.whitelist()
def get_volunteers():
    volunteers = frappe.get_all("Volunteer", fields=["*"])
    return volunteers
