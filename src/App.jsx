import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import SearchPage from './pages/SearchPage';
import AddPage from './pages/AddPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Banner from './components/Banner';
import Navigation from './components/Navigation';
import './styles/App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      console.log('Checking login status');
      const loggedIn = localStorage.getItem('user') !== null;
      console.log('Is logged in:', loggedIn);
      setIsLoggedIn(loggedIn);
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <Banner />
        <Navigation isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginPage />} />
          <Route path="/register" element={isLoggedIn ? <Navigate to="/dashboard" /> : <RegisterPage />} />
          <Route path="/dashboard" element={isLoggedIn ? <DashboardPage /> : <Navigate to="/login" />} />
          <Route path="/search" element={isLoggedIn ? <SearchPage /> : <Navigate to="/login" />} />
          <Route path="/add" element={isLoggedIn ? <AddPage /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
