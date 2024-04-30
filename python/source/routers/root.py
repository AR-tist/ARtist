from fastapi import APIRouter
import os

router = APIRouter(
	prefix=f"/{os.environ['FASTAPI_BASE_PATH']}",
    tags=["root"]
)

@router.get("/")
async def root():
    return {"message": "Hello World3"}