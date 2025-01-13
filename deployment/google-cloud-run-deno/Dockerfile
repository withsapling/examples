# Use Ubuntu as the base image
FROM ubuntu

# Copy Deno binary from official image instead of installing via curl
COPY --from=denoland/deno:bin /deno /usr/local/bin/deno

# Create and set the application directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy all files from the current directory to the container
COPY . /usr/src/app

# Expose the port that Cloud Run expects
EXPOSE 8080
# Set the PORT environment variable
ENV PORT=8080

# Start the Deno application
CMD ["deno", "task", "start"]