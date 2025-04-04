import frappe

class Profile:
    def sva_user_data():
        user = frappe.db.get_value("SVA User", {"email": frappe.session.user}, "name")
        doc = frappe.get_list(
            "SVA User", 
            filters={"name": user}, 
            fields=["name","mobile_number","full_name","first_name","last_name","email","user_image","custom_employee_id","custom_date_of_birth","custom_background_image","custom_company","custom_country","custom_state","custom_state.state_name as state","custom_city","custom_city.district_name as city","custom_portfolio","custom_cv","custom_designation" ,"custom_linkedin" ,'workflow_state','custom_gender','custom_remarks'],
            ignore_permissions=True
        )
        return doc

    def update_sva_user(data):
        data['password'] = 'admin@123'
        data['confirm_password'] = 'admin@123'
        name = frappe.db.get_value("SVA User", {"email": frappe.session.user}, "name")   
        # return data
        if name:
            user_doc = frappe.db.set_value("SVA User", name, data)
            return {'status': '200', 'message': 'User updated successfully'}
        else:
            return {'status': '400', 'message': 'User not found'}

    def user_count():
        user = frappe.db.get_value("SVA User", {"email": frappe.session.user}, "name")
        
        sql_query = """
        SELECT 
            SUM(va.karma_points) AS karma_points,
            SUM(a.work_value_rupees) AS work_value_rupees,
            SUM(va.duration )AS total_hours,
            COUNT(va.activity) AS activity_completed
        FROM `tabVolunteer Activity` AS va
        INNER JOIN `tabActivity` AS a ON va.activity = a.name
        WHERE va.volunteer = %s AND va.completion_wf_state='Approved';
        """
        results = frappe.db.sql(sql_query, (user,), as_dict=True)
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
        required_fields = ["first_name", "custom_date_of_birth", "mobile_number","custom_country","custom_state","custom_city"]
        for field in required_fields:
            if not frappe.db.get_value("SVA User", {"email": frappe.session.user}, field):
                validated = False
                break
        return {"success": validated}
        