from pydantic import BaseModel

class FloodRecordModel(BaseModel):
    timestr: str
    wl: float
    wlchange: float
    rf_mt_oro: float
    rf_mt_sm: float