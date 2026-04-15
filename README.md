# Media Processing Studio

A full-stack web application for processing media files directly from URLs using server-side FFmpeg. The system allows users to generate thumbnails, compress videos, and extract audio through a clean web interface.

---

## Live Demo

Frontend (Vercel):
https://media-processing-app-nu.vercel.app

Backend API (Render):
https://media-processing-app-l9fq.onrender.com

API Docs (Swagger):
https://media-processing-app-l9fq.onrender.com/docs

---

## Features

* Generate thumbnails from videos
* Compress video files
* Extract audio from video
* Clean and responsive UI (black-gold theme)
* Real-time processing with server-side FFmpeg
* Public API with Swagger documentation

---

## Tech Stack

Frontend:

* React (Create React App)
* Vercel (Deployment)

Backend:

* FastAPI
* Uvicorn
* FFmpeg

Other:

* Docker (local development)
* Requests (file download handling)

---

## System Architecture

Frontend (Vercel) → Backend API (Render) → FFmpeg Processing → Output Files

---

## API Usage

### Endpoint

POST /process

### Request Body

```json
{
  "url": "MEDIA_URL",
  "operation": "thumbnail | compress | extract_audio"
}
```

---

### Example Request

```bash
curl -X POST "https://media-processing-app-l9fq.onrender.com/process" \
-H "Content-Type: application/json" \
-d '{
  "url": "https://www.w3schools.com/html/mov_bbb.mp4",
  "operation": "thumbnail"
}'
```

---

### Example Response

```json
{
  "status": "success",
  "output": "https://media-processing-app-l9fq.onrender.com/outputs/abc123.jpg"
}
```

---

## Test Media URLs

Use these reliable URLs for testing:

Video:
https://www.w3schools.com/html/mov_bbb.mp4

Alternative:
https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4

Audio:
https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3

---

## Project Structure

```
media-processing-app/
│
├── backend/
│   ├── main.py
│   ├── utils/
│   │   ├── downloader.py
│   │   └── ffmpeg_ops.py
│   ├── outputs/
│   └── temp/
│
├── frontend/
│   ├── src/
│   │   └── App.js
│   └── package.json
│
└── README.md
```

---

## Local Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/your-username/media-processing-app.git
cd media-processing-app
```

---

### 2. Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate     (Windows)
pip install -r requirements.txt
```

Install FFmpeg and ensure it is added to PATH.

Run backend:

```bash
uvicorn main:app --reload
```

Open:
http://localhost:8000/docs

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs at:
http://localhost:3000

---

## Environment Variables

Frontend (.env):

```
REACT_APP_API_URL=https://media-processing-app-l9fq.onrender.com
```

---

## Deployment

### Backend (Render)

* Environment: Python 3
* Root directory: backend
* Build command:

  ```
  pip install -r requirements.txt
  ```
* Start command:

  ```
  uvicorn main:app --host 0.0.0.0 --port 10000
  ```

---

### Frontend (Vercel)

* Root directory: frontend
* Environment variable:

  ```
  REACT_APP_API_URL=https://media-processing-app-l9fq.onrender.com
  ```

---

## Key Challenges Solved

* Handling large media downloads with timeout management
* Managing file paths across local, Docker, and cloud environments
* Fixing CORS issues between frontend and backend
* Dynamic URL generation for production environments
* Debugging deployment failures (Docker, Render, Railway)

---

## Security Considerations

* CORS restricted to frontend domain
* Input URL validation implemented
* File size limits applied
* Temporary file cleanup handled

---

## Limitations

* Uses temporary storage (Render free tier)
* Large files may timeout
* No persistent storage (yet)

---

## Future Improvements

* AWS S3 / Cloudinary integration
* Drag-and-drop file uploads
* Progress bar for processing
* Background job queue (Celery + Redis)
* Authentication and user system

---

---

## Author

Shashank Shekhar @2026

---
