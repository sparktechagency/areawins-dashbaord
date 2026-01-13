
import React from 'react';
import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom';
import Layout from './src/components/Layout';
import APIConfiguration from './src/pages/APIConfiguration';
import AuthFlow from './src/pages/AuthFlow';
import BetManagement from './src/pages/BetManagement';
import AuditLogs from './src/pages/Main/AuditLogs';
import Categories from './src/pages/Main/Categories';
import Dashboard from './src/pages/Main/Dashboard';
import Financials from './src/pages/Main/Financials';
import Notifications from './src/pages/Main/Notifications';
import Profile from './src/pages/Main/Profile';
import Settings from './src/pages/Main/Settings';
import MatchManagement from './src/pages/MatchManagement';
import Promotions from './src/pages/Promotions';
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
