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
    }
});