# Copyright (c) 2025, Aniket Singh and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import random_string
from frappe.utils.verified_command import get_signed_params, verify_request


class VolunteerCompanyMapper(Document):
	# Add a method to generate consistent cache keys
	def get_cache_key(self, prefix):
		return f"{prefix}_{self.volunteer_email}"

	def validate(self):
		
		if not self.is_email_verified:
			verification_cache_key = self.get_cache_key("volunteer_verification")
			sent_cache_key = self.get_cache_key("verification_sent")
			# Check if email exists in SVA User and get all required data in one query
			sva_user = frappe.db.get_value("SVA User", 
				{"email": self.volunteer_email}, 
				["name", "custom_company", "full_name", "role_profile"],
				as_dict=1
					)
			# print("SVA User"*20, sva_user)
			if not sva_user:
				frappe.throw("Email not found in SVA User records")
			
			if not sva_user.custom_company:
				frappe.throw("No company associated with this email in SVA User")
			
			# Check if verification is already in progress
			if not frappe.cache().get_value(sent_cache_key):
				# print("Sending verification email..."*10 , sva_user.name)
				verification_data = {
					"volunteer": self.volunteer if self.volunteer else frappe.db.get_value("SVA User", {"email": frappe.session.user}, "name"),
					"company": sva_user.custom_company,
					"volunteer_name": sva_user.full_name,
					"role_profile": sva_user.role_profile
				}
				
				frappe.cache().set_value(
					verification_cache_key,
					verification_data,
					expires_in_sec=3600
				)
				
			self.send_verification_email()
			frappe.cache().set_value(sent_cache_key, 1, expires_in_sec=3600)

		# if self.is_email_verified == 1:
		# 	return {"reload": True}
	
	# def before_insert(self):
	# 	# Only allow insert if email is verified or if being created during verification
	# 	if not self.is_email_verified and not self.flags.ignore_permissions:
	# 		self.flags.in_insert = True
	# 		frappe.throw("Cannot create record without email verification")

	def send_verification_email(self):
		# Check rate limit
		rate_limit_key = f"email_rate_limit_{self.volunteer_email}"
		if frappe.cache().get_value(rate_limit_key):
			frappe.throw("Please wait a few minutes before requesting another verification email")
		
		# Set rate limit for 5 minutes
		frappe.cache().set_value(rate_limit_key, 1, expires_in_sec=10)
		
		params = {
			"email": self.volunteer_email
		}

		verification_link = get_signed_params(params)
		verification_url = f"{frappe.utils.get_url()}/api/method/mykartavya.mykartavya.doctype.volunteer_company_mapper.volunteer_company_mapper.verify_email?{verification_link}"

		email_template = f"""
			<!DOCTYPE html>
			<html>
			<head>
				<style>
					@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
					
					.email-container {{
						max-width: 600px;
						margin: 0 auto;
						padding: 30px;
						font-family: 'Poppins', sans-serif;
						background: #ffffff;
					}}
					.logo {{
						text-align: center;
						margin-bottom: 30px;
					}}
					.header {{
						background:#4834D4;
						color: white;
						padding: 30px;
						text-align: center;
						border-radius: 16px;
						margin-bottom: 30px;
						box-shadow: 0 4px 15px rgba(107, 70, 193, 0.2);
					}}
					.content {{
						background-color: #F7FAFC;
						padding: 30px;
						border-radius: 16px;
						border: 1px solid #E2E8F0;
					}}
					.verify-button {{
						display: inline-block;
						background: #4834D4;
						color: white;
						padding: 16px 32px;
						text-decoration: none;
						border-radius: 8px;
						margin: 25px 0;
						font-weight: 500;
						transition: transform 0.2s;
						box-shadow: 0 4px 15px rgba(107, 70, 193, 0.2);
					}}
					.verify-button:hover {{
						transform: translateY(-2px);
					}}
					.divider {{
						border-top: 1px solid #E2E8F0;
						margin: 25px 0;
					}}
					.url-text {{
						background-color: #EDF2F7;
						padding: 15px;
						border-radius: 8px;
						font-size: 14px;
						word-break: break-all;
						color: #4A5568;
					}}
					.footer {{
						text-align: center;
						margin-top: 30px;
						color: #718096;
						font-size: 14px;
					}}
					.social-links {{
						margin-top: 20px;
					}}
					.social-links a {{
						margin: 0 10px;
						color: #6B46C1;
						text-decoration: none;
					}}
				</style>
			</head>
			<body style="background-color: #F7FAFC; margin: 0; padding: 20px;">
				<div class="email-container">
					<div class="logo">
						<img src="{frappe.utils.get_url()}/assets/mykartavya/images/logo.png" alt="MyKartavya Logo" height="40">
					</div>
	
					<div class="content">
						<h3 style="color: #2D3748; margin-top: 0;">Hello!</h3>
						<p style="color: #4A5568; line-height: 1.6;">
							Welcome to MyKartavya! We're excited to have you join our volunteer community. To ensure secure access to your account and complete the company mapping process, please verify your email address.
						</p>
						<center>
							<a href="{verification_url}" class="verify-button">Verify My Email</a>
						</center>
						<div class="divider"></div>
						<p style="color: #4A5568; font-size: 14px;">
							If the button above doesn't work, copy and paste this URL into your browser:
						</p>
						<div class="url-text">
							{verification_url}
						</div>
					</div>
					<div class="footer">
						<p>© 2025 MyKartavya. All rights reserved.</p>
						<p style="margin: 5px 0;">This is an automated message, please do not reply.</p>
						<div class="social-links">
							<a href="#">Twitter</a> • 
							<a href="#">Facebook</a> • 
							<a href="#">LinkedIn</a>
						</div>
					</div>
				</div>
			</body>
			</html>
		"""
		frappe.sendmail(
			recipients=[self.volunteer_email],
			subject="Verify Your Email - MyKartavya Volunteer Portal",
			message=email_template,
			now=True
		)

