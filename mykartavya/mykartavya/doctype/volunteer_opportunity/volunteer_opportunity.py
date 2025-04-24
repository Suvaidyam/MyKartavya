# Copyright (c) 2025, Aniket Singh and contributors
# For license information, please see license.txt

# import frappe
import frappe
from frappe import _
from frappe.model.document import Document


class VolunteerOpportunity(Document):

	def before_save(self):
		try:
			if self.workflow_state and self.workflow_state != self.enrollment_wf_state:
				self.enrollment_wf_state = self.workflow_state
		except Exception as e:
			frappe.log_error(f"Error syncing workflow and enrollment state: {str(e)}")


	def on_update(self):
		"""Handle workflow state changes and related actions."""
		try:
			# Set enrollment_wf_state based on workflow_state
			if self.workflow_state == "Approved":
				self.enrollment_wf_state = "Approved"
			elif self.workflow_state == "Rejected":
				self.enrollment_wf_state = "Rejected"
			
			# Handle completion workflow state changes
			if self.completion_wf_state == "Approved" and not self.karma_points:
				# Get activity document and set karma points
				activity = frappe.get_doc("Volunteer Opportunity", self.activity)
				self.karma_points = activity.karma_points
				frappe.db.set_value("Volunteer Opportunity", self.name, "karma_points", self.karma_points)
			elif self.completion_wf_state == "Rejected" and self.karma_points:
				# Reset karma points if completion is rejected
				self.karma_points = 0
				frappe.db.set_value("Volunteer Opportunity", self.name, "karma_points", 0)
			
			# Existing logic for updating workflow state
			if self.enrollment_wf_state == "Approved":
				frappe.db.set_value("Volunteer Activity", self.name, "workflow_state", "Approved")
			elif self.enrollment_wf_state == "Rejected":
				frappe.db.set_value("Volunteer Activity", self.name, "workflow_state", "Rejected")
		except Exception as e:
			frappe.log_error(f"Error updating workflow state: {str(e)}")
			raise

		# socket notification aproved by mykartavya admin
		user = frappe.db.get_value("SVA User", {'name': self.volunteer}, 'email')
		if self.workflow_state == "Approved":
			frappe.publish_realtime("volunteer_activity_approved", {"Volunteer Opportunity": self.name})
		elif self.workflow_state == "Rejected":
			frappe.publish_realtime("volunteer_activity_rejected", {"Volunteer Opportunity": self.name})

		# Handle completion workflow state separately
		if self.completion_wf_state == "Approved":
			frappe.publish_realtime("volunteer_activity_completion_approved", {"Volunteer Opportunity": self.name})
		elif self.completion_wf_state == "Rejected":
			frappe.publish_realtime("volunteer_activity_completion_rejected", {"Volunteer Opportunity": self.name})
 