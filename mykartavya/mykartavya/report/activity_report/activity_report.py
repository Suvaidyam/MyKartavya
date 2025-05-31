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
		},
		{
			"label": _("Name"),
			"fieldname": "full_name",
			"fieldtype": "Data",
		},
		{
			"label": _("Email"),
			"fieldname": "email",
			"fieldtype": "Data",
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
		},
		{
			"label": _("Duration (in hours)"),
			"fieldname": "duration",
			"fieldtype": "duration",
			"options": "0.01"
		}
	]

def get_data(filters):
	conditions = []
	values = []
	
	if filters.get("start_date"):
			conditions.append("va.creation >= %s")
			values.append(filters["start_date"])

	if filters.get("end_date"):
		conditions.append("va.creation <= %s")
		values.append(filters["end_date"])

	
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
			IFNULL(va.duration, 0) AS duration
		FROM `tabVolunteer Activity` AS va
		LEFT JOIN `tabSVA User` AS v ON v.name = va.volunteer
		LEFT JOIN `tabActivity` AS act ON act.name = va.activity
		{where_clause}
		ORDER BY act.start_date DESC
	"""
	
	data = frappe.db.sql(query, values, as_list=True)
	return data