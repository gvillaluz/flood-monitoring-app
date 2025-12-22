from app.schemas.internal.rainfall import RainfallModel
from app.models.rainfall_model import Rainfall
from sqlalchemy.orm import Session

def create_rainfall(db: Session, data: RainfallModel): 
    return