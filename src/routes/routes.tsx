import AuditLogs from "@/pages/Main/AuditLogs/AuditLogs";
import BetManagement from "@/pages/Main/BetManagement/BetManagement";
import AddBetType from "@/pages/Main/BetTypes/AddBetType";
import BetTypes from "@/pages/Main/BetTypes/BetTypes";
import EditBetType from "@/pages/Main/BetTypes/EditBetType";
import Dashboard from "@/pages/Main/Dashboard/Dashboard";
import EditProfile from "@/pages/Main/EditProfile/EditProfile";
import Financials from "@/pages/Main/Financials/Financials";
import AddMatch from "@/pages/Main/MatchManagement/AddMatch";
import EditMatch from "@/pages/Main/MatchManagement/EditMatch";
import MatchManagement from "@/pages/Main/MatchManagement/MatchManagement";
import Notifications from "@/pages/Main/Notifications/Notifications";
import Profile from "@/pages/Main/Profile/Profile";
import Promotions from "@/pages/Main/Promotions/Promotions";
import Settings from "@/pages/Main/Settings/Settings";
import AddSportCategory from "@/pages/Main/SportCategories/AddSportCategory";
import EditSportCategory from "@/pages/Main/SportCategories/EditSportCategory";
import SportCategories from "@/pages/Main/SportCategories/SportCategories";
import AddTeam from "@/pages/Main/TeamManagement/AddTeam";
import EditTeam from "@/pages/Main/TeamManagement/EditTeam";
import TeamManagement from "@/pages/Main/TeamManagement/TeamManagement";
import AddTournament from "@/pages/Main/Tournaments/AddTournament";
import EditTournament from "@/pages/Main/Tournaments/EditTournament";
import TournamentList from "@/pages/Main/Tournaments/TournamentList";
import UserManagement from "@/pages/Main/UserManagement/UserManagement";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import AuthLayout from "../pages/Auth/AuthLayout";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import Login from "../pages/Auth/Login";
import OTPVerification from "../pages/Auth/OTPVerification";
import ResetPassword from "../pages/Auth/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
        path: "match-management",
        element: <MatchManagement />,
      },
      {
        path: "match-management/add",
        element: <AddMatch />,
      },
      {
        path: "match-management/edit/:id",
        element: <EditMatch />,
      },
      {
        path: "categories",
        element: <SportCategories />,
      },
      {
        path: "categories/add",
        element: <AddSportCategory />,
      },
      {
        path: "categories/edit/:id",
        element: <EditSportCategory />,
      },
      {
        path: "categories/:sportId/tournaments",
        element: <TournamentList />,
      },
      {
        path: "categories/:sportId/tournaments/add",
        element: <AddTournament />,
      },
      {
        path: "categories/:sportId/tournaments/edit/:id",
        element: <EditTournament />,
      },
      {
        path: "categories/:sportId/tournaments/:tournamentId/teams",
        element: <TeamManagement />,
      },
      {
        path: "categories/:sportId/tournaments/:tournamentId/teams/add",
        element: <AddTeam />,
      },
      {
        path: "categories/:sportId/tournaments/:tournamentId/teams/edit/:id",
        element: <EditTeam />,
      },
      {
        path: "bet-types",
        element: <BetTypes />,
      },
      {
        path: "categories/:sportId/bet-types",
        element: <BetTypes />,
      },
      {
        path: "bet-types/add",
        element: <AddBetType />,
      },
      {
        path: "bet-types/edit/:id",
        element: <EditBetType />,
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
      {
        path: "audit-logs",
        element: <AuditLogs />,
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
