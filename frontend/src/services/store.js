import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slice/auth/authSlice"
import appReducer from "./slice/app/appSlice"
import {authApi} from "./api/auth/authApi";
import {friendsApi} from "./api/friends/friendsApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        app: appReducer,
        [authApi.reducerPath]: authApi.reducer,
        [friendsApi.reducerPath]: friendsApi.reducer,
    }, middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(friendsApi.middleware),
});