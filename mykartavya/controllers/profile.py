# Copyright (c) 2025, Aniket Singh and contributors
# For license information, please see license.txt

import frappe
from frappe.utils import validate_email_address
from frappe.utils.pdf import get_pdf
from frappe.utils.file_manager import save_file
import time
import base64

def list_to_tuple_string(user_permissions):
    return "(" + ",".join(f"'{item}'" for item in user_permissions) + ")"

class Profile:
    def sva_user_data():
        user = frappe.db.get_value("SVA User", {"email": frappe.session.user}, "name")
        doc = frappe.get_list(
            "SVA User",
            filters={"name": user},
            fields=[
                "name",
                "mobile_number",
                "full_name",
                "first_name",
                "last_name",
                "email",
                "user_image",
                "custom_employee_id",
                "custom_date_of_birth",
                "custom_background_image",
                "custom_company",
                "custom_country",
                "custom_state",
                "custom_state.state_name as state",
                "custom_city",
                "custom_city.district_name as city",
                "custom_portfolio",
                "custom_cv",
                "custom_designation",
                "custom_linkedin",
                "workflow_state",
                "custom_gender",
                "custom_remarks",
                "custom_phone_number",
            ],
            ignore_permissions=True,
        )

        # Get user skills
        if doc and len(doc) > 0:
            skills = frappe.get_all(
                "User Skills Child",
                filters={"parent": doc[0].name},
                fields=["skill"],
                order_by="idx",
            )
            doc[0]["custom_skill"] = [skill.skill for skill in skills]

        return doc

    # def update_sva_user(data):
    #     data['password'] = 'admin@123'
    #     data['confirm_password'] = 'admin@123'
    #     name = frappe.db.get_value("SVA User", {"email": frappe.session.user}, "name")

    #     if name:
    #         # Ensure phone number is in the correct format
    #         if 'custom_phone_number' in data:
    #             # If phone number doesn't have country code, add it
    #             if not data['custom_phone_number'].startswith('+'):
    #                 data['custom_phone_number'] = f"+91-{data['custom_phone_number']}"
    #             # Ensure proper format with hyphen
    #             elif '-' not in data['custom_phone_number']:
    #                 data['custom_phone_number'] = data['custom_phone_number'].replace('+', '+', 1)
    #                 data['custom_phone_number'] = f"{data['custom_phone_number']}-{data['custom_phone_number'].split('+')[1]}"

    #         # Handle skills
    #         if 'custom_skill' in data:
    #             # Delete existing skills
    #             frappe.db.delete("User Skills Child", {"parent": name})

    #             # Add new skills
    #             for skill in data['custom_skill']:
    #                 data.append('custom_skill', {
    #                     "skill": skill
    #                 })
    #         user_doc = frappe.get_doc("SVA User", name)
    #         user_doc.update(data)
    #         user_doc.save(ignore_permissions=True)
    #         # user_doc = frappe.db.set_value("SVA User", name, data)
    #         return {'status': '200', 'message': 'User updated successfully','data':user_doc.as_dict()}
    #     else:
    #         return {'status': '400', 'message': 'User not found'}

    def user_count():
        users = []
        user = frappe.db.get_value("SVA User", {"email": frappe.session.user}, "name")
        users.append(user)
        volunteer_emails = frappe.db.get_all(
            "Volunteer Company Mapper", {"volunteer": user}, pluck="volunteer_email"
        )
        if len(volunteer_emails):
            volunteer_ids = frappe.db.get_all(
                "SVA User", {"email": ["IN", volunteer_emails]}, pluck="name"
            )
            if len(volunteer_ids):
                users.extend(volunteer_ids)

        if users:
            users = f"({', '.join(repr(user) for user in users)})"

        sql_query = f"""
        SELECT 
            SUM(va.karma_points) AS karma_points,
            SUM(a.work_value_rupees) AS work_value_rupees,
            SUM(va.duration)AS total_hours,
            COUNT(va.activity) AS activity_completed
        FROM `tabVolunteer Activity` AS va
        INNER JOIN `tabActivity` AS a ON va.activity = a.name
        WHERE va.volunteer IN {users} AND va.completion_wf_state='Approved';
        """
        results = frappe.db.sql(sql_query, as_dict=True)
        return results[0]

    def user_count_opp():
        users = []
        user = frappe.db.get_value("SVA User", {"email": frappe.session.user}, "name")
        users.append(user)
        volunteer_emails = frappe.db.get_all(
            "Volunteer Company Mapper", {"volunteer": user}, pluck="volunteer_email"
        )
        if len(volunteer_emails):
            volunteer_ids = frappe.db.get_all(
                "SVA User", {"email": ["IN", volunteer_emails]}, pluck="name"
            )
            if len(volunteer_ids):
                users.extend(volunteer_ids)

        if users:
            users = f"({', '.join(repr(user) for user in users)})"

        sql_query = f"""
        SELECT 
            SUM(vo.karma_points) AS karma_points,
            SUM(o.work_value_points) AS work_value_rupees,
            SUM(vo.duration)AS total_hours,
            COUNT(vo.activity) AS opportunity_completed
        FROM `tabVolunteer Opportunity` AS vo
        INNER JOIN `tabOpportunity` AS o ON vo.activity = o.name
        WHERE vo.volunteer IN {users} AND vo.completion_wf_state='Approved';
        """
        results = frappe.db.sql(sql_query, as_dict=True)
        return results[0]
      

    @frappe.whitelist(allow_guest=True)
    def top_three_volunteer():
        sql_query = """
        SELECT 
            su.first_name,
            su.user_image,
            va.volunteer,
            SUM(va.karma_points) AS total_karma_points,
            SUM(va.duration) AS total_hours,
            COUNT(a.name) AS total_activities
        FROM `tabVolunteer Activity` AS va
        JOIN `tabActivity` AS a ON va.activity = a.name
        JOIN `tabSVA User` AS su ON va.volunteer = su.name
        GROUP BY va.volunteer, su.first_name
        ORDER BY total_karma_points DESC, total_hours ASC
        LIMIT 3;
        """
        res = frappe.db.sql(sql_query, as_dict=True)
        return res

    @frappe.whitelist(allow_guest=True)
    def sdg_impacted():
        sql_query = """
        SELECT 
            b.sdgs AS sdgs_name,
            s.sdg_image AS image,
            SUM(COALESCE(va.duration, 0)) AS hour, 
            SUM(COALESCE(a.work_value_rupees, 0)) AS work_values
        FROM `tabSDGs Child` AS b
        INNER JOIN `tabSDG` AS s ON b.sdgs = s.name
        INNER JOIN `tabActivity` AS a ON b.parent = a.name
        INNER JOIN `tabVolunteer Activity` AS va ON a.name = va.activity
        WHERE va.completion_wf_state='Approved'
        GROUP BY s.name;
        """
        res = frappe.db.sql(sql_query, as_dict=True)
        return res

    @frappe.whitelist(allow_guest=True)
    def check_user_fields():
        validated = True
        required_fields = [
            "first_name",
            "custom_date_of_birth",
            "custom_country",
            "custom_state",
            "custom_city",
            "custom_phone_number",
        ]
        for field in required_fields:
            if not frappe.db.get_value(
                "SVA User", {"email": frappe.session.user}, field
            ):
                validated = False
                break
        return {"success": validated}

    @frappe.whitelist(allow_guest=True)
    def get_all_skills():
        skills = frappe.get_all("Skills", fields=["name", "skill_name"])
        return skills

    def update_sva_user(data):
        try:
            data = frappe.parse_json(data)
            name = data.get("name")

            if not name:
                frappe.throw("User name is required")

            user_doc = frappe.get_doc("SVA User", name)

            # Handle file uploads first
            file_fields = [
                "custom_portfolio",
                "custom_cv",
                "user_image",
                "custom_background_image",
            ]
            # Define file extensions for each field
            file_extensions = {
                "custom_portfolio": ".pdf",
                "custom_cv": ".pdf",
                "user_image": ".png",  # Assuming images are PNG, adjust if needed
                "custom_background_image": ".png",  # Assuming images are PNG, adjust if needed
            }

            for field in file_fields:
                # If field is explicitly set to None/null/empty, clear the field
                if field in data:
                    if not data[field]:
                        user_doc.set(field, None)
                        continue

                    try:
                        # Handle base64 content for new file uploads
                        if "," in data[field]:
                            data[field] = data[field].split(",")[1]
                        file_content = base64.b64decode(data[field])

                        # Generate filename with proper extension
                        extension = file_extensions.get(
                            field, ".pdf"
                        )  # Default to .pdf if not specified
                        timestamp = int(time.time())
                        fname = f"{field}_{timestamp}{extension}"

                        file_doc = save_file(
                            fname=fname,
                            content=file_content,
                            dt="SVA User",
                            dn=name,
                            is_private=0,
                        )

                        if not file_doc or not file_doc.file_url:
                            frappe.log_error(
                                "File Upload Error: File URL missing",
                                f"SVA User {field} Upload",
                            )
                            continue

                        user_doc.set(field, file_doc.file_url)
                    except Exception as e:
                        frappe.log_error(f"Error saving {field}: {str(e)}")
                        continue

            # Handle skills update
            if "custom_skill" in data:
                # Delete existing skills
                frappe.db.delete("User Skills Child", {"parent": name})

                # Add new skills
                if len(data["custom_skill"]):
                    skills = data["custom_skill"]
                    data["custom_skill"] = []
                    for skill in skills:
                        data.custom_skill.append({"skill": skill})
                # Remove skills from data to avoid update conflict
                # del data['custom_skill']

            # Handle phone number update
            if "custom_phone_number" in data:
                # If phone number doesn't have country code, add it
                if not data["custom_phone_number"].startswith("+"):
                    data["custom_phone_number"] = f"+91-{data['custom_phone_number']}"
                # Ensure proper format with hyphen
                elif "-" not in data["custom_phone_number"]:
                    data["custom_phone_number"] = data["custom_phone_number"].replace(
                        "+", "+", 1
                    )
                    data["custom_phone_number"] = (
                        f"{data['custom_phone_number']}-{data['custom_phone_number'].split('+')[1]}"
                    )
            # Update other fields
            for key, value in data.items():
                if hasattr(user_doc, key) and key != "name" and key not in file_fields:
                    user_doc.set(key, value)

            user_doc.save(ignore_permissions=True)
            # frappe.db.commit()

            return {
                "status": 200,
                "message": "User updated successfully",
                "data": user_doc.as_dict(),
            }

        except Exception as e:
            frappe.log_error(frappe.get_traceback(), "SVA User Update Error")
            return {"status": 500, "message": f"Failed to update user: {str(e)}"}

    def get_top_users(page=1, page_size=10):
        try:
            page = int(page)
            page_size = int(page_size)
            start = (page - 1) * page_size

            conditions = []
            user = frappe.session.user
            
            if user != "Administrator":
                user_role = frappe.db.get_value("SVA User", {"email": user},'role_profile')
                if user_role == "Company Admin":
                    user_permissions = frappe.db.get_all("User Permission",filters={"user": user,'allow':"Company"},pluck="for_value")
                    if len(user_permissions):
                        company_condition = f"(v.custom_company IN {list_to_tuple_string(user_permissions)})"
                        conditions.append(company_condition)
                elif user_role == "NGO Admin":
                    user_permissions = frappe.db.get_all("User Permission",filters={"user": user,'allow':"NGOs"},pluck="for_value")
                    if len(user_permissions):
                        ngo_condition = f"(v.custom_ngo IN {list_to_tuple_string(user_permissions)})"
                        conditions.append(ngo_condition)

            where_clause = ""
            if conditions:
                where_clause = "WHERE " + " AND ".join(conditions)

            query = f"""
                SELECT
                    combined.volunteer_id,
                    v.full_name,
                    v.user_image,
                    SUM(combined.karma_points) AS karma_points,
                    SUM(combined.duration) AS duration
                FROM (
                    -- From Volunteer Activity
                    SELECT
                        va.volunteer AS volunteer_id,
                        va.karma_points,
                        va.duration
                    FROM `tabVolunteer Activity` va
                    WHERE va.completion_wf_state = 'Approved'

                    UNION ALL

                    -- From Volunteer Opportunities joined with Opportunity
                    SELECT
                        vo.volunteer AS volunteer_id,
                        o.karma_points,
                        vo.duration AS duration
                    FROM `tabVolunteer Opportunity` vo
                    JOIN `tabOpportunity` o ON vo.activity = o.name
                    WHERE vo.completion_wf_state = 'Approved'
                ) AS combined
                JOIN `tabSVA User` v ON combined.volunteer_id = v.name
                {where_clause}
                GROUP BY combined.volunteer_id
                ORDER BY karma_points DESC
                LIMIT %s OFFSET %s
            """

            users = frappe.db.sql(query, (page_size, start), as_dict=1)

            # Get total count with permissions
            count_query = f"""
                SELECT COUNT(DISTINCT v.name) 
                FROM (
                    SELECT volunteer AS volunteer_id FROM `tabVolunteer Activity` WHERE completion_wf_state = 'Approved'
                    UNION
                    SELECT volunteer AS volunteer_id FROM `tabVolunteer Opportunity` WHERE completion_wf_state = 'Approved'
                ) AS all_volunteers
                JOIN `tabSVA User` v ON all_volunteers.volunteer_id = v.name
                {where_clause}
            """
            total_users = frappe.db.sql(count_query)[0][0]

            return {
                "users": users,
                "total_users": total_users,
                "total_pages": (total_users + page_size - 1) // page_size,
                "current_page": page,
            }

        except Exception as e:
            frappe.log_error(frappe.get_traceback(), "get_top_users Error")
            return {"error": str(e)}

