// import dependencies
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  // State to manage username input
  const [username, setUsername] = useState('');
  // State to manage password input
  const [password, setPassword] = useState('');
  // State to manage error messages during login
  const [errorMessage, setErrorMessage] = useState('');
  // Hook to navigate to different routes
  const navigate = useNavigate();

  // Function to handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log('Login attempt with:', { username, password }); // Log login attempt details
    setErrorMessage(''); // Clear any previous error messages
    try {
      // Send a POST request to the login API endpoint
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Send username and password in JSON format
      });
      console.log('Response status:', response.status); // Log the response status

      // Parse the JSON response
      const data = await response.json();
      console.log('Response data:', data); // Log the response data

      // Check if the login was successful (response status 200-299)
      if (response.ok) {
        console.log('Login successful, storing user data');
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify({
          u_id: data.u_id,
          firstname: data.firstname,
          lastname: data.lastname,
        }));
        console.log('Triggering storage event');
        // Trigger a storage event to update login status in other tabs/windows
        window.dispatchEvent(new Event('storage'));
        console.log('Navigating to dashboard');
        navigate('/dashboard'); // Navigate to the dashboard page
      } else {
        console.error('Login failed:', data.message);
        // Set error message for invalid credentials
        setErrorMessage('Login failed. Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Set error message for network or other errors during login
      setErrorMessage('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="login-container"> 
      <h2>Login</h2> {/* Heading for the login form */}
      <form onSubmit={handleLogin}> {/* Form element that calls handleLogin function on submission */}
        <input
          className="input-field" 
          type="text" 
          value={username} // Sets the input value from the 'username' state
          onChange={(e) => setUsername(e.target.value)} // Updates 'username' state on input change
          placeholder="Username" 
        />
        <input
          className="input-field" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} // Updates 'password' state on input change
          placeholder="Password" 
        />
        <button type="submit">Login</button> 
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Conditionally renders error message if 'errorMessage' state is not empty */}
      </form>
    </div>
  );
}

export default Login;