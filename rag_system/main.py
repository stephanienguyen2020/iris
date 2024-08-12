# main.py

from firebase_setup import initialize_firebase
from embedding_utils import get_embedding_model, generate_embedding
from retrieve_documents import retrieve_relevant_documents
from categorize_pii import categorize_pii
from google.cloud import aiplatform

def initialize_gemini():
    """
    Initialize and configure the Gemini LLM client.
    """
    # Set up your Google Cloud project and specify the endpoint
    aiplatform.init(project='your-project-id', location='us-central1')

    # Load the model from the AI platform
    model = aiplatform.Model('projects/your-project-id/locations/us-central1/models/gemini-model-id')
    return model

def main():
    # Initialize Firebase
    db = initialize_firebase()

    # Load embedding model
    model = get_embedding_model()

    # Initialize Gemini LLM
    llm_model = initialize_gemini()

    # Sample input text
    input_text = "Sample text containing PII."

    # Generate embedding for input text
    input_embedding = generate_embedding(input_text, model)

    # Retrieve relevant documents from Firebase
    relevant_docs = retrieve_relevant_documents(input_embedding, db)

    # Categorize PII using the Gemini LLM, including document context
    pii_categories = categorize_pii(input_text, relevant_docs, llm_model)

    print("Identified PII Categories:")
    for category, items in pii_categories.items():
        print(f"{category}: {', '.join(items)}")

if __name__ == "__main__":
    main()
