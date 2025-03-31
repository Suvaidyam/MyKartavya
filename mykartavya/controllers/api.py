import frappe
from frappe import _
from mykartavya.controllers.activity import Activity
from mykartavya.controllers.filter import Filters
from mykartavya.controllers.profile import Profile
from frappe.utils import validate_email_address
from frappe.utils.pdf import get_pdf
import time
import base64


@frappe.whitelist(allow_guest=True)
def user_testimonial():
    try:
        # Fetch testimonials with `sva_user`
        testimonials = frappe.get_all('Testimonial', fields=["name", "comment", "user","is_publish"])

        # Fetch user details for each testimonial from "SVA User"
        for testimonial in testimonials:
            if testimonial.get("user"):
                user_doc = frappe.get_doc("SVA User", testimonial["user"])
                testimonial["user_details"] = {
                    "name": user_doc.name,
                    "email": user_doc.email,
                    "full_name": user_doc.full_name,
                    "user_image":user_doc.user_image,
                    "user_type":user_doc.custom_volunteer_type,
                    "designation": user_doc.custom_designation if hasattr(user_doc, "custom_designation") else None 
                }

        return {"message": testimonials}

    except Exception as e:
        frappe.log_error(f"Error in user_testimonial: {e}")
        return {"error": _("Failed to fetch testimonials with user details")}
        
@frappe.whitelist(allow_guest=True)
def corporate_partners_logo():
    try:
        logo = frappe.get_all("Company", fields=["company_logo", "name"], order_by="creation DESC")
        return logo
    except Exception as e:
        frappe.log_error(f"Error fetching corporate partners logo: {str(e)}", "Corporate Partners Logo API")
        return {"error": "Failed to fetch corporate partners logo"}

@frappe.whitelist(allow_guest=True)
def subscribe_to_newsletter(email, email_group="Mykartavya"):
    """Subscribe an email to a newsletter group"""
    try:
        # Validate email
        if not email:
            return {
                "success": False,
                "message": "Email is required"
            }
            
        email = email.strip().lower()  # Normalize email
        if not validate_email_address(email):
            return {
                "success": False,
                "message": "Please enter a valid email address"
            }

        # Check if email group exists
        if not frappe.db.exists("Email Group", email_group):
            frappe.log_error(f"Newsletter subscription failed - Invalid email group: {email_group}")
            return {
                "success": False,
                "message": "Invalid email group"
            }

        # Check if email already exists in the group
        if frappe.db.exists("Email Group Member", {
            "email": email,
            "email_group": email_group
        }):
            return {
                "success": False,
                "message": "You are already subscribed to our newsletter"
            }

        # Create Newsletter document
        try:
            newsletter = frappe.get_doc({
                "doctype": "Newsletter",
                "subject": f"Welcome to Mykartavya Newsletter! <Email {email}>",
                "sender_email": "noreply.suvaidyam@gmail.com",
                "sender_name": "Mykartavya",
                "email_group": [{
                    "doctype": "Email Group",
                    "email_group": email_group
                }],
                "content_type": "Rich Text",
                "message": f"""
                    <div class='ql-editor read-mode'>
                        <h3>Welcome to Mykartavya!</h3>
                        <p>Thank you for subscribing to our newsletter. We're excited to have you join our community!</p>
                        <p>Stay tuned for updates, news, and valuable insights.</p>
                    </div>
                """,
                "send_unsubscribe_link": 1,
                "published": 1  # Mark as published
            })
            newsletter.insert(ignore_permissions=True)
            newsletter.submit()  # Submit the document
            
            # Send the welcome email
            newsletter.send_emails()
            
        except Exception as e:
            frappe.log_error(
                message=f"Failed to create/send welcome newsletter for {email}: {str(e)}", 
                title="Newsletter Creation Error"
            )
            # Continue with subscription even if welcome email fails

        # Subscribe email to the group
        from frappe.email.doctype.newsletter.newsletter import subscribe
        subscribe(email_group, email)
        
        # Log the successful subscription
        frappe.logger().info(f"New newsletter subscription: {email} to {email_group}")
        
        return {
            "success": True,
            "message": "Thank you for subscribing!"
        }
        
    except Exception as e:
        frappe.log_error(
            message=f"Newsletter subscription failed for {email}: {str(e)}", 
            title="Newsletter Subscription Error"
        )
        return {
            "success": False,
            "message": "Failed to subscribe. Please try again later."
        }

