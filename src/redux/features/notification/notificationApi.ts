import { baseApi } from "@/redux/baseApi/baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyNotifications: builder.query({
      query: (params) => ({
        url: "/notifications/my",
        method: "GET",
        params,
      }),
      providesTags: ["Notification"],
    }),
    markAllAsRead: builder.mutation({
      query: () => ({
        url: "/notifications/my/mark-all-read",
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),
    markAsRead: builder.mutation({
      query: (id) => ({
        url: `/notifications/my/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),
    createNotification: builder.mutation({
      query: (data) => ({
        url: "/notifications",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const {
  useGetMyNotificationsQuery,
  useMarkAllAsReadMutation,
  useMarkAsReadMutation,
  useCreateNotificationMutation,
} = notificationApi;
