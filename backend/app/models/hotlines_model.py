from sqlalchemy import Column, Float, Integer, DateTime, String

from .base import Base

class Hotlines(Base):
    __tablename__ = "emergency_hotlines"
    
    id = Column(Integer, primary_key=True, index=True)
    hotline_name = Column(String(255), nullable=False)
    hotline_number = Column(String(100), nullable=False)