from pymongo import MongoClient
import os

def get_midi( filename ):
    client = MongoClient(f'mongodb://{os.environ["MONGO_ROOT_USERNAME"]}:{os.environ["MONGO_ROOT_PASSWORD"]}@db.ar-tist.kro.kr.container:27017/')
    db = client[os.environ["MONGO_DB_NAME"]]
    collection = db['MidiFile']

    # find one document in collection by filename
    document = collection.find_one({"filename": filename})

    download_url = f"/midi/download/{document['filename']}"
    delete_url = f"/midi/delete/{document['filename']}"
    if document['imgurl'] == "":
        imgurl = ""
    else:
        imgurl = f"/midi/download/{'up-'+document['imgurl']}"
    document['download_url'] = download_url
    document['delete_url'] = delete_url
    document['imgurl'] = imgurl
    
    return document