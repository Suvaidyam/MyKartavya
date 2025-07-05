import frappe
from frappe import _
import json
from frappe.utils import nowdate

def survey(name):
    today = nowdate()
    survey_list = frappe.get_all(
        "Survey",
        filters={
            "activity": name,
            "status": "Published",
            "deadline_date": [">", today],
        },
        fields=["name", "title", "description", "deadline_date", "status", "form_json"],
    )
    return survey_list


@frappe.whitelist()
def submit_volunteer_survey():
    try:
        data = frappe.form_dict.get("data")
        if isinstance(data, str):
            data = json.loads(data)

        survey_id = data.get("survey_id")
        answers = data.get("answers")
        activity_id = data.get("activity_id")

        if not survey_id or not answers:
            frappe.throw(_("Missing required data (survey_id or answers)."))

        # Get current session user
        email = frappe.session.user

        # Get SVA User linked to session email
        sva_user = frappe.get_value("SVA User", {"email": email}, "name")
        if not sva_user:
            frappe.throw(_("No matching SVA User found for email: {0}").format(email))

        # Check if already submitted
        already_submitted = frappe.db.exists(
            "Volunteer Survey Log", {"survey_id": survey_id, "user": sva_user}
        )
        if already_submitted:
            frappe.throw(_("You have already submitted this survey."))

        # Create new survey log
        doc = frappe.new_doc("Volunteer Survey Log")
        doc.survey_id = survey_id
        doc.user = sva_user
        doc.activity = activity_id

        for a in answers:
            doc.append(
                "answers",
                {
                    "question_id": a.get("question_id"),
                    "question_label": a.get("question_label"),
                    "question_type": a.get("question_type"),
                    "answer": a.get("answer"),
                },
            )

        doc.insert(ignore_permissions=True)
        frappe.db.commit()

        return {"status": "success", "name": doc.name}

    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Volunteer Survey Submission Error")
        return {"status": "error", "message": str(e)}


@frappe.whitelist()
def has_submitted_survey(survey_id):
    email = frappe.session.user
    sva_user = frappe.get_value("SVA User", {"email": email}, "name")

    if not sva_user:
        return False

    return bool(
        frappe.db.exists(
            "Volunteer Survey Log", {"user": sva_user, "survey_id": survey_id}
        )
    )


@frappe.whitelist()
def get_volunteer_survey_answers(survey_id):
    email = frappe.session.user
    sva_user = frappe.get_value("SVA User", {"email": email}, "name")
    if not sva_user:
        return {}

    log = frappe.get_doc("Volunteer Survey Log", {"user": sva_user, "survey_id": survey_id})
    if not log:
        return {}

    answers = {}
    for ans in log.answers:
        # If it's a checkbox, parse the JSON string
        if ans.question_type == "Check":
            try:
                answers[ans.question_id] = json.loads(ans.answer)
            except Exception:
                answers[ans.question_id] = []
        else:
            answers[ans.question_id] = ans.answer
    return answers
