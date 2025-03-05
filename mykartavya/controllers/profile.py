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

    def user_count():
        user = frappe.db.get_value("SVA User", {"email": frappe.session.user}, "name")
        
        sql_query = """
        SELECT 
            SUM(va.karma_points) AS karma_points,
            SUM(a.work_value_rupees) AS work_value_rupees,
            SUM(a.hours) AS total_hours,
            COUNT(va.activity) AS activity_completed
        FROM `tabVolunteer Activity` AS va
        INNER JOIN `tabActivity` AS a ON va.activity = a.name
        WHERE va.volunteer = %s AND va.completion_wf_state='Submitted';
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
    
    @frappe.whitelist(allow_guest=True)
    def sdg_impacted():
        sql_query = """
        SELECT 
            b.sdgs AS sdgs_name,
            b.sdg_image AS image,
            SUM(COALESCE(a.hours, 0)) AS hour, 
            SUM(COALESCE(a.work_value_rupees, 0)) AS work_values
        FROM `tabSDGs Child` AS b
        LEFT JOIN `tabActivity` AS a
            ON b.parent = a.name
        GROUP BY b.sdgs, b.sdg_image;
        """
        res = frappe.db.sql(sql_query, as_dict=True)
        return res

    
    @frappe.whitelist(allow_guest=True) 
    def check_user_fields(user_email):
    
        user = frappe.get_doc("User", user_email)  
        required_fields = ["id", "name", "phone",]

        missing_fields = [field for field in required_fields if not user.get(field)]

        if missing_fields:
            return {"success": False, "message": f"Missing fields: {', '.join(missing_fields)}"}
        return {"success": True, "message": "All fields are filled."}