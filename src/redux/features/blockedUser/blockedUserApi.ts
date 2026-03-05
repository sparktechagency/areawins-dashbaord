import { baseApi } from "@/redux/baseApi/baseApi";

const blockedUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyBlockedUsers: builder.query({
      query: () => ({
        url: "/blocked-users/my",
        method: "GET",
      }),
      providesTags: ["BlockedUser"],
    }),
    blockUser: builder.mutation({
      query: (data) => ({
        url: "/blocked-users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["BlockedUser"],
    }),
    unblockUser: builder.mutation({
      query: (blockedId) => ({
        url: `/blocked-users/${blockedId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BlockedUser"],
    }),
  }),
});

export const {
  useGetMyBlockedUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
} = blockedUserApi;
