from sqlalchemy.orm import Session

from app.schemas.internal.flood_record import FloodRecordModel
from app.models.flood_record_model import FloodRecord

def create_flood_records(db: Session, flood_record: FloodRecordModel): 
    record = FloodRecord(**flood_record.model_dump())
    
    db.add(record)
    db.commit()
    db.refresh(record)
    
    return record

def get_records_for_prediction(db: Session):
    return (
        db.query(FloodRecord)
        .order_by(FloodRecord.timestr.desc())
        .limit(60)
        .all()
    )