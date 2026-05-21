#!/bin/bash
# Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
cp skycoin444.db backups/skycoin444_$TIMESTAMP.db
echo "✅ Database backed up: backups/skycoin444_$TIMESTAMP.db"