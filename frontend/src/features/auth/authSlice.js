import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    userId: null,
    loading: false,
    error: null,
  },
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    logoutSuccess: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.error = null;
    },
    logoutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getCookieRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCookieSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    getCookieFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getUserByIdRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUserByIdSuccess: (state, action) => {
      state.loading = true;
      state.userId = action.payload;
    },
    getUserByIdFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  getCookieRequest,
  getCookieSuccess,
  getCookieFailure,
  logoutFailure,
  logoutSuccess,
  logoutRequest,
  getUserByIdRequest,
  getUserByIdSuccess,
  getUserByIdFailure,
} = authSlice.actions;

export default authSlice.reducer;
