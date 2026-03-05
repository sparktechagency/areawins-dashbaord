import { getDecryptedToken } from "@/utils/token.utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = import.meta.env.VITE_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    const token = getDecryptedToken("accessToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});
// Enhanced base query with token refresh logic
const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  
  // Only redirect to auth if the error is 401 and it's NOT a login request
  if (result?.error?.status === 401 && args?.url !== "/auth/login") {
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
    "Profile",
    "SportCategory",
    "Match",
    "Tournament",
    "Team",
    "BetType",
    "Wallet",
    "SupportTicket",
    "Bet",
    "AuditLog",
  ],
  endpoints: () => ({}),
});
