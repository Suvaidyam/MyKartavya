frappe.ui.form.on("Activity", {
    validate: function (frm) {
        if (frm.image_uploaded) {
            frappe.validated = false;
            frm.image_uploaded = false;  
        }

        if (frm.doc.is_global && frm.doc.is_private) {
            frappe.msgprint(__('An activity cannot be both Global and Private. Please uncheck one.'));
            frappe.validated = false;
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
                    if (response.message.custom_company) {
                        frm.set_value('company', response.message.custom_company);
                        frm.set_df_property('company', 'read_only', 1);
                    }
                }
            });
        }
    },
    is_private: function (frm) {
        if (frm.doc.is_private) {
            frm.set_value('is_global', 0);
        }
    },
    is_global: function (frm) {
        if (frm.doc.is_global) {
            frm.set_value('is_private', 0);
        }
    },


    is_private: function (frm) {
        if (!frm.doc.is_private) {
            frm.set_value('company', '');
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

    publish_date: function(frm) {
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

    application_deadline: function(frm) {
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
    start_date: function(frm) {
        if (frm.doc.start_date) {
            frm.set_value('end_date', null);
            frm.set_value('reporting_deadline', null);
    
            const minEndDate = frappe.datetime.add_days(frm.doc.start_date, 1);
    
            frm.fields_dict.end_date.datepicker.update({
                minDate: frappe.datetime.str_to_obj(minEndDate)
            });
        }
    },
    end_date: function(frm) {
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

        if (frm.doc.publish_date) {
            const minDate = frappe.datetime.add_days(frm.doc.publish_date, 1);
    
            frm.fields_dict.application_deadline.datepicker.update({
                minDate: frappe.datetime.str_to_obj(minDate)
            });
        }

        if (frm.doc.application_deadline) {
            const minDate = frappe.datetime.add_days(frm.doc.application_deadline, 1);
    
            frm.fields_dict.start_date.datepicker.update({
                minDate: frappe.datetime.str_to_obj(minDate)
            });
        }
    
        if (frm.doc.start_date) {
            const minEndDate = frappe.datetime.add_days(frm.doc.start_date, 1);
    
            frm.fields_dict.end_date.datepicker.update({
                minDate: frappe.datetime.str_to_obj(minEndDate)
            });
        }
    
        if (frm.doc.end_date) {
            const minDeadline = frappe.datetime.add_days(frm.doc.end_date, 1);
    
            frm.fields_dict.reporting_deadline.datepicker.update({
                minDate: frappe.datetime.str_to_obj(minDeadline)
            });
        }
    },
    activity_published_date_starts: function (frm) {
        if (frm.doc.activity_published_date_starts) {
            frm.set_value('application_deadline', null);
            frm.set_value('auto_approve_volunteers', !frm.doc.auto_approve_volunteers);
            frm.set_value('start_date', frm.doc.publish_date);
        }else {
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