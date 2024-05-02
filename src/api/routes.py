"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['GET'])
@jwt_required()
def handle_hello():

    email = get_jwt_identity()
    response_body = {
        "message": "Hello, "+email+ "! You are logged in! Check out the private space"
    }

    return jsonify(response_body), 200

@api.route("/signup", methods=['POST'])
def signup():
    data = request.json
    query_result = User.query.filter_by(email=data["email"]).first()
    email = request.json.get("email", None)
    if query_result is None:
        new_user = User(email=data["email"], password=data["password"], is_active=True)
        db.session.add(new_user)
        db.session.commit()
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token), 200
    
    else:
        return jsonify({"msg": "This user already exists"}), 418
    
    

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if not email or not password:
        return jsonify({"msg:": "email and password are required"}), 404
    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        return jsonify({"msg": "Username or password incorrect"}), 401
    
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    if user is None:
        raise APIException("User not found", status_code=404)
    return jsonify("User authenticated"), 200