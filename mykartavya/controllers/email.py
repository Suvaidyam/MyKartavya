# your_app/your_module.py
import frappe
from frappe import _
import random
from datetime import timedelta
from frappe.utils import (
    cint, 
    get_datetime, 
    now_datetime,
    validate_email_address,
    get_formatted_email
)
from frappe.rate_limiter import rate_limit
from frappe.exceptions import ValidationError
class OTPError(Exception):
    pass

def generate_otp():
    """Generate a 6-digit OTP"""
    return ''.join(random.choices('0123456789', k=6))

def get_otp_cache_key(email):
    """Generate a unique cache key for the email"""
    return f"login_otp:{email}"

def get_attempt_cache_key(email):
    """Generate a unique cache key for tracking attempts"""
    return f"login_otp_attempts:{email}"

@frappe.whitelist(allow_guest=True)
@rate_limit(limit=5, seconds=300)  # Limit to 5 requests per 5 minutes
def send_otp(email):
    """
    Send OTP to user's email with rate limiting and validation
    """
    try:
        if not email:
            raise OTPError(_("Email is required"))

        # Validate email format
        validate_email_address(email, throw=True)

        # Enhanced debugging
        frappe.logger().debug(f"Attempting to send OTP to email: {email}")

        # Check if user exists with more detailed logging
         # Check if user exists and fetch status
        user_data = frappe.db.get_value("SVA User", {"email": email}, ["name", "status"], as_dict=True)
        frappe.logger().debug(f"SVA User fetch result: {user_data}")

        if not user_data:
            raise OTPError(_("No user found with this email address"))

        if user_data.status == "Inactive":
            raise OTPError(_("Your account is inactive, please contact MyKartavya admin for further support."))

        # Check previous attempts
        attempts_key = get_attempt_cache_key(email)
        attempts = cint(frappe.cache().get(attempts_key) or 0)
        
        if attempts >= 3:  # Max 3 attempts
            # Check if we're still within the cooldown period
            last_attempt = frappe.cache().get(f"{attempts_key}:timestamp")
            if last_attempt:
                cooldown_time = get_datetime(last_attempt) + timedelta(minutes=30)
                if now_datetime() < cooldown_time:
                    minutes_left = int((cooldown_time - now_datetime()).total_seconds() / 60)
                    raise OTPError(_(f"Too many attempts. Please try again after {minutes_left} minutes"))

            # Reset attempts after cooldown period
            attempts = 0

        # Generate and store OTP with expiration
        otp = generate_otp()
        otp_key = get_otp_cache_key(email)
        
        # Store OTP with 30 minutes expiration (1800 seconds)
        frappe.cache().set_value(
            otp_key,
            {
                'otp': otp,
                'email': email,
                'generated_at': now_datetime()
            },
            expires_in_sec=1800
        )

        # Update attempts (1800 seconds = 30 minutes)
        frappe.cache().set_value(attempts_key, attempts + 1, expires_in_sec=1800)
        frappe.cache().set_value(
            f"{attempts_key}:timestamp",
            now_datetime(),
            expires_in_sec=1800
        )

        # Send email using Frappe's email function
        send_otp_email(email, otp)

        return {
            "message": _("OTP sent successfully"),
            "status": "success"
        } 

    except OTPError as e:
        frappe.logger().error(f"OTP Send Error for {email}: {str(e)}")
        return {
            "message": str(e),
            "status": "error"
        }
    except Exception as e:
        import traceback
        error_trace = traceback.format_exc()
        frappe.logger().error(f"Detailed error in send_otp for {email}:\n{error_trace}")
        return {
            "message": _("Unable to send OTP. Please try again later."),
            "status": "error",
            "debug": str(e) if frappe.conf.developer_mode else None
        }

