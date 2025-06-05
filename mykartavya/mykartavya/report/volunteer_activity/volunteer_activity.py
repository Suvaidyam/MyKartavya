# Copyright (c) 2025, Aniket Singh and contributors
# For license information, please see license.txt

import frappe
from frappe import _


def execute(filters: dict | None = None):
	columns = get_columns()
	data = get_data(filters)
	return columns, data


def get_columns() -> list[dict]:
	"""Return columns for the report."""
	return [
		# {
		# 	"label": _("Activity Name"),
		# 	"fieldname": "name",
		# 	"fieldtype": "Link",
		# 	"options": "Volunteer Activity",
		# 	"width": 150
		# },
		# {
		# 	"label": _("Volunteer Name"),
		# 	"fieldname": "full_name",
		# 	"fieldtype": "Data",
		# 	"width": 200
		# },
		# {
		# 	"label": _("Activity"),
		# 	"fieldname": "activity",
		# 	"fieldtype": "Data",
		# 	"width": 150
		# },
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
		# {
		# 	"label": _("Com %"),
		# 	"fieldname": "com_percent",
		# 	"fieldtype": "Percent",
		# 	"width": 100
		# },
		# {
		# 	"label": _("Enrollment Status"),
		# 	"fieldname": "enrollment_wf_state",
		# 	"fieldtype": "Data",
		# 	"width": 120
		# },
		# {
		# 	"label": _("Completion Status"),
		# 	"fieldname": "completion_wf_state",
		# 	"fieldtype": "Data",
		# 	"width": 120
		# },
		# {
		# 	"label": _("Karma Points"),
		# 	"fieldname": "karma_points",
		# 	"fieldtype": "Int",
		# 	"width": 100
		# },
		# {
		# 	"label": _("Rating"),
		# 	"fieldname": "rating",
		# 	"fieldtype": "Rating",
		# 	"width": 150
		# }
	]


def get_data(filters=None) -> list[dict]:
	"""Fetch data combining Volunteer Activity and Volunteer Opportunity"""

	if not filters:
		filters = {}

	volunteer = filters.get("volunteer")

	# Apply filter if volunteer is provided
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

	# Process and combine with Opportunity
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
	"""Get work value from Volunteer Opportunity for the given volunteer"""

	opportunity_value = frappe.db.get_value(
		"Volunteer Opportunity",
		{
			"volunteer": volunteer
		},
		"work_value_in_rupees",
		order_by="creation desc"
	)

	if not opportunity_value:
		# fallback
		fallback = frappe.db.sql("""
			SELECT work_value_in_rupees 
			FROM `tabVolunteer Opportunity` 
			ORDER BY creation DESC 
			LIMIT 1
		""")
		opportunity_value = fallback[0][0] if fallback else 0

	return opportunity_value or 0
