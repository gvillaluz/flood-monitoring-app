from sqlalchemy import Column, Float, Integer, DateTime, String
from sqlalchemy.sql import func
from .base import Base

class Rainfall(Base):
    __tablename__ = "rainfalls"
    
    id = Column(Integer, primary_key=True, index=True)
    station_name = Column(String(50), nullable=False)
    timestamp = Column(DateTime, nullable=False)
    rainfall = Column(Float, nullable=False)
    created_at = Column(DateTime, nullable=False, server_default=func.now())