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
			"label": _("SDG Name"),
			"fieldname": "sdg_name",
			"fieldtype": "Data",
			"width": 300
		},
		{
			"label": _("Total Hours Donated"),
			"fieldname": "total_hours",
			"fieldtype": "Float",
			"width": 150,
			"precision": 2
		},
	]


def get_data() -> list[dict]:
	"""Return data for the report.

	The report data is a list of dictionaries, with each dictionary representing a row.
	"""
	query = """
		SELECT 
			sdg.sdg AS sdg_name,
			COALESCE(SUM(va.duration)/60/60, 0) + COALESCE(SUM(vo.duration)/60/60, 0) AS total_hours
		FROM 
			`tabSDG` AS sdg
		LEFT JOIN `tabSDGs Child` AS sdc 
			ON sdg.name = sdc.sdgs
		LEFT JOIN `tabActivity` AS act 
			ON act.name = sdc.parent AND sdc.parentfield = 'sdgs'
		LEFT JOIN `tabVolunteer Activity` AS va 
			ON va.activity = act.name AND va.completion_wf_state = 'Approved'
		LEFT JOIN `tabOpportunity` AS opp
			ON opp.name = sdc.parent AND sdc.parentfield = 'sdgs'  
		LEFT JOIN `tabVolunteer Opportunity` AS vo 
			ON vo.activity = opp.name AND vo.completion_wf_state = 'Approved'
		GROUP BY 
			sdg.sdg
		ORDER BY 
			sdg_name ASC
	"""

	result = frappe.db.sql(query, as_dict=1)
	return result
