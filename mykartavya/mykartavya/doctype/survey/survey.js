// Copyright (c) 2025, Aniket Singh and contributors
// For license information, please see license.txt

frappe.ui.form.on("Survey", {
    refresh(frm) {
        let today = frappe.datetime.get_today();
        frm.set_df_property('deadline_date', 'min_date', today);
        const formatted_today = new Date(today);

        // Set datepicker minDate for deadline_date
        if (frm.fields_dict.deadline_date && frm.fields_dict.deadline_date.$input) {
            $(frm.fields_dict.deadline_date.$input).datepicker({
                minDate: formatted_today
            });
        }
    },

    before_save(frm) {
        // Ensure the survey is not submitted if it has no questions
        if (frm.doc.questions.length > 0) {
            frm.set_value("form_json", JSON.stringify(frm.doc.questions));
        }
        if (frm.doc.title) {
            frm.set_value("titlecopy", frm.doc.title);
            frm.save()
        }

    },
    
    setup: function (frm) {
        frm['dt_events'] = {
            "Survey": {
                formatter: {
                    group: function (value, column, row) {
                        if (value) {
                            value = `<a href="${frappe.utils.get_form_link('Survey', row.name)}" class="text-muted px-2" style="cursor: pointer;">${value}</a>`;
                        }
                        return value;
                    }
                },
            },
            "Volunteer Survey Log": {
                formatter: {
                    user: function (value, column, row) {
                        if (value) {
                            value = `<a href="${frappe.utils.get_form_link('Volunteer Survey Log', row.name)}" class="text-muted px-2" style="cursor: pointer;">${value}</a>`;
                        }
                        return value;
                    }
                }
            },
        };
    }
});
frappe.ui.form.on('Survey Form Builder', {
    fieldtype: function (frm, cdt, cdn) {
        const row = locals[cdt][cdn];
        if (['Select', 'Check'].includes(row.fieldtype) && !row.options) {
            frappe.msgprint(__('Options field is mandatory when fieldtype is Select or Check.'));
            frappe.model.set_value(cdt, cdn, 'options', '');  // Or show validation msg
        }
    },
    options: function (frm, cdt, cdn) {
        const row = locals[cdt][cdn];
        if (['Select', 'Check'].includes(row.fieldtype) && !row.options) {
            frappe.msgprint(__('Please enter options for fieldtype Select or Check.'));
        }
    }
});