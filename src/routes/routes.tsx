import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import AuthFlow from "../pages/AuthFlow";
import BetManagement from "../pages/Main/BetManagement";
import BetTypes from "../pages/Main/BetTypes";
import Categories from "../pages/Main/Categories";
import Dashboard from "../pages/Main/Dashboard";
import Financials from "../pages/Main/Financials";
import MatchManagement from "../pages/Main/MatchManagement";
import Notifications from "../pages/Main/Notifications";
import Profile from "../pages/Main/Profile";
import Promotions from "../pages/Main/Promotions";
import Settings from "../pages/Main/Settings";
import TeamManagement from "../pages/Main/TeamManagement";
import TournamentManagement from "../pages/Main/TournamentManagement";
import UserManagement from "../pages/Main/UserManagement";
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
        element: <Categories />,
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
    ],
  },
  {
    path: "/auth",
    errorElement: <h1>Auth Error</h1>,
    children: [
      {
        index: true,
        element: <AuthFlow />,
      },
    ],
  },
]);

export default router;
