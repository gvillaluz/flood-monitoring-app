from apscheduler.schedulers.asyncio import AsyncIOScheduler
from app.services.pagasa_service import PagasaService
from app.db.session import SessionLocal
from app.services.inference_service import InferenceService
from app.services.notification_service import NotificationService

pagasa_api_service = PagasaService()
inference_service = InferenceService()
notification_service = NotificationService()

scheduler = AsyncIOScheduler()

async def fetch_and_predict():
    db = SessionLocal()
    
    try:
        print("The server is fetching")
        data = await pagasa_api_service.fetch_all_data(db)
        
        if data is not None:
            prediction = inference_service.fetch_and_predict(db)
            
            if prediction is not None:
                data = inference_service.update_flood_records(db, data, prediction)
                print("Prediction Water Level: ", prediction)
            else:
                print("⚠️ Prediction skipped (Not enough history data)")
            
        if data.predicted_wl >= 17.0:
            notification_service.send_critical_to_all(
                message=f'Water level is predicted to surge to {data.predicted_wl}m soon. Immediate evacuation will be required. Move to safe ground immediately.'
            )
        elif data.predicted_wl >= 16.0:
            notification_service.send_warning_to_all(
                message=f'Water level is predicted to rise to {data.predicted_wl}m by the next hour. Residents in low-lying areas should consider evacuating now.'
            )
        elif data.predicted_wl >= 15.0:
            notification_service.send_warning_to_all(
                message=f'Water level is predicted to reach the {data.predicted_wl}m threshold within the next hour. Residents should prepare survival kits and monitor updates.'
            )
            
        print("Processed Data: ", data.id)
        print("Server successfully fetched data.")
    except Exception as e:
        db.rollback()
        print(e)
    finally:
        db.close()

def start_scheduler():
    scheduler.add_job(fetch_and_predict, "cron", minute="7,17,27,37,47,57")
    scheduler.start()
    print("🚀 Scheduler has started in the background!")