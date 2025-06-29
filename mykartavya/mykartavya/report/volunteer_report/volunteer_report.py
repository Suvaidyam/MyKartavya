# Copyright (c) 2025, Aniket Singh and contributors
# For license information, please see license.txt

import frappe
from frappe import _


def execute(filters: dict | None = None):
	columns = get_columns()
	data = get_data(filters)
	return columns, data


def get_columns() -> list[dict]:
	return [
		{"label": _("First Name"), "fieldname": "first_name", "fieldtype": "Data", "width": 120},
		{"label": _("Last Name"), "fieldname": "last_name", "fieldtype": "Data", "width": 120},
		{"label": _("Gender"), "fieldname": "custom_gender", "fieldtype": "Data", "width": 100},
		{"label": _("Email"), "fieldname": "email", "fieldtype": "Data", "width": 250},
		{"label": _("Date of Birth"), "fieldname": "custom_date_of_birth", "fieldtype": "Date", "width": 120},
		{"label": _("Phone Number"), "fieldname": "custom_phone_number", "fieldtype": "Data", "width": 150},
		{"label": _("Skills"), "fieldname": "skills", "fieldtype": "Data", "width": 250},
		{"label": _("Status"), "fieldname": "status", "fieldtype": "Data", "width": 100},
		{"label": _("Registration Date"), "fieldname": "registration_date", "fieldtype": "Datetime", "width": 150},
		{"label": _("Registration Type"), "fieldname": "custom_volunteer_type", "fieldtype": "Data", "width": 150},
		{"label": _("Organisation"), "fieldname": "organisation", "fieldtype": "Data", "width": 200},
		{"label": _("Karma Points"), "fieldname": "total_karma_points", "fieldtype": "Int", "width": 130},
		{"label": _("Time Donated"), "fieldname": "time_donated", "fieldtype": "Data", "width": 120},
		{"label": _("Portal Activity Status"), "fieldname": "active_status", "fieldtype": "Data", "width": 120},
	]

def get_data(filters: dict | None = None):
	conditions = []
	having_conditions = []

	conditions.append("su.role_profile = 'Volunteer'")

	if filters:
		if filters.get("full_name"):
			full_name = str(filters.get("full_name")).replace("'", "''")
			conditions.append(f"su.full_name LIKE '%{full_name}%'")

		if filters.get("status"):
			status = str(filters.get("status")).replace("'", "''")
			conditions.append(f"su.workflow_state = '{status}'")

		if filters.get("organisation"):
			org_filter = str(filters.get("organisation")).replace("'", "''")
			conditions.append(f"(su.custom_company LIKE '%{org_filter}%' OR su.custom_ngo LIKE '%{org_filter}%')")

		if filters.get("gender"):
			gender = str(filters.get("gender")).replace("'", "''")
			conditions.append(f"su.custom_gender = '{gender}'")

		if filters.get("skill"):
			skill = str(filters.get("skill")).replace("'", "''")
			conditions.append(f"s.name = '{skill}'")

		if filters.get("active_status"):
			status_filter = filters["active_status"]
			if status_filter == "Active":
				conditions.append("u.last_login >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)")
			elif status_filter == "Inactive":
				conditions.append("(u.last_login IS NULL OR u.last_login < DATE_SUB(CURDATE(), INTERVAL 6 MONTH))")

	where_clause = "WHERE " + " AND ".join(conditions) if conditions else ""
	having_clause = "HAVING " + " AND ".join(having_conditions) if having_conditions else ""

	query = f"""
		SELECT 
			su.first_name,
			su.last_name,
			su.custom_gender,
			su.email,
			su.custom_date_of_birth,
			su.custom_phone_number,
			GROUP_CONCAT(DISTINCT s.skill_name SEPARATOR ', ') AS skills,
			su.workflow_state AS status,
			su.creation AS registration_date,
			su.custom_volunteer_type,
			COALESCE(su.custom_company, su.custom_ngo) AS organisation,
			IFNULL(va.total_karma, 0) + IFNULL(vo.total_karma, 0) AS total_karma_points,
			CONCAT(
				FLOOR((IFNULL(va.total_duration, 0) + IFNULL(vo.total_duration, 0)) / 3600), 'h ',
				FLOOR(MOD((IFNULL(va.total_duration, 0) + IFNULL(vo.total_duration, 0)), 3600) / 60), 'm '
			) AS time_donated,
			CASE 
				WHEN u.last_login >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH) THEN 'Active'
				ELSE 'Inactive'
			END AS active_status
		FROM `tabSVA User` AS su
		LEFT JOIN `tabUser` AS u ON u.name = su.email
		LEFT JOIN (
			SELECT volunteer, SUM(karma_points) AS total_karma, SUM(duration) AS total_duration
			FROM `tabVolunteer Activity` 
			GROUP BY volunteer
		) AS va ON va.volunteer = su.name
		LEFT JOIN (
			SELECT volunteer, SUM(karma_points) AS total_karma, SUM(duration) AS total_duration
			FROM `tabVolunteer Opportunity` 
			GROUP BY volunteer
		) AS vo ON vo.volunteer = su.name
		LEFT JOIN `tabUser Skills Child` AS usc ON usc.parent = su.name
		LEFT JOIN `tabSkills` AS s ON s.name = usc.skill
		{where_clause}
		GROUP BY 
			su.name,
			su.first_name,
			su.last_name,
			su.custom_gender,
			su.email,
			su.custom_date_of_birth,
			su.custom_phone_number,
			su.workflow_state,
			su.creation,
			va.total_karma,
			va.total_duration,
			vo.total_karma,
			vo.total_duration,
			su.custom_company,
			su.custom_ngo,
			su.custom_volunteer_type,
			u.last_login
		{having_clause}
		ORDER BY su.creation DESC
	"""

	return frappe.db.sql(query, as_dict=True)
