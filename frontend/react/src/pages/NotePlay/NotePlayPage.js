import { useParams } from "react-router-dom";
import Piano from './components/piano';
import { useSelector } from "react-redux"
const NotePlayPage = () => {
    let { midiId } = useParams();
    const midiFile = useSelector(state => state.midi.midi)
    return (<Piano></Piano>);
};

export default NotePlayPage;