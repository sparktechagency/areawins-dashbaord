import { baseApi } from "@/redux/baseApi/baseApi";

const matchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMatches: builder.query({
      query: (params) => ({
        url: "/matches",
        method: "GET",
        params,
      }),
      providesTags: ["Match"],
    }),
    getSingleMatch: builder.query({
      query: (id) => ({
        url: `/matches/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Match", id }],
    }),
    getSingleMatchByMatchId: builder.query({
      query: (matchId) => ({
        url: `/matches/match-id/${matchId}`,
        method: "GET",
      }),
    }),
    createMatch: builder.mutation({
      query: (data) => ({
        url: "/matches",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Match"],
    }),
    updateMatch: builder.mutation({
      query: ({ id, data }) => ({
        url: `/matches/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Match",
        { type: "Match", id },
      ],
    }),
    deleteMatch: builder.mutation({
      query: (id) => ({
        url: `/matches/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Match"],
    }),
    updateLiveStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/matches/${id}/live`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Match",
        { type: "Match", id },
      ],
    }),
    settleMatchResult: builder.mutation({
      query: ({ id, data }) => ({
        url: `/matches/${id}/settle`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Match",
        { type: "Match", id },
      ],
    }),
    changeMatchStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/matches/${id}/status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Match",
        { type: "Match", id },
      ],
    }),
  }),
});

export const {
  useGetAllMatchesQuery,
  useGetSingleMatchQuery,
  useGetSingleMatchByMatchIdQuery,
  useCreateMatchMutation,
  useUpdateMatchMutation,
  useDeleteMatchMutation,
  useUpdateLiveStatusMutation,
  useSettleMatchResultMutation,
  useChangeMatchStatusMutation,
} = matchApi;
