import frappe
from frappe import _
from frappe.utils import cstr
from frappe.utils.file_manager import save_file
import base64

@frappe.whitelist(allow_guest=True)
def register_ngo(**kwargs):
    try:
        # Create NGO document
        ngo = frappe.get_doc({
            "doctype": "NGOs",
            "registration_type": "Self Registration",
            "ngo_name": kwargs.get('ngo_name'),
            "website": kwargs.get('website'),
            "official_contact_number": kwargs.get('official_contact_number'),
            "email": kwargs.get('email'),
            "designation": kwargs.get('designation'),
            "country": kwargs.get('country'),
            "state": kwargs.get('state'),
            "city": kwargs.get('city'),
            "description": kwargs.get('description'),
            "license_type": kwargs.get('license_type'),
            "contact_person_name": kwargs.get('contact_person_name'),
            "ngo_head_name": kwargs.get('ngo_head_name'),
            "ngo_head_email": kwargs.get('ngo_head_email'),
            "ngo_head_mobile": kwargs.get('ngo_head_mobile'),
            "ngo_head_office_number": kwargs.get('ngo_head_office_number'),
            "area_of_work": kwargs.get('area_of_work'),
            "address": kwargs.get('address'),
            "pincode": kwargs.get('pincode'),
            "registered_with_bigtech": kwargs.get('registered_with_bigtech'),
        })
        ngo.insert(ignore_permissions=True)
        frappe.db.commit()

        try:
            base64_string = kwargs.get('ngo_logo')   
            if "," in base64_string:
                base64_string = base64_string.split(",")[1]
            file_name = f"{ngo.name}_{frappe.utils.now().replace(' ', '_')}.png"
            file_content = base64.b64decode(base64_string)
            file_path = save_file(
                fname=file_name,
                content=file_content,
                dt="NGOs",
                dn=ngo.name,
                is_private=0,
            )
            ngo.ngo_logo = file_path.file_url
            ngo.save(ignore_permissions=True)
            frappe.db.commit()
        except Exception as e:
            return {"status": "error", "message": str(e)}

        
        return {
            "status": "success",
            "message": "NGO registered successfully",
            "data": ngo.as_dict()
        }
        
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "NGO Registration Error")
        return {
            "status": "error",
            "message": cstr(e)
        }

@frappe.whitelist(allow_guest=True)
def register_company(**kwargs):
    try:
        # Create company document
        company = frappe.get_doc({
            "doctype": "Company",
            "registration_type": kwargs.get("registration_type"),
            "company_name": kwargs.get("company_name"),
            "company_registration_date": kwargs.get("registration_date"),
            "first_name": kwargs.get("first_name"),
            "last_name": kwargs.get("last_name"),
            "email": kwargs.get("email"),
            "designation": kwargs.get("designation"),
            "phone": kwargs.get("phone"),
            "mobile_number": kwargs.get("mobile_number"),
            "india_headquarters_address": kwargs.get("address"),
            "country": kwargs.get("country"),
            "state": kwargs.get("state"),
            "city": kwargs.get("city"),
            "pincode": kwargs.get("pincode"),
            "number_of_employees": kwargs.get("number_of_employees"),
            "clear_vision": kwargs.get("clear_vision"),
            "volunteering_csr_activities": kwargs.get("volunteering_csr_activities"),
            "employee_engagement": kwargs.get("employee_engagement"),
        })
        
        company.insert(ignore_permissions=True)
        
        return {
            "status": "success",
            "message": "Company registered successfully",
            "data": company.as_dict()
        }
        
    except Exception as e:
        frappe.log_error(f"Company Registration Error: {str(e)}")
        return {
            "status": "error",
            "message": str(e)
        } 