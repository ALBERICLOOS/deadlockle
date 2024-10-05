# Use official Python image from the Docker Hub
FROM python:3.10-alpine

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Install dependencies for Alpine
RUN apk update && apk add --no-cache gcc musl-dev postgresql-dev \
    bash curl tzdata # Add tzdata for timezone support and bash for cron

# Set timezone (optional, adjust as needed)
ENV TZ=Europe/Brussels

# Install crond for running cron jobs
RUN apk add --no-cache busybox-suid

# Set the working directory
WORKDIR /app

# Copy requirements.txt first to cache dependencies
COPY requirements.txt .

# Install Python dependencies
RUN touch db.sqlite3
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the rest of the project files
COPY . .

# Reset the database, run migrations, and load initial data
RUN python manage.py flush --no-input  # Flushes the database
RUN python manage.py migrate  # Applies migrations
RUN ./manage.py loaddata heroes.json && ./manage.py loaddata abilities.json  # Loads data

# Copy crontab file
COPY crontab /etc/crontabs/root

# Ensure cron runs in foreground
CMD crond -f & gunicorn deadlockle.wsgi --bind 0.0.0.0:8000 --workers 3
