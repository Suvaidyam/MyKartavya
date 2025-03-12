import frappe
from frappe import _
from mykartavya.controllers.activity import Activity
from mykartavya.controllers.filter import Filters
from mykartavya.controllers.profile import Profile


# @frappe.whitelist(allow_guest=True)
# def get_ngos_by_state():
#     ngos = frappe.get_all(
#         "NGO",
#         fields=["state", "COUNT(name) as count"],
#         group_by="state",
#         order_by="count DESC"
#     )
#     return ngos

@frappe.whitelist(allow_guest=True)
def get_ngos_by_state():
    # return 'Hello World'
    try:
        query = """
            SELECT s.state_name, COUNT(n.name) AS total_ngos
            FROM `tabNGOs` n
            JOIN `tabState` s ON n.state = s.state_code
            GROUP BY s.state_name
            ORDER BY total_ngos DESC;
        """
        data = frappe.db.sql(query, as_dict=True)
        return data
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), _("Error fetching NGOs by state"))
        return {"error": str(e)}



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
def get_top_users(page=1, page_size=10):
    try:
        page = int(page)
        page_size = int(page_size)
        start = (page - 1) * page_size

        activities = frappe.get_list(
            "Volunteer Activity",
            fields=["volunteer.full_name", "karma_points", "duration", "volunteer.user_image"],
            order_by="karma_points DESC",
            start=start,
            page_length=page_size,
            ignore_permissions=True
        )

        total_users = frappe.db.count("Volunteer Activity")

        return {
            "users": activities,
            "total_users": total_users,
            "total_pages": (total_users + page_size - 1) // page_size,
            "current_page": page
        }
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "get_top_users Error")
        return {"error": str(e)}


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
def check_user_fields():
    return Profile.check_user_fields()

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
     
    doc.insert(ignore_permissions=True)
    frappe.db.commit()
    
    return {"success": True, "message": _("Subscription added successfully.")}

@frappe.whitelist(allow_guest=True)
def sdg_impacted():
    return Profile.sdg_impacted()