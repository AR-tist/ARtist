import React from "react";

const Menu = ({ isSidebarOpen }) => {
  return (
    <div
      className="sidebar"
      style={{
        position: "fixed",
        justifyContent: "center",
        top: 0,
        right: 0,
        width: "400px",
        height: "100%",
        backgroundColor: "#f5f5f5",
        boxShadow: "-2px 0 2px rgba(0, 0, 0, 0.2)",
        display: isSidebarOpen ? "block" : "none",
      }}
    >
      {/* 프로필 이미지 */}
      <div
        className="profile-info"
        style={{
          marginTop: "120px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <div className="profile-image" style={{ marginLeft: "20px" }}>
          <img
            className="Profile-img"
            src="img\프로필.png"
            alt="프로필 이미지"
            width="34"
            height="34"
          />
        </div>

        {/* 닉네임 */}
        <h4 style={{ marginLeft: "20px" }}>닉네임</h4>
      </div>

      {/* 가로선 추가 */}
      <hr
        style={{
          width: "90%",
          borderTop: "1px solid #ddd",
          margin: "20px auto",
        }}
      />

      <div
        className="menu-list"
        style={{
          margin: "300px 20px",
        }}
      >
        {/* '방 만들기' 버튼 */}
        <div className="list">
          <img
            className="room-img"
            src="img\방만들기.png"
            alt="방만들기 이미지"
            width="24"
            height="28"
            style={{ marginLeft: "3px" }}
          />

          <button
            className="sidebar-button"
            style={{
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              borderRadius: "5px",
              cursor: "pointer",
              display: "block",
              backgroundColor: "transparent",
              border: "none",
              boxSahdow: "none",
              fontSize: "15px",
              marginLeft: "22px",
            }}
          >
            방 만들기
          </button>
        </div>

        <div className="list">
          {/* '파일 변환하기' 버튼 */}
          <img
            className="conversion-img"
            src="img\변환.png"
            alt="변환 이미지"
            width="30"
            height="30"
          />
          <button
            className="sidebar-button"
            style={{
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              borderRadius: "5px",
              cursor: "pointer",
              display: "block",
              backgroundColor: "transparent",
              border: "none",
              boxSahdow: "none",
              fontSize: "15px",
              marginLeft: "20px",
            }}
          >
            파일 변환하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
