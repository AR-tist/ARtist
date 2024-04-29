import React, { useState } from "react";
import Modal from "react-modal";

import "./YoutubeUploadModal.css";

const YoutubeUploadModal = ({ isOpen, onClose, handleYoutubeUpload }) => {
  const [youtubeLink, setYoutubeLink] = useState("");

  const handleYoutubeLinkChange = (event) => {
    const value = event.target.value;
    setYoutubeLink(value);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
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
          width: "30%",
          height: "50%",
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
      <button className="close-button" onClick={onClose}>
        X
      </button>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 className="youtube-link-Upload">Youtube link Upload</h3>

        <input
          className="youtube-link"
          type="text"
          value={youtubeLink}
          onChange={handleYoutubeLinkChange}
          placeholder="유튜브 링크를 입력하세요"
        />

        <div className="youtube-Upload-button-container">
          <button
            className="youtube-Upload"
            onClick={() => handleYoutubeUpload(youtubeLink)}
          >
            Youtube Upload
          </button>
        </div>

        <button className="goto-file-upload-button" onClick={onClose}>
          Go to upload a file →
        </button>
      </div>
    </Modal>
  );
};

export default YoutubeUploadModal;
