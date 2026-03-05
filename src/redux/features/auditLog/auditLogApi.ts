import { baseApi } from "@/redux/baseApi/baseApi";

const auditLogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAuditLogs: builder.query({
      query: (params) => ({
        url: "/audit-logs",
        method: "GET",
        params,
      }),
      providesTags: ["AuditLog"],
    }),
    createAuditLog: builder.mutation({
      query: (data) => ({
        url: "/audit-logs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AuditLog"],
    }),
  }),
});

export const { useGetAllAuditLogsQuery, useCreateAuditLogMutation } =
  auditLogApi;
