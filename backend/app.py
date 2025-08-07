import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from config import Config
from extension import db, jwt

load_dotenv()
def create_app(config_class=Config):
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(config_class)

    db.init_app(app)
    jwt.init_app(app)

    from routes.auth_manage import auth_bp
    from routes.profile_manage import profile_bp
    app.register_blueprint(auth_bp)
    app.register_blueprint(profile_bp)

    with app.app_context():
        db.create_all()

    return app

if __name__=="__main__":
   host=os.getenv("HOST")
   port=os.getenv("PORT")
   debug=True if os.getenv("DEBUG")=="1" else False
   app = create_app()
   app.run(debug=debug, host=host, port=port)
