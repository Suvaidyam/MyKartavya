# Copyright (c) 2025, Aniket Singh and contributors
# For license information, please see license.txt

# import frappe
from frappe import _
import frappe


def execute(filters: dict | None = None):
	if not filters:
		filters = {}	
	
	columns = get_columns()
	# data = get_data()
	data = get_data(filters)

	return columns, data


def get_columns() -> list[dict]:
	"""Return columns for the report.

	One field definition per column, just like a DocType field definition.
	"""
	return [
	
		{
			"label": _("ID"),
			"fieldname": "name",
			"fieldtype": "Data",
			"width": 200,
		},
		{
			"label": _("Title"),
			"fieldname": "title",
			"fieldtype": "Data",
			"width": 150,
		},
		{	
			"label": _("Docstatus"),
			"fieldname": "docstatus",
			"fieldtype": "Data",
			
		},
		{
			"label": _("Activity Type"),
			"fieldname": "activity_type",
			"fieldtype": "Data",
			"width": 150,
		},
		{
			"label": _("Status"),
			"fieldname": "status",
			"fieldtype": "Data",
			"width": 150,
		},
		{
			"label": _("NGO"),
			"fieldname": "ngo",
			"fieldtype": "Link",
			"options": "NGOs",
			
		},
		{
			"label": _("Company"),
			"fieldname": "company",
			"fieldtype": "Link",
			"options": "Company",	
		},
		{
			"label": _("Activity Published Date"),
			"fieldname": "publish_date",
			"fieldtype": "Datetime",
		},
		{
			"label": _("Start Date"),
			"fieldname": "start_date",
			"fieldtype": "Datetime",
			"width": 150,
		},
		{
			"label": _("End Date"),
			"fieldname": "end_date",
			"fieldtype": "Datetime",
			"width": 150,
		},
		{
			"label": _("Owner"),
			"fieldname": "owner",
			"fieldtype": "Link",
			"options": "User",
			"width": 150,	
		}
		
		
		
		
	]


def get_data(filters):
	conditions = []
	values = []
	
	if filters.get("start_date"):
			conditions.append("act.publish_date >= %s")
			values.append(filters["start_date"])

	if filters.get("end_date"):
		conditions.append("act.publish_date <= %s")
		values.append(filters["end_date"])

	
	# Build WHERE clause
	where_clause = ""
	if conditions:
		where_clause = "WHERE " + " AND ".join(conditions)
	
	query = f"""
		SELECT
			act.name,
			act.title,
			act.docstatus,
			act.activity_type,
			act.status,
			act.ngo,
			act.company,
			act.publish_date,
			act.start_date,
			act.end_date,
			act.owner
		FROM `tabActivity` AS act
		{where_clause}
		ORDER BY act.title ASC
	"""
	
	data = frappe.db.sql(query, values, as_list=True)
	return data