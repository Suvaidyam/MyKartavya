# Copyright (c) 2025, Aniket Singh and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class OpportunityActivity(Document):
	def after_insert(self):
		if self.opportunity:
			frappe.db.set_value("Opportunity", self.opportunity, "opportunity_status", "Published")
