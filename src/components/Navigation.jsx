import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navigation.css';

function Navigation () {
//const Navigation = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here
    navigate('/');
  };

  return (
    <nav className="navigation">
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li><Link to="/add">Add</Link></li>
        <li><a href="/" onClick={handleLogout}>Logout</a></li>
        {/* <li><button onClick={handleLogout}>Logout</button></li> */}
      </ul>
    </nav>
  );
};

export default Navigation;
