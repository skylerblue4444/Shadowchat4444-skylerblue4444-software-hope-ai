# Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
from fastapi import APIRouter
from livekit_config import create_livekit_room

router = APIRouter(prefix="/live")

@router.post("/create-room")
async def create_room(room_name: str):
    room = create_livekit_room(room_name)
    return {"status": "live", "room": room, "tip_address": "shadow_treasury"}