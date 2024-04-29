import { createSlice } from "@reduxjs/toolkit";

const midiSlice = createSlice({
    name: "midi",
    initialState: {
        midiList: [],
        midi: null,
        loading: false
    },

    reducers: {
        setmidilist(state, action) {
            state.midiList = action.payload.midilist;
        },
        setmidi(state, action) {
            state.midi = action.payload.midi;
        },
        setLoading(state, action) {
            state.loading = action.payload.loading;
        }
    },
});

export const Actions = midiSlice.actions;

export default midiSlice;
