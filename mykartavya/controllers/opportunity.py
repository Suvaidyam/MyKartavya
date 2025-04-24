import frappe

class Opportunity:

    def get_opportunity_activity(opportunity):
        try:
            return frappe.db.sql("""
                SELECT  
                    opac.name,         
                    opac.activity_name,
                    opac.types,
                    opac.activity_image,
                    opac.start_date,
                    opac.end_date,
                    opac.hours,
                    opac.description as activity_description
                FROM `tabOpportunity Activity` opac
                WHERE opac.opportunity = %s
            """, (opportunity,), as_dict=True)
        except Exception as e:
            frappe.log_error(frappe.get_traceback(), "Error in get_opportunity_activity")
            return []

    
    def opportunity_activity_details(name):
        if not name:
            frappe.log_error("Opportunity name is required", "opportunity_activity_details")
            return None
            
        try:
            activity = frappe.get_doc("Opportunity Activity", name)
            return {
                "title": activity.activity_name,
                "types": activity.types,
                "activity_image": activity.activity_image,
                "start_date": activity.start_date,
                "end_date": activity.end_date,
                "hours": activity.hours,
                "total_minutes": activity.total_minutes,
                "activity_description": activity.description
            }
        
        except frappe.DoesNotExistError:
            frappe.log_error(f"Opportunity Activity not found for opportunity {name}", "opportunity_activity_details")
            return None
        except Exception as e:
            frappe.log_error(
                f"Unexpected error fetching activity for opportunity {name}: {str(e)}",
                "opportunity_activity_details"
            )
            return None

    def related_opportunities(filter={}):
        try:
            if isinstance(filter, str):
                filter = frappe.parse_json(filter)

            # Initialize clauses
            where_clauses = ["1=1"]
            order_by_clause = ""
            # Initialize clauses
            where_clauses = [
                """EXISTS (
                    SELECT 1 FROM `tabOpportunity Activity` as oact
                    WHERE oact.opportunity = opp.name
                )"""
            ]
            if filter:
                if "types" in filter and filter["types"]:
                    types_list = [f"'{at}'" for at in filter["types"]]
                    where_clauses.append(f"opp.opportunity_type IN ({', '.join(types_list)})")

                if "karma_points" in filter and filter["karma_points"]:
                    if filter["karma_points"] == "Low to High":
                        order_by_clause = " ORDER BY opp.karma_points ASC"
                    elif filter["karma_points"] == "High to Low":
                        order_by_clause = " ORDER BY opp.karma_points DESC"

                if "sdgs" in filter and filter["sdgs"]:
                    sdgs_values = ", ".join(f"'{sdg}'" for sdg in filter["sdgs"])
                    where_clauses.append(f"""
                        EXISTS (
                            SELECT 1 FROM `tabSDGs Child` AS sub_sd
                            WHERE sub_sd.parent = opp.name
                            AND sub_sd.sdgs IN ({sdgs_values})
                        )
                    """)

                if "volunteering_hours" in filter and filter["volunteering_hours"]:
                    if filter["volunteering_hours"] == "Low to High":
                        order_by_clause = " ORDER BY opp.hours ASC"
                    elif filter["volunteering_hours"] == "High to Low":
                        order_by_clause = " ORDER BY opp.hours DESC"

            where_clause = "WHERE " + " AND ".join(where_clauses)

            sql_query = f"""
                SELECT 
                    opp.name as name,
                    opp.opportunity_name as activity_name,
                    opp.karma_points as karma_points,
                    opp.opportunity_type as types,
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
                {where_clause}
                GROUP BY opp.name
                {order_by_clause}
            """
            data = frappe.db.sql(sql_query, as_dict=True)
            return data

        except Exception as e:
            frappe.log_error("related_opportunities Error", frappe.get_traceback())
            return None

    def get_activity_opportunity(name=""):
            try:
                
                where_clauses = [f"act.name = {frappe.db.escape(name)}"]
                order_by_clause = ""

                where_clause = "WHERE " + " AND ".join(where_clauses)
                sql_query = f"""

                    SELECT
                    opp.name as name,
                            opp.opportunity_name as activity_name,
                            opp.karma_points as karma_points,
                            opp.opportunity_type as types,
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
                    FROM `tabActivity` AS act
                    LEFT JOIN `tabOpportunity` AS opp
                        ON act.opportunity = opp.name
                    LEFT JOIN `tabSDGs Child` AS sd ON opp.name = sd.parent
                    LEFT JOIN `tabSDG` AS sdg ON sdg.name = sd.sdgs
                        {where_clause}
                        GROUP BY opp.name
                        {order_by_clause}
                """
                data = frappe.db.sql(sql_query, as_dict=True)
                return data

            except Exception as e:
                frappe.log_error("related_opportunities Error", frappe.get_traceback())
                return None