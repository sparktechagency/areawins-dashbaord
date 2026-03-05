import { baseApi } from "@/redux/baseApi/baseApi";

const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyWallet: builder.query({
      query: () => ({
        url: "/wallet/me",
        method: "GET",
      }),
      providesTags: ["Wallet"],
    }),
    deposit: builder.mutation({
      query: (data) => ({
        url: "/wallet/deposit",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wallet", "Transaction"],
    }),
    withdraw: builder.mutation({
      query: (data) => ({
        url: "/wallet/withdraw",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wallet", "Transaction"],
    }),
    manageWithdrawal: builder.mutation({
      query: ({ transactionId, data }) => ({
        url: `/wallet/manage-withdrawal/${transactionId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wallet", "Transaction"],
    }),
    manageDeposit: builder.mutation({
      query: ({ transactionId, data }) => ({
        url: `/wallet/manage-deposit/${transactionId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wallet", "Transaction"],
    }),
  }),
});

export const {
  useGetMyWalletQuery,
  useDepositMutation,
  useWithdrawMutation,
  useManageWithdrawalMutation,
  useManageDepositMutation,
} = walletApi;
