import { baseApi } from "@/redux/baseApi/baseApi";

const tournamentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTournaments: builder.query({
      query: (params) => ({
        url: "/tournaments",
        method: "GET",
        params,
      }),
      providesTags: ["Tournament"],
    }),
    getTournamentsBySportCategory: builder.query({
      query: (params) => ({
        url: "/tournaments/sport-category",
        method: "GET",
        params,
      }),
      providesTags: ["Tournament"],
    }),
    getSingleTournament: builder.query({
      query: (id) => ({
        url: `/tournaments/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Tournament", id }],
    }),
    createTournament: builder.mutation({
      query: (data) => ({
        url: "/tournaments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tournament"],
    }),
    updateTournament: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tournaments/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Tournament",
        { type: "Tournament", id },
      ],
    }),
    deleteTournament: builder.mutation({
      query: (id) => ({
        url: `/tournaments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tournament"],
    }),
    getSeasons: builder.query({
      query: (id) => ({
        url: `/tournaments/${id}/seasons`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllTournamentsQuery,
  useGetTournamentsBySportCategoryQuery,
  useGetSingleTournamentQuery,
  useCreateTournamentMutation,
  useUpdateTournamentMutation,
  useDeleteTournamentMutation,
  useGetSeasonsQuery,
} = tournamentApi;
