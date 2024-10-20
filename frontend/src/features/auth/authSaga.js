import { put, takeLatest } from "redux-saga/effects";
import {
  loginSuccess,
  loginFailure,
  getCookieSuccess,
  getCookieFailure,
  getUserByIdSuccess,
  getUserByIdFailure,
  logoutSuccess,
  registerSuccess,
  registerFailure,
} from "./authSlice";
import Cookies from "js-cookie";
import { fetchLogin, fetchRegister } from "./authApi";

const BASE_API = import.meta.env.VITE_BASE_URL_BE;

function* register(action) {
  try {
    const response = yield fetchRegister(action.payload);
    yield put(registerSuccess(response));
  } catch (error) {
    yield put(registerFailure(error.message));
  }
}

function* login(action) {
  try {
    const response = yield fetchLogin(action.payload);
    yield put(loginSuccess(response));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

function* logout() {
  try {
    yield Cookies.remove("user");
    yield put(logoutSuccess());
  } catch {
    yield put(loginFailure("Failed to logout"));
  }
}

function* getCookie() {
  try {
    const cookie = yield Cookies.get("user");
    const userData = JSON.parse(cookie);
    yield put(getCookieSuccess(userData));
  } catch (error) {
    yield put(getCookieFailure(error.message));
  }
}

function* getUserById(action) {
  try {
    const response = yield fetch(`${BASE_API}/users/${action.payload}`);
    const user = yield response.json();
    yield put(getUserByIdSuccess(user));
  } catch (error) {
    yield put(getUserByIdFailure(error.message));
  }
}

export default function* authSaga() {
  yield takeLatest("auth/loginRequest", login);
  yield takeLatest("auth/getCookieRequest", getCookie);
  yield takeLatest("auth/logoutRequest", logout);
  yield takeLatest("auth/getUserByIdRequest", getUserById);
  yield takeLatest("auth/registerRequest", register);
}
