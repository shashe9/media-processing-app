FROM python:3.10-slim-bullseye

RUN apt-get update && apt-get install -y ffmpeg

WORKDIR /app

RUN mkdir -p /app/outputs /app/temp

COPY . .

RUN pip install --no-cache-dir fastapi uvicorn requests

EXPOSE 8000

CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]