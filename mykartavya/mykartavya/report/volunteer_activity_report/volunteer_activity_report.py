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

def get_data(filters):
    conditions = []
    values = []

    # Ensure start_date is a string
    if filters.get("start_date"):
        start_date = filters["start_date"]
        if isinstance(start_date, datetime):
            start_date = start_date.strftime("%Y-%m-%d")
        conditions.append("va.creation >= %s")
        values.append(start_date)

    # Ensure end_date is a string
    if filters.get("end_date"):
        end_date = filters["end_date"]
        if isinstance(end_date, datetime):
            end_date = end_date.strftime("%Y-%m-%d")
        conditions.append("va.creation <= %s")
        values.append(end_date)

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
            act.status,
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

    return frappe.db.sql(query, values, as_dict=True) if values else frappe.db.sql(query, as_dict=True)
