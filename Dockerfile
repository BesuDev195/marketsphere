# Multi-stage Dockerfile for MarketSphere Marketplace + Cybersecurity Demo
# Stage 1: Build React Application
FROM node:22-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application source code and compile
COPY . .
RUN npm run build

# Stage 2: Serve via Production Nginx
FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy compiled SPA static files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration with client-side SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose standard container port
EXPOSE 80

# Health check to ensure Nginx is healthy
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1/ || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
