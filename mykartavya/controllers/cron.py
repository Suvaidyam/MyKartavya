import frappe
from datetime import datetime

@frappe.whitelist()
def process_activities():
    today = datetime.now().date()
    
    activities = frappe.get_all(
        "Activity",
        filters={"activity_status": ["!=", "Ended"]},
        fields=["name", "activity_status", "publish_date", "start_date", "end_date", "docstatus", 
                "activity_published_date_starts"]
    )
    
    for activity in activities:
        new_status = None
        update_fields = {}
        
        publish_date = activity.publish_date and frappe.utils.getdate(activity.publish_date) or None
        start_date = activity.start_date and frappe.utils.getdate(activity.start_date) or None
        end_date = activity.end_date and frappe.utils.getdate(activity.end_date) or None
        
        if activity.activity_published_date_starts and publish_date:
            effective_start_date = publish_date
            update_fields["docstatus"]=1
        else:
            effective_start_date = start_date
        
        if end_date and today >= end_date:
            new_status = "Ended"
        elif effective_start_date and today >= effective_start_date:
            new_status = "Ongoing"
        elif publish_date and today >= publish_date:
            new_status = "Published"
            if activity.docstatus == 0:
                update_fields["docstatus"] = 1
        else:
            new_status = "Draft"
        
        if new_status and new_status != activity.status:
            update_fields["activity_status"] = new_status
            
            if update_fields:
                frappe.db.set_value("Activity", activity.name, update_fields, update_modified=False)
                frappe.db.commit()
                
                log_message = f"Activity {activity.name} status updated from {activity.status} to {new_status}"
                if "docstatus" in update_fields:
                    log_message += " (and submitted document)"
                frappe.log_error(log_message, "Activity Status Update")
    
    frappe.log_error("Activity status check completed", "Activity Cron")

@frappe.whitelist()
def opportunity_publish():
    today = datetime.now().date()
    
    opportunities = frappe.get_all(
        "Opportunity",
        filters={"opportunity_status": ["!=", "Ended"]},
        fields=["name", "opportunity_status", "start_date", "end_date", "docstatus"]
    )
    
    for opportunity in opportunities:
        new_status = None
        update_fields = {}
        
        start_date = opportunity.start_date and frappe.utils.getdate(opportunity.start_date) or None
        end_date = opportunity.end_date and frappe.utils.getdate(opportunity.end_date) or None
        
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
                frappe.db.set_value("Opportunity", opportunity.name, update_fields, update_modified=False)
                frappe.db.commit()
                
                # Fixed: Use opportunity.opportunity_status in log message
                log_message = f"Opportunity {opportunity.name} status updated from {opportunity.opportunity_status} to {new_status}"
                if "docstatus" in update_fields:
                    log_message += " (and submitted document)"
                frappe.log_error(log_message, "Opportunity Status Update")
    
    # Fixed: Log message to reflect "Opportunity" instead of "Activity"
    frappe.log_error("Opportunity status check completed", "Opportunity Cron")
