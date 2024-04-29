import React, { useState } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import ConnectPhone from "./components/ConnectPhone";
import ConnectKeyboard from "./components/ConnectKeyboard";
import ConnectPiano from "./components/ConnectPiano";
import { useSelector, useDispatch } from "react-redux";
import { setDevice } from "../../store/slices/user/userAction";

const EquipmentChangePage = () => {
  const dispatch = useDispatch();
  const user_instance = useSelector((state) => state.user.user_instance);
  console.log(user_instance);
  const handleButtonClick = (buttonNumber) => {
    dispatch(setDevice(buttonNumber));
  };

  return (
    <>
      <Header />
      <Layout></Layout>

      <div id="app" className="container" style={{}}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "30px",
            marginBottom: "70px",
            marginLeft: "360px",
          }}
        >
          <h1 style={{ fontSize: "26px" }}>장비 연결하기</h1>
        </div>

        <div
          className="EquipmentList"
          style={{ display: "flex", marginLeft: "350px" }}
        >
          <div
            className="Phone"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <button
              onClick={() => handleButtonClick(0)}
              style={{
                display: "block",
                backgroundColor: "transparent",
                border: "none",
                boxSahdow: "none",
                marginTop: "10px",
                cursor: "pointer",
              }}
            >
              <img
                src="./img/휴대폰연결하기.png"
                alt="장비_휴대폰"
                style={{
                  float: "left",
                  width: "283px",
                  height: "343px",
                }}
              />
            </button>
          </div>

          <div
            className="keyboard"
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "30px",
            }}
          >
            <button
              onClick={() => handleButtonClick(1)}
              style={{
                display: "block",
                backgroundColor: "transparent",
                border: "none",
                boxSahdow: "none",
                marginTop: "10px",
                cursor: "pointer",
              }}
            >
              <img
                src="./img/키보드연결하기.png"
                alt="장비_키보드"
                style={{
                  float: "left",
                  width: "283px",
                  height: "343px",
                }}
              />
            </button>
          </div>

          <div
            className="piano"
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "30px",
            }}
          >
            <button
              onClick={() => handleButtonClick(2)}
              style={{
                display: "block",
                backgroundColor: "transparent",
                border: "none",
                boxSahdow: "none",
                marginTop: "10px",
                cursor: "pointer",
              }}
            >
              <img
                src="./img/피아노연결하기.png"
                alt="장비_피아노"
                style={{
                  float: "left",
                  width: "283px",
                  height: "343px",
                }}
              />
            </button>
          </div>
        </div>
        <div>
          {user_instance.device === 0 && <ConnectPhone />}
          {user_instance.device === 1 && <ConnectKeyboard />}
          {user_instance.device === 2 && <ConnectPiano />}
        </div>
      </div>
    </>
  );
};

export default EquipmentChangePage;
