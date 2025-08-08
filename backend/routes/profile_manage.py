from flask import Blueprint, request, jsonify
import json, uuid
from utils.validators import valid_email
from models import Users, Profile
from extension import db
from flask_jwt_extended import jwt_required, get_jwt_identity

profile_bp=Blueprint('profile',__name__,url_prefix="/api/v1/profile")


@profile_bp.route("/",methods=["GET"])
@jwt_required()
def profile():
  data=get_jwt_identity()
  data=json.loads(data)
  user=Users.query.get(data["userid"])
  if not user:
    return jsonify({"message": "invalid access"}), 400

  profile = Profile.query.get(user.email)
  if not profile:
    return jsonify({"message": "something went wrong"}), 400

  if profile.status=="inactive":
    return jsonify({"message": "varify your email to update profile"}), 400
  return jsonify({"message":"profile found"}), 200
