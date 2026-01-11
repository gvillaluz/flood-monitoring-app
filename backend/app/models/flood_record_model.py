from sqlalchemy import Column, Float, Integer, DateTime, String
from sqlalchemy.sql import func
from .base import Base

class FloodRecord(Base):
    __tablename__ = 'flood_records'
    
    id = Column(Integer, primary_key=True, index=True)
    timestr = Column(String, nullable=False)
    wl = Column(Float, nullable=False)
    wlchange = Column(Float, nullable=False)
    rf_mt_oro = Column(Float, nullable=False)
    rf_mt_sm = Column(Float, nullable=False)
    created_at = Column(DateTime, nullable=False, server_default=func.now())