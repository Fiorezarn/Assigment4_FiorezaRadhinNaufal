import { put, takeLatest } from "redux-saga/effects";
import {
  loginSuccess,
  loginFailure,
  getCookieSucces,
  getCookieFailure,
} from "./authSlice";
import Cookies from "js-cookie";

const BASE_API = import.meta.env.VITE_BASE_URL_BE;

async function fetchLogin({ username, password }) {
  const response = await fetch(`${BASE_API}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });
  return await response.json();
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
    yield put(loginSuccess(null));
  } catch {
    yield put(loginFailure("Failed to logout"));
  }
}

function* getCookie() {
  try {
    const cookie = yield Cookies.get("user");
    const userData = JSON.parse(cookie);
    yield put(getCookieSucces(userData));
  } catch (error) {
    yield put(getCookieFailure(error.message));
  }
}

export default function* authSaga() {
  yield takeLatest("auth/loginRequest", login);
  yield takeLatest("auth/getCookieRequest", getCookie);
  yield takeLatest("auth/logoutRequest", logout);
}
