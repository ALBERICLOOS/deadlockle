# Dockerfile for Django Backend with Gunicorn

# Use official Python image from the Docker Hub
FROM python:3.10-alpine

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Set the working directory
WORKDIR /backend

# Install dependencies
COPY requirements.txt requirements.txt
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the Django project files to the working directory
COPY . .

CMD ["gunicorn", "deadlockle.wsgi", "--bind", "0.0.0.0:8000", "--workers", "3"]