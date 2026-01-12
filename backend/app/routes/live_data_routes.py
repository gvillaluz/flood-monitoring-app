from pprint import pprint
from fastapi import APIRouter, Depends
from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.utils import time_utils
from app.schemas.internal.water_level import WaterLevelModel
from app.db.session import get_db
from app.services.data_service import DataService

router = APIRouter()
service = DataService()

@router.get('/latest/flood-records', response_model=list[WaterLevelModel])
async def get_latest_data(db: Session = Depends(get_db)):
    try:
        flood_record = service.fetch_latest_flood_records(db)
        
        return flood_record
    except Exception as e:
        raise HTTPException(status_code=404, detail="Failed to load water levels")