from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from model_utils import predict, seg_preprocess
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict_api():
    if 'image' not in request.files:
        return jsonify({'message': 'No file part'}), 400

    file = request.files['image']
    result = predict(file)

    if result == "invalid":
        return jsonify({'message': 'Invalid image entered'}), 400
    
    return jsonify(result)

@app.route('/segment', methods=["POST"])
def segment():
    if "image" not in request.files:
        return jsonify({"message": "No file part", "status": 400}), 400
    
    file = request.files["image"]
    blended = seg_preprocess(file)

    img = Image.fromarray(blended)
    img_io = io.BytesIO()
    img.save(img_io, "PNG")
    img_io.seek(0)

    return send_file(img_io, mimetype="image/png")

if __name__ == '__main__':
    app.run(debug=True)
