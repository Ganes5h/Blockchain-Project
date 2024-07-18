# app/models/course_model.py

from pymongo.collection import Collection
import random  # Ensure random is imported
import string

class CourseModel:
    def __init__(self, collection: Collection):
        self.collection = collection

    def create_course(self, institution_id, course_name, certificate_template_path):
        course_id = self.generate_course_id(course_name)
        course_data = {
            'course_id': course_id,
            'institution_id': institution_id,
            'course_name': course_name,
            'certificate_template_path': certificate_template_path,
            'certificates_issued': 0
        }
        result = self.collection.insert_one(course_data)
        return str(result.inserted_id)

    def generate_course_id(self, course_name):
        random_suffix = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
        course_id = f"{course_name[:4].upper()}{random_suffix}"
        return course_id

    def find_course_by_id(self, course_id):
        return self.collection.find_one({'course_id': course_id})

    def update_course(self, course_id, update_data):
        update_result = self.collection.update_one(
            {'course_id': course_id},
            {'$set': update_data}
        )
        return update_result.modified_count > 0

    def delete_course(self, course_id):
        delete_result = self.collection.delete_one({'course_id': course_id})
        return delete_result.deleted_count > 0

    def find_courses_by_institution_id(self, institution_id):
        return list(self.collection.find({'institution_id': institution_id}))
