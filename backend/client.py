import socket
from time import sleep
import json

class VideoClient:
    def __init__(self, server_host, server_port, video_path, save_path):
        self.server_host = server_host
        self.server_port = server_port
        self.video_path = video_path
        self.save_path = save_path
        self.sock = None

    def connect(self):
        """Connects to the server."""
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.sock.connect((self.server_host, self.server_port))
        print("Connected to server.")

    def send_video(self):
        """Sends a video file to the server."""
        try:
            with open(self.video_path, 'rb') as file:
                while True:
                    chunk = file.read(4096)
                    sleep(0.009)
                    if not chunk:
                        break
                    self.sock.sendall(chunk)
            self.sock.sendall(b"\xfe\xff\xfe\xff\xfe\xff\xfe\xff\xfe\xff\xfe\xff\xfe\xff\xfe\xff")
            print("Video sent successfully.")
        except Exception as e:
            print(f"Failed to send video: {e}")

    def receive_frame_dict(self):
        """Receives the frame dictionary from the server."""
        self.sock.settimeout(500)
        data = b''
        try:
            while True:
                packet = self.sock.recv(4096)
                data += packet
                if b'\0' in data:
                    data = data.split(b'\0')[0]
                    break
            print("Frame dictionary received successfully.")
            # Convert the received bytes back to a dictionary
            word_frame_json = data.decode('utf-8')
            word_frame_dict = json.loads(word_frame_json)
            return word_frame_dict
        except Exception as e:
            print(f"Failed to receive frame dictionary: {e}")
            return None

    def send_frame_dict(self, word_frame_dict):
        """Sends the edited frame dictionary back to the server."""
        try:
            word_frame_json = json.dumps(word_frame_dict)
            self.sock.sendall(word_frame_json.encode('utf-8') + b'\0')
            print("Frame dictionary sent successfully.")
        except Exception as e:
            print(f"Failed to send frame dictionary: {e}")

    def receive_video(self):
        """Receives the processed video from the server and saves it to disk."""
        print("Receiving processed video from the server.")
        self.sock.settimeout(120)
        with open(self.save_path, 'wb') as file:
            while True:
                data = self.sock.recv(4096)
                if not data:
                    break
                file.write(data)
        print("Processed video saved successfully.")

    def close(self):
        """Closes the socket connection."""
        if self.sock:
            self.sock.close()
            print("Connection closed.")

# if __name__ == "__main__":
#     # Example usage
#     SERVER_HOST = '64.181.228.194'  # Server IP address
#     SERVER_PORT = 9000              # Server port number
#     VIDEO_PATH = 'IMG_9733.MOV'     # Path to the video file to send
#     SAVE_PATH = 'output_video.mp4'  # Path to save the received video file
    
#     client = VideoClient(SERVER_HOST, SERVER_PORT, VIDEO_PATH, SAVE_PATH)
    
#     # Connect to the server
#     client.connect()
    
#     # Send the video file
#     client.send_video()
    
#     # Receive the frame dictionary
#     frame_dict = client.receive_frame_dict()
#     if frame_dict is not None:
#         print("Received frame dictionary:", frame_dict)
        
#         client.send_frame_dict(frame_dict)
    
#     # Receive the processed video
#     client.receive_video()
    
#     # Close the connection
#     client.close()
