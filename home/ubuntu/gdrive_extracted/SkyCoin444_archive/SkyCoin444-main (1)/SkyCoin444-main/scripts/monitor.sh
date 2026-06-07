#!/bin/bash
# Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC#!/bin/bash
# Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
echo "🔍 Monitoring ShadowChat..."
curl -s http://localhost:4444/health || echo "⚠️ Service down – check logs"echo "Monitoring ShadowChat..."
curl -s http://localhost:4444/health || echo "⚠️ Service down"