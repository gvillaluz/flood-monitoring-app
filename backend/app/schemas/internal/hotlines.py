from pydantic import BaseModel

class HotlinesModel(BaseModel):
    hotline_name: str
    hotline_number: str