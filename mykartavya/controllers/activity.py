import frappe


class Activity:
    def current_commitments(filter={}):
        user = frappe.session.user
        filters = {}
        order_by = ""
        if filter:
            if "activity_type" in filter and filter["activity_type"]:
                filters["activity_type"] = ["in", filter["activity_type"]]

            if "sdgs" in filter and filter["sdgs"]:
                filters["sdgs"] = ["in", filter["sdgs"]]

            if "volunteering_hours" in filter and filter["volunteering_hours"]:
                ordering = (
                    "ASC" if filter["volunteering_hours"] == "Low to High" else "DESC"
                )
                order_by = f"hours {ordering}"

            if "karma_points" in filter and filter["karma_points"]:
                ordering = "ASC" if filter["karma_points"] == "Low to High" else "DESC"
                order_by = f"karma_points {ordering}"
        activity_v = frappe.get_list(
            "Volunteer Activity",
            filters={"volunteer": user},
            fields=["activity", "duration", "com_percent"],
        )
        activity = []
        if activity_v:
            activity = [act["activity"] for act in activity_v]
            filters["name"] = ["in", activity]

        activity_data = frappe.get_all(
            "Activity", filters=filters, fields=["*"], order_by=order_by
        )
        if len(activity_data) > 0:
            for act in activity_data:
                item = next(
                    (a for a in activity_v if a["activity"] == act["name"]), None
                )
                act["duration"] = item["duration"]
                act["completion_percent"] = item["com_percent"]
        return activity_data

    def available_commitments(filter={}):
        sql_query = """
            SELECT 
                act.*,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'name', sva.name,
                        'full_name', sva.full_name,
                        'email', sva.email,
                        'user_image', sva.user_image
                    )
                ) as volunteers
            FROM `tabActivity` as act
            LEFT JOIN `tabVolunteer Activity` as vc ON vc.activity = act.name
            LEFT JOIN `tabSVA User` as sva ON sva.name = vc.volunteer
        """
        conditions = []
        order_by = ""
        conditions.append("act.end_date >= CURRENT_DATE")
        if filter:
            if "activity_type" in filter and filter["activity_type"]:
                activity_types = ", ".join(f"'{at}'" for at in filter["activity_type"])
                conditions.append(f"act.activity_type IN ({activity_types})")

            if "karma_points" in filter and filter["karma_points"]:
                # Ensure karma_points is a number
                try:
                    karma_points = int(filter["karma_points"])
                    conditions.append(f"act.karma_points = {karma_points}")
                except (ValueError, TypeError):
                    pass  # Skip invalid input

            if "sdgs" in filter and filter["sdgs"]:
                sdgs_values = ", ".join(f"'{sdg}'" for sdg in filter["sdgs"])
                conditions.append(f"act.sdgs IN ({sdgs_values})")

            if "volunteering_hours" in filter and filter["volunteering_hours"]:
                # Ensure volunteering_hours is a number
                try:
                    volunteering_hours = float(filter["volunteering_hours"])
                    conditions.append(f"act.volunteering_hours = {volunteering_hours}")
                except (ValueError, TypeError):
                    pass  # Skip invalid input

            # Sorting preferences
            order_clauses = []
            if "sort_volunteering_hours" in filter:
                if filter["sort_volunteering_hours"] == "Low to High":
                    order_clauses.append("act.volunteering_hours ASC")
                elif filter["sort_volunteering_hours"] == "High to Low":
                    order_clauses.append("act.volunteering_hours DESC")

            if "sort_karma_points" in filter:
                if filter["sort_karma_points"] == "Low to High":
                    order_clauses.append("act.karma_points ASC")
                elif filter["sort_karma_points"] == "High to Low":
                    order_clauses.append("act.karma_points DESC")

            if order_clauses:
                order_by = " ORDER BY " + ", ".join(order_clauses)

        if conditions:
            sql_query += " WHERE " + " AND ".join(conditions)

        sql_query += " GROUP BY act.name"
        sql_query += order_by  # Append the sorting condition

        try:
            acts = frappe.db.sql(sql_query, as_dict=True)
            return acts
        except Exception as e:
            frappe.log_error(f"Syntax error in query:\n{sql_query}")
            raise

    def activity_details(name):
        doc = frappe.get_doc("Activity", name)
        return doc

    def volunteer_act_count():
        sql_query = """
            SELECT 
                COUNT(  va.activity) AS total_activity,
                COUNT( va.volunteer) AS volunteer_count,
                SUM(a.work_value_rupees) AS total_rupees,
                SUM(a.hours) AS total_hours,
                COUNT(DISTINCT a.ngo) AS total_ngo 
            FROM `tabVolunteer Activity` AS va
            JOIN `tabActivity` AS a ON va.activity = a.name;
        """
        result = frappe.db.sql(sql_query, as_dict=True)
        return result
