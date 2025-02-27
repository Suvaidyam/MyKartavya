import frappe

class Filters:
    def sdg_data():
        sdg = frappe.get_all(
            "SDG", 
            fields=["*"]   
        )
        return sdg