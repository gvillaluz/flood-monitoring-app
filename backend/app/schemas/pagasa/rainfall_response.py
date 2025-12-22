from datetime import datetime
from pydantic import BaseModel, field_validator

class PagasaRainfall(BaseModel): 
    obsnm: str
    timestr: datetime
    rf: int
    rfday: int
    
    @field_validator('rf', 'rfday', mode='before')
    def parse_int(cls, v):
        try:
            return int(v)
        except (ValueError, TypeError): 
            return 0