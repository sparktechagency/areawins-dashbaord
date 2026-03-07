import BetTypes from "@/pages/Main/BetTypes/BetTypes";
import TournamentManagement from "@/pages/Main/Tournaments/TournamentManagement";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import AuthLayout from "../pages/Auth/AuthLayout";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import Login from "../pages/Auth/Login";
import OTPVerification from "../pages/Auth/OTPVerification";
import ResetPassword from "../pages/Auth/ResetPassword";
import BetManagement from "../pages/Main/BetManagement/BetManagement";
import Dashboard from "../pages/Main/Dashboard";
import EditProfile from "../pages/Main/EditProfile";
import Financials from "../pages/Main/Financials/Financials";
import MatchManagement from "../pages/Main/MatchManagement/MatchManagement";
import Notifications from "../pages/Main/Notifications";
import Profile from "../pages/Main/Profile";
import Promotions from "../pages/Main/Promotions";
import Settings from "../pages/Main/Settings";
import SportCategories from "../pages/Main/SportCategories/SportCategories";
import TeamManagement from "../pages/Main/TeamManagement/TeamManagement";
import UserManagement from "../pages/Main/UserManagement/UserManagement";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },

      {
        path: "users",
        element: <UserManagement />,
      },
      {
        path: "matches",
        element: <MatchManagement />,
      },
      {
        path: "categories",
        element: <SportCategories />,
      },
      {
        path: "bet-types",
        element: <BetTypes />,
      },
      {
        path: "teams",
        element: <TeamManagement />,
      },
      {
        path: "tournaments",
        element: <TournamentManagement />,
      },
      {
        path: "bets",
        element: <BetManagement />,
      },
      {
        path: "financials",
        element: <Financials />,
      },
      {
        path: "promotions",
        element: <Promotions />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "profile/edit",
        element: <EditProfile />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <h1>Auth Error</h1>,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "otp",
        element: <OTPVerification />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
]);

export default router;
