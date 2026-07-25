from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/send", methods=["POST"])
def send_message():
    data = request.get_json()
    name = data.get("name", "名無し")
    message = data.get("message", "")

    # AI返信なし → 空の返事を返す
    return jsonify({"reply": ""})

@app.route("/")
def home():
    return "Neon Chat Server is running!"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
