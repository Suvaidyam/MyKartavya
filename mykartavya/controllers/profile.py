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
