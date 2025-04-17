import frappe

class Opportunity:

    def get_opportunity_activity(opportunity):
        try:
            # Fetch the activity associated with the opportunity
            activity = frappe.get_list("Opportunity Activity", filters={"opportunity": opportunity}, fields=["*"])

            if not activity:
                raise frappe.DoesNotExist(_("No activity found for the given opportunity."))
            return activity
        except frappe.DoesNotExist as e:
            frappe.log_error(f"Error fetching activity for opportunity {opportunity}: {str(e)}")
            return None
        except Exception as e:
            frappe.log_error(f"Unexpected error fetching activity for opportunity {opportunity}: {str(e)}")
            return None