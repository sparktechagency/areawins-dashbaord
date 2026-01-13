
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import App from './App';


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
  name: 'dashboard',
  initialState,
  reducers: {
    toggleSidebar: (state) => { state.isSidebarOpen = !state.isSidebarOpen; },
    setUser: (state, action: PayloadAction<any>) => { state.user = action.payload; },
  },
});

export const { toggleSidebar, setUser } = dashboardSlice.actions;

const store = configureStore({
  reducer: {
    dashboard: dashboardSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("Root element not found");

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
