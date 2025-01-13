FROM oven/bun

# Copy the lock and package file
COPY bun.lockb . 
COPY package.json . 

# Install dependencies
RUN bun install --frozen-lockfile

EXPOSE 3000

# Copy your source code
COPY src ./src 

CMD ["bun", "start"]
