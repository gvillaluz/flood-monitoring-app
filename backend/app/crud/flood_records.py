from sqlalchemy.orm import Session

from app.schemas.internal.flood_record import FloodRecordModel
from app.models.flood_record_model import FloodRecord

def create_flood_records(db: Session, flood_record: FloodRecordModel): 
    record = FloodRecord(**flood_record.model_dump())
    
    db.add(record)
    db.commit()
    db.refresh(record)
    
    return record

def get_latest_flood_records(db: Session):
    return (
        db.query(FloodRecord)
        .order_by(FloodRecord.timestr.desc())
        .limit(7)
        .all()
    )

def get_records_for_prediction(db: Session):
    return (
        db.query(FloodRecord)
        .order_by(FloodRecord.timestr.desc())
        .limit(60)
        .all()
    )
    
def update_record(db: Session, record: FloodRecordModel):
    existing_record = db.query(FloodRecord).filter(FloodRecord.id == record.id).first()
    
    if existing_record is None:
        return None
    
    existing_record.predicted_wl = record.predicted_wl
    existing_record.prediction_status = record.prediction_status
    
    db.commit()
    db.refresh(existing_record)
    
    return existing_record