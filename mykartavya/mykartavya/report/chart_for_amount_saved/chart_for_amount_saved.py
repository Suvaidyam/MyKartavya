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
			"label": _("Total Work Value (₹)"),
			"fieldname": "work_value_rupees",
			"fieldtype": "Currency",
			"width": 150
		},
	]


def get_data() -> list[dict]:
	"""Return data for the report.

	The report data is a list of dictionaries, with each dictionary representing a row.
	"""
	query = """
		SELECT
			sdg.sdg AS sdg_name,
			COALESCE(SUM(act.work_value_rupees), 0) + COALESCE(SUM(opp.work_value_points), 0) AS work_value_rupees
		FROM 
			`tabSDG` AS sdg
		LEFT JOIN `tabSDGs Child` AS sdc 
			ON sdg.name = sdc.sdgs
		LEFT JOIN (
			SELECT act.name, act.work_value_rupees
			FROM `tabActivity` AS act
			INNER JOIN `tabVolunteer Activity` AS va 
				ON va.activity = act.name AND va.completion_wf_state = 'Approved'
		) AS act ON act.name = sdc.parent AND sdc.parentfield = 'sdgs'
		LEFT JOIN (
			SELECT opp.name, opp.work_value_points
			FROM `tabOpportunity` AS opp
			INNER JOIN `tabVolunteer Opportunity` AS vo 
				ON vo.activity = opp.name AND vo.completion_wf_state = 'Approved'
		) AS opp ON opp.name = sdc.parent AND sdc.parentfield = 'sdgs'
		GROUP BY 
			sdg.sdg
		ORDER BY 
			sdg_name ASC
	"""

	result = frappe.db.sql(query, as_dict=1)
	return result
