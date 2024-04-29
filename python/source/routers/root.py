from fastapi import APIRouter

router = APIRouter(
	prefix="/api",
    tags=["root"]
)

@router.get("/")
async def root():
    return {"message": "Hello World3"}