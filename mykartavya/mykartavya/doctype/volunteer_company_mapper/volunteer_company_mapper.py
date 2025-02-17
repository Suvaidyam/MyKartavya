# Copyright (c) 2025, Aniket Singh and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import random_string
from frappe.utils.verified_command import get_signed_params, verify_request


class VolunteerCompanyMapper(Document):
	def validate(self):
		if not self.is_email_verified:
			# Check if email exists in SVA User
			sva_user = frappe.db.get_value("SVA User", 
				{"email": self.volunteer_email}, 
				["name", "custom_company"]
			)
			if not sva_user:
				frappe.throw("Email not found in SVA User records")
			
			if not sva_user[1]:  # Check if custom_company exists
				frappe.throw("No company associated with this email in SVA User")
			
			if not self.verification_link_sent:
				self.send_verification_email()
				self.verification_link_sent = 1
				frappe.msgprint("Verification email has been sent to " + self.volunteer_email)
			
			frappe.throw("Please verify your email before proceeding")

	def send_verification_email(self):
		verification_key = random_string(32)
		params = {
			"email": self.volunteer_email,
			"docname": self.name,
			"verification_key": verification_key
		}

		verification_link = get_signed_params(params)
		verification_url = f"{frappe.utils.get_url()}/api/method/mykartavya.mykartavya.doctype.volunteer_company_mapper.volunteer_company_mapper.verify_email?{verification_link}"

		# Send email
		frappe.sendmail(
			recipients=[self.volunteer_email],
			subject="Verify Your Email",
			message=f"""
				<p>Please click on the link below to verify your email:</p>
				<p><a href="{verification_url}">Verify Email</a></p>
			"""
		)

	def on_email_verification(self):
		# Fetch details from SVA User including company
		sva_user = frappe.get_doc("SVA User", {"email": self.volunteer_email})
		self.volunteer = sva_user.name
		self.volunteer_name = sva_user.full_name
		self.role_profile = sva_user.role_profile
		self.company = sva_user.custom_company
		self.company_name = frappe.db.get_value("Company", self.company, "company_name")
		self.is_email_verified = 1
		self.save(ignore_permissions=True)

@frappe.whitelist(allow_guest=True)
def verify_email(**kwargs):
	if not verify_request():
		return "Invalid Request"
	
	email = kwargs.get("email")
	docname = kwargs.get("docname")
	
	doc = frappe.get_doc("Volunteer Company Mapper", docname)
	if doc.is_email_verified:
		return "Email already verified"
	
	doc.on_email_verification()
	return "Email verified successfully"