@frappe.whitelist(allow_guest=True)
def get_ngos_by_state():
    # return 'Hello World'
    try:
        query = """
            SELECT s.state_name, COUNT(n.name) AS total_ngos
            FROM `tabNGOs` n
            JOIN `tabState` s ON n.state = s.state_code
            GROUP BY s.state_name
            ORDER BY total_ngos DESC;
        """
        data = frappe.db.sql(query, as_dict=True)
        return data
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), _("Error fetching NGOs by state"))
        return {"error": str(e)}



@frappe.whitelist(allow_guest=True)
def sdg_data():
    return Filters.sdg_data()

@frappe.whitelist(allow_guest=True)
def get_login_details(): 
    url=frappe.get_single('Social Login'),
    return(url)
 
@frappe.whitelist(allow_guest=False)
def sva_user_data():
    return Profile.sva_user_data()

@frappe.whitelist()
def update_sva_user(data):
    try:
        data = frappe.parse_json(data)
        name = data.get('name')
        
        if not name:
            frappe.throw("User name is required")
            
        # Get the existing user doc
        user_doc = frappe.get_doc("SVA User", name)
        
        # Handle file uploads if present
        if data.get('custom_cv'):
            try:
                base64_string = data['custom_cv']
                if "," in base64_string:
                    base64_string = data['custom_cv'].split(",")[1]
                file_content = base64.b64decode(base64_string)
            except Exception:
                frappe.log_error(frappe.get_traceback(), "Base64 Decoding Error")
                return {"status": "error", "message": "Invalid cv file."}
            file_doc = frappe.get_doc({
                "doctype": "File",
                "file_name": f"cv_{name}.pdf",
                "attached_to_doctype": "SVA User",
                "attached_to_name": name,
                "attached_to_field": "custom_cv",
                "folder": "Home",
                "is_private": 0,
                "content": file_content
            })
            file_doc.save(ignore_permissions=True)
            data['custom_cv'] = file_doc.file_url

        if data.get('custom_portfolio'):
            try:
                base64_string = data['custom_portfolio']
                if "," in base64_string:
                    base64_string = data['custom_portfolio'].split(",")[1]
                file_content = base64.b64decode(base64_string)
            except Exception:
                frappe.log_error(frappe.get_traceback(), "Base64 Decoding Error")
                return {"status": "error", "message": "Invalid portfolio file."}
            file_doc = frappe.get_doc({
                "doctype": "File",
                "file_name": f"portfolio_{name}.pdf",
                "attached_to_doctype": "SVA User",
                "attached_to_name": name,
                "attached_to_field": "custom_portfolio",
                "folder": "Home",
                "is_private": 0,
                "content": file_content
            })
            file_doc.save(ignore_permissions=True)
            data['custom_portfolio'] = file_doc.file_url

        # Update other fields
        for key, value in data.items():
            if hasattr(user_doc, key) and key != 'name':
                user_doc.set(key, value)
        
        user_doc.save(ignore_permissions=True)
        
        return {
            "status": 200,
            "message": "User updated successfully",
            "file_url": data.get('custom_cv') or data.get('custom_portfolio')
        }
        
    except Exception as e:
        frappe.log_error(f"Error in update_sva_user: {str(e)}", "SVA User Update Error")
        return {
            "status": 500,
            "message": f"Failed to update user: {str(e)}"
        }

@frappe.whitelist(allow_guest=True)
def get_activity_data():
    doc = frappe.get_all(
        "Activity", 
        fields=["title","karma_points","start_date","end_date","hours","reward_description","reward_image"]   
    )
    return doc

@frappe.whitelist(allow_guest=True)
def actvolunteer_data():
    doc = frappe.get_all(
        "Volunteer Activity", 
        fields=["*"]   
    )
    return doc
@frappe.whitelist(allow_guest=True)
def get_top_users(page=1, page_size=10):
    try:
        page = int(page)
        page_size = int(page_size)
        start = (page - 1) * page_size

        activities = frappe.get_list(
            "Volunteer Activity",
            fields=["volunteer.full_name", "karma_points", "duration", "volunteer.user_image"],
            order_by="karma_points DESC",
            group_by="volunteer",
            start=start,
            page_length=page_size,
            ignore_permissions=True
        )

        total_users = frappe.db.count("Volunteer Activity")

        return {
            "users": activities,
            "total_users": total_users,
            "total_pages": (total_users + page_size - 1) // page_size,
            "current_page": page
        }
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "get_top_users Error")
        return {"error": str(e)}


