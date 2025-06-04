import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../layout/Layout';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import HomePage from '../pages/HomePage/HomePage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import StatsPage from '../pages/StatsPage/StatsPage';
import AddMatchPage from '../pages/AddMatchPage/AddMatchPage';
import NotificationsPage from '../pages/NotificationsPage/NotificationsPage';
import VerifyEmailPage from '../pages/VerifyEmailPage/VerifyEmailPage';
import UserProfilePage from '../pages/UserProfilePage/UserProfilePage';
import GameDetailPage from '../pages/GameDetailPage/GameDetailPage';
import MatchDetailPage from '../pages/MatchDetailPage/MatchDetailPage';
import SearchPage from '../pages/SearchPage/SearchPage';

export const AppRouter = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={!user ? <LoginPage /> : <Navigate to="/" replace />}
      />
      <Route
        path="/register"
        element={!user ? <RegisterPage /> : <Navigate to="/" replace />}
      />
      <Route path="/verify-email/:token" element={<VerifyEmailPage />} />

      {/* Protected routes */}
      <Route element={<Layout />}>
        {user ? (
          <>
            <Route index element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="stats" element={<StatsPage />} />
            <Route path="add-match" element={<AddMatchPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="user/:userId" element={<UserProfilePage />} />
            <Route path="game/:gameId" element={<GameDetailPage />} />
            <Route path="match/:matchId" element={<MatchDetailPage />} />
            <Route path="/matches/:matchId/edit" element={<AddMatchPage editMode={true} />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Route>
    </Routes>
  );
};