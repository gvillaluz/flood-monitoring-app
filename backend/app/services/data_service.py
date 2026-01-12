from sqlalchemy.orm import Session

from app.crud import flood_records
from app.crud import evacuation
from app.crud import hotlines

class DataService():
    def fetch_latest_flood_records(self, db: Session):
        return flood_records.get_latest_flood_records(db)
    
    def fetch_evacuation_centers(self, db: Session):
        return evacuation.get_evacuations(db)
    
    def fetch_emergency_hotlines(self, db: Session):
        return hotlines.get_hotlines(db)