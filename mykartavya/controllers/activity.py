import frappe
import json
from frappe.utils.file_manager import save_file
import base64


class Activity:
    def current_commitments(filter={}):
        user = frappe.db.get_value("SVA User", {"email": frappe.session.user}, "name")
        if not user:
            return []

        base_url = frappe.get_conf().get("hostname", "")
        where_clauses = ["va.volunteer = %(user)s"]
        order_by_clauses = []
        params = {"user": user}

        if isinstance(filter, str):
            filter = frappe.parse_json(filter)

        if filter:
            if "types" in filter and filter["types"]:
                where_clauses.append("act.activity_type IN %(activity_types)s")
                params["activity_types"] = tuple(filter["types"])

            if "karma_points" in filter and filter["karma_points"]:
                order_by_clauses.append(
                    "act.karma_points ASC"
                    if filter["karma_points"] == "Low to High"
                    else "act.karma_points DESC"
                )

            if "sdgs" in filter and filter["sdgs"]:
                where_clauses.append("sd.sdgs IN %(sdgs_values)s")
                params["sdgs_values"] = tuple(filter["sdgs"])

            if "volunteering_hours" in filter and filter["volunteering_hours"]:
                order_by_clauses.append(
                    "act.hours ASC"
                    if filter["volunteering_hours"] == "Low to High"
                    else "act.hours DESC"
                )

        where_clause = " AND ".join(where_clauses)
        order_by_clause = (
            " ORDER BY " + ", ".join(order_by_clauses) if order_by_clauses else ""
        )

        sql = f"""
        SELECT
            va.name as name,
            act.name as activity,
            va.duration as duration,
            va.com_percent as com_percent,
            act.title as title,
            act.karma_points as karma_points,
            act.start_date as start_date,
            act.end_date as end_date,
            act.hours as hours,
            va.duration as donet_hours,
            va.completion_wf_state as completion_wf_state,
            act.activity_description as activity_description,
            act.activity_type as types,
            CONCAT('{base_url}', act.activity_image) as activity_image,
            COALESCE(
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'sdgs_name', sdg.sdg,
                        'image', sdg.sdg_image
                    )
                ), JSON_ARRAY()
            ) AS sdgs
        FROM
            `tabVolunteer Activity` AS va
        INNER JOIN `tabActivity` AS act ON va.activity = act.name
        LEFT JOIN `tabSDGs Child` AS sd ON act.name = sd.parent
        LEFT JOIN `tabSDG` AS sdg ON sdg.name = sd.sdgs
        WHERE {where_clause}
        AND (act.opportunity IS NULL OR act.opportunity = '')
        GROUP BY va.name
        {order_by_clause}
        """
        try:
            acts = frappe.db.sql(sql, params, as_dict=True)
            return acts
        except Exception as e:
            frappe.log_error(f"Error in current_commitments query: {e}")
            raise


    def current_commitments_in_opportunity(filter={}):
            user = frappe.db.get_value("SVA User", {"email": frappe.session.user}, "name")
            if not user:
                return []

            base_url = frappe.get_conf().get("hostname", "")
            where_clauses = ["va.volunteer = %(user)s"]
            order_by_clauses = []
            params = {"user": user}

            if isinstance(filter, str):
                filter = frappe.parse_json(filter)

            if filter:
                if "types" in filter and filter["types"]:
                    where_clauses.append("act.activity_type IN %(activity_types)s")
                    params["activity_types"] = tuple(filter["types"])

                if "karma_points" in filter and filter["karma_points"]:
                    order_by_clauses.append(
                        "act.karma_points ASC"
                        if filter["karma_points"] == "Low to High"
                        else "act.karma_points DESC"
                    )

                if "sdgs" in filter and filter["sdgs"]:
                    where_clauses.append("sd.sdgs IN %(sdgs_values)s")
                    params["sdgs_values"] = tuple(filter["sdgs"])

                if "volunteering_hours" in filter and filter["volunteering_hours"]:
                    order_by_clauses.append(
                        "act.hours ASC"
                        if filter["volunteering_hours"] == "Low to High"
                        else "act.hours DESC"
                    )

                if "opportunity" in filter and filter["opportunity"]:
                    where_clauses.append("va.opportunity = %(opportunity)s")
                    params["opportunity"] = filter["opportunity"]

            where_clause = " AND ".join(where_clauses)
            order_by_clause = (
                " ORDER BY " + ", ".join(order_by_clauses) if order_by_clauses else ""
            )

            sql = f"""
            SELECT
                va.name as name,
                act.name as activity,
                va.duration as duration,
                va.com_percent as com_percent,
                act.title as title,
                act.karma_points as karma_points,
                act.start_date as start_date,
                act.end_date as end_date,
                act.hours as hours,
                va.duration as donet_hours,
                va.completion_wf_state as completion_wf_state,
                act.activity_description as activity_description,
                act.activity_type as types,
                CONCAT('{base_url}', act.activity_image) as activity_image,
                COALESCE(
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'sdgs_name', sdg.sdg,
                            'image', sdg.sdg_image
                        )
                    ), JSON_ARRAY()
                ) AS sdgs
            FROM
                `tabVolunteer Activity` AS va
            INNER JOIN `tabActivity` AS act ON va.activity = act.name
            LEFT JOIN `tabSDGs Child` AS sd ON act.name = sd.parent
            LEFT JOIN `tabSDG` AS sdg ON sdg.name = sd.sdgs
            WHERE {where_clause}
            GROUP BY va.name
            {order_by_clause}
            """
            try:
                acts = frappe.db.sql(sql, params, as_dict=True)
                return acts
            except Exception as e:
                frappe.log_error(f"Error in current_commitments query: {e}")
                raise

    # available_commitments
    def available_commitments(filter={}):
        where_clause = ""
        order_by_clause = ""
        user = frappe.db.get_value("SVA User", {"email": frappe.session.user}, "name")
        company = frappe.db.get_value(
            "SVA User", {"email": frappe.session.user}, "custom_company"
        )
        companies = frappe.db.get_list(
            "User Permission",
            filters={"user": frappe.session.user, "allow": "Company"},
            pluck="for_value",
            limit=100,
            ignore_permissions=True,
        )
        if user:
            where_clause += f" AND act.name NOT IN (SELECT activity FROM `tabVolunteer Activity` WHERE volunteer = '{user}')"
        if company and len(companies) > 0:
            where_clause += f" AND (act.company IS NULL OR act.company IN ('','{company}',{', '.join(frappe.db.escape(c) for c in companies)}))"
        elif len(companies) > 0:
            where_clause += f" AND (act.company IS NULL OR act.company IN ('',{', '.join(frappe.db.escape(c) for c in companies)}))"
        elif company:
            where_clause += f" AND (act.company IS NULL OR act.company = '{company}')"
        else:
            where_clause += " AND (act.company IS NULL OR act.company = '')"
        if isinstance(filter, str):
            filter = frappe.parse_json(filter)
        if filter:
            if "types" in filter and filter["types"]:
                activity_types = ", ".join(f"'{at}'" for at in filter["types"])
                where_clause += f" AND act.activity_type IN ({activity_types})"

            if "karma_points" in filter and filter["karma_points"]:
                if filter["karma_points"] == "Low to High":
                    order_by_clause = " ORDER BY act.karma_points ASC"
                elif filter["karma_points"] == "High to Low":
                    order_by_clause = " ORDER BY act.karma_points DESC"

            if "sdgs" in filter and filter["sdgs"]:
                sdgs_values = ", ".join(f"'{sdg}'" for sdg in filter["sdgs"])
                where_clause += f"""
                AND EXISTS (
                    SELECT 1 FROM `tabSDGs Child` AS sub_sd
                    WHERE sub_sd.parent = act.name
                    AND sub_sd.sdgs IN ({sdgs_values})
                )"""

            if "volunteering_hours" in filter and filter["volunteering_hours"]:
                if filter["volunteering_hours"] == "Low to High":
                    order_by_clause = " ORDER BY act.hours ASC"
                elif filter["volunteering_hours"] == "High to Low":
                    order_by_clause = " ORDER BY act.hours DESC"

        sql_query = f"""
                    SELECT 
                        va.name as name,
                        act.name as activity,
                        va.duration as duration,
                        va.com_percent as com_percent,
                        act.title as activity_name,
                        act.karma_points as karma_points,
                        act.start_date as start_date,
                        act.end_date as end_date,
                        act.hours as hours,
                        act.activity_description as activity_description,
                        act.activity_type as types,
                        act.activity_image as activity_image,
                        COALESCE(
                            JSON_ARRAYAGG(
                                DISTINCT CASE 
                                    WHEN sdg.sdg IS NOT NULL 
                                    THEN JSON_OBJECT(
                                        'sdgs_name', sdg.sdg,
                                        'image', sdg.sdg_image
                                    )
                                    ELSE NULL
                                END
                            ), JSON_ARRAY()
                        ) AS sdgs,
                        COALESCE(
                            JSON_ARRAYAGG(
                                DISTINCT JSON_OBJECT(
                                    'name', sva.name,
                                    'full_name', sva.full_name,
                                    'email', sva.email,
                                    'user_image', sva.user_image
                                )
                            ), JSON_ARRAY()
                        ) as volunteers
                    FROM `tabActivity` as act
                    LEFT JOIN `tabVolunteer Activity` as va ON va.activity = act.name
                    LEFT JOIN `tabSVA User` as sva ON sva.name = va.volunteer
                    LEFT JOIN `tabSDGs Child` AS sd ON act.name = sd.parent
                    LEFT JOIN `tabSDG` AS sdg ON sdg.name = sd.sdgs
                    WHERE act.end_date >= CURRENT_DATE() AND act.status IN ('Published', 'Ongoing')
                    AND act.docstatus = 1 
                       {where_clause}
                    GROUP BY act.name
                    {order_by_clause}
                """
        try:
            acts = frappe.db.sql(sql_query, as_dict=True)
            return acts
        except Exception as e:
            frappe.log_error(f"Syntax error in query:\n{sql_query}")
            raise

    def available_commitments_public(filter={}):
        where_clause = ""
        order_by_clause = ""
        user = frappe.db.get_value("SVA User", {"email": frappe.session.user}, "name")
        company = frappe.db.get_value(
            "SVA User", {"email": frappe.session.user}, "custom_company"
        )
        companies = frappe.db.get_list(
            "User Permission",
            filters={"user": frappe.session.user, "allow": "Company"},
            pluck="for_value",
            limit=100,
            ignore_permissions=True,
        )
        if user:
            where_clause += f" AND act.name NOT IN (SELECT activity FROM `tabVolunteer Activity` WHERE volunteer = '{user}')"
        if company and len(companies) > 0:
            where_clause += f" AND (act.company IS NULL OR act.company IN ('','{company}',{', '.join(frappe.db.escape(c) for c in companies)}))"
        elif len(companies) > 0:
            where_clause += f" AND (act.company IS NULL OR act.company IN ('',{', '.join(frappe.db.escape(c) for c in companies)}))"
        elif company:
            where_clause += f" AND (act.company IS NULL OR act.company = '{company}')"
        else:
            where_clause += " AND (act.company IS NULL OR act.company = '')"
        if isinstance(filter, str):
            filter = frappe.parse_json(filter)
        if filter:
            if "types" in filter and filter["types"]:
                activity_types = ", ".join(f"'{at}'" for at in filter["types"])
                where_clause += f" AND act.activity_type IN ({activity_types})"

            if "karma_points" in filter and filter["karma_points"]:
                if filter["karma_points"] == "Low to High":
                    order_by_clause = " ORDER BY act.karma_points ASC"
                elif filter["karma_points"] == "High to Low":
                    order_by_clause = " ORDER BY act.karma_points DESC"

            if "sdgs" in filter and filter["sdgs"]:
                sdgs_values = ", ".join(f"'{sdg}'" for sdg in filter["sdgs"])
                where_clause += f" AND sd.sdgs IN ({sdgs_values})"

            if "volunteering_hours" in filter and filter["volunteering_hours"]:
                if filter["volunteering_hours"] == "Low to High":
                    order_by_clause = " ORDER BY act.max_hours ASC"
                elif filter["volunteering_hours"] == "High to Low":
                    order_by_clause = " ORDER BY act.max_hours DESC"
        sql_query = f"""
                    SELECT 
                        va.name as name,
                        act.name as activity,
                        va.duration as duration,
                        va.com_percent as com_percent,
                        act.title as activity_name,
                        act.karma_points as karma_points,
                        act.start_date as start_date,
                        act.end_date as end_date,
                        act.hours as hours,
                        act.activity_description as activity_description,
                        act.activity_type as types,
                        act.activity_image as activity_image,
                        act.portunity as opportunity,
                        COALESCE(
                            JSON_ARRAYAGG(
                                DISTINCT CASE 
                                    WHEN sdg.sdg IS NOT NULL 
                                    THEN JSON_OBJECT(
                                        'sdgs_name', sdg.sdg,
                                        'image', sdg.sdg_image
                                    )
                                    ELSE NULL
                                END
                            ), JSON_ARRAY()
                        ) AS sdgs,
                        COALESCE(
                            JSON_ARRAYAGG(
                                DISTINCT JSON_OBJECT(
                                    'name', sva.name,
                                    'full_name', sva.full_name,
                                    'email', sva.email,
                                    'user_image', sva.user_image
                                )
                            ), JSON_ARRAY()
                        ) as volunteers
                    FROM `tabActivity` as act
                    LEFT JOIN `tabVolunteer Activity` as va ON va.activity = act.name
                    LEFT JOIN `tabSVA User` as sva ON sva.name = va.volunteer
                    LEFT JOIN `tabSDGs Child` AS sd ON act.name = sd.parent
                    LEFT JOIN `tabSDG` AS sdg ON sdg.name = sd.sdgs
                    WHERE act.end_date >= CURRENT_DATE() 
                    AND act.status IN ('Published', 'Ongoing')
                    AND act.is_featured = 'Yes' 
                    AND act.docstatus = 1 
                    GROUP BY act.name
                    {order_by_clause}
                """
        try:
            acts = frappe.db.sql(sql_query, as_dict=True)
            return acts
        except Exception as e:
            frappe.log_error(f"Syntax error in query:\n{sql_query}")
            raise

    # act_now
    def act_now(activity, volunteer):
        # Check if the volunteer is approved
        workflow_state = frappe.db.get_value(
            "SVA User", {"email": volunteer}, "workflow_state"
        )
        volunteer = frappe.db.get_value("SVA User", {"email": volunteer}, "name")
        if workflow_state != "Approved":
            return {"msg": "Volunteer is not approved", "status": 201}

        # Check if the activity is already assigned to the volunteer
        act = frappe.get_list(
            "Volunteer Activity",
            filters={"activity": activity, "volunteer": volunteer},
            pluck="name",
        )
        if act:
            return {"msg": "Activity already assigned to the volunteer", "status": 400}

        unlimited_vacancies = frappe.db.get_value(
            "Activity", activity, "unlimited_vacancies"
        )

        if not unlimited_vacancies:
            total_vacancies = (
                frappe.db.get_value("Activity", activity, "total_vacancies") or 0
            )
            current_count = frappe.db.count(
                "Volunteer Activity", filters={"activity": activity}
            )

            if current_count >= total_vacancies:
                return {
                    "msg": f"Vacancies for this activity are already filled. No more users can be added.",
                    "status": 400,
                }
        # Assign activity to the volunteer
        doc = frappe.new_doc("Volunteer Activity")
        doc.activity = activity
        doc.volunteer = volunteer
        doc.flags.ignore_permissions = True
        doc.flags.ignore_mandatory = True
        doc.save()

        return {"msg": "Activity assigned to the volunteer", "status": 200, "data": doc}
    
 
    def workflow_state():
        doc = frappe.get_doc("Workflow", "Volunteer_activity")
        return doc

    # activity_details
    def activity_details(name):
        user = frappe.db.get_value("SVA User", {"email": frappe.session.user}, "name")
        exists = frappe.db.exists(
            "Volunteer Activity", {"volunteer": user, "activity": name}
        )
        where_clause = ""

        volunteer_condition = (
            f"AND va.volunteer = '{user}'" if exists else "AND va.volunteer IS NULL"
        )

        sql_query = f"""
            SELECT
                va.name as name,
                act.name as activity,
                va.duration as duration,
                va.com_percent as com_percent,
                act.title as title,
                act.need_certificate as need_certificate,
                act.karma_points as karma_points,
                act.start_date as start_date,
                act.end_date as end_date,
                act.hours as hours,
                va.duration as donet_hours,
                act.activity_description as activity_description,
                act.activity_type as types,
                act.activity_image as activity_image,
                act.require_feedback_images as require_feedback_images,
                va.workflow_state as workflow_state,
                va.completion_wf_state as completion_wf_state,
                va.rating as rating,
                va.remarks as remarks,
                COALESCE(
                    JSON_ARRAYAGG(
                        CASE 
                            WHEN sdg.sdg IS NOT NULL 
                            THEN JSON_OBJECT(
                                'sdgs_name', sdg.sdg,
                                'image', sdg.sdg_image
                            )
                            ELSE NULL
                        END
                    ), JSON_ARRAY()
                ) AS sdgs
            FROM
                `tabActivity` AS act
            LEFT JOIN `tabVolunteer Activity` AS va ON va.activity = act.name
            {volunteer_condition}
            LEFT JOIN `tabSDGs Child` AS sd ON act.name = sd.parent
            LEFT JOIN `tabSDG` AS sdg ON sdg.name = sd.sdgs
            WHERE act.name = '{name}'
            {where_clause}
            """
        data = frappe.db.sql(sql_query, as_dict=True)
        doc = data[0] if data else data

        if exists:
            doc["is_assigned"] = True
        else:
            doc["is_assigned"] = False
        return doc

    def volunteer_act_count():
        sql_query = """
        SELECT 
            COUNT(va.activity) AS total_activity,
            SUM(a.work_value_rupees) AS total_rupees,
            SUM(a.hours) AS total_hours,
            (SELECT COUNT(*) FROM `tabNGOs`
                WHERE workflow_state = 'Approved'
            ) AS total_ngo,
            (SELECT COUNT(*) FROM `tabSVA User`
                WHERE workflow_state = 'Approved'
            ) AS volunteer_count 
        FROM `tabVolunteer Activity` AS va
        JOIN `tabActivity` AS a ON va.activity = a.name;
        """
        result = frappe.db.sql(sql_query, as_dict=True)
        return result

    def submit_opportunity_activity_report(name, data):
        volunteer = frappe.db.get_value(
            "SVA User", {"email": frappe.session.user}, "name"
        )
        if not volunteer:
            return {"error": "Volunteer not found", "status": 400}

        # Check if log entry exists
        existing_log = frappe.db.exists(
            "Volunteer Opportunity Activity Log", 
            {"volunteer": volunteer, "opportunity_activity": name}
        )

        if existing_log:
            # Update existing log
            doc = frappe.get_doc("Volunteer Opportunity Activity Log", existing_log)
        else:
            # Create new log
            doc = frappe.new_doc("Volunteer Opportunity Activity Log")
            doc.volunteer = volunteer
            doc.opportunity_activity = name
            # Get opportunity from activity
            opportunity = frappe.db.get_value("Opportunity Activity", name, "opportunity")
            doc.opportunity = opportunity

        # Handle image uploads
        images = data.get("images", [])
        if images:
            for image in images:
                Activity.upload_file(image, doc)

        # Add activity log entry
        doc.append(
            "volunteer_activity_log",
            {
                "date": frappe.utils.now(),
                "duration": data.get("duration"),
                "percent": data.get("percent"),
            },
        )

        # Update completion percentage
        current_percent = doc.com_percent or 0
        new_percent = current_percent + data.get("percent", 0)
        doc.com_percent = min(new_percent, 100)  # Ensure it doesn't exceed 100%

        # Update total duration
        current_duration = doc.duration or 0
        doc.duration = current_duration + data.get("duration", 0)

        # Set completion workflow state
        if doc.com_percent >= 100:
            doc.completion_wf_state = "Submitted"
        else:
            doc.completion_wf_state = "Pending"

        doc.save(ignore_permissions=True)
        frappe.db.commit()

        return {
            "status": "success",
            "message": "Activity report submitted successfully",
            "data": doc
        }

        
    def submit_activity_report(name, data):
        volunteer = frappe.db.get_value(
            "SVA User", {"email": frappe.session.user}, "name"
        )
        exists = frappe.db.exists(
            "Volunteer Activity", {"volunteer": volunteer, "name": name}
        )
        if not exists:
            return {"error": "Activity not assigned to the volunteer", "status": 400}
        doc = frappe.get_doc("Volunteer Activity", exists)
        images = data.get("images")
        if len(images):

            for image in images:
                Activity.upload_file(image, doc)

        doc.append(
            "volunteer_activity_log",
            {
                "date": frappe.utils.now(),
                "duration": data.get("duration"),
                "percent": data.get("percent"),
            },
        )
        doc.save(ignore_permissions=True)
        frappe.db.commit()
        return doc

    def upload_file(data, doc):
        try:
            if not data or not data.get("preview"):
                return {"status": "error", "message": "No image data provided"}

            base64_string = data.get("preview")
            if "," in base64_string:
                base64_string = base64_string.split(",")[1]

            # Generate unique filename with timestamp
            timestamp = frappe.utils.now().replace(" ", "_").replace(":", "_")
            file_name = f"{doc.doctype}_{doc.name}_{timestamp}.png"

            # Decode base64 content
            try:
                file_content = base64.b64decode(base64_string)
            except Exception as e:
                return {"status": "error", "message": "Invalid image data format"}

            # Save file based on document type
            if doc.doctype == "Volunteer Activity":
                file_path = save_file(
                    fname=file_name,
                    content=file_content,
                    dt="Volunteer Activity",
                    dn=doc.name,
                    is_private=0,
                )
            elif doc.doctype == "Volunteer Opportunity Activity Log":
                file_path = save_file(
                    fname=file_name,
                    content=file_content,
                    dt="Volunteer Opportunity Activity Log",
                    dn=doc.name,
                    is_private=0,
                )
            else:
                return {"status": "error", "message": "Unsupported document type"}

            if not file_path:
                return {"status": "error", "message": "Failed to save file"}

            # Append image to document
            doc.append("images", {
                "image": file_path.file_url,
                "parent": doc.name,
                "parentfield": "images",
                "parenttype": doc.doctype
            })

            return {"status": "success", "message": "File uploaded successfully", "file_url": file_path.file_url}

        except Exception as e:
            frappe.log_error(f"Error in upload_file: {str(e)}", "File Upload Error")
            return {"status": "error", "message": str(e)}

    def submit_feedback(name, volunteer, rating, comments):
        volunteer = frappe.db.get_value("SVA User", {"email": volunteer}, "name")
        exists = frappe.db.exists(
            "Volunteer Activity", {"volunteer": volunteer, "name": name}
        )
        if not exists:
            return {"error": "Activity not assigned to the volunteer", "status": 400}
        doc = frappe.get_doc("Volunteer Activity", exists)
        doc.rating = rating
        doc.remarks = comments
        doc.save()
        frappe.db.commit()
        return doc

    def get_activity_data():
        doc = frappe.get_all(
            "Activity",
            fields=[
                "title",
                "karma_points",
                "start_date",
                "end_date",
                "hours",
                "reward_description",
                "reward_image",
            ],
        )
        return doc

    def add_activity_images(docname, images):
        """Save uploaded images to the Volunteer Activity's child table."""
        doc = frappe.get_doc("Volunteer Activity", docname)
        # Ensure images is a list
        if isinstance(images, str):
            import json

            images = json.loads(images)
        for image in images:
            new_row = doc.append("images", {})
            new_row.image = image.get("file_url")
            new_row.file_name = image.get("file_name")

        doc.save()
        frappe.db.commit()
        return {"message": "Images added successfully"}
