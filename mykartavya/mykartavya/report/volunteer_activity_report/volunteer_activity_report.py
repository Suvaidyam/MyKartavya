# Copyright (c) 2025, Aniket Singh and contributors
# For license information, please see license.txt

# import frappe
from frappe import _
import frappe


def execute(filters: dict | None = None):
    
    if not filters:
        filters = {}    
    
    columns = get_columns()
    data = get_data(filters)
    return columns, data    
 

def get_columns() -> list[dict]:
    """Return columns for the report.

    One field definition per column, just like a DocType field definition.
    """
    return [
        {
            "label": _("Date Created"),
            "fieldname": "creation",
            "fieldtype": "Datetime",
            "width": 100,
        },
        {
            "label": _("Volunteer"),
            "fieldname": "full_name",
            "fieldtype": "Data",
            "width": 200,
        },
        {
            "label": _("Email"),
            "fieldname": "email",
            "fieldtype": "Data",
            "width": 200,
        },
        {
            "label": _("Phone Number"),
            "fieldname": "custom_phone_number",
            "fieldtype": "Data",
        },
        {
            "label": _("Activity Title"),
            "fieldname": "title",
            "fieldtype": "Data",
            "width": 200,
        },
        {
            "label": _("Start Date"),
            "fieldname": "start_date",
            "fieldtype": "Datetime",
        },
        {
            "label": _("End Date"),
            "fieldname": "end_date",
            "fieldtype": "Datetime",
        },
        {
            "label": _("Status Of Activity"),
            "fieldname": "status",
            "fieldtype": "select",
        },
        {
            "label": _("Individual OR BY Corporate"),
            "fieldname": "custom_volunteer_type",
            "fieldtype": "select",
            "width":150,
        },
        {
            "label": _("Duration (in hours)"),
            "fieldname": "duration",
            "fieldtype": "Data",  
            "width": 120
        }
    ]

from datetime import datetime

def list_to_tuple_string(user_permissions):
    return "(" + ",".join(f"'{item}'" for item in user_permissions) + ")"
def get_data(filters):
    conditions = []
    values = []
    user = frappe.session.user
    if user != "Administrator":
        user_role = frappe.db.get_value("SVA User", {"email": user},'role_profile')
        if user_role == "Company Admin":
            user_permissions = frappe.db.get_all("User Permission",filters={"user": user,'allow':"Company"},pluck="for_value")
            if len(user_permissions):
                conditions.append(f"v.custom_company IN {list_to_tuple_string(user_permissions)}")
        elif user_role == "NGO Admin":
            user_permissions = frappe.db.get_all("User Permission",filters={"user": user,'allow':"NGOs"},pluck="for_value")
            if len(user_permissions):
                conditions.append(f"v.custom_ngo IN {list_to_tuple_string(user_permissions)}")

    # Ensure start_date is a string
    if filters.get("start_date"):
        start_date = filters["start_date"]
        if isinstance(start_date, datetime):
            start_date = start_date.strftime("%Y-%m-%d")
        conditions.append(f"va.creation >= '{start_date}'")

    # Ensure end_date is a string
    if filters.get("end_date"):
        end_date = filters["end_date"]
        if isinstance(end_date, datetime):
            end_date = end_date.strftime("%Y-%m-%d")
        conditions.append(f"va.creation <= '{end_date}'")

    # Build WHERE clause
    where_clause = ""
    if conditions:
        where_clause = "WHERE " + " AND ".join(conditions)

    query = f"""
        SELECT
            va.creation,
            v.full_name,
            v.email,
            v.custom_phone_number,
            act.title,
            act.start_date,
            act.end_date,
            act.activity_status,
            v.custom_volunteer_type,
            CONCAT(
                FLOOR(IFNULL(va.duration, 0) / 3600), 'h ',
                FLOOR(MOD(IFNULL(va.duration, 0), 3600) / 60), 'm '
            ) AS duration
        FROM `tabVolunteer Activity` AS va
        LEFT JOIN `tabSVA User` AS v ON v.name = va.volunteer
        LEFT JOIN `tabActivity` AS act ON act.name = va.activity
        {where_clause}
        ORDER BY act.start_date DESC
    """

    return frappe.db.sql(query, as_dict=True)
