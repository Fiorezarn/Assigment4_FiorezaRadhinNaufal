import { createSlice } from "@reduxjs/toolkit";

export const courseSlice = createSlice({
  name: "courses",
  initialState: {
    dataId: null,
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchRequestGetAllCourses: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccessGetAllCourses: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchFailureGetAllCourses: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchRequestGetByIdCourses: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccessGetByIdCourses: (state, action) => {
      state.loading = false;
      state.dataId = action.payload;
    },
    fetchFailureGetByIdCourses: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchRequestGetAllCourses,
  fetchSuccessGetAllCourses,
  fetchFailureGetAllCourses,
  fetchRequestGetByIdCourses,
  fetchSuccessGetByIdCourses,
  fetchFailureGetByIdCourses,
} = courseSlice.actions;
export default courseSlice.reducer;
