from pydantic import BaseModel, field_validator
from datetime import datetime

class PagasaWaterLevel(BaseModel):
    obsnm: str
    timestr: datetime
    wl: float
    wl10m: float
    wlchange: float
    alertwl: int | None
    alarmwl: int | None
    criticalwl: int | None
    
    @field_validator('wl', 'wl10m', 'wlchange', mode='before')
    def parse_float(cls, v):
        if isinstance(v, str):
            v = v.replace("*", "").replace("(", "").replace(")", "").strip()
            if v == "-" or v == "":
                v = 0.0
        try:
            return float(v)
        except (ValueError, TypeError): 
            return 0.0
        
    @field_validator('alertwl', 'alarmwl', 'criticalwl', mode='before')
    def parse_int(cls, v):
        try:
            return int(v)
        except (ValueError, TypeError):
            return None