// src/App.jsx
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { api } from './utils/api';
import SettingsPage from './pages/SettingsPage';

// Auth Pages
import AuthPage from './pages/AuthPage';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import ForgotPasswordForm from './components/auth/ForgotPasswordForm';

// Protected Pages
import DashboardPage from './pages/DashboardPage';
import AddExpensePage from './pages/AddExpensePage';
import ExpenseListPage from './pages/ExpenseListPage';
import CategoryPage from './pages/CategoryPage';

function RequireAuth({ children }) {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = api.getCurrentUser();
    setIsAuthenticated(!!user);
    setIsChecking(false);
  }, []);

  if (isChecking) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          fontSize: '1.25rem',
          color: '#6b7280'
        }}>
          Loading...
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<AuthPage />}>
        <Route index element={<LoginForm />} />
      </Route>
      <Route path="/signup" element={<AuthPage />}>
        <Route index element={<SignupForm />} />
      </Route>
      <Route path="/forgot" element={<AuthPage />}>
        <Route index element={<ForgotPasswordForm />} />
      </Route>

      {/* Protected Routes */}
      <Route path="/" element={<RequireAuth><DashboardPage /></RequireAuth>} />
      <Route path="/dashboard" element={<RequireAuth><DashboardPage /></RequireAuth>} />
      <Route path="/add" element={<RequireAuth><AddExpensePage /></RequireAuth>} />
      <Route path="/expenses" element={<RequireAuth><ExpenseListPage /></RequireAuth>} />
      <Route path="/categories" element={<RequireAuth><CategoryPage /></RequireAuth>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
      // In your Routes:
<Route path="/settings" element={<RequireAuth><SettingsPage /></RequireAuth>} />
    </Routes>
    
  );
}