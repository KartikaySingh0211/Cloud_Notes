# Stage 1: Build
FROM node:22-alpine AS build

WORKDIR /app

# Copy only package.json and lock file first
COPY package*.json ./

# Install deps
RUN npm ci

# Now copy the rest
COPY . .

# Build project
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy production build files
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
