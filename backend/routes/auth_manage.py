from flask import Blueprint, request, jsonify, make_response
import json, uuid, random
from utils.validators import valid_email
from models import Users, Profile
from extension import db
from utils.password import hash_password, verify_password
from flask_jwt_extended import create_access_token, set_access_cookies, jwt_required, get_jwt_identity
from send_email import email_send

auth_bp=Blueprint('auth',__name__,url_prefix="/api/v1")

@auth_bp.route("/register",methods=["GET", "POST"])
def register():
    data = request.json
    email = data.get("email")
    password = data.get("password").strip()

    if not email or not password:
        return jsonify({"success":False,"message":"missing parameter"}), 400

    if not valid_email(email):
        return jsonify({"success":False,"message":"invalid email format"}), 400

    if len(password)<6:
        return jsonify({"success":False,"message":"password should be minimum 6 characters"}), 400
    existing_user = Users.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"success":False,"message": "An account with this email already exists"}), 409

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
    return jsonify({"success":True,"message":"your account got created"}), 200


@auth_bp.route("/login",methods=["GET", "POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password").strip()

    if not email or not password:
        return jsonify({"success":False,"message":"missing parameter"}), 400

    if not valid_email(email):
        return jsonify({"success":False,"message":"invalid email format"}), 400

    account = Users.query.filter_by(email=email).first()
    if not account:
        return jsonify({"success":False,"message":"invalid credentials"}), 400

    if not verify_password(password, account.password.encode('utf-8')):
        return jsonify({"success":False,"message":"invalid credentials"}), 400

    profile = Profile.query.get(account.email)
    if not profile:
     return jsonify({"success":False,"message": "something went wrong"}), 400

    if profile.status=="offline":
      profile.status='online'
      db.session.commit()

    data=json.dumps({"userid":account.userid, "role":"user"})
    access_token = create_access_token(data)
    response = make_response(jsonify({"success":True,"message": "Login successful"}), 200)

    set_access_cookies(response, access_token)
    return response


@auth_bp.route("/verify",methods=["GET"])
@jwt_required()
def send_otp():
  data=get_jwt_identity()
  data=json.loads(data)
  user=Users.query.get(data["userid"])
  if not user:
    return jsonify({"success":False,"message": "invalid access"}), 400

  profile = Profile.query.get(user.email)
  if not profile:
    return jsonify({"success":False,"message": "something went wrong"}), 400

  if profile.status!="inactive":
    return jsonify({"success":False,"message": "your email is already verified"}), 400

  otp=""
  for i in range(1,6):
    otp+=str(random.randint(0,10))
  profile.code=otp
  db.session.commit()
  info=json.dumps({"otp":otp,"to":user.email})
  email_send(info)
  return jsonify({"success":True,"message":"OTP has been sent to registered email"}), 200


@auth_bp.route("/verify",methods=["POST"])
@jwt_required()
def verify_otp():
  data=get_jwt_identity()
  data=json.loads(data)
  user=Users.query.get(data["userid"])
  if not user:
    return jsonify({"success":False,"message": "invalid access"}), 400

  profile = Profile.query.get(user.email)
  if not profile:
    return jsonify({"success":False,"message": "something went wrong"}), 400
  if profile.status!="inactive":
    return jsonify({"success":False,"message": "your email is already verified"}), 400

  try:
   inputs=request.json
   otp = inputs.get("otp")
  except:
   return jsonify({"success":False,"message": "missing parameter"}), 400
  if not otp:
    return jsonify({"success":False,"message": "missing parameter"}), 400

  if len(otp) != 5:
    return jsonify({"success":False,"message": "invalid otp"}), 400

  if otp != profile.code:
    return jsonify({"success":False,"message": "invalid otp"}), 400
  profile.code=""
  profile.status = "online"
  db.session.commit()
  return jsonify({"success":True,"message":"email has been verified"}), 200


@auth_bp.route("/status",methods=["GET"])
@jwt_required()
def status():
  data=get_jwt_identity()
  data=json.loads(data)
  user=Users.query.get(data["userid"])
  if not user:
    return jsonify({"success":False,"message": "invalid access"}), 400

  return jsonify({"success":True,"role":data["role"], "message":"user logged in"}), 200
