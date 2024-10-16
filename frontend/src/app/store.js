import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import coursesReducer from "../features/courses/coursesSlice";
import coursesSaga from "../features/courses/coursesSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

[coursesSaga].map((saga) => {
  sagaMiddleware.run(saga);
});
