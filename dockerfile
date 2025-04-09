# Build stage: Used to compile the Next.js app
FROM node:18-alpine AS builder
WORKDIR /app
# Copy package.json and package-lock.json first for better caching
COPY package.json package-lock.json ./
# Install all dependencies (including devDependencies) for building
RUN npm ci
# Copy the rest of the application code
COPY . .
# Build the Next.js app, creating the optimized .next directory
RUN npm run build

# Run stage: Used to create the final production image
FROM node:18-alpine
WORKDIR /app
# Copy essential files from the build stage
COPY --from=builder /app/package.json /app/
COPY --from=builder /app/package-lock.json /app/
# Copy next.config.js (if it exists, it’s needed for runtime configuration)
COPY --from=builder /app/next.config.js /app/
# Copy the built .next directory
COPY --from=builder /app/.next /app/.next
# Copy the public folder (for static assets, if it exists)
COPY --from=builder /app/public /app/public
# Install only production dependencies
RUN npm ci --only=production
# Expose port 3000, the default for Next.js
EXPOSE 3000
# Start the Next.js app
CMD ["npm", "start"]