frappe.ui.form.on("Activity", {
    refresh(frm) {
            

        // let today = new Date(frappe.datetime.get_today());
        let fields = [
            { name: "publish_date", min: today },
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
    }
});

function validate_date(frm, field, depends_on) {
    let field_date = frm.doc[field] ? new Date(frm.doc[field]) : null;
    let depends_date = depends_on && frm.doc[depends_on] ? new Date(frm.doc[depends_on]) : null;

    if (depends_date && field_date && field_date < depends_date) {
        frappe.msgprint({
            title: __('Invalid Date'),
            message: __(`${frappe.meta.get_label(frm.doctype, field, frm.doc.name)} must be after ${frappe.meta.get_label(frm.doctype, depends_on, frm.doc.name)}.`),
            indicator: 'red'
        });
        frm.set_value(field, "");
    }
}
