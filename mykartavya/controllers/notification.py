import frappe
from frappe.utils.jinja import render_template


# Activity Published & Ended
@frappe.whitelist()
def activity_status_notification(doc, method=None):
    if doc.activity_status == "Published":
        send_notification_in_activity_users(doc.title, status="published")
    elif doc.activity_status == "Ended":
        send_notification_in_activity_users(doc.title, status="ended")

def send_notification_in_activity_users(activity_name, status):
    sva_users = frappe.get_all(
        "SVA User",
        filters={"email": ["not in", [None, ""]]},
        fields=["email", "full_name"]
    )

    for user in sva_users:
        user_email = user.email
        username = user.full_name or user_email

        if status == "published":
            subject = "New Activity Published"
            message = render_template("templates/emails/activity_published.html", {
                "username": username,
                "activity_name": activity_name
            })
        elif status == "ended":
            subject = "Activity Closed"
            message = render_template("templates/emails/activity_closed.html", {
                "username": username,
                "activity_name": activity_name
            })

        frappe.sendmail(
            recipients=[user_email],
            subject=subject,
            message=message
        )

# Opportunity Published & Ended
@frappe.whitelist()
def opportunity_status_notification(doc, method=None):
    if doc.opportunity_status == "Published":
        send_notification_to_all_sva_users(doc.opportunity_name, status="published")
    elif doc.opportunity_status == "Ended":
        send_notification_to_all_sva_users(doc.opportunity_name, status="ended")

def send_notification_to_all_sva_users(opportunity_name, status):
    sva_users = frappe.get_all(
        "SVA User",
        filters={"email": ["not in", [None, ""]]},
        fields=["email", "full_name"]
    )

    for user in sva_users:
        user_email = user.email
        username = user.full_name or user_email

        if status == "published":
            subject = "New Opportunity Published"
            message = render_template("templates/emails/opportunity_published.html", {
                "username": username,
                "opportunity_name":opportunity_name
            })
        elif status == "ended":
            subject = "Opportunity Closed"
            message = render_template("templates/emails/opportunity_closed.html", {
                "username": username,
                "opportunity_name": opportunity_name
            })

        frappe.sendmail(
            recipients=[user_email],
            subject=subject,
            message=message
        )