# Use official Bun image
FROM oven/bun:1.1

# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN bun install

# Build the Next.js app
RUN bun run build

# Start the app
CMD ["bun", "start"]