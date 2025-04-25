// Copyright (c) 2025, Aniket Singh and contributors
// For license information, please see license.txt

frappe.ui.form.on("Volunteer Opportunity", {
    refresh: function (frm) {

        if (frm.doc.completion_wf_state === 'Submitted') {
            frm.add_custom_button("Activity Approve", function () {
                frm.set_value('completion_wf_state', 'Approved');
                frm.save();
            });

            frm.add_custom_button("Activity Reject", function () {
                frm.set_value('completion_wf_state', 'Rejected');
                frm.save();
            }).addClass('btn-danger');
        }
    },
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
        let all_complete = true;

        frm.doc.volunteer_opportunity_activity.forEach(function (row) {
            if (row.percent !== undefined && row.percent !== null) {
                total_percent += row.percent;
                valid_rows++;
                if (row.percent != 100) {
                    all_complete = false;
                }
            }
        });

        if (valid_rows > 0) {
            frm.set_value('com_percent', total_percent / valid_rows);
        } else {
            frm.set_value('com_percent', 0);
        }

        // If all activities are 100% complete, save the form to trigger the Python check
        if (all_complete && frm.doc.completion_wf_state != "Submitted") {
            frm.save().then(() => {
                frappe.show_alert({
                    message: "All activities are 100% complete. Completion status has been set to Submitted.",
                    indicator: 'green'
                });
            });
        }
    },

    // Update average when a row is removed
    remove: function (frm, cdt, cdn) {
        let total_percent = 0;
        let valid_rows = 0;
        let all_complete = true;

        frm.doc.volunteer_opportunity_activity.forEach(function (row) {
            if (row.percent !== undefined && row.percent !== null) {
                total_percent += row.percent;
                valid_rows++;
                if (row.percent != 100) {
                    all_complete = false;
                }
            }
        });

        if (valid_rows > 0) {
            frm.set_value('com_percent', total_percent / valid_rows);
        } else {
            frm.set_value('com_percent', 0);
        }

        // If all activities are 100% complete, save the form to trigger the Python check
        if (all_complete && frm.doc.completion_wf_state != "Submitted") {
            frm.save().then(() => {
                frappe.show_alert({
                    message: "All activities are 100% complete. Completion status has been set to Submitted.",
                    indicator: 'green'
                });
            });
        }
    }
});
