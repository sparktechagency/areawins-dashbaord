import { baseApi } from "@/redux/baseApi/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    initiatePayment: builder.mutation({
      query: (data) => ({
        url: "/payments/initiate",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wallet", "Transaction"],
    }),
    capturePayPalPayment: builder.mutation({
      query: (data) => ({
        url: "/payments/capture/paypal",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wallet", "Transaction"],
    }),
    uploadBankReceipt: builder.mutation({
      query: (data) => ({
        url: "/payments/bank/upload-receipt",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wallet", "Transaction"],
    }),
  }),
});

export const {
  useInitiatePaymentMutation,
  useCapturePayPalPaymentMutation,
  useUploadBankReceiptMutation,
} = paymentApi;
