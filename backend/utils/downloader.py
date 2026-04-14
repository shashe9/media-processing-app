import requests
import uuid
import os

# Get absolute base directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Absolute temp directory
TEMP_DIR = os.path.join(BASE_DIR, "temp")

# Ensure temp directory exists
os.makedirs(TEMP_DIR, exist_ok=True)

def download_file(url: str) -> str:
    try:
        response = requests.get(url, stream=True, timeout=10)

        if response.status_code != 200:
            raise Exception("Failed to download file")

        # Generate unique filename
        filename = f"{uuid.uuid4()}.mp4"
        file_path = os.path.join(TEMP_DIR, filename)

        with open(file_path, "wb") as f:
            for chunk in response.iter_content(chunk_size=1024):
                if chunk:
                    f.write(chunk)

        return file_path

    except Exception as e:
        raise Exception(f"Download error: {str(e)}")