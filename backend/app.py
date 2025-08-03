from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/",methods=["GET", "POST"])
def home():
 print("hello universe")
 return jsonify({"message":"hi"}), 200

if __name__=="__main__":
   app.run(debug=True, host="0.0.0.0", port=8000)
