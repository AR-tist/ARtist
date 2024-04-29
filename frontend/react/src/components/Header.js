import React, { useEffect, useState } from "react";
import UploadPopup from "./UploadPopup.js";
import { useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import { useSelector, useDispatch } from "react-redux";
import { setNickname, setClient } from "../store/slices/user/userAction";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user_instance = useSelector((state) => state.user.user_instance);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const handleUploadClick = () => {
    setPopupVisible(true); // 팝업 창 열기
  };

  const handleClosePopup = () => {
    setPopupVisible(false); // 팝업 창 닫기
  };

  const handleChangeEquipmentClick = () => {
    navigate("/equipment-change");
  };

  const handleNicknameChange = () => {
    const nicknameInput = document.getElementById("nickname_input");
    const tempNickname = nicknameInput.value.trim();

    if (tempNickname === "") {
      // 입력값이 없으면 입력 필드에 포커스 설정
      nicknameInput.focus();
    } else {
      // 입력값이 있으면 쿠키 저장 및 dispatch(setNickname()) 호출
      setCookie(tempNickname);
    }
  };

  const setCookie = (tempNickname) => {
    // const expires = new Date();
    // expires.setDate(expires.getDate() + 7); // 7일 후 만료

    dispatch(setNickname(tempNickname));

    document.getElementById("nickname_input").placeholder =
      tempNickname;
    alert('닉네임이 "' + tempNickname + '"로 변경되었습니다.');
  };

  const navigateToWholeSong = () => {
    navigate("/whole-song"); // 전체 업로드 곡 보기 페이지로 전환
  };

  const [searchKeyword, setSearchKeyword] = useState("");
  const [isAutoKeywordVisible, setAutoKeywordVisible] = useState(false);

  const handleInputChange = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);

    // 입력값이 있을 때만 auto_keyword_area를 보이도록 설정
    setAutoKeywordVisible(keyword.length > 0);
  };

  return (
    <>
      <header
        id="header"
        class="header"
        style={{
          width: "225px",
          left: "0",
          transform: "none",
          position: "fixed",
          top: "0",
          bottom: "0px",
          borderRight: "1px solid #f5f5f5",
          zIndex: "30",
          backgroundColor: "#fff",
          paddingLeft: "60px",
        }}
      >
        <h1 class="logo_wrap">
          <button
            className="logo-button"
            style={{
              backgroundPosition: "-255px -321px",
              // width: "114px",
              // height: "20px",
              display: "block",
              // paddingTop: "20px",
              margin: "37px 10px 5px 20px",
              backgroundColor: "transparent",
              border: "none",
              boxSahdow: "none",
              fontSize: "35px",
              fontWeight: "700",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            ARtist
          </button>
        </h1>
        <div
          class="menu_wrap"
          style={{
            top: "73px",
            right: "0",
            bottom: "0",
            left: "0",
            padding: "30px 16px 0 24px",
            overflowY: "auto",
          }}
        >
          <div
            class="profile_area"
            style={{
              width: "177px",
              border: "1px solid hsla(0, 0%, 100%, 0.1)",
              borderWidth: "1px 0",
            }}
          >
            <input
              id="nickname_input"
              type="text"
              placeholder={user_instance.nickname}
              maxlength="15"
              style={{
                backgroundColor: "transparent",
                border: "none",
                fontSize: "18px",
                width: "172px",
                marginLeft: "0",
                fontWeight: "400",
              }}
            />
          </div>
          <div
            class="search_area"
            style={{
              width: "177px",
              position: "relative",
              marginTop: "20px",
              borderRadius: "4px",
            }}
          >
            <span
              class="input_area"
              style={{ position: "relative", display: "block" }}
            >
              <input
                type="search"
                role="combobox"
                id="search_keyword"
                aria-expanded="false"
                title="검색창"
                placeholder="음악 검색하기"
                autoComplete="off"
                class="input_search"
                style={{
                  display: "block",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  wordBreak: "break-all",
                  padding: "10px 36px 10px 44px",
                  width: "100%",
                  height: "35px",
                  border: "0",
                  backgroundColor: "#ededed",
                  borderRadius: "10px",
                  fontSize: "15px",
                  fontWeight: "700",
                  lineHeight: "20px",
                  letterSpacing: "-0.3px",
                  color: "#000",
                }}
                onChange={handleInputChange} // 입력값이 변경될 때마다 호출됨
              ></input>
              <span
                class="icon_search"
                style={{
                  backgroundPosition: "-228px -606px",
                  width: "15px",
                  height: "15px",
                  position: "absolute",
                  top: "10px",
                  left: "13px",
                }}
              >
                <img
                  className="search-img"
                  src="../img/검색회색.png"
                  alt="검색"
                  style={{
                    width: "20px",
                    height: "20px",
                    position: "absolute",
                    top: "50%",
                    WebkitTransform: "translateY(-50%)",
                    transform: "translateY(-50%)",
                  }}
                />
              </span>
            </span>

            {isAutoKeywordVisible && (
              <div
                class="auto_keyword_area"
                style={{
                  zIndex: "20",
                  left: "85px",
                  position: "fixed",
                  width: "400px",
                  padding: "9px 0 8px",
                  marginTop: "1px",
                  borderRadius: "4px",
                  backgroundColor: "#ededed",
                }}
              >
                <ui
                  role="listbox"
                  class="keyword_list"
                  style={{
                    display: "block",
                    marginBlockStart: "1em",
                    marginBlockEnd: "1em",
                    paddingInlineStart: "40px",
                  }}
                >
                  <li
                    role="presentation"
                    class="keyword_list_item"
                    style={{ listStyle: "none" }}
                  >
                    <a
                      role="option"
                      aria-selected="false"
                      class="auto_keyword"
                      style={{}}
                    >
                      {" "}
                      검색어{" "}
                    </a>
                  </li>
                </ui>
              </div>
            )}
          </div>

          <div class="menu_area">
            <button
              className="nickname-change-button"
              style={{
                display: "block",
                backgroundColor: "transparent",
                border: "none",
                boxSahdow: "none",
                fontSize: "15px",
                fontWeight: "300",
                marginTop: "20px",
                cursor: "pointer",
              }}
              onClick={handleNicknameChange}
            >
              닉네임 변경
            </button>
            <button
              className="upload-button"
              style={{
                display: "block",
                backgroundColor: "transparent",
                border: "none",
                boxSahdow: "none",
                fontSize: "15px",
                fontWeight: "300",
                marginTop: "20px",
                cursor: "pointer",
              }}
              onClick={handleUploadClick}
            >
              업로드 하기
            </button>
            {isPopupVisible && <UploadPopup onClose={handleClosePopup} />}
            <button
              className="change-equipment-button"
              style={{
                display: "block",
                backgroundColor: "transparent",
                border: "none",
                boxSahdow: "none",
                fontSize: "15px",
                fontWeight: "300",
                marginTop: "20px",
                cursor: "pointer",
              }}
              onClick={handleChangeEquipmentClick}
            >
              장비 연결하기
            </button>
            <button
              className="entire-song-button"
              style={{
                display: "block",
                backgroundColor: "transparent",
                border: "none",
                boxSahdow: "none",
                fontSize: "15px",
                fontWeight: "300",
                marginTop: "20px",
                cursor: "pointer",
              }}
              onClick={navigateToWholeSong}
            >
              전체 업로드 곡 보기 {">"}
            </button>
          </div>
          <div style={{ width: "149px", height: "192px" }}>
            <div
              style={{
                width: "149px",
                height: "166px",
                position: "absolute",
                left: "80px",
                top: "736.5px",
                borderRadius: "10px",
                background: "#fff",
              }}
            ></div>
            {/* <img
              src="../img/정보아이콘.png"
              style={{
                width: "31px",
                height: "31px",
                objectFit: "cover",
                position: "absolute",
                top: "726px",
              }}
            /> */}
            <div style={{ width: "122px", height: "105px" }}>
              <div style={{ width: "39px", height: "42px" }}>
                <p
                  style={{
                    position: "absolute",
                    left: "90px",
                    top: "400px",
                    fontSize: "14px",
                    textAlign: "center",
                    color: "#A4A4A4",
                  }}
                >
                  장비
                </p>
                <p
                  style={{
                    position: "absolute",
                    left: "90px",
                    top: "425px",
                    fontSize: "14px",
                    textAlign: "center",
                    color: "#7f7f7f",
                  }}
                >
                  {(() => {
                    switch (user_instance.device) {
                      case 0:
                        return "어플리케이션";
                      case 1:
                        return "키보드";
                      case 2:
                        return "MIDI 디바이스";
                      default:
                        return "Unknown Device";
                    }
                  })()}
                </p>
              </div>
              <div style={{ width: "122px", height: "42px" }}>
                <p
                  style={{
                    position: "absolute",
                    left: "90px",
                    top: "470px",
                    fontSize: "14px",
                    textAlign: "center",
                    color: "#A4A4A4",
                  }}
                >
                  모드
                </p>
                <p
                  style={{
                    position: "absolute",
                    left: "90px",
                    top: "490px",
                    fontSize: "14px",
                    textAlign: "center",
                    color: "#7f7f7f",
                  }}
                >
                  {(() => {
                    switch (user_instance.play_mode) {
                      case 0:
                        return "연주 모드 - 기본";
                      case 1:
                        return "연습 모드 - 소프라노";
                      case 2:
                        return "연습 모드 - 알토";
                      default:
                        return "Unknown play mode";
                    }
                  })()}
                </p>
              </div>
              <div style={{ width: "39px", height: "42px" }}>
                <p
                  style={{
                    position: "absolute",
                    left: "90px",
                    top: "530px",
                    fontSize: "14px",
                    textAlign: "center",
                    color: "#A4A4A4",
                  }}
                >
                  Tempo
                </p>
                <p
                  style={{
                    position: "absolute",
                    left: "90px",
                    top: "550px",
                    fontSize: "14px",
                    textAlign: "center",
                    color: "#7f7f7f",
                  }}
                >
                  {user_instance.tempo}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
