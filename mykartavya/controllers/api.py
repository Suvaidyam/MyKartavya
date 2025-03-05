import frappe
from frappe import _
from mykartavya.controllers.activity import Activity
from mykartavya.controllers.filter import Filters
from mykartavya.controllers.profile import Profile

@frappe.whitelist(allow_guest=True)
def sdg_data():
    return Filters.sdg_data()

@frappe.whitelist(allow_guest=True)
def get_login_details(): 
    url=frappe.get_single('Social Login'),
    return(url)

@frappe.whitelist(allow_guest=False)
def sva_user_data():
    return Profile.sva_user_data()

@frappe.whitelist()
def update_sva_user(data):
    return Profile.update_sva_user(data)

@frappe.whitelist(allow_guest=True)
def get_activity_data():
    doc = frappe.get_all(
        "Activity", 
        fields=["title","karma_points","start_date","end_date","hours","reward_description","reward_image"]   
    )
    return doc

@frappe.whitelist(allow_guest=True)
def actvolunteer_data():
    doc = frappe.get_all(
        "Volunteer Activity", 
        fields=["*"]   
    )
    return doc
@frappe.whitelist(allow_guest=True)
def get_top_users(top):
    activities = frappe.get_list(
        "Volunteer Activity",
        fields=["volunteer.full_name","karma_points","duration","volunteer.user_image"],
        order_by="karma_points DESC" ,
        limit_page_length=top,
        ignore_permissions=True
    )

    return activities

@frappe.whitelist(allow_guest=True)
def current_commitments(filter={}):
    return Activity.current_commitments(filter)

@frappe.whitelist(allow_guest=True)
def available_commitments(filter={}):
    return Activity.available_commitments(filter)

@frappe.whitelist(allow_guest=True)
def act_now(activity,volunteer):
    return Activity.act_now(activity,volunteer)

@frappe.whitelist(allow_guest=True)
def submit_activity_report(name,data):
    return Activity.submit_activity_report(name,data)

@frappe.whitelist(allow_guest=True)
def activity_details(name):
    return Activity.activity_details(name)

@frappe.whitelist(allow_guest=True)
def workflow_state():
    return Activity.workflow_state()

@frappe.whitelist(allow_guest=True)
def volunteer_act_count():
    return Activity.volunteer_act_count()

@frappe.whitelist(allow_guest=True)
def related_opportunities(name,sdgs):
    return Activity.related_opportunities(name,sdgs)

@frappe.whitelist(allow_guest=True)
def submit_feedback(name,volunteer,rating,comments):
    return Activity.submit_feedback(name,volunteer,rating,comments)

# master data
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

@frappe.whitelist(allow_guest=True)
def user_count():
    return Profile.user_count()

@frappe.whitelist(allow_guest=True)
def top_three_volunteer():
    return Profile.top_three_volunteer()
 
@frappe.whitelist(allow_guest=True)
def create_subscription(data):
    if not frappe.db.exists("Company", data["organisation"]):  
        frappe.throw(_("Invalid Company: {}").format(data["organisation"]))

    doc = frappe.get_doc({
        "doctype": "Subscribe",
        "full_name": data["name"],
        "organisation": data["organisation"],  
        "email_address": data["email"],
        "message": data["query"],
    })
    
    print(doc, "======================================================================")
    doc.insert(ignore_permissions=True)
    frappe.db.commit()
    
    return {"success": True, "message": _("Subscription added successfully.")}

@frappe.whitelist(allow_guest=True)
def sdg_impacted():
    return Profile.sdg_impacted()