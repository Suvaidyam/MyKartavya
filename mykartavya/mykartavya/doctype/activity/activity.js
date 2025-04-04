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
    refresh(frm) {

        let today = new Date(frappe.datetime.get_today());
        let fields = [
            // { name: "publish_date", min: today },
            { name: "application_deadline", depends_on: "publish_date" },
            { name: "start_date", depends_on: "application_deadline" },
            { name: "end_date", depends_on: "start_date" },
            { name: "reporting_deadline", depends_on: "end_date" }
        ];

        fields.forEach(field => {
            if (frm.fields_dict[field.name]) {
                let $input = $(frm.fields_dict[field.name].$input);
                $input.datepicker({
                    minDate: field.min || null
                }).on("change", function () {
                    validate_date(frm, field.name, field.depends_on);
                });
            }
        });
    },
    activity_published_date_starts: function (frm) {
        frm.set_value('auto_approve_volunteers', !frm.doc.auto_approve_volunteers)
        frm.set_value('start_date', frm.doc.publish_date)
    }

});


function validate_date(frm, field, depends_on) {
    let field_date = frm.doc[field] ? new Date(frm.doc[field]) : null;
    let depends_date = depends_on && frm.doc[depends_on] ? new Date(frm.doc[depends_on]) : null;

    if (field === "start_date" && frm.doc.activity_published_date_starts) {
        return;
    }

    if (depends_date && field_date && field_date <= depends_date) {
        frappe.msgprint({
            title: __('Invalid Date'),
            message: __(`${frappe.meta.get_label(frm.doctype, field, frm.doc.name)} must be after ${frappe.meta.get_label(frm.doctype, depends_on, frm.doc.name)}.`),
            indicator: 'red'
        });
        frm.set_value(field, "");
    }
}

function update_total_vacancies(frm) {
    let vacancy = frm.doc.vacancy || 0;
    let buffer_vacancy = frm.doc.buffer_vacancy || 0;
    let total = vacancy + buffer_vacancy;

    frm.set_value('total_vacancies', total);
}