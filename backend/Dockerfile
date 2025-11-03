# Stage 1: Build stage
FROM node:22-alpine AS build
WORKDIR /app

# Install build dependencies (for sqlite3 compilation)
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


# Stage 2: Production image
FROM node:22-alpine
WORKDIR /app

# Copy compiled app and node_modules from build stage
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/db ./db
COPY package*.json ./

EXPOSE 8080
CMD ["node", "dist/server.js"]
