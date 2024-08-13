# Iris

**License**: MIT  
**Author**: @chrislevn @stephanienguyen2020 @Deepthamaalolan @LiyuZer
## Overview
Iris is a project designed to create a censorship engine for social media, focusing on redacting sensitive content within videos in mass.
![Flow Image](/images/flow.png)
## Built With
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)
![OpenCV](https://img.shields.io/badge/OpenCV-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini-00A1E0?style=for-the-badge&logo=gemini&logoColor=white)
![Google Cloud Storage](https://img.shields.io/badge/Google%20Cloud%20Storage-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white)
![Google Cloud](https://img.shields.io/badge/Google%20Cloud-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white)
![Vertex AI](https://img.shields.io/badge/Vertex%20AI-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white)
![EasyOcr](https://img.shields.io/badge/EasyOcr-FFD700?style=for-the-badge&logo=easyocr&logoColor=black)
![Firebase Database](https://img.shields.io/badge/Firebase%20Database-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)
## Motivation
Millions of users share videos, short-form content, and create stories on social media everyday. YouTube alone has approximately 122 million daily active users all over the world. However, the current system struggles to detect and remove sensitive information in real-time. Videos containing passwords and personally identifiable information (so called PII) like addresses and credit card details are frequently taken down only after user reports, which can be too late since the information has already been leaked.
As human moderation becomes increasingly challenging, computerized supervision is essential. Iris serves as a fully autonomous system that enables companies and users to blur out sensitive information seamlessly. We wanted to create a special censorship engine that will sanitize a video so that we wouldn't have to do it ourselves, solving the problem at its source.

## Features
- **Detailed Quality Check**: Utilizes Gen AI to scan through detected words and audio clips, summarizing the content identified.
- **OCR, Gemini 1.5 Pro, and Vertex AI API Integration**: Employs Easy OCR models for text detection in videos, Vertex AI for Vetor Search (RAG), Gemini 1,5 Pro for sensitive info detection from a semantic perspective
- **Video Censorship**: Automatically blurs regions of interest containing sensitive information.
- **Sample UI**: Demonstrates the censorship process through a sample user interface.

## Getting Started
1. Clone the repository:
  git clone [repository-url]
2. Install the required packages:
  pip install -r requirements.txt
3. Create environment
    touch .env
    echo GEMINI_API_KEY=[Your API Key] > .env

# Running the Backend
  1. Navigate to the backend directory:
      cd backend
  2. Install the necessary dependencies:
      npm install
  3. Start the backend server:
      node app.js
  The client API will now be listening for requests.

# Running the Frontend
  1. Navigate to the frontend directory:
      cd frontend
  2. Install the necessary dependencies:
      npm install
  3. Start the frontend application:
      npm start  # or `npm run dev` for development mode
  This will open the webpage for the user to upload videos.

## Actual Prompt:
```
        You are a helpful assistant helping me check the quality of a inputted text. The text must follow these rules:

        Additionally, the AI model receives a video file for analysis, with the objective of identifying sensitive information such as Personally Identifiable Information (PII) and passwords, keys. The model should account for text and information that may be occluded, mirrored, difficult to see, or subtle.

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
        The AI model should carefully examine the video to identify various types of PII, accounting for cases where the information is occluded, mirrored, difficult to see, or subtle. The model should provide detailed explanations, specific examples, and qualitative risk assessments (High, Medium, Low) for each category. The analysis should consider the visibility and potential misuse of the information.
```

### Purpose of the Prompt: 
This prompt is designed to instruct an AI model to analyze a video and identify sensitive information with a high level of detail and accuracy. The AI must account for various challenges, such as information that is occluded (partially hidden), mirrored, difficult to see, or presented subtly. The goal is to ensure that no PII is overlooked, even in complex scenarios.
### Key Components of the Prompt:
#### Input Description:
The AI is informed that the video may contain PII in forms that are not immediately obvious. This includes cases where text might be mirrored, hidden, or subtly embedded in the video. The AI needs to detect and account for these challenges during its analysis.
#### Output Requirements:
- Location Information: The AI must identify any data that reveals someone's physical location, such as addresses or landmarks. Special attention is given to details that may be obscured or mirrored. The AI will also provide specific examples or frames where this information is detected and assess the risk level.
- ID Information: The AI is tasked with detecting identification documents or numbers, like passports or social security numbers, even if they are partially hidden or difficult to see. The AI will describe the type of ID detected and evaluate the risk of misuse.
- Medical Information: The AI will look for any medical-related information, such as prescriptions or medical devices, and provide context around the challenges in visibility. The risk of exposure is then assessed.
- Financial Information: The AI is responsible for identifying financial data, such as credit card numbers or bank statements, even if they are hard to see or mirrored. The prompt ensures that the AI describes the financial information detected and assesses its sensitivity.
- Additional PII Categories: This catch-all category ensures that the AI identifies any other types of PII that don't fall into the previous categories. This could include emails, phone numbers, or personal photos. The AI must provide examples and assess the risk of exposure.

### Task Description:
The AI is required to perform a thorough examination of the video to identify all relevant PII, considering various challenges like occluded or mirrored content. The AI should not only detect the PII but also provide a detailed explanation of its findings, specific examples, and a qualitative risk assessment (High, Medium, Low) for each category of PII detected.
### Why This Matters: 
In scenarios where PII is hidden or presented subtly, it is crucial that the AI model goes beyond simple detection. The prompt ensures that the AI considers various complexities and provides detailed, actionable insights that can be used to mitigate the risks associated with exposing sensitive information in videos.

## License
Released under the MIT License.

## Disclaimer
Please note that while Iris strives for accurate censorship, there may still be instances where videos contain inappropriate content due to errors in the censorship process.
