// Copyright (c) 2025, Aniket Singh and contributors
// For license information, please see license.txt

frappe.ui.form.on("Volunteer Opportunity", {
    activity: function (frm) {
        if (!frm.doc.activity) return;

        // If form is new, save it to trigger the Python populate_activity_table
        if (frm.is_new()) {
            frm.save().then(() => {
                frm.reload_doc();
            });
        }
    }
});

// Handle child table events
frappe.ui.form.on("Volunteer Opportunity Activity", {
    percent: function (frm, cdt, cdn) {
        let total_percent = 0;
        let valid_rows = 0;

        frm.doc.volunteer_opportunity_activity.forEach(function (row) {
            if (row.percent !== undefined && row.percent !== null) {
                total_percent += row.percent;
                valid_rows++;
            }
        });

        if (valid_rows > 0) {
            frm.set_value('com_percent', total_percent / valid_rows);
        } else {
            frm.set_value('com_percent', 0);
        }
    },

    // Update average when a row is removed
    remove: function (frm, cdt, cdn) {
        let total_percent = 0;
        let valid_rows = 0;

        frm.doc.volunteer_opportunity_activity.forEach(function (row) {
            if (row.percent !== undefined && row.percent !== null) {
                total_percent += row.percent;
                valid_rows++;
            }
        });

        if (valid_rows > 0) {
            frm.set_value('com_percent', total_percent / valid_rows);
        } else {
            frm.set_value('com_percent', 0);
        }
    }
});
