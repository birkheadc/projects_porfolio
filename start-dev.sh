#!/bin/bash

# Launches multiple services at once in dev environment

echo ""
echo "Starting Projects Portfolio Front and Back end in Development Environment..."
echo ""
echo ""
npm run start:dev --prefix projects-portfolio-back/ &
npm run start --prefix projects-portfolio-front/ &
trap 'pkill -P $$' SIGINT SIGTERM
wait