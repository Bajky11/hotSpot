import {fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const BE_URL = process.env.REACT_APP_API_URL

export const publicFetchBaseQuery = fetchBaseQuery({
    baseUrl: BE_URL,
});

export const authenticatedFetchBaseQuery = fetchBaseQuery({
    baseUrl: BE_URL,
    prepareHeaders: (headers, {getState}) => {

        const token = getState().auth.user.token;

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        return headers;
    }
});
