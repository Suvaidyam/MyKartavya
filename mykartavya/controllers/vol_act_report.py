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
            vs.name AS log_id,
            TRIM(REPLACE(REPLACE(u.full_name, '\n', ''), '\r', '')) AS volunteer_name,
            a.title AS activity_title,
            s.title AS survey_title
        FROM `tabVolunteer Survey Log` AS vs
        LEFT JOIN `tabSVA User` AS u ON u.name = vs.user
        LEFT JOIN `tabSurvey` AS s ON s.name = vs.survey_id
        LEFT Join `tabActivity` AS a ON vs.activity = a.name 
        WHERE vs.survey_id = %s
        """,
        survey_id,
        as_dict=True
    )
    if not logs:
        return []

    log_ids = [log["log_id"] for log in logs]

    answers = frappe.db.sql(
        """
        SELECT 
            parent,
            question_label,
            answer
        FROM `tabVolunteer Survey Log Child`
        WHERE parent IN %(log_ids)s
        ORDER BY creation ASC
        """,
        {"log_ids": tuple(log_ids)},
        as_dict=True
    )

    answer_map = {}
    for ans in answers:
        answer_map.setdefault(ans["parent"], []).append({
            "question_label": ans["question_label"],
            "answer": ans["answer"]
        })

    final_result = []
    for log in logs:
        final_result.append({
            "log_id": log["log_id"],
            "survey_title": log["survey_title"],
            "volunteer_name": log["volunteer_name"],
            "activity_title": log["activity_title"],
            "questions": answer_map.get(log["log_id"], [])
        })

    return final_result


