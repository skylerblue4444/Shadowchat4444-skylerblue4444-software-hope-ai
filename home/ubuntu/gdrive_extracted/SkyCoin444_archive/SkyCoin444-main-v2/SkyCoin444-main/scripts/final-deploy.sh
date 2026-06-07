#!/bin/bash
# Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
echo "🚀 Final deployment of ShadowChat..."
docker-compose -f docker-compose.prod.yml up --build -d
echo "✅ ShadowChat is now live! Made by Skyler Blue Spillers"