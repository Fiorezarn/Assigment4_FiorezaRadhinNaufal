import { put, takeLatest } from "redux-saga/effects";
import {
  fetchRequestGetAllCourses,
  fetchSuccessGetAllCourses,
  fetchFailureGetAllCourses,
  fetchRequestGetByIdCourses,
  fetchSuccessGetByIdCourses,
  fetchFailureGetByIdCourses,
  registerCourseRequest,
  registerCourseSuccess,
  registerCourseFailure,
} from "./coursesSlice";

const COURSE_API = import.meta.env.VITE_BASE_URL_BE;

function* getAllCourses() {
  try {
    const response = yield fetch(`${COURSE_API}/courses`);
    const courses = yield response.json();
    yield put(fetchSuccessGetAllCourses(courses));
  } catch (error) {
    yield put(fetchFailureGetAllCourses(error.message));
  }
}

function* getCourseById(action) {
  try {
    const response = yield fetch(`${COURSE_API}/courses/${action.payload}`);
    const courses = yield response.json();
    yield put(fetchSuccessGetByIdCourses(courses));
  } catch (error) {
    yield put(fetchFailureGetByIdCourses(error.message));
  }
}

function* registerCourse(action) {
  try {
    const { userId, courseId } = action.payload;
    const response = yield fetch(`${COURSE_API}/users/register-course`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        courseId,
      }),
    });
    const course = yield response.json();
    yield put(registerCourseSuccess(course));
  } catch (error) {
    yield put(registerCourseFailure(error.message));
  }
}

export default function* coursesSaga() {
  yield takeLatest("COURSE_GET_ALL", getAllCourses);
  yield takeLatest("COURSE_GET_BY_ID", getCourseById);
  yield takeLatest("REGISTER_COURSE", registerCourse);
}
