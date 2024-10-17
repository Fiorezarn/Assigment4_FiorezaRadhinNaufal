import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import coursesReducer from "../features/courses/coursesSlice";
import coursesSaga from "../features/courses/coursesSaga";
import authReducer from "../features/auth/authSlice";
import authSaga from "../features/auth/authSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

[coursesSaga, authSaga].map((saga) => {
  sagaMiddleware.run(saga);
});
