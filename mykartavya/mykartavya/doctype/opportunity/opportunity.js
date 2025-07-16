// Copyright (c) 2025, Aniket Singh and contributors
// For license information, please see license.txt

frappe.ui.form.on("Opportunity", {
    setup(frm) {
        const isMyKartvyaAdmin = frappe.user_roles.includes("MyKartvya Admin");
        const isCompanyAdmin = frappe.user_roles.includes("Company Admin");
        const user_roles = isMyKartvyaAdmin || isCompanyAdmin
        frm['dt_events'] = {
            "Volunteer Opportunity": {
                formatter: {
                    action: function (element, column, row) {
                        if (!user_roles || ["Pending", "Approved", "Rejected"].includes(row.completion_wf_state)) {
                            element.setAttribute('disabled', true);
                        } else {
                            // if(row.completion_wf_state === "Submitted"){
                            //     element.setAttribute('style','background-color:green;')
                            // }
                            // if(row.completion_wf_state === "Approved"){
                            //     element.setAttribute('style','background-color:red;')
                            // }
                            // if(row.completion_wf_state === "Rejected"){
                            //     element.setAttribute('style','background-color:green;')
                            // }
                        }
                        return element
                    },
                    completion_wf_state: function (value, column, row) {
                        if (value === "Pending") {
                            return `<span class="badge text-muted" style="padding:5px;font-size:12px;">${__('Pending')}</span>`;
                        }
                        if (value === "Submitted") {
                            return `<span class="badge badge-warning" style="padding:5px;font-size:12px;">${__('Submitted')}</span>`;
                        }
                        if (value === "Approved") {
                            return `<span class="badge badge-success" style="padding:5px;font-size:12px;">${__('Approved')}</span>`;
                        }
                        if (value === "Rejected") {
                            return `<span class="badge badge-danger" style="padding:5px;font-size:12px;">${__('Rejected')}</span>`;
                        }
                        return value;
                    },
                    duration: function (value, column, rows) {
                        console.log(value, 'value');
                        let result = frappe.utils.seconds_to_duration(value, { hide_days: true });
                        value = '0 min'
                        if (result?.hours && result?.minutes) {
                            value = `${result.hours} ${result.hours > 1 ? 'hr' : 'hr'} ${result.minutes} ${result.minutes > 1 ? 'mins' : 'min'}`
                        } else if (result.minutes) {
                            value = `${result.minutes} ${result.minutes > 1 ? 'min' : 'min'}`
                        }
                        return value
                    },
                    volunteer: function (value, column, row) {
                        if (value) {
                            value =  `<a href="${frappe.utils.get_form_link('Volunteer Opportunity',row.name)}" class="text-muted px-2" style="cursor: pointer;">${value}</a>`;
                        }
                        return value;
                    }
                },
                columnEvents: {
                    action: {
                        click: function (e, value, column, row) {
                            let doc = row;
                            let d = new frappe.ui.Dialog({
                                title: __('Activity Action'),
                                fields: [
                                    {
                                        fieldtype: 'Select',
                                        label: __('Action'),
                                        fieldname: 'action',
                                        options: [
                                            { label: __('Approve'), value: 'approve' },
                                            { label: __('Reject'), value: 'reject' }
                                        ],
                                        reqd: 1
                                    }
                                ],
                                primary_action_label: __('Submit'),
                                primary_action: function (data) {
                                    d.hide();
                                    if (data.action === 'approve') {
                                        frappe.db.set_value('Volunteer Opportunity', doc.name, 'completion_wf_state', 'Approved')
                                    } else if (data.action === 'reject') {
                                        frappe.db.set_value('Volunteer Opportunity', doc.name, 'completion_wf_state', 'Rejected')
                                        let reasonDialog = new frappe.ui.Dialog({
                                            title: 'Reason for Rejection',
                                            fields: [
                                                {
                                                    label: 'Reason',
                                                    fieldname: 'reason',
                                                    fieldtype: 'Small Text',
                                                    reqd: 1
                                                }
                                            ],
                                            primary_action_label: 'Submit',
                                            primary_action(values) {
                                                frappe.db.set_value('Volunteer Opportunity', doc.name, 'remarks', values.reason).then(() => {
                                                    frappe.db.set_value('Volunteer Opportunity', doc.name, 'completion_wf_state', 'Rejected').then(() => {
                                                        reasonDialog.hide();
                                                        if (frm?.sva_tables?.['Volunteer Opportunity']) {
                                                            frm.sva_tables['Volunteer Opportunity'].reloadTable();
                                                        }
                                                    });
                                                });
                                            }
                                        });
                                        reasonDialog.show();
                                    }
                                    if (frm?.sva_tables?.['Volunteer Opportunity']) {
                                        frm?.sva_tables?.['Volunteer Opportunity'].reloadTable();
                                    }
                                    d.hide();
                                }
                            });
                            d.show()
                        }
                    }
                }
            },
            "Opportunity Activity": {
                after_render: function (dt, mode) {
                    let form = dt.form_dialog;
                    let opportunity = form.get_value('opportunity');
                    form.set_query('parent1', () => {
                        return {
                            filters: {
                                'opportunity': opportunity || `Select opportunity`
                            }
                        }
                    })
                    let today = frappe.datetime.get_today();
                    dt.form_dialog.set_df_property('start_date', 'min_date', today);
                    const formatted_today = new Date(today);
                    $(dt.form_dialog.fields_dict.start_date.$input).datepicker({
                        minDate: formatted_today
                    });
                },
                formatter: {
                    activity_name: function (value, column, row) {
                        if (value) {
                            value = `<a href="${frappe.utils.get_form_link('Opportunity Activity', row.name)}" class="text-muted px-2" style="cursor: pointer;">${value}</a>`;
                        }
                        return value;
                    }
                }
            }
        }
    },
    validate: function (frm) {
        if (frm.image_uploaded) {
            frappe.validated = false;
            frm.image_uploaded = false;
        }
    },

    opportunity_image: function (frm) {
        if (frm.doc.opportunity_image) {
            frm.image_uploaded = true;
        }
    },

    // is_private: function (frm) {
    //     if (!frm.doc.is_private) {
    //         frm.set_value('company', null);
    //     }
    // },

    // is_global: function (frm) {
    //     if (frm.doc.is_private) {
    //         frm.set_value('is_private', 0);
    //     }
    // },


    // unlimited_vacancies: function (frm) {
    //     if (frm.doc.unlimited_vacancies) {
    //         frm.set_value('vacancies', 0);
    //         frm.set_value('buffer_vacancies', 0);
    //     }
    // },

    // vacancies: function (frm) {
    //     update_total_vacancies(frm);
    // },
    // buffer_vacancies: function (frm) {
    //     update_total_vacancies(frm);
    // },
    // skill: function (frm) {
    //     if (frm.doc.value_type === "Skills") {
    //         frm.set_value("work_value_points", 0);
    //         let total_value = 0;
    //         let promises = frm.doc.skill.map(skill_entry => {
    //             return frappe.db.get_doc("Skills", skill_entry.skills_name)
    //                 .then(skill_doc => {
    //                     total_value += skill_doc.rate_per_hour;
    //                 })
    //                 .catch(err => {
    //                     console.error("Error fetching skill:", err);
    //                 });
    //         });

    //         Promise.all(promises).then(() => {
    //             frm.set_value("work_value_points", total_value);
    //             frm.refresh();
    //         });
    //     }
    // },
    // value_type: function (frm) {
    //     if (frm.doc.value_type === "General") {
    //         frm.set_value("work_value_points", "");
    //         frm.set_value("skill", []);
    //     }
    // },

    // publish_date: function (frm) {
    //     if (frm.doc.publish_date) {
    //         frm.set_value('application_deadline', null);
    //         frm.set_value('end_date', null);
    //         frm.set_value('reporting_deadline', null);
    //         frm.set_value('start_date', null);

    //         const minDate = frappe.datetime.add_days(frm.doc.publish_date, 1);

    //         frm.fields_dict.application_deadline.datepicker.update({
    //             minDate: frappe.datetime.str_to_obj(minDate)
    //         });
    //     }
    // },

    // application_deadline: function (frm) {
    //     if (frm.doc.application_deadline) {
    //         frm.set_value('start_date', null);
    //         frm.set_value('end_date', null);
    //         frm.set_value('reporting_deadline', null);

    //         const minEndDate = frappe.datetime.add_days(frm.doc.application_deadline, 1);

    //         frm.fields_dict.start_date.datepicker.update({
    //             minDate: frappe.datetime.str_to_obj(minEndDate)
    //         });
    //     }
    // },
    start_date: function (frm) {
        if (frm.doc.start_date) {
            frm.set_value('end_date', null);

            const minEndDate = frappe.datetime.add_days(frm.doc.start_date, 1);

            frm.fields_dict.end_date.datepicker.update({
                minDate: frappe.datetime.str_to_obj(minEndDate)
            });
        }
    },
    end_date: function (frm) {
        if (frm.doc.end_date) {

            const minEndDate = frappe.datetime.add_days(frm.doc.end_date, 1);

            frm.fields_dict.reporting_deadline.datepicker.update({
                minDate: frappe.datetime.str_to_obj(minEndDate)
            });
        }
    },


    onload: function (frm) {
        if (frm.is_new()) {
            frappe.call({
                method: 'frappe.client.get_value',
                args: {
                    doctype: 'SVA User',
                    filters: { email: frappe.session.user },
                    fieldname: ['role_profile', 'custom_company', 'custom_ngo']
                },
                callback: function (response) {
                    if (response.message.custom_ngo && response.message.role_profile === "NGO Admin") {
                        frm.set_value('ngo', response.message.custom_ngo);
                    }
                    if (response.message.custom_company) {
                        frm.set_value('company', response.message.custom_company);
                        frm.set_df_property('company', 'read_only', 1);
                    }
                }
            });
        }
    },


    refresh(frm) {
        // if (frm.doc.opportunity_status === "Published") {
        //     frm.set_read_only();
        //     // frm.disable_save();
        // }
        // let today = frappe.datetime.get_today();
        // frm.set_df_property('publish_date', 'min_date', today);
        // const formatted_today = new Date(today);

        // if (frm.fields_dict.publish_date?.$input) {
        //     $(frm.fields_dict.publish_date.$input).datepicker({
        //         minDate: formatted_today
        //     });
        // }

        // if (frm.doc.publish_date) {
        //     const minDate = frappe.datetime.add_days(frm.doc.publish_date, 1);
        //     if (frm.fields_dict.application_deadline?.datepicker) {
        //         frm.fields_dict.application_deadline.datepicker.update({
        //             minDate: frappe.datetime.str_to_obj(minDate)
        //         });
        //     }
        // }

        // if (frm.doc.application_deadline) {
        //     const minDate = frappe.datetime.add_days(frm.doc.application_deadline, 1);
        //     if (frm.fields_dict.start_date?.datepicker) {
        //         frm.fields_dict.start_date.datepicker.update({
        //             minDate: frappe.datetime.str_to_obj(minDate)
        //         });
        //     }
        // }

        if (frm.doc.start_date) {
            const minEndDate = frappe.datetime.add_days(frm.doc.start_date, 1);
            if (frm.fields_dict.end_date?.datepicker) {
                frm.fields_dict.end_date.datepicker.update({
                    minDate: frappe.datetime.str_to_obj(minEndDate)
                });
            }
        }

        if (frm.doc.end_date) {
            const minDeadline = frappe.datetime.add_days(frm.doc.end_date, 1);
            if (frm.fields_dict.reporting_deadline?.datepicker) {
                frm.fields_dict.reporting_deadline.datepicker.update({
                    minDate: frappe.datetime.str_to_obj(minDeadline)
                });
            }
        }
    },

    // activity_starts_on_published_date: function (frm) {
    //     if (frm.doc.activity_starts_on_published_date) {
    //         frm.set_value('application_deadline', null);
    //         frm.set_value('auto_approve_volunteers', !frm.doc.auto_approve_volunteers);
    //         frm.set_value('start_date', frm.doc.publish_date);
    //     } else {
    //         frm.set_value('start_date', null);
    //     }

    // },
});

// function update_total_vacancies(frm) {
//     let vacancies = frm.doc.vacancies || 0;
//     let buffer_vacancies = frm.doc.buffer_vacancies || 0;
//     let total = vacancies + buffer_vacancies;
//     console.log(total, "===================================");

//     frm.set_value('total_vacancies', total);
// }