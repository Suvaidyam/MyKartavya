app_name = "mykartavya"
app_title = "Mykartavya"
app_publisher = "Aniket Singh"
app_description = "MyKartavya"
app_email = "Aniket.singh@suvaidyam.com"
app_license = "mit"

# Apps
# ------------------

required_apps = [
    "Suvaidyam/sva_frappe","Suvaidyam/frappe_theme" ,"builder"
]

fixtures=[
    # 'Role',
    # 'Role Profile',
    # 'Builder Page', 
    # 'Custom HTML Block',
    # 'SDG',
    # 'Skills',
    # 'Property Setter',
    # 'SVADatatable Configuration',
    # "Workflow",
    # "Workflow State",
    # "Workflow Action",
    # "State",
    # "District"
    # "Builder Client Script",
    # "Website Settings",
    # "User Settings",
    # "Server Script",
    # "Client Script",
    # "FAQs"
    # "Translation",
    # 'Custom DocPerm',
    # 'My Theme',
    # 'Opportunity Kind',
    # 'Email Template'
]

# doc_events = {
#     "Company": {
#         "after_insert": "mykartavya.mykartavya.doctype.company.company.after_insert"
#     }
# }

doc_events = {
    "Activity": {
        "on_update": "mykartavya.controllers.notification.activity_status_notification"
    },
     "Opportunity": {
        "on_update": "mykartavya.controllers.notification.opportunity_status_notification"
    }
}


override_doctype_class = {
    "User": "mykartavya.override.CustomUser"
}

# Each item in the list will be shown as an app in the apps page
# add_to_apps_screen = [
# 	{
# 		"name": "mykartavya",
# 		"logo": "/assets/mykartavya/logo.png",
# 		"title": "Mykartavya",
# 		"route": "/mykartavya",
# 		"has_permission": "mykartavya.api.permission.has_app_permission"
# 	}
# ]
# Includes in <head>
# ------------------

# include js, css files in header of desk.html
app_include_css = "/assets/mykartavya/css/style.css"
# app_include_js = "/assets/mykartavya/js/mykartavya.js"

# include js, css files in header of web template
# web_include_css = "/assets/mykartavya/css/mykartavya.css"
# web_include_js = "/assets/mykartavya/js/login.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "mykartavya/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "mykartavya/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# automatically load and sync documents of this doctype from downstream apps
# importable_doctypes = [doctype_1]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "mykartavya.utils.jinja_methods",
# 	"filters": "mykartavya.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "mykartavya.install.before_install"
# after_install = "mykartavya.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "mykartavya.uninstall.before_uninstall"
# after_uninstall = "mykartavya.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "mykartavya.utils.before_app_install"
# after_app_install = "mykartavya.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "mykartavya.utils.before_app_uninstall"
# after_app_uninstall = "mykartavya.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "mykartavya.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

permission_query_conditions = {
	"SVA User": "mykartavya.permission_query.user.permission_query_condition",
}
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# 	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"mykartavya.tasks.all"
# 	],
# 	"daily": [
# 		"mykartavya.tasks.daily"
# 	],
# 	"hourly": [
# 		"mykartavya.tasks.hourly"
# 	],
# 	"weekly": [
# 		"mykartavya.tasks.weekly"
# 	],
# 	"monthly": [
# 		"mykartavya.tasks.monthly"
# 	],
# }

scheduler_events = {
    "cron":{
       '1 0 * * *': [
            "mykartavya.controllers.cron.process_activities",
            "mykartavya.controllers.cron.opportunity_publish"
        ]
    },
    "daily": [
        "mykartavya.controllers.cron.start_activities",
        "mykartavya.controllers.cron.send_reporting_reminders",
        "mykartavya.controllers.cron.send_birthday_activity_email"
    ]
}

# Testing
# -------

# before_tests = "mykartavya.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "mykartavya.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "mykartavya.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["mykartavya.utils.before_request"]
# after_request = ["mykartavya.utils.after_request"]

# Job Events
# ----------
# before_job = ["mykartavya.utils.before_job"]
# after_job = ["mykartavya.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"mykartavya.auth.validate"
# ]

# Automatically update python controller files with type annotations for this app.
# export_python_type_annotations = True

# default_log_clearing_doctypes = {
# 	"Logging DocType Name": 30  # days to retain logs
# }

add_to_apps_screen = [
	{
		"name": "mykartavya",
		"logo": "/assets/mykartavya/images/logo.png",
		"title": "Mykartavya",
		"route": "/app/sva-user",
	}
]

website_route_rules = [{'from_route': '/frontend/<path:app_path>', 'to_route': 'frontend'}, {'from_route': '/frontend/<path:app_path>', 'to_route': 'frontend'},]

allow_guest_to_view = [
    "mykartavya.mykartavya.doctype.volunteer_company_mapper.volunteer_company_mapper.verify_email"
]