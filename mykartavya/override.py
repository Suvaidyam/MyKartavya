from frappe.core.doctype.user.user import User
 
class CustomUser(User):
    def send_welcome_mail_to_user(self):
        return 