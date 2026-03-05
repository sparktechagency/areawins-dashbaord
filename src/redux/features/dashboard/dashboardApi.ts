import { baseApi } from "@/redux/baseApi/baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query({
      query: () => ({
        url: "/dashboard/stats",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
    getActivity: builder.query({
      query: () => ({
        url: "/dashboard/activity",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetStatsQuery, useGetActivityQuery } = dashboardApi;
