from fastapi import APIRouter, WebSocket
import uuid
import logging
import json
import os

from .multiplay.host_play import hostPlay
from .multiplay.imready import imready
from .multiplay.connect import connect
from .multiplay.disconnect import disconnect
from .multiplay.keyboard import keyDown, keyUp
import time

import traceback

router = APIRouter(
	prefix=f"/{os.environ['FASTAPI_BASE_PATH']}/ws",
    tags=["websocket"]
)

connected_clients = {}
rooms = {}


async def message_handler(event):
    if event['type'] == 'connect':
        await connect(event, connected_clients, rooms)
    elif event['type'] == 'disconnect':
        await disconnect(event, connected_clients, rooms)
    elif event['type'] == 'host_play':
        await hostPlay(event, connected_clients, rooms)
    elif event['type'] == 'imready':
        await imready(event, connected_clients, rooms)
    elif event['type'] == 'keyDown':
        await keyDown(event, connected_clients, rooms)
    elif event['type'] == 'keyUp':
        await keyUp(event, connected_clients, rooms)
        



@router.websocket("/")
async def websocket_endpoint(websocket: WebSocket, filename: str = '', room_id: str = '', nickname: str = '', user_id: str = '', device: int = '', play_mode: int = 0):
    connectionID = str(uuid.uuid4())
    event = {'type': 'connect', 'connectionID': connectionID, 'host': room_id == '', 'filename': filename, 'room_id': room_id, 'nickname': nickname, 'user_id': user_id, 'device': device, 'play_mode': play_mode}
    
    if room_id != '' and room_id not in rooms:
        await websocket.close()
        return
    
    await websocket.accept()
    connected_clients[connectionID] = websocket
    try:
        await message_handler(event)
        while True:
            message = await websocket.receive_text()
            print(f'{connectionID} - {nickname} - {message}')
            message_dict = json.loads(eval(message))
            for key in message_dict:
                event[key] = message_dict[key]
            await message_handler(event)
    except Exception as e:
        if e.__class__.__name__ != 'WebSocketDisconnect':
            logging.error(f'{connectionID} - {e}')
            print(traceback.format_exc())   
    finally:
        print(f'{connectionID} - {nickname} disconnected')
        event['type'] = 'disconnect'
        await message_handler(event)
        del connected_clients[connectionID]