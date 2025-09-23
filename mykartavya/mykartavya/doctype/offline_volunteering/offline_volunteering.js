// Copyright (c) 2025, Aniket Singh and contributors
// For license information, please see license.txt

frappe.ui.form.on("Offline Volunteering", {
	refresh(frm) {
		
	},

	dob: function(frm) {
		if (frm.doc.dob && frappe.datetime.get_diff(frappe.datetime.get_today(), frm.doc.dob) < 0) {
			frappe.msgprint(__("Date of Birth cannot be a future date"));
			frm.set_value("dob", "");
		}
	},

	skills: function (frm) {
		frm.set_value("money_saved", 0);
		let total_value = 0;

		if (frm.doc.skills && frm.doc.skills.length > 0) {
			let promises = frm.doc.skills.map(skill_entry => {
				return frappe.db.get_doc("Skills", skill_entry.skill)
					.then(skill_doc => {
						total_value += skill_doc.rate_per_hour || 0;
					})
					.catch(err => {
						console.error("Error fetching skill:", err);
					});
			});

			Promise.all(promises).then(() => {
				frm.set_value("money_saved", total_value);
				frm.refresh();
			});
		}
	},
});
