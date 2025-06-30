# Copyright (c) 2025, Aniket Singh and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class ActivityVolunteerGroup(Document):
	def after_insert(self):
		# Get all volunteers from the group
		group_doc = frappe.get_doc("Volunteer Groups", self.group)
		
		# Track duplicates
		duplicate_volunteers = []
		
		# Create Volunteer Activity entries for each volunteer
		for volunteer in group_doc.volunteers:
			if not frappe.db.exists("Volunteer Activity", {
				"volunteer": volunteer.users,
				"activity": self.activity
			}):
				volunteer_activity = frappe.new_doc("Volunteer Activity")
				volunteer_activity.update({
					"volunteer": volunteer.users,
					"activity": self.activity,
					"enrollment_wf_state": "Approved"
				})
				volunteer_activity.insert(ignore_permissions=True)
				frappe.db.commit()
			else:
				# Add to duplicates list
				duplicate_volunteers.append(volunteer.users)
		
		# Show message if there are duplicates
		if duplicate_volunteers:
			frappe.msgprint(
				"Volunteer Activity already exists for the following volunteers and was not duplicated: <br><b>{}</b>".format(
					", ".join(duplicate_volunteers)
				),
				alert=True
			)

	def on_trash(self):
		# Get all volunteers from the group
		group_doc = frappe.get_doc("Volunteer Groups", self.group)
		
		# Delete Volunteer Activity entries for each volunteer
		for volunteer in group_doc.volunteers:
			va_name = frappe.db.get_value("Volunteer Activity", {
				"volunteer": volunteer.users,
				"activity": self.activity
			})
			if va_name:
				frappe.delete_doc("Volunteer Activity", va_name, ignore_permissions=True)
