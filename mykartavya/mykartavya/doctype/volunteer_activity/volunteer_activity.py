# Copyright (c) 2025, Aniket Singh and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class VolunteerActivity(Document):

	def validate(self):
		"""Validate and set enrollment status before saving."""
		self.set_enrollment_status()
		self.calculate_log_totals()
		
	def before_insert(self):
		self.set_enrollment_status()
	
	def set_enrollment_status(self):
		try:
			activity = frappe.get_doc("Activity", self.activity)
			if activity.auto_approve_volunteers or self.enrollment_wf_state == "Approved":
				self.enrollment_wf_state = self.workflow_state = "Approved"
				frappe.db.set_value(self.doctype, self.name, "workflow_state", "Approved")
				self.save(ignore_permissions=True)
		except Exception as e:
			frappe.log_error(f"Error setting enrollment status: {str(e)}")

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
				activity = frappe.get_doc("Activity", self.activity)
				self.karma_points = activity.karma_points
				frappe.db.set_value("Volunteer Activity", self.name, "karma_points", self.karma_points)
			elif self.completion_wf_state == "Rejected" and self.karma_points:
				# Reset karma points if completion is rejected
				self.karma_points = 0
				frappe.db.set_value("Volunteer Activity", self.name, "karma_points", 0)
			
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
			frappe.publish_realtime("volunteer_activity_approved", {"volunteer_activity": self.name})
		elif self.workflow_state == "Rejected":
			frappe.publish_realtime("volunteer_activity_rejected", {"volunteer_activity": self.name})

		# Handle completion workflow state separately
		if self.completion_wf_state == "Approved":
			frappe.publish_realtime("volunteer_activity_completion_approved", {"volunteer_activity": self.name})
		elif self.completion_wf_state == "Rejected":
			frappe.publish_realtime("volunteer_activity_completion_rejected", {"volunteer_activity": self.name})


	def calculate_log_totals(self):
		"""Calculate total duration and percent from activity logs."""
		total_seconds = 0
		total_percent = 0
		
		if self.volunteer_activity_log:
			for log in self.volunteer_activity_log:
				# Handle duration (could be either seconds as int or "HH:mm:ss" as string)
				if log.duration:
					try:
						if isinstance(log.duration, str) and ':' in log.duration:
							# Handle string format "HH:mm:ss"
							duration_parts = log.duration.split(':')
							if len(duration_parts) == 3:
								hours = int(duration_parts[0])
								minutes = int(duration_parts[1])
								seconds = int(duration_parts[2])
								total_seconds += (hours * 3600) + (minutes * 60) + seconds
						else:
							# Handle integer format (seconds)
							total_seconds += int(log.duration)
					except (ValueError, TypeError):
						frappe.msgprint(f"Invalid duration format in log: {log.duration}")
						continue
				
				# Add percentages
				if log.percent:
					try:
						total_percent += float(log.percent)
					except (ValueError, TypeError):
						frappe.msgprint(f"Invalid percent format in log: {log.percent}")
						continue
			
			# Store the total duration in seconds
			self.duration = total_seconds
			self.com_percent = total_percent
			# If total percent reaches 100, update completion status to Submitted
			if total_percent >= 100 and self.completion_wf_state == "Pending":
				self.completion_wf_state = "Submitted"
				# self.workflow_state = "Submitted"
				# Create a comment log
				frappe.get_doc({
					"doctype": "Comment",
					"comment_type": "Info",
					"reference_doctype": self.doctype,
					"reference_name": self.name,
					"content": "Activity completion reached 100%. Status updated to Submitted."
				}).insert(ignore_permissions=True)
				frappe.msgprint("Activity completion has reached 100%. Status updated to Submitted.")
