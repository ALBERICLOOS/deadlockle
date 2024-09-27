# Dockerfile for React Frontend

# Use official Node.js runtime as the base image
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /frontend

# Copy package.json and package-lock.json first to leverage Docker layer caching
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the project files
COPY . .

# Build the app for production
RUN npm run build