def send_otp_email(email, otp, type="login"):
    """Send OTP email using Frappe's email functionality for login or registration"""
    try:
        if type == "register":
            subject = _("Registration OTP for {0}").format(frappe.local.site)
            template_name = "OTP Registration"
        else:
            subject = _("Login OTP for {0}").format(frappe.local.site)
            template_name = "OTP Login"
        
        # Get user's name from SVA User
        full_name = "User"
        if type == "login":
            user = frappe.get_doc("SVA User", {"email": email})
            if user:
                full_name = f"{user.first_name} {user.last_name}".strip()
        
        # Attempt to get the email template
        template = None
        try:
            template = frappe.get_doc("Email Template", template_name)
            frappe.logger().debug(f"Successfully retrieved email template: {template_name}")
        except Exception as e:
            frappe.logger().warning(f"Could not fetch email template '{template_name}': {str(e)}")
            
        if template:
            message = frappe.render_template(
                template.response_html, 
                {"otp": otp, "valid_minutes": 30, "full_name": full_name}
            )
        else:
            # Default HTML message
            action_text = "Login" if type == "login" else "Complete Registration"
            url = ''
            if type == "register":
                full_path = f"frontend/verify?email={email}"
            else:
                full_path = f"frontend/verify?email={email}"
            message = f"""
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {{
                        font-family: 'Helvetica Neue', Arial, sans-serif;
                        margin: 0;
                        padding: 20px;
                        background-color: #f5f5f5;
                    }}
                    .container {{
                        max-width: 500px;
                        margin: auto;
                        background: #ffffff;
                        border-radius: 8px;
                        padding: 30px;
                        text-align: center;
                    }}
                    .logo {{
                        margin-bottom: 20px;
                    }}
                    .logo img {{
                        max-width: 200px;
                        height: auto;
                    }}
                    h2 {{
                        color: #333;
                        font-size: 24px;
                        margin: 20px 0;
                        font-weight: 500;
                    }}
                    .greeting {{
                        color: #666;
                        font-size: 16px;
                        margin-bottom: 20px;
                    }}
                    .otp-message {{
                        color: #666;
                        font-size: 14px;
                        line-height: 1.6;
                        margin: 20px 0;
                    }}
                    .otp {{
                        font-size: 24px;
                        color: #333;
                        margin: 15px 0;
                        font-weight: bold;
                    }}
                    .footer {{
                        margin-top: 30px;
                        color: #666;
                        font-size: 14px;
                        text-align: center;
                    }}
                    .warning {{
                            font-size: 14px; 
                            color: #c0392b; 
                            margin-top: 10px; 
                    }}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="logo">
                        <img src="https://res.cloudinary.com/dyt5jqnax/image/upload/v1742533366/mykartavya-logo_jptv31.png" alt="MyKartavya Logo">
                    </div>
                    <h2>Login OTP</h2>
                    <div class="greeting">Hello, {full_name}</div>
                    <p>Your One Time Password (OTP) for login is:</p> 
                    <div class="otp">{otp}</div>
                    <div class="otp-message">
                       This OTP is valid for 30 minutes.
                    </div>
                    <div class="warning">Warning: Do not share your OTP with anyone.</div>
                    <div class="footer">
                        <p>Thank you!</p>
                        <p>Team MyKartavya</p>
                        <p>If you did not request this OTP, please ignore this email.</p> 
                    </div>
                </div>
            </body>
            </html>
            """

        # Debug log before sending
        frappe.logger().debug(f"Attempting to send {type} email to: {email}")
        
        # Send email with error handling
        frappe.sendmail(
            recipients=email,
            subject=subject,
            message=message,
            now=True
        )
        
        frappe.logger().debug(f"{type.capitalize()} email sent successfully")
        
    except Exception as e:
        import traceback
        error_trace = traceback.format_exc()
        frappe.logger().error(f"Email sending failed:\n{error_trace}")
        raise Exception(f"Failed to send email: {str(e)}")

@frappe.whitelist(allow_guest=True)
@rate_limit(limit=5, seconds=300)
def verify_otp(email, otp):
    """
    Verify OTP with security checks
    """
    try:
        if not email or not otp:
            raise OTPError(_("Email and OTP are required"))

        # Convert OTP to string for comparison
        otp = str(otp)
        
        # Add debug logging
        frappe.logger().debug(f"Verifying OTP for email: {email}")
        
        otp_key = get_otp_cache_key(email)
        stored_data = frappe.cache().get_value(otp_key)
        
        frappe.logger().debug(f"Stored OTP data: {stored_data}")

        if not stored_data:
            raise OTPError(_("OTP expired or invalid"))

        stored_otp = str(stored_data.get('otp'))
        generated_at = stored_data.get('generated_at')

        frappe.logger().debug(f"Comparing OTPs - Received: {otp}, Stored: {stored_otp}")

        # Check if OTP has expired (30 minutes)
        if get_datetime(generated_at) + timedelta(minutes=30) < now_datetime():
            frappe.cache().delete_value(otp_key)
            raise OTPError(_("OTP has expired. Please request a new one"))

        # Verify OTP
        if otp != stored_otp:
            raise OTPError(_("Invalid OTP"))

        # Clear OTP and attempts cache after successful verification
        frappe.cache().delete_value(otp_key)
        frappe.cache().delete_value(get_attempt_cache_key(email))

        # Log user in
        frappe.local.login_manager.login_as(email)

        return {
            "message": _("OTP verified successfully"),
            "status": "success"
        }

    except OTPError as e:
        frappe.logger().error(f"OTP Verification Error for {email}: {str(e)}")
        return {
            "message": str(e),
            "status": "error"
        }
    except Exception as e:
        import traceback
        error_trace = traceback.format_exc()
        frappe.logger().error(f"Unexpected error in verify_otp for {email}:\n{error_trace}")
        return {
            "message": _("Verification failed. Please try again."),
            "status": "error",
            "debug": str(e) if frappe.conf.developer_mode else None
        }

