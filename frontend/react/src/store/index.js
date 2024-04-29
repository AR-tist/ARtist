import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import exampleSlice from "./slices/example/exampleSlice";
import midiSlice from "./slices/midi/midiSlice";
import userSlice from "./slices/user/userSlice";
import { socketMiddleware } from "./socket_middleware";
import Socket from "../utils/socket";
import roomSlice from "./slices/room/roomSlice";

const store = configureStore({
    reducer: {
        example: exampleSlice.reducer,
        midi: midiSlice.reducer,
        user: userSlice.reducer,
        room: roomSlice.reducer,
    },
    middleware: [socketMiddleware(new Socket()), ...getDefaultMiddleware(
        { serializableCheck: false }
    )],
});

export default store;
