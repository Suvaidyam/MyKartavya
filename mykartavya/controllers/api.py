import frappe
from frappe import _
from mykartavya.controllers.activity import Activity
from mykartavya.controllers.filter import Filters
from mykartavya.controllers.profile import Profile
from mykartavya.controllers.opportunity import Opportunity
from frappe.utils import validate_email_address
from frappe.utils.pdf import get_pdf
from frappe.utils.file_manager import save_file
import frappe
from frappe.utils.pdf import get_pdf


@frappe.whitelist(allow_guest=True)
def get_opportunity_activity(opportunity):
    return Opportunity.get_opportunity_activity(opportunity)

@frappe.whitelist(allow_guest=True)
def act_now_opp(activity,volunteer):
    return Opportunity.act_now_opp(activity,volunteer)

@frappe.whitelist(allow_guest=True)
def get_activity_opportunity(name=None):
    return Opportunity.get_activity_opportunity(name)

@frappe.whitelist(allow_guest=True)
def view_opportunity_certificate(opportunity):
    return Opportunity.view_opportunity_certificate(opportunity)

@frappe.whitelist(allow_guest=True)
def get_user_certificates_opp():
    return Opportunity.get_user_certificates_opp()

@frappe.whitelist(allow_guest=True)
def current_opportunity(filter={}):
    return Opportunity.current_opportunity(filter)

@frappe.whitelist(allow_guest=True)
def available_opportunities(filter={}):
    return Opportunity.available_opportunities(filter)

@frappe.whitelist(allow_guest=True)
def current_commitments_in_opportunity(filter={}):
    return Activity.current_commitments_in_opportunity(filter)

@frappe.whitelist(allow_guest=True)
def user_testimonial():
    try:
        # Fetch testimonials with all required fields
        testimonials = frappe.get_all(
            "Testimonial", 
            fields=[
                "name", "comment", "users", "is_publish", "user_name", 
                "user_type", "ngo_name", "company_name", "description", 
                "testimonial_type"
            ]
        )
        
        # Process each testimonial based on testimonial_type
        for testimonial in testimonials:
            if testimonial.get("testimonial_type") == "Internal":
                # For Internal testimonials, fetch user details from SVA User
                if testimonial.get("users"):
                    try:
                        # Check if the user exists in SVA User doctype
                        if frappe.db.exists("SVA User", testimonial["users"]):
                            user_doc = frappe.get_doc("SVA User", testimonial["users"])
                            testimonial["user_details"] = {
                                "name": user_doc.name,
                                "email": user_doc.email,
                                "full_name": user_doc.full_name,
                                "user_image": user_doc.user_image,
                                "user_type": user_doc.custom_volunteer_type,
                                "designation": (
                                    user_doc.custom_designation
                                    if hasattr(user_doc, "custom_designation")
                                    else None
                                ),
                            }
                        else:
                            # User doesn't exist in SVA User
                            testimonial["user_details"] = {
                                "name": testimonial.get("user"),
                                "email": None,
                                "full_name": f"User not found: {testimonial.get('users')}",
                                "user_image": None,
                                "user_type": None,
                                "designation": None,
                            }
                    except Exception as e:
                        # Handle any other errors during user lookup
                        frappe.log_error(f"Error fetching user {testimonial.get('users')}: {str(e)}")
                        testimonial["user_details"] = {
                            "name": testimonial.get("users"),
                            "email": None,
                            "full_name": f"Error loading user: {testimonial.get('users')}",
                            "user_image": None,
                            "user_type": None,
                            "designation": None,
                        }
            
            elif testimonial.get("testimonial_type") == "External":
                testimonial["user_details"] = {
                    "full_name": testimonial.get("user_name"),
                    "user_type": testimonial.get("user_type"),
                    "description": testimonial.get("description"),
                    "ngo_name": testimonial.get("ngo_name"),
                    "company_name": testimonial.get("company_name")
                }

        return {"message": testimonials}

    except Exception as e:
        frappe.log_error(f"Error in user_testimonial: {e}")
        return {"error": _("Failed to fetch testimonials with user details")}
    

