# firebase_setup.py

import firebase_admin
from firebase_admin import credentials, firestore

def initialize_firebase():
    # Path to your Firebase service account key
    cred = credentials.Certificate('path/to/serviceAccountKey.json')
    firebase_admin.initialize_app(cred)
    return firestore.client()
