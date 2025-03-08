import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slice/auth/authSlice"
import appReducer from "./slice/app/appSlice"
import {authApi} from "./api/auth/authApi";
import {tasksApi} from "./api/tasks/tasksApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        app: appReducer,
        [authApi.reducerPath]: authApi.reducer,
        [tasksApi.reducerPath]: tasksApi.reducer,
    }, middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(tasksApi.middleware),
});