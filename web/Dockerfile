FROM node:14-alpine

# Menggunakan /app directory
WORKDIR /app            

# Copy package.json ke /app
COPY package*.json ./ 

# Copy project
COPY . .

# Install dependencies
RUN npm install                        

# Port public untuk akses
EXPOSE 3000

# Run development server
CMD [ "npm", "run", "start"]