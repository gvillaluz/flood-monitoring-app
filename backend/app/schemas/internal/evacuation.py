from pydantic import BaseModel

class EvacuationModel(BaseModel):
    center_name: str
    amenity: str
    latitude: float
    longitude: float