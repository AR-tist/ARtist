import { useRef, useEffect, useState } from 'react';
import { fileToMidi, extarctEvent } from '../../utils/Utils';
import { inxtoNote } from '../../utils/tone';
import NoteDisplay from './components/NoteDisplay';
import * as Tone from 'tone';
import { useSelector } from 'react-redux';
import { onebyoneMIDI } from '../../utils/Utils';


const MidiPlayPage = () => {
    const midiFile = useSelector(state => state.midi.midi)
    const synth = useRef(null);
    useEffect(() => {
        synth.current = new Tone.Sampler({
            urls: {
                A0: "A0.mp3",
                C1: "C1.mp3",
                "D#1": "Ds1.mp3",
                "F#1": "Fs1.mp3",
                A1: "A1.mp3",
                C2: "C2.mp3",
                "D#2": "Ds2.mp3",
                "F#2": "Fs2.mp3",
                A2: "A2.mp3",
                C3: "C3.mp3",
                "D#3": "Ds3.mp3",
                "F#3": "Fs3.mp3",
                A3: "A3.mp3",
                C4: "C4.mp3",
                "D#4": "Ds4.mp3",
                "F#4": "Fs4.mp3",
                A4: "A4.mp3",
                C5: "C5.mp3",
                "D#5": "Ds5.mp3",
                "F#5": "Fs5.mp3",
                A5: "A5.mp3",
                C6: "C6.mp3",
                "D#6": "Ds6.mp3",
                "F#6": "Fs6.mp3",
                A6: "A6.mp3",
                C7: "C7.mp3",
                "D#7": "Ds7.mp3",
                "F#7": "Fs7.mp3",
                A7: "A7.mp3",
                C8: "C8.mp3"
            },
            release: 1,
            baseUrl: "https://tonejs.github.io/audio/salamander/",
            onload: () => {
                synth.current.triggerAttackRelease(["C5"], 0.05);
            }
        }).toDestination();
    }
        , [])

    const [note, setNote] = useState(new Array(128).fill(false));
    const timer = useRef([]);

    // 타이머를 생성하는 함수, TimerID를 timer.current에 저장한다.
    const createTimer = (callback, time) => {
        let id = setTimeout(callback, time);
        timer.current.push(id);
    }

    // 입력된 노트에 대해 활성화, 소리 재생을 결정하여 실행함.
    const action = (inx, activate) => {
        setNote((note) => {
            if (activate) synth.current.triggerAttack(inxtoNote[inx]);
            else synth.current.triggerRelease(inxtoNote[inx]);

            note[inx] = activate;
            return [...note];
        }
        );
    }

    const play = () => {
        if (midiFile === null) return;
        console.log(midiFile);
        console.log(extarctEvent(midiFile.track));
        let track = midiFile.track[extarctEvent(midiFile.track)].event;
        // let track = onebyoneMIDI(midiFile.track[extarctEvent(midiFile.track)].event);

        let time = []
        // 각 이벤트의 시간을 계산한다.
        track.forEach((e, i) => {
            if (e.type !== 8 && e.type !== 9) return;
            if (time.length === 0) time.push(e.deltaTime);
            else
                time.push(time[time.length - 1] + e.deltaTime * midiFile.timeDivision / 96.3);
        })
        console.log(time);

        // 각 이벤트의 시간에 맞춰 타이머를 생성한다.
        let iter = 0;
        track.forEach((e, i) => {

            if (e.type !== 8 && e.type !== 9) return;
            createTimer(() => {
                action(e.data[0], e.type === 9 ? true : false);
            }, time[iter]);
            iter++;
        })

    }
    // 재생을 중지하는 함수
    const stop = () => {
        timer.current.forEach((e) => {
            clearTimeout(e);
        })
        synth.current.releaseAll();
        setNote(
            note.map((n, i) => {
                return false;
            })
        );
    }
    return (<>
        <button onClick={play}>play</button>
        <button onClick={stop}>stop</button>
        <NoteDisplay note={note} />
    </>);
}

export default MidiPlayPage