import { baseApi } from "@/redux/baseApi/baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      query: () => ({
        url: "/users/my-profile",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    updateMyProfile: builder.mutation({
      query: (data) => ({
        url: "/users/update-profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    deleteMyProfile: builder.mutation({
      query: () => ({
        url: "/users/delete-profile",
        method: "DELETE",
      }),
    }),
  }),
});
export const {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useDeleteMyProfileMutation,
} = profileApi;
