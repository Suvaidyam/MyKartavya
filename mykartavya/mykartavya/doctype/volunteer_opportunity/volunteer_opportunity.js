// Copyright (c) 2025, Aniket Singh and contributors
// For license information, please see license.txt

frappe.ui.form.on("Volunteer Opportunity", {
    refresh: function (frm) {
        if (frm.doc.completion_wf_state === 'Submitted') {
            frm.add_custom_button("Activity Approve", function () {
                frappe.confirm(
                    'Are you sure you want to approve this activity?',
                    function () {
                        frappe.call({
                            method: 'frappe.client.get',
                            args: {
                                doctype: 'Volunteer Opportunity',
                                name: frm.doc.name
                            },
                            callback: function (r) {
                                if (r.message) {
                                    frm.set_value('completion_wf_state', 'Approved');
                                    frm.save().then(() => {
                                        frappe.show_alert({
                                            message: __('Activity approved successfully'),
                                            indicator: 'green'
                                        });
                                    }).catch((err) => {
                                        frappe.msgprint({
                                            title: __('Error'),
                                            indicator: 'red',
                                            message: __('Failed to approve activity. Please try again.')
                                        });
                                    });
                                } else {
                                    frappe.msgprint({
                                        title: __('Error'),
                                        indicator: 'red',
                                        message: __('Volunteer Opportunity not found. Please refresh the page.')
                                    });
                                }
                            },
                            error: function (err) {
                                frappe.msgprint({
                                    title: __('Error'),
                                    indicator: 'red',
                                    message: __('An error occurred while approving the activity. Please try again.')
                                });
                            }
                        });
                    }
                );
            });

            frm.add_custom_button("Activity Reject", function () {
                frappe.confirm(
                    'Are you sure you want to reject this activity?',
                    function () {
                        frappe.call({
                            method: 'frappe.client.get',
                            args: {
                                doctype: 'Volunteer Opportunity',
                                name: frm.doc.name
                            },
                            callback: function (r) {
                                if (r.message) {
                                    frm.set_value('completion_wf_state', 'Rejected');
                                    frm.save().then(() => {
                                        frappe.show_alert({
                                            message: __('Activity rejected successfully'),
                                            indicator: 'green'
                                        });
                                    }).catch((err) => {
                                        frappe.msgprint({
                                            title: __('Error'),
                                            indicator: 'red',
                                            message: __('Failed to reject activity. Please try again.')
                                        });
                                    });
                                } else {
                                    frappe.msgprint({
                                        title: __('Error'),
                                        indicator: 'red',
                                        message: __('Volunteer Opportunity not found. Please refresh the page.')
                                    });
                                }
                            },
                            error: function (err) {
                                frappe.msgprint({
                                    title: __('Error'),
                                    indicator: 'red',
                                    message: __('An error occurred while rejecting the activity. Please try again.')
                                });
                            }
                        });
                    }
                );
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

        // If all activities are 100% complete and not already Submitted, save the form
        if (all_complete && frm.doc.completion_wf_state != "Submitted") {
            frm.set_value('completion_wf_state', 'Submitted');
            frm.save();
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

        // If all activities are 100% complete and not already Submitted, save the form
        if (all_complete && frm.doc.completion_wf_state != "Submitted") {
            frm.set_value('completion_wf_state', 'Submitted');
            frm.save();
        }
    }
});
