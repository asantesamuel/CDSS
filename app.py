from flask import Flask, request, jsonify
from flask_cors import CORS
from model_utils import predict

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict_api():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part', "file": request.files}), 400

    file = request.files['file']
    result = predict(file)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
