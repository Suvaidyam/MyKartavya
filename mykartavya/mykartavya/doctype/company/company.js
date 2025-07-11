// Copyright (c) 2025, Aniket Singh and contributors
// For license information, please see license.txt
frappe.ui.form.on("Company", {
    setup: function (frm) {
        frm['dt_events'] = {
            "SVA User": {
                "after_render": (dt, mode) => {
                    let form_dialog = dt.form_dialog;
                    console.log("Form Dialog:", form_dialog);
                    
                    // Set default volunteer type
                    form_dialog.set_value("custom_volunteer_type", "Employee");
                    // Set max date to today and limit DOB to users 18+ years
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
                formatter: {
                    full_name: function (value, column, row) {
                        if (value) {
                            value = `<a href="${frappe.utils.get_form_link('SVA User', row.name)}" class="text-muted px-2" style="cursor: pointer;">${value}</a>`;
                        }
                        return value;
                    }
                },
                columnEvents: {
                    full_name: {
                        click: function (e, value, column, row) {
                            if (!row || !row.name) return;
                            window.location.href = `/app/sva-user/${row.name}`;
                        }
                    }
                }
            },
        }
    },
    refresh(frm) {
        if (frm.doc.copy_contact_details) {
            frm.set_value("volunteering_incharge_name", frm.doc.first_name)
            frm.set_value("volunteering_incharge_email", frm.doc.email)
            frm.set_value("volunteering_incharge_phone", frm.doc.phone)
        }
    },
    copy_contact_details: function (frm) {
        if (frm.doc.copy_contact_details) {
            frm.set_value("volunteering_incharge_name", frm.doc.first_name)
            frm.set_value("volunteering_incharge_email", frm.doc.email)
            frm.set_value("volunteering_incharge_phone", frm.doc.phone)
            frappe.show_alert({
                message: 'Contact Information copied successfully!',
                indicator: 'green'
            });
        } else {
            frm.set_value("volunteering_incharge_name", ' ')
            frm.set_value("volunteering_incharge_email", ' ')
            frm.set_value("volunteering_incharge_phone", '')
        }
    },


    company_registration_date: function (frm) {
        let registration_date = frm.doc.company_registration_date;
        let today = frappe.datetime.get_today();

        if (registration_date > today) {
            frappe.msgprint(__('Company Registration Date cannot be a future date.'));
            frm.set_value('company_registration_date', '');
        }
    },
    validate: function (frm) {
        if (frm.image_uploaded) {
            frappe.validated = false;
            frm.image_uploaded = false;
        }
    },

    company_logo: function (frm) {
        if (frm.doc.company_logo) {
            frm.image_uploaded = true;
        }
    },

    phone(frm) {
        const raw = frm.doc.phone
        if (raw) {
            const digits = raw.replace(/\D/g, '');
            if (digits.length > 12) {
                frappe.show_alert({
                    message: `Phone" ${raw}" should not exceed 10 digits.`,
                    indicator: 'red'
                });
            }
        }
    },

    volunteering_incharge_phone(frm) {
        const raw = frm.doc.volunteering_incharge_phone
        if (raw) {
            const digits = raw.replace(/\D/g, '');
            if (digits.length > 12) {
                frappe.show_alert({
                    message: `Volunteering Incharge phone"${raw}" should not exceed 10 digits.`,
                    indicator: 'red'
                });
            }
        }
    },
    before_workflow_action: function (frm) {
        if (frm.selected_workflow_action == 'Reject') {
            frappe.prompt(
                {
                    label: "Rejected Reason",
                    fieldname: "rejected_reason",
                    fieldtype: "Small Text",
                    reqd: 1
                },
                function (values) {
                    frm.set_value("remarks", values.rejected_reason);
                    frm.set_value("workflow_state", 'Rejected');
                    frm.save()
                },
                "Please provide a reason for rejection"
            );
        }
        if (frm.doc.workflow_state == 'Pending Approval') {
            frm.set_value('remarks', '');
            frm.set_value('remarks', '');
            frm.save()
        }
    },
});
