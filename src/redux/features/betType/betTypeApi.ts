import { baseApi } from "@/redux/baseApi/baseApi";

const betTypeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBetTypes: builder.query({
      query: (params) => ({
        url: "/bet-types",
        method: "GET",
        params,
      }),
      providesTags: ["BetType"],
    }),
    getSingleBetType: builder.query({
      query: (id) => ({
        url: `/bet-types/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "BetType", id }],
    }),
    getBetTypesBySport: builder.query({
      query: (sportId) => ({
        url: `/bet-types/sport/${sportId}`,
        method: "GET",
      }),
    }),
    createBetType: builder.mutation({
      query: (data) => ({
        url: "/bet-types",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["BetType"],
    }),
    updateBetType: builder.mutation({
      query: ({ id, data }) => ({
        url: `/bet-types/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        "BetType",
        { type: "BetType", id },
      ],
    }),
    deleteBetType: builder.mutation({
      query: (id) => ({
        url: `/bet-types/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BetType"],
    }),
    changeBetTypeStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/bet-types/${id}/status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        "BetType",
        { type: "BetType", id },
      ],
    }),
    setDefaultBetType: builder.mutation({
      query: (id) => ({
        url: `/bet-types/${id}/set-default`,
        method: "PATCH",
      }),
      invalidatesTags: ["BetType"],
    }),
  }),
});

export const {
  useGetAllBetTypesQuery,
  useGetSingleBetTypeQuery,
  useGetBetTypesBySportQuery,
  useCreateBetTypeMutation,
  useUpdateBetTypeMutation,
  useDeleteBetTypeMutation,
  useChangeBetTypeStatusMutation,
  useSetDefaultBetTypeMutation,
} = betTypeApi;
