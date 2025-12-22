from app.schemas.internal.water_level import WaterLevelModel
from app.models.water_level_model import WaterLevel
from sqlalchemy.orm import Session

def create_water_level(db: Session, data: WaterLevelModel):
    water_obj = WaterLevel(**data.model_dump())
    db.add(water_obj)
    db.commit()
    db.refresh(water_obj)
    return water_obj

def get_latest_water_level(db: Session):
    return (
        db.query(WaterLevel)
        .order_by(WaterLevel.timestamp.desc())
        .limit(7)
        .all()
    )