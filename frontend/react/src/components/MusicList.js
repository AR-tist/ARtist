import {
  setLoading,
  setMidi,
  fetchMidiList,
} from "../store/slices/midi/midiAction";
import React, { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";

import axiosInstance, { wsbaseURL } from "../utils/axios"; // Fixed typo in import path
import { useDispatch } from "react-redux";
import axios from "axios";
import { fileToMidi } from "../utils/Utils";
import cookie, { load } from "react-cookies";
import { useSelector } from "react-redux";


// Import the images
import img1 from "./img/곡_기본_이미지_1.png";
import img2 from "./img/곡_기본_이미지_2.png";
import img3 from "./img/곡_기본_이미지_3.jpg";
import img4 from "./img/곡_기본_이미지_4.jpg";
import img5 from "./img/곡_기본_이미지_5.png";
import img6 from "./img/곡_기본_이미지_6.png";
import img7 from "./img/곡_기본_이미지_7.png";
import img8 from "./img/곡_기본_이미지_8.jpg";
import img9 from "./img/곡_기본_이미지_9.png";
import img10 from "./img/곡_기본_이미지_10.png";
import { setOngoingFalse } from "../store/slices/room/roomAction";



export const random_images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];


const Row = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user_instance = useSelector((state) => state.user.user_instance);
  const [randomImageIndex] = useState(
    Math.floor(Math.random() * random_images.length)
  );
  const randomImage = random_images[randomImageIndex];

  const midiLoad = async (dest) => {
    const fullDownloadUrl = `${axiosInstance.getUri()}${props.download_url}`;

    console.log("fullDownloadUrl", fullDownloadUrl);
    dispatch(setLoading(true));
    axios({
      method: "get",
      url: fullDownloadUrl,
      responseType: "blob",
    }).then(async (res) => {
      dispatch(setLoading(false));
      const midi = await fileToMidi(res.data);
      dispatch(setMidi(midi));
      navigate(dest);
    });
  };

  const midiPlay = async () => {
    midiLoad(`/midi/${1}`);
  };

  const handlePlay = () => {
    // Play 로직 작성
    midiLoad(`/graphic`);
  };

  const getImgUrl = (imgurl) => {
    return axiosInstance.getUri() + imgurl;
  }

  const handleDownload = () => {
    // Download 로직 작성
    if (props.download_url) {
      const fullDownloadUrl = `${axiosInstance.getUri()}${props.download_url}`;
      window.open(fullDownloadUrl);
    } else {
      alert("다운로드 할 수 없습니다.");
    }
  };

  const handleDelete = () => {
    console.log(`${axiosInstance.getUri()}${props.delete_url}`);
    axiosInstance
      .delete(`${axiosInstance.getUri()}${props.delete_url}`)
      .then((res) => {
        console.log(res);
        dispatch(fetchMidiList());
      });
  };

  const navigateToRoom = () => {
    //navigate("/room"); // 방 페이지로 전환 방 만들기 -'
    //return <CreateRoom 
    // filename={props.filename}
    // is_host={true}
    // host_nickname={loadCookie()}
    // device={0}/>;
    CreateRoom(props.filename, user_instance.nickname, user_instance.user_id, user_instance.device, user_instance.play_mode);
  };

  const CreateRoom = (filename, nickname, user_id, device, play_mode) => {
    dispatch({ type: 'socket/connect', payload: { filename, nickname, user_id, device, play_mode } });
  };

  const moreButtonStyle = {
    cursor: "pointer",
    backgroundColor: "transparent",
    color: "#333",
    width: "100%",
    height: "40px",
    padding: "10px 16px",
    fontSize: "14px",
    textAlign: "left",
    display: "block",
  };
  return (
    <tr>
      <td
        style={{
          fontSize: "15px",
          fontWeight: "700",
          color: "#333",
          position: "relative",
          height: "84px",
          textAlign: "center",
          borderBottom: "1px solid #f6f6f6",
        }}
      >
        {props.rank + 1}
      </td>
      <td
        style={{
          paddingLeft: "20px",
          textAlign: "left",
          position: "relative",
          height: "84px",
          borderBottom: "1px solid #f6f6f6",
        }}
      >
        <div
          style={{
            position: "relative",
            minWidth: "210px",
            maxWidth: "520px",
            height: "60px",
            paddingRight: "28px",
            paddingLeft: "80px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "60px",
              height: "60px",
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                verticalAlign: "top",
                borderRadius: "4px",
              }}
              alt="이미지"
              src={props.imgurl ? getImgUrl(props.imgurl) : randomImage}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minWidth: "130px",
              height: "100%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ fontSize: "15px", color: "#333", fontWeight: "400" }}>
                {props.title}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p
                style={{
                  flex: "0 1 auto",
                  paddingTop: "6px",
                  fontSize: "13px",
                  color: "#969696",
                }}
              >
                {props.subtitle ? props.subtitle : "Songs"}
              </p>
            </div>
          </div>
        </div>
      </td>
      <td
        style={{
          position: "relative",
          fontSize: "15px",
          color: "#333",
          textAlign: "left",
          height: "84px",
          borderBottom: "1px solid #f6f6f6",
        }}
      >
        <span
          style={{
            display: "block",
            position: "relative",
            minWidth: "100px",
            width: "196px",
            fontSize: "15px",
            color: "#333",
          }}
        >
          {props.poster ? props.poster : "나그네"}
        </span>
      </td>
      <td
        style={{
          minWidth: "80px",
          fontSize: "15px",
          fontWeight: "400",
          color: "#333",
          position: "relative",
          height: "84px",
          textAlign: "center",
          borderBottom: "1px solid #f6f6f6",
        }}
      >
        {props.views ? props.views : "0"}
      </td>
      <td
        style={{
          minWidth: "80px",
          fontSize: "15px",
          fontWeight: "400",
          color: "#333",
          position: "relative",
          height: "84px",
          textAlign: "center",
          borderBottom: "1px solid #f6f6f6",
        }}
      >
        {props.like ? props.like : "0"}
      </td>
      <td
        style={{
          minWidth: "50px",
          position: "relative",
          height: "84px",
          textAlign: "center",
          borderBottom: "1px solid #f6f6f6",
        }}
      >
        <button
          style={{
            cursor: "pointer",
            backgroundColor: "transparent",
            color: "transparent",
            whiteSpace: "nowrap",
            verticalAlign: "middle",
          }}
          onClick={handlePlay}
        >
          <img
            src="img\재생버튼.png"
            alt="업로드"
            style={{
              width: "20px",
              height: "20px",
            }}
          />
        </button>
      </td>
      <td
        style={{
          minWidth: "50px",
          position: "relative",
          height: "84px",
          textAlign: "center",
          borderBottom: "1px solid #f6f6f6",
        }}
      >
        <button
          style={{
            cursor: "pointer",
            backgroundColor: "transparent",
            color: "transparent",
            whiteSpace: "nowrap",
            verticalAlign: "middle",
          }}
          onClick={(event) => {
            event.stopPropagation();
            props.index === props.moreIndex
              ? props.setMoreIndex(-1)
              : props.setMoreIndex(props.index);
          }}
        >
          <img
            src="img\기능더보기.png"
            alt="더보기"
            style={{
              width: "20px",
              height: "20px",
            }}
          />
        </button>
        {props.moreIndex === props.index && (
          <div
            style={{
              position: "absolute",
              top: "66px",
              right: "0",
              zIndex: "11",
              width: "200px",
              padding: "10px 0",
              background: "#fff",
              borderRadius: "5px",
              boxShadow: "0 4px 20px 0 rgba(0,0,0,.1)",
            }}
          >
            <button style={moreButtonStyle} onClick={midiPlay}>
              MIDI 재생
            </button>
            <button style={moreButtonStyle} onClick={handleDownload}>
              다운로드
            </button>
            <button style={moreButtonStyle} onClick={handleDelete}>
              삭제
            </button>
            <button style={moreButtonStyle} onClick={navigateToRoom}>
              방 만들기
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

const MusicList = ({ midiList }) => {
  const [moreIndex, setMoreIndex] = useState(-1);
  const [displayCount, setDisplayCount] = useState(10); // 표시할 초기 항목 수
  const loadCount = 10; // 더보기 클릭 시 로드할 항목 수

  const room = useSelector((state) => state.room.room);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (room.ongoing_code === 1) {
      dispatch(setOngoingFalse());
      navigate(`/room/${room.room_id}`);
    }
  }, [dispatch, navigate, room]);


  const loadMoreItems = () => {
    setDisplayCount(displayCount + loadCount);
  };

  const th = {
    whiteSpace: "nowrap",
    height: "39px",
    fontSize: "13px",
    fontWeight: "400",
    color: "#a0a0a0",
    borderTop: "1px solid #ebebeb",
    borderBottom: "1px solid #ebebeb",
    padding: "0",
    margin: "0",
  };

  return (
    <div
      style={{
        padding: "0",
        margin: "0",
        border: "0",
      }}
      onClick={() => {
        setMoreIndex(-1);
      }}
    >
      <table
        style={{
          width: "auto",
          minWidth: "100%",
          maxWidth: "none",
          tableLayout: "fixed",
        }}
      >
        <colgroup>
          <col width="42" data-cell="순위"></col>
          <col width="*" data-cell="곡/설명"></col>
          <col width="250" data-cell="업로더"></col>
          <col width="65" data-cell="플레이수"></col>
          <col width="65" data-cell="좋아요"></col>
          <col width="65" data-cell="재생"></col>
          <col width="65" data-cell="더보기"></col>
        </colgroup>
        <thead>
          <tr>
            <th scope="col" style={th}>
              순위
            </th>
            <th
              scope="col"
              style={{ ...th, ...{ paddingLeft: "20px", textAlign: "left" } }}
            >
              곡/설명
            </th>
            <th
              scope="col"
              style={{ ...th, ...{ paddingLeft: "5px", textAlign: "left" } }}
            >
              업로더
            </th>
            <th scope="col" style={th}>
              플레이수
            </th>
            <th scope="col" style={th}>
              좋아요
            </th>
            <th scope="col" style={th}>
              재생
            </th>
            <th scope="col" style={th}>
              더보기
            </th>
          </tr>
        </thead>
        <tbody>
          {midiList.slice(0, displayCount).map((midi, index) => (
            <Row
              key={index}
              index={index}
              filename={midi.filename} //filename 추가
              rank={index}
              title={midi.title}
              download_url={midi.download_url}
              delete_url={midi.delete_url}
              moreIndex={moreIndex}
              setMoreIndex={setMoreIndex}
              imgurl={midi.imgurl}
              subtitle={midi.subtitle}
              poster={midi.poster}
              like={midi.like}
              views={midi.views}
              music_lenght={midi.music_lenght}
            />
          ))}
        </tbody>
        {displayCount < midiList.length && (
          <tfoot>
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                <div onClick={loadMoreItems} style={{ cursor: "pointer" }}>
                  <img
                    src="./img/펼치기2.png"
                    alt="Load More"
                    style={{ width: "35px", height: "35px", marginTop: "5px" }}
                  />
                </div>
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

export default MusicList;
