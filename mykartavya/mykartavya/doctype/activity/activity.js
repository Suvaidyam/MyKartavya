// Copyright (c) 2025, Aniket Singh and contributors
// For license information, please see license.txt

frappe.ui.form.on("Activity", {
	// refresh(frm) {

	// },
    country: function(frm) {
        frm.set_query('state', function() {
            return {
                filters: {
                    custom_country: frm.doc.country  
                }
            };
        });
        frm.set_value('state', '');
    },

    state: function(frm) {
        frm.set_query('city', function() {
            return {
                filters: {
                    state: frm.doc.state  
                }
            };
        });
        frm.set_value('city', '');
    }
});
