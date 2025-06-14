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


def list_to_tuple_string(user_permissions):
	return "(" + ",".join(f"'{item}'" for item in user_permissions) + ")"


def get_data() -> list[dict]:
	"""Return data for the report.

	The report data is a list of dictionaries, with each dictionary representing a row.
	"""
	conditions = []
	user = frappe.session.user
	
	if user != "Administrator":
		user_role = frappe.db.get_value("SVA User", {"email": user},'role_profile')
		if user_role == "Company Admin":
			user_permissions = frappe.db.get_all("User Permission",filters={"user": user,'allow':"Company"},pluck="for_value")
			if len(user_permissions):
				company_condition = f"(va_user.custom_company IN {list_to_tuple_string(user_permissions)} OR vo_user.custom_company IN {list_to_tuple_string(user_permissions)})"
				conditions.append(company_condition)
		elif user_role == "NGO Admin":
			user_permissions = frappe.db.get_all("User Permission",filters={"user": user,'allow':"NGOs"},pluck="for_value")
			if len(user_permissions):
				ngo_condition = f"(va_user.custom_ngo IN {list_to_tuple_string(user_permissions)} OR vo_user.custom_ngo IN {list_to_tuple_string(user_permissions)})"
				conditions.append(ngo_condition)

	where_clause = ""
	if conditions:
		where_clause = "AND " + " AND ".join(conditions)

	query = f"""
		SELECT
			sdg.sdg AS sdg_name,
			COALESCE(SUM(
				CASE 
					WHEN (act.work_value_rupees IS NOT NULL OR opp.work_value_points IS NOT NULL) 
					AND ({where_clause[4:] if where_clause else '1=1'})
					THEN COALESCE(act.work_value_rupees, 0) + COALESCE(opp.work_value_points, 0)
					ELSE 0 
				END
			), 0) AS work_value_rupees
		FROM 
			`tabSDG` AS sdg
		LEFT JOIN `tabSDGs Child` AS sdc 
			ON sdg.name = sdc.sdgs
		LEFT JOIN (
			SELECT act.name, act.work_value_rupees, va.volunteer
			FROM `tabActivity` AS act
			INNER JOIN `tabVolunteer Activity` AS va 
				ON va.activity = act.name AND va.completion_wf_state = 'Approved'
		) AS act ON act.name = sdc.parent AND sdc.parentfield = 'sdgs'
		LEFT JOIN `tabSVA User` AS va_user
			ON va_user.name = act.volunteer AND va_user.name IS NOT NULL
		LEFT JOIN (
			SELECT opp.name, opp.work_value_points, vo.volunteer
			FROM `tabOpportunity` AS opp
			INNER JOIN `tabVolunteer Opportunity` AS vo 
				ON vo.activity = opp.name AND vo.completion_wf_state = 'Approved'
		) AS opp ON opp.name = sdc.parent AND sdc.parentfield = 'sdgs'
		LEFT JOIN `tabSVA User` AS vo_user
			ON vo_user.name = opp.volunteer AND vo_user.name IS NOT NULL
		GROUP BY 
			sdg.sdg
		ORDER BY 
			sdg_name ASC
	"""

	result = frappe.db.sql(query, as_dict=1)
	return result
