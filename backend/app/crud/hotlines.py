from sqlalchemy.orm import Session

from app.models.hotlines_model import Hotlines

def get_hotlines(db: Session):
    return (
        db.query(Hotlines)
        .all()
    )