@frappe.whitelist(allow_guest=True)
def current_commitments(filter={}):
    return Activity.current_commitments(filter)

@frappe.whitelist(allow_guest=True)
def available_commitments(filter={}):
    return Activity.available_commitments(filter)

@frappe.whitelist(allow_guest=True)
def available_commitments_public(filter={}):
    return Activity.available_commitments_public(filter)

@frappe.whitelist(allow_guest=True)
def act_now(activity,volunteer):
    return Activity.act_now(activity,volunteer)

@frappe.whitelist(allow_guest=True)
def submit_activity_report(name,data):
    return Activity.submit_activity_report(name,data)

@frappe.whitelist(allow_guest=True)
def activity_details(name):
    return Activity.activity_details(name)

@frappe.whitelist(allow_guest=True)
def workflow_state():
    return Activity.workflow_state()

@frappe.whitelist(allow_guest=True)
def volunteer_act_count():
    return Activity.volunteer_act_count()

@frappe.whitelist(allow_guest=True)
def check_user_fields():
    return Profile.check_user_fields()

@frappe.whitelist(allow_guest=True)
def related_opportunities(name,sdgs):
    return Activity.related_opportunities(name,sdgs)

@frappe.whitelist(allow_guest=True)
def submit_feedback(name,volunteer,rating,comments):
    return Activity.submit_feedback(name,volunteer,rating,comments)

# master data
@frappe.whitelist(allow_guest=True)
def country_data():
    country = frappe.get_all(
        "Country", 
        fields=["*"]   
    )
    return country

@frappe.whitelist(allow_guest=True)
def state_data(country):
    state = frappe.get_all(
        "State", 
        filters={"custom_country": country},
        fields=["*"]   
    )
    return state
   

@frappe.whitelist(allow_guest=True)
def city_data(state):
    city = frappe.get_all(
        "District", 
        filters={"state": state},
        fields=["*"]   
    )
    return city
    
@frappe.whitelist(allow_guest=True)
def company_data():
    company = frappe.get_all(
        "Company", 
        fields=["*"]   
    )
    return company

@frappe.whitelist(allow_guest=True)
def user_count():
    return Profile.user_count()

@frappe.whitelist(allow_guest=True)
def top_three_volunteer():
    return Profile.top_three_volunteer()
 
@frappe.whitelist(allow_guest=True)
def create_subscription(data):
    if not frappe.db.exists("Company", data["organisation"]):  
        frappe.throw(_("Invalid Company: {}").format(data["organisation"]))

    doc = frappe.get_doc({
        "doctype": "Subscribe",
        "full_name": data["name"],
        "organisation": data["organisation"],  
        "email_address": data["email"],
        "message": data["query"],
    })
     
    doc.insert(ignore_permissions=True)
    frappe.db.commit()
    
    return {"success": True, "message": _("Subscription added successfully.")}

@frappe.whitelist(allow_guest=True)
def sdg_impacted():
    return Profile.sdg_impacted()

@frappe.whitelist()
def add_activity_images(docname, images):
    """Save uploaded images to the Volunteer Activity's child table."""
    doc = frappe.get_doc("Volunteer Activity", docname)
    # Ensure images is a list
    if isinstance(images, str):
        import json
        images = json.loads(images)

    for image in images:
        new_row = doc.append("images", {})
        new_row.image = image.get("file_url")
        new_row.file_name = image.get("file_name")

    doc.save()
    frappe.db.commit()
    return {"message": "Images added successfully"}


@frappe.whitelist()
def get_sdg_contribution_details():
    result = frappe.db.sql("""
        SELECT 
            COALESCE(sdg.name, 'Unknown SDG') AS sdg_name,
            COALESCE(sdg.sdg_image, '') AS sdg_image,
            COALESCE(SUM(act.work_value_rupees), 0) AS total_work_values,
            COALESCE(SUM(act.hours), 0) AS total_hours,
            COUNT(DISTINCT va.volunteer) AS volunteer_count
        FROM 
            `tabActivity` AS act
        LEFT JOIN `tabSDGs Child` AS sdc 
            ON act.name = sdc.parent AND sdc.parentfield = 'sdgs'
        LEFT JOIN `tabSDG` AS sdg 
            ON sdc.sdgs = sdg.name
        LEFT JOIN `tabVolunteer Activity` AS va 
            ON act.name = va.activity
        GROUP BY
            sdg_name
        ORDER BY 
            total_work_values DESC
    """, as_dict=True)

    print(result)  # ✅ Indentation fixed

    return result