@frappe.whitelist(allow_guest=True)
def corporate_partners_logo():
    try:
        logo = frappe.get_all(
            "Company Logos", fields=["company_logo", "company_name","name"], order_by="creation DESC"
        )
        return logo
    except Exception as e:
        frappe.log_error(
            f"Error fetching corporate partners logo: {str(e)}",
            "Corporate Partners Logo API",
        )
        return {"error": "Failed to fetch corporate partners logo"}


@frappe.whitelist(allow_guest=True)
def subscribe_to_newsletter(email, email_group="Mykartavya"):
    """Subscribe an email to a newsletter group"""
    try:
        # Validate email
        if not email:
            return {"success": False, "message": "Email is required"}

        email = email.strip().lower()  # Normalize email
        if not validate_email_address(email):
            return {"success": False, "message": "Please enter a valid email address"}

        # Check if email group exists
        if not frappe.db.exists("Email Group", email_group):
            frappe.log_error(
                f"Newsletter subscription failed - Invalid email group: {email_group}"
            )
            return {"success": False, "message": "Invalid email group"}

        # Check if email already exists in the group
        if frappe.db.exists(
            "Email Group Member", {"email": email, "email_group": email_group}
        ):
            return {
                "success": False,
                "message": "You are already subscribed to our newsletter",
            }

        # Create Newsletter document
        try:
            newsletter = frappe.get_doc(
                {
                    "doctype": "Newsletter",
                    "subject": f"Welcome to Mykartavya Newsletter! <Email {email}>",
                    "sender_email": "noreply.suvaidyam@gmail.com",
                    "sender_name": "Mykartavya",
                    "email_group": [
                        {"doctype": "Email Group", "email_group": email_group}
                    ],
                    "content_type": "Rich Text",
                    "message": f"""
                    <div class='ql-editor read-mode'>
                        <h3>Welcome to Mykartavya!</h3>
                        <p>Thank you for subscribing to our newsletter. We're excited to have you join our community!</p>
                        <p>Stay tuned for updates, news, and valuable insights.</p>
                    </div>
                """,
                    "send_unsubscribe_link": 1,
                    "published": 1,  # Mark as published
                }
            )
            newsletter.insert(ignore_permissions=True)
            newsletter.submit()  # Submit the document

            # Send the welcome email
            newsletter.send_emails()

        except Exception as e:
            frappe.log_error(
                message=f"Failed to create/send welcome newsletter for {email}: {str(e)}",
                title="Newsletter Creation Error",
            )
            # Continue with subscription even if welcome email fails

        # Subscribe email to the group
        from frappe.email.doctype.newsletter.newsletter import subscribe

        subscribe(email_group, email)

        # Log the successful subscription
        frappe.logger().info(f"New newsletter subscription: {email} to {email_group}")

        return {"success": True, "message": "Thank you for subscribing!"}

    except Exception as e:
        frappe.log_error(
            message=f"Newsletter subscription failed for {email}: {str(e)}",
            title="Newsletter Subscription Error",
        )
        return {
            "success": False,
            "message": "Failed to subscribe. Please try again later.",
        }


