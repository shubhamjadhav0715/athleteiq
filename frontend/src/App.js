import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';

import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/Admin/Dashboard';
import CoachDashboard from './pages/Coach/Dashboard';
import AthleteDashboard from './pages/Athlete/Dashboard';

import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route
              path="/admin/*"
              element={
                <PrivateRoute role="admin">
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            
            <Route
              path="/coach/*"
              element={
                <PrivateRoute role="coach">
                  <CoachDashboard />
                </PrivateRoute>
              }
            />
            
            <Route
              path="/athlete/*"
              element={
                <PrivateRoute role="athlete">
                  <AthleteDashboard />
                </PrivateRoute>
              }
            />
            
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
