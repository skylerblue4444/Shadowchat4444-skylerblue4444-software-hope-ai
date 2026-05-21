# Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[
        logging.FileHandler("logs/shadowchat.log"),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger("ShadowChat")
logger.info("🚀 ShadowChat logging initialized – Made by Skyler Blue Spillers")