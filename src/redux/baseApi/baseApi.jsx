import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = import.meta.env.VITE_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});
// Enhanced base query with token refresh logic
const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    window.location.href = "/auth";
  }

  return result;
};
export const baseApi = createApi({
  reducerPath: "talenzyApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: [
    "User",
    "Dashboard",
    "Transaction",
    "Withdrawal",
    "Report",
    "Verification",
    "Gift",
    "Settings",
    "Notification",
  ],
  endpoints: () => ({}),
});
