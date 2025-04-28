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
			# Verify document exists before proceeding
			if not frappe.db.exists("Volunteer Opportunity", self.name):
				frappe.throw(_("Volunteer Opportunity {0} not found").format(self.name))

			# Set enrollment_wf_state based on workflow_state
			if self.workflow_state == "Approved":
				self.enrollment_wf_state = "Approved"
			elif self.workflow_state == "Rejected":
				self.enrollment_wf_state = "Rejected"
			
			# Handle completion workflow state changes
			if self.completion_wf_state == "Approved" and not self.karma_points:
				try:
					# Get activity document and set karma points
					activity = frappe.get_doc("Opportunity", self.activity)
					self.karma_points = activity.karma_points
					frappe.db.set_value("Volunteer Opportunity", self.name, "karma_points", self.karma_points)
				except Exception as e:
					frappe.log_error(f"Error setting karma points: {str(e)}")
					# Don't throw error, just log it
			elif self.completion_wf_state == "Rejected" and self.karma_points:
				# Reset karma points if completion is rejected
				self.karma_points = 0
				frappe.db.set_value("Volunteer Opportunity", self.name, "karma_points", 0)
			
			# Existing logic for updating workflow state
			try:
				if self.enrollment_wf_state == "Approved":
					frappe.db.set_value("Volunteer Activity", self.name, "workflow_state", "Approved")
				elif self.enrollment_wf_state == "Rejected":
					frappe.db.set_value("Volunteer Activity", self.name, "workflow_state", "Rejected")
			except Exception as e:
				frappe.log_error(f"Error updating workflow state: {str(e)}")
				# Don't throw error, just log it

			# socket notification aproved by mykartavya admin
			try:
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
			except Exception as e:
				frappe.log_error(f"Error in realtime notifications: {str(e)}")
				# Don't throw error, just log it

		except Exception as e:
			frappe.log_error(f"Error in on_update: {str(e)}")
			raise

	def validate(self):
		self.update_durations()
		self.validate_mandatory_fields()
		self.calculate_average_percent()
		self.check_completion_status()
		if self.is_new() and self.activity:
			self.populate_activity_table()

	def check_completion_status(self):
		"""Check if all activities are 100% complete and update completion_wf_state"""
		if not self.volunteer_opportunity_activity:
			return

		# Don't check completion if state is being changed to Approved or Rejected
		if self.completion_wf_state in ["Approved", "Rejected"]:
			return

		all_complete = True
		for row in self.volunteer_opportunity_activity:
			if row.percent != 100:
				all_complete = False
				break

		# Only show message and update state if all activities are complete AND state is not already Submitted
		if all_complete and self.completion_wf_state != "Submitted":
			previous_state = self.completion_wf_state
			self.completion_wf_state = "Submitted"
			if previous_state != "Submitted":  # Only show message if state actually changed
				frappe.msgprint("All activities are 100% complete. Completion status has been set to Submitted.", alert=True)

	def calculate_average_percent(self):
		"""Calculate and update the average percentage from child table"""
		if not self.volunteer_opportunity_activity:
			self.com_percent = 0
			return

		total_percent = 0
		valid_rows = 0

		for row in self.volunteer_opportunity_activity:
			if row.percent is not None:
				total_percent += row.percent
				valid_rows += 1

		if valid_rows > 0:
			self.com_percent = total_percent / valid_rows
		else:
			self.com_percent = 0

	def populate_activity_table(self):
		"""Populate the activity table with Opportunity Activities"""
		if not self.activity:
			return

		# Clear existing rows
		self.set("volunteer_opportunity_activity", [])

		# Get all Opportunity Activities for this Opportunity
		activities = frappe.get_all(
			"Opportunity Activity",
			filters={"opportunity": self.activity},
			fields=["name", "activity_name", "description"]
		)

		if activities:
			for activity in activities:
				self.append("volunteer_opportunity_activity", {
					"opportunity_activity": activity.name,
					"activity_name": activity.activity_name,
					"description": activity.description,
					"date": frappe.utils.today(),
					"duration": 0,
					"percent": 0
				})
			# Calculate initial average percent
			self.calculate_average_percent()
		else:
			frappe.msgprint("No activities found for the selected Opportunity", alert=True)

	def update_durations(self):
		"""Update total duration from child table"""
		total_duration = sum(row.duration or 0 for row in self.volunteer_opportunity_activity)
		self.duration = total_duration

	def validate_mandatory_fields(self):
		"""Validate mandatory fields in child table"""
		if self.volunteer_opportunity_activity:
			for idx, row in enumerate(self.volunteer_opportunity_activity, 1):
				if not row.opportunity_activity:
					frappe.throw(f"Row {idx}: Opportunity Activity is mandatory")
				if not row.date:
					frappe.throw(f"Row {idx}: Date is mandatory")
				if row.duration is None:
					frappe.throw(f"Row {idx}: Duration is mandatory")
				if row.percent is None:
					frappe.throw(f"Row {idx}: Percent is mandatory")
 