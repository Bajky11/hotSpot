import {createApi} from "@reduxjs/toolkit/query/react";
import {authenticatedFetchBaseQuery} from "../../configuration";

export const friendsApi = createApi({
    reducerPath: "friendsApi",
    baseQuery: authenticatedFetchBaseQuery,
    tagTypes: ["Friend"],
    endpoints: (builder) => ({
        getFriends: builder.query({
            query: () => `friends`,
            providesTags: (result) =>
                result
                    ? [...result.map(({id}) => ({type: "Friend", id})), {type: "Friend", id: "LIST"}]
                    : [{type: "Friend", id: "LIST"}],
        }),

        addFriend: builder.mutation({
            query: (friendData) => ({
                url: `friends`,
                method: "POST",
                body: friendData,
            }),
            invalidatesTags: [{type: "Friend", id: "LIST"}],
        }),

        increaseScore: builder.mutation({
            query: ({friendId, points}) => ({
                url: `friends/${friendId}/increase-score?points=${points}`,
                method: "PUT",
            }),
            invalidatesTags: (result, error, {friendId}) => [{type: "Friend", id: friendId}],
        }),

        decreaseScore: builder.mutation({
            query: ({friendId, points}) => ({
                url: `friends/${friendId}/decrease-score?points=${points}`,
                method: "PUT",
            }),
            invalidatesTags: (result, error, {friendId}) => [{type: "Friend", id: friendId}],
        }),

        deleteFriend: builder.mutation({
            query: (friendId) => ({
                url: `friends/${friendId}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, friendId) => [{type: "Friend", id: friendId}],
        }),
    }),
});

export const {
    useGetFriendsQuery,
    useAddFriendMutation,
    useIncreaseScoreMutation,
    useDecreaseScoreMutation,
    useDeleteFriendMutation,
} = friendsApi;