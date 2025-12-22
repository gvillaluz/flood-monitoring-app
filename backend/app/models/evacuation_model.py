from sqlalchemy import Column, String, Integer, DateTime, Float
from sqlalchemy.sql import func
from .base import Base

class Evacuation(Base):
    __tablename__ = 'evacuation_centers'
    
    id = Column(Integer, primary_key=True, index=True)
    center_name = Column(String(255), nullable=False)
    amenity = Column(String(255), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)