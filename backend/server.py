import socket
from concurrent.futures import ThreadPoolExecutor
import os
import cv2
import easyocr
import json
import numpy as np

class server:
    def __init__(self, host='0.0.0.0', port=8009, max_workers=10):
        self.server_address = (host, port)
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.sock.bind(self.server_address)
        self.sock.listen(5)
        self.executor = ThreadPoolExecutor(max_workers=max_workers)
        self.cn = 0

    def start(self):
        print(f"Server started at {self.server_address}")
        while True:
            client_socket, client_address = self.sock.accept()
            print(f"Connection from {client_address}")
            self.handle_client(client_socket)

    def handle_client(self, client_socket):
        video_data = b""
        client_socket.settimeout(10)
        try:
            while True:
                data = client_socket.recv(4096)
                eof_marker = b"\xfe\xff\xfe\xff\xfe\xff\xfe\xff\xfe\xff\xfe\xff\xfe\xff\xfe\xff"
                    
                eof_index = data.find(eof_marker)
                if eof_index!= -1:
                    break
                video_data += data
            print("I am here")
            # Save the received video
            
            video_path = self.save_video(video_data)
            print(f"Received video data of length {len(video_data)}")
            # Process video to detect and blur words
            processed_video_path = self.process_video(video_path)
            # Send the processed video back to the client
            self.send_video_back(client_socket, processed_video_path)
        finally:
            client_socket.close()

    def save_video(self, video_data):
        filename = os.path.join('received_videos', f'received_video_{self.generate_unique_id()}.mp4')
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        with open(filename, 'wb') as file:
            file.write(video_data)
        return filename

    def generate_unique_id(self):
        self.cn = self.cn + 1
        return self.cn

    def process_video(self, input_video_path, extend_frames=3):
        cap = cv2.VideoCapture(input_video_path)
        reader = easyocr.Reader(['en'], gpu=True)
        word_frame_dict = {}
        frames = []
        frame_number = 0
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            results = reader.readtext(frame)
            for bbox, text, prob in results:
                if prob > 0.05:
                    if text not in word_frame_dict:
                        word_frame_dict[text] = []
                    bbox_converted = [(int(point[0]), int(point[1])) for point in bbox]
                    extended_frames = [(fn, bbox_converted) for fn in range(max(0, frame_number - extend_frames), frame_number + extend_frames + 1)]
                    word_frame_dict[text].extend(extended_frames)

            frames.append(frame)
            print(frame_number)
            frame_number += 1

        cap.release()
        output_video_path = self.blur_video(frames, "out.mp4", 31, word_frame_dict)  # Adjust blur radius and output path as needed
        return output_video_path

    def blur_video(self, frames, output_video_path, blur_radius, word_frame_dict):
        if not frames:
            return
        frame_height, frame_width, _ = frames[0].shape
        fps = 30
        fourcc = cv2.VideoWriter_fourcc(*"mp4v")
        out = cv2.VideoWriter(output_video_path, fourcc, fps, (frame_width, frame_height))

        for frame_number, frame in enumerate(frames):
            for word, details in word_frame_dict.items():
                for frame_num, bbox in details:
                    if frame_number == frame_num:
                        top_left, bottom_right = (bbox[0], bbox[2])
                        top_left = (max(top_left[0] - 50, 0), max(top_left[1] - 50, 0))
                        bottom_right = (min(bottom_right[0] + 50, frame_width), min(bottom_right[1] + 50, frame_height))
                        roi = frame[top_left[1]:bottom_right[1], top_left[0]:bottom_right[0]]
                        blurred_roi = cv2.GaussianBlur(roi, (blur_radius, blur_radius), 0)
                        frame[top_left[1]:bottom_right[1], top_left[0]:bottom_right[0]] = blurred_roi

            out.write(frame)

        out.release()
        return output_video_path

    def send_video_back(self, client_socket, video_path):
        with open(video_path, 'rb') as video_file:
            while (chunk := video_file.read(4096)):
                client_socket.sendall(chunk)

if __name__ == "__main__":
    srv = server()
    srv.start()
