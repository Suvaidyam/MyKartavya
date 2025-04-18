import frappe
import json

class Opportunity:

    def get_opportunity_activity(opportunity):
        try:
            # Fetch the activity associated with the opportunity
            activity = frappe.get_list("Opportunity Activity", filters={"opportunity": opportunity}, fields=["activity_name","opportunity_type as activity_type","activity_image","start_date","end_date","total_hour","total_minutes"])

            if not activity:
                return {"error": "No activity found for the given opportunity."}
            return activity
        except frappe.DoesNotExist as e:
            frappe.log_error(f"Error fetching activity for opportunity {opportunity}: {str(e)}")
            return None
        except Exception as e:
            frappe.log_error(f"Unexpected error fetching activity for opportunity {opportunity}: {str(e)}")
            return None
        
    def opportunity_activity_details(name):
        try:
            # Fetch the activity associated with the opportunity
            activity = frappe.get_list("Opportunity Activity",{"opportunity": name},["activity_name as title","opportunity_type as activity_type","activity_image","start_date","end_date","total_hour as hours","total_minutes","description"])
            return activity
        except Exception as e:
            frappe.log_error(f"Unexpected error fetching activity for opportunity {name}: {str(e)}")
            return None
        
    def related_opportunities(name="", sdgs=""):
        try:
            sdgs_list = json.loads(sdgs) if sdgs else []
            sdg_names = [frappe.db.escape(sdg["sdgs_name"]) for sdg in sdgs_list]

            sdg_filter = ""
            if sdg_names:
                sdg_str = ", ".join(sdg_names)
                sdg_filter = f"AND sdg.sdg IN ({sdg_str})"

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
                                ELSE NULL
                            END
                        ), JSON_ARRAY()
                    ) AS sdgs
                FROM `tabOpportunity` AS opp
                LEFT JOIN `tabSDGs Child` AS sd ON opp.name = sd.parent
                LEFT JOIN `tabSDG` AS sdg ON sdg.name = sd.sdgs
                WHERE opp.end_date >= CURRENT_DATE()
                AND opp.name <> {frappe.db.escape(name)}
                {sdg_filter}
                GROUP BY opp.name
            """

            data = frappe.db.sql(sql_query, as_dict=True)
            return data

        except Exception as e:
            frappe.log_error(f"Unexpected error fetching related opportunities: {str(e)}")
            return None
