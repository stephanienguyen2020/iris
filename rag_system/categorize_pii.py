# categorize_pii.py

from google.cloud import aiplatform

def create_pii_prompt(text, relevant_docs):
    """
    Create a prompt for the LLM to identify and categorize PII in the text,
    including relevant document context.
    """
    # Combine the input text with the retrieved document content
    documents_context = "\n".join([f"- {doc}" for doc in relevant_docs])
    
    prompt = (
        "Analyze the following text and identify any Personally Identifiable Information (PII). "
        "Categorize the PII into the following categories: Identity Document, Credit Card Information, "
        "Financial Information, Medical Information, Location Information, License Plates, Additional Information.\n\n"
        f"Text: \"{text}\"\n\n"
        "Additional Context from Related Documents:\n"
        f"{documents_context}\n\n"
        "Provide the results in the format:\n"
        "Identity Document: [...]\n"
        "Credit Card Information: [...]\n"
        "Financial Information: [...]\n"
        "Medical Information: [...]\n"
        "Location Information: [...]\n"
        "License Plates: [...]\n"
        "Additional Information: [...]\n"
    )
    return prompt

def categorize_pii(text, relevant_docs, llm_model):
    """
    Use Google's Gemini LLM to identify and categorize PII in the text.
    """
    # Construct the prompt with document context
    prompt = create_pii_prompt(text, relevant_docs)

    # Send the prompt to the Gemini LLM and get the response
    response = llm_model.predict(
        prompt=prompt,
        max_output_tokens=500,
        temperature=0.2
    )

    # Parse the response to extract PII categories
    categories = {
        "Identity Document": [],
        "Credit Card Information": [],
        "Financial Information": [],
        "Medical Information": [],
        "Location Information": [],
        "License Plates": [],
        "Additional Information": []
    }

    # Example parsing logic (depends on actual response structure)
    for line in response.split('\n'):
        if line.startswith("Identity Document:"):
            categories["Identity Document"] = extract_entities(line)
        elif line.startswith("Credit Card Information:"):
            categories["Credit Card Information"] = extract_entities(line)
        elif line.startswith("Financial Information:"):
            categories["Financial Information"] = extract_entities(line)
        elif line.startswith("Medical Information:"):
            categories["Medical Information"] = extract_entities(line)
        elif line.startswith("Location Information:"):
            categories["Location Information"] = extract_entities(line)
        elif line.startswith("License Plates:"):
            categories["License Plates"] = extract_entities(line)
        elif line.startswith("Additional Information:"):
            categories["Additional Information"] = extract_entities(line)

    return categories

def extract_entities(line):
    """
    Extract entities from a line of LLM response text.
    """
    entities = line.split(': ')[1].strip('[]')
    return entities.split(', ') if entities else []
