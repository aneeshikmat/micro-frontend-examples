FROM nginx:alpine

# Create directories for micro-frontends
RUN mkdir -p /usr/share/nginx/microapps/header \
    /usr/share/nginx/microapps/content \
    /usr/share/nginx/microapps/footer

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]