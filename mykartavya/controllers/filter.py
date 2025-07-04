import frappe

class Filters:
    @staticmethod
    def sdg_data():
        where_clause = ""
        company = frappe.db.get_value(
            "SVA User", {"email": frappe.session.user}, "custom_company"
        )
        companies = frappe.db.get_list(
            "User Permission",
            filters={"user": frappe.session.user, "allow": "Company"},
            pluck="for_value",
            limit=100,
            ignore_permissions=True,
        )

        if company and companies:
            where_clause += f" AND (act.company IS NULL OR act.company IN ('','{company}',{', '.join(frappe.db.escape(c) for c in companies)}))"
        elif companies:
            where_clause += f" AND (act.company IS NULL OR act.company IN ('',{', '.join(frappe.db.escape(c) for c in companies)}))"
        elif company:
            where_clause += f" AND (act.company IS NULL OR act.company = '{company}')"
        else:
            where_clause += " AND (act.company IS NULL OR act.company = '')"

        # SDGs from Activity
        activity_sdgs = frappe.db.sql(
            f"""
            SELECT DISTINCT sdg.name, sdg.sdg_image
            FROM `tabActivity` AS act 
            LEFT JOIN `tabSDGs Child` AS sd ON act.name = sd.parent
            LEFT JOIN `tabSDG` AS sdg ON sdg.name = sd.sdgs
            WHERE act.activity_status IN ('Published', 'Ongoing') {where_clause}
        """,
            as_dict=1,
        )

        # SDGs from Opportunity
        opportunity_sdgs = frappe.db.sql(
            """
            SELECT DISTINCT sdg.name, sdg.sdg_image
            FROM `tabOpportunity` AS opp 
            LEFT JOIN `tabSDGs Child` AS sd ON opp.name = sd.parent
            LEFT JOIN `tabSDG` AS sdg ON sdg.name = sd.sdgs
            WHERE opp.opportunity_status IN ('Published', 'Ongoing')
        """,
            as_dict=1,
        )

        # Combine and deduplicate SDGs
        sdgs_dict = {sdg["name"]: sdg for sdg in activity_sdgs + opportunity_sdgs}
        combined_sdgs = list(sdgs_dict.values())

        # Activity Types
        activity_types = frappe.db.sql(
            f"""
            SELECT DISTINCT act.activity_type AS name
            FROM `tabActivity` AS act 
            WHERE act.activity_status IN ('Published', 'Ongoing') {where_clause}
        """,
            as_dict=1,
        )

        # Opportunity Types
        opportunity_types = frappe.db.sql(
            """
            SELECT DISTINCT opp.opportunity_type AS name
            FROM `tabOpportunity` AS opp 
            WHERE opp.opportunity_status IN ('Published', 'Ongoing')
        """,
            as_dict=1,
        )

        # Combine and deduplicate types
        all_types = {t["name"]: t for t in activity_types + opportunity_types}
        combined_types = list(all_types.values())

        return {"sdgs": combined_sdgs, "types": combined_types}
