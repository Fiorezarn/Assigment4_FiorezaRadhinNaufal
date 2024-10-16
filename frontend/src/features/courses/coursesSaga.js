import { put, takeLatest } from "redux-saga/effects";
import {
  fetchRequestGetAllCourses,
  fetchSuccessGetAllCourses,
  fetchFailureGetAllCourses,
  fetchRequestGetByIdCourses,
  fetchSuccessGetByIdCourses,
  fetchFailureGetByIdCourses,
} from "./coursesSlice";

const COURSE_API = import.meta.env.VITE_BASE_URL_BE;

async function fetchData(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return await response.json();
}

function* getAllCourses() {
  try {
    const response = yield fetchData(`${COURSE_API}/courses`);
    yield put(fetchSuccessGetAllCourses(response));
  } catch (error) {
    yield put(fetchFailureGetAllCourses(error.message));
  }
}
function* getCourseById(action) {
  try {
    const response = yield fetchData(`${COURSE_API}/courses/${action.payload}`);
    yield put(fetchSuccessGetByIdCourses(response));
  } catch (error) {
    yield put(fetchFailureGetByIdCourses(error.message));
  }
}

export default function* coursesSaga() {
  yield takeLatest("COURSE_GET_ALL", getAllCourses);
  yield takeLatest("COURSE_GET_BY_ID", getCourseById);
}
