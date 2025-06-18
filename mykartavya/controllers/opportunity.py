import frappe
from frappe.utils.pdf import get_pdf

class Opportunity:

    # Function to get opportunity details
    def get_opportunity_activity(opportunity):
        try:
            user = frappe.db.get_value("SVA User", {"email": frappe.session.user}, "name")
            query = f"""
                SELECT  
                    opac.name,         
                    opac.activity_name,
                    opac.types,
                    opac.activity_image,
                    opac.start_date,
                    opac.end_date,
                    opac.hours,
                    opac.parent1,
                    opac.description AS activity_description,
                    self_voal.duration AS donet_hours,
                    self_voal.com_percent,
                    self_voal.completion_wf_state,
                    CASE
                        WHEN opac.parent1 IS NULL OR opac.parent1 = '' THEN FALSE
                        WHEN parent_voal.com_percent = 100 THEN FALSE
                        ELSE TRUE
                    END AS is_locked
                FROM `tabOpportunity Activity` opac
                LEFT JOIN `tabVolunteer Opportunity Activity Log` AS self_voal 
                    ON (opac.name = self_voal.opportunity_activity AND self_voal.volunteer = '{user}')
                LEFT JOIN `tabVolunteer Opportunity Activity Log` AS parent_voal 
                    ON (opac.parent1 = parent_voal.opportunity_activity AND parent_voal.volunteer = '{user}')
                WHERE opac.opportunity = '{opportunity}'
                GROUP BY opac.name
                ORDER BY opac.creation ASC
            """
            print(query,'query')
            return frappe.db.sql(query, as_dict=True) 
        except Exception as e:
                frappe.log_error(frappe.get_traceback(), "Error in get_opportunity_activity")
                return []

    # Function to get opportunity activity details
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
            LEFT JOIN `tabOpportunity` AS opp ON oa.opportunity = opp.name
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

    # Function to get related opportunities
    def related_opportunities(filter={}):
        try:
            if isinstance(filter, str):
                filter = frappe.parse_json(filter)
            user = frappe.db.get_value("SVA User", {"email": frappe.session.user}, "name")
            
            # Initialize clauses
            where_clauses = [
                """EXISTS (
                    SELECT 1 FROM `tabOpportunity Activity` as oact
                    WHERE oact.opportunity = opp.name
                )"""
            ]
            order_by_clause = ""
            
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

            # Build the main WHERE clause
            main_where_conditions = [
                "opp.end_date >= CURRENT_DATE()",
                "opp.opportunity_status IN ('Published', 'Ongoing')",
                "opp.workflow_state = 'Approved' ",
            ]
            
            # Combine all conditions
            all_conditions = main_where_conditions + where_clauses
            combined_where_clause = " AND ".join(all_conditions)
            
            sql_query = f"""
                SELECT 
                    opp.name as name,
                    opp.opportunity_name as activity_name,
                    opp.karma_points as karma_points,
                    opp.opportunity_type as types,
                    opp.start_date as start_date,
                    opp.end_date as end_date,
                    opp.min_volunteering_time as hours,
                    opp.opportunity_description as activity_description,
                    opp.opportunity_image as activity_image,
                    opp.need_certificate as need_certificate,
                    vo.com_percent,
                    vo.duration as donet_hours,
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
                    ) AS sdgs,
                    COALESCE(
                        JSON_ARRAYAGG(
                            DISTINCT JSON_OBJECT(
                                'name', sva.name,
                                'full_name', sva.full_name,
                                'email', sva.email,
                                'user_image', sva.user_image
                            )
                        ), JSON_ARRAY()
                    ) as volunteers
                FROM `tabOpportunity` AS opp
                LEFT JOIN `tabVolunteer Opportunity` AS vo ON (vo.activity = opp.name AND vo.volunteer = '{user}')
                LEFT JOIN `tabSVA User` as sva ON sva.name = vo.volunteer
                LEFT JOIN `tabSDGs Child` AS sd ON opp.name = sd.parent
                LEFT JOIN `tabSDG` AS sdg ON sdg.name = sd.sdgs
                WHERE {combined_where_clause}
                GROUP BY opp.name
                {order_by_clause}
            """
            data = frappe.db.sql(sql_query, as_dict=True)
            return data

        except Exception as e:
            frappe.log_error("related_opportunities Error", frappe.get_traceback())
            return None
        
    # Function to get available opportunities
    def available_opportunities(filter={}):
        try:
            user = frappe.db.get_value("SVA User", {"email": frappe.session.user}, "name")

            if isinstance(filter, str):
                filter = frappe.parse_json(filter)
            # Initialize clauses
            where_clauses = [
                """EXISTS (
                    SELECT 1 FROM `tabOpportunity Activity` as oact
                    WHERE oact.opportunity = opp.name
                )""",
                "opp.workflow_state = 'Approved'",
                "opp.opportunity_status IN ('Published', 'Ongoing')"
            ]

            # Exclude opportunities already taken by the user
            if user:
                where_clauses.append(f"""opp.name NOT IN (
                    SELECT activity FROM `tabVolunteer Opportunity`
                    WHERE volunteer = {frappe.db.escape(user)}
                )""")

            order_by_clause = ""
            if filter:
                if "types" in filter and filter["types"]:
                    types_list = [f"{frappe.db.escape(at)}" for at in filter["types"]]
                    where_clauses.append(f"opp.opportunity_type IN ({', '.join(types_list)})")

                if "karma_points" in filter and filter["karma_points"]:
                    if filter["karma_points"] == "Low to High":
                        order_by_clause = " ORDER BY opp.karma_points ASC"
                    elif filter["karma_points"] == "High to Low":
                        order_by_clause = " ORDER BY opp.karma_points DESC"

                if "sdgs" in filter and filter["sdgs"]:
                    sdgs_values = ", ".join(f"{frappe.db.escape(sdg)}" for sdg in filter["sdgs"])
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
                    opp.min_volunteering_time as hours,
                    opp.opportunity_description as activity_description,
                    opp.opportunity_image as activity_image,
                    opp.need_certificate as need_certificate,
                    vo.com_percent ,
                    vo.duration as donet_hours,
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
                    ) AS sdgs,
                    COALESCE(
                        JSON_ARRAYAGG(
                            DISTINCT JSON_OBJECT(
                                'name', sva.name,
                                'full_name', sva.full_name,
                                'email', sva.email,
                                'user_image', sva.user_image
                            )
                        ), JSON_ARRAY()
                    ) as volunteers
                FROM `tabOpportunity` AS opp
                LEFT JOIN `tabVolunteer Opportunity` AS vo ON vo.activity = opp.name
                LEFT JOIN `tabSVA User` as sva ON sva.name = vo.volunteer
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

    @frappe.whitelist()
    def ava_opportunities(filter={}):
        try:
            if isinstance(filter, str):
                filter = frappe.parse_json(filter)

            # Get current logged-in SVA User
            user = frappe.db.get_value("SVA User", {"email": frappe.session.user}, "name")

            # Initialize WHERE clauses
            where_clauses = [
                "opp.end_date >= CURRENT_DATE()",
                "opp.opportunity_status IN ('Published', 'Ongoing')",
                "opp.workflow_state = 'Approved'",
                """EXISTS (
                    SELECT 1 FROM `tabOpportunity Activity` AS oact
                    WHERE oact.opportunity = opp.name
                )"""
            ]

            # Exclude opportunities already assigned to the user
            if user:
                where_clauses.append(
                    f"""opp.name NOT IN (
                        SELECT activity FROM `tabVolunteer Opportunity`
                        WHERE volunteer = '{user}'
                    )"""
                )

            # Sorting
            order_by_clause = ""

            # Handle filters
            if filter:
                if "types" in filter and filter["types"]:
                    types_list = ", ".join(f"'{t}'" for t in filter["types"])
                    where_clauses.append(f"opp.opportunity_type IN ({types_list})")

                if "karma_points" in filter and filter["karma_points"]:
                    sort_order = filter["karma_points"]
                    if sort_order == "Low to High":
                        order_by_clause = "ORDER BY opp.karma_points ASC"
                    elif sort_order == "High to Low":
                        order_by_clause = "ORDER BY opp.karma_points DESC"

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
                    sort_order = filter["volunteering_hours"]
                    if sort_order == "Low to High":
                        order_by_clause = "ORDER BY opp.hours ASC"
                    elif sort_order == "High to Low":
                        order_by_clause = "ORDER BY opp.hours DESC"

            # Final WHERE clause
            combined_where_clause = " AND ".join(where_clauses)

            # Final SQL Query
            sql_query = f"""
                SELECT 
                    opp.name AS name,
                    opp.opportunity_name AS activity_name,
                    opp.karma_points AS karma_points,
                    opp.opportunity_type AS types,
                    opp.start_date AS start_date,
                    opp.end_date AS end_date,
                    opp.min_volunteering_time AS hours,
                    opp.opportunity_description AS activity_description,
                    opp.opportunity_image AS activity_image,
                    opp.need_certificate AS need_certificate,
                    vo.com_percent,
                    vo.duration AS donet_hours,
                    vo.workflow_state,
                    vo.completion_wf_state,
                    vo.rating,
                    vo.remarks,
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
                    ) AS sdgs,
                    COALESCE(
                        JSON_ARRAYAGG(
                            DISTINCT JSON_OBJECT(
                                'name', sva.name,
                                'full_name', sva.full_name,
                                'email', sva.email,
                                'user_image', sva.user_image
                            )
                        ), JSON_ARRAY()
                    ) AS volunteers
                FROM `tabOpportunity` AS opp
                LEFT JOIN `tabVolunteer Opportunity` AS vo 
                    ON vo.activity = opp.name AND vo.volunteer = '{user}'
                LEFT JOIN `tabSVA User` AS sva ON sva.name = vo.volunteer
                LEFT JOIN `tabSDGs Child` AS sd ON opp.name = sd.parent
                LEFT JOIN `tabSDG` AS sdg ON sdg.name = sd.sdgs
                WHERE {combined_where_clause}
                GROUP BY opp.name
                {order_by_clause}
            """

            data = frappe.db.sql(sql_query, as_dict=True)
            return data

        except Exception as e:
            frappe.log_error(frappe.get_traceback(), "related_opportunities Error")
            return []
    # Function to act now opportunity    
    def act_now_opp(activity, volunteer):
        workflow_state = frappe.db.get_value(
            "SVA User", {"email": volunteer}, "workflow_state"
        )
        volunteer = frappe.db.get_value("SVA User", {"email": volunteer}, "name")
        if workflow_state != "Approved":
            return {"msg": "Volunteer is not approved", "status": 201}

        opp = frappe.get_list(
            "Volunteer Opportunity",
            filters={"activity": activity, "volunteer": volunteer},
            pluck="name",
        )
        if opp:
            return {"msg": "Activity already assigned to the volunteer", "status": 400}
        

        # unlimited_vacancies = frappe.db.get_value(
        #     "Opportunity", activity, "unlimited_vacancies"
        # )

        # if not unlimited_vacancies:
        #     total_vacancies = (
        #         frappe.db.get_value("Opportunity", activity, "total_vacancies") or 0
        #     )
        #     current_count = frappe.db.count(
        #         "Volunteer Opportunity", filters={"activity": activity}
        #     )

        #     if current_count >= total_vacancies:
        #         return {
        #             "msg": f"Vacancies for this activity are already filled. No more users can be added.",
        #             "status": 400,
        #         }

        # Assign activity to the volunteer
        doc = frappe.new_doc("Volunteer Opportunity")
        doc.activity = activity
        doc.volunteer = volunteer
        doc.flags.ignore_permissions = True
        doc.flags.ignore_mandatory = True
        doc.save()

        return {"msg": "Activity assigned to the volunteer", "status": 200, "data": doc}

    # Function to get public opportunities
    def public_opportunities(name=None):
        try:
            where_clauses = [
                    """EXISTS (
                        SELECT 1 FROM `tabOpportunity Activity` AS oact
                        WHERE oact.opportunity = opp.name
                    )""",
                    "opp.workflow_state = 'Approved'",
                    "opp.opportunity_status IN ('Published', 'Ongoing')"
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
                    opp.min_volunteering_time AS hours,
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
    
    # Function to submit feedbacks
    def submit_feedbacks(name, volunteer_email, rating, comments):
        volunteer = frappe.db.get_value("SVA User", {"email": volunteer_email}, "name")
        if not volunteer:
            return {"error": "Volunteer not found", "status": 404}
        if (frappe.db.exists("Volunteer Opportunity", {"volunteer": volunteer})):
            volunteer_name = frappe.db.get_value("Volunteer Opportunity", {"volunteer": volunteer}, "name")
            if not volunteer_name:
                return {"error": "Opportunity not assigned to the volunteer", "status": 400}
            doc = frappe.get_doc("Volunteer Opportunity", volunteer_name)
            doc.rating = rating
            doc.remarks = comments
            doc.save()
            frappe.db.commit()
            return doc
        else:
            return("Volunteer Opportunity not found")
        
    # Function to get current opportunity
    def current_opportunity(filter={}):
            user = frappe.db.get_value("SVA User", {"email": frappe.session.user}, "name")
            if not user:
                return []

            base_url = frappe.get_conf().get("hostname", "")
            where_clauses = ["vo.volunteer = %(user)s"]
            order_by_clauses = []
            params = {"user": user}

            if isinstance(filter, str):
                filter = frappe.parse_json(filter)

            if filter:
                if "types" in filter and filter["types"]:
                    where_clauses.append("opp.opportunity_type IN %(activity_types)s")
                    params["activity_types"] = tuple(filter["types"])

                if "karma_points" in filter and filter["karma_points"]:
                    order_by_clauses.append(
                        "opp.karma_points ASC"
                        if filter["karma_points"] == "Low to High"
                        else "opp.karma_points DESC"
                    )

                if "sdgs" in filter and filter["sdgs"]:
                    where_clauses.append("sd.sdgs IN %(sdgs_values)s")
                    params["sdgs_values"] = tuple(filter["sdgs"])

                if "volunteering_hours" in filter and filter["volunteering_hours"]:
                    order_by_clauses.append(
                        "opp.hours ASC"
                        if filter["volunteering_hours"] == "Low to High"
                        else "opp.min_volunteering_time DESC"
                    )

            where_clause = " AND ".join(where_clauses)
            order_by_clause = (
                " ORDER BY " + ", ".join(order_by_clauses) if order_by_clauses else ""
            )

            sql = f"""
            SELECT
                vo.name as name,
                opp.name as activity,
                vo.duration as duration,
                vo.com_percent as com_percent,
                opp.opportunity_name as title,
                opp.karma_points as karma_points,
                opp.start_date as start_date,
                opp.end_date as end_date,
                opp.min_volunteering_time as hours,
                vo.duration as donet_hours,
                vo.completion_wf_state as completion_wf_state,
                opp.opportunity_description as activity_description,
                opp.opportunity_type as types,
                CONCAT('{base_url}', opp.opportunity_image) as activity_image,
                COALESCE(
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'sdgs_name', sdg.sdg,
                            'image', sdg.sdg_image
                        )
                    ), JSON_ARRAY()
                ) AS sdgs
            FROM
                `tabVolunteer Opportunity` AS vo
            INNER JOIN `tabOpportunity` AS opp ON vo.activity = opp.name
            LEFT JOIN `tabSDGs Child` AS sd ON opp.name = sd.parent
            LEFT JOIN `tabSDG` AS sdg ON sdg.name = sd.sdgs
            WHERE {where_clause}
            GROUP BY vo.name
            {order_by_clause}
            """
            try:
                acts = frappe.db.sql(sql, params, as_dict=True)
                return acts
            except Exception as e:
                frappe.log_error(f"Error in current_commitments query: {e}")
                raise

    # Function to view opportunity certificate
    def view_opportunity_certificate(opportunity):
        try:
            # Get current user's SVA User record
            user = frappe.db.get_value(
                "SVA User",
                {"email": frappe.session.user},
                ["name", "full_name"],
                as_dict=True,
            )
            if not user:
                frappe.throw("User not found")

            volunteer_opportunity = frappe.db.get_value(
                "Volunteer Opportunity",
                filters={"activity": opportunity, "volunteer": user.name},
                fieldname=["name", "duration", "karma_points", "certificate"],
                as_dict=True,
            ) 

            if volunteer_opportunity.certificate:
                return {
                    "success": True,
                    "message": "Certificate already exists",
                    "certificate_url": volunteer_opportunity.certificate,
                }

            opportunity_doc = frappe.get_doc("Opportunity", opportunity)

            # completion_date = frappe.utils.now_datetime()  
            certificate_data = {
                "full_name": user.full_name,
                "activity_title": opportunity_doc.opportunity_name,
                # "completion_date": completion_date.strftime(
                #     "%d %B %Y"
                # ),  # Convert to string
                "hours_contributed": str(
                    round((volunteer_opportunity.duration or 0) / 3600, 2)
                ),
                "karma_points": str(opportunity_doc.karma_points or 0),
            }

            template = frappe.get_template("mykartavya/templates/pages/certificate.html")
            if not template:
                frappe.throw("Certificate template not found")

            html = template.render(certificate_data)

            # Generate PDF
            if not get_pdf:
                frappe.throw("get_pdf function is missing. Check your Frappe installation.")

            pdf_data = get_pdf(html)

            # Generate unique filename
            filename = f"certificate_{opportunity}_{frappe.session.user}.pdf"
            file_path = frappe.get_site_path("public", "files", filename)

            # Save PDF file
            with open(file_path, "wb") as f:
                f.write(pdf_data)

            # Create File document in Frappe
            file_url = f"/files/{filename}"
            file_doc = frappe.get_doc(
                {
                    "doctype": "File",
                    "file_url": file_url,
                    "file_name": filename,
                    "attached_to_doctype": "Volunteer Opportunity",
                    "attached_to_name": volunteer_opportunity.name,
                    "attached_to_field": "certificate",
                    "is_private": 0,
                }
            )
            file_doc.insert(ignore_permissions=True)
            frappe.db.set_value(
                "Volunteer Opportunity", volunteer_opportunity.name, "certificate", file_url
            )

            return {
                "success": True,
                "message": "Certificate generated successfully",
                "certificate_url": file_url,
            }

        except Exception as e:
            frappe.log_error(
                f"Error generating certificate: {str(e)}", "Certificate Generation Error"
            )
            return {"success": False, "message": str(e)}
        
    # Function to show user certificates in frontend
    def get_user_certificates_opp():
        try:
            user = frappe.db.get_value("SVA User", {"email": frappe.session.user}, "name")
            if not user:
                return {"success": False, "message": "User not found"}

            certificates = frappe.get_all(
                "Volunteer Opportunity",
                filters={
                    "volunteer": user,
                    "certificate": ["is", "set"],  
                },
                fields=["name", "activity", "certificate", "creation"],
            )

            # Get activity titles
            for cert in certificates:
                activity = frappe.get_doc("Opportunity", cert.activity)
                cert.opportunity_name = activity.opportunity_name
                cert.date = frappe.utils.format_date(cert.creation)

            return {"success": True, "certificates": certificates}

        except Exception as e:
            frappe.log_error(
                f"Error fetching certificates: {str(e)}", "Certificate Fetch Error"
            )
            return {"success": False, "message": str(e)}
