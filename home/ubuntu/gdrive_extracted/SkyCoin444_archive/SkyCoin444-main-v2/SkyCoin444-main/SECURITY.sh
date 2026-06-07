#!/bin/bash
# Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
echo "Setting up ShadowChat..."
pip install -r requirements.txt
docker-compose up --build -d
echo "✅ Setup complete! Visit http://localhost:4444"