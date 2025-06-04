# Copyright (c) 2025, Aniket Singh and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import validate_email_address
from datetime import datetime
import re


class Birthdays(Document):
	def validate(self):
		self.validate_email()
		self.validate_mobile()
		self.validate_birth_date()
	
	def validate_email(self):
		if self.email_id:
			validate_email_address(self.email_id, throw=True)
	
	def validate_mobile(self):
		if self.mobile_number:
			# Indian mobile number regex pattern (10 digits starting with 6-9)
			pattern = r'^[6-9]\d{9}$'
			if not re.match(pattern, self.mobile_number):
				frappe.throw("Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9")
	
	def validate_birth_date(self):
		if self.birth_date:
			birth_date = datetime.strptime(str(self.birth_date), "%Y-%m-%d")
			today = datetime.now()
			if birth_date > today:
				frappe.throw("Birth date cannot be in the future")
	
	def autoname(self):
		# Create name in format: BIRTH-{name}-{YYYYMMDD}
		if not self.name1:
			frappe.throw("Name is required")
		self.name = f"BIRTH-{self.name1}-{datetime.now().strftime('%Y%m%d')}"
