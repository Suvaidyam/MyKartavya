// Copyright (c) 2025, Aniket Singh and contributors
// For license information, please see license.txt
frappe.ui.form.on("Company", {
    refresh(frm){
        if(frm.doc.copy_contact_details){
            frm.set_value("volunteering_incharge_name",frm.doc.first_name)
            frm.set_value("volunteering_incharge_email",frm.doc.email)
            frm.set_value("volunteering_incharge_phone",frm.doc.phone)
        }
    }, 
    copy_contact_details:function(frm){
        if(frm.doc.copy_contact_details){
            frm.set_value("volunteering_incharge_name",frm.doc.first_name)
            frm.set_value("volunteering_incharge_email",frm.doc.email)
            frm.set_value("volunteering_incharge_phone",frm.doc.phone)
            frappe.show_alert({
                message: 'Contact Information copied successfully!',
                indicator: 'green'
            });
        }else{
            frm.set_value("volunteering_incharge_name",' ')
            frm.set_value("volunteering_incharge_email",' ')
            frm.set_value("volunteering_incharge_phone",'')
        }
    },

    setup: function (frm) {
        frm['dt_events'] = {
            "SVA User": {
                "after_render": (dt, mode) => {
                    let form_dialog = dt.form_dialog;
                    form_dialog.set_value("custom_volunteer_type", "Employee");
                }
            }
        }
    },
    company_registration_date: function (frm) {
        let registration_date = frm.doc.company_registration_date;
        let today = frappe.datetime.get_today();

        if (registration_date > today) {
            frappe.msgprint(__('Company Registration Date cannot be a future date.'));
            frm.set_value('company_registration_date', '');
        }
    },
    validate: function (frm) {
        if (frm.image_uploaded) {
            frappe.validated = false;
            frm.image_uploaded = false;
        }
    },

    company_logo: function (frm) {
        if (frm.doc.company_logo) {
            frm.image_uploaded = true;
        }
    },

    phone(frm){
        const raw=frm.doc.phone
        if (raw) {
            const digits = raw.replace(/\D/g, '');
            if (digits.length > 12) {
                frappe.show_alert({
                    message: `Phone" ${raw}" should not exceed 10 digits.`,
                    indicator: 'red'
                });
            }
        }
    },
    
    volunteering_incharge_phone(frm){
        const raw=frm.doc.volunteering_incharge_phone
        if (raw) {
            const digits = raw.replace(/\D/g, '');
            if (digits.length > 12) {
                frappe.show_alert({
                    message: `Volunteering Incharge phone"${raw}" should not exceed 10 digits.`,
                    indicator: 'red'
                });
            }
        }
    }
});
