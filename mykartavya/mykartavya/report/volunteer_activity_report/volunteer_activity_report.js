// Copyright (c) 2025, Aniket Singh and contributors
// For license information, please see license.txt

frappe.query_reports["Volunteer Activity Report"] = {
	filters: [
	{
		fieldname: "start_date",
		label: __("Start Date"),
		fieldtype: "Date",
	},
	{
		fieldname: "end_date",
		label: __("End Date"),
		fieldtype: "Date",
		
	},

	],
};
