// Copyright (c) 2025, Aniket Singh and contributors
// For license information, please see license.txt

frappe.ui.form.on("Activity", {
    refresh(frm) {
        let today = new Date(frappe.datetime.get_today());
        console.log(today);
        $(frm.fields_dict['publish_date'].$input).datepicker({
            minDate: today
        });
        let application_deadline = new Date(frm.doc.application_deadline);
        console.log(application_deadline);
        $(frm.fields_dict['start_date'].$input).datepicker({
            minDate: application_deadline
        });
        $(frm.fields_dict['end_date'].$input).datepicker({
            minDate: new Date(frm.doc.start_date)
        });
        $(frm.fields_dict['application_deadline'].$input).datepicker({
            minDate: new Date(frm.doc.publish_date)
        });
        $(frm.fields_dict['reporting_deadline'].$input).datepicker({
            minDate: new Date(frm.doc.end_date)
        });
    },

});

