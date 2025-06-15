import frappe

# Activity Published & Ended
@frappe.whitelist()
def activity_status_notification(doc, method=None):
    if doc.activity_status == "Published":
        send_notification_to_all_sva_users(doc.title, status="published")
    elif doc.activity_status == "Ended":
        send_notification_to_all_sva_users(doc.title, status="ended")

def send_notification_to_all_sva_users(activity_name, status):
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
            message = f"Dear {username}, Activity - {activity_name} has been published."
        elif status == "ended":
            subject = "Activity Closed"
            message = f"Dear {username}, Activity - {activity_name} has been closed."

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
            message = f"Dear {username}, Opportunity - {opportunity_name} has been published."
        elif status == "ended":
            subject = "Opportunity Closed"
            message = f"Dear {username}, Opportunity - {opportunity_name} has been closed."

        frappe.sendmail(
            recipients=[user_email],
            subject=subject,
            message=message
        )

