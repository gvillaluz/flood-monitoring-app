from pydantic import BaseModel

class DeviceTokenModel(BaseModel):
    fcm_token: str
    platform: str