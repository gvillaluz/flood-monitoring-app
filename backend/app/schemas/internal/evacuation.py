from pydantic import BaseModel, ConfigDict

class EvacuationModel(BaseModel):
    center_name: str
    amenity: str
    latitude: float
    longitude: float
    
    model_config = ConfigDict(from_attributes=True)