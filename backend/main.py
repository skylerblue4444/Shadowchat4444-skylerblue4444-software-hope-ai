# Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
from fastapi import FastAPI
from node import app as node_app
from node_livekit import router as livekit_router

app = FastAPI()
app.mount("/", node_app)
app.include_router(livekit_router)