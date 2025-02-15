import frappe
from frappe.model.document import Document
from frappe.utils import get_datetime, now_datetime

class Activity(Document):
    def validate(self):
        # self.validate_dates()
        self.validate_hours()
        self.validate_points()
        self.handle_activity_published_date_starts()
        
    def validate_dates(self):
        current_datetime = now_datetime()
        
        # Validate publish date
        if get_datetime(self.publish_date) < current_datetime:
            frappe.throw(_("Activity Publish Date cannot be in the past"))
            
        # Validate activation deadline
        if get_datetime(self.activation_deadline) <= get_datetime(self.publish_date):
            frappe.throw(_("Activation Deadline must be after Publish Date"))
            
        # Validate start date
        if get_datetime(self.start_date) <= get_datetime(self.activation_deadline):
            frappe.throw(_("Start Date must be after Activation Deadline"))
            
        # Validate end date
        if get_datetime(self.end_date) <= get_datetime(self.start_date):
            frappe.throw(_("End Date must be after Start Date"))
            
        # Validate reporting deadline
        if get_datetime(self.reporting_deadline) <= get_datetime(self.end_date):
            frappe.throw(_("Reporting Deadline must be after End Date"))
    
    def validate_hours(self):
        # Validate minimum hours
        if self.minimum_hours <= 0:
            frappe.throw(_("Minimum Hours must be a positive number"))
            
        # Validate buffer minutes
        if self.buffer_minutes <= 0:
            frappe.throw(_("Buffer Minutes must be a positive number"))
            
        # Validate hours
        if self.hours <= 0:
            frappe.throw(_("Hours must be a positive number"))
            
        # Validate minutes
        if not (0 <= self.minutes <= 59):
            frappe.throw(_("Minutes must be between 0 and 59"))
            
        # Validate max hours
        if self.max_hours < self.hours:
            frappe.throw(_("Max Hours must be greater than or equal to Hours"))
    
    def validate_points(self):
        # Validate work value points
        if self.work_value_points <= 0:
            frappe.throw(_("Work Value Points must be a positive number"))
            
        # Validate karma points
        if self.karma_points <= 0:
            frappe.throw(_("Karma Points must be a positive number"))
    
    def handle_activity_published_date_starts(self):
        # If activity starts on published date, set auto approve volunteers to Yes
        if self.activity_published_date_starts:
            self.auto_approve_volunteers = 1
            
    # def before_save(self):
    #     # Handle location fields based on is_global
    #     if self.is_global:
    #         self.country = None
    #         self.state = None
    #         self.city = None
    #         self.address = None
    #     else:
    #         # Validate country is provided for non-global activities
    #         if not self.country:
    #             frappe.throw(_("Country is mandatory for non-global activities"))