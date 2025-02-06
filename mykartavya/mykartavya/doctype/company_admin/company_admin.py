import frappe
from frappe.model.document import Document
import re

class CompanyAdmin(Document):
    def validate(self):
        self.validate_company_name()
        self.validate_email()
        self.validate_pincode()
        
    def validate_company_name(self):
        if len(self.company_name) > 100:
            frappe.throw(_("Company Name cannot exceed 100 characters"))
            
    def validate_email(self):
        if self.volunteering_program_email:
            if len(self.volunteering_program_email) > 100:
                frappe.throw(_("Volunteering Program Email cannot exceed 100 characters"))
            
            email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
            if not re.match(email_pattern, self.volunteering_program_email):
                frappe.throw(_("Please enter a valid email address for Volunteering Program Email"))
                
    def validate_pincode(self):
        if self.pincode:
            if not re.match(r'^\d{6}$', self.pincode):
                frappe.throw(_("Pincode must be exactly 6 digits"))
                
    def validate_state(self):
        # Validate that state belongs to selected country
        if self.state and self.country:
            state = frappe.get_doc("State", self.state)
            if state.country != self.country:
                frappe.throw(_("Selected State does not belong to the selected Country"))
                
    def validate_city(self):
        # Validate that city belongs to selected state
        if self.city and self.state:
            city = frappe.get_doc("City", self.city)
            if city.state != self.state:
                frappe.throw(_("Selected City does not belong to the selected State"))