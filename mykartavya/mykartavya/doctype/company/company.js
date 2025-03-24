// Copyright (c) 2025, Aniket Singh and contributors
// For license information, please see license.txt
frappe.ui.form.on("Company", {
  
    setup: function (frm) {
        frm['dt_events'] = {
            "SVA User": {
                "after_render": (dt, mode) => {
                    let form_dialog = dt.form_dialog;
                    form_dialog.set_value("custom_volunteer_type", "Employee");
                }
            }
        }
    },
    company_registration_date: function (frm) {
        let registration_date = frm.doc.company_registration_date;
        let today = frappe.datetime.get_today();

        if (registration_date > today) {
            frappe.msgprint(__('Company Registration Date cannot be a future date.'));
            frm.set_value('company_registration_date', '');
        }
    }
  
});