import frappe

class Profile:
    def sva_user_data():
        user = frappe.session.user
        doc = frappe.get_all(
            "SVA User", 
            filters={"email": user}, 
            fields=["name","mobile_number","full_name","first_name","last_name","email","user_image","custom_employee_id","custom_date_of_birth","custom_background_image","custom_company","custom_country","custom_state","custom_state.state_name as state","custom_city","custom_city.district_name as city"]
        )
        return doc

    def update_sva_user(data):
        data = frappe.parse_json(data)
        user_email = frappe.session.user   
        user_doc = frappe.get_doc("SVA User", {"email": user_email})

        if user_doc:
            user_doc.update(data)
            user_doc.save(ignore_permissions=True)  
            frappe.db.commit()  # Commit the changes to the database
            return {"success": True, "message": "User updated successfully"}
        return {"success": False, "message": "User not found"}
