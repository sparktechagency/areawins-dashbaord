import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DashboardState {
  isSidebarOpen: boolean;

  user: { name: string; role: string } | null;

  notifications: number;
}

const initialState: DashboardState = {
  isSidebarOpen: true,

  user: { name: "Alex Morgan", role: "Super Admin" },

  notifications: 42,
};

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState,

  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },

    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
});

export const { toggleSidebar, setUser } = dashboardSlice.actions;

export default dashboardSlice.reducer;
