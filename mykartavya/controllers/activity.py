import frappe


class Activity:
    def current_commitments(filter={}):
        user = frappe.db.get_value("SVA User", {"email": frappe.session.user}, "name")
        if not user:
            return []

        where_clauses = ["va.volunteer = %(user)s"]
        order_by_clauses = []
        params = {"user": user}

        if isinstance(filter, str):
            filter = frappe.parse_json(filter)

        if filter:
            if "activity_type" in filter and filter["activity_type"]:
                where_clauses.append("act.activity_type IN %(activity_types)s")
                params["activity_types"] = tuple(filter["activity_type"])

            if "karma_points" in filter and filter["karma_points"]:
                order_by_clauses.append("act.karma_points ASC" if filter["karma_points"] == "Low to High" else "act.karma_points DESC")

            if "sdgs" in filter and filter["sdgs"]:
                where_clauses.append("sd.sdgs IN %(sdgs_values)s")
                params["sdgs_values"] = tuple(filter["sdgs"])

            if "volunteering_hours" in filter and filter["volunteering_hours"]:
                order_by_clauses.append("act.hours ASC" if filter["volunteering_hours"] == "Low to High" else "act.hours DESC")

        where_clause = " AND ".join(where_clauses)
        order_by_clause = " ORDER BY " + ", ".join(order_by_clauses) if order_by_clauses else ""

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
            act.activity_description as activity_description,
            act.activity_type as activity_type,
            act.activity_image as activity_image,
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
        {order_by_clause}
        GROUP BY act.name
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
        if user:
            where_clause += f" AND act.name NOT IN (SELECT activity FROM `tabVolunteer Activity` WHERE volunteer = '{user}')"
        if isinstance(filter, str):
            filter = frappe.parse_json(filter)
        if filter:
            if "activity_type" in filter and filter["activity_type"]:
                activity_types = ", ".join(f"'{at}'" for at in filter["activity_type"])
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
                        act.title as title,
                        act.karma_points as karma_points,
                        act.start_date as start_date,
                        act.end_date as end_date,
                        act.hours as hours,
                        act.activity_description as activity_description,
                        act.activity_type as activity_type,
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
                    WHERE act.end_date >= CURRENT_DATE() {where_clause}
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
        # same activity can't be assigned to the same volunteer
        volunteer = frappe.db.get_value("SVA User", {"email": volunteer}, "name")
        act = frappe.get_list(
            "Volunteer Activity",
            filters={"activity": activity, "volunteer": volunteer},
            pluck="name",
        )
        if act:
            return {"error": "Activity already assigned to the volunteer", "status": 400}
        doc = frappe.new_doc("Volunteer Activity")
        doc.activity = activity
        doc.volunteer = volunteer
        doc.flags.ignore_permissions = True
        doc.flags.ignore_mandatory = True
        doc.save()
        return doc
    
    def workflow_state():
        doc = frappe.get_doc('Workflow', 'Volunteer_activity')
        return doc
    # activity_details
    def activity_details(name):
        user = frappe.db.get_value("SVA User", {"email": frappe.session.user}, "name")
        exists = frappe.db.exists("Volunteer Activity", {"volunteer": user, "activity": name})
        where_clause = ""

        volunteer_condition = f"AND va.volunteer = '{user}'" if exists else "AND va.volunteer IS NULL"

        sql_query = f"""
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
                act.activity_description as activity_description,
                act.activity_type as activity_type,
                act.activity_image as activity_image,
                va.workflow_state as workflow_state,
                va.completion_wf_state as completion_wf_state,
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
            IFNULL(COUNT(va.activity), 0) AS total_activity,
            IFNULL(COUNT(va.volunteer), 0) AS volunteer_count,
            IFNULL(SUM(a.work_value_rupees), 0) AS total_rupees,
            IFNULL(SUM(a.hours), 0) AS total_hours,
            IFNULL(COUNT(DISTINCT a.ngo), 0) AS total_ngo 
        FROM `tabVolunteer Activity` AS va
        JOIN `tabActivity` AS a ON va.activity = a.name;
        """
        result = frappe.db.sql(sql_query, as_dict=True)
        return result

    def submit_activity_report(name,data):
        volunteer = frappe.db.get_value("SVA User", {"email": frappe.session.user}, "name")
        exists = frappe.db.exists("Volunteer Activity", {"volunteer": volunteer, "name": name})
        if not exists:
            return {"error": "Activity not assigned to the volunteer", "status": 400}
        doc = frappe.get_doc("Volunteer Activity", exists)
        doc.append("volunteer_activity_log", {
            "date": frappe.utils.now(),
            "duration": data.get("duration"),
            "percent": data.get("percent"),
        })
        
        doc.save()
        frappe.db.commit() 
        return doc