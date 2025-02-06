import frappe
from frappe.model.document import Document
import re

class NGOs(Document):
    def validate(self):
        # Validate website URL format
        if self.website and not re.match(r'https?://(?:[\w-]|(?:%[\da-fA-F]{2}))+[^\s]*', self.website):
            frappe.throw(_("Please enter a valid website URL"))
        
        # Validate mobile number format (10 digits)
        if self.mobile_number and not re.match(r'^\d{10}$', self.mobile_number):
            frappe.throw(_("Mobile Number must be exactly 10 digits"))
            
        # Validate NGO Head mobile number
        if self.ngo_head_mobile and not re.match(r'^\d{10}$', self.ngo_head_mobile):
            frappe.throw(_("NGO Head Mobile Number must be exactly 10 digits"))
            
        # Validate pincode (6 digits)
        if self.pincode and not re.match(r'^\d{6}$', self.pincode):
            frappe.throw(_("Postal/Zip Code must be exactly 6 digits"))
            
        # Validate office numbers if provided
        if self.ngo_head_office_number and not re.match(r'^\d{10,15}$', self.ngo_head_office_number):
            frappe.throw(_("NGO Head Office Number must be between 10 and 15 digits"))
            
        if self.official_contact_number and not re.match(r'^\d{10,15}$', self.official_contact_number):
            frappe.throw(_("Official Contact Number must be between 10 and 15 digits"))