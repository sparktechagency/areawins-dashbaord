import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard";
import UserManagement from "../pages/UserManagement";
import MatchManagement from "../pages/MatchManagement";
import Categories from "../pages/Categories";
import TournamentManagement from "../pages/TournamentManagement";
import TeamManagement from "../pages/TeamManagement";
import BetManagement from "../pages/BetManagement";
import Profile from "../pages/Profile";
import Notifications from "../pages/Notifications";
import Settings from "../pages/Settings";
import Promotions from "../pages/Promotions";
import Financials from "../pages/Financials";
import AuthFlow from "../pages/AuthFlow";
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
