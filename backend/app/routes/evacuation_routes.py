from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.services.data_service import DataService
from app.schemas.internal.evacuation import EvacuationModel

router = APIRouter()
service = DataService()

@router.get("/evacuation-centers", response_model=list[EvacuationModel])
async def getEvacuationCenter(db: Session = Depends(get_db)):
    try:
        return service.fetch_evacuation_centers(db)
    except Exception as e:
        raise HTTPException(status_code=404, detail="Unable to fetch evacuation centers")