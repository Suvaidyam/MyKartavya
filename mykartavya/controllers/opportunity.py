import frappe

class Opportunity:

    def get_opportunity_activity(opportunity):
        try:
            # Fetch the activity associated with the opportunity
            activity = frappe.get_list("Opportunity Activity", filters={"opportunity": opportunity}, fields=["activity_name","opportunity_type as activity_type","activity_image","start_date","end_date","total_hour","total_minutes"])

            if not activity:
                raise frappe.DoesNotExist(_("No activity found for the given opportunity."))
            return activity
        except frappe.DoesNotExist as e:
            frappe.log_error(f"Error fetching activity for opportunity {opportunity}: {str(e)}")
            return None
        except Exception as e:
            frappe.log_error(f"Unexpected error fetching activity for opportunity {opportunity}: {str(e)}")
            return None
        
    def opportunity_activity_details(name):
        try:
            # Fetch the activity associated with the opportunity
            activity = frappe.get_list("Opportunity Activity",{"opportunity": name},["activity_name as title","opportunity_type as activity_type","activity_image","start_date","end_date","total_hour as hours","total_minutes","description"])
            return activity
        except Exception as e:
            frappe.log_error(f"Unexpected error fetching activity for opportunity {name}: {str(e)}")
            return None
        

