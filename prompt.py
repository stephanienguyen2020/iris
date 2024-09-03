prompt_ai = f"""
        You are a helpful assistant helping me check the quality of an inputted text. The text must follow these rules:

        Additionally, the AI model receives a video file for analysis, with the objective of identifying Personally Identifiable Information (PII). The model should account for text and information that may be occluded, mirrored, difficult to see, or subtle.

        The output should meet the following requirements:

        PII:
        - Location:
            - Explanation: Identify any information that could reveal a person's physical location. This includes addresses, recognizable landmarks, GPS coordinates, or any visual cues that may indicate where someone is located or resides. The model should be sensitive to location details that may be partially obscured, mirrored, or presented subtly.
            - Details: Provide specific examples or frames where location information is detected, especially in challenging cases like occluded or mirrored text.
            - Score: Assign a risk level (High, Medium, Low) based on the sensitivity and specificity of the location information identified.
        - ID:
            - Explanation: Detect any form of identification numbers or documents. This includes passports, driver's licenses, social security numbers, employee badges, or any visible documentation that contains unique identifiers. The model should consider IDs that may be partially hidden, difficult to discern, or mirrored.
            - Details: Describe the type of identification detected, including challenging cases like occluded or hard-to-see details, and its potential implications.
            - Score: Evaluate and assign a risk level (High, Medium, Low) based on the potential misuse of the identification information.
        - MedicalInformation:
            - Explanation: Identify any medical-related information. This includes visible documents, prescriptions, medical devices, or any discussion of medical conditions that could be tied to an individual. The model should be aware of medical information that is partially obscured or presented in a subtle manner.
            - Details: Provide context around the medical information identified, including any challenges in visibility or subtlety, and discuss the potential implications.
            - Score: Assign a risk level (High, Medium, Low) based on the sensitivity of the medical information and the risk of exposure.
        - FinancialInformation:
            - Explanation: Detect any financial information present in the video. This includes credit card numbers, bank statements, visible checkbooks, financial transaction details, or any discussion of personal financial matters. The model should identify financial data that may be obscured, mirrored, or hard to see.
            - Details: Describe the financial information detected, including difficult-to-discern cases, and assess potential risks.
            - Score: Evaluate the risk level (High, Medium, Low) based on the type and sensitivity of the financial information found.
        - AdditionalPIICategories:
            - Explanation: Identify any other forms of PII not covered in the previous categories. This could include personal emails, phone numbers, personal photos, or any other information that can be used to uniquely identify an individual. The model should be attentive to subtle or hard-to-see PII, including occluded or mirrored content.
            - Details: Provide examples and context for the additional PII detected, explaining its potential risks, especially in cases where the PII is subtle or partially hidden.
            - Score: Assess and assign a risk level (High, Medium, Low) based on the potential impact of the additional PII.

        Passwords & Keys:
        - Passwords:
            - Explanation: Identify any forms of passwords. The model should be attentive to subtle or hard-to-see PII, including occluded or mirrored content.
            - Details: Provide examples and context for the additional password detected, explaining its potential risks, especially in cases where the PII is subtle or partially hidden.
            - Score: Assess and assign a risk level (High, Medium, Low) based on the potential impact of the additional password.
        - Keys: 
            - Explanation: Identify any other forms of keys for authentication. This could include personal emails, phone numbers, personal photos, or any other information that can be used to uniquely identify an individual. The model should be attentive to subtle or hard-to-see PII, including occluded or mirrored content.
            - Details: Provide examples and context for the additional PII detected, explaining its potential risks, especially in cases where the PII is subtle or partially hidden.
            - Score: Assess and assign a risk level (High, Medium, Low) based on the potential impact of the additional PII.
        
        Task Description:
        The AI model should carefully examine the video to identify various types of PII, passwords & keys, accounting for cases where the information is occluded, mirrored, difficult to see, or subtle. The model should provide detailed explanations, specific examples, and qualitative risk assessments (High, Medium, Low) for each category. 
        The analysis should consider the visibility and potential misuse of the information. If there's other sensitive information that does not belong to those categories, like software names, put them in the Others category.
        
        """

