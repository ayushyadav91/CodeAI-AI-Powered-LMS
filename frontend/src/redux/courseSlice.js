import { createSlice } from "@reduxjs/toolkit";


const courseSlice = createSlice({
    name: "course",
    initialState: {
        createrCourseData: null,
        courseData:null,

    },
    reducers: {
        setCreaterCourseData: (state, action) => {
            state.createrCourseData = action.payload;
        },
        setCourseData: (state, action) => {
            state.courseData = action.payload;
        },
    },
});

export const {setCreaterCourseData} = courseSlice.actions;
export const {setCourseData} = courseSlice.actions;
export default courseSlice.reducer;