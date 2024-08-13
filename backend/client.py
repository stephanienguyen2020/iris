import socket
from time import sleep
import json

class VideoClient:
    def __init__(self, server_host, server_port):
        self.server_host = server_host
        self.server_port = server_port
        self.sock = None

    def connect(self):
        """Connects to the server."""
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.sock.connect((self.server_host, self.server_port))
        print("Connected to server.")

    def send(self, video, additional_parameters=None):
        """Sends a video file and additional parameters to the server for analysis."""
        try:
            if additional_parameters:
                self.sock.sendall(json.dumps(additional_parameters).encode('utf-8') + b'\0')
            with open(video, 'rb') as file:
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

    def request(self):
        """Checks the processing status of the video."""
        self.sock.settimeout(500)
        data = b''
        try:
            while True:
                packet = self.sock.recv(4096)
                data += packet
                if b'\0' in data:
                    data = data.split(b'\0')[0]
                    break
            status = json.loads(data.decode('utf-8'))
            print("Processing status received.")
            return status
        except Exception as e:
            print(f"Failed to receive processing status: {e}")
            return None

    def receive(self):
        """Receives the PII detection results from the server."""
        self.sock.settimeout(500)
        data = b''
        try:
            while True:
                packet = self.sock.recv(4096)
                data += packet
                if b'\0' in data:
                    data = data.split(b'\0')[0]
                    break
            pii_results = json.loads(data.decode('utf-8'))
            print("PII detection results received.")
            return pii_results
        except Exception as e:
            print(f"Failed to receive PII detection results: {e}")
            return None

    def blur(self, pii_instances, blur_radius, blur_opacity):
        """Initiates the blurring of detected PII in the video."""
        try:
            blur_request = {
                'PII': pii_instances,
                'blur_radius': blur_radius,
                'blur_opacity': blur_opacity
            }
            self.sock.sendall(json.dumps(blur_request).encode('utf-8') + b'\0')
            print("Blurring initiated.")
        except Exception as e:
            print(f"Failed to initiate blurring: {e}")

    def receiveVideo(self, save_path):
        """Receives the processed (blurred) video from the server and saves it."""
        print("Receiving processed video from the server.")
        self.sock.settimeout(120)
        try:
            with open(save_path, 'wb') as file:
                while True:
                    data = self.sock.recv(4096)
                    if not data:
                        break
                    file.write(data)
            print(f"Processed video saved successfully to {save_path}.")
            return {'status': 'finished'}
        except Exception as e:
            print(f"Failed to receive processed video: {e}")
            return {'status': 'failed'}

    def close(self):
        """Closes the socket connection."""
        if self.sock:
            self.sock.close()
            print("Connection closed.")

# Example usage:

# client = VideoClient(server_host='64.181.228.194', server_port=9000)
# client.connect()
# client.send(video='IMG_9733.MOV', additional_parameters={'some_param': 'value'})
# status = client.request()
# if status and status['status'] == 'finished':
#     pii_results = client.receive()
#     client.blur(pii_instances=pii_results['PII'], blur_radius=5, blur_opacity=0.8)
#     blurred_video = client.receiveVideo(save_path='output_video.mp4')
# client.close()
