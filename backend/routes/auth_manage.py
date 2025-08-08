from flask import Blueprint, request, jsonify, make_response
import json, uuid
from utils.validators import valid_email
from models import Users, Profile
from extension import db
from utils.password import hash_password, verify_password
from flask_jwt_extended import create_access_token, set_access_cookies

auth_bp=Blueprint('auth',__name__,url_prefix="/api/v1")

@auth_bp.route("/register",methods=["GET", "POST"])
def register():
    data = request.json
    email = data.get("email")
    password = data.get("password").strip()

    if not email or not password:
        return jsonify({"error":"missing parameter"}), 400

    if not valid_email(email):
        return jsonify({"error":"invalid email format"}), 400

    if len(password)<6:
        return jsonify({"error":"password should be minimum 6 characters"}), 400
    existing_user = Users.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "An account with this email already exists"}), 409

    hashed_password = hash_password(password)
    userid = str(uuid.uuid4())

    new_user = Users(
        userid=userid,
        email=email,
        password=hashed_password.decode('utf-8')
    )

    new_profile = Profile(
       email=email
    )
    db.session.add(new_user)
    db.session.add(new_profile)
    db.session.commit()
    return jsonify({"message":"your account got created"}), 200


@auth_bp.route("/login",methods=["GET", "POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password").strip()

    if not email or not password:
        return jsonify({"error":"missing parameter"}), 400

    if not valid_email(email):
        return jsonify({"error":"invalid email format"}), 400

    account = Users.query.filter_by(email=email).first()
    if not account:
        return jsonify({"error":"invalid credentials"}), 400

    if not verify_password(password, account.password.encode('utf-8')):
        return jsonify({"error":"invalid credentials"}), 400

    data=json.dumps({"userid":account.userid, "role":"user"})
    access_token = create_access_token(data)
    response = make_response(jsonify({"message": "Login successful"}), 200)

    set_access_cookies(response, access_token)
    return response
