import { baseApi } from "@/redux/baseApi/baseApi";

const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransactions: builder.query({
      query: (params) => ({
        url: "/transactions",
        method: "GET",
        params,
      }),
      providesTags: ["Transaction"],
    }),
    getMyTransactions: builder.query({
      query: (params) => ({
        url: "/transactions/my",
        method: "GET",
        params,
      }),
      providesTags: ["Transaction"],
    }),
    getSingleTransaction: builder.query({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Transaction", id }],
    }),
    getSingleTransactionByTxId: builder.query({
      query: (transactionId) => ({
        url: `/transactions/tx-id/${transactionId}`,
        method: "GET",
      }),
    }),
    createTransaction: builder.mutation({
      query: (data) => ({
        url: "/transactions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transaction"],
    }),
  }),
});

export const {
  useGetAllTransactionsQuery,
  useGetMyTransactionsQuery,
  useGetSingleTransactionQuery,
  useGetSingleTransactionByTxIdQuery,
  useCreateTransactionMutation,
} = transactionApi;
