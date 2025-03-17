frappe.ui.form.on("Activity", {
    skill: function (frm) {
        if (frm.doc.value_type === "Skills") {
            if (!frm.doc.skill || frm.doc.skill.length === 0) {
                // Show an error message and prevent saving
                frappe.msgprint(__('Please select at least one skill.'));
                frappe.validated = false; // This prevents the form from saving
                return;
            }
    
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
    }
    
,    
    value_type: function (frm) {
    if (frm.doc.value_type === "General") {
        frm.set_value("work_value_rupees", "");
        frm.set_value("skill", []);
    }
    },
    validate: function (frm) {
        if (frm.doc.max_hours < frm.doc.hours && frm.doc.contribution_type !== 'Fixed') {
            frappe.throw(__("Max Hours must be greater than or equal to Hours"));
        }

        // Validate max hours for fixed contribution type
        if (frm.doc.contribution_type === "Fixed") {
            frm.set_value("max_hours", frm.doc.hours);
            frm.refresh_field("max_hours");
        }
    },

    refresh(frm) {
        // let today = new Date(frappe.datetime.get_today());
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