@frappe.whitelist(allow_guest=True)
def verify_email(**kwargs):
	if not verify_request():
		return "Invalid Request"
	
	email = kwargs.get("email")
	if not email:
		return "Missing email parameter"
	
	try:
		# Check if mapping already exists
		existing_mapping = frappe.db.exists("Volunteer Company Mapper", 
			{"volunteer_email": email, "is_email_verified": 1})
		if existing_mapping:
			return "A verified mapping already exists for this email"

		# Get verification data from cache
		verification_data = frappe.cache().get_value(f"volunteer_verification_{email}")

		if not verification_data:
			return "Verification link expired. Please try again."
		
		# Create new document
		doc = frappe.new_doc("Volunteer Company Mapper")
		doc.volunteer_email = email
		doc.volunteer = verification_data["volunteer"]
		doc.company = verification_data["company"]
		doc.volunteer_name = verification_data["volunteer_name"]
		doc.role_profile = verification_data["role_profile"]
		doc.company_name = frappe.db.get_value("Company", verification_data["company"], "company_name")
		doc.is_email_verified = 1
		print("doc"*20, doc.as_dict())
		# frappe.throw("doc"*20)
		
		# Save with flags
		doc.flags.ignore_permissions = True
		doc.insert()
		
		# Clear cache
		frappe.cache().delete_value(f"volunteer_verification_{email}")
		frappe.cache().delete_value(f"verification_sent_{email}")
		
		frappe.db.commit()
		
		# Get the frontend URL from site config
		frontend_url = frappe.get_conf().get('hostname', 'http://mykartavya.localhost:8080')
		redirect_url = f"{frontend_url}/frontend/profile"
		
		# Return JSON response with redirect URL
		frappe.response.type = "redirect"
		frappe.response.location = redirect_url
	except Exception as e:
		frappe.log_error(f"Volunteer Mapping Error: {str(e)}")
		return {
			"status": "error",
			"message": str(e)
		}
