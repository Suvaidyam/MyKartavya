import frappe

class Activity:
    def acts_data(filter):
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
        if filter: 
            if "activity_type" in filter and filter["activity_type"]:
                activity_types = ", ".join(f"'{at}'" for at in filter["activity_type"])
                conditions.append(f"act.activity_type IN ({activity_types})")
                
            if "karma_points" in filter and filter["karma_points"]:
                conditions.append(f"act.karma_points = {filter['karma_points']}")
                
            if "sdgs" in filter and filter["sdgs"]:
                sdgs_values = ", ".join(f"'{sdg}'" for sdg in filter["sdgs"])
                conditions.append(f"act.sdgs IN ({sdgs_values})")
                
            if "volunteering_hours" in filter and filter["volunteering_hours"]:
                conditions.append(f"act.volunteering_hours = {filter['volunteering_hours']}")

        if conditions:
            sql_query += " WHERE " + " AND ".join(conditions)
        
        sql_query += " GROUP BY act.name"
        acts = frappe.db.sql(sql_query, as_dict=True)
        return acts