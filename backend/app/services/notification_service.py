from firebase_admin import messaging
from sqlalchemy.orm import Session

from app.crud.notification import create_fcm_token, fetch_fcm_token
from app.schemas.internal.device_token import DeviceTokenModel

class NotificationService:
    def save_fcm_token(self, db: Session, data: DeviceTokenModel):
        try:
            existing_token = fetch_fcm_token(db, data.fcm_token)
        
            if not existing_token:
                token_data = create_fcm_token(db, data)
            else: 
                token_data = existing_token
                
            messaging.subscribe_to_topic([data.fcm_token], "broadcast")
            
            return token_data
        except Exception as e:
            print("Saving FCM Token error: ", e)
            return None
    
    def send_broadcast(self, channel: str, title: str, body: str):
        message = messaging.Message(
            notification=messaging.Notification(
                title=title,
                body=body
            ),
            topic="broadcast",
            
            android=messaging.AndroidConfig(
                priority="high",
                notification=messaging.AndroidNotification(
                    channel_id=channel,
                    default_sound=True,
                    default_vibrate_timings=True
                )
            ),
            
            apns=messaging.APNSConfig(
                payload=messaging.APNSPayload(
                    aps=messaging.Aps(
                        alert=messaging.ApsAlert(title=title, body=body),
                        sound="default",
                        badge=1,
                        content_available=True
                    )
                ),
                headers={
                    "apns-priority": "10"
                }
            )
        )
        
        
        return messaging.send(message)
    
    def send_warning_to_all(self):
        return self.send_broadcast(
            channel='warning-alerts',
            title='LigtasCheck AI Warning',
            body='This is a warning from LigtasCheck AI'
        )
    
    def send_critical_to_all(self):
        return self.send_broadcast(
            channel='critical-alerts',
            title='LigtasCheck AI Critical Alert',
            body='This is a critical alert from LigtasCheck AI. Please evacuate immediately.'
        )