import frappe
from frappe import _
from frappe.model.document import Document
import re

class CompaniesRegistration(Document):
    def validate(self):
        self.validate_company_registration_date()
        self.validate_contact_details()
        self.validate_number_of_employees()
        self.validate_pincode()
        self.validate_percentages()
        
    def validate_company_registration_date(self):
        # Example of the translation function
        if self.company_registration > frappe.utils.nowdate():
             frappe.throw(_("Company Registration Date cannot be in the future"))
            
    def validate_contact_details(self):
        # Validate email format
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, self.contact_email):
            frappe.throw(_("Please enter a valid email address"))
            
        # Validate mobile number (10 digits)
        if not re.match(r'^\d{10}$', self.mobile_number):
            frappe.throw(_("Mobile Number must be exactly 10 digits"))
            
        # Validate contact phone
        if not re.match(r'^\d{10,15}$', self.contact_phone):
            frappe.throw(_("Contact Phone must be between 10 and 15 digits"))
            
    def validate_number_of_employees(self):
        if self.number_of_employees < 1:
            frappe.throw(_("Number of Employees must be greater than or equal to 1"))
            
    def validate_pincode(self):
        if not re.match(r'^\d{6}$', self.pincode):
            frappe.throw(_("Postal/Zip Code must be exactly 6 digits"))
            
    def validate_percentages(self):
        # Validate volunteering CSR activities percentage
        if not (0 <= float(self.volunteering_csr_activities) <= 100):
            frappe.throw(_("Volunteering and CSR activities cost must be between 0% and 100%"))
            
        # Validate employee engagement percentage
        if not (0 <= float(self.employee_engagement) <= 100):
            frappe.throw(_("Employee engagement activities coverage must be between 0% and 100%"))
            
    def before_save(self):
        # Ensure all text fields are properly stripped of leading/trailing spaces
        self.company_name = self.company_name.strip()
        self.contact_name = self.contact_name.strip()
        self.designation = self.designation.strip()
        self.address = self.address.strip()
        self.city = self.city.strip()
        self.state = self.state.strip()