#!/bin/sh

# Load environment variables from .env file if it exists
if [ -f .env ]; then
  export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
fi

# Wait for PostgreSQL to be ready
until pg_isready -h localhost -p 5432 -U $POSTGRES_USER
do
  echo "Waiting for PostgreSQL database connection..."
  sleep 1
done

# Run Prisma migrations
#npx prisma migrate dev --name init

# Start the NestJS application in development mode
npm run start:dev
