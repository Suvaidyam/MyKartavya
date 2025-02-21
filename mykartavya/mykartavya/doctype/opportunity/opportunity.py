# Copyright (c) 2025, Aniket Singh and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe import _
from datetime import datetime

class Opportunity(Document):
    def validate(self):
        self.validate_dates()
        self.validate_points()
        self.validate_hours()
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
        # Remove HTML tags from description if needed
        if self.opportunity_description:
            self.opportunity_description = frappe.utils.strip_html(self.opportunity_description)
