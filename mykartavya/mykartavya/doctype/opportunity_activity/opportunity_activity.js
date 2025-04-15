frappe.ui.form.on('Opportunity Activity', {
    refresh: function (frm) {
        // Any refresh logic here
    },

    validate: function (frm) {
        // Validate end date is after or equal to start date
        if (frm.doc.start_date && frm.doc.end_date) {
            if (frm.doc.end_date < frm.doc.start_date) {
                frappe.msgprint(__('End Date cannot be before Start Date'));
                frappe.validated = false;
            }
        }

        // Validate total duration is not negative
        if (frm.doc.total_hour < 0) {
            frappe.msgprint(__('Total Hours cannot be negative'));
            frappe.validated = false;
        }

        if (frm.doc.total_minutes < 0) {
            frappe.msgprint(__('Total Minutes cannot be negative'));
            frappe.validated = false;
        }

        // Validate minutes are between 0 and 59
        if (frm.doc.total_minutes > 59) {
            frappe.msgprint(__('Total Minutes should be less than 60. Please adjust Hours and Minutes accordingly.'));
            frappe.validated = false;
        }

        // Validate that there is some duration if both dates are the same
        if (frm.doc.start_date && frm.doc.end_date &&
            frm.doc.start_date === frm.doc.end_date &&
            frm.doc.total_hour === 0 && frm.doc.total_minutes === 0) {
            frappe.msgprint(__('Please specify a duration for the activity'));
            frappe.validated = false;
        }
    },

    start_date: function (frm) {
        // Auto-set end date to start date if empty
        if (!frm.doc.end_date) {
            frm.set_value('end_date', frm.doc.start_date);
        }
        // Else validate end date is after start date
        else if (frm.doc.end_date < frm.doc.start_date) {
            frappe.msgprint(__('End Date cannot be before Start Date'));
            frm.set_value('end_date', frm.doc.start_date);
        }
    },

    end_date: function (frm) {
        // Validate end date is after start date
        if (frm.doc.start_date && frm.doc.end_date < frm.doc.start_date) {
            frappe.msgprint(__('End Date cannot be before Start Date'));
            frm.set_value('end_date', frm.doc.start_date);
        }
    },


    total_minutes: function (frm) {
        // Convert minutes > 59 to hours
        if (frm.doc.total_minutes > 59) {
            const additional_hours = Math.floor(frm.doc.total_minutes / 60);
            const remaining_minutes = frm.doc.total_minutes % 60;

            frm.set_value('total_hour', (frm.doc.total_hour || 0) + additional_hours);
            frm.set_value('total_minutes', remaining_minutes);
        }
    }
});