@frappe.whitelist(allow_guest=True)
def register_send_otp(email):
    """
    Send OTP for registration with rate limiting and validation.
    """
    try:
        if not email:
            raise OTPError(_("Email is required"))

        # Validate email format
        validate_email_address(email, throw=True)

        # Enhanced debugging
        frappe.logger().debug(f"Attempting to send OTP to email: {email}")

        # Check if user already exists
        user_exists = frappe.db.exists("SVA User", {'email': email})
        if user_exists:
            frappe.logger().warning(f"User with email {email} already exists.")
            raise OTPError(_("User with this email already exists"))

        # Handle OTP attempts and rate limiting
        attempts_key = get_attempt_cache_key(email)
        attempts = cint(frappe.cache().get(attempts_key) or 0)

        if attempts >= 3:  # Max 3 attempts
            last_attempt = frappe.cache().get(f"{attempts_key}:timestamp")
            if last_attempt:
                cooldown_time = get_datetime(last_attempt) + timedelta(minutes=30)
                if now_datetime() < cooldown_time:
                    minutes_left = int((cooldown_time - now_datetime()).total_seconds() / 60)
                    raise OTPError(_(f"Too many attempts. Please try again after {minutes_left} minutes"))

            # Reset attempts after cooldown period
            attempts = 0

        # Generate and store OTP with expiration
        otp = generate_otp()
        otp_key = get_otp_cache_key(email)

        # Store OTP with 30 minutes expiration (1800 seconds)
        frappe.cache().set_value(
            otp_key,
            {
                'otp': otp,
                'email': email,
                'generated_at': now_datetime()
            },
            expires_in_sec=1800
        )

        # Update attempts (1800 seconds = 30 minutes)
        frappe.cache().set_value(attempts_key, attempts + 1, expires_in_sec=1800)
        frappe.cache().set_value(f"{attempts_key}:timestamp", now_datetime(), expires_in_sec=1800)

        # Send OTP via email
        send_otp_email(email, otp, type="register")

        frappe.logger().info(f"OTP sent successfully to {email}")

        return {
            "message": _("OTP sent successfully"),
            "status": "success",
            "email": email
        }

    except OTPError as e:
        frappe.logger().error(f"OTP Send Error for {email}: {str(e)}")
        return {
            "message": str(e),
            "status": "error"
        }

    except Exception as e:
        import traceback
        error_trace = traceback.format_exc()
        frappe.logger().error(f"Detailed error in register_send_otp for {email}:\n{error_trace}")
        return {
            "message": _("Unable to send OTP. Please try again later."),
            "status": "error",
            "debug": str(e) if frappe.conf.developer_mode else None
        }

import re

def is_valid_indian_phone(number):
    """Validate Indian phone number in +91 format"""
    return re.match(r"^\+91[6-9]\d{9}$", number) is not None

@frappe.whitelist(allow_guest=True)
def register_verify_otp(email, otp, full_name):
    """
    Verify OTP for registration with security checks.
    """
    try:
        if not email or not otp:
            raise OTPError(_("Email and OTP are required"))

        # ✅ Static phone number
        phone_number = "+919876543210"

        # ✅ Validate the static phone number
        if not is_valid_indian_phone(phone_number):
            frappe.throw(_("Phone Number <strong>{}</strong> set in field <strong>custom_phone_number</strong> is not valid.".format(phone_number)), title="Invalid Phone Number")

        otp = str(otp)
        otp_key = get_otp_cache_key(email)
        stored_data = frappe.cache().get_value(otp_key)

        if not stored_data:
            raise OTPError(_("OTP expired or invalid"))

        stored_otp = str(stored_data.get('otp'))
        generated_at = stored_data.get('generated_at')

        if get_datetime(generated_at) + timedelta(minutes=10) < now_datetime():
            frappe.cache().delete_value(otp_key)
            raise OTPError(_("OTP has expired. Please request a new one"))

        if otp != stored_otp:
            raise OTPError(_("Invalid OTP"))

        # Clear OTP cache
        frappe.cache().delete_value(otp_key)
        frappe.cache().delete_value(get_attempt_cache_key(email))

        name_parts = full_name.split()
        if len(name_parts) > 2:
            first_name = name_parts[0]
            last_name = ' '.join(name_parts[1:])
        else:
            first_name = name_parts[0]
            last_name = name_parts[1] if len(name_parts) > 1 else ""

        frappe.set_user("Administrator")
        user = frappe.get_doc({
            "doctype": "SVA User",
            "email": email,
            "first_name": first_name,
            "last_name": last_name,
            "role_profiles": "Volunteer",
            "custom_phone_number": phone_number,
            "custom_registration_type":"Self Registered"
        })
        user.insert(ignore_permissions=True, ignore_mandatory=True)
        if user.email:
            email_domain = user.email.split('@')[-1].lower()
        company = frappe.db.get_value("Company", {"company_domain": email_domain}, "name")
        if company:
            user.custom_company = company
            user.append(
                "table_pdop",
                {
                    "module": "Company",
                    "value": company,
                }
            )
            user.save(ignore_permissions=True)
        frappe.set_user(email)
        frappe.local.login_manager.login_as(email)

        return {
            "message": _("Registration successful"),
            "status": "success"
        }

    except OTPError as e:
        return {
            "message": str(e),
            "status": "error"
        }

    except Exception as e:
        import traceback
        error_trace = traceback.format_exc()
        frappe.logger().error(f"Unexpected error in register_verify_otp for {email}:\n{error_trace}")
        return {
            "message": _("Registration failed. Please try again."),
            "status": "error",
            "debug": str(e) if frappe.conf.developer_mode else None
        }
