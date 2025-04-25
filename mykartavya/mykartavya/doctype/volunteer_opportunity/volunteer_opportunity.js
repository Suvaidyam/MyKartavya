// Copyright (c) 2025, Aniket Singh and contributors
// For license information, please see license.txt

frappe.ui.form.on("Volunteer Opportunity", {

    activity: function (frm) {
        if (!frm.doc.activity) return;
        if (frm.is_new()) {
            populate_activity_table(frm);
        }
    },

    onload: function (frm) {
        // If activity is already selected when form loads, populate the table
        if (frm.doc.activity) {
            if (frm.is_new()) {
                populate_activity_table(frm);
            }
        }
        update_durations(frm)
    },

    validate: function (frm) {
        // Validate mandatory fields in Volunteer Opportunity Activity table
        if (frm.doc.volunteer_opportunity_activity && frm.doc.volunteer_opportunity_activity.length > 0) {
            update_durations(frm)
            frm.doc.volunteer_opportunity_activity.forEach(function (row, idx) {
                if (!row.opportunity_activity) {
                    frappe.throw(__("Row {0}: Opportunity Activity is mandatory", [idx + 1]));
                }
                if (!row.date) {
                    frappe.throw(__("Row {0}: Date is mandatory", [idx + 1]));
                }
                if (row.duration === undefined || row.duration === null || row.duration === '') {
                    frappe.throw(__("Row {0}: Duration is mandatory", [idx + 1]));
                }
                if (row.percent === undefined || row.percent === null) {
                    frappe.throw(__("Row {0}: Percent is mandatory", [idx + 1]));
                }
            });
        }
    }
});

// Allow duplicate entries in child table
frappe.ui.form.on("Volunteer Opportunity Activity", {
    percent: function (frm, cdt, cdn) {
        calculate_average_percent(frm);
    },
    duration: function (frm, cdt, cdn) {
        update_durations(frm)
    }
});
// Function to calculate average percent
function calculate_average_percent(frm) {
    if (frm.doc.volunteer_opportunity_activity && frm.doc.volunteer_opportunity_activity.length > 0) {
        let total_percent = 0;
        let valid_rows = 0;

        frm.doc.volunteer_opportunity_activity.forEach(function (row) {
            if (row.percent !== undefined && row.percent !== null) {
                total_percent += row.percent;
                valid_rows++;
            }
        });

        if (valid_rows > 0) {
            frm.doc.com_percent = total_percent / valid_rows;
            frm.refresh_field("com_percent");
        }
    }
}

function update_durations(frm) {
    let total_duration = frm.get_sum('volunteer_opportunity_activity', 'duration');
    frm.set_value('duration', total_duration);
}

// Common function to populate the activity table
function populate_activity_table(frm) {

    // Clear existing rows
    frm.clear_table("volunteer_opportunity_activity");

    // Fetch related Opportunity Activities
    frappe.call({
        method: "frappe.client.get_list",
        args: {
            doctype: "Opportunity Activity",
            filters: {
                opportunity: frm.doc.activity
            },
            fields: ["name", "activity_name", "description"]
        },
        callback: function (r) {
            console.log("Response from server:", r);

            if (r.message && r.message.length > 0) {
                r.message.forEach(function (activity) {
                    console.log("Adding activity:", activity);
                    let row = frm.add_child("volunteer_opportunity_activity");
                    row.opportunity_activity = activity.name;
                    row.date = frappe.datetime.nowdate();
                    row.duration = 0; // Set default duration
                    row.percent = 0;
                });
                frm.refresh_field("volunteer_opportunity_activity");
                save_form(frm); // Save the form after populating the table
            } else {
                frappe.msgprint({
                    title: __('No Activities Found'),
                    indicator: 'yellow',
                    message: __('No activities found for the selected Opportunity.')
                });
            }
        },
        error: function (r) {
            console.error("Error fetching activities:", r);
            frappe.msgprint({
                title: __('Error'),
                indicator: 'red',
                message: __('Error fetching activities. Please try again.')
            });
        }
    });
}

// Function to save the form
function save_form(frm) {
    frm.save().then(() => {
        frappe.show_alert({
            message: __('Form saved successfully'),
            indicator: 'green'
        });
    }).catch((err) => {
        frappe.show_alert({
            message: __('Error saving form: {0}', [err.message]),
            indicator: 'red'
        });
    });
}
