# Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
version: '3.8'
services:
  shadowchat:
    build: .
    deploy:
      replicas: 100
      resources:
        limits:
          cpus: '12.0'
          memory: 32G
  p2p-cluster-v5:
    build: .
    command: python p2p/node_p2p.py
    deploy:
      replicas: 80