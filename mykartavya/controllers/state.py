import frappe
from frappe import _

@frappe.whitelist(allow_guest=True)
def get_state():
    states = frappe.get_all("State", fields=["name", "state_name"], limit_page_length=200)
    state_name_map = {state["name"]: state["state_name"] for state in states}

    ngos = frappe.get_all("NGOs", fields=["name", "state"], order_by="state asc", limit_page_length=1000)

    state_map = {}

    for ngo in ngos:
        state = ngo.get("state")
        if not state:
            continue

        full_state_name = state_name_map.get(state, state)

        if state not in state_map:
            state_map[state] = {
                "name": state,
                "state_name": full_state_name,
                "ngos": 1,
                "ngo_list": [ngo["name"]]
            }
        else:
            state_map[state]["ngos"] += 1
            state_map[state]["ngo_list"].append(ngo["name"])

    # Convert state_map to list of dicts
    state_list = list(state_map.values())

    return {
        "states": state_list
    }



@frappe.whitelist(allow_guest=True)
def get_ngos_by_state(state_name):
    if not state_name:
        return {"error": "State name is required"}

    ngos = frappe.get_all("NGOs", 
        filters={"state": state_name},
        fields=["name", "ngo_name", "state", "email", "pincode", "location","ngo_logo"],
    )
    return ngos

@frappe.whitelist(allow_guest=True)
def ngo(name=None):
    filters = {}
    if name:
        filters["name"] = name

    ngos = frappe.get_all(
        "NGOs", 
        filters=filters,
        fields=[
            "name", "ngo_name", "state", "email", "pincode", "location", "ngo_logo",
            "description", "address", "website",
            "first_priority_goal", "second_priority_goal", "third_priority_goal"
        ]
    )

    for ngo in ngos:
        # Get SDG images for all 3 priority goals
        if ngo.get("first_priority_goal"):
            ngo["first_priority_goal_image"] = frappe.get_value("SDG", ngo["first_priority_goal"], "sdg_image")
        if ngo.get("second_priority_goal"):
            ngo["second_priority_goal_image"] = frappe.get_value("SDG", ngo["second_priority_goal"], "sdg_image")
        if ngo.get("third_priority_goal"):
            ngo["third_priority_goal_image"] = frappe.get_value("SDG", ngo["third_priority_goal"], "sdg_image")

        # ✅ Get activities where Activity.ngo == ngo.name
        ngo["activities"] = frappe.get_all(
            "Activity",
            filters={"ngo": ngo["name"]},  
            fields=["name","title","activity_type","start_date","end_date","karma_points","activity_image"],
        )
        ngo["opportunity"] = frappe.get_all(
            "Opportunity",
            filters={"ngo": ngo["name"]},  
            fields=["name","opportunity_name","opportunity_type","start_date","end_date","karma_points","opportunity_image"],
        )
    return ngos






