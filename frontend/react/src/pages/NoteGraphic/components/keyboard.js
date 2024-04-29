import * as Tone from 'tone';
import { inxtoNoteW, inxtoNoteB } from '../../../utils/tone';
import { WebMidi } from 'webmidi';
import cookie from 'react-cookies';

Tone.context.lookAhead = 0;

function getKeyFromNoteAndMode(noteIdx, mode) {
    let key;

    switch (noteIdx) {
        case 0: key = mode === 1 ? 119 : 97; break;
        case 1: key = mode === 1 ? 101 : 115; break;
        case 2: key = mode === 1 ? 116 : 100; break;
        case 3: key = mode === 1 ? 121 : 102; break;
        case 4: key = mode === 1 ? 117 : 103; break;
        case 5: key = mode === 1 ? 111 : 104; break;
        case 6: key = mode === 1 ? 112 : 106; break;
        case 7: key = mode === 1 ? 107 : 0; break;
        case 8: key = mode === 1 ? 108 : 0; break;
        case 9: key = mode === 1 ? 0 : 59; break;
        case 10: key = mode === 1 ? 0 : 39; break;
        default: key = 0; break;
    }

    return key;
}

function getKeyFromNoteAndModeAr(noteIdx, mode) {
    let key;
    let add_octave = 0;

    switch (noteIdx) {
        case 0: key = mode === 0 ? 97 : 119; break;
        case 1: key = mode === 0 ? 115 : 101; break;
        case 2: key = mode === 0 ? 100 : 116; break;
        case 3: key = mode === 0 ? 102 : 121; break;
        case 4: key = mode === 0 ? 103 : 117; break;
        case 5: key = mode === 0 ? 104 : 111; break;
        case 6: key = mode === 0 ? 106 : 112; break;
        case 7:
            key = mode === 0 ? 107 : 116;
            add_octave = mode === 0 ? 0 : 1;
            break;
        case 8:
            key = mode === 0 ? 108 : 121;
            add_octave = mode === 0 ? 0 : 1;
            break;
        case 9:
            key = mode === 0 ? 59 : 117;
            add_octave = mode === 0 ? 0 : 1;
            break;
        case 10:
            key = mode === 0 ? 39 : 111;
            add_octave = mode === 0 ? 0 : 1;
            break;
        case 11:
            key = mode === 0 ? 102 : 112;
            add_octave = mode === 0 ? 1 : 2;
            break;
        case 12:
            key = mode === 0 ? 103 : 116;
            add_octave = mode === 0 ? 1 : 2;
            break;
        case 13:
            key = mode === 0 ? 104 : 121;
            add_octave = mode === 0 ? 1 : 2;
            break;
        default:
            break;
    }

    return { key: key, add_octave: add_octave };
}


export class Keyboard {


    constructor(scene, width, height, start_idx = 1, last_idx = 4, device, user_id) {
        this.tone = new Tone.Sampler({
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
                this.tone.triggerAttackRelease(["C5"], 0.05);
            }
        }).toDestination();

        this.user_id = user_id;

        this.pressedNotes = {};
        this.w_notes = [];
        this.b_notes = [];
        this.octave = 0;
        this.start_idx = start_idx;
        this.num = last_idx;
        if (this.num > 10) this.num = 10;
        if (this.num + this.start_idx > 10) {
            this.num = this.num - this.start_idx;
        }

        this.o_w = width / this.num;    // octave width
        // console.log(width);
        let { s_w, s_h } = { s_w: width / this.num / 7, s_h: height * 0.2 };

        for (let j = 0; j < this.num; j++) {
            for (let i = 0; i < 7; i++) {
                this.w_notes.push(new NoteP(scene, j * 7 * s_w + i * s_w + s_w / 2, height - s_h / 2, s_w, s_h, 0xffffff, { b_width: 2, b_color: 0x000000 }));
            }
            for (let i = 0; i < 6; i++) {
                if (i === 2) continue;
                this.b_notes.push(scene.add.rectangle(j * 7 * s_w + i * s_w + s_w, height - s_h * 0.75, s_w / 2, s_h / 2, 0x000000).setDepth(3));
            }
        }
        this.boundKeydown = this.onKeydown.bind(this);
        this.boundKeyup = this.onKeyup.bind(this);

