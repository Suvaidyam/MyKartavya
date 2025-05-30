frappe.ui.form.on("Activity", {
    setup(frm) {
        frm['dt_events'] = {
            "Volunteer Activity": {
                formatter:{
                    action: function (element, column,row) {
                        if (row.completion_wf_state === "Pending") {
                            element.setAttribute('style','display:none;');
                        }else{
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
                    completion_wf_state: function (value,column, row) {
                        if(value === "Pending") {
                            return `<span class="badge text-muted" style="padding:5px;font-size:12px;">${__('Pending')}</span>`;
                        }
                        if(value === "Submitted") {
                            return `<span class="badge badge-warning" style="padding:5px;font-size:12px;">${__('Submitted')}</span>`;
                        }
                        if(value === "Approved") {
                            return `<span class="badge badge-success" style="padding:5px;font-size:12px;">${__('Approved')}</span>`;
                        }
                        if(value === "Rejected") {
                            return `<span class="badge badge-danger" style="padding:5px;font-size:12px;">${__('Rejected')}</span>`;
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
                                    if (data.action === 'approve') {
                                        frappe.db.set_value('Volunteer Activity', doc.name, 'completion_wf_state', 'Approved')
                                    } else if (data.action === 'reject') {
                                        frappe.db.set_value('Volunteer Activity', doc.name, 'completion_wf_state', 'Rejected')
                                    }
                                    if (frm?.sva_tables?.['Volunteer Activity']){
                                        frm?.sva_tables?.['Volunteer Activity'].reloadTable();
                                    }
                                    d.hide();
                                }
                            });
                            d.show()
                        }
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

    activity_image: function (frm) {
        if (frm.doc.activity_image) {
            frm.image_uploaded = true;
        }
    },
    onload: function (frm) {
        if (frm.is_new()) {
            frappe.call({
                method: 'frappe.client.get_value',
                args: {
                    doctype: 'SVA User',
                    filters: { email: frappe.session.user },
                    fieldname: ['role_profile', 'custom_company']
                },
                callback: function (response) {
                    if (response.message && response.message.role_profile === "Company Admin") {
                        frm.set_value('is_private', 1);
                    }
                    // if (response.message && response.message.role_profile === "NGO Admin") {
                    //     frm.set_df_property('is_private', 'read_only', 1);
                    // }
                    if (response.message.custom_company) {
                        frm.set_value('company', response.message.custom_company);
                        frm.set_df_property('company', 'read_only', 1);
                    }
                }
            });
        }
    },

    is_private: function (frm) {
        if (!frm.doc.is_private) {
            frm.set_value('company', null);
        }
        else {
            frm.set_value('is_global', 0);
        }
    },

    is_global: function (frm) {
        if (frm.doc.is_private) {
            frm.set_value('is_private', 0);
        }
    },

    skill: function (frm) {
        if (frm.doc.value_type === "Skills") {
            frm.set_value("work_value_rupees", 0);
            let total_value = 0;
            let promises = frm.doc.skill.map(skill_entry => {
                return frappe.db.get_doc("Skills", skill_entry.skills_name)
                    .then(skill_doc => {
                        total_value += skill_doc.rate_per_hour;
                    })
                    .catch(err => {
                        console.error("Error fetching skill:", err);
                    });
            });

            Promise.all(promises).then(() => {
                frm.set_value("work_value_rupees", total_value);
                frm.refresh();
            });
        }
    },

    unlimited_vacancies: function (frm) {
        if (frm.doc.unlimited_vacancies) {
            is_private
            frm.set_value('vacancy', 0);
            frm.set_value('buffer_vacancy', 0);
        }
    },

    vacancy: function (frm) {
        update_total_vacancies(frm);
    },
    buffer_vacancy: function (frm) {
        update_total_vacancies(frm);
    },

    value_type: function (frm) {
        if (frm.doc.value_type === "General") {
            frm.set_value("work_value_rupees", "");
            frm.set_value("skill", []);
        }
    },

    publish_date: function (frm) {
        if (frm.doc.publish_date) {
            frm.set_value('application_deadline', null);
            frm.set_value('end_date', null);
            frm.set_value('reporting_deadline', null);
            frm.set_value('start_date', null);

            const minDate = frappe.datetime.add_days(frm.doc.publish_date, 1);

            frm.fields_dict.application_deadline.datepicker.update({
                minDate: frappe.datetime.str_to_obj(minDate)
            });
        }
    },

    application_deadline: function (frm) {
        if (frm.doc.application_deadline) {
            frm.set_value('start_date', null);
            frm.set_value('end_date', null);
            frm.set_value('reporting_deadline', null);

            const minEndDate = frappe.datetime.add_days(frm.doc.application_deadline, 1);

            frm.fields_dict.start_date.datepicker.update({
                minDate: frappe.datetime.str_to_obj(minEndDate)
            });
        }
    },
    start_date: function (frm) {
        if (frm.doc.start_date) {
            frm.set_value('end_date', null);
            frm.set_value('reporting_deadline', null);

            const minEndDate = frappe.datetime.add_days(frm.doc.start_date, 1);

            frm.fields_dict.end_date.datepicker.update({
                minDate: frappe.datetime.str_to_obj(minEndDate)
            });
        }
    },
    end_date: function (frm) {
        if (frm.doc.end_date) {
            frm.set_value('reporting_deadline', null);

            const minEndDate = frappe.datetime.add_days(frm.doc.end_date, 1);

            frm.fields_dict.reporting_deadline.datepicker.update({
                minDate: frappe.datetime.str_to_obj(minEndDate)
            });
        }
    },

    refresh(frm) {
        let today = frappe.datetime.get_today();
        frm.set_df_property('publish_date', 'min_date', today);

        const formatted_today = new Date(today);

        // Set datepicker minDate for publish_date
        if (frm.fields_dict.publish_date && frm.fields_dict.publish_date.$input) {
            $(frm.fields_dict.publish_date.$input).datepicker({
                minDate: formatted_today
            });
        }

        // Helper to update datepicker safely
        function update_min_date(fieldname, date) {
            if (
                frm.fields_dict[fieldname] &&
                frm.fields_dict[fieldname].$input &&
                frm.fields_dict[fieldname].datepicker
            ) {
                frm.fields_dict[fieldname].datepicker.update({
                    minDate: frappe.datetime.str_to_obj(date)
                });
            }
        }

        if (frm.doc.publish_date) {
            const minDate = frappe.datetime.add_days(frm.doc.publish_date, 1);
            update_min_date("application_deadline", minDate);
        }

        if (frm.doc.application_deadline) {
            const minDate = frappe.datetime.add_days(frm.doc.application_deadline, 1);
            update_min_date("start_date", minDate);
        }

        if (frm.doc.start_date) {
            const minDate = frappe.datetime.add_days(frm.doc.start_date, 1);
            update_min_date("end_date", minDate);
        }

        if (frm.doc.end_date) {
            const minDate = frappe.datetime.add_days(frm.doc.end_date, 1);
            update_min_date("reporting_deadline", minDate);
        }
    },
    activity_published_date_starts: function (frm) {
        if (frm.doc.activity_published_date_starts) {
            frm.set_value('application_deadline', null);
            frm.set_value('auto_approve_volunteers', !frm.doc.auto_approve_volunteers);
            frm.set_value('start_date', frm.doc.publish_date);
        } else {
            frm.set_value('start_date', null);
        }
    }
});

function update_total_vacancies(frm) {
    let vacancy = frm.doc.vacancy || 0;
    let buffer_vacancy = frm.doc.buffer_vacancy || 0;
    let total = vacancy + buffer_vacancy;
    frm.set_value('total_vacancies', total);
}