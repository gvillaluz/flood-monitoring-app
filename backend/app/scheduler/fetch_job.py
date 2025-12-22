from apscheduler.schedulers.asyncio import AsyncIOScheduler
from app.services.pagasa_service import PagasaService
from app.db.session import SessionLocal

pagasa_api_service = PagasaService()

async def fetch_and_predict():
    db = SessionLocal()
    
    try:
        print("The server is fetching")
        data = await pagasa_api_service.fetch_all_data(db)
        print("Processed Data: ", data)
    except Exception as e:
        db.rollback()
        print(e)
    finally:
        db.close()

def start_scheduler():
    scheduler = AsyncIOScheduler()
    scheduler.add_job(fetch_and_predict, "cron", minute="7,17,27,37,47,57")
    scheduler.start()