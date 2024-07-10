import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Challenges from './pages/Challenges';
import NomadHub from './pages/NomadHub';
import HelpPage from './pages/HelpPage';
import SettingsPage from './pages/SettingsPage';
import ChallengeDetail from './pages/ChallengeDetail';
import Explore from './pages/Explore';
import Notes from './pages/Notes'; // Add this import
import Note from './pages/Note';
import LocationSettings from './pages/LocationSettings';
import Rewards from './pages/Rewards';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Navigate replace to="/dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="challenges" element={<Challenges />} />
              <Route path="explore" element={<Explore />} />
              <Route path="nomad-hub" element={<NomadHub />} />
              <Route path="help" element={<HelpPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="notes" element={<Notes />} /> {/* Add this route */}
              <Route path="notes/:id" element={<Note />} />
              <Route path="challenges/:id" element={<ChallengeDetail />} />
              <Route path="location-settings" element={<LocationSettings />} />
              <Route path="rewards" element={<Rewards />} />
            </Route>
          </Routes>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;