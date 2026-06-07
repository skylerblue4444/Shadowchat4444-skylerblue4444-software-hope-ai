# Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.orm import sessionmaker, declarative_base
from config import POSTGRES_URL

engine = create_engine(POSTGRES_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class UserBalance(Base):
    __tablename__ = "user_balances"
    address = Column(String, primary_key=True)
    balance = Column(Float, default=0.0)
    staked = Column(Float, default=0.0)

Base.metadata.create_all(engine)