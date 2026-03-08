import { baseApi } from "@/redux/baseApi/baseApi";

const sportCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSportCategories: builder.query({
      query: (params) => ({
        url: "/sport-categories",
        method: "GET",
        params,
      }),
      providesTags: ["SportCategory"],
    }),
    getSingleSportCategory: builder.query({
      query: (id) => ({
        url: `/sport-categories/${id}`,
        method: "GET",
      }),
    }),
    createSportCategory: builder.mutation({
      query: (data) => ({
        url: "/sport-categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SportCategory"],
    }),
    updateSportCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/sport-categories/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["SportCategory"],
    }),
    deleteSportCategory: builder.mutation({
      query: (id) => ({
        url: `/sport-categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SportCategory"],
    }),
  }),
});

export const {
  useGetAllSportCategoriesQuery,
  useGetSingleSportCategoryQuery,
  useCreateSportCategoryMutation,
  useUpdateSportCategoryMutation,
  useDeleteSportCategoryMutation,
} = sportCategoryApi;
