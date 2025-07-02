# Copyright (c) 2025, Aniket Singh and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import getdate, today,get_datetime
from datetime import datetime


class Opportunity(Document):
    def validate(self):
        self.validate_dates()
        
    def validate_dates(self):
        if self.start_date and self.end_date:
            if self.start_date > self.end_date:
                frappe.throw(_("End Date cannot be before Start Date"))
                
    def before_save(self):
        # Strip whitespace from text fields
        self.opportunity_name = self.opportunity_name.strip()
        if self.opportunity_description:
            self.opportunity_description = frappe.utils.strip_html(self.opportunity_description)

        # if self.is_global:
        #     self.country = None
        #     self.state = None
        #     self.city = None
        #     self.address = None

        today_date = today()
        # publish_date = (
        #     self.publish_date.strftime("%Y-%m-%d")
        #     if isinstance(self.publish_date, datetime)
        #     else str(self.publish_date).split(" ")[0]
        #     if self.publish_date else None
        # )

        start_date = (
            self.start_date.strftime("%Y-%m-%d")
            if isinstance(self.start_date, datetime)
            else str(self.start_date).split(" ")[0]
            if self.start_date else None
        )

        end_date = (
            self.end_date.strftime("%Y-%m-%d")
            if isinstance(self.end_date, datetime)
            else str(self.end_date).split(" ")[0]
            if self.end_date else None
        )
        
        if start_date == today_date:
            if self.workflow_state == "Approved":
                self.opportunity_status = "Published"
        elif end_date <= today_date:
            self.opportunity_status = "Ended"
        else:
            self.opportunity_status = "Draft"

    def after_insert(doc):
        try:
            sva_user = frappe.db.get_value(
                'SVA User',
                {'email': frappe.session.user},
                ['role_profile'],
                as_dict=True
            )
            if sva_user and (sva_user.role_profile in ['MyKartvya Admin']) or frappe.session.user == 'Administrator':
                frappe.db.set_value("Opportunity", doc.name, "workflow_state", "Approved")
            else:
                print(f"User {frappe.session.user} with role {sva_user.role_profile if sva_user else 'No role'} - keeping default workflow state")
                
        except Exception as e:
            frappe.log_error(f"Auto approval error: {str(e)}")
    
