from moviepy.editor import *
from openai import OpenAI
from pydub import AudioSegment
from pydub.generators import Sine
import json

client = OpenAI(
    api_key="YOUR-OPEN-AI-KEY"
)


def ai_grading(text_input):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": """You are a helpful assistant help me checking the quality of the a single word. The text must follow these rule:
                            - No sensitive information
                            - No harmful content
                            - No inappropriate content
                            - No number or name or anything that can provide info
                            """,
            },
            {
                "role": "user",
                "content": """For each criteria, please provide a an answer in YES, NO, OR N/A format.
                            Return the score for each criteria in the following format:
                            {"sensitive_information": <ANSWER>, "harmful_content": <ANSWER>, "inappropriate_content": <ANSWER>, "leak_info": <ANSWER>}
                            If you don't have any answer, please return {}
                            Quality check for the word: """
                + text_input,
            },
        ],
    )

    json_result = response.choices[0].message.content
    try:
        return json.loads(json_result)
    except json.JSONDecodeError:
        return {}


def process_audio():
    def add_beep(audio_path, start, end, output_path):
        original_audio = AudioSegment.from_file(audio_path)

        beep_duration_ms = 1000
        frequency = 440
        beep = Sine(frequency).to_audio_segment(duration=beep_duration_ms)

        start_timestamp_ms = start
        end_timestamp_ms = end

        modified_audio = (
            original_audio[:start_timestamp_ms]
            + beep
            + original_audio[end_timestamp_ms:]
        )

        modified_audio.export(output_path, format="mp3")

    def combine_video_and_audio(video_path, audio_path, output_path):
        videoclip = VideoFileClip(video_path)
        audioclip = AudioFileClip(audio_path)

        new_audioclip = CompositeAudioClip([audioclip])
        videoclip.audio = new_audioclip
        videoclip.write_videofile(output_path)

    # Load the video
    video = VideoFileClip("video_path/VID.MOV")

    # Extract the audio from the video
    audio_file = video.audio
    audio_file.write_audiofile("output_video/output.wav")

    audio_file = open("output_video/output.wav", "rb")
    transcript = client.audio.transcriptions.create(
        file=audio_file,
        model="whisper-1",
        response_format="verbose_json",
        timestamp_granularities=["word"],
    )

    words = transcript.words

    whole_content = ""

    for word in words:
        word_str = word["word"]
        start = word["start"]
        end = word["end"]
        whole_content += word_str + " "

        ai_result = ai_grading(word_str)

        try:
            print("Word:", word_str, ai_result)
            if (
                ai_result["sensitive_information"] == "YES"
                or ai_result["harmful_content"] == "YES"
                or ai_result["inappropriate_content"] == "YES"
                or ai_result["leak_info"] == "YES"
            ):
                print("Found word to remove:", word_str)
                add_beep(
                    "output_video/output.wav", start, end, "output_audio/output.wav"
                )
        except KeyError:
            pass

    try:
        combine_video_and_audio(
            "video_path/VID.MOV", "output_audio/output.wav", "output_video/output.mp4"
        )
    except FileNotFoundError:
        pass

    try:
        whole_content_process = ai_grading(whole_content)
        return whole_content_process
    except json.JSONDecodeError:
        return {}


process_audio()
