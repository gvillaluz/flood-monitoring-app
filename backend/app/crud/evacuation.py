from sqlalchemy.orm import Session

from app.models.evacuation_model import Evacuation

def get_evacuations(db: Session):
   return (
        db.query(Evacuation)
        .all()
   )