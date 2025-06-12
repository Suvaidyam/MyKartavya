# Copyright (c) 2025, Aniket Singh and contributors

import frappe
from frappe import _


def execute(filters: dict | None = None):
	columns = get_columns()
	data = get_data(filters)
	return columns, data


def get_columns() -> list[dict]:
	return [
		{
			"label": _("Activity Work Value"),
			"fieldname": "activity_work_value",
			"fieldtype": "Currency",
			"width": 200
		},
		{
			"label": _("Opportunity Work Value"),
			"fieldname": "opportunity_work_value",
			"fieldtype": "Currency",
			"width": 200
		},
		{
			"label": _("Combined Value"),
			"fieldname": "combined_value",
			"fieldtype": "Currency",
			"width": 200
		},
	]


def get_data(filters=None) -> list[dict]:
	if not filters:
		filters = {}

	volunteer = filters.get("volunteer")

	conditions = ""
	values = []

	if volunteer:
		conditions = "WHERE va.volunteer = %s"
		values.append(volunteer)

	query = f"""
		SELECT 
			va.name,
			u.full_name,
			va.work_value_in_rupees,
			va.com_percent,
			va.enrollment_wf_state,
			va.completion_wf_state,
			va.karma_points,
			va.rating,
			va.activity,
			va.volunteer
		FROM `tabVolunteer Activity` AS va
		LEFT JOIN `tabSVA User` AS u ON u.name = va.volunteer
		{conditions}
	"""

	activities = frappe.db.sql(query, values, as_dict=True)

	processed_data = []

	for activity in activities:
		opportunity_value = get_opportunity_work_value(activity.volunteer)
		activity_value = activity.work_value_in_rupees or 0
		combined_value = activity_value + opportunity_value

		processed_data.append({
			"name": activity.name,
			"full_name": activity.full_name,
			"activity": activity.activity,
			"activity_work_value": activity_value,
			"opportunity_work_value": opportunity_value,
			"combined_value": combined_value,
			"com_percent": activity.com_percent,
			"enrollment_wf_state": activity.enrollment_wf_state,
			"completion_wf_state": activity.completion_wf_state,
			"karma_points": activity.karma_points,
			"rating": activity.rating
		})

	return processed_data


def get_opportunity_work_value(volunteer):
	opportunity_value = frappe.db.get_value(
		"Volunteer Opportunity",
		{
			"volunteer": volunteer
		},
		"work_value_in_rupees",
		order_by="creation desc"
	)

	if not opportunity_value:
		fallback = frappe.db.sql("""
			SELECT work_value_in_rupees 
			FROM `tabVolunteer Opportunity` 
			ORDER BY creation DESC 
			LIMIT 1
		""")
		opportunity_value = fallback[0][0] if fallback else 0

	return opportunity_value or 0