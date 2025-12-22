from fastapi import APIRouter

router = APIRouter()

@router.get('/ping')
async def ping():
    return {
        "success": True,
        "message": "The request reached the api endpoint"
    }
    
@router.get("/latest/prediction")
async def get_latest_prediction():
    return {
        "prediction": "prediction"
    }