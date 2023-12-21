FROM nginx:latest

# Copy Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy custom HTML, CSS, JS, and other files from the src directory
COPY public/_rw/ /usr/share/nginx/_rw/
COPY src /usr/share/nginx/_rwapp/

#mkdir at COPY src /usr/share/nginx/_rwproj/
RUN  mkdir /usr/share/nginx/_rwproj/
