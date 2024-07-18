from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from pymongo import MongoClient
from app.resources.auth import Register, Login, UpdateUser, DeleteUser
from app.resources.course import CreateCourse, GetCourse, UpdateCourse, DeleteCourse, ListCoursesByInstitution

def create_app():
    app = Flask(__name__)
    CORS(app)
    api = Api(app)

    # Correct MongoDB connection string
    client = MongoClient('mongodb+srv://nirajvernekar02:Niraj123@cluster0.blxtomc.mongodb.net/')
    db = client.flask_db
    courses_collection = db['courses']  # Collection for courses
    certificates_collection = db['certificates']  # Collection for certificates

    # Define authentication routes
    api.add_resource(Register, '/register')
    api.add_resource(Login, '/login')

    # Add routes for updating and deleting users
    api.add_resource(UpdateUser, '/user/<string:user_id>')
    api.add_resource(DeleteUser, '/user/<string:user_id>')

    # Add routes for course management
    api.add_resource(CreateCourse, '/courses', resource_class_args=[courses_collection])
    api.add_resource(GetCourse, '/courses/<string:course_id>', resource_class_args=[courses_collection])
    api.add_resource(UpdateCourse, '/courses/<string:course_id>', resource_class_args=[courses_collection])
    api.add_resource(DeleteCourse, '/courses/<string:course_id>', resource_class_args=[courses_collection])
    api.add_resource(ListCoursesByInstitution, '/courses/institution/<string:institution_id>', resource_class_args=[courses_collection])

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
