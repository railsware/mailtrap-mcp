# Use multi-stage build to keep final image small
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build && chmod +x dist/index.js

# Final image
FROM node:22-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

# Copy built application
COPY --from=builder /app/dist ./dist

ENTRYPOINT ["node", "dist/index.js"]
