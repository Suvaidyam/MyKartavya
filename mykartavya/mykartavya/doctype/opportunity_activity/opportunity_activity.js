frappe.ui.form.on('Opportunity Activity', {
    refresh: function (frm) {
        // Set filter for parent field based on selected opportunity
        frm.set_query('parent1', function () {
            return {
                filters: {
                    'opportunity': frm.doc.opportunity
                }
            };
        });
    },

    opportunity: function (frm) {
        // Clear parent field when opportunity changes
        frm.set_value('parent1', '');

        // Set filter for parent field based on selected opportunity
        frm.set_query('parent1', function () {
            return {
                filters: {
                    'opportunity': frm.doc.opportunity
                }
            };
        });
    },

    validate: function (frm) {

        if (frm.image_uploaded) {
            frappe.validated = false;
            frm.image_uploaded = false;
        }

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

    activity_image: function (frm) {
        if (frm.doc.activity_image) {
            frm.image_uploaded = true;
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