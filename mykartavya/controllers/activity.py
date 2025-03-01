import frappe


class Activity:
    def current_commitments(filter={}):
        user = frappe.db.get_value("SVA User", {"email": frappe.session.user}, "name")
        if not user:
            return []
        where_clause = ""
        order_by_clause = ""
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
                where_clause += f" AND act.sdgs IN ({sdgs_values})"
            
            if "volunteering_hours" in filter and filter["volunteering_hours"]:
                if filter["volunteering_hours"] == "Low to High":
                    order_by_clause = " ORDER BY act.hours ASC"
                elif filter["volunteering_hours"] == "High to Low":
                    order_by_clause = " ORDER BY act.hours DESC"
        
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
            act.activity_image as activity_image
        FROM
            `tabVolunteer Activity` AS va
        INNER JOIN `tabActivity` AS act ON va.activity = act.name
        WHERE volunteer  = '{user}' {where_clause} 
        {order_by_clause}
        """
        return frappe.db.sql(sql, as_dict=True)
    
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
                where_clause += f" AND act.sdgs IN ({sdgs_values})"
            
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
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'name', sva.name,
                        'full_name', sva.full_name,
                        'email', sva.email,
                        'user_image', sva.user_image
                    )
                ) as volunteers
            FROM `tabActivity` as act
            LEFT JOIN `tabVolunteer Activity` as va ON va.activity = act.name
            LEFT JOIN `tabSVA User` as sva ON sva.name = va.volunteer
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

    def act_now(activity, volunteer):
        # same activity can't be assigned to the same volunteer
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
    
    def activity_details(name):

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
            va.workflow_state as workflow_state
        FROM
            `tabVolunteer Activity` AS va
        INNER JOIN `tabActivity` AS act ON va.activity = act.name
        WHERE va.name = '{name}'
        """
        data = frappe.db.sql(sql_query, as_dict=True)
        return data[0] if data else {}

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
