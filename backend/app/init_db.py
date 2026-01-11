from models.base import Base
from db.session import engine
from models import water_level_model, rainfall_model, evacuation_model, hotlines_model, device_token_model, flood_record_model

Base.metadata.create_all(engine)