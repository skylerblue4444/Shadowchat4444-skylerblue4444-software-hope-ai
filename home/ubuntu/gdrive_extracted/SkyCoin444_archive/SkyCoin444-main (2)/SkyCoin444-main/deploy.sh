#!/bin/bash
# Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
echo "🚀 Deploying ShadowChat to VPS..."
git pull
docker-compose down
docker-compose up --build -d
echo "✅ Deployed! Visit your domain or http://your-vps-ip:4444"