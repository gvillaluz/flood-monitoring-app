from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.services.notification_service import NotificationService
from app.db.session import get_db
from app.schemas.internal.device_token import DeviceTokenModel

router = APIRouter()
service = NotificationService()

@router.post('/register-token')
async def register_device_token(payload: DeviceTokenModel,db: Session = Depends(get_db)):
    token_data = service.save_fcm_token(db, payload)
    
    print(token_data)
    
    return {
        "message": "endpoint pinged",
        "token": token_data
    }
    
@router.get('/send-broadcast')
async def try_broadcast():
    service.send_warning_to_all()
    
@router.get('/send-critical')
async def critical_broadcast():
    service.send_critical_to_all()