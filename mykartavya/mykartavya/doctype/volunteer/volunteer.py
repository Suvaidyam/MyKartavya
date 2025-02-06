import frappe
from frappe.model.document import Document
import re

class Volunteer(Document):
    def validate(self):
        self.validate_names()
        self.validate_email()
        self.validate_mobile_number()
        self.validate_state_city()
        
    def validate_names(self):
        # Validate first name
        if len(self.first_name) > 100:
            frappe.throw(_("First Name cannot exceed 100 characters"))
            
        # Validate last name
        if len(self.last_name) > 100:
            frappe.throw(_("Last Name cannot exceed 100 characters"))
            
        # Validate employee ID
        if len(self.employee_id) > 100:
            frappe.throw(_("Employee ID cannot exceed 100 characters"))
            
    def validate_email(self):
        if len(self.email) > 100:
            frappe.throw(_("Email cannot exceed 100 characters"))
            
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, self.email):
            frappe.throw(_("Please enter a valid email address"))
            
    def validate_mobile_number(self):
        # Remove any non-numeric characters from mobile number
        mobile = ''.join(filter(str.isdigit, self.mobile_number))
        
        if not mobile.isdigit():
            frappe.throw(_("Mobile Number must contain only digits"))
            
        if len(mobile) > 15:
            frappe.throw(_("Mobile Number cannot exceed 15 digits"))
            
        # Update the mobile number to contain only digits
        self.mobile_number = mobile
        
    def validate_state_city(self):
        # Validate that state belongs to selected country
        if self.state and self.country:
            state = frappe.get_doc("State", self.state)
            if state.country != self.country:
                frappe.throw(_("Selected State does not belong to the selected Country"))
                
        # Validate that city belongs to selected state
        if self.city and self.state:
            city = frappe.get_doc("City", self.city)
            if city.state != self.state:
                frappe.throw(_("Selected City does not belong to the selected State"))
                
    def before_save(self):
        # Ensure all text fields are properly stripped of leading/trailing spaces
        self.first_name = self.first_name.strip()
        self.last_name = self.last_name.strip()
        self.employee_id = self.employee_id.strip()
        self.email = self.email.strip()