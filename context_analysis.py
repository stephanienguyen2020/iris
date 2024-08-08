from moviepy.editor import *
from openai import OpenAI
from pydub import AudioSegment
from pydub.generators import Sine
import json
import cv2
import base64
from openai import OpenAI
from dotenv import load_dotenv


client = OpenAI(
    api_key="sk-S5QFrzH_v_tZ0hwntioauCt1asDHbyBkBa5yeyHbwET3BlbkFJO5xfFrJ_2SOJ_zfAIjSMVFP5GHybC7FuEHUWfXmo0A"
)


def context_analysis(video_path):
    video = cv2.VideoCapture(video_path)

    base64Frames = []
    while video.isOpened():
        success, frame = video.read()
        if not success:
            break
        _, buffer = cv2.imencode(".jpg", frame)
        base64Frames.append(base64.b64encode(buffer).decode("utf-8"))

    PROMPT_MESSAGES = [
        {
            "role": "user",
            "content": [
                """You are a helpful assistant help me checking the quality of the a video. The text must follow these rule:
                            - No sensitive information
                            - No harmful content
                            - No inappropriate content
                            - No number or name or anything that can provide info
                            
            For each criteria, please provide a an answer in YES, NO, OR N/A format.
                            Return the score for each criteria in the following format:
                            {"sensitive_information": <ANSWER>, "harmful_content": <ANSWER>, "inappropriate_content": <ANSWER>, "leak_info": <ANSWER>}
                
                            """,
                *map(lambda x: {"image": x, "resize": 768}, base64Frames[0::50]),
            ],
        },
    ]
    params = {
        "model": "gpt-4o",
        "messages": PROMPT_MESSAGES,
        "max_tokens": 200,
    }

    video.release()
    result = client.chat.completions.create(**params).choices[0].message.content

    return json.loads(result)

print(context_analysis("video_path/VID.mov"))
