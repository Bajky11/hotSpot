import {createApi} from "@reduxjs/toolkit/query/react";
import {publicFetchBaseQuery} from "../../configuration";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: publicFetchBaseQuery,
    endpoints: (builder) => ({

        register: builder.mutation({
            query: (userData) => ({
                url: "auth/register",
                method: "POST",
                body: userData,
            }),
        }),

        login: builder.mutation({
            query: (credentials) => ({
                url: "auth/login",
                method: "POST",
                body: credentials,
            }),
        }),
    }),
});

export const {useRegisterMutation, useLoginMutation} = authApi;