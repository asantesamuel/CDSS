import tensorflow as tf
import numpy as np
from PIL import Image

model = tf.keras.models.load_model("dicom_classifier_best_20250728_140953.h5")

class_names = ['Ischemia', 'Normal']

def preprocess_image(image_file):
    image = Image.open(image_file)
    image = image.convert("RGB")
    image = image.resize((224, 224))

    raw_array = np.array(image)

    image_array = raw_array / 255.0  # normalize

    image_array = np.expand_dims(image_array, axis=0)  # (1, 150, 150, 3)

    return image_array

def predict(image_file):
    image = preprocess_image(image_file)
    predictions = model.predict(image)
    predicted_class = class_names[np.argmax(predictions[0])]
    confidence = float(np.max(predictions[0]))

    return {
        "predicted_class": predicted_class,
        "confidence": confidence
    }