        // 세로선
        for (let i = 1; i <= this.num; i++) {
            scene.add.rectangle(
                s_w * 7 * i, // x 
                0, // y
                1, // width
                height,    // height
                0xFFFFFF,    // color
                0.15 // alpha
            )
                .setDepth(1)
                .setOrigin(0, 0);
        }


        this.device = device;
        this.playRangeRect = scene.add.graphics().setDepth(5);  // 연주 범위 사각형
        const lineThick = 10;
        this.playRangeRect.lineStyle(lineThick, 0x625BF7, 0.4);

        // 키보드일 때 텍스트
        if (device === 1) {
            this.texts = [];
            const textSize = 18;
            this.texts.push(scene.add.text(0 * s_w + s_w / 2 - textSize * 0.3, height - s_h + 5, 'A', { fill: '#000000' }).setDepth(4).setFontSize(textSize));
            this.texts.push(scene.add.text(1 * s_w + s_w / 2 - textSize * 0.3, height - s_h + 5, 'S', { fill: '#000000' }).setDepth(4).setFontSize(textSize));
            this.texts.push(scene.add.text(2 * s_w + s_w / 2 - textSize * 0.3, height - s_h + 5, 'D', { fill: '#000000' }).setDepth(4).setFontSize(textSize));
            this.texts.push(scene.add.text(3 * s_w + s_w / 2 - textSize * 0.3, height - s_h + 5, 'F', { fill: '#000000' }).setDepth(4).setFontSize(textSize));
            this.texts.push(scene.add.text(4 * s_w + s_w / 2 - textSize * 0.3, height - s_h + 5, 'G', { fill: '#000000' }).setDepth(4).setFontSize(textSize));
            this.texts.push(scene.add.text(5 * s_w + s_w / 2 - textSize * 0.3, height - s_h + 5, 'H', { fill: '#000000' }).setDepth(4).setFontSize(textSize));
            this.texts.push(scene.add.text(6 * s_w + s_w / 2 - textSize * 0.3, height - s_h + 5, 'J', { fill: '#000000' }).setDepth(4).setFontSize(textSize));
            this.texts.push(scene.add.text(7 * s_w + s_w / 2 - textSize * 0.3, height - s_h + 5, 'K', { fill: '#000000' }).setDepth(4).setFontSize(textSize));
            this.texts.push(scene.add.text(8 * s_w + s_w / 2 - textSize * 0.3, height - s_h + 5, 'L', { fill: '#000000' }).setDepth(4).setFontSize(textSize));
            this.texts.push(scene.add.text(9 * s_w + s_w / 2 - textSize * 0.3, height - s_h + 5, ';', { fill: '#000000' }).setDepth(4).setFontSize(textSize));
            this.texts.push(scene.add.text(10 * s_w + s_w / 2 - textSize * 0.3, height - s_h + 5, '\'', { fill: '#000000' }).setDepth(4).setFontSize(textSize));
            this.texts.push(scene.add.text(1 * s_w - textSize * 0.3, height - s_h + 5, 'W', { fill: '#FFFFFF' }).setDepth(4).setFontSize(textSize));
            this.texts.push(scene.add.text(2 * s_w - textSize * 0.3, height - s_h + 5, 'E', { fill: '#FFFFFF' }).setDepth(4).setFontSize(textSize));
            this.texts.push(scene.add.text(4 * s_w - textSize * 0.3, height - s_h + 5, 'T', { fill: '#FFFFFF' }).setDepth(4).setFontSize(textSize));
            this.texts.push(scene.add.text(5 * s_w - textSize * 0.3, height - s_h + 5, 'Y', { fill: '#FFFFFF' }).setDepth(4).setFontSize(textSize));
            this.texts.push(scene.add.text(6 * s_w - textSize * 0.3, height - s_h + 5, 'U', { fill: '#FFFFFF' }).setDepth(4).setFontSize(textSize));
            this.texts.push(scene.add.text(8 * s_w - textSize * 0.3, height - s_h + 5, 'O', { fill: '#FFFFFF' }).setDepth(4).setFontSize(textSize));
            this.texts.push(scene.add.text(9 * s_w - textSize * 0.3, height - s_h + 5, 'P', { fill: '#FFFFFF' }).setDepth(4).setFontSize(textSize));
            // 연주 범위 사각형
            this.playRangeRect.strokeRect(0 + lineThick / 2, height - s_h + lineThick / 2, this.o_w * 11 / 7 - lineThick, s_h - lineThick);
        }
        // AR 피아노 인풋일 때 그래픽
        else if (device === 0) {
            // 연주 범위 사각형
            this.playRangeRect.strokeRect(0 + lineThick / 2, height - s_h + lineThick / 2, this.o_w * 2 - lineThick, s_h - lineThick);
            // 손가락 위치 원
            this.leftHand = [];
            this.rightHand = [];
            for (let i = 0; i < 5; i++) {
                this.leftHand.push(scene.add.circle(20, height - s_h, 5, 0x4C39D7).setDepth(5));
                // this.leftHand[i].setStrokeStyle(1, 0x27283B);
                this.rightHand.push(scene.add.circle(40, height - s_h, 5, 0x8470FF).setDepth(5));
                // this.rightHand[i].setStrokeStyle(1, 0x27283B);
            }
        }

