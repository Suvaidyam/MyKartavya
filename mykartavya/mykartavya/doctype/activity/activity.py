import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import get_datetime, now_datetime,today,getdate
from datetime import datetime, time

class Activity(Document):
    def validate(self):
        self.validate_dates() 
        self.validate_hours()
        self.validate_time()
        self.validate_vacancies()
        self.handle_activity_published_date_starts()
        self.validate_reward()
        self.validate_location()
        self.validate_company()

    def on_update(self):
        today_date = getdate(today())
        start_date = getdate(self.start_date) if self.start_date else None
        end_date = getdate(self.end_date) if self.end_date else None
        
        if start_date and end_date:
            if start_date >= today_date:
                self.status = "Published"
            elif start_date <= today_date < end_date:
                self.status = "Ongoing"
            elif end_date == today_date:
                self.status = "Ended"
            elif today_date > end_date:
                self.status = "Ended"

    def validate_dates(self):
        current_datetime = now_datetime()
        
        # Validate publish date
        if get_datetime(self.publish_date) > current_datetime:
            frappe.throw(_("Activity Publish Date cannot be in the past"))
            
        # Validate application deadline
        if get_datetime(self.application_deadline) <= get_datetime(self.publish_date):
            frappe.throw(_("Application Deadline must be after Publish Date"))
            
        # Validate start date
        if get_datetime(self.start_date) <= get_datetime(self.application_deadline):
            frappe.throw(_("Start Date must be after Application Deadline"))
            
        # Validate end date
        if get_datetime(self.end_date) <= get_datetime(self.start_date):
            frappe.throw(_("End Date must be after Start Date"))
            
        # Validate reporting deadline
        if get_datetime(self.reporting_deadline) <= get_datetime(self.end_date):
            frappe.throw(_("Reporting Deadline must be after End Date"))

            
    def validate_hours(self):
        if not (0 <= self.minutes <= 59):
            frappe.throw(_("Minutes must be between 0 and 59"))
            
        # Validate max hours
        if self.max_hours < self.hours and not self.contribution_type == 'Fixed':
          frappe.throw(_("Max Hours must be greater than or equal to Hours"))

        # Validate max hours for fixed contribution type
        if self.contribution_type == "Fixed":
            self.max_hours = self.hours

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
    
    def validate_vacancies(self):
        if not self.unlimited_vacancies:
            if not self.vacancy or self.vacancy <= 0:
                frappe.throw(_("Number of Vacancies must be a positive number"))
            if not self.buffer_vacancy or self.buffer_vacancy < 0:
                frappe.throw(_("Buffer Vacancies must be zero or a positive number"))
    
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


    # def on_update(self):
    #     if self.value_type == "Skills":
    #         total_value = 0
    #         for skill_entry in self.skill:
    #             skill_name = skill_entry.skills_name
    #             skill_doc = frappe.get_doc("Skills", skill_name)
    #             if skill_doc:
    #                 total_value += skill_doc.rate_per_hour
    #         self.work_value_rupees = total_value
        
    #     elif self.value_type == "General":
    #         if self.work_value_rupees is not None:
    #             pass
    #         else:
    #             self.work_value_rupees = 0
    
    def validate(self):
        for field in ["activity_image", "reward_image"]:
            image_url = getattr(self, field, None)

            if image_url:
                file_doc = frappe.db.get_value("File", {"file_url": image_url}, ["file_size", "file_name"])

                if file_doc:
                    file_size, file_name = file_doc

                    # Validate file size (max 5MB)
                    if file_size > 5 * 1024 * 1024:  
                        frappe.throw(f"File size exceeds 5 MB limit for {field.replace('_', ' ').title()}")

                    # Validate file type (only images)
                    allowed_extensions = {"jpg", "jpeg", "png", "webp"}
                    file_extension = file_name.split(".")[-1].lower()

                    if file_extension not in allowed_extensions:
                        frappe.throw(f"Invalid file type for {field.replace('_', ' ').title()}. Only JPG, JPEG, PNG, and WEBP are allowed.")
