// Copyright (c) 2025, Aniket Singh and contributors
// For license information, please see license.txt

frappe.ui.form.on("NGOs", {
    setup: function (frm) {
        frm['dt_events'] = {
            "SVA User": {
                "after_render": (dt, mode) => {
                    let form_dialog = dt.form_dialog;
                    form_dialog.set_value("custom_volunteer_type", "NGO Member");
                }
            }
        }
    },
    validate: function (frm) {
        if (frm.image_uploaded) {
            frappe.validated = false;
            frm.image_uploaded = false;
        }
    },

    ngo_logo: function (frm) {
        if (frm.doc.ngo_logo) {
            frm.image_uploaded = true;
        }
    },
    refresh(frm) {
        if (frm.timeline && frm.timeline.wrapper) {
            frm.timeline.wrapper.hide();
        }
        $('.layout-side-section').hide();
        set_filters(frm);
    },

    official_contact_number(frm) {
        const raw = frm.doc.official_contact_number;
        if (raw) {
            // Sirf digits nikaalein
            const digits = raw.replace(/\D/g, '');
            if (digits.length > 12) {
                frappe.show_alert({
                    message: `Official Contact Number "${raw}" should not exceed 10 digits.`,
                    indicator: 'red'
                });
            }
        }
    },
    ngo_head_office_number(frm) {
        const raw = frm.doc.ngo_head_office_number;
        if (raw) {
            // Sirf digits nikaalein
            const digits = raw.replace(/\D/g, '');
            if (digits.length > 12) {
                frappe.show_alert({
                    message: `NGO Head Office Number "${raw}" should not exceed 10 digits.`,
                    indicator: 'red'
                });
            }
        }

    },
    ngo_head_mobile(frm) {
        const raw = frm.doc.ngo_head_mobile;
        if (raw) {
            const digits = raw.replace(/\D/g, '');
            if (digits.length > 10) {
                frappe.show_alert({
                    message: `Mobile number "${raw}" should not exceed 10 digits.`,
                    indicator: 'red'
                });
            }
        }

    },

    first_priority_goal(frm) {
        frm.set_value("second_priority_goal", null);
        frm.set_value("third_priority_goal", null);
        set_filters(frm);
    },

    second_priority_goal(frm) {
        frm.set_value("third_priority_goal", null);
        set_filters(frm);
    }
});

function set_filters(frm) {
    frm.set_query("second_priority_goal", () => ({
        filters: [["name", "!=", frm.doc.first_priority_goal]]
    }));

    frm.set_query("third_priority_goal", () => ({
        filters: [["name", "not in", [frm.doc.first_priority_goal, frm.doc.second_priority_goal]]]
    }));
}


