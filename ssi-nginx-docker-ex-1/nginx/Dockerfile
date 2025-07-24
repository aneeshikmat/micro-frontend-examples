FROM nginx:alpine

# Enable SSI module (already included in the official Nginx image)
# Copy custom nginx.conf if needed (we're mounting it as a volume in docker-compose.yml)

# Create directories for micro-frontends
RUN mkdir -p /usr/share/nginx/microapps/header \
    /usr/share/nginx/microapps/content \
    /usr/share/nginx/microapps/footer

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]