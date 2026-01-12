from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.models.base import Base
from app.db.session import engine
from app.models import evacuation_model, hotlines_model, device_token_model, flood_record_model
from app.routes.prediction_routes import router as predict_router
from app.scheduler.fetch_job import start_scheduler
from app.routes.live_data_routes import router as live_data_router
from app.routes.evacuation_routes import router as evacuation_router
from app.routes.hotline_routes import router as hotline_router
from app.routes.notification_routes import router as notification_router
from app.firebase_config import init_firebase

Base.metadata.create_all(engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("The server is starting")
    init_firebase()
    start_scheduler()
    yield

app = FastAPI(
    title='Flood Monitoring System',
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(predict_router, prefix='/api')
app.include_router(live_data_router, prefix='/api')
app.include_router(evacuation_router, prefix='/api')
app.include_router(hotline_router, prefix='/api')
app.include_router(notification_router, prefix='/api')