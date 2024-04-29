import { Actions } from './userSlice';


export const setNickname = (nickname) => {
    return (dispatch) => {
        dispatch(Actions.setnickname({ nickname: nickname }));
    }
}

export const setClient = (user_instance) => {
    return (dispatch) => {
        dispatch(Actions.setClient({ user_instance: user_instance }));
    }
}

export const setDevice = (device) => {
    return (dispatch) => {
        dispatch(Actions.setDevice({ device: device }));
    }
}

export const setPlayMode = (play_mode) => {
    return (dispatch) => {
        dispatch(Actions.setPlayMode({ play_mode: play_mode }));
    }
}

export const setTempo = (tempo) => {
    return (dispatch) => {
        dispatch(Actions.setTempo({ tempo: tempo }));
    }
}