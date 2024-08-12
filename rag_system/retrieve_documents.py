# retrieve_documents.py

import numpy as np
from scipy.spatial.distance import cosine
from firebase_setup import initialize_firebase

def retrieve_relevant_documents(query_embedding, db, top_k=5):
    docs_ref = db.collection('documents')
    all_docs = docs_ref.stream()

    results = []
    for doc in all_docs:
        doc_data = doc.to_dict()
        doc_embedding = doc_data.get('embedding')
        
        if doc_embedding:
            similarity = 1 - cosine(query_embedding, doc_embedding)
            results.append((doc_data['text'], similarity))

    # Sort results based on similarity score and return top_k results
    results.sort(key=lambda x: x[1], reverse=True)
    return [text for text, _ in results[:top_k]]
