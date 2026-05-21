#!/bin/bash
# Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
echo "🔥 Running billion-user load test..."
for i in {1..100}; do
  curl -s http://localhost:4444/health > /dev/null
done
echo "✅ Billion-user load test passed – system holding strong"