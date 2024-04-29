import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPhoneWsbaseURL } from "../../../utils/axios";
import cookie from "react-cookies";

const ConnectPhone = () => {
  const [serverStatus, setServerStatus] = useState("Stopped");
  const [ws, setWs] = useState(null);
  const [handCoordinates, setHandCoordinates] = useState({ x: 0, y: 0 });

  const user_instance = cookie.load("user_instance");

  const canvasRef = useRef(null);

  const connect = () => {
    const ip_address = document.getElementById("ip_address").value;
    const newWs = new WebSocket("ws://" + ip_address + ":4439");
    setWs(newWs);
    setPhoneWsbaseURL(newWs);

    user_instance.device = 2;
    cookie.save("user_instance", user_instance);

    newWs.onopen = () => {
      console.log("connected");
      newWs.send("ready");
      setServerStatus("Running");

    };

    newWs.onerror = (error) => {
      console.error("WebSocket encountered an error:", error);
      user_instance.device = 0;
      cookie.save("user_instance", user_instance);
      setServerStatus("Error");
    };

    newWs.onmessage = (e) => {
      try {
        const dataString = e.data;
        const tag = dataString.split("!", 2);
        const data = tag[1];

        switch (tag[0]) {
          case "0":
            drawHand(data);
            break;
          case "1":
            const dataString_split = data.split("?", 2);
            const handLH = dataString_split[0].trim();
            const pushNote = JSON.parse(dataString_split[1].trim());
            console.log(dataString_split);
            break;
          default:
            console.log("unknown tag");
            break;
        }
      } catch (error) { }
    };
  };

  const drawHand = (data) => {
    const dataString_split = data.split("?", 3);
    const hand = dataString_split[0].trim();
    const xPoints = JSON.parse(dataString_split[1].trim());
    const yPoints = JSON.parse(dataString_split[2].trim());

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    const colors = ['red', 'green', 'blue', 'orange', 'purple'];
    const colors2 = ['cyan', 'magenta', 'yellow', 'black', 'gray'];
    const selectedColors = hand === "1" ? colors : colors2;

    for (let i = 0; i < 5; i++) {
      // Rotate coordinates 90 degrees to the right
      const mappedX = (yPoints[i] + 1) * 240; // Use Y coordinate as X
      const mappedY = (-(xPoints[i]) + 1) * 120; // Negate X coordinate and use as Y

      context.fillStyle = selectedColors[i];
      context.beginPath();
      context.arc(mappedX, mappedY, 5, 0, 2 * Math.PI);
      context.fill();
    }
  };
  return (
    <div>
      <h2
        style={{
          marginLeft: "360px",
          marginTop: "50px",
          fontSize: "24px",
        }}
      >
        현재 연결된 장비
      </h2>
      <div
        style={{
          width: "892px",
          height: "280px",
          position: "absolute",
          left: "359.5px",
          top: "609.5px",
          borderRadius: "10px",
          background: "#fff",
          boxShadow: "0px 2px 10px 0 rgba(0,0,0,0.25)",
        }}
      ></div>
      <img
        src="../img/장비_휴대폰.png"
        style={{
          width: "168px",
          height: "121px",
          position: "absolute",
          left: "443.5px",
          top: "689.5px",
          objectFit: "cover",
        }}
      />
      <input
        type="text"
        id="ip_address"
        placeholder="  IP 주소를 입력해주세요."
        style={{
          width: "400px",
          height: "50px",
          position: "absolute",
          left: "700px",
          top: "680px",
          fontSize: "18px",
          fontWeight: "500",
          textAlign: "left",
          color: "#000",
          border: "none",
          borderBottom: "2px solid #EDECEC",
        }}
      />
      <button
        onClick={() => {
          connect();
        }}
        style={{
          width: "404px",
          height: "48px",
          position: "absolute",
          left: "700px",
          top: "784px",
          fontSize: "20px",
          fontWeight: "550",
          textAlign: "center",
          color: "#636363",
          borderRadius: "30px",
          background: "#EDECEC",
        }}
      >
        연결하기
      </button>


      {/* Display the current server status */}
      <p
        style={
          {
            position: "absolute",
            left: "700px",
            top: "736px",
            fontSize: "24px",
            fontWeight: "500",
            textAlign: "left",
            color: "#000",
          }
        }>연결 상태: {serverStatus === "Running" ? "연결됨" : "연결안됨"}</p>

      <div
        style={
          {
            position: "absolute",
            left: "700px",
            top: "1200px",
          }
        }>
        <h1>Hand Tracking App</h1>
        <canvas
          ref={canvasRef}
          width={480}
          height={240}
          style={{ border: '1px solid black', marginTop: '10px' }}
        />
      </div>

    </div>
  );
};

export default ConnectPhone;

