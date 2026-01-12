from apscheduler.schedulers.asyncio import AsyncIOScheduler
from app.services.pagasa_service import PagasaService
from app.db.session import SessionLocal
from app.services.inference_service import InferenceService

pagasa_api_service = PagasaService()
inference_service = InferenceService()

scheduler = AsyncIOScheduler()

async def fetch_and_predict():
    db = SessionLocal()
    
    try:
        print("The server is fetching")
        data = await pagasa_api_service.fetch_all_data(db)
        
        if data is not None:
            prediction = inference_service.fetch_and_predict(db)
            
            if prediction is not None:
                inference_service.update_flood_records(db, data, prediction)
                print("Prediction Water Level: ", prediction)
            else:
                print("⚠️ Prediction skipped (Not enough history data)")
            
        print("Processed Data: ", data.id)
    except Exception as e:
        db.rollback()
        print(e)
    finally:
        db.close()

def start_scheduler():
    scheduler.add_job(fetch_and_predict, "cron", minute="7,17,27,37,47,57")
    scheduler.start()