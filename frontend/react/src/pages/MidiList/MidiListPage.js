import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Menu from "./components/Menu";
import { useDispatch, useSelector } from "react-redux";
import { fetchMidiList } from "../../store/slices/midi/midiAction";
import Layout from "../../components/Layout";
import MusicList from "../../components/MusicList";
import EditorPick from "../../components/EditorPick";
import { useNavigate } from "react-router-dom";

// MidiListPage 컴포넌트
const MidiListPage = () => {
  const dispatch = useDispatch();
  const midiList = useSelector((state) => state.midi.midiList);
  const nickname = useSelector((state) => state.user.name);

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate(); // useNavigate 사용

  useEffect(() => {
    dispatch(fetchMidiList());
  }, []);

  const editorpicks = [
    {
      imageUrl:
        "https://cdn.music-flo.com/image/album/931/286/02/04/402286931_5c9d73de.jpg?1553822687261/dims/resize/175/quality/90",
      title: "너와 함께라면 추운 겨울도 견딜만해",
    },
    {
      imageUrl:
        "https://cdn.music-flo.com/image/v2/album/897/395/05/04/405395897_5fb69b00_o.jpg?1605802753351/dims/resize/175/quality/90",
      title: "커피와 찰떡궁합 캐럴 팝 발라드",
    },
    {
      imageUrl:
        "https://cdn.music-flo.com/image/album/396/287/04/04/404287396_5df0adde.jpg?1576054238835/dims/resize/175/quality/90",
      title: "올 크리스마스에는 색다른 K-캐럴을",
    },
    {
      imageUrl:
        "https://cdn.music-flo.com/poc/p/image/channel/rep/20231120/718a0fa972144a4094a9b6d64fdec56f.jpg/dims/resize/175/quality/90",
      title: "추억의 국내 겨울 노래",
    },
    {
      imageUrl:
        "https://cdn.music-flo.com/poc/p/image/channel/rep/20231127/2c5761818641436ba780d96b0fff50c8.png/dims/resize/175/quality/90",
      title: "크리스마스 하면 떠오르는 영화 OST",
    },
    {
      imageUrl:
        "https://cdn.music-flo.com/poc/p/image/channel/rep/20230303/0d557e48d822482db706abb525cf6569.png/dims/resize/175/quality/90",
      title: "런던의 LP바에 흐르는 올드 브릿팝",
    },
    {
      imageUrl:
        "https://cdn.music-flo.com/poc/p/image/channel/rep/20221222/64c75b6c7c204806a43dba60588edca6.png/dims/resize/175/quality/90",
      title: "가을에 듣기 좋은 발라드 Top 40",
    },
  ];

  const handleEditorPickClick = (index) => {
    navigate(`/editor-pick-${index + 1}`); // useNavigate로 페이지 이동
  };

  return (
    <>
      <Header user={nickname} />
      <Layout>
        <EditorPick
          items={editorpicks}
          onEditorPickClick={handleEditorPickClick}
        />
        <MusicList midiList={midiList} />
      </Layout>
      <Footer />
      <Menu isSidebarOpen={isSidebarOpen} />
    </>
  );
};

export default MidiListPage;
