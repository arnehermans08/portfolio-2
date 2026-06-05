# Gebruik nginx alpine voor kleine image
FROM nginx:alpine

# Kopieer static files naar nginx
COPY . /usr/share/nginx/html

# Expose poort 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
