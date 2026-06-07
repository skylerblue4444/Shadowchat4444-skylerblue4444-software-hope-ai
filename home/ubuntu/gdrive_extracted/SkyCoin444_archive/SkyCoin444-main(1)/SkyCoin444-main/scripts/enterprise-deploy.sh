#!/bin/bash
# Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
echo "🚀 Enterprise deployment of ShadowChat..."
docker-compose -f docker-compose.enterprise.yml up --build -d
echo "✅ Enterprise scale deployment complete!"