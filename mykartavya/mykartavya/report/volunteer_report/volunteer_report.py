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
		{"label": _("Registration Type"), "fieldname": "custom_registration_type", "fieldtype": "Data", "width": 200},
		{"label": _("Organisation"), "fieldname": "organisation", "fieldtype": "Data", "width": 200},
		{"label": _("Karma Points"), "fieldname": "total_karma_points", "fieldtype": "Int", "width": 130},
		{"label": _("Time Donated"), "fieldname": "time_donated", "fieldtype": "Data", "width": 120},
		{"label": _("Portal Activity Status"), "fieldname": "active_status", "fieldtype": "Data", "width": 120},
	]


def get_data(filters: dict | None = None):
	conditions = []
	having_conditions = []

	# Base condition: only volunteers
	conditions.append("su.role_profile = 'Volunteer'")

	# Company filtering based on current user
	if frappe.session.user != "Administrator":
		company = frappe.db.get_value("SVA User", {"email": frappe.session.user}, "custom_company")
		companies = frappe.db.get_list(
			"User Permission",
			filters={"user": frappe.session.user, "allow": "Company"},
			pluck="for_value",
			limit=100,
			ignore_permissions=True,
		)

		# Company condition
		company_conditions = []
		if company:
			company_conditions.append(f"su.custom_company = {frappe.db.escape(company)}")
		if companies:
			escaped = ', '.join(f"{frappe.db.escape(c)}" for c in companies)
			company_conditions.append(f"su.custom_company IN ({escaped})")
		company_conditions.append("su.custom_company IS NULL OR su.custom_company = ''")

		if company_conditions:
			conditions.append(f"({ ' OR '.join(company_conditions) })")

	# Apply additional filters
	if filters:
		if filters.get("full_name"):
			full_name = filters["full_name"].replace("'", "''")
			conditions.append(f"su.full_name LIKE '%{full_name}%'")

		if filters.get("status"):
			status = filters["status"].replace("'", "''")
			conditions.append(f"su.workflow_state = '{status}'")

		if filters.get("organisation"):
			org = filters["organisation"].replace("'", "''")
			conditions.append(f"(su.custom_company LIKE '%{org}%' OR su.custom_ngo LIKE '%{org}%')")

		if filters.get("gender"):
			gender = filters["gender"].replace("'", "''")
			conditions.append(f"su.custom_gender = '{gender}'")

		if filters.get("skill"):
			skill = filters["skill"].replace("'", "''")
			conditions.append(f"s.name = '{skill}'")

		if filters.get("active_status"):
			if filters["active_status"] == "Active":
				conditions.append("u.last_login >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)")
			else:
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
			su.custom_registration_type,
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
		FROM `tabSVA User` su
		LEFT JOIN `tabUser` u ON u.name = su.email
		LEFT JOIN (
			SELECT volunteer, SUM(karma_points) AS total_karma, SUM(duration) AS total_duration
			FROM `tabVolunteer Activity` 
			GROUP BY volunteer
		) va ON va.volunteer = su.name
		LEFT JOIN (
			SELECT volunteer, SUM(karma_points) AS total_karma, SUM(duration) AS total_duration
			FROM `tabVolunteer Opportunity` 
			GROUP BY volunteer
		) vo ON vo.volunteer = su.name
		LEFT JOIN `tabUser Skills Child` usc ON usc.parent = su.name
		LEFT JOIN `tabSkills` s ON s.name = usc.skill
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
			su.custom_registration_type,
			u.last_login
		{having_clause}
		ORDER BY su.creation DESC
	"""

	return frappe.db.sql(query, as_dict=True)
