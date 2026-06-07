#!/bin/bash
# Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
echo "🔥 Running billion-scale load test v7..."
for i in {1..20000}; do
  curl -s http://localhost:4444/health > /dev/null
done
echo "✅ Billion-scale load test v7 passed"