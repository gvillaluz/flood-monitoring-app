from datetime import datetime
from pydantic import BaseModel

class FloodRecordModel(BaseModel):
    timestr: datetime
    wl: float
    wlchange: float
    rf_mt_oro: float
    rf_mt_sm: float
    
    predicted_wl: float | None = None
    prediction_status: str | None = None