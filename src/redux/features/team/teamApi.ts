import { baseApi } from "@/redux/baseApi/baseApi";

const teamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTeams: builder.query({
      query: (params) => ({
        url: "/teams",
        method: "GET",
        params,
      }),
      providesTags: ["Team"],
    }),
    getTeamsBySportCategory: builder.query({
      query: (sportCategory) => ({
        url: `/teams/sport/${sportCategory}`,
        method: "GET",
      }),
      providesTags: ["Team"],
    }),
    getTeamsByTournament: builder.query({
      query: (tournamentId) => ({
        url: `/teams/tournament/${tournamentId}`,
        method: "GET",
      }),
      providesTags: ["Team"],
    }),
    getSingleTeam: builder.query({
      query: (id) => ({
        url: `/teams/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Team", id }],
    }),
    getSingleTeamBySlug: builder.query({
      query: (slug) => ({
        url: `/teams/slug/${slug}`,
        method: "GET",
      }),
    }),
    createTeam: builder.mutation({
      query: (data) => ({
        url: "/teams",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Team"],
    }),
    updateTeam: builder.mutation({
      query: ({ id, data }) => ({
        url: `/teams/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Team",
        { type: "Team", id },
      ],
    }),
    deleteTeam: builder.mutation({
      query: (id) => ({
        url: `/teams/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Team"],
    }),
  }),
});

export const {
  useGetAllTeamsQuery,
  useGetTeamsBySportCategoryQuery,
  useGetTeamsByTournamentQuery,
  useGetSingleTeamQuery,
  useGetSingleTeamBySlugQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
} = teamApi;
