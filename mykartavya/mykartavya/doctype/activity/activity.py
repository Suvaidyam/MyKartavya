import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import get_datetime, now_datetime,today,getdate
from datetime import time

class Activity(Document):
    def validate(self):
        self.validate_dates() 
        self.validate_time()
        self.handle_activity_published_date_starts()
        self.validate_reward()
        self.validate_location()
        self.validate_company()
        self.validate_image()

    def on_update(self):
        today_date = getdate(today())
        start_date = getdate(self.start_date) if self.start_date else None
        end_date = getdate(self.end_date) if self.end_date else None
        publish_date = getdate(self.publish_date) if self.publish_date else None

        if self.status == "Draft" and publish_date and today_date >= publish_date:
            self.status = "Published"

        elif self.status == "Published" and start_date and today_date >= start_date:
            self.status = "Ongoing"

        elif self.status == "Ongoing" and end_date and today_date == end_date:
            self.status = "Ended"

    def validate_dates(self):
        # Validate application deadline
        if get_datetime(self.application_deadline) <= get_datetime(self.publish_date):
            frappe.throw(_("Application Deadline must be after Publish Date"))
            
        # Validate start date
        if not self.activity_published_date_starts:
            if get_datetime(self.start_date) <= get_datetime(self.application_deadline):
                frappe.throw(_("Start Date must be after Application Deadline"))
            
        # Validate end date
        if get_datetime(self.end_date) <= get_datetime(self.start_date):
            frappe.throw(_("End Date must be after Start Date"))
            
        # Validate reporting deadline
        if get_datetime(self.reporting_deadline) <= get_datetime(self.end_date):
            frappe.throw(_("Reporting Deadline must be after End Date"))

    def validate_time(self):
        try:
            if self.start_time_hr >= self.end_time_hr:
                frappe.throw(_("End Time must be after Start Time"))
        except ValueError as e:
            frappe.throw(str(e))

    
    def create_time_obj(self, hour, minute, meridiem):
        try:
            # Convert hour and minute to integers
            hour = int(hour)
            minute = int(minute)
            
            # Validate hour and minute ranges
            if not (0 <= hour <= 12):
                raise ValueError(_("Hour must be between 0 and 12"))
            if not (0 <= minute <= 59):
                raise ValueError(_("Minute must be between 0 and 59"))
            
            # Convert to 24-hour format
            if meridiem == "PM" and hour != 12:
                hour += 12
            elif meridiem == "AM" and hour == 12:
                hour = 0
            
            # Create time object
            return time(hour=hour, minute=minute)
            
        except (ValueError, TypeError):
            raise ValueError(_("Invalid time values provided. Hour: {0}, Minute: {1}".format(hour, minute)))
    
    def handle_activity_published_date_starts(self):
        if self.activity_published_date_starts:
            self.auto_approve_volunteers = 1
            self.start_date = self.publish_date
    
    def validate_reward(self):
        if self.reward_for_activity:
            if not self.reward_description:
                frappe.throw(_("Reward Description is mandatory when Reward for Activity is enabled"))
            if not self.reward_image:
                frappe.throw(_("Reward Image is mandatory when Reward for Activity is enabled"))
    
    def validate_location(self):
        if not self.is_global:
            if not self.country:
                frappe.throw(_("Country is mandatory for non-global activities"))
                
    def validate_company(self):
        if self.company:
            if not frappe.db.exists("Company", self.company):
                frappe.throw(_("Selected Company does not exist"))
            
    def before_save(self):
        # Handle location fields based on is_global
        if self.is_global:
            self.country = None
            self.state = None
            self.city = None
            self.address = None

    def validate_image(self):
        for field in ["activity_image", "reward_image"]:
            image_url = getattr(self, field, None)

            if image_url:
                file_doc = frappe.db.get_value("File", {"file_url": image_url}, ["file_size", "file_name"])

                if file_doc:
                    file_size, file_name = file_doc

                    # Validate file size (max 5MB)
                    max_size = 5 * 1024 * 1024  # 5MB
                    if file_size > max_size:
                        frappe.throw(f"{field.replace('_', ' ').title()} exceeds the 5MB file size limit.")

                    # Validate file type (only images)
                    allowed_extensions = {"jpg", "jpeg", "png", "webp"}
                    if not file_name or "." not in file_name:
                        frappe.throw(f"Invalid file name for {field.replace('_', ' ').title()}.")

                    file_extension = file_name.rsplit(".", 1)[-1].lower()
                    if file_extension not in allowed_extensions:
                        allowed_types = ", ".join(allowed_extensions).upper()
                        frappe.throw(f"Invalid file type for {field.replace('_', ' ').title()}. Allowed types: {allowed_types}.")