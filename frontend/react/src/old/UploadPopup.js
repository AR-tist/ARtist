import React from 'react';

const UploadPopup = ({ onClose }) => {
  const handleUpload = () => {
    // 업로드 처리 로직 작성
    onClose(); // 팝업 창 닫기
  };

  const handleCancel = () => {
    onClose(); // 팝업 창 닫기
  };

  return (
    <div>
      <h2>팝업 페이지</h2>
      <p>내용을 추가하세요...</p>
      <button onClick={handleUpload}>업로드</button>
      <button onClick={handleCancel}>취소</button>
    </div>
  );
};

export default UploadPopup;