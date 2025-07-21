import frappe
from frappe import _
from frappe.utils import getdate, today, get_datetime


@frappe.whitelist()
def get_volunteer_activity_report(activity=None):
    if not activity:
        frappe.throw("Activity is required")

    report_data = frappe.db.sql(
        """
        SELECT 
            va.name,
            u.full_name,
            va.duration,
            va.com_percent,
            va.enrollment_wf_state,
            va.completion_wf_state,
            va.karma_points,
            va.rating,
            va.activity
        FROM `tabVolunteer Activity` AS va
        LEFT JOIN `tabSVA User` AS u ON u.name = va.volunteer
        WHERE va.activity = %s
        """,
        (activity,),
        as_dict=True,
    )

    return report_data

@frappe.whitelist()
def vol_survey_report(survey_id=None):
    if not survey_id:
        frappe.throw("Survey ID is required")

    logs = frappe.db.sql(
        """
        SELECT 
            vs.name,
            vs.name AS log_id,
            vs.activity AS activity_name,
            s.title AS survey_name,
            u.full_name AS user_name,
            a.title AS activity_title
        FROM `tabVolunteer Survey Log` AS vs
        LEFT JOIN `tabActivity` AS a ON a.name = vs.activity
        LEFT JOIN `tabSurvey` AS s ON s.name = vs.survey_id
        LEFT JOIN `tabSVA User` AS u ON u.name = vs.user
        WHERE s.name = %s
        ORDER BY vs.creation DESC
        """,
        (survey_id,),
        as_dict=True
    )

    if not logs:
        return []

    log_ids = [log.log_id for log in logs]
    answers = frappe.db.get_all(
        "Volunteer Survey Log Child",
        filters={"parent": ["in", log_ids]},
        fields=["parent", "question_label", "answer"],
    )

    answer_map = {}
    for ans in answers:
        answer_map.setdefault(ans.parent, []).append(
            {"question_label": ans.question_label, "answer": ans.answer}
        )

    for log in logs:
        log["answers"] = answer_map.get(log.log_id, [])

    return logs

