import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";

import Layout from "../components/Layout";
import MusicList from "../components/MusicList";

const WholeSong = () => {
  const nickname = useSelector((state) => state.user.name);
  const midiList = useSelector((state) => state.midi.midiList);

  return (
    <>
      <Header user={nickname} />
      <h2
        style={{
          marginTop: "40px",
          marginLeft: "330px",
          fontSize: "28px",
        }}
      >
        전체 업로드 곡
      </h2>
      <Layout>
        <MusicList midiList={midiList} />
      </Layout>

      <Footer />
    </>
  );
};

export default WholeSong;
