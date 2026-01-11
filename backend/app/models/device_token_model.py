from sqlalchemy import Column, DateTime, Float, Integer, String
from sqlalchemy.sql import func
from .base import Base

class DeviceToken(Base):
    __tablename__ = "device_tokens"
    
    id = Column(Integer, primary_key=True, index=True)
    fcm_token = Column(String(255), nullable=False, unique=True, index=True)
    platform = Column(String(50), nullable=True, default="android")
    last_active = Column(DateTime, nullable=False, server_default=func.now(), onupdate=func.now())