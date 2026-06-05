# Gebruik Node.js Alpine voor kleine image
FROM node:18-alpine

# Zet werkdirectory
WORKDIR /app

# Kopieer package.json eerst (voor betere caching)
COPY package*.json ./

# Installeer dependencies
RUN npm install

# Kopieer alle code
COPY . .

# Expose poort 5000
EXPOSE 5000

# Start de server
CMD ["node", "server.js"]