from flask import Blueprint, request, jsonify
import json, uuid
from utils.validators import valid_email
from models import Users
from extension import db
from flask_jwt_extended import jwt_required, get_jwt_identity

profile_bp=Blueprint('profile',__name__,url_prefix="/api/v1/profile")


@profile_bp.route("/",methods=["GET"])
@jwt_required()
def profile():
  data=get_jwt_identity()
  data=json.loads(data)
  return jsonify({"role": data["role"], "userid": data["userid"]}), 200
