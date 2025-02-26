// Import dependencies
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation and useNavigate for programmatic navigation
import '../styles/Navigation.css'; 

function Navigation({ user, isLoggedIn }) { // Destructure props: user object and isLoggedIn boolean
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove the user data from localStorage, effectively logging the user out
    navigate('/'); // Navigate to the home page after logout
  };

  return (
    <nav className="navigation"> 
      <ul> 
        {isLoggedIn ? ( // Conditional rendering based on isLoggedIn state
          <> 
            <li><Link to="/dashboard">Dashboard</Link></li> 
            <li><Link to="/search">Search</Link></li> 
            <li><Link to="/add">Add</Link></li> {/* Link to the add page */}
            <li><a href="/" onClick={handleLogout}>Logout</a></li> {/* Logout link, calls handleLogout on click */}
            {user && ( // Conditional rendering of user display if user object exists
              <li className="user-display"> {/* List item with class for user display styling */}
                <span>{`${user.firstname} ${user.lastname}`}</span> {/* Display the user's first and last name */}
              </li>
            )}
          </>
        ) : (
          <> 
            <li><Link to="/login">Login</Link></li> {/* Link to the login page */}
            <li><Link to="/register">Register</Link></li> {/* Link to the register page */}
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigation; 