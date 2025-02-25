import frappe

class Activity:
    def acts_data():
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
            GROUP BY act.name
        """
        acts = frappe.db.sql(sql_query, as_dict=True)
        return acts