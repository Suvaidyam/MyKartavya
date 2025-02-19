import frappe
from hashlib import sha256
from frappe.utils import now_datetime

def get_context(context):
    context['url'] = reset_password(context.get('doc'), password_expired=False)


def reset_password(user, password_expired=False):
    key = frappe.generate_hash()
    hashed_key = sha256(key.encode("utf-8")).hexdigest()

    # Assuming 'user' is an object that has 'email' as its property
    frappe.db.set_value("User", user.email, "reset_password_key", hashed_key)
    frappe.db.set_value("User", user.email, "last_reset_password_key_generated_on", now_datetime())
    
    url = f"/update-password?key={key}"
    if password_expired:
        url += "&password_expired=true"
    return url
