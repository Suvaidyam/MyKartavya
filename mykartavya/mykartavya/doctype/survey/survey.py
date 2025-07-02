import frappe
from frappe.model.document import Document
from frappe.utils.jinja import render_template

class Survey(Document):
	def on_update(self):
		if self.status == "Published" and self.activity:
			# Get all volunteer activity linked to this activity
			volunteer_activities = frappe.get_all("Volunteer Activity", filters={
				"activity": self.activity
			}, fields=["volunteer"])
			
			for va in volunteer_activities:
				sva_user = frappe.get_doc("SVA User", va.volunteer)
				activity =frappe.get_value("Activity", self.activity, "title")

				user_email = sva_user.email
				user_full_name = sva_user.full_name or sva_user.name  

				if user_email:
					html = render_template("templates/emails/survey.html", {
						"full_name": user_full_name,
						"activity_name": activity
					})

					frappe.sendmail(
						recipients=[user_email],
						subject="New Survey Published",
						message=html
					)