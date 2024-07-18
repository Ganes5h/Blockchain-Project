from flask import request, jsonify, make_response
from flask_restful import Resource
from pymongo import MongoClient
from app.models.user_models import StudentModel, InstituteModel, IndustryModel

# MongoDB client setup
client = MongoClient('mongodb+srv://nirajvernekar02:Niraj123@cluster0.blxtomc.mongodb.net/?retryWrites=true&w=majority')
db = client.flask_db
student_collection = db['students']
institute_collection = db['institutes']
industry_collection = db['industries']

student_model = StudentModel(student_collection)
institute_model = InstituteModel(institute_collection)
industry_model = IndustryModel(industry_collection)

class Register(Resource):
    def post(self):
        data = request.get_json()
        
        email = data.get('email')
        password = data.get('password')
        user_type = data.get('user_type')
        name = data.get('name')
        address = data.get('address')
        phone = data.get('phone')
        
        if not all([email, password, user_type]):
            return make_response(jsonify({"message": "Email, password, and user type are required"}), 400)
        
        user_models = {
            'student': student_model,
            'institute': institute_model,
            'industry': industry_model
        }
        
        model = user_models.get(user_type)
        if not model:
            return make_response(jsonify({"message": "Invalid user type"}), 400)
        
        if model.find_user_by_email(email):
            return make_response(jsonify({"message": "User already exists"}), 400)
        
        user_id = model.create_user(email, password, name=name, address=address, phone=phone)
        
        # Handle photo upload separately
        photo = request.files.get('photo')
        if photo:
            photo_path = f"resources/photos/{user_id}_photo.jpg"
            photo.save(photo_path)
            model.update_user(user_id, {'photo_path': photo_path})
        
        return make_response(jsonify({"message": "User registered successfully", "user_id": user_id}), 201)

class Login(Resource):
    def post(self):
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        user_type = data.get('user_type')

        if not all([email, password, user_type]):
            return make_response(jsonify({"message": "Email, password, and user type are required"}), 400)

        user_models = {
            'student': student_model,
            'institute': institute_model,
            'industry': industry_model
        }
        
        model = user_models.get(user_type)
        if not model:
            return make_response(jsonify({"message": "Invalid user type"}), 400)

        user = model.find_user_by_email(email)
        if not user or not model.verify_password(user['password'], password):
            return make_response(jsonify({"message": "Invalid email or password"}), 401)

        return make_response(jsonify({"message": "Login successful", "user_id": user['user_id']}), 200)

class UpdateUser(Resource):
    def put(self, user_id):
        user_types = ['student', 'institute', 'industry']
        user = None
        model = None
        
        for user_type in user_types:
            user_model = user_models.get(user_type)
            user = user_model.find_user_by_id(user_id)
            if user:
                model = user_model
                break
        
        if not user:
            return make_response(jsonify({"message": "User not found"}), 404)
        
        # Update user data (excluding password and email)
        data = request.get_json()
        updatable_fields = ['name', 'address', 'phone']
        update_data = {field: data[field] for field in updatable_fields if field in data}
        
        # Handle photo upload separately
        photo = request.files.get('photo')
        if photo:
            photo_path = f"resources/photos/{user_id}_photo.jpg"
            photo.save(photo_path)
            update_data['photo_path'] = photo_path
        
        model.update_user(user_id, update_data)
        
        return jsonify({"message": "User updated successfully"})

class DeleteUser(Resource):
    def delete(self, user_id):
        user_types = ['student', 'institute', 'industry']
        user = None
        model = None
        
        for user_type in user_types:
            user_model = user_models.get(user_type)
            user = user_model.find_user_by_id(user_id)
            if user:
                model = user_model
                break
        
        if not user:
            return make_response(jsonify({"message": "User not found"}), 404)
        
        model.delete_user(user_id)
        
        return jsonify({"message": "User deleted successfully"})