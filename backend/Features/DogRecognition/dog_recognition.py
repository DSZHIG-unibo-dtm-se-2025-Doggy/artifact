from transformers import pipeline
from PIL import Image

class DogRecognitionModel:
    def __init__(self):
        self.model = pipeline(
            "image-classification",
            model="google/vit-base-patch16-224"
        )

    def predict(self, image_path: str):
        img = Image.open(image_path)
        results = self.model(img)
        return results[:3]   # return 3 predictions