import frappe
from frappe import _
from frappe.model.document import Document
from datetime import datetime
import re

class NGOs(Document):
    def validate(self):
        """
        Validate the NGO document before saving
        """
        self.validate_contact_numbers()
        self.validate_email_addresses()
        self.validate_website()
        self.validate_pincode()
        self.validate_goals()
        self.validate_text_lengths()
        
    def validate_text_lengths(self):
        """
        Validate text field lengths
        """
        if len(self.ngo_name) > 255:
            frappe.throw(_("NGO Name cannot exceed 255 characters"))
            
        if self.designation and len(self.designation) > 100:
            frappe.throw(_("Designation cannot exceed 100 characters"))
            
        if self.description and len(self.description) > 2000:
            frappe.throw(_("Description cannot exceed 2000 characters"))
            
        if self.registration_type == 'Admin Registration' and self.location and len(self.location) > 500:
            frappe.throw(_("Location cannot exceed 500 characters"))

    def validate_contact_numbers(self):
        """
        Validate phone number formats
        """
        phone_fields = ['official_contact_number']
        
        if self.registration_type == 'Self Registration':
            phone_fields.extend(['ngo_head_mobile', 'ngo_head_office_number'])

        phone_pattern = re.compile(r'^\d{10}$')
        
        for field in phone_fields:
            value = self.get(field)
            if value:
                # Remove any spaces or hyphens before validation
                cleaned_number = re.sub(r'[\s-]', '', value)
                if not phone_pattern.match(cleaned_number):
                    frappe.throw(
                        _("Invalid phone number format for {0}. Please enter a valid 10-digit phone number.").format(
                            frappe.bold(_(self.meta.get_label(field)))
                        )
                    )

    def validate_email_addresses(self):
        """
        Validate email address formats
        """
        email_fields = ['email']
        
        if self.registration_type == 'Self Registration':
            email_fields.append('ngo_head_email')

        email_pattern = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
        
        for field in email_fields:
            if self.get(field):
                if not email_pattern.match(self.get(field).lower()):
                    frappe.throw(
                        _("Invalid email format for {0}. Please enter a valid email address.").format(
                            frappe.bold(_(self.meta.get_label(field)))
                        )
                    )

    def validate_website(self):
        """
        Validate website URL format
        """
        if self.registration_type == 'Self Registration' and self.website:
            url_pattern = re.compile(
                r'^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$'
            )
            if not url_pattern.match(self.website):
                frappe.throw(_("Invalid website URL format. Please enter a valid URL starting with http:// or https://"))

    def validate_pincode(self):
        """
        Validate pincode format
        """
        if self.registration_type == 'Self Registration' and self.pincode:
            if not re.match(r'^\d{6}$', self.pincode):
                frappe.throw(_("Pincode must be exactly 6 digits"))

    def validate_goals(self):
        """
        Validate that priority goals are not duplicated
        """
        if self.registration_type == 'Admin Registration':
            goals = [
                self.first_priority_goal,
                self.second_priority_goal,
                self.third_priority_goal
            ]
            
            # Remove any None values
            goals = [g for g in goals if g]
            
            if len(set(goals)) != len(goals):
                frappe.throw(_("Priority Goals must be unique. Please select different goals for each priority level."))

def validate_workflow(doc, method):
     if doc.registration_type == "Self Registration":
        frappe.db.set_value("NGOs", doc.name, "workflow_state", "Pending Approval" )
        frappe.db.commit()
     