from fastapi import APIRouter

router = APIRouter()

@router.post('/register-token')
async def register_device_token():
    return {
        "message": "endpoint pinged"
    }