# Copyright (c) 2025, Aniket Singh and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class VolunteerActivity(Document):
	def validate(self):
		"""Validate and set enrollment status before saving."""
		self.set_enrollment_status()
		
	def before_insert(self):
		self.set_enrollment_status()
		
	def set_enrollment_status(self):
		"""Set enrollment status based on activity configuration."""
		if not self.activity:
			return
			
		try:
			activity = frappe.get_doc("Activity", self.activity)
			
			# Set enrollment status based on auto_approve_volunteers
			if activity.auto_approve_volunteers:
				self.enrollment_wf_state = "Approved"
				frappe.db.set_value("Volunteer Activity", self.name, "workflow_state", "Approved")
			else:
				# Only set to Applied if it's a new document or status isn't already set
				if not self.get('enrollment_wf_state'):
					self.enrollment_wf_state = "Applied"
					frappe.db.set_value("Volunteer Activity", self.name, "workflow_state", "Applied")
		except Exception as e:
			frappe.log_error(f"Error setting enrollment status: {str(e)}")
			raise

	def on_update(self):
		"""Handle workflow state changes and related actions."""
		try:
			if self.enrollment_wf_state == "Approved":
				frappe.db.set_value("Volunteer Activity", self.name, "workflow_state", "Approved")
				# TODO: Add additional approval actions here
			elif self.enrollment_wf_state == "Rejected":
				frappe.db.set_value("Volunteer Activity", self.name, "workflow_state", "Rejected")
				# TODO: Add additional rejection actions here
		except Exception as e:
			frappe.log_error(f"Error updating workflow state: {str(e)}")
			raise
