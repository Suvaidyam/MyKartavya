// Copyright (c) 2025, Aniket Singh and contributors
// For license information, please see license.txt

frappe.ui.form.on("Opportunity", {

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

    setup(frm) {
        frm['dt_events'] = {
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
                }
            }
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


    unlimited_vacancies: function (frm) {
        if (frm.doc.unlimited_vacancies) {
            frm.set_value('vacancies', 0);
            frm.set_value('buffer_vacancies', 0);
        }
    },

    vacancies: function (frm) {
        update_total_vacancies(frm);
    },
    buffer_vacancies: function (frm) {
        update_total_vacancies(frm);
    },
    skill: function (frm) {
        if (frm.doc.value_type === "Skills") {
            frm.set_value("work_value_points", 0);
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
                frm.set_value("work_value_points", total_value);
                frm.refresh();
            });
        }
    },
    value_type: function (frm) {
        if (frm.doc.value_type === "General") {
            frm.set_value("work_value_points", "");
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
        formatted_today = new Date(today);
        $(frm.fields_dict['publish_date'].$input).datepicker({
            minDate: formatted_today
        });


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
    activity_starts_on_published_date: function (frm) {
        if (frm.doc.activity_starts_on_published_date) {
            frm.set_value('application_deadline', null);
            frm.set_value('auto_approve_volunteers', !frm.doc.auto_approve_volunteers);
            frm.set_value('start_date', frm.doc.publish_date);
        } else {
            frm.set_value('start_date', null);
        }

    },
});

function update_total_vacancies(frm) {
    let vacancies = frm.doc.vacancies || 0;
    let buffer_vacancies = frm.doc.buffer_vacancies || 0;
    let total = vacancies + buffer_vacancies;
    console.log(total,"===================================");
    
    frm.set_value('total_vacancies', total);
}