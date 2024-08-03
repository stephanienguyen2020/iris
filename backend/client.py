import socket

class VideoClient:
    def __init__(self, server_host, server_port, video_path, save_path):
        self.server_host = server_host
        self.server_port = server_port
        self.video_path = video_path
        self.save_path = save_path

    def send_video(self):
        """Sends a video file to a server and receives the processed video back."""
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        try:
            sock.connect((self.server_host, self.server_port))
            print("Connected to server.")
            # Send the video to the server
            with open(self.video_path, 'rb') as file:
                while (chunk := file.read(4096)):
                    sock.sendall(chunk)
            sock.sendall(b"EOF")
            print("Video sent successfully.")
            # Receive the processed video from the server
            self.receive_video(sock)
        except Exception as e:
            print(f"Failed to send or receive video: {e}")
        finally:
            sock.close()

    def receive_video(self, sock):
        """Receives the processed video from the server and saves it to disk."""
        print("Receiving processed video from the server.")
        with open(self.save_path, 'wb') as file:
            while True:
                data = sock.recv(4096)
                if not data:
                    break
                file.write(data)
        print("Processed video saved successfully.")

# if __name__ == "__main__":
#     # Example usage
#     SERVER_HOST = '64.181.228.194'  # Server IP address
#     SERVER_PORT = 8995             # Server port number
#     VIDEO_PATH = 'img.mov'  # Path to the video file to send
#     SAVE_PATH = 'output_video.mp4'  # Path to save the received video file
#     client = VideoClient(SERVER_HOST, SERVER_PORT, VIDEO_PATH, SAVE_PATH)
#     client.send_video()
