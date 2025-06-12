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
        self.validate_points()
        # self.validate_hours()
        self.validate_name_length()
        
    def validate_dates(self):
        if self.start_date and self.end_date:
            if self.start_date > self.end_date:
                frappe.throw(_("End Date cannot be before Start Date"))
                
    def validate_points(self):
        # Validate karma points
        if self.karma_points < 0:
            frappe.throw(_("Karma Points cannot be negative"))
            
        # Validate work value points
        if self.work_value_points < 0:
            frappe.throw(_("Work Value Points cannot be negative"))
            
    def validate_hours(self):
        # Validate minimum hours
        if self.minimum_hours < 0:
            frappe.throw(_("Minimum Hours cannot be negative"))
            
        # Validate buffer minutes
        if not (0 <= self.buffer_minutes <= 180):
            frappe.throw(_("Buffer Minutes must be between 0 and 180"))
            
        # Validate hours
        if self.hours < 0:
            frappe.throw(_("Hours cannot be negative"))
            
        # Validate minutes
        if not (0 <= self.minutes <= 59):
            frappe.throw(_("Minutes must be between 0 and 59"))
            
        # Validate max hours
        if self.max_hours < self.hours:
            frappe.throw(_("Max Hours cannot be less than Hours"))
            
        # Validate max hours precision
        if len(str(self.max_hours).split('.')[-1]) > 2:
            frappe.throw(_("Max Hours can have up to 2 decimal places only"))
            
        # Validate minimum hours precision
        if len(str(self.minimum_hours).split('.')[-1]) > 2:
            frappe.throw(_("Minimum Hours can have up to 2 decimal places only"))
            
        # Validate hours precision
        if len(str(self.hours).split('.')[-1]) > 2:
            frappe.throw(_("Hours can have up to 2 decimal places only"))
            
    def validate_name_length(self):
        if len(self.opportunity_name) > 255:
            frappe.throw(_("Opportunity Name cannot exceed 255 characters"))
            
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
                self.status = "Published"
        elif start_date == today_date:
            if self.workflow_state == "Approved":
                self.status = "Ongoing"
        elif end_date == today_date:
            self.status = "Ended"
        else:
            self.status = "Draft"

    def after_insert(doc):
        try:
            sva_user = frappe.db.get_value(
                'SVA User',
                {'email': frappe.session.user},
                ['role_profile'],
                as_dict=True
            )
            if sva_user and sva_user.role_profile == 'MyKartvya Admin':
                frappe.db.set_value("Opportunity", doc.name, "workflow_state", "Approved")
            else:
                print(f"User {frappe.session.user} with role {sva_user.role_profile if sva_user else 'No role'} - keeping default workflow state")
                
        except Exception as e:
            frappe.log_error(f"Auto approval error: {str(e)}")
    
