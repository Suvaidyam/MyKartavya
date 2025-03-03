import frappe

class Profile:
    def sva_user_data():
        user = frappe.db.get_value("SVA User", {"email": frappe.session.user}, "name")
        doc = frappe.get_list(
            "SVA User", 
            filters={"name": user}, 
            fields=["name","mobile_number","full_name","first_name","last_name","email","user_image","custom_employee_id","custom_date_of_birth","custom_background_image","custom_company","custom_country","custom_state","custom_state.state_name as state","custom_city","custom_city.district_name as city"],
            ignore_permissions=True
        )
        return doc

    def update_sva_user(data):
        data = frappe.parse_json(data)
        data['password'] = 'admin@123'
        data['confirm_password'] = 'admin@123'
        name = frappe.db.get_value("SVA User", {"email": frappe.session.user}, "name")   
        user_doc = frappe.get_doc("SVA User", name)
        # return data
        if user_doc:
            user_doc.update(data)
            user_doc.flags.ignore_mandatory = True
            user_doc.flags.ignore_permissions = True
            user_doc.save()  
            frappe.db.commit()
            return user_doc
        else:
            return {'status': '400', 'message': 'User not found'}

    def total_karmapoint():
        sql_query = """
        SELECT 
            COUNT(va.activity) AS total_activity,
            COUNT(va.volunteer) AS volunteer_count,
            SUM(va.karma_points) AS karma_points,
            SUM(a.hours) AS total_hours,
            COUNT(CASE WHEN va.com_percent = 100 THEN va.activity END) AS activity_Completed
        FROM `tabVolunteer Activity` AS va
        JOIN `tabActivity` AS a ON va.activity = a.name;
        """
        results = frappe.db.sql(sql_query, as_dict=True)
        return results
    
    @frappe.whitelist(allow_guest=True)
    def top_three_volunteer():
        sql_query = """
        SELECT 
            su.first_name,
            su.user_image,
            va.volunteer,
            SUM(va.karma_points) AS total_karma_points,
            SUM(a.hours) AS total_hours,
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