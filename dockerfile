# Build stage: Used to compile the Next.js app
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Run stage: Used to create the final production image
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/package.json /app/
COPY --from=builder /app/package-lock.json /app/
# Removed: COPY --from=builder /app/next.config.js /app/
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
RUN npm ci --only=production
EXPOSE 3000
CMD ["npm", "start"]