@frappe.whitelist(allow_guest=True)
def get_faqs():
    try:
        # Fetch all published FAQs without display_order and category
        faqs = frappe.get_all(
            "FAQs",
            filters={"is_published": 1},
            fields=["question", "answer"],
            order_by="creation ASC"
        )

        return {
            "success": True,
            "message": "FAQs fetched successfully",
            "data": {
                "all_faqs": faqs
            }
        }

    except Exception as e:
        frappe.log_error(f"Error in get_faqs: {str(e)}", "FAQ API Error")
        return {
            "success": False,
            "message": "Failed to fetch FAQs",
            "error": str(e)
        }



import frappe
from frappe.utils.pdf import get_pdf
from datetime import datetime

@frappe.whitelist()
def view_certificate(activity):
    try:
        # Get current user's SVA User record
        user = frappe.db.get_value("SVA User", {"email": frappe.session.user}, ["name", "full_name"], as_dict=True)
        if not user:
            frappe.throw("User not found")
            
        # Get volunteer activity details
        volunteer_activity = frappe.db.get_value("Volunteer Activity",
            filters={"activity": activity, "volunteer": user.name},
            fieldname=["name", "duration", "karma_points", "certificate"],
            as_dict=True
        )
        if not volunteer_activity:
            frappe.throw("No volunteer activity found for this user and activity")
            
        # Return existing certificate if already generated
        if volunteer_activity.certificate:
            return {
                "success": True,
                "message": "Certificate already exists",
                "certificate_url": volunteer_activity.certificate
            }

        # Get activity details
        activity_doc = frappe.get_doc("Activity", activity)

        # Prepare certificate data
        completion_date = frappe.utils.now_datetime()  # Ensure it's a datetime object
        certificate_data = {
            "full_name": user.full_name,
            "activity_title": activity_doc.title,
            "completion_date": completion_date.strftime("%d %B %Y"),  # Convert to string
            "hours_contributed": str(round((volunteer_activity.duration or 0) / 3600, 2)),
            "karma_points": str(volunteer_activity.karma_points or 0)
        }

        # Load HTML template
        template = frappe.get_template("mykartavya/templates/pages/certificate.html")
        if not template:
            frappe.throw("Certificate template not found")

        html = template.render(certificate_data)

        # Generate PDF
        if not get_pdf:
            frappe.throw("get_pdf function is missing. Check your Frappe installation.")

        pdf_data = get_pdf(html)

        # Generate unique filename
        filename = f"certificate_{activity}_{frappe.session.user}_{completion_date.strftime('%Y%m%d%H%M%S')}.pdf"
        file_path = frappe.get_site_path("public", "files", filename)

        # Save PDF file
        with open(file_path, "wb") as f:
            f.write(pdf_data)

        # Create File document in Frappe
        file_url = f"/files/{filename}"
        file_doc = frappe.get_doc({
            "doctype": "File",
            "file_url": file_url,
            "file_name": filename,
            "attached_to_doctype": "Volunteer Activity",
            "attached_to_name": volunteer_activity.name,
            "attached_to_field": "certificate",
            "is_private": 0
        })
        file_doc.insert(ignore_permissions=True)

        # Update volunteer activity with certificate link
        frappe.db.set_value("Volunteer Activity", volunteer_activity.name, "certificate", file_url)

        return {
            "success": True,
            "message": "Certificate generated successfully",
            "certificate_url": file_url
        }

    except Exception as e:
        frappe.log_error(f"Error generating certificate: {str(e)}", "Certificate Generation Error")
        return {
            "success": False,
            "message": str(e)
        }

@frappe.whitelist()
def get_user_certificates():
    try:
        user = frappe.db.get_value("SVA User", {"email": frappe.session.user}, "name")
        if not user:
            return {"success": False, "message": "User not found"}
            
        certificates = frappe.get_all(
            "Volunteer Activity",
            filters={
                "volunteer": user,
                "certificate": ["is", "set"]  # Only get activities with certificates
            },
            fields=["name", "activity", "certificate", "creation"]
        )
        
        # Get activity titles
        for cert in certificates:
            activity = frappe.get_doc("Activity", cert.activity)
            cert.activity_title = activity.title
            cert.date = frappe.utils.format_date(cert.creation)
            
        return {
            "success": True,
            "certificates": certificates
        }
        
    except Exception as e:
        frappe.log_error(f"Error fetching certificates: {str(e)}", "Certificate Fetch Error")
        return {
            "success": False,
            "message": str(e)
        }
