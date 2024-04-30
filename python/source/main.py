### IMPORTS ###
from fastapi import FastAPI
import uvicorn
from routers import midi, root, websocket
from fastapi.middleware.cors import CORSMiddleware
import os

### FastAPI ###
app = FastAPI(docs_url=f'/{os.environ["FASTAPI_BASE_PATH"]}/docs', openapi_url=f'/{os.environ["FASTAPI_BASE_PATH"]}/openapi.json')
app.include_router(root.router)
app.include_router(midi.router)
app.include_router(websocket.router)


### CORS ###
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

### MAIN ###
if __name__ == "__main__":
    uvicorn.run(app,host="0.0.0.0", port=80)