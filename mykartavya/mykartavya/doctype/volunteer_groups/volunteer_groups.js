frappe.ui.form.on("Volunteer Groups", {
    refresh(frm) {
        frm.fields_dict.volunteers.grid.get_field("users").get_query = function (doc, cdt, cdn) {
            return {
                filters: {
                    role_profile: "Volunteer"
                }
            };
        };
    }
});