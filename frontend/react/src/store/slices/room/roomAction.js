import { Actions } from './roomSlice';



export const setRoom = (room) => {
    return (dispatch) => {
        dispatch(Actions.setRoom({ room: room }));
    }
}

export const setOngoingFalse = () => {
    return (dispatch) => {
        dispatch(Actions.setOngoingFalse());
    }
}

export const setOngoingCode = (code) => {
    return (dispatch) => {
        dispatch(Actions.setOngoingCode({ code: code }));
    }
}

export const setStart = (start) => {
    return (dispatch) => {
        dispatch(Actions.setStart({ start: start }));
    }
}

export const setKeydown = (keydown) => {
    return (dispatch) => {
        dispatch(Actions.setKeydown({ keydown: keydown }));
    }
}

export const setKeyup = (keyup) => {
    return (dispatch) => {
        dispatch(Actions.setKeyup({ keyup: keyup }));
    }
}
