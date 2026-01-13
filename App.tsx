
import React from 'react';
import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom';
import Layout from './src/components/Layout';
import APIConfiguration from './src/pages/APIConfiguration';
import AuditLogs from './src/pages/AuditLogs';
import AuthFlow from './src/pages/AuthFlow';
import BetManagement from './src/pages/BetManagement';
import Categories from './src/pages/Categories';
import Dashboard from './src/pages/Dashboard';
import Financials from './src/pages/Financials';
import MatchManagement from './src/pages/MatchManagement';
import Notifications from './src/pages/Notifications';
import Profile from './src/pages/Profile';
import Promotions from './src/pages/Promotions';
import Settings from './src/pages/Settings';
import TeamManagement from './src/pages/TeamManagement';
import TournamentManagement from './src/pages/TournamentManagement';
import UserManagement from './src/pages/UserManagement';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Auth routes without Layout */}
        <Route path="/auth" element={<AuthFlow />} />
        
        {/* Main Admin Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="matches" element={<MatchManagement />} />
          <Route path="categories" element={<Categories />} />
          <Route path="teams" element={<TeamManagement />} />
          <Route path="tournaments" element={<TournamentManagement />} />
          <Route path="bets" element={<BetManagement />} />
          <Route path="financials" element={<Financials />} />
          <Route path="promotions" element={<Promotions />} />
          <Route path="audit" element={<AuditLogs />} />
          <Route path="settings" element={<Settings />} />
          <Route path="api-config" element={<APIConfiguration />} />
          <Route path="profile" element={<Profile />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
};

export default App;
