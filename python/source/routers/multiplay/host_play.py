import time
import os
from pymongo import MongoClient

async def hostPlay(event, connected_clients, rooms):
    room = rooms[event['room_id']]
    for guest in room.guests:
        room.guests[guest].load_complete = 0
    
    for guest in room.guests:
        await connected_clients[guest].send_text(
            str({'type': 'areYouReady', 'data': {}}).replace("'", '"')
        )
    client = MongoClient(f'mongodb://{os.environ["MONGO_ROOT_USERNAME"]}:{os.environ["MONGO_ROOT_PASSWORD"]}@db.ar-tist.kro.kr.container:27017/')
    db = client[os.environ["MONGO_DB_NAME"]]
    collection = db['MidiFile']

    # increment 1 to play_count field
    collection.update_one({"filename": room.music_instance.filename}, {"$inc": {"views": 1}})

    print(f'{event["connectionID"]} - {event["nickname"]} command host Start in room {event["room_id"]}')
    
