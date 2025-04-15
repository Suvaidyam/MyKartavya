// Copyright (c) 2025, Aniket Singh and contributors
// For license information, please see license.txt

frappe.ui.form.on("Opportunity", {
    start_date: function(frm) {
        if (frm.doc.start_date) {
            frm.set_value('end_date', null);
            const minEndDate = frappe.datetime.add_days(frm.doc.start_date, 1);
    
            frm.fields_dict.end_date.datepicker.update({
                minDate: frappe.datetime.str_to_obj(minEndDate)
            });
        }
    },
    is_private: function(frm) {
        if (!frm.doc.is_private) {
            frm.set_value('company', null);
        }
        else {
            frm.set_value('is_global', 0);
        }
    },
    
    is_global: function(frm) {
        if (frm.doc.is_private) {
            frm.set_value('is_private', 0);
        }
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

	refresh(frm) {
        let today = frappe.datetime.get_today();
        frm.set_df_property('start_date', 'min_date', today);
        formatted_today = new Date(today);
        $(frm.fields_dict['start_date'].$input).datepicker({
            minDate: formatted_today
        });


        if (frm.doc.start_date) {
            const minEndDate = frappe.datetime.add_days(frm.doc.start_date, 1);
    
            frm.fields_dict.end_date.datepicker.update({
                minDate: frappe.datetime.str_to_obj(minEndDate)
            });
        }
        
	},
});
