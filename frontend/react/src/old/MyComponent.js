import React, { useRef } from 'react';
import { OnsetsAndFrames } from '@magenta/music';

const MyComponent = () => {
  const modelRef = useRef(null);
  

  const convertMP3toMIDI = async (mp3FilePath) => {
    // Read the MP3 file and convert it to audio data
    const audioData = await fetch(mp3FilePath);
    const audioBuffer = await audioData.arrayBuffer();
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioSource = audioContext.decodeAudioData(audioBuffer);

    // Transcribe the audio data using the OnsetsAndFrames model
    const transcription = await modelRef.current.transcribeFromAudio(audioSource);

    // Convert the sequence representation to a MIDI file
    const midiData = modelRef.sequenceProtoToMidi(transcription);

    // Optionally, save the MIDI file to disk or return it as a result
    console.log(midiData);
  };

  const model = () => {
    const initializedModel = new OnsetsAndFrames('https://storage.googleapis.com/magentadata/js/checkpoints/transcription/onsets_frames_uni');
    modelRef.current = initializedModel;
  };

};

export default MyComponent;
