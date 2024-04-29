import { useLocation } from "react-router-dom"
import { useEffect } from 'react';

import * as mm from '@magenta/music/es6';

const ConvertPage = () => {
    const location = useLocation();

    useEffect(() => {
        const fetchurl = async () => {
            const searchParams = new URLSearchParams(location.search);
            const url = decodeURIComponent(searchParams.get('url'));
            console.log(url);
            let blob = await fetch(url).then(r => r.blob());
            console.log(blob);
            let file = new File([blob], 'file', { type: blob.type });
            console.log(file);
            const model = new mm.OnsetsAndFrames('https://storage.googleapis.com/magentadata/js/checkpoints/transcription/onsets_frames_uni');
            await model.initialize()
            const ns = await model.transcribeFromAudioFile(file);
            const midiData = mm.sequenceProtoToMidi(ns);
            console.log(midiData);
        }
        fetchurl();
    }, []);
    return (
        <div>
            <h1>Convert Page</h1>
        </div>
    )
}

export default ConvertPage