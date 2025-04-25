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
        user = frappe.db.get_value("SVA User", {"email": frappe.session.user}, "name")
        exists = frappe.db.exists(
            "Volunteer Opportunity Activity Log", {"volunteer": user, "opportunity_activity": name}
        )
        where_clause = ""

        volunteer_condition = (
            f"AND voal.volunteer = '{user}'" if exists else "AND voal.volunteer IS NULL"
        )

        sql_query = f"""
            SELECT
                voal.name as name,
                oa.name as activity,
                voal.duration as donet_hours,
                voal.com_percent as com_percent,
                oa.activity_name as title,
                oa.start_date as start_date,
                oa.end_date as end_date,
                oa.hours as hours,
                oa.total_minutes as total_minutes,
                oa.description as activity_description,
                oa.types as types,
                oa.activity_image as activity_image

            FROM
                `tabOpportunity Activity` AS oa
            LEFT JOIN `tabVolunteer Opportunity Activity Log` AS voal ON voal.opportunity_activity = oa.name
            {volunteer_condition}
            WHERE oa.name = '{name}'
            {where_clause}
            """
        data = frappe.db.sql(sql_query, as_dict=True)
        doc = data[0] if data else data

        if exists:
            doc["is_assigned"] = True
        else:
            doc["is_assigned"] = False
        return doc

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
                    vo.workflow_state as workflow_state,
                    vo.completion_wf_state as completion_wf_state,
                    vo.rating as rating,
                    vo.remarks as remarks,
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
                LEFT JOIN `tabVolunteer Opportunity` AS vo ON vo.activity = opp.name
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
            
    def act_now_opp(activity, volunteer):
        workflow_state = frappe.db.get_value(
            "SVA User", {"email": volunteer}, "workflow_state"
        )
        volunteer = frappe.db.get_value("SVA User", {"email": volunteer}, "name")
        if workflow_state != "Approved":
            return {"msg": "Volunteer is not approved", "status": 201}

        act = frappe.get_list(
            "Volunteer Opportunity",
            filters={"activity": activity, "volunteer": volunteer},
            pluck="name",
        )
        if act:
            return {"msg": "Activity already assigned to the volunteer", "status": 400}

        # Assign activity to the volunteer
        doc = frappe.new_doc("Volunteer Opportunity")
        doc.activity = activity
        doc.volunteer = volunteer
        doc.flags.ignore_permissions = True
        doc.flags.ignore_mandatory = True
        doc.save()

        return {"msg": "Activity assigned to the volunteer", "status": 200, "data": doc}


    def public_opportunities(name=None):
        try:
        
            where_clauses = [
                """EXISTS (
                    SELECT 1 FROM `tabOpportunity Activity` AS oact
                    WHERE oact.opportunity = opp.name
                )"""
            ]
            where_clause = "WHERE " + " AND ".join(where_clauses)
            sql_query = f"""
                SELECT 
                    opp.name AS name,
                    opp.opportunity_name AS opportunity,
                    opp.karma_points AS karma_points,
                    opp.opportunity_type AS types,
                    opp.start_date AS start_date,
                    opp.end_date AS end_date,
                    opp.hours AS hours,
                    opp.opportunity_description AS activity_description,
                    opp.opportunity_image AS activity_image,

                    COALESCE(
                        JSON_ARRAYAGG(
                            DISTINCT CASE 
                                WHEN sdg.sdg IS NOT NULL THEN JSON_OBJECT(
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
            """
            data = frappe.db.sql(sql_query, as_dict=True)
            return data

        except Exception as e:
            frappe.log_error("related_opportunities Error", frappe.get_traceback())
            return None
    