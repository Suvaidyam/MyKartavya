// Copyright (c) 2025, Aniket Singh and contributors
// For license information, please see license.txt

frappe.ui.form.on("NGOs", {
    refresh(frm) {
        set_filters(frm);
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


