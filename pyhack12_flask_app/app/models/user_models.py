from pymongo.collection import Collection
import random
import string
from werkzeug.security import generate_password_hash, check_password_hash

class BaseUserModel:
    def __init__(self, collection: Collection):
        self.collection = collection

    def generate_user_id(self, name):
        name = name.replace(' ', '').upper()
        random_digits = ''.join(random.choices(string.digits, k=4))
        user_id = name[:3] + random_digits if name else random_digits
        return user_id

    def find_user_by_email(self, email):
        return self.collection.find_one({'email': email})

    def find_user_by_id(self, user_id):
        return self.collection.find_one({'user_id': user_id})

    def verify_password(self, stored_password, provided_password):
        return check_password_hash(stored_password, provided_password)

    def update_user(self, user_id, update_data):
        self.collection.update_one({'user_id': user_id}, {'$set': update_data})

    def delete_user(self, user_id):
        self.collection.delete_one({'user_id': user_id})

class StudentModel(BaseUserModel):
    def create_user(self, email, password, **kwargs):
        user_id = self.generate_user_id(kwargs.get('name', ''))
        user = {
            'user_id': user_id,
            'email': email,
            'password': generate_password_hash(password),
            'name': kwargs.get('name'),
            'address': kwargs.get('address'),
            'phone': kwargs.get('phone'),
            'certificates': []
        }
        self.collection.insert_one(user)
        return user_id

class InstituteModel(BaseUserModel):
    def create_user(self, email, password, **kwargs):
        user_id = self.generate_user_id(kwargs.get('name', ''))
        user = {
            'user_id': user_id,
            'email': email,
            'password': generate_password_hash(password),
            'name': kwargs.get('name'),
            'address': kwargs.get('address'),
            'phone': kwargs.get('phone'),
            'certificates_issued': 0
        }
        self.collection.insert_one(user)
        return user_id

class IndustryModel(BaseUserModel):
    def create_user(self, email, password, **kwargs):
        user_id = self.generate_user_id(kwargs.get('name', ''))
        user = {
            'user_id': user_id,
            'email': email,
            'password': generate_password_hash(password),
            'name': kwargs.get('name'),
            'address': kwargs.get('address'),
            'phone': kwargs.get('phone'),
            'job_postings': []
        }
        self.collection.insert_one(user)
        return user_id