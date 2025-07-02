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
		for row in self.volunteer:
			if row.user_email:
				full_name = row.custom_full_name or "Volunteer"
				activity = frappe.get_value("Activity", self.activity,"title")

				html_message = f"""
				<!DOCTYPE html>
				<html lang="en">
				<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
				<title>Activity Assigned - MyKartavya</title>
				<style>
					body {{
					font-family: Arial, sans-serif;
					margin: 0;
					padding: 20px;
					background-color: #f5f5f5;
					}}
					.container {{
					max-width: 500px;
					margin: auto;
					background: #ffffff;
					padding: 10px 30px;
					text-align: center;
					box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
					border-radius: 8px;
					}}
					.logo img {{
					max-width: 220px;
					height: auto;
					}}
					h2 {{
					font-size: 18px;
					margin: 5px 0;
					font-weight: 600;
					}}
					.greeting {{
					color: #444;
					font-size: 16px;
					margin: 5px 0 5px;
					}}
					.info-block {{
					font-size: 14px;
					color: #555;
					line-height: 1.6;
					margin: 5px 0 10px;
					}}
					.highlight {{
					font-weight: bold;
					color: #2c3e50;
					}}
					.closing {{
					font-size: 14px;
					color: #555;
					margin-top: 10px;
					}}
					.footer {{
					margin-top: 5px;
					color: #88817;
					font-size: 14px;
					}}
					.team-name {{
					margin-top: 2px;
					font-size: 14px;
					color: #88817;
					}}
				</style>
				</head>
				<body>
				<div class="container">
					<div class="logo">
					<img src="https://res.cloudinary.com/dyt5jqnax/image/upload/v1742533366/mykartavya-logo_jptv31.png" alt="MyKartavya Logo" />
					</div>
					<h2>Activity Assigned</h2>
					<div class="greeting">
					Dear <span class="highlight">{full_name}</span>,
					</div>
					<div class="info-block"> 
					<p>An activity has been assigned to you - <span class="highlight">{activity}</span>.</p>
					</div>
					<div class="closing">
					<p class="footer">Thank you for your contribution.</p>
					<p class="team-name">MyKartavya Team</p>
					</div>
				</div>
				</body>
				</html>
				"""

				frappe.sendmail(
					recipients=[row.user_email],
					subject="Activity Assigned - MyKartavya",
					message=html_message
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