        this.keyboardStartY = height - s_h; // 추후 정리 예정
        this.s_h = s_h;

        this.users = [];    // user_id
        this.colors = [ // 건반 눌릴 때 색
            0xF49E9E,
            0xFAC2A0,
            0xF3EAAB,
            0xB0E6B3,
            0xA8E2EA,
            0xA7B8EF
        ];
    }

    webMidiEnable(err) {

    }

    setInput(document, dispatch) {
        // 기존 이벤트 리스너를 제거
        document.removeEventListener('keydown', this.boundKeydown);
        document.removeEventListener('keyup', this.boundKeyup);

        document.addEventListener('keydown', this.boundKeydown);
        document.addEventListener('keyup', this.boundKeyup);

        const instance = this;
        if (this.device === 2) {
            WebMidi.enable(function (err) {

                const currentProtocol = window.location.protocol;
                const baseIP = window.location.hostname;
                console.log(baseIP);

                if (err || ((currentProtocol !== 'https:') && (baseIP !== 'localhost'))) {
                    console.log("WebMidi could not be enabled.", err);
                    return;
                } else {
                    console.log("WebMidi enabled!");
                }

                console.log(WebMidi.inputs);
                console.log(instance);

                const Myinputs = WebMidi.inputs[0];

                const classifiy = (note, action) => {
                    note = note - 48;
                    const key = (note) % 12;
                    const octave = Math.floor(note / 12);
                    let noteidx = 0;
                    let mode = 0;
                    switch (key) {
                        case 0: noteidx = 0; break;
                        case 1: noteidx = 0; mode = 1; break;
                        case 2: noteidx = 1; break;
                        case 3: noteidx = 1; mode = 1; break;
                        case 4: noteidx = 2; break;
                        case 5: noteidx = 3; break;
                        case 6: noteidx = 2; mode = 1; break;
                        case 7: noteidx = 4; break;
                        case 8: noteidx = 3; mode = 1; break;
                        case 9: noteidx = 5; break;
                        case 10: noteidx = 4; mode = 1; break;
                        case 11: noteidx = 6; break;
                        default: return;
                    }

                    if (action === 'down') {
                        instance.pushNote(noteidx, mode, octave, 2, this.user_id);

                        const key = getKeyFromNoteAndMode(noteidx, mode);


                        dispatch({ type: 'socket/keyDown', payload: { key: key, octave: octave, start_idx: 2 } });
                    }
                    else if (action === 'up') {
                        instance.releaseNote(noteidx, mode, octave, 2, this.user_id);
                        const key = getKeyFromNoteAndMode(noteidx, mode);
                        dispatch({ type: 'socket/keyUp', payload: { key: key, octave: octave, start_idx: 2 } });
                    }
                }
                Myinputs.addListener('noteon', e => {
                    classifiy(e.data[1], 'down');

                }, { channels: [1] });

                Myinputs.addListener('noteoff', e => {
                    classifiy(e.data[1], 'up');
                }, { channels: [1] });
            }
            );
        }
    }
    removeInput(document) {
        document.removeEventListener('keydown', this.boundKeydown);
        document.removeEventListener('keyup', this.boundKeyup);
    }



    onKeydown(event) {
        if (event.repeat) return;
        if (this.tone.loaded !== true) return;
        const key = event.key.charCodeAt(0);
        this.handleKey(key, 'down', this.octave, this.start_idx);

    }

    onKeyup(event) {
        if (event.repeat) return;
        if (this.tone.loaded !== true) return;
        const key = event.key.charCodeAt(0);

        /* 키보드 인풋일 때 처리 */
        if (this.device === 1) {
            if (key === 120 & this.octave < this.num - 1) {
                for (let idx = 0; idx < 7; idx++)
                    this.w_notes[idx + (this.octave) * 7].getRect().setFillStyle(0xffffff);
                for (let idx = 0; idx < 5; idx++)
                    this.b_notes[idx + (this.octave) * 5].setFillStyle(0x000000);

                this.octave += 1

                this.playRangeRect.setX(this.playRangeRect.x + this.o_w);
                for (let i = 0; i < 18; i++) {
                    this.texts[i].setX(this.texts[i].x + this.o_w);
                }
                return
            }
            if (key === 122 && this.octave > 0) {
                for (let idx = 0; idx < 7; idx++)
                    this.w_notes[idx + (this.octave) * 7].getRect().setFillStyle(0xffffff);
                for (let idx = 0; idx < 5; idx++)
                    this.b_notes[idx + (this.octave) * 5].setFillStyle(0x000000);

                this.octave -= 1

                this.playRangeRect.setX(this.playRangeRect.x - this.o_w);
                for (let i = 0; i < 18; i++) {
                    this.texts[i].setX(this.texts[i].x - this.o_w);
                }
                return
            }
            this.handleKey(key, 'up', this.octave, this.start_idx);
        }
        /* AR피아노 인풋일 때 처리 */
        else if (this.device === 0) {
            if (key === 120 & this.octave < this.num - 1) {
                for (let idx = 0; idx < 7; idx++)
                    this.w_notes[idx + (this.octave) * 7].getRect().setFillStyle(0xffffff);
                for (let idx = 0; idx < 5; idx++)
                    this.b_notes[idx + (this.octave) * 5].setFillStyle(0x000000);

                this.octave += 1

                this.playRangeRect.setX(this.playRangeRect.x + this.o_w);
                return
            }
            if (key === 122 && this.octave > 0) {
                for (let idx = 0; idx < 7; idx++)
                    this.w_notes[idx + (this.octave) * 7].getRect().setFillStyle(0xffffff);
                for (let idx = 0; idx < 5; idx++)
                    this.b_notes[idx + (this.octave) * 5].setFillStyle(0x000000);

                this.octave -= 1

                this.playRangeRect.setX(this.playRangeRect.x - this.o_w);
                return
            }
        }
    }

    handleKey(key, action, octave = 0, start_idx = 1, user_id) {
        let noteIdx;
        let mode = 0;
        switch (key) {
            // case 'a': noteIdx = 0; break;
            // case 's': noteIdx = 1; break;
            // case 'd': noteIdx = 2; break;
            // case 'f': noteIdx = 3; break;
            // case 'g': noteIdx = 4; break;
            // case 'h': noteIdx = 5; break;
            // case 'j': noteIdx = 6; break;
            // case 'k': noteIdx = 7; break;
            // case 'l': noteIdx = 8; break;
            // case ';': noteIdx = 9; break;
            // case "'": noteIdx = 10; break;
            // case 'w': noteIdx = 0; mode = 1; break;
            // case 'e': noteIdx = 1; mode = 1; break;
            // case 't': noteIdx = 2; mode = 1; break;
            // case 'y': noteIdx = 3; mode = 1; break;
            // case 'u': noteIdx = 4; mode = 1; break;
            // case 'o': noteIdx = 5; mode = 1; break;
            // case 'p': noteIdx = 6; mode = 1; break;
            // convert char to ASCII code
            case 97: noteIdx = 0; break;
            case 115: noteIdx = 1; break;
            case 100: noteIdx = 2; break;
            case 102: noteIdx = 3; break;
            case 103: noteIdx = 4; break;
            case 104: noteIdx = 5; break;
            case 106: noteIdx = 6; break;
            case 107: noteIdx = 7; break;
            case 108: noteIdx = 8; break;
            case 59: noteIdx = 9; break;
            case 39: noteIdx = 10; break;
            case 119: noteIdx = 0; mode = 1; break;
            case 101: noteIdx = 1; mode = 1; break;
            case 116: noteIdx = 2; mode = 1; break;
            case 121: noteIdx = 3; mode = 1; break;
            case 117: noteIdx = 4; mode = 1; break;
            case 111: noteIdx = 5; mode = 1; break;
            case 112: noteIdx = 6; mode = 1; break;


            default: return;
        }

        if (action === 'down') {
            this.pushNote(noteIdx, mode, octave, start_idx, user_id);
        } else if (action === 'up') {
            this.releaseNote(noteIdx, mode, octave, start_idx);
        }
    }

    pushNote(idx, mode = 0, octave, start_idx, user_id) {
        let user_idx = -1;
        user_idx = this.users.findIndex(e => e == user_id);
        if (user_idx == -1) {
            this.users.push(user_id);
            user_idx = this.users.findIndex(e => e == user_id);
        }
        console.log(this.users);


        const color = (user_id == undefined) ? 0xB0B0B0 : this.colors[user_idx % 6];

        if (mode === 0) {
            // console.log('%d %d %d', octave, start_idx, idx)
            if (idx + (octave + start_idx) * 7 >= (start_idx + this.num) * 7) return
            this.w_notes[idx + (octave) * 7].getRect().setFillStyle(color);
            idx = idx + (octave + start_idx > 8 ? 8 : octave + start_idx) * 7;
            this.tone.triggerAttack([inxtoNoteW[idx]]);
        } else {
            if (idx + (octave + start_idx) * 7 >= (start_idx + this.num) * 7 - 2) return
            this.b_notes[idx + (octave) * 5].setFillStyle(color);
            idx = idx + (octave + start_idx > 8 ? 8 : octave + start_idx) * 5;
            this.tone.triggerAttack([inxtoNoteB[idx]]);
        }
    }

    releaseNote(idx, mode = 0, octave, start_idx) {
        if (mode === 0) {
            if (idx + (octave + start_idx) * 7 >= (start_idx + this.num) * 7) return
            this.w_notes[idx + (octave) * 7].getRect().setFillStyle(0xffffff);
            idx = idx + (octave + start_idx > 8 ? 8 : octave + start_idx) * 7;
            this.tone.triggerRelease([inxtoNoteW[idx]]);
        } else {
            if (idx + (octave + start_idx) * 7 >= (start_idx + this.num) * 7 - 2) return
            this.b_notes[idx + (octave) * 5].setFillStyle(0x000000);
            idx = idx + (octave + start_idx > 8 ? 8 : octave + start_idx) * 5;
            this.tone.triggerRelease([inxtoNoteB[idx]]);
        }
    }

    setHandPosition(hand, index, x, y) {
        const nowX = y * this.o_w * 2 + this.octave * this.o_w;
        const nowY = -x * this.o_w * 0.8 + this.keyboardStartY + this.s_h;
        if (hand == 1) {
            this.rightHand[index].setPosition(nowX, nowY);
        } else {
            this.leftHand[index].setPosition(nowX, nowY);
        }
    }


    pushNoteAR(hand, finger, dispatch) {
        // console.log(finger);
        if (Array.isArray(finger)) return;
        const nowX = (hand == 1) ? this.rightHand[finger].x - this.octave * this.o_w : this.leftHand[finger].x - this.octave * this.o_w;
        const nowY = (hand == 1) ? this.rightHand[finger].y : this.leftHand[finger].y;
        let noteIdx = 0;
        let mode = 0;

        if (nowY > this.keyboardStartY + this.s_h / 2) {    // 흰 건반만 있는 부분
            noteIdx = Math.floor(nowX / this.o_w * 7);
            if (noteIdx > 13) return;

        } else {    // 검은 건반, 흰 건반 같이 있는 부분
            noteIdx = Math.round(nowX / this.o_w * 7) - 1;
            // console.log(noteIdx);
            if (noteIdx == -1) {
                noteIdx = 0;
            } else if (noteIdx == 2 || noteIdx == 6 || noteIdx == 9) { // 미 or 파 or 시 or 도
                noteIdx = Math.floor(nowX / this.o_w * 7);
            } else if (noteIdx == 13) {
                noteIdx = 13
            }
            else {
                mode = 1;   // 정확도를 위해 위쪽에 있으면 보통은 검은 건반으로 처리
                if (noteIdx >= 13) return;
                if (noteIdx > 2 && noteIdx < 6) {
                    noteIdx -= 1;
                }
                else if (noteIdx > 6 && noteIdx < 9) {
                    noteIdx -= 2;
                }
                else if (noteIdx > 9 && noteIdx < 13) {
                    noteIdx -= 3;
                }
            }
        }

        // Store the pressed noteIdx, startIdx, and octave values in the dictionary
        this.pressedNotes[finger] = {
            noteIdx: noteIdx,
            mode: mode,
            startIdx: this.start_idx,
            octave: this.octave
        };

        console.log(this.pressedNotes)


        this.pushNote(noteIdx, mode, this.octave, this.start_idx,);  // user_id를 받아와야함
        const keyandoctave = getKeyFromNoteAndModeAr(noteIdx, mode);
        console.log(noteIdx, mode, keyandoctave.key, keyandoctave.add_octave);
        dispatch({ type: 'socket/keyDown', payload: { key: keyandoctave.key, octave: this.octave + keyandoctave.add_octave, start_idx: this.start_idx } });
    }

    releaseNoteAR(hand, finger, dispatch) {
        // console.log(finger);
        if (Array.isArray(finger)) return;
        // const nowX = (hand == 1) ? this.rightHand[finger].x : this.leftHand[finger].x;
        // const nowY = (hand == 1) ? this.rightHand[finger].y : this.leftHand[finger].y;
        // let noteIdx = 0;
        // let mode = 0;

        if (finger in this.pressedNotes) {
            this.releaseNote(this.pressedNotes[finger].noteIdx, this.pressedNotes[finger].mode, this.pressedNotes[finger].octave, this.pressedNotes[finger].startIdx, this.user_id);
            const keyandoctave = getKeyFromNoteAndModeAr(this.pressedNotes[finger].noteIdx, this.pressedNotes[finger].mode);
            dispatch({ type: 'socket/keyUp', payload: { key: keyandoctave.key, octave: this.octave + keyandoctave.add_octave, start_idx: this.start_idx } });
            delete this.pressedNotes[finger];
        } else {
            return;
        }
    }


    destroy() {
        // Tone.Sampler 인스턴스 해제
        this.tone.dispose();

        // 이벤트 리스너 제거
        if (this.boundKeydown) {
            document.removeEventListener('keydown', this.boundKeydown);
        }

        if (this.boundKeyup) {
            document.removeEventListener('keyup', this.boundKeyup);
        }

        // Phaser 객체들도 제거 
        for (const note of this.w_notes) {
            note.getRect().destroy();
        }

        for (const note of this.b_notes) {
            note.destroy();
        }


        this.w_notes = [];
        this.b_notes = [];

        WebMidi.disable();
    }

}

export class NoteP {
    constructor(scene, x, y, width, height, color, board_attr) {
        this.rect = scene.add.rectangle(x, y, width, height, color)
            .setDepth(2);
        this.board = scene.add.graphics()
            .setDepth(3);

        const { b_width, b_color } = board_attr;
        this.board.lineStyle(b_width, b_color)
        this.board.strokeRect(x - width / 2, y - height / 2, width, height)
    }

    getRect() {
        return this.rect;
    }
}


