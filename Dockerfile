# Stage 1 — build
FROM node:lts-alpine AS build
WORKDIR /app

# Install deps
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Copy sources and build
COPY . .
RUN npm run build

# Stage 2 — runtime (NGINX)
FROM nginx:stable-alpine AS runtime

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy the built static site
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80