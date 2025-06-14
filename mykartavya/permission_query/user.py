import frappe

def list_to_tuple_string(user_permissions):
    return "(" + ",".join(f"'{item}'" for item in user_permissions) + ")"
def permission_query_condition(user):
    if user == "Administrator":
        return ""
    else:
        user_role = frappe.db.get_value("SVA User", {"email": user},'role_profile')
        if user_role == "Company Admin":
            user_permissions = frappe.db.get_all("User Permission",filters={"user": user,'allow':"Company"},pluck="for_value")
            if len(user_permissions):
                return f"custom_company IN {list_to_tuple_string(user_permissions)}"
        elif user_role == "NGO Admin":
            user_permissions = frappe.db.get_all("User Permission",filters={"user": user,'allow':"NGOs"},pluck="for_value")
            if len(user_permissions):
                return f"custom_ngo IN {list_to_tuple_string(user_permissions)}"
    return ""