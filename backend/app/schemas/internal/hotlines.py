from pydantic import BaseModel, ConfigDict

class HotlinesModel(BaseModel):
    hotline_name: str
    hotline_number: str
    
    model_config = ConfigDict(from_attributes=True)