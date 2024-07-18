# course.py
from flask_restful import Resource, reqparse
from flask import jsonify
from app.models.course_model import CourseModel
from pymongo.collection import Collection

class CreateCourse(Resource):
    def __init__(self, courses_collection: Collection):
        self.course_model = CourseModel(courses_collection)
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('institution_id', type=str, required=True, help="Institution ID is required")
        self.parser.add_argument('course_name', type=str, required=True, help="Course name is required")
        self.parser.add_argument('certificate_template_path', type=str, required=True, help="Certificate template path is required")

    def post(self):
        args = self.parser.parse_args()
        course_id = self.course_model.create_course(
            institution_id=args['institution_id'],
            course_name=args['course_name'],
            certificate_template_path=args['certificate_template_path']
        )
        return {"message": "Course created successfully", "course_id": course_id}, 201

class GetCourse(Resource):
    def __init__(self, courses_collection: Collection):
        self.course_model = CourseModel(courses_collection)

    def get(self, course_id):
        course = self.course_model.find_course_by_id(course_id)
        if course:
            course['_id'] = str(course['_id'])  # Convert ObjectId to string for JSON serialization
            return jsonify(course)
        return {"message": "Course not found"}, 404

class UpdateCourse(Resource):
    def __init__(self, courses_collection: Collection):
        self.course_model = CourseModel(courses_collection)
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('course_name', type=str, help="Course name")
        self.parser.add_argument('certificate_template_path', type=str, help="Certificate template path")

    def put(self, course_id):
        args = self.parser.parse_args()
        update_data = {
            'course_name': args['course_name'],
            'certificate_template_path': args['certificate_template_path']
        }
        if self.course_model.update_course(course_id, update_data):
            return {"message": "Course updated successfully"}
        return {"message": "Course not found or no changes detected"}, 404

class DeleteCourse(Resource):
    def __init__(self, courses_collection: Collection):
        self.course_model = CourseModel(courses_collection)

    def delete(self, course_id):
        if self.course_model.delete_course(course_id):
            return {"message": "Course deleted successfully"}
        return {"message": "Course not found"}, 404

class ListCoursesByInstitution(Resource):
    def __init__(self, courses_collection: Collection):
        self.course_model = CourseModel(courses_collection)

    def get(self, institution_id):
        courses = self.course_model.find_courses_by_institution_id(institution_id)
        for course in courses:
            course['_id'] = str(course['_id'])  # Convert ObjectId to string for JSON serialization
        return jsonify(courses)
