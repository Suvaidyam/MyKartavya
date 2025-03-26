import frappe

class Filters:
    def sdg_data():
        where_clause = ""
        company = frappe.db.get_value("SVA User", {"email": frappe.session.user}, "custom_company")
        companies = frappe.db.get_list("User Permission", filters={"user": frappe.session.user, "allow": "Company"}, pluck="for_value",limit=100,ignore_permissions=True)
        if company and len(companies) > 0:
            where_clause += f" AND (act.company IS NULL OR act.company IN ('','{company}',{', '.join(frappe.db.escape(c) for c in companies)}))"
        elif len(companies) > 0:
            where_clause += f" AND (act.company IS NULL OR act.company IN ('',{', '.join(frappe.db.escape(c) for c in companies)}))"
        elif company:
            where_clause += f" AND (act.company IS NULL OR act.company = '{company}')"
        else:
            where_clause += " AND (act.company IS NULL OR act.company = '')"
        sql = f"""
          SELECT 
            sdg.name,
            sdg.sdg_image
            FROM `tabActivity` AS act 
            LEFT JOIN `tabSDGs Child` AS sd ON act.name = sd.parent
            LEFT JOIN `tabSDG` AS sdg ON sdg.name = sd.sdgs
            WHERE act.status = 'Published' {where_clause}
            GROUP BY sdg.name;

            """
        sdg = frappe.db.sql(sql, as_dict=1)
        sql = f"""
            SELECT 
                act.activity_type as name
            FROM `tabActivity` as act 
            WHERE 1=1 {where_clause}
            GROUP BY act.activity_type
            """
        act_type = frappe.db.sql(sql, as_dict=1)
        return {
            "sdg": sdg,
            "act_type": act_type
        }
    