#!/bin/bash
# Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
echo "📦 Backing up ShadowChat database..."
cp skycoin444.db backups/skycoin444_$(date +%Y%m%d).db
echo "✅ Backup complete!"