from pathlib import Path
from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from fastapi.encoders import jsonable_encoder
from pymongo import MongoClient
from fastapi.responses import FileResponse, JSONResponse
import os
import datetime
import hashlib
from PIL import Image
import pretty_midi

router = APIRouter(
    prefix=f"/{os.environ['FASTAPI_BASE_PATH']}/midi",
    tags=["midi"]
)

client = MongoClient(f'mongodb://{os.environ["MONGO_ROOT_USERNAME"]}:{os.environ["MONGO_ROOT_PASSWORD"]}@db.ar-tist.kro.kr.container:27017/')
db = client[os.environ["MONGO_DB_NAME"]]
collection = db['MidiFile']

upload_path = '/data'

@router.delete("/delete/{filename:path}")
async def delete_file(filename: str):
    file_path = Path(upload_path) / filename

    try:
        # 데이터베이스에서 해당 파일 정보 삭제
        result = collection.delete_one({"filename": filename})

        # 삭제된 문서가 없다면 404 에러 반환
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="File not found in the database")

        # 파일 존재 확인
        if not file_path.is_file():
            raise HTTPException(status_code=404, detail="File not found")

        # 파일 삭제
        file_path.unlink()
        return {"message": "File deleted successfully"}
    except HTTPException as e:
        raise e
    except Exception as ex:
        print(ex)
        raise HTTPException(status_code=500, detail="Error deleting the file")
    
@router.get("/download/{filename:path}")
async def download_file(filename: str):
    file_path = Path(upload_path) / filename

    if not file_path.is_file():
        raise HTTPException(status_code=404, detail="File not found")

    return FileResponse(file_path, filename=filename)


@router.post("/like/{filename:path}/{user_id}")
async def post_like_file(filename: str, user_id: str):
    try:
        # is_like 가 true 이면 이미 좋아요를 누른 상태이면 -1 하고 데이터 삭제
        likeTable = db['LikeTable']
        like = likeTable.find_one({"user_id": user_id, "filename": filename})

        if like is not None:
            result = collection.update_one({"filename": filename}, {"$inc": {"like": -1}})
            if result.modified_count == 0:
                raise HTTPException(status_code=404, detail="File not found in the database")
            likeTable.delete_one({"user_id": user_id, "filename": filename})
            return JSONResponse(content={"is_like": False,"message": "UnLike successfully"})
        else:
            result = collection.update_one({"filename": filename}, {"$inc": {"like": 1}})
            if result.modified_count == 0:
                raise HTTPException(status_code=404, detail="File not found in the database")

            new_like = {
                "user_id": user_id,
                "filename": filename,
            }
            output = likeTable.insert_one(new_like)

            # JSON 응답 반환
            return JSONResponse(content={"is_like": True,"message": "Like successfully"})
    except Exception as e:
        # 에러 발생 시 500 에러 응답
        raise HTTPException(status_code=500, detail="Error like the file")

@router.get("/like/{filename:path}/{user_id}")
async def get_like_file(filename: str, user_id: str):
    try:
        # LikeTable에 user_id 와 filename이 동시에 있으면 is_like 가 true
        likeTable = db['LikeTable']
        like = likeTable.find_one({"user_id": user_id, "filename": filename})
        if like is not None:
            return JSONResponse(content={"is_like": True})
        else:
            return JSONResponse(content={"is_like": False})
    except Exception as e:
        # 에러 발생 시 500 에러 응답
        raise HTTPException(status_code=500, detail="Error like the file")

@router.get("/list")
async def get_midi_list():
    try:
        # MongoDB에서 데이터 가져오기
        files = collection.find({}, projection={"_id": False, "filename": True, "timestamp": True, "title": True, "imgurl": True, "subtitle": True, "rank": True, "poster": True, "like": True, "views": True, "music_length": True})

        # 가져온 데이터를 JSON 형식으로 변환
        file_list = []
        for file in files:
            download_url = f"/midi/download/{file['filename']}"
            delete_url = f"/midi/delete/{file['filename']}"
            if file["imgurl"] == "":
                img_url = ""
            else:
                img_url = f"/midi/download/{file['imgurl']}"
            file_item = {
                "timestamp": file["timestamp"],
                "filename": file["filename"],
                "title": file["title"],
                "imgurl": img_url,
                "subtitle": file["subtitle"],
                "rank": file["rank"],
                "poster": file["poster"],
                "like": file["like"],
                "views": file["views"],
                "music_length": file["music_length"],
                "download_url": download_url,
                "delete_url": delete_url,
            }
            file_list.append(file_item)

        # JSON 응답 반환
        return JSONResponse(content=jsonable_encoder(file_list))
    except Exception as e:
        # 에러 발생 시 500 에러 응답
        raise HTTPException(status_code=500, detail="Error retrieving MIDI file list")
        

@router.post("/upload")
async def upload_midi_file(
    title: str = Form(...),
    subtitle: str = Form(...),
    poster: str = Form(...),
    password: str = Form(...),
    file: UploadFile = File(...),
    img: UploadFile = File(None)
):
    # 미디 파일이 아닌 경우 에러 응답
    if not file.filename.endswith(".mid"):
        return JSONResponse(content={"error": "Invalid file format"}, status_code=400)
    
    # 파일 저장 경로 설정
    date_suffix = datetime.datetime.now().timestamp()
    file_name = f"{title}-{date_suffix}.mid"
    file_path = os.path.join(upload_path, file_name)

    # 파일 저장
    with open(file_path, "wb") as f:
        f.write(file.file.read())
        
    # 만약 이미지 파일이 없으면 img_path을 빈 문자열로 설정
    if img is None:
        img_name = ""
    else:
        extension = img.filename.split(".")[-1]
        # 이미지 저장
        img_name = f"{title}-{date_suffix}.{extension}"
        img_path = os.path.join(upload_path, img_name)
        
        # 이미지 리사이징, 비율 유지
        img_pil = Image.open(img.file)
        img_pil = img_pil.resize((120,120))
        img_pil.save(img_path)
        
        up_img_name = f"up-{title}-{date_suffix}.{extension}"
        up_img_path = os.path.join(upload_path, up_img_name)

        img_pil = Image.open(img.file)
        img_pil = img_pil.resize((200,200))
        img_pil.save(up_img_path)

    # sha-256 password
    hash_password = hashlib.sha256(password.encode()).hexdigest()
    
    # midi 읽기
    midi = pretty_midi.PrettyMIDI(file_path)
    music_length = midi.get_end_time()
    
    # MongoDB에 데이터 저장
    new_midi_file = {
        "filename": file_name,
        "title": title,
        "imgurl": img_name,
        "subtitle": subtitle,
        "poster": poster,
        "rank": 0,
        "like": 0,
        "views": 0,
        "music_length": music_length,
        "password": hash_password,
        "timestamp": date_suffix,
    }
    output = collection.insert_one(new_midi_file)
    print(output.inserted_id)

    # 응답 생성
    response = {
        "timestamp": date_suffix,
        "filename": file_name,
        "title": title,
        "downloadUrl": f"/midi/download/{output.inserted_id}",
    }

    return response
