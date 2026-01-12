import os
import firebase_admin
from firebase_admin import credentials

def init_firebase():
    if not firebase_admin._apps:
        render_secret_path = "/etc/secrets/service-account.json"
        
        local_path = "./service-account.json"

        if os.path.exists(render_secret_path):
            cred_path = render_secret_path
            print(f"🔒 Using Render Secret: {cred_path}")
        else:
            cred_path = local_path
            print(f"💻 Using Local File: {cred_path}")

        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)