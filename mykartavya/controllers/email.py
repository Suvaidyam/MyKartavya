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
        user_exists = frappe.db.exists("SVA User", {'email': email})
        frappe.logger().debug(f"SVA User exists check result: {user_exists}")
        
        if not user_exists:
            raise OTPError(_("No user found with this email address"))

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
        
        # Store OTP with 10 minutes expiration (600 seconds)
        frappe.cache().set_value(
            otp_key,
            {
                'otp': otp,
                'email': email,
                'generated_at': now_datetime()
            },
            expires_in_sec=600
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
        
        # Attempt to get the email template
        template = None
        try:
            template = frappe.get_doc("Email Template", template_name)
            frappe.logger().debug(f"Successfully retrieved email template: {template_name}")
        except Exception as e:
            frappe.logger().warning(f"Could not fetch email template '{template_name}': {str(e)}")

        if template:
            message = frappe.render_template(
                template.response, 
                {"otp": otp, "valid_minutes": 10}
            )
        else:
            # Default HTML message
            action_text = "Login" if type == "login" else "Complete Registration"
            url = ''
            if type == "register":
                full_path = f"frontend/verify?email={email}full_name={'Test'}"
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
                        background-color: #f7f9fc;
                        margin: 0;
                        padding: 20px;
                    }}
                    .container {{
                        max-width: 600px;
                        margin: auto;
                        background: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                        padding: 30px;
                        text-align: center;
                    }}
                    h2 {{
                        color: #333;
                        font-size: 24px;
                        margin-bottom: 20px;
                    }}
                    .otp {{
                        font-size: 28px;
                        font-weight: bold;
                        color: #007bff;
                        padding: 15px;
                        border: 2px solid #007bff;
                        border-radius: 5px;
                        display: inline-block;
                        margin: 20px 0;
                        background-color: #e7f3ff;
                    }}
                    p {{
                        color: #555;
                        line-height: 1.6;
                        font-size: 16px;
                    }}
                    .footer {{
                        margin-top: 30px;
                        font-size: 12px;
                        color: #aaa;
                        text-align: center;
                    }}
                    .button {{
                        display: inline-block;
                        padding: 10px 20px;
                        font-size: 16px;
                        color: #ffffff;
                        background-color: #007bff;
                        border-radius: 5px;
                        text-decoration: none;
                        margin-top: 20px;
                    }}
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Welcome to MyKartavya!</h2>
                    <p>Your OTP for {action_text.lower()} is:</p>
                    <div class="otp">{otp}</div>
                    <p>This OTP will expire in 10 minutes.</p>
                    <p>If you didn't request this OTP, please ignore this email.</p>
                    <a href="{full_path}" class="button">{action_text} Now</a>
                    <div class="footer">
                        <p>Thank you for using our service!</p>
                        <p>If you have any questions, feel free to contact us.</p>
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
        stored_data = frappe.cache().get_value(otp_key)  # Changed from get() to get_value()
        
        frappe.logger().debug(f"Stored OTP data: {stored_data}")

        if not stored_data:
            raise OTPError(_("OTP expired or invalid"))

        stored_otp = str(stored_data.get('otp'))  # Convert stored OTP to string
        generated_at = stored_data.get('generated_at')

        frappe.logger().debug(f"Comparing OTPs - Received: {otp}, Stored: {stored_otp}")

        # Check if OTP has expired (10 minutes)
        if get_datetime(generated_at) + timedelta(minutes=10) < now_datetime():
            frappe.cache().delete_value(otp_key)  # Changed from delete() to delete_value()
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

        # Store OTP with 10 minutes expiration (600 seconds)
        frappe.cache().set_value(
            otp_key,
            {
                'otp': otp,
                'email': email,
                'generated_at': now_datetime()
            },
            expires_in_sec=600
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
    
@frappe.whitelist(allow_guest=True)
def register_verify_otp(email, otp, full_name):
    """
    Verify OTP for registration with security checks.
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

        stored_otp = str(stored_data.get('otp'))  # Convert stored OTP to string
        generated_at = stored_data.get('generated_at')

        frappe.logger().debug(f"Comparing OTPs - Received: {otp}, Stored: {stored_otp}")

        # Check if OTP has expired (10 minutes)
        if get_datetime(generated_at) + timedelta(minutes=10) < now_datetime():
            frappe.cache().delete_value(otp_key)
            raise OTPError(_("OTP has expired. Please request a new one"))

        # Verify OTP
        if otp != stored_otp:
            raise OTPError(_("Invalid OTP"))

        # Clear OTP and attempts cache after successful verification
        frappe.cache().delete_value(otp_key)
        frappe.cache().delete_value(get_attempt_cache_key(email))

        # Create new user
        first_name = full_name.split(' ')[0]
        if len(full_name.split(' ')) > 1:
            last_name = full_name.split(' ')[1]
        else:
            last_name = ""
        frappe.set_user("Administrator")
        user = frappe.get_doc({
            "doctype": "SVA User",
            "email": email,
            "first_name": first_name,
            "last_name": last_name, 
            "role_profiles":  "Volunteer" 
        })
        # user.append("role_profiles", {"role_profile": "Volunteer"})
        user.insert(ignore_permissions=True, ignore_mandatory=True)
        frappe.set_user(email)
        frappe.logger().info(f"SVA User {email} registered successfully")

        # Log user in
        frappe.local.login_manager.login_as(email)

        return {
            "message": _("Registration successful"),
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
        frappe.logger().error(f"Unexpected error in register_verify_otp for {email}:\n{error_trace}")
        return {
            "message": _("Registration failed. Please try again."),
            "status": "error",
            "debug": str(e) if frappe.conf.developer_mode else None
        }