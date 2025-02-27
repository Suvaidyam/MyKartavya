import frappe

class Activity:
    def current_commitments(filter={}):
        user = frappe.session.user
        sql_query = """
            SELECT 
                act.*
            FROM `tabActivity` as act
            LEFT JOIN `tabVolunteer Activity` as vc ON vc.activity = act.name
        """
        
        conditions = ["vc.volunteer = %s"]  # Ensure filtering by the logged-in user
        order_by = ""
        values = [user]  # Start with the user value

        if filter: 
            # Filtering conditions
            if "activity_type" in filter and filter["activity_type"]:
                activity_types = ", ".join(f"'{at}'" for at in filter["activity_type"])
                conditions.append(f"act.activity_type IN ({activity_types})")
                
            if "karma_points" in filter and filter["karma_points"]:
                try:
                    karma_points = int(filter["karma_points"])
                    conditions.append("act.karma_points = %s")
                    values.append(karma_points)
                except (ValueError, TypeError):
                    pass  # Skip if it's not a valid integer (e.g., "Low to High")
                
            if "sdgs" in filter and filter["sdgs"]:
                sdgs_values = ", ".join(f"'{sdg}'" for sdg in filter["sdgs"])
                conditions.append(f"act.sdgs IN ({sdgs_values})")
                
            if "volunteering_hours" in filter and filter["volunteering_hours"]:
                try:
                    volunteering_hours = float(filter["volunteering_hours"])
                    conditions.append("act.volunteering_hours = %s")
                    values.append(volunteering_hours)
                except (ValueError, TypeError):
                    pass  # Skip if it's not a valid float (e.g., "Low to High")

            # Sorting preferences
            order_clauses = []
            if "volunteering_hours" in filter:
                if filter["volunteering_hours"] == "Low to High":
                    order_clauses.append("act.volunteering_hours ASC")
                elif filter["volunteering_hours"] == "High to Low":
                    order_clauses.append("act.volunteering_hours DESC")

            if "karma_points" in filter:
                if filter["karma_points"] == "Low to High":
                    order_clauses.append("act.karma_points ASC")
                elif filter["karma_points"] == "High to Low":
                    order_clauses.append("act.karma_points DESC")

            if order_clauses:
                order_by = " ORDER BY " + ", ".join(order_clauses)

        # Construct WHERE clause
        sql_query += " WHERE " + " AND ".join(conditions)
        sql_query += " GROUP BY act.name"
        sql_query += order_by  

        try:
            acts = frappe.db.sql(sql_query, values=values, as_dict=True)
            return acts
        except Exception as e:
            frappe.log_error(f"SQL Error: {e}\nQuery:\n{sql_query}")
            raise
        
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