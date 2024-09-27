# Dockerfile for Django Backend with Gunicorn

# Use official Python image from the Docker Hub
FROM python:3.10-alpine

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Install dependencies for Alpine
RUN apk update && apk add --no-cache gcc musl-dev postgresql-dev

# Set the working directory
WORKDIR /app

# Copy requirements.txt first to cache dependencies
COPY requirements.txt .

# Install Python dependencies
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the rest of the project files
COPY . .

# Run database migrations
RUN python manage.py migrate

# Expose the port for Gunicorn
EXPOSE 8000

# Run Gunicorn
CMD ["gunicorn", "deadlockle.wsgi", "--bind", "0.0.0.0:8000", "--workers", "3"]
