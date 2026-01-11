from app.models.device_token_model import DeviceToken
from app.schemas.internal.device_token import DeviceTokenModel

from sqlalchemy.orm import Session

def fetch_fcm_token(db: Session, token: str):
    return (
        db.query(DeviceToken)
        .filter(DeviceToken.fcm_token == token)
        .first()
    )
    
def create_fcm_token(db: Session, data: DeviceTokenModel):
    tokenData = DeviceToken(
        fcm_token = data.fcm_token,
        platform = data.platform
    )
    db.add(tokenData)
    db.commit()
    db.refresh(tokenData)
    return tokenData