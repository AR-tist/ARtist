import MidiParser from 'midi-parser-js';
// import { Inko } from 'inko';
// 업로드된 MIDI 파일을 BASE64로 받은 다음, MIDI 파일을 파싱한다. 그리고 결과를 setMidi로 저장한다.
export const fileToMidi = (fileURL) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileURL); // ref.current.files[0]
        reader.onload = () => {
            const result = MidiParser.Base64(reader.result);
            resolve(result);
        }
        reader.onerror = reject;
    })
}

// 모델 결과 midiData를 
export function uint8ArrayToBase64(uint8Array) {
    let binary = '';
    const length = uint8Array.length;

    for (let i = 0; i < length; i++) {
        binary += String.fromCharCode(uint8Array[i]);
    }

    return btoa(binary);
}

// 올바른 트랙을 찾는 함수
export const extarctEvent = (tracks) => {
    let valid_index = 0;
    if (tracks.length === 1) return 0;
    tracks.forEach((e, i) => {
        if (valid_index !== 0) return;
        e.event.forEach((e2, i2) => {
            if (e2.type === 8 || e2.type === 9) {
                valid_index = i;
                return;
            }
        })
    })
    return valid_index;
}


export const isKor = (str) => {
    return /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(str);
}

export const getKey = (str) => {
    let key = '';
    // if (isKor(str)) {
    //     const inko = new Inko();
    //     key = inko.ko2en(str);
    // } else
    key = str.toLowerCase();
    return key;
}

export const assignLh = (track) => {
    const _track = [...track];
    // re-assign for modify track
    for (let idx = 0; idx < _track.length; idx++) {
        _track[idx] = Object.assign({}, _track[idx]);
    }

    let note_list = [];

    for (let i = 0; i < _track.length; i++) {
        if (_track[i].type === 9) {
            note_list.push(_track[i].data[0]);
        }
    }

    let median = 0;
    note_list.forEach((e) => {
        median += e;
    });

    median = Math.floor(median / note_list.length);

    console.log('The Median of this midi file : ', median);

    for (let i = 0; i < _track.length; i++) {
        if (_track[i].type === 9 || _track[i].type === 8) {
            if (_track[i].data[0] < median) {
                _track[i].lh = 0;
            } else {
                _track[i].lh = 1;
            }
        }
    }
    return _track
}

export const onebyoneMIDI = (track) => {
    const _track = [...track];
    // re-assign for modify track
    for (let idx = 0; idx < _track.length; idx++) {
        _track[idx] = Object.assign({}, _track[idx]);
    }

    // start idx의 끝나는 지점을 찾고 삭제
    const delete_end_event = (idx) => {
        let tmp_end_event = null;
        for (let i = idx + 1; i < _track.length; i++) {
            if (_track[i].type === 8 && _track[i].data[0] === _track[idx].data[0]) {
                // console.log('end', i, _track[i]);
                tmp_end_event = Object.assign({}, _track[i]);
                if (i + 1 < _track.length)
                    _track[i + 1].deltaTime = _track[i].deltaTime + _track[i + 1].deltaTime;
                _track.splice(i, 1);
                break
            }
        }
        return tmp_end_event
    }

    // 0 deltatime을 가진 start idx를 찾음
    const find_start_at_the_same_time = (idx) => {
        let start_idxs = [idx,]
        for (let i = idx + 1; i < _track.length; i++) {
            if (_track[i].deltaTime > 25 || _track[i].type !== 9) {
                break
            } else {
                start_idxs.push(i)
            }
        }
        return start_idxs
    }
    // 

    for (let idx = 0 < _track.length - 1; idx++;) {
        // 누르는 이벤트를 찾음
        try {
            if (_track[idx].type !== 9)
                continue
        } catch (e) {
            break // 끝까지 갔을 때
        }

        // 같이 시작되는 지점을 찾음
        const start_idxs = find_start_at_the_same_time(idx);

        // 해당 지점들의 끝나는 지점을 찾고 삭제
        const start_events = []
        for (let i = 0; i < start_idxs.length; i++) {
            const tmp_end_event = delete_end_event(start_idxs[i]);
            if (tmp_end_event === null) {
                continue
            }
            tmp_end_event.deltaTime = 0;
            start_events.push(tmp_end_event);
        }

        // 다음 시작되는 지점 앞에 끝나는 지점을 삽입
        if (start_events.length === 0) continue
        for (let i = idx + start_events.length; i < _track.length; i++) {
            if (_track[i].type === 9 && _track[i].deltaTime > 10) {
                // console.log('next start', i, _track[i]);
                for (let j = 0; j < start_events.length; j++)
                    _track.splice(i + j, 0, start_events[j]);
                break
            }
        }

        // for (let j = 0; j < start_events.length; j++)
        //     _track.splice(idx + start_events.length + j, 0, start_events[j]);

        idx += start_idxs.length;
    }
    return _track
}