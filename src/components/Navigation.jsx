import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navigation.css';

function Navigation() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('user') !== null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="navigation">
      <ul>
        {isLoggedIn ? (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/add">Add</Link></li>
            <li><a href="/" onClick={handleLogout}>Logout</a></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;