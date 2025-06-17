import frappe
import base64
from frappe.utils import cstr, now_datetime
from frappe.utils.file_manager import save_file

@frappe.whitelist(allow_guest=True)
def register_ngo(**kwargs):
    try:
        ngo_name = kwargs.get('ngo_name')
        base64_string = kwargs.get('ngo_logo')

        if not ngo_name:
            return {"status": "error", "message": "NGO Name is required"}
        if not base64_string or len(base64_string) < 50:
            return {"status": "error", "message": "NGO Logo is required"}
        
        try:
            if "," in base64_string:
                base64_string = base64_string.split(",")[1]
            file_content = base64.b64decode(base64_string)
        except Exception:
            frappe.log_error(frappe.get_traceback(), "Base64 Decoding Error")
            return {"status": "error", "message": "Invalid logo file."}

        temp_ngo_name = f"temp_{now_datetime().strftime('%Y%m%d_%H%M%S')}"
        file_name = f"{temp_ngo_name}.png"
        file_doc = save_file(
            fname=file_name,
            content=file_content,
            dt="NGOs",  
            dn=temp_ngo_name,  
            is_private=0,
        )

        if not file_doc or not file_doc.file_url:
            frappe.log_error("File Upload Error: File URL missing", "NGO Logo Upload")
            return {"status": "error", "message": "Failed to upload logo."}

        ngo = frappe.get_doc({
            "doctype": "NGOs",
            "registration_type": "Self Registration",
            "ngo_name": ngo_name,
            "ngo_logo": file_doc.file_url,   
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
        # Convert numeric fields to appropriate types
        if kwargs.get('number_of_employees'):
            kwargs['number_of_employees'] = int(kwargs['number_of_employees'])
        if kwargs.get('volunteering_csr_activities'):
            kwargs['volunteering_csr_activities'] = float(kwargs['volunteering_csr_activities'])
        if kwargs.get('employee_engagement'):
            kwargs['employee_engagement'] = float(kwargs['employee_engagement'])

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
        
        company.insert(ignore_permissions=True,ignore_mandatory=True) 
        filename = f"company_logo_{frappe.generate_hash()}.png"
        base64_string = kwargs.get("company_logo")
        company.company_logo = save_base64_image("Company",company.name,base64_string,filename)
        company.save()
        create_company_logo(company)
        
        return {
            "status": "success",
            "message": "Company registered successfully",
            "data": company.as_dict()
        }
        
    except ValueError as e:
        # Handle type conversion errors
        frappe.log_error(f"Company Registration Error - Invalid numeric value: {str(e)}")
        return {
            "status": "error",
            "message": "Please ensure all numeric fields contain valid numbers"
        }
    except Exception as e:
        frappe.log_error(f"Company Registration Error: {str(e)}")
        return {
            "status": "error",
            "message": str(e)
        } 
    

def create_company_logo(doc): 
    if not doc.company_logo:
        frappe.log_error("Company logo is missing; skipping logo creation.")
        return

    logo = frappe.new_doc("Company Logos")
    logo.update({
        "company_name": doc.company_name,
        "company_logo": doc.company_logo,
        "enabled": 1
    })
    logo.insert(ignore_permissions=True)
  

def save_base64_image(dt,docname, base64_string, filename):
    # Remove the data:image/png;base64, or similar prefix if present
    if ',' in base64_string:
        base64_string = base64_string.split(',')[1]
 
    # Decode base64 string
    file_content = base64.b64decode(base64_string)
    # Save file using Frappe's file manager
    saved_file = save_file(
        fname=filename,
        content=file_content,
        dt=dt,       # e.g. "Employee", "Item", etc.
        dn=docname,
        decode=False             # Already decoded
    )
    return saved_file.file_url


