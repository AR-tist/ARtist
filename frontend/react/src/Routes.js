import NotePlayPage from "./pages/NotePlay/NotePlayPage";
import MidiListPage from "./pages/MidiList/MidiListPage.js";
import MidiPlayPage from "./pages/MidiPlay/MidiPlayPage";
import NoteGraphicPage from "./pages/NoteGraphic/NoteGraphicPage";
import { Routes, Route } from "react-router-dom";
import ConvertPage from "./pages/Convert/ConvertPage";

import { useSelector } from "react-redux";
import Loading from "./components/loading/loading";
import PianoWSPage from "./pages/PianoWSPage";
import Room from "./pages/Room/RoomPage";
import EquipmentChangePage from "./pages/Equipment/EquipmentChangePage";
import WholeSong from "./components/WholeSong";
import DevPage from "./pages/Dev/DevPage.js";
import EditorPick1Page from "./pages/EditorPick/EditorPick1Page.js";
import EditorPick2Page from "./pages/EditorPick/EditorPick2Page.js";
import EditorPick3Page from "./pages/EditorPick/EditorPick3Page.js";
import EditorPick4Page from "./pages/EditorPick/EditorPick4Page.js";
import EditorPick5Page from "./pages/EditorPick/EditorPick5Page.js";
import EditorPick6Page from "./pages/EditorPick/EditorPick6Page.js";
import EditorPick7Page from "./pages/EditorPick/EditorPick7Page.js";
const App = () => {
  const loading = useSelector((state) => state.midi.loading);

  return (
    <>
      <Routes>
        <Route path="/" element={<MidiListPage />} />
        <Route path="/play/:id" element={<NotePlayPage />} />
        <Route path="/midi/:id" element={<MidiPlayPage />} />
        <Route path="/graphic" element={<NoteGraphicPage />} />
        <Route path="/convert" element={<ConvertPage />} />
        <Route path="/piano-socket" element={<PianoWSPage />} />
        <Route path="/room/:room_id" element={<Room />} />
        <Route path="/equipment-change" element={<EquipmentChangePage />} />
        <Route path="/whole-song" element={<WholeSong />} />
        <Route path="/editor-pick-1" element={<EditorPick1Page />} />
        <Route path="/editor-pick-2" element={<EditorPick2Page />} />
        <Route path="/editor-pick-3" element={<EditorPick3Page />} />
        <Route path="/editor-pick-4" element={<EditorPick4Page />} />
        <Route path="/editor-pick-5" element={<EditorPick5Page />} />
        <Route path="/editor-pick-6" element={<EditorPick6Page />} />
        <Route path="/editor-pick-7" element={<EditorPick7Page />} />

        <Route path="*" element={<h1>찾을 수 없는 페이지입니다.</h1>} />
        <Route path="/dev" element={<DevPage />} />
      </Routes>
      <Loading loading={loading} />
    </>
  );
};

export default App;
