from app.schemas.internal.rainfall import RainfallModel
from app.models.rainfall_model import Rainfall
from sqlalchemy.orm import Session

def create_rainfall(db: Session, data: RainfallModel): 
    rainfall_obj = Rainfall(**data.model_dump())
    
    db.add(rainfall_obj)
    db.commit()
    db.refresh(rainfall_obj)
    
    return rainfall_obj