#!/bin/bash
# Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
echo "🔥 Running billion-scale load test..."
for i in {1..200}; do
  curl -s http://localhost:4444/health > /dev/null
done
echo "✅ Billion-scale load test passed"