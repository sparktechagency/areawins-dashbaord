import { baseApi } from "@/redux/baseApi/baseApi";

const supportTicketApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTickets: builder.query({
      query: (params) => ({
        url: "/support-tickets",
        method: "GET",
        params,
      }),
      providesTags: ["SupportTicket"],
    }),
    getMyTickets: builder.query({
      query: (params) => ({
        url: "/support-tickets/my",
        method: "GET",
        params,
      }),
      providesTags: ["SupportTicket"],
    }),
    getSingleTicket: builder.query({
      query: (id) => ({
        url: `/support-tickets/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "SupportTicket", id }],
    }),
    createTicket: builder.mutation({
      query: (data) => ({
        url: "/support-tickets",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SupportTicket"],
    }),
    respondToTicket: builder.mutation({
      query: ({ id, data }) => ({
        url: `/support-tickets/${id}/respond`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        "SupportTicket",
        { type: "SupportTicket", id },
      ],
    }),
    assignTicket: builder.mutation({
      query: ({ id, data }) => ({
        url: `/support-tickets/${id}/assign`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        "SupportTicket",
        { type: "SupportTicket", id },
      ],
    }),
    updateTicketStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/support-tickets/${id}/status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        "SupportTicket",
        { type: "SupportTicket", id },
      ],
    }),
  }),
});

export const {
  useGetAllTicketsQuery,
  useGetMyTicketsQuery,
  useGetSingleTicketQuery,
  useCreateTicketMutation,
  useRespondToTicketMutation,
  useAssignTicketMutation,
  useUpdateTicketStatusMutation,
} = supportTicketApi;
