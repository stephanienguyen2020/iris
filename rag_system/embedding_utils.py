# embedding_utils.py

from sentence_transformers import SentenceTransformer

def get_embedding_model():
    # Load a pre-trained sentence transformer model
    model = SentenceTransformer('all-MiniLM-L6-v2')
    return model

def generate_embedding(text, model):
    # Generate an embedding for a given text
    return model.encode(text, convert_to_tensor=True).tolist()
