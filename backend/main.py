from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from utils.downloader import download_file
from utils.ffmpeg_ops import process_media
from fastapi.staticfiles import StaticFiles
import os
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


BASE_DIR = os.path.dirname(os.path.abspath(__file__))

outputs_dir = os.path.join(BASE_DIR, "outputs")
os.makedirs(outputs_dir, exist_ok=True)

temp_dir = os.path.join(BASE_DIR, "temp")
os.makedirs(temp_dir, exist_ok=True)


app.mount(
    "/outputs",
    StaticFiles(directory=os.path.join(BASE_DIR, "outputs")),
    name="outputs"
)

class ProcessRequest(BaseModel):
    url: str
    operation: str


@app.get("/")
def home():
    return {"message": "Backend is running"}


@app.post("/process")
def process_media_api(request: ProcessRequest, req: Request):
    try:
        input_path = download_file(request.url)
        output_path = process_media(input_path, request.operation)

        filename = os.path.basename(output_path)

        base_url = str(req.base_url).rstrip("/")

        return {
            "status": "success",
            "output": f"{base_url}/outputs/{filename}"
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))