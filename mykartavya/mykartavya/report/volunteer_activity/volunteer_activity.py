# Copyright (c) 2025, Aniket Singh and contributors
# For license information, please see license.txt

import frappe
from frappe import _


def execute(filters: dict | None = None):
	"""Return columns and data for the report.

	This is the main entry point for the report. It accepts the filters as a
	dictionary and should return columns and data. It is called by the framework
	every time the report is refreshed or a filter is updated.
	"""
	columns = get_columns()
	data = get_data()

	return columns, data


def get_columns() -> list[dict]:
	"""Return columns for the report.

	One field definition per column, just like a DocType field definition.
	"""
	return [
		{
			"label": _("Activity"),
			"fieldname": "activity",
			"fieldtype": "Data",
		},
		{
			"label": _("Work Value (Rupees)"),
			"fieldname": "work_value",
			"fieldtype": "Currency",
		},
	]


def get_data() -> list[list]:
	# u1=frappe.get_doc("SVA User",'USER-25-0009')
	user = frappe.session.user
	user_name=frappe.db.get_value("SVA User", {"email": user}, "name")
	query = f"""
	SELECT 
 		A.name AS activity,
   		A.work_value_rupees as work_value
	FROM `tabActivity` A
	JOIN `tabVolunteer Activity` VA ON A.name = VA.activity
	WHERE VA.volunteer='{user_name}';
	"""
	return frappe.db.sql(query)
