# Use official Nginx image
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built frontend
COPY dist/ /usr/share/nginx/html

# Expose port for Cloud Run
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
