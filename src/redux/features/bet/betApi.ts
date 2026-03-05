import { baseApi } from "@/redux/baseApi/baseApi";

const betApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBets: builder.query({
      query: (params) => ({
        url: "/bets",
        method: "GET",
        params,
      }),
      providesTags: ["Bet"],
    }),
    getSingleBet: builder.query({
      query: (id) => ({
        url: `/bets/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Bet", id }],
    }),
    getSingleBetByBetId: builder.query({
      query: (betId) => ({
        url: `/bets/bet-id/${betId}`,
        method: "GET",
      }),
    }),
    getOpenBetsByMatch: builder.query({
      query: (matchId) => ({
        url: `/bets/match/${matchId}/open`,
        method: "GET",
      }),
    }),
    createBet: builder.mutation({
      query: (data) => ({
        url: "/bets",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bet"],
    }),
    matchBet: builder.mutation({
      query: (data) => ({
        url: "/bets/match",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bet"],
    }),
    settleBet: builder.mutation({
      query: ({ id, data }) => ({
        url: `/bets/${id}/settle`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => ["Bet", { type: "Bet", id }],
    }),
    cancelBet: builder.mutation({
      query: (id) => ({
        url: `/bets/${id}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => ["Bet", { type: "Bet", id }],
    }),
    refundBet: builder.mutation({
      query: (id) => ({
        url: `/bets/${id}/refund`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => ["Bet", { type: "Bet", id }],
    }),
  }),
});

export const {
  useGetAllBetsQuery,
  useGetSingleBetQuery,
  useGetSingleBetByBetIdQuery,
  useGetOpenBetsByMatchQuery,
  useCreateBetMutation,
  useMatchBetMutation,
  useSettleBetMutation,
  useCancelBetMutation,
  useRefundBetMutation,
} = betApi;
