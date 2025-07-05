import frappe
from datetime import datetime, timedelta
from frappe.utils import getdate, add_days, nowdate, today
from frappe.utils.jinja import render_template


# Activity activity_status Change to sheduler
@frappe.whitelist()
def process_activities():
    today = datetime.now().date()

    activities = frappe.get_all(
        "Activity",
        filters={"activity_status": ["!=", "Ended"]},
        fields=[
            "name",
            "activity_status",
            "publish_date",
            "start_date",
            "end_date",
            "docstatus",
            "activity_published_date_starts",
        ],
    )

    for activity in activities:
        new_status = None
        update_fields = {}

        publish_date = (
            activity.publish_date
            and frappe.utils.getdate(activity.publish_date)
            or None
        )
        start_date = (
            activity.start_date and frappe.utils.getdate(activity.start_date) or None
        )
        end_date = activity.end_date and frappe.utils.getdate(activity.end_date) or None

        if activity.activity_published_date_starts and publish_date:
            effective_start_date = publish_date
        else:
            effective_start_date = start_date

        if end_date and today >= end_date:
            new_status = "Ended"
        elif effective_start_date and today >= effective_start_date:
            new_status = "Ongoing"
        elif publish_date and today >= publish_date:
            new_status = "Published"
        else:
            new_status = "Draft"

        if new_status and new_status != activity.activity_status:
            update_fields["activity_status"] = new_status

            if update_fields:
                frappe.db.set_value(
                    "Activity", activity.name, update_fields, update_modified=False
                )
                frappe.db.commit()

                log_message = f"Activity {activity.name} status updated from {activity.activity_status} to {new_status}"
                frappe.log_error(log_message, "Activity Status Update")

    frappe.log_error("Activity status check completed", "Activity Cron")


# Opportunity status Change to sheduler
@frappe.whitelist()
def opportunity_publish():
    today = datetime.now().date()

    opportunities = frappe.get_all(
        "Opportunity",
        filters={"opportunity_status": ["!=", "Ended"]},
        fields=["name", "opportunity_status", "start_date", "end_date", "docstatus"],
    )

    for opportunity in opportunities:
        new_status = None
        update_fields = {}

        start_date = (
            opportunity.start_date
            and frappe.utils.getdate(opportunity.start_date)
            or None
        )
        end_date = (
            opportunity.end_date and frappe.utils.getdate(opportunity.end_date) or None
        )

        if end_date and today >= end_date:
            new_status = "Ended"
        elif start_date and today >= start_date:
            new_status = "Published"
        else:
            new_status = "Draft"

        # Fixed: Compare with opportunity.opportunity_status instead of opportunity.status
        if new_status and new_status != opportunity.opportunity_status:
            update_fields["opportunity_status"] = new_status

            if update_fields:
                # Fixed: Update "Opportunity" doctype instead of "Activity"
                frappe.db.set_value(
                    "Opportunity",
                    opportunity.name,
                    update_fields,
                    update_modified=False,
                )
                frappe.db.commit()

                # Fixed: Use opportunity.opportunity_status in log message
                log_message = f"Opportunity {opportunity.name} status updated from {opportunity.opportunity_status} to {new_status}"
                if "docstatus" in update_fields:
                    log_message += " (and submitted document)"
                frappe.log_error(log_message, "Opportunity Status Update")

    # Fixed: Log message to reflect "Opportunity" instead of "Activity"
    frappe.log_error("Opportunity status check completed", "Opportunity Cron")


# start_activities closing date passed to sheduler
@frappe.whitelist()
def start_activities():
    today = getdate(nowdate())
    threshold_date = add_days(today, -2)  # 2 days before today

    activities = frappe.get_all(
        "Activity",
        filters={"activity_status": "Scheduled", "end_date": ["<=", threshold_date]},
        fields=["name", "title", "activity_status", "end_date"],
    )

    for act in activities:
        # Send notification to all users
        send_activity_start_notification(act)

    frappe.db.commit()


def send_activity_start_notification(activity):
    subject = f"Activity - {activity.title} is going to start"
    message = frappe.render_template(
        "templates/emails/activity_ongoing.html",
        {
            "activity_name": activity.title,
        },
    )

    recipients = frappe.get_all(
        "SVA User", filters={"email": ["!=", ""]}, pluck="email"
    )

    if recipients:
        frappe.sendmail(recipients=recipients, subject=subject, message=message)


# Activity end date passed. Reminder to submit report. sheduler
@frappe.whitelist()
def send_reporting_reminders():
    from datetime import datetime, timedelta

    today = datetime.today().date()
    target_deadlines = [today + timedelta(days=3), today + timedelta(days=7)]

    activities = frappe.get_all(
        "Activity",
        filters={
            "reporting_deadline": ["in", target_deadlines],
            "end_date": ["<", today],
            "activity_status": ["!=", "Ended"],
        },
        fields=["name", "title", "reporting_deadline"],
    )

    for activity in activities:
        send_reminder_to_applicants(activity)


def send_reminder_to_applicants(activity):
    subject = f"Reminder: Submit Report for Activity - {activity.title}"

    applicants = frappe.get_all(
        "Volunteer Activity",
        filters={"activity": activity.name},
        fields=["email", "volunteer"],
    )

    for applicant in applicants:
        if applicant.email:
            username = (
                frappe.db.get_value("SVA User", applicant.volunteer, "full_name")
                or "Volunteer"
            )

            message = frappe.render_template(
                "templates/emails/reminder_to_submit_report.html",
                {
                    "username": username,
                    "activity_name": activity.title,
                },
            )

            frappe.sendmail(
                recipients=[applicant.email], subject=subject, message=message
            )


@frappe.whitelist()
def send_birthday_activity_email():
    from frappe.utils import today

    birthday_records = frappe.get_all(
        "Birthdays",
        filters={"birth_date": today()},
        fields=["name", "name1", "email_id", "birth_date"],
    )

    print("Birthday Records:", birthday_records)

    for birthday in birthday_records:
        activities = get_activities_for_birthdays(birthday["name"])
        print("Activities for", birthday["name"], ":", activities)

        if not activities:
            print("No activities found, skipping email for", birthday["name1"])
            continue

        # Use only the first activity
        first_activity = activities[0]

        context = {
            "user_name": birthday["name1"],
            "activity_name": first_activity["title"]
        }

        try:
            # Step 1: Render the actual email message
            message = frappe.render_template("templates/emails/birthday.html", context)
            print("Email message rendered successfully.")

            # Step 2: Send the email using the rendered message
            frappe.sendmail(
                recipients=[birthday["email_id"]],
                subject="🎉 A Special Birthday Activity Just for You!",
                message=message,
                now=True
            )
        except Exception as e:
            frappe.log_error(
                title="Birthday Email Error", message=frappe.get_traceback()
            )
@frappe.whitelist()
def get_activities_for_birthdays(birthday_name):
    birthday_doc = frappe.get_doc("Birthdays", birthday_name)
    selected_sdgs = [row.sdgs for row in birthday_doc.choose_sdgs]

    if not selected_sdgs:
        return []

    placeholders = ", ".join(["%s"] * len(selected_sdgs))

    query = f"""
        SELECT DISTINCT parent AS name
        FROM `tabSDGs Child`
        WHERE parenttype = 'Activity' AND sdgs IN ({placeholders})
    """

    activity_parents = frappe.db.sql(query, tuple(selected_sdgs), as_dict=True)

    activity_names = []
    for row in activity_parents:
        activity = frappe.get_value(
            "Activity", row.name, ["name", "title"], as_dict=True
        )
        if activity:
            activity_names.append(activity)

    return activity_names
