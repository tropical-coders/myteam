from flask import Blueprint

auth_bp=Blueprint('auth',__name__,url_prefix="/api/v1")

@auth_bp.route("/login",methods=["GET"])
def login():
  return "hello"
