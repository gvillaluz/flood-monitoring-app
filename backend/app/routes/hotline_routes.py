from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.internal.hotlines import HotlinesModel
from app.db.session import get_db
from app.services.data_service import DataService

router = APIRouter()
service = DataService()

@router.get("/emergency-hotlines")
async def get_hotlines(db: Session = Depends(get_db)):
    try:
        return service.fetch_emergency_hotlines(db)
    except Exception as e:
        raise HTTPException(status_code=404, detail="Failed to fetch hotlines")