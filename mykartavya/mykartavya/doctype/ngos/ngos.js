// Copyright (c) 2025, Aniket Singh and contributors
// For license information, please see license.txt

frappe.ui.form.on("NGOs", {
    setup: function (frm) {
        frm['dt_events'] = {
            "SVA User": {
                "after_render": (dt, mode) => {
                    let form_dialog = dt.form_dialog;
                    form_dialog.set_value("custom_volunteer_type", "NGO Member");
                    let today = new Date();
                    let min_date = new Date();
                    min_date.setFullYear(today.getFullYear() - 18);

                    // Set max date for datepicker field
                    dt.form_dialog.set_df_property(
                        'custom_date_of_birth',
                        'max_date',
                        frappe.datetime.obj_to_str(today)
                    );
                    // jQuery datepicker settings
                    $(dt.form_dialog.fields_dict.custom_date_of_birth.$input).datepicker({
                        maxDate: today,
                        yearRange: '-100:+0'
                    });
                },
                custom_date_of_birth: function (dt) {
                    let raw_dob = dt.form_dialog.get_value('custom_date_of_birth');
                    if (raw_dob) {
                        let dob = new Date(raw_dob);
                        let today = new Date();
                        let min_date = new Date();
                        min_date.setFullYear(today.getFullYear() - 18);

                        if (dob > today) {
                            frappe.show_alert({
                                message: 'Date of birth cannot be in the future.',
                                indicator: 'red'
                            });
                            dt.form_dialog.set_value('custom_date_of_birth', '');
                        } else if (dob > min_date) {
                            frappe.show_alert({
                                message: 'User must be at least 18 years old.',
                                indicator: 'red'
                            });
                            dt.form_dialog.set_value('custom_date_of_birth', '');
                        }
                    }
                },
                custom_phone_number: function (dt) {
                    let phone = dt.form_dialog.get_value('custom_phone_number');
                    if (phone) {
                        const digits = phone.replace(/\D/g, '');
                        if (digits.length > 12) {
                            frappe.show_alert({
                                message: `Phone number should not exceed 10 digits.`,
                                indicator: 'red'
                            });
                        }
                    }
                },
            }
        }
    },
    validate: function (frm) {
        if (frm.image_uploaded) {
            frappe.validated = false;
            frm.image_uploaded = false;
        }
    },

    ngo_logo: function (frm) {
        if (frm.doc.ngo_logo) {
            frm.image_uploaded = true;
        }
    },
    refresh(frm) {
        if (frm.timeline && frm.timeline.wrapper) {
            frm.timeline.wrapper.hide();
        }
        $('.layout-side-section').hide();
        set_filters(frm);
        if (frm.doc.copy_contact_details) {
            frm.set_value('ngo_head_name', frm.doc.contact_person_name);
            frm.set_value('ngo_head_email', frm.doc.email);
            frm.set_value('ngo_head_office_number', frm.doc.official_contact_number);
        }
    },

    copy_contact_details: function (frm) {
        if (frm.doc.copy_contact_details) {
            frm.set_value('ngo_head_name', frm.doc.contact_person_name);
            frm.set_value('ngo_head_email', frm.doc.email);
            frm.set_value('ngo_head_office_number', frm.doc.official_contact_number);
            // Optional: Show a message to user
            frappe.show_alert({
                message: 'Fields copied successfully!',
                indicator: 'green'
            });
        } else {
            // Clear the target fields
            frm.set_value('ngo_head_name', '');
            frm.set_value('ngo_head_email', '');
            frm.set_value('ngo_head_office_number', '');
        }
    },

    official_contact_number(frm) {
        const raw = frm.doc.official_contact_number;
        if (raw) {
            const digits = raw.replace(/\D/g, '');
            if (digits.length > 12) {
                frappe.show_alert({
                    message: `Official Contact Number "${raw}" should not exceed 10 digits.`,
                    indicator: 'red'
                });
            }
        }
    },
    ngo_head_office_number(frm) {
        const raw = frm.doc.ngo_head_office_number;
        if (raw) {
            // Sirf digits nikaalein
            const digits = raw.replace(/\D/g, '');
            if (digits.length > 12) {
                frappe.show_alert({
                    message: `NGO Head Office Number "${raw}" should not exceed 10 digits.`,
                    indicator: 'red'
                });
            }
        }

    },
    ngo_head_mobile(frm) {
        const raw = frm.doc.ngo_head_mobile;
        if (raw) {
            const digits = raw.replace(/\D/g, '');
            if (digits.length > 10) {
                frappe.show_alert({
                    message: `Mobile number "${raw}" should not exceed 10 digits.`,
                    indicator: 'red'
                });
            }
        }

    },

    first_priority_goal(frm) {
        frm.set_value("second_priority_goal", null);
        frm.set_value("third_priority_goal", null);
        set_filters(frm);
    },

    second_priority_goal(frm) {
        frm.set_value("third_priority_goal", null);
        set_filters(frm);
    }
});

function set_filters(frm) {
    frm.set_query("second_priority_goal", () => ({
        filters: [["name", "!=", frm.doc.first_priority_goal]]
    }));

    frm.set_query("third_priority_goal", () => ({
        filters: [["name", "not in", [frm.doc.first_priority_goal, frm.doc.second_priority_goal]]]
    }));
}


