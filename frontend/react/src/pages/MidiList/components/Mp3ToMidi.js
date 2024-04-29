import * as mm from '@magenta/music/es6';

onmessage = async (e) => {
    console.log('Worker가 받은 메시지 ', e.data);
    // MIDI 변환
    try {
        const model = new mm.OnsetsAndFrames('https://storage.googleapis.com/magentadata/js/checkpoints/transcription/onsets_frames_uni');
        await model.initialize()
        const ns = await model.transcribeFromAudioFile(e.data);
        const midiData = mm.sequenceProtoToMidi(ns);
        console.log(midiData);

        return midiData;
    } catch (error) {
        console.error(error);
        postMessage('Error');
    }
}

