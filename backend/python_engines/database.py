import sqlite3
import json
from sqlalchemy import create_engine, Column, Integer, String, Float, Text
from sqlalchemy.orm import sessionmaker, declarative_base
from config import MAX_SUPPLY

Base = declarative_base()

class SupplyLedger(Base):
    __tablename__ = 'supply_ledger'
    id = Column(Integer, primary_key=True)
    total_minted = Column(Float, default=0.0)
    circulating = Column(Float, default=0.0)

class Database:
    def __init__(self, db_file="skycoin444.db"):
        self.engine = create_engine(f"sqlite:///{db_file}")
        Base.metadata.create_all(self.engine)
        self.Session = sessionmaker(bind=self.engine)
        self._init_supply()

    def _init_supply(self):
        session = self.Session()
        if not session.query(SupplyLedger).first():
            session.add(SupplyLedger(total_minted=GENESIS_AMOUNT, circulating=GENESIS_AMOUNT))
            session.commit()
        session.close()

    def get_supply(self):
        session = self.Session()
        row = session.query(SupplyLedger).first()
        session.close()
        return row.total_minted, row.circulating

    def update_supply(self, minted_delta: float, burn_delta: float):
        session = self.Session()
        row = session.query(SupplyLedger).first()
        new_minted = row.total_minted + minted_delta
        if new_minted > MAX_SUPPLY:
            raise ValueError("🚨 MAX SUPPLY VIOLATION — OPERATION REJECTED")
        row.total_minted = round(new_minted, 8)
        row.circulating = round(row.circulating + minted_delta - burn_delta, 8)
        session.commit()
        session.close()