@frappe.whitelist(allow_guest=True)
def get_ngos_by_state():
    try:
        query = """
            SELECT s.state_name, s.state_code, COUNT(n.name) AS total_ngos
            FROM `tabNGOs` n
            JOIN `tabState` s ON n.state = s.state_code
            GROUP BY s.state_name, s.state_code
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
    url = (frappe.get_single("Social Login"),)
    return url


@frappe.whitelist(allow_guest=True)
def sva_user_data():
    return Profile.sva_user_data()

@frappe.whitelist()
def update_sva_user(data):
    return Profile.update_sva_user(data)

@frappe.whitelist(allow_guest=True)
def get_activity_data():
    return Activity.get_activity_data()


@frappe.whitelist(allow_guest=True)
def actvolunteer_data():
    doc = frappe.get_all("Volunteer Activity", fields=["*"])
    return doc


@frappe.whitelist(allow_guest=True)
def get_top_users(page=1, page_size=10):
    return Profile.get_top_users(page, page_size)

@frappe.whitelist(allow_guest=True)
def opportunity_activity_details(name):
    return Opportunity.opportunity_activity_details(name)


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
def act_now(activity, volunteer):
    return Activity.act_now(activity, volunteer)


@frappe.whitelist(allow_guest=True)
def submit_activity_report(name, data):
    return Activity.submit_activity_report(name, data)

@frappe.whitelist(allow_guest=True)
def submit_opportunity_activity_report(name, data):
    return Activity.submit_opportunity_activity_report(name, data)


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
def related_opportunities(filter={}):
    return Opportunity.related_opportunities(filter)

@frappe.whitelist(allow_guest=True)
def public_opportunities():
    return Opportunity.public_opportunities()


@frappe.whitelist(allow_guest=True)
def submit_feedback(name, volunteer, rating, comments):
    return Activity.submit_feedback(name, volunteer, rating, comments)

@frappe.whitelist(allow_guest=True)
def submit_feedbacks(name, volunteer, rating, comments):
    return Opportunity.submit_feedbacks(name, volunteer, rating, comments)



# master data
@frappe.whitelist(allow_guest=True)
def country_data():
    country = frappe.get_all("Country", fields=["*"])
    return country


@frappe.whitelist(allow_guest=True)
def state_data(country):
    state = frappe.get_all("State", filters={"custom_country": country}, fields=["*"])
    return state


@frappe.whitelist(allow_guest=True)
def city_data(state):
    city = frappe.get_all("District", filters={"state": state}, fields=["*"])
    return city

@frappe.whitelist(allow_guest=True)
def states_data():
    state = frappe.get_all("State",fields=["*"])
    return state

@frappe.whitelist(allow_guest=True)
def company_data():
    company = frappe.get_all("Company", fields=["*"])
    return company


@frappe.whitelist(allow_guest=True)
def user_count():
    return Profile.user_count()

@frappe.whitelist(allow_guest=True)
def user_count_opp():
    return Profile.user_count_opp()


@frappe.whitelist(allow_guest=True)
def top_three_volunteer():
    return Profile.top_three_volunteer()


@frappe.whitelist(allow_guest=True)
def create_subscription(data):
    if not frappe.db.exists("Company", data["organisation"]):
        frappe.throw(_("Invalid Company: {}").format(data["organisation"]))

    doc = frappe.get_doc(
        {
            "doctype": "Subscribe",
            "full_name": data["name"],
            "organisation": data["organisation"],
            "email_address": data["email"],
            "message": data["query"],
        }
    )

    doc.insert(ignore_permissions=True)
    frappe.db.commit()

    return {"success": True, "message": _("Subscription added successfully.")}


@frappe.whitelist(allow_guest=True)
def sdg_impacted():
    return Profile.sdg_impacted()


@frappe.whitelist()
def add_activity_images(docname, images):
    return Activity.add_activity_images(docname, images)

def list_to_tuple_string(user_permissions):
    return "(" + ",".join(f"'{item}'" for item in user_permissions) + ")"

@frappe.whitelist()
def get_sdg_contribution_details():
    va_conditions = []
    vo_conditions = []
    user = frappe.session.user
    
    if user != "Administrator":
        user_role = frappe.db.get_value("SVA User", {"email": user},'role_profile')
        if user_role == "Company Admin":
            user_permissions = frappe.db.get_all("User Permission",filters={"user": user,'allow':"Company"},pluck="for_value")
            if len(user_permissions):
                va_conditions.append(f"va_user.custom_company IN {list_to_tuple_string(user_permissions)}")
                vo_conditions.append(f"vo_user.custom_company IN {list_to_tuple_string(user_permissions)}")
        elif user_role == "NGO Admin":
            user_permissions = frappe.db.get_all("User Permission",filters={"user": user,'allow':"NGOs"},pluck="for_value")
            if len(user_permissions):
                va_conditions.append(f"va_user.custom_ngo IN {list_to_tuple_string(user_permissions)}")
                vo_conditions.append(f"vo_user.custom_ngo IN {list_to_tuple_string(user_permissions)}")

    va_where_clause = " AND " + " AND ".join(va_conditions) if va_conditions else ""
    vo_where_clause = " AND " + " AND ".join(vo_conditions) if vo_conditions else ""

    result = frappe.db.sql(f"""
        SELECT 
            COALESCE(sdg.name, 'Unknown SDG') AS sdg_name,
            COALESCE(sdg.sdg_image, '') AS sdg_image,
            SUM(data.total_work_value) AS total_work_values,
            SUM(data.total_hours) AS total_hours,
            COUNT(DISTINCT data.volunteer) AS volunteer_count
        FROM (
            -- Volunteer Activity
            SELECT 
                va.volunteer,
                act.work_value_rupees AS total_work_value,
                act.hours AS total_hours,
                sdc.sdgs
            FROM `tabVolunteer Activity` AS va
            LEFT JOIN `tabActivity` AS act ON act.name = va.activity
            LEFT JOIN `tabSDGs Child` AS sdc ON act.name = sdc.parent AND sdc.parentfield = 'sdgs'
            LEFT JOIN `tabSVA User` AS va_user ON va_user.name = va.volunteer
            WHERE va.completion_wf_state = 'Approved' {va_where_clause}

            UNION ALL

            -- Volunteer Opportunity
            SELECT 
                vo.volunteer,
                vo.work_value_in_rupees AS total_work_value,
                act.min_volunteering_time AS total_hours,
                sdc.sdgs
            FROM `tabVolunteer Opportunity` AS vo
            LEFT JOIN `tabOpportunity` AS act ON act.name = vo.activity
            LEFT JOIN `tabSDGs Child` AS sdc ON act.name = sdc.parent AND sdc.parentfield = 'sdgs'
            LEFT JOIN `tabSVA User` AS vo_user ON vo_user.name = vo.volunteer
            WHERE vo.completion_wf_state = 'Approved' {vo_where_clause}
        ) AS data
        LEFT JOIN `tabSDG` AS sdg ON data.sdgs = sdg.name
        GROUP BY sdg.name, sdg.sdg_image
        ORDER BY total_work_values DESC
    """, as_dict=True)

    return result



@frappe.whitelist(allow_guest=True)
def get_faqs():
    try:
        # Fetch all published FAQs without display_order and category
        faqs = frappe.get_all(
            "FAQs",
            filters={"is_published": 1},
            fields=["question", "answer"],
            order_by="creation ASC",
        )

        return {
            "success": True,
            "message": "FAQs fetched successfully",
            "data": {"all_faqs": faqs},
        }

    except Exception as e:
        frappe.log_error(f"Error in get_faqs: {str(e)}", "FAQ API Error")
        return {"success": False, "message": "Failed to fetch FAQs", "error": str(e)}




@frappe.whitelist()
def view_certificate(activity):
    try:
        # Get current user's SVA User record
        user = frappe.db.get_value(
            "SVA User",
            {"email": frappe.session.user},
            ["name", "full_name"],
            as_dict=True,
        )
        if not user:
            frappe.throw("User not found")

        # Get volunteer activity details
        volunteer_activity = frappe.db.get_value(
            "Volunteer Activity",
            filters={"activity": activity, "volunteer": user.name},
            fieldname=["name", "duration", "karma_points", "certificate"],
            as_dict=True,
        )
        if not volunteer_activity:
            frappe.throw("No volunteer activity found for this user and activity")

        # Return existing certificate if already generated
        if volunteer_activity.certificate:
            return {
                "success": True,
                "message": "Certificate already exists",
                "certificate_url": volunteer_activity.certificate,
            }

        # Get activity details
        activity_doc = frappe.get_doc("Activity", activity)

        # Prepare certificate data
        completion_date = frappe.utils.now_datetime()  # Ensure it's a datetime object
        certificate_data = {
            "full_name": user.full_name,
            "activity_title": activity_doc.title,
            "completion_date": completion_date.strftime(
                "%d %B %Y"
            ),  # Convert to string
            "hours_contributed": str(
                round((volunteer_activity.duration or 0) / 3600, 2)
            ),
            "karma_points": str(volunteer_activity.karma_points or 0),
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
        file_doc = frappe.get_doc(
            {
                "doctype": "File",
                "file_url": file_url,
                "file_name": filename,
                "attached_to_doctype": "Volunteer Activity",
                "attached_to_name": volunteer_activity.name,
                "attached_to_field": "certificate",
                "is_private": 0,
            }
        )
        file_doc.insert(ignore_permissions=True)

        # Update volunteer activity with certificate link
        frappe.db.set_value(
            "Volunteer Activity", volunteer_activity.name, "certificate", file_url
        )

        return {
            "success": True,
            "message": "Certificate generated successfully",
            "certificate_url": file_url,
        }

    except Exception as e:
        frappe.log_error(
            f"Error generating certificate: {str(e)}", "Certificate Generation Error"
        )
        return {"success": False, "message": str(e)}


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
                "certificate": ["is", "set"],  
            },
            fields=["name", "activity", "certificate", "creation"],
        )

        # Get activity titles
        for cert in certificates:
            activity = frappe.get_doc("Activity", cert.activity)
            cert.activity_title = activity.title
            cert.date = frappe.utils.format_date(cert.creation)

        return {"success": True, "certificates": certificates}

    except Exception as e:
        frappe.log_error(
            f"Error fetching certificates: {str(e)}", "Certificate Fetch Error"
        )
        return {"success": False, "message": str(e)}
    

 


@frappe.whitelist(allow_guest=True)
def get_all_skills():
    skills = frappe.get_all("Skills", fields=["name", "skill_name"])
    return skills


@frappe.whitelist(allow_guest=True)
def notify_admin_approval(volunteer):
    try:
        # Get admin users with MyKartavya Admin role profile
        admin_users = frappe.get_all(
            "SVA User", filters={"role_profile": "MyKartvya Admin"}, pluck="email"
        )
        if not admin_users:
            return {"status": "error", "message": "No admin users found"}

        # Get volunteer details
        volunteer_details = frappe.get_doc("SVA User", {"email": volunteer})
        # Create notification for each admin
        for admin in admin_users:
            frappe.get_doc(
                {
                    "doctype": "Notification Log",
                    "for_user": admin,
                    "type": "Alert",
                    "document_type": "SVA User",
                    "document_name": volunteer_details.name,
                    "subject": f"New Approval Request from {volunteer_details.full_name}",
                    "message": f"A new volunteer {volunteer_details.full_name} has requested approval. Please review their profile.",
                    "read": 0,
                }
            ).insert(ignore_permissions=True)
        return {"status": "success", "message": "Admin users have been notified"}

    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "notify_admin_approval Error")
        return {"status": "error", "message": str(e)}


@frappe.whitelist(allow_guest=True)
def get_sdg_list():
    """Fetch list of SDGs for frontend display"""
    try:
        sdgs = frappe.get_all(
            "SDG",
            fields=['name', 'sdg'],
            order_by='sdg ASC'
        )
        return {"success": True, "data": sdgs}
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Get SDG List API Error")
        return {"success": False, "message": str(e)}

@frappe.whitelist(allow_guest=True)
def submit_birthday_details(data):
    """Create a new Birthdays document from submitted form data"""
    try:
        # Ensure data is a dictionary
        if not isinstance(data, dict):
            frappe.throw("Invalid data format")

        # Prepare child table data for SDGs
        sdg_child_data = []
        selected_sdgs = data.get('choose_sdgs', [])
        if isinstance(selected_sdgs, list):
            for sdg_name in selected_sdgs:
                if sdg_name:
                    sdg_child_data.append({
                        "doctype": "SDGs Child",
                        "sdgs": sdg_name # Link to the SDG DocType
                    })
        else:
             frappe.log_warning(f"Expected list for choose_sdgs, but received {type(selected_sdgs)}", "SDG Data Format Warning")
             # Optionally throw an error or handle appropriately if the format is strictly enforced

        # Create a new Birthdays document
        doc = frappe.get_doc({
            "doctype": "Birthdays",
            "name1": data.get('name1'), # Name
            "email_id": data.get('email_id'), # Email ID
            "mobile_number": data.get('mobile_number'), # Mobile Number
            "birth_date": data.get('birth_date'), # Birth Date
            "choose_sdgs": sdg_child_data # Assign the list of child documents
        })

        # Insert the document, ignoring permissions as requested
        doc.insert(ignore_permissions=True)
        frappe.db.commit()

        return {"success": True, "message": "Birthday details submitted successfully!"}

    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Submit Birthday Details API Error")
        return {"success": False, "message": str(e)}
