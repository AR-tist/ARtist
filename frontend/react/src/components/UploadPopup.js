import React, { useState } from "react";
import Modal from "react-modal";
import axiosInstance from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchMidiList, setLoading } from "../store/slices/midi/midiAction";
import * as mm from "@magenta/music/es6";
import "./UploadPopup.css";
import YoutubeUploadModal from "../pages/MidiList/components/YoutubeUploadModal";

// react-modal에 대한 앱 요소 설정
Modal.setAppElement("#root"); // 루트 요소의 ID가 'root'라고 가정합니다

const UploadPopup = ({ onClose }) => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.user.user_instance.nickname);

  const [file, setFile] = useState(null); // 음악 파일
  const [image, setImage] = useState(null); // 이미지 상태 변수 추가
  const [title, setTitle] = useState(""); //노래 제목
  const [subtitle, setSubtitle] = useState(""); //노래 가수
  const [password, setPassword] = useState(""); //노래 비밀번호

  const [isYoutubeModalOpen, setIsYoutubeModalOpen] = useState(false);
  const [youtubeLink, setYoutubeLink] = useState("");

  const youtubeModalOpen = (link) => {
    console.log("Uploading YouTube link:", link);
    setIsYoutubeModalOpen(true)
    handleCancel();
  };

  const handleYoutubeUpload = (link) => {
    console.log("Uploading YouTube link:", link);
    onClose(); // YouTube modal 닫기
  };

  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [fileType, setFileType] = useState(""); // 이미지 또는 파일인지를 구분하기 위한 상태 변수

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragEnterImage = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDraggingImage(true);
    setIsDraggingFile(false);
  };

  const handleDragEnterFile = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDraggingFile(true);
    setIsDraggingImage(false);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDraggingImage(false);
    setIsDraggingFile(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDraggingImage(false);
    setIsDraggingFile(false);

    const droppedFile = event.dataTransfer.files[0];

    // 파일 확장자를 확인하여 이미지 또는 파일을 구분합니다.
    const fileName = droppedFile.name.toLowerCase();
    if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png")) {
      setFileType("image");
      setImage(droppedFile); // 이미지를 선택한 경우 이미지 상태 변수에 저장
    } else if (fileName.endsWith(".midi") || fileName.endsWith(".mp3")) {
      setFileType("file");
      setFile(droppedFile); // 파일을 선택한 경우 파일 상태 변수에 저장
    }
  };

  const handleClickFile = () => {
    document.getElementById("fileInput").click();
  };

  const handleClickImage = () => {
    document.getElementById("imageInput").click();
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const uploadMIDI = (file, img, title, subtitle, poster, password) => {
    console.log("Uploading MIDI file...");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("poster", poster);
    formData.append("password", password);
    if (img)
      formData.append("img", img);

    axiosInstance
      .post("/midi/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Upload successful:", response.data);
        dispatch(fetchMidiList());
      })
      .catch((error) => {
        console.error("Upload failed:", error);
      });
    dispatch(setLoading(false))
  };

  const handleUpload = () => {
    dispatch(setLoading(true))
    if (file && title) {
      const fileName = file.name.toLowerCase();
      if (fileName.endsWith(".midi") || fileName.endsWith(".mp3") || fileName.endsWith(".mid")) {
        // Check the file extension to determine the type
        const fileType = fileName.endsWith(".midi") || fileName.endsWith('.mid') ? "MIDI" : "MP3";


        if (fileType === "MIDI") {
          console.log("Uploading MIDI file:", file);
          uploadMIDI(file, image, title, subtitle, name, password);
        } else if (fileType === "MP3") {
          const model = new mm.OnsetsAndFrames(
            "https://storage.googleapis.com/magentadata/js/checkpoints/transcription/onsets_frames_uni"
          );
          model.initialize().then(() => {
            model.transcribeFromAudioFile(file).then((ns) => {
              const midiData = mm.sequenceProtoToMidi(ns);
              const blob = new Blob([midiData], { type: "audio/mid" });

              let fileName = title;
              fileName = fileName.replace(".", "_");
              fileName += ".mid";

              console.log(new File([blob], fileName, { type: "audio/mid" }));
              uploadMIDI(new File([blob], fileName, { type: "audio/mid" }), image, title, subtitle, name, password);
            });
          });
        }

      } else {
        console.log("Invalid file type selected. Not uploading.");
      }
    } else {
      console.log("Title or file not selected. Not uploading.");
    }

    onClose(); // Close pop-up window
  };


  const handleCancel = () => {
    onClose(); // 팝업 창 닫기
  };

  const handleTitleChange = (event) => {
    const titleValue = event.target.value;
    setTitle(titleValue);
  };


  const handleSubTitleChange = (event) => {
    const subtitleValue = event.target.value;
    setSubtitle(subtitleValue);
  };


  const handlePasswordChange = (event) => {
    const passwordValue = event.target.value;
    setPassword(passwordValue);
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={handleCancel}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99,
          backgroundColor: "rgba(15, 15, 15, 0.79)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        content: {
          position: "absolute",
          top: "50%", // modal을 수직으로 중앙 배치
          left: "50%", // modal을 수평으로 중앙 배치
          transform: "translate(-50%, -50%)", // Centering trick
          width: "450px",
          height: "550px",
          border: "1px solid #ccc",
          background: "#fff",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "4px",
          outline: "none",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        },
        // 스타일은 동일하게 유지
      }}
    >
      <button className="close-button" onClick={handleCancel}>
        X
      </button>
      <div className={'popup-zone'} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 className="file-Upload">새로운 곡 업로드 하기</h3>

        <div style={{ display: "flex", flexDirection: "row" }}>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", marginRight: "10px" }}>
            <input
              type="file"
              id="imageInput"
              style={{ display: "none" }}
              onChange={handleImageChange}
              accept="image/*"
            />
            <text>앨범 이미지</text>
            <div
              className={`drop-zone ${isDraggingImage ? "drag-over" : ""}`}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnterImage}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleClickImage}
            >
              {image ? (
                <img
                  className="DragAndDrop-img"
                  src={URL.createObjectURL(image)}
                />
              ) : (
                <>
                  <div className="DragAndDrop-container">
                    <>
                      <img
                        className="DragAndDrop-img"
                        src="img\파일업로드이미지.png"
                      />
                      <p>{"이미지(아이콘)"}</p>
                    </>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* 음원파일 부분 클릭 & 드래그 */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <text>음원 파일</text>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept=".mp3, .midi, .mid"
            />
            <div
              className={`drop-zone ${isDraggingFile ? "drag-over" : ""}`}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnterFile}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleClickFile}
            >
              {file ? (
                <p>File: {file.name}</p>
              ) : (
                <>
                  <div className="DragAndDrop-container">
                    <img
                      className="DragAndDrop-img"
                      src="img/파일업로드이미지.png"
                      alt="Upload Icon"
                    />
                    <p>MP3 또는 MIDI 파일</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div style={{ borderBottom: '2px solid black' }} className="text-input-container">
          <text>곡 제목</text>
          <input class="text-input" autoComplete="off" onChange={handleTitleChange} />
        </div>
        <div style={{ borderBottom: '2px solid black' }} className="text-input-container">
          <text>가수</text>
          <input class="text-input" autoComplete="off" onChange={handleSubTitleChange} />
        </div>
        <div style={{ borderBottom: '2px solid black' }} className="text-input-container">
          <text >비밀번호</text>
          <input class="text-input" autoComplete="off" type="password" maxLength='5' onChange={handlePasswordChange} />
        </div>

        <div className="upload-button-container">
          <button style={{ cursor: 'pointer' }} className="MIDI-Upload" onClick={() => handleUpload()}>
            Upload
          </button>
        </div>

        <button
          className="goto-youtube-Upload-button"
          onClick={youtubeModalOpen}
        >
          Go to upload a YouTube link →
        </button>

        <YoutubeUploadModal
          isOpen={isYoutubeModalOpen}
          onClose={() => setIsYoutubeModalOpen(false)}
          handleYoutubeUpload={handleYoutubeUpload}
        />

      </div>
    </Modal>
  );
};

export default UploadPopup;
