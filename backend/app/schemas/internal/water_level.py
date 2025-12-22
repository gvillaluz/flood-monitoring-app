from datetime import datetime
from pydantic import BaseModel

class WaterLevelModel(BaseModel):
    station_name: str
    timestamp: datetime
    water_level: float
    water_level_10m: float | None
    water_level_change: float | None