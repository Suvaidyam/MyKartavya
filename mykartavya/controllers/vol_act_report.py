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
