import {
  setLoading,
  setMidi,
  fetchMidiList,
} from "../../../store/slices/midi/midiAction";
import React from "react";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";
import axiosInstance from "../../../utils/axios";
import { useDispatch } from "react-redux";
import axios from "axios";
import { fileToMidi } from "../../../utils/Utils";

import "./Song.css";

const Song = ({ title, downloadUrl, deleteUrl }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const midiLoad = async (dest) => {
    const fullDownloadUrl = `${axiosInstance.getUri()}${downloadUrl}`;
    dispatch(setLoading(true));
    axios({
      method: "get",
      url: fullDownloadUrl,
      responseType: "blob",
    }).then(async (res) => {
      const midi = await fileToMidi(res.data);
      dispatch(setMidi(midi));
      dispatch(setLoading(false));
      navigate(dest);
    });
  };

  const midiPlay = async () => {
    midiLoad(`/midi/${1}`);
  };

  const handlePlay = () => {
    // Play 로직 작성
    midiLoad(`/graphic/${1}`);
  };

  const handleDownload = () => {
    // Download 로직 작성
    if (downloadUrl) {
      const fullDownloadUrl = `${axiosInstance.getUri()}${downloadUrl}`;
      window.open(fullDownloadUrl);
    } else {
      console.error("Download URL is not available.");
    }
  };

  const handleDelete = () => {
    console.log(`${axiosInstance.getUri()}${deleteUrl}`);
    axiosInstance
      .delete(`${axiosInstance.getUri()}${deleteUrl}`)
      .then((res) => {
        console.log(res);
        dispatch(fetchMidiList());
      });
  };

  return (
    <>
      <h3>{title}</h3>
      <div className="button-group">
        <button className="midi-button" onClick={midiPlay}>
          MIDI
        </button>
        <button className="play-button" onClick={handlePlay}>
          <img className="play-img" src="img\재생버튼.png" alt="재생" />
        </button>
        <button className="download-button" onClick={handleDownload}>
          <img className="download-img" src="img\다운로드.png" alt="다운로드" />
        </button>
        <button className="delete-button" onClick={handleDelete}>
          <img className="delete-img" src="img\삭제.png" alt="삭제" />
        </button>
      </div>
    </>
  );
};

// Define prop types
Song.propTypes = {
  title: PropTypes.string.isRequired,
  downloadUrl: PropTypes.string, // downloadUrl prop는 optional
};

export default Song;
