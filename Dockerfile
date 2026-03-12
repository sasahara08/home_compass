FROM node:20-alpine

WORKDIR /app

# Install dependencies first for better caching
COPY package.json package-lock.json* ./
RUN npm install

# Copy source files
COPY . .

# Expose port 3000
EXPOSE 3000

# Start dev server
CMD ["npm", "run", "dev"]
