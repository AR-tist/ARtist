import React from "react";
import Participants from "./components/Participants";

const Room = () => {
  return (
    <>
      <div id="app" className="container" style={{ marginLeft: "350px" }}>
        <div
          style={{
            display: "flex",
            marginTop: "30px",
            marginBottom: "45px",
          }}
        >
          <h1 style={{ fontSize: "25px" }}>푸른고양이82의 방</h1>
          <button
            style={{
              width: "70px",
              height: "25px",
              color: "white",
              backgroundColor: "#39d446",
              border: "none",
              borderRadius: "5px",
              marginTop: "25px",
              marginLeft: "960px",
            }}
          >
            PLAY
          </button>
        </div>

        <div
          style={{
            display: "flex",
          }}
        >
          <img
            src="./img/하입보이앨범커버.jpg"
            alt="앨범 커버"
            style={{
              float: "left",
              marginRight: "20px",
              width: "200px",
              height: "200px",
            }}
          />
          <div className="song_information" style={{}}>
            <div style={{}}>
              <h2
                style={{
                  marginTop: "1px",
                  marginBottom: "1px",
                  fontSize: "28px",
                }}
              >
                사건의 지평선
              </h2>
              <p style={{ fontSize: "15px", color: "#505050" }}>우는애벌레32</p>
            </div>

            <div style={{ marginTop: "85px" }}>
              <p
                style={{
                  fontSize: "15px",
                  color: "#505050",
                  display: "inline-block",
                }}
              >
                곡 길이
              </p>
              <p
                style={{
                  fontSize: "15px",
                  color: "#505050",
                  display: "inline-block",
                  marginLeft: "5px",
                }}
              >
                04:12
              </p>
            </div>
          </div>

          <div style={{ marginLeft: "700px" }}>
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#AEAEAE",
              }}
            >
              초대 링크
            </button>
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#AEAEAE",
              }}
            >
              곡 변경하기
            </button>
          </div>
        </div>
      </div>
      <Participants />
    </>
  );
};

export default Room;
