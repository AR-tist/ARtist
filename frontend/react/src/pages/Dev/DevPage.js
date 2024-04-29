import { useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { setLoading, setMidi } from "../../store/slices/midi/midiAction";
import axios from "axios";
import { fileToMidi } from "../../utils/Utils";
import { extarctEvent } from "../../utils/Utils";
import { onebyoneMIDI, assignLh } from "../../utils/Utils";

const DevPage = () => {
    const dispatch = useDispatch();
    const midi = useRef(null);
    const track = useRef(null);

    useEffect(() => {
        const fullDownloadUrl = 'http://13.124.50.132:8000/midi/download/사건의 지평선-1701236189.27549.mid';

        console.log("fullDownloadUrl", fullDownloadUrl);
        dispatch(setLoading(true));
        axios({
            method: "get",
            url: fullDownloadUrl,
            responseType: "blob",
        }).then(async (res) => {
            dispatch(setLoading(false));
            midi.current = await fileToMidi(res.data);
            track.current = midi.current.track[extarctEvent(midi.current.track)].event;
            console.log(track.current);
        });
    }, []);

    const buttonEvent = () => {
        const _track = onebyoneMIDI(track.current);

        const _track2 = assignLh(_track);

        console.log(_track2);

    }
    return (
        <div>
            <h1>DevPage</h1>
            <button onClick={buttonEvent}>button</button>
        </div>
    );
};

export default DevPage;