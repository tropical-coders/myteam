from flask import Blueprint, request, jsonify
import json, uuid
from utils.validators import valid_email
from models import Users, Profile
from extension import db
from flask_jwt_extended import jwt_required, get_jwt_identity
from send_email import email_send

profile_bp=Blueprint('profile',__name__,url_prefix="/api/v1/profile")


@profile_bp.route("/",methods=["GET"])
@jwt_required()
def profile():
  data=get_jwt_identity()
  data=json.loads(data)
  user=Users.query.get(data["userid"])
  if not user:
    return jsonify({"success":False,"message": "invalid access"}), 400

  profile = Profile.query.get(user.email)
  if not profile:
    return jsonify({"success":False,"message": "something went wrong"}), 400

  if profile.status=="inactive":
    return jsonify({"success":False,"message": "varify your email to update profile"}), 400
  output={ "f_name":profile.f_name,"l_name":profile.l_name,"code":profile.code,"mobile":profile.mobile,"country":profile.country,"city":profile.city,"pin":profile.pin,"company":profile.company,"role":profile.role ,"image":profile.image}
  return jsonify({"success":True,"message":"profile found", "data":output}), 200


@profile_bp.route("/",methods=["POST"])
@jwt_required()
def profile_update():
  data=get_jwt_identity()
  data=json.loads(data)
  user=Users.query.get(data["userid"])
  if not user:
    return jsonify({"success": False,"message": "invalid access"}), 400

  profile = Profile.query.get(user.email)
  if not profile:
    return jsonify({"success": False,"message": "something went wrong"}), 400

  if profile.status=="inactive":
    return jsonify({"success": False,"message": "varify your email to update profile"}), 400

  try:
    inputs=request.json
  except:
    return jsonify({"success": False,"message": "missing parameter"}), 400


  f_name = inputs.get("f_name")
  l_name = inputs.get("l_name")
  code = inputs.get("code")
  mobile = inputs.get("mobile")
  country = inputs.get("country")
  city = inputs.get("city")
  pin = inputs.get("pin")
  company = inputs.get("company")
  role = inputs.get("role")
  image = inputs.get("image")


  if not f_name or not l_name or not code or not mobile or not country or not city or not pin or not company or not role or not image:
    return jsonify({"success": False,"message": "missing parameter"}), 400

  return jsonify({"success":True,"message":"profile found"}), 200
