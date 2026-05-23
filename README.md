# Media Processing Studio

A full-stack media processing platform that enables users to process media files directly from public URLs using server-side FFmpeg pipelines. The application supports thumbnail generation, video compression, and audio extraction through a streamlined web interface backed by a FastAPI processing server.

The project was developed using an AI-augmented software engineering workflow, leveraging large language models extensively for rapid prototyping, architectural iteration, debugging assistance, UI generation, deployment troubleshooting, and backend workflow acceleration.

---

# Live Deployment

### Frontend (Vercel)

[Frontend Application](https://media-processing-app-nu.vercel.app?utm_source=chatgpt.com)

### Backend API (Render)

[Backend API](https://media-processing-app-l9fq.onrender.com?utm_source=chatgpt.com)

### Swagger Documentation

[API Documentation](https://media-processing-app-l9fq.onrender.com/docs?utm_source=chatgpt.com)

---

# Project Overview

Media Processing Studio provides a browser-based interface for server-side media transformations powered by FFmpeg. Instead of uploading files manually, users can provide publicly accessible media URLs, allowing the backend to fetch, process, and return transformed outputs dynamically.

The system was designed to explore practical backend media pipelines, deployment orchestration, and AI-assisted full-stack development methodologies.

---

# Core Features

* Generate thumbnails from video files
* Compress large video files using FFmpeg
* Extract audio tracks from videos
* Process media directly from external URLs
* Responsive black-and-gold themed frontend UI
* FastAPI-powered REST API architecture
* Interactive Swagger API documentation
* Real-time server-side processing pipeline
* Cloud deployment using Render and Vercel

---

# Technology Stack

## Frontend

| Technology       | Purpose                |
| ---------------- | ---------------------- |
| React            | Frontend application   |
| Create React App | Frontend bootstrapping |
| CSS              | Custom UI styling      |
| Vercel           | Frontend deployment    |

---

## Backend

| Technology      | Purpose                 |
| --------------- | ----------------------- |
| FastAPI         | API framework           |
| Uvicorn         | ASGI server             |
| FFmpeg          | Media processing engine |
| Python Requests | Media download handling |

---

## Infrastructure & Tooling

| Technology      | Purpose                         |
| --------------- | ------------------------------- |
| Docker          | Containerized local development |
| Render          | Backend hosting                 |
| Swagger/OpenAPI | API documentation               |

---

# AI-Assisted Development Workflow

This project was built using a heavily AI-assisted development approach where large language models were integrated throughout the engineering workflow.

AI tooling was extensively used for:

* Full-stack scaffolding
* API structure generation
* FFmpeg command construction
* UI layout iteration
* Deployment troubleshooting
* Docker debugging
* CORS resolution
* Environment configuration
* Error tracing and debugging
* Rapid feature prototyping
* Documentation acceleration

The objective was not only to build a working media processing platform, but also to evaluate how modern AI-assisted development workflows can accelerate practical software engineering and infrastructure deployment tasks.

---

# System Architecture

```plaintext id="h08j4l"
Frontend (Vercel)
        ↓
Backend API (Render)
        ↓
FFmpeg Processing Pipeline
        ↓
Generated Output Files
```

---

# API Usage

## Endpoint

```http id="gx1e72"
POST /process
```

---

## Request Body

```json id="2n9uh4"
{
  "url": "MEDIA_URL",
  "operation": "thumbnail | compress | extract_audio"
}
```

---

## Example Request

```bash id="ngfuh0"
curl -X POST "https://media-processing-app-l9fq.onrender.com/process" \
-H "Content-Type: application/json" \
-d '{
  "url": "https://www.w3schools.com/html/mov_bbb.mp4",
  "operation": "thumbnail"
}'
```

---

## Example Response

```json id="zgmhgn"
{
  "status": "success",
  "output": "https://media-processing-app-l9fq.onrender.com/outputs/abc123.jpg"
}
```

---

# Test Media URLs

## Video Samples

```plaintext id="ymjz1q"
https://www.w3schools.com/html/mov_bbb.mp4
```

```plaintext id="0c5k2r"
https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4
```

---

## Audio Sample

```plaintext id="a4e6jq"
https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3
```

---

# Project Structure

```plaintext id="cb3g5k"
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

# Local Development Setup

## 1. Clone Repository

```bash id="ijjz5u"
git clone https://github.com/your-username/media-processing-app.git
cd media-processing-app
```

---

## 2. Backend Setup

```bash id="8m3jlwm"
cd backend
python -m venv venv
```

### Activate Virtual Environment

#### Windows

```bash id="jlwmr5"
venv\Scripts\activate
```

#### Linux / macOS

```bash id="xyjlwm"
source venv/bin/activate
```

---

### Install Dependencies

```bash id="5x8m5x"
pip install -r requirements.txt
```

Install FFmpeg separately and ensure it is added to the system PATH.

---

### Run Backend Server

```bash id="q3vq5k"
uvicorn main:app --reload
```

Backend Swagger documentation:

```plaintext id="9z2icx"
http://localhost:8000/docs
```

---

## 3. Frontend Setup

```bash id="h0q87k"
cd frontend
npm install
npm start
```

Frontend runs at:

```plaintext id="ej0euj"
http://localhost:3000
```

---

# Environment Variables

## Frontend `.env`

```env id="wvx3w6"
REACT_APP_API_URL=https://media-processing-app-l9fq.onrender.com
```

---

# Deployment Configuration

## Backend Deployment (Render)

### Environment

* Python 3

### Root Directory

```plaintext id="7v2kpl"
backend
```

### Build Command

```bash id="h0m3eh"
pip install -r requirements.txt
```

### Start Command

```bash id="ryjlwm"
uvicorn main:app --host 0.0.0.0 --port 10000
```

---

## Frontend Deployment (Vercel)

### Root Directory

```plaintext id="mz3ukw"
frontend
```

### Environment Variable

```env id="4zy4m9"
REACT_APP_API_URL=https://media-processing-app-l9fq.onrender.com
```

---

# Engineering Challenges Addressed

* Handling large media downloads with timeout management
* Managing temporary storage across cloud deployments
* Dynamic file path resolution for local and production environments
* Cross-origin communication between frontend and backend
* FFmpeg integration within hosted environments
* Deployment debugging across Docker, Render, and Vercel
* Runtime output URL generation for processed media

---

# Security Considerations

* Input URL validation implemented
* CORS restricted to approved frontend origins
* Temporary file cleanup mechanisms included
* Basic file size limitations enforced
* Isolated backend processing pipeline

---

# Current Limitations

* Uses temporary cloud storage on free-tier infrastructure
* Large media files may exceed timeout limits
* No persistent object storage integration yet
* No asynchronous job queue currently implemented

---

# Future Improvements

* AWS S3 or Cloudinary integration
* Drag-and-drop media upload support
* Real-time processing progress indicators
* Background task queues using Celery + Redis
* User authentication and dashboard system
* Persistent processing history
* Batch media processing support
* GPU-accelerated transcoding pipeline

---

# Author

**Shashank Shekhar**
2026

---

# License

This project is intended for educational purposes, portfolio demonstration, and backend media processing experimentation. Commercial deployment should include production-grade storage infrastructure, authentication, monitoring, and scaling mechanisms.
