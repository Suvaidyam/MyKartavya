frappe.ui.form.on('Volunteer Company Mapper', {
    refresh: function (frm) {
        // Hide all fields except email initially
        if (!frm.doc.is_email_verified) {
            frm.toggle_display('section_break_details', false);
        } else {
            frm.toggle_display('section_break_details', true);
        }
    },

    onload: function (frm) {
        // Set initial visibility on load
        if (!frm.doc.is_email_verified) {
            frm.toggle_display('section_break_details', false);
        }
    },

    before_save: function (frm) {
        // Prevent saving if email is not verified
        if (!frm.doc.is_email_verified) {
            frappe.throw(__('Please verify your email before saving'));
            return false;
        }
    },

    volunteer_email: function (frm) {
        if (frm.doc.volunteer_email) {
            if (!frappe.utils.validate_email(frm.doc.volunteer_email)) {
                frappe.msgprint(__('Please enter a valid email address'));
                frm.doc.volunteer_email = '';
                frm.refresh_field('volunteer_email');
            }
        }
    }
});
