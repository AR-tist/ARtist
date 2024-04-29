import { createSlice } from "@reduxjs/toolkit";
import Client from "../../../models/Client";
import cookie from 'react-cookies';
import { v4 as uuidv4 } from "uuid";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user_instance: new Client({ id: uuidv4(), value: 0 }),
    },

    reducers: {
        setClient(state, action) {
            state.user_instance = action.payload.user_instance;
            cookie.save('user_instance', state.user_instance);
        },

        setnickname(state, action) {
            const user_instance = { ...state.user_instance };

            user_instance.nickname = action.payload.nickname

            state.user_instance = user_instance;

            cookie.save('user_instance', state.user_instance);
        },

        setDevice(state, action) {
            const user_instance = { ...state.user_instance };

            user_instance.device = action.payload.device

            state.user_instance = user_instance;

            cookie.save('user_instance', state.user_instance);
        },
        setPlayMode(state, action) {
            const user_instance = { ...state.user_instance };

            user_instance.play_mode = action.payload.play_mode

            state.user_instance = user_instance;

            cookie.save('user_instance', state.user_instance);
        },
        setTempo(state, action) {
            const user_instance = { ...state.user_instance };

            user_instance.tempo = action.payload.tempo

            state.user_instance = user_instance;


            cookie.save('user_instance', state.user_instance);
        }
    },


});

export const Actions = userSlice.actions;

export default userSlice;
