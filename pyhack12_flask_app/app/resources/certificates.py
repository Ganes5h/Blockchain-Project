import os
import json
import logging
from flask import Flask, jsonify, request, send_file
from flask_restful import Resource, Api, reqparse
import hashlib
from pymongo import MongoClient
from blockchain import store_certificate_hash, validate_certificate_hash
import qrcode
import time
from flask_cors import CORS  # Import Flask-CORS
from bson import ObjectId

logging.basicConfig(level=logging.INFO)
app = Flask(__name__)
CORS(app)  # Enable CORS for all origins

api = Api(app)

# MongoDB connection
mongo = MongoClient('mongodb+srv://nirajvernekar02:Niraj123@cluster0.blxtomc.mongodb.net/?retryWrites=true&w=majority')
db = mongo['certificate_db']
certificates_collection = db['certificates']

# Create folder for storing QR codes if it doesn't exist
qr_folder = os.path.join(os.path.dirname(__file__), 'resources', 'qr_codes')
os.makedirs(qr_folder, exist_ok=True)

def generate_hash(data):
    timestamp = str(time.time())  # Get current timestamp
    data_with_timestamp = f"{data}_{timestamp}"  # Concatenate data with timestamp
    sha256 = hashlib.sha256()
    sha256.update(data_with_timestamp.encode('utf-8'))
    return sha256.hexdigest()

class CertificateModel:
    def __init__(self, collection):
        self.collection = collection

    def create_certificate(self, certificate_data):
        certificate_data['institution_id'] = certificate_data.get('institution_id')
        certificate_data['institution_name'] = certificate_data.get('institution_name')
        certificate_data['issue_date'] = certificate_data.get('issue_date')
        certificate_data['expiry_date'] = certificate_data.get('expiry_date')

        certificate_hash = generate_hash(json.dumps(certificate_data))
        certificate_data['certificate_hash'] = certificate_hash
        
        # Generate QR code and save it
        qr_file_path = os.path.join(qr_folder, f"{certificate_hash}.png")
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(certificate_hash)
        qr.make(fit=True)
        qr_img = qr.make_image(fill_color="black", back_color="white")
        qr_img.save(qr_file_path)
        
        # Store the path of the QR code in the database
        certificate_data['qr_code_path'] = qr_file_path
        
        result = self.collection.insert_one(certificate_data)
        store_certificate_hash(certificate_hash)
        return result.inserted_id

    def find_certificates_by_student_id(self, student_id):
        return list(self.collection.find({'student_id': student_id}))

    def find_certificate_by_id(self, certificate_id):
        return self.collection.find_one({'_id': certificate_id})

    def find_certificates_by_institution_id(self, institution_id):
        return list(self.collection.find({'institution_id': institution_id}))

    def validate_certificate(self, certificate_id):
        certificate = self.find_certificate_by_id(certificate_id)
        if certificate:
            certificate_hash = certificate.get('certificate_hash')
            is_valid = validate_certificate_hash(certificate_id, certificate_hash)
            return is_valid
        return False

class GenerateCertificate(Resource):
    def post(self):
        data = request.get_json()
        certificate_data = {
            'student_id': data.get('student_id'),
            'name': data.get('name'),
            'course': data.get('course'),
            'grade': data.get('grade'),
            'issue_date': data.get('issue_date'),
            'expiry_date': data.get('expiry_date'),
        }
        certificate_model = CertificateModel(certificates_collection)
        certificate_id = certificate_model.create_certificate(certificate_data)
        certificate_hash = certificate_data.get('certificate_hash')
        logging.info(f"Generated certificate hash for student {data.get('student_id')}: {certificate_hash}")
        
        return jsonify({"message": "Certificate generated successfully", "certificate_id": str(certificate_id)})

class ValidateCertificate(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('hash', type=str, help='Certificate hash', required=True, location='json')

    def post(self):
        args = self.parser.parse_args()
        certificate_hash = args['hash']
        certificate = certificates_collection.find_one({'certificate_hash': certificate_hash})
        
        if certificate:
            certificate['_id'] = str(certificate['_id'])  # Convert ObjectId to string
            return {"message": "Certificate is valid", "certificate": certificate}
        else:
            return {"message": "Certificate is invalid", "certificate": None}, 400


class CertificateListByInstitution(Resource):
    def get(self, institution_id):
        certificate_model = CertificateModel(certificates_collection)
        certificates = certificate_model.find_certificates_by_institution_id(institution_id)
        formatted_certificates = []
        for certificate in certificates:
            formatted_certificate = {
                "_id": str(certificate['_id']),
                "student_id": certificate['student_id'],
                "name": certificate['name'],
                "course": certificate['course'],
                "grade": certificate['grade'],
                "certificate_hash": certificate['certificate_hash']
            }
            formatted_certificates.append(formatted_certificate)
        return jsonify(formatted_certificates)

class CertificateListByStudent(Resource):
    def get(self, student_id):
        certificate_model = CertificateModel(certificates_collection)
        certificates = certificate_model.find_certificates_by_student_id(student_id)
        formatted_certificates = []
        for certificate in certificates:
            formatted_certificate = {
                "_id": str(certificate['_id']),
                "student_id": certificate['student_id'],
                "name": certificate['name'],
                "course": certificate['course'],
                "grade": certificate['grade'],
                "certificate_hash": certificate['certificate_hash']
            }
            formatted_certificates.append(formatted_certificate)
        return jsonify(formatted_certificates)

api.add_resource(GenerateCertificate, '/generate_certificate')
api.add_resource(ValidateCertificate, '/validate_certificate')
api.add_resource(CertificateListByInstitution, '/certificates/institution/<string:institution_id>')
api.add_resource(CertificateListByStudent, '/certificates/student/<string:student_id>')
if __name__ == '__main__':
    app.run(debug=True, port=4000)