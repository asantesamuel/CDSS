import tensorflow as tf
import numpy as np
from PIL import Image
from keras.applications.efficientnet import preprocess_input

import torch
import torch.nn as nn
import torchvision.transforms as transforms
import segmentation_models_pytorch as smp

# Model for prediction
model = tf.keras.models.load_model("dicom_classifier_best_20250728_140953.h5")



class_names = ['Ischeamic', 'Normal']

def preprocess_image(image_file):
    image = Image.open(image_file)
    image = image.convert("RGB")
    image = image.resize((224, 224))
    
    raw_array = np.array(image)
    
    # ✅ Use EfficientNet preprocessing instead of dividing by 255
    image_array = preprocess_input(raw_array)
    
    # Add batch dimension
    image_array = np.expand_dims(image_array, axis=0)
    return image_array

def predict(image_file):
    x = preprocess_image(image_file)
    raw_preds = model.predict(x)            # shape (1, 2)
    print("Raw model output:", raw_preds)   # useful for debugging
    print(np.max(raw_preds))
    if np.min(raw_preds) < 0.001:
        return "invalid"
    
    # Because the model was trained with 2 sigmoid outputs (not softmax),
    # convert the two scores into a normalized probability distribution:
    probs = tf.nn.softmax(raw_preds[0]).numpy()   # sums to 1
    print("Softmax probabilities:", probs)

    ischemic_prob = float(probs[0] * 100)  # %
    normal_prob = float(probs[1] * 100)    # %

    if normal_prob > 60:
        predicted_class = "Normal"
        confidence = normal_prob
    else:
        predicted_class = "Ischeamic"
        confidence = ischemic_prob

    """ idx = int(np.argmax(probs))
    predicted_class = class_names[idx]
    confidence = float(probs[idx])  # in [0,1] """

    # Return both predicted + full prob map for transparency
    prob_map = {name: round(float(p) * 100, 2) for name, p in zip(class_names, probs)}

    return {
        "predicted_class": predicted_class,
        "confidence": f"{round(confidence, 2)}%",
        "probabilities_percent": prob_map
    }

# Segmentation model
device = "cpu"
seg_model = smp.Unet(
    encoder_name="resnet34",
    encoder_weights="imagenet",
    in_channels=3,
    classes=1
).to(device)

checkpoint = torch.load("best_segmentation_model.pth", map_location=device)
if "model_state_dict" in checkpoint:
    seg_model.load_state_dict(checkpoint["model_state_dict"])
else:
    seg_model.load_state_dict(checkpoint)
seg_model.eval()

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

def seg_preprocess(image_file):
    image = Image.open(image_file).convert("RGB")
    orig_size = image.size  # (W, H) of original image
    
    # Preprocess for model
    tensor = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        output = seg_model(tensor)
        mask = torch.sigmoid(output).squeeze().cpu().numpy()

    mask = (mask > 0.3).astype(np.uint8)

    # Resize mask back to original image size
    mask_resized = Image.fromarray(mask * 255).resize(orig_size, resample=Image.NEAREST)
    mask_resized = np.array(mask_resized) // 255  # back to 0/1

    orig = np.array(image)

    # Apply overlay
    overlay = orig.copy()
    overlay[mask_resized == 1] = [255, 0, 0]  # red overlay

    blended = (0.6 * orig + 0.4 * overlay).astype(np.uint8)

    return blended
