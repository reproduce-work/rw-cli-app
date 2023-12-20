FROM nginx:latest

# Copy Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy custom HTML, CSS, JS, and other files from the src directory
COPY src/ /usr/share/nginx/html/_rw/