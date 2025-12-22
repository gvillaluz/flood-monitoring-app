from pydantic import BaseModel
from datetime import datetime

class RainfallModel(BaseModel):
    station_name: str
    timestamp: datetime
    rainfall: int
    rainfall_day: int