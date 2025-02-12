import {createSlice} from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {pageLabel: "default"},
    reducers: {
        setPageLabel: (state, action) => {
            state.pageLabel = action.payload
        }
    }
});

export const {setPageLabel} = appSlice.actions;
export default appSlice.reducer;