import Room from '../models/Room'
import { wsbaseURL } from '../utils/axios'
import { setKeydown, setRoom, setStart, setKeyup } from './slices/room/roomAction'
import { setOngoingCode } from './slices/room/roomAction'



export const socketMiddleware = (socket) => (params) => (next) => (action) => {
    const { dispatch, getState } = params
    const { type } = action


    switch (type) {
        case 'socket/connect':
            if (socket.isConnected()) {
                return next(action)
            }

            const payload = action.payload
            console.log(payload)

            let queryPath = `?filename=${payload.filename}&nickname=${payload.nickname}&user_id=${payload.user_id}&device=${payload.device}&play_mode=${payload.play_mode}`;
            if (payload.room_id !== undefined) {
                queryPath = `?room_id=${payload.room_id}&nickname=${payload.nickname}&user_id=${payload.user_id}&device=${payload.device}&play_mode=${payload.play_mode}`;
            }
            socket.connect(`${wsbaseURL}${queryPath}`)


            socket.on('open', () => {
                console.log('WebSocket connection opened');
            })
            socket.on('message', (event) => {

                // console.log('WebSocket message received:', event);
                const data = JSON.parse(event.data);
                if (data.type === 'connect') {
                    if (payload.room_id === undefined) {
                        data.data.ongoing_code = 1;
                    }
                    dispatch(setRoom(new Room(data.data)));
                    dispatch(setStart(0));
                }
                else if (data.type === 'host_out') {
                    dispatch(setRoom(new Room({ error_code: 2 })));
                }
                else if (data.type === 'join' || data.type === 'disconnect') {
                    dispatch(setRoom(new Room(data.data)));
                }
                else if (data.type === 'areYouReady') {
                    dispatch(setOngoingCode(2));
                }
                else if (data.type === 'start') {
                    console.log('서버로부터 start 받음', data.data)
                    dispatch(setStart(data.data));
                }
                else if (data.type === 'keyDown') {
                    dispatch(setKeydown(data.data));
                }
                else if (data.type === 'keyUp') {
                    dispatch(setKeyup(data.data));
                }
            })
            socket.on('close', () => {
                dispatch(setRoom(new Room({ error_code: 1 })));
                console.log('WebSocket connection closed');
            })
            break

        case 'socket/disconnect':
            socket.disconnect()
            break
        case 'socket/host_play':
            socket.send(JSON.stringify({ type: 'host_play' }))
            break
        case 'socket/imready':
            socket.send(JSON.stringify({ type: 'imready' }))
            break
        case 'socket/keyDown':
            socket.send(JSON.stringify({ type: 'keyDown', data: action.payload }))
            break
        case 'socket/keyUp':
            socket.send(JSON.stringify({ type: 'keyUp', data: action.payload }))
            break

        default:
            break
    }

    return next(action)
}