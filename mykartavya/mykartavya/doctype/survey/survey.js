// Copyright (c) 2025, Aniket Singh and contributors
// For license information, please see license.txt

frappe.ui.form.on("Survey", {
	refresh(frm) {

	},
    before_save(frm) {
        // Ensure the survey is not submitted if it has no questions
        if (frm.doc.questions.length > 0) {
           frm.set_value("form_json", JSON.stringify(frm.doc.questions));
           
        }
    }
});
