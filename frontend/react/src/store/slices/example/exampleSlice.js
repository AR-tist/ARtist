import { createSlice } from "@reduxjs/toolkit";

const exampleSlice = createSlice({
    name: "example",
    initialState: { // 시작 State 수정
        examVar: true,
    },

    reducers: {
        action(state, action) {
            state.examVar = action.payload.examVar;
        },
    },
});

export const Actions = exampleSlice.actions;

export default exampleSlice;
