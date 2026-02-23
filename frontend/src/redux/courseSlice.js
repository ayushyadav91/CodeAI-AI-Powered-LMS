import { createSlice } from "@reduxjs/toolkit";


const courseSlice = createSlice({
    name: "course",
    initialState: {
        createrCourseData: null,
    },
    reducers: {
        setCreaterCourseData: (state, action) => {
            state.createrCourseData = action.payload;
        },
    },
});

export const {setCreaterCourseData} = courseSlice.actions;
export default courseSlice.reducer;