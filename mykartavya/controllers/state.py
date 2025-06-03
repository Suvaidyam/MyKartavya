import frappe
from frappe import _



@frappe.whitelist()
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



@frappe.whitelist()
def get_ngos_by_state(state_name):
    if not state_name:
        return {"error": "State name is required"}

    ngos = frappe.get_all("NGOs", 
        filters={"state": state_name},
        fields=["name", "ngo_name", "state", "email", "pincode", "location","ngo_logo"],
    )
    return ngos

@frappe.whitelist()
def ngo(name=None):
    filters = {}
    if name:
        filters["name"] = name

    ngos = frappe.get_all(
        "NGOs", 
        filters=filters,
        fields=["name", "ngo_name", "state", "email", "pincode", "location", "ngo_logo","description","address","website"]
    )
    return ngos



