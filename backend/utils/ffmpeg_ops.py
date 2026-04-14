import subprocess
import uuid
import os

OUTPUT_DIR = "outputs"

def run_ffmpeg_command(command):
    try:
        result = subprocess.run(
            command,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=30
        )

        if result.returncode != 0:
            raise Exception(result.stderr.decode())

    except subprocess.TimeoutExpired:
        raise Exception("FFmpeg process timed out")


def process_media(input_path: str, operation: str) -> str:
    filename = str(uuid.uuid4())

    if operation == "thumbnail":
        output_path = os.path.join(OUTPUT_DIR, filename + ".jpg")
        command = [
            "ffmpeg",
            "-i", input_path,
            "-ss", "00:00:02",
            "-vframes", "1",
            output_path
        ]

    elif operation == "compress":
        output_path = os.path.join(OUTPUT_DIR, filename + ".mp4")
        command = [
            "ffmpeg",
            "-i", input_path,
            "-vcodec", "libx264",
            "-crf", "28",
            output_path
        ]

    elif operation == "extract_audio":
        output_path = os.path.join(OUTPUT_DIR, filename + ".mp3")
        command = [
            "ffmpeg",
            "-i", input_path,
            "-q:a", "0",
            "-map", "a",
            output_path
        ]

    else:
        raise Exception("Invalid operation")

    run_ffmpeg_command(command)
    return output_path