from sqlalchemy import Column, DateTime, Float, Integer, String
from sqlalchemy.sql import func
from .base import Base

class WaterLevel(Base):
    __tablename__ = "water_levels"
    
    id = Column(Integer, primary_key=True, index=True)
    station_name = Column(String(50), nullable=False)
    timestamp = Column(DateTime, nullable=False)
    water_level = Column(Float, nullable=False)
    water_level_10m = Column(Float, nullable=True)
    water_level_change = Column(Float, nullable=True)
    created_at = Column(DateTime, nullable=False, server_default=func.now())