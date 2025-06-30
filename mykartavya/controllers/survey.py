import frappe
from frappe import _

def survey(name):
    survey_list= frappe.get_all("Survey", filters={"activity": name,"status":"Published"
        },fields=["name", "title", "description", "deadline_date", "status",'form_json'])
   
    return survey_list
    