# Dockerfile for React Frontend

# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /frontend

# Copy the rest of the project files
COPY . .

# Build the app for production
RUN npm run build
