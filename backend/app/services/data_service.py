from sqlalchemy.orm import Session

from app.crud import water_level
from app.crud import evacuation
from app.crud import hotlines

class DataService():
    def fetch_latest_water_level(self, db: Session):
        return water_level.get_latest_water_level(db)
    
    def fetch_evacuation_centers(self, db: Session):
        return evacuation.get_evacuations(db)
    
    def fetch_emergency_hotlines(self, db: Session):
        return hotlines.get_hotlines(db)