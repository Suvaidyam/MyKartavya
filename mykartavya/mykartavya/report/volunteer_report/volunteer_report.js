// Copyright (c) 2025, Aniket Singh and contributors
// For license information, please see license.txt

frappe.query_reports["Volunteer Report"] = {
	filters: [
		{
			"fieldname": "full_name",
			"label": __("Full Name"),
			"fieldtype": "Data",
			"placeholder": __("Search by First Name")
		},
		{
			"fieldname": "status",
			"label": __("Status"),
			"fieldtype": "Select",
			"options": ["","Pending Approval", "Approved", "Rejected"],
			"default": ""
		},
		{
			"fieldname": "organisation",
			"label": __("Organisation"),
			"fieldtype": "Data",
			"placeholder": __("Search by Company or NGO name")
		},
		{
			"fieldname": "gender",
			"label": __("Gender"),
			"fieldtype": "Select",
			"options": ["", "Male", "Female", "Other"]
		},
		{
			"fieldname": "skill",
			"label": __("Skill"),
			"fieldtype": "Link",
			"options": "Skills"
		},
	],

	onload: function(report) {
		// Add custom button for exporting data
		report.page.add_inner_button(__("Export"), function() {
			frappe.query_report.export_report();
		});
	},

	formatter: function(value, row, column, data, default_formatter) {
		value = default_formatter(value, row, column, data);

		// Highlight high karma users
		if (column.fieldname == "total_karma_points" && data && data.total_karma_points > 100) {
			value = `<span style="color: green; font-weight: bold;">${value}</span>`;
		}

		// Style status column
		if (column.fieldname == "status" && data) {
			let color = "";
			switch(data.status) {
				case "Active":
					color = "green";
					break;
				case "Inactive":
					color = "red";
					break;
				case "Pending":
					color = "orange";
					break;
				case "Approved":
					color = "green";
					break;
				case "Rejected":
					color = "red";
					break;
			}
			if (color) {
				value = `<span style="color: ${color}; font-weight: bold;">${value}</span>`;
			}
		}
		// Make email clickable
		// if (column.fieldname == "email" && data && data.email) {
		// 	value = `<a href="mailto:${data.email}">${data.email}</a>`;
		// }

		return value;
	}
};