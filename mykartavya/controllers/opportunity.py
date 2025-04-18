import frappe
import json

class Opportunity:

    def get_opportunity_activity(opportunity, filter={}):
        where_clause = ""
        order_by_clause = ""

        company = frappe.db.get_value("SVA User", {"email": frappe.session.user}, "custom_company")
        companies = frappe.db.get_list(
            "User Permission",
            filters={"user": frappe.session.user, "allow": "Company"},
            pluck="for_value",
            limit=100,
            ignore_permissions=True
        )

        if company and companies:
            escaped_companies = ", ".join(frappe.db.escape(c) for c in companies)
            where_clause += f" AND (act.company IS NULL OR act.company IN ('', {frappe.db.escape(company)}, {escaped_companies}))"
        elif companies:
            escaped_companies = ", ".join(frappe.db.escape(c) for c in companies)
            where_clause += f" AND (act.company IS NULL OR act.company IN ('', {escaped_companies}))"
        elif company:
            where_clause += f" AND (act.company IS NULL OR act.company = {frappe.db.escape(company)})"
        else:
            where_clause += " AND (act.company IS NULL OR act.company = '')"

        # Parse filter if it's a string
        if isinstance(filter, str):
            filter = frappe.parse_json(filter)

        # Apply Opportunity filter (assuming field name is `opportunity`)
        if opportunity:
            where_clause += f" AND act.opportunity = {frappe.db.escape(opportunity)}"

        # Other filters
        if filter:
            if "activity_type" in filter and filter["activity_type"]:
                activity_types = ", ".join(frappe.db.escape(at) for at in filter["activity_type"])
                where_clause += f" AND act.activity_type IN ({activity_types})"

            if "karma_points" in filter and filter["karma_points"]:
                if filter["karma_points"] == "Low to High":
                    order_by_clause = " ORDER BY act.karma_points ASC"
                elif filter["karma_points"] == "High to Low":
                    order_by_clause = " ORDER BY act.karma_points DESC"

            if "sdgs" in filter and filter["sdgs"]:
                sdgs_values = ", ".join(frappe.db.escape(sdg) for sdg in filter["sdgs"])
                where_clause += f"""
                    AND EXISTS (
                        SELECT 1 FROM `tabSDGs Child` AS sub_sd
                        WHERE sub_sd.parent = act.name
                        AND sub_sd.sdgs IN ({sdgs_values})
                    )
                """

            if "volunteering_hours" in filter and filter["volunteering_hours"]:
                if filter["volunteering_hours"] == "Low to High":
                    order_by_clause = " ORDER BY act.hours ASC"
                elif filter["volunteering_hours"] == "High to Low":
                    order_by_clause = " ORDER BY act.hours DESC"

        sql_query = f"""
            SELECT 
                act.name as activity,
                act.title as activity_name,
                act.karma_points as karma_points,
                act.start_date as start_date,
                act.end_date as end_date,
                act.hours as hours,
                act.activity_description as activity_description,
                act.activity_type as activity_type,
                act.activity_image as activity_image,
                COALESCE(
                    JSON_ARRAYAGG(
                        DISTINCT CASE 
                            WHEN sdg.sdg IS NOT NULL 
                            THEN JSON_OBJECT(
                                'sdgs_name', sdg.sdg,
                                'image', sdg.sdg_image
                            )
                            ELSE NULL
                        END
                    ), JSON_ARRAY()
                ) AS sdgs
            FROM `tabActivity` as act
            LEFT JOIN `tabSDGs Child` AS sd ON act.name = sd.parent
            LEFT JOIN `tabSDG` AS sdg ON sdg.name = sd.sdgs
            WHERE act.end_date >= CURRENT_DATE()
            AND act.status IN ('Published', 'Ongoing')
            AND act.docstatus = 1
            {where_clause}
            GROUP BY act.name
            {order_by_clause}
        """

        try:
            return frappe.db.sql(sql_query, as_dict=True)
        except Exception as e:
            frappe.log_error(f"Query Error: {e}\n\nQuery:\n{sql_query}", "get_opportunity_activity")
            raise
        
        
        
    def related_opportunities(name="", sdgs="", filter={}):
        try:
            sdgs_list = json.loads(sdgs) if sdgs else []
            sdg_names = [frappe.db.escape(sdg["sdgs_name"]) for sdg in sdgs_list]

            where_clauses = ["opp.end_date >= CURRENT_DATE()"]
            where_clauses.append(f"opp.name <> {frappe.db.escape(name)}")

            if sdg_names:
                sdg_str = ", ".join(sdg_names)
                where_clauses.append(f"sdg.sdg IN ({sdg_str})")

            order_by_clause = ""

            if filter:
                if "activity_type" in filter and filter["activity_type"]:
                    activity_types = ", ".join(frappe.db.escape(at) for at in filter["activity_type"])
                    where_clauses.append(f"opp.opportunity_type IN ({activity_types})")

                if "sdgs" in filter and filter["sdgs"]:
                    sdgs_values = ", ".join(frappe.db.escape(sdg) for sdg in filter["sdgs"])
                    where_clauses.append(f"""
                        EXISTS (
                            SELECT 1 FROM `tabSDGs Child` AS sub_sd
                            WHERE sub_sd.parent = opp.name
                            AND sub_sd.sdgs IN ({sdgs_values})
                        )
                    """)

                if "karma_points" in filter and filter["karma_points"]:
                    if filter["karma_points"] == "Low to High":
                        order_by_clause = "ORDER BY opp.karma_points ASC"
                    elif filter["karma_points"] == "High to Low":
                        order_by_clause = "ORDER BY opp.karma_points DESC"

                if "volunteering_hours" in filter and filter["volunteering_hours"]:
                    if filter["volunteering_hours"] == "Low to High":
                        order_by_clause = "ORDER BY opp.hours ASC"
                    elif filter["volunteering_hours"] == "High to Low":
                        order_by_clause = "ORDER BY opp.hours DESC"

            # Combine WHERE conditions
            full_where = "WHERE " + " AND ".join(where_clauses)

            sql_query = f"""
                SELECT 
                    opp.name as name,
                    opp.opportunity_name as activity_name,
                    opp.karma_points as karma_points,
                    opp.opportunity_type as activity_type,
                    opp.start_date as start_date,
                    opp.end_date as end_date,
                    opp.hours as hours,
                    opp.opportunity_description as activity_description,
                    opp.opportunity_image as activity_image,
                    COALESCE(
                        JSON_ARRAYAGG(
                            DISTINCT CASE 
                                WHEN sdg.sdg IS NOT NULL 
                                THEN JSON_OBJECT(
                                    'sdgs_name', sdg.sdg,
                                    'image', sdg.sdg_image
                                )
                            END
                        ), JSON_ARRAY()
                    ) AS sdgs
                FROM `tabOpportunity` AS opp
                LEFT JOIN `tabSDGs Child` AS sd ON opp.name = sd.parent
                LEFT JOIN `tabSDG` AS sdg ON sdg.name = sd.sdgs
                {full_where}
                GROUP BY opp.name
                {order_by_clause}
            """

            data = frappe.db.sql(sql_query, as_dict=True)
            return data

        except Exception as e:
            frappe.log_error(f"Unexpected error fetching related opportunities: {str(e)}")
            return None

