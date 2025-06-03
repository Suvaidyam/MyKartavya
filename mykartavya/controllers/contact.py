import frappe
import json

@frappe.whitelist(allow_guest=True)
def contacts(data=None):
    try:
        if isinstance(data, str):
            data = json.loads(data)
        elif not data:
            return {"status": "error", "message": "No data received."}

        # Required field validation
        required_fields = ['name', 'email', 'organisation', 'contact', 'volunteer_type', 'query']
        missing_fields = [field for field in required_fields if not data.get(field)]

        if missing_fields:
            return {
                "status": "error",
                "message": f"Missing required fields: {', '.join(missing_fields)}"
            }

        # Create and insert the document
        contact_doc = frappe.new_doc("Contacts")
        contact_doc.name1 = data.get("name")
        contact_doc.email = data.get("email")
        contact_doc.organisation = data.get("organisation")
        contact_doc.contact_number = data.get("contact")
        contact_doc.select_volunteer = data.get("volunteer_type")
        contact_doc.message = data.get("query")
        contact_doc.insert()
        frappe.db.commit()

        return {
            "message": "Your message has been sent successfully! We will get back to you soon."
        }

    except frappe.ValidationError as e:
        frappe.db.rollback()
        return {"status": "error", "message": f"Validation error: {str(e)}"}

    except Exception as e:
        frappe.db.rollback()
        frappe.log_error(f"Contact form submission error: {str(e)}")
        return {
            "status": "error",
            "message": "An error occurred while processing your request. Please try again later."
        }
