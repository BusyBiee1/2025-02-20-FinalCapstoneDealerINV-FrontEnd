// import dependencies
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

function Register() {
  // State to manage username input
  const [username, setUsername] = useState('');
  // State to manage password input
  const [password, setPassword] = useState('');
  // State to manage first name input
  const [firstname, setFirstname] = useState('');
  // State to manage last name input
  const [lastname, setLastname] = useState('');
  // State to manage messages (success or error)
  const [message, setMessage] = useState('');
  // Hook to navigate to different routes
  const navigate = useNavigate();

  // Function to validate username format
  const validateUsername = (username) => {
    // Regex to allow only letters and numbers
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    // Test the username against the regex
    return usernameRegex.test(username);
  };

  // Function to validate password format
  const validatePassword = (password) => {
    // Regex to ensure at least 6 characters, with letters and numbers
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    // Test the password against the regex
    return passwordRegex.test(password);
  };

  // Function to handle registration form submission
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setMessage(''); // Clear any previous messages

    // Validate username format
    if (!validateUsername(username)) {
      setMessage('Username can only contain letters and numbers.');
      return;
    }

    // Validate password format
    if (!validatePassword(password)) {
      setMessage('Password must be at least 6 characters long and contain both letters and numbers.');
      return;
    }

    try {
      // Send a POST request to the registration API endpoint
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, firstname, lastname }), // Send registration data in JSON format
      });
      // Parse the JSON response
      const data = await response.json();
      // Check if the registration was successful (response status 200-299)
      if (response.ok) {
        setMessage('Registration successful');
        // Navigate to login page after 2 seconds
        setTimeout(() => navigate('/login'), 2000);
      } else {
        // Set error message from the API response or a default message
        setMessage(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      // Set error message for network or other errors during registration
      setMessage('An error occurred during registration');
    }
  };

  return (
    <div className="register-container"> 
      <h2>Register</h2> {/* Heading for the registration form */}
      <form onSubmit={handleRegister}> {/* Form element that calls handleRegister function on submission */}
        <input
          className="input-field" 
          type="text" 
          value={username} 
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
        <input
          className="input-field" 
          type="text" 
          value={firstname} 
          onChange={(e) => setFirstname(e.target.value)} // Updates 'firstname' state on input change
          placeholder="First Name" 
        />
        <input
          className="input-field" 
          type="text" 
          value={lastname} 
          onChange={(e) => setLastname(e.target.value)} // Updates 'lastname' state on input change
          placeholder="Last Name" 
        />
        <button type="submit">Register</button> 
        {/* Conditionally render a message (success or error) */}
        {message && (
          <p
            className={message.includes('successful') ? 'success-message' : 'error-message'} 
          >
            {message} {/* Display the message from the 'message' state */}
          </p>
        )}
      </form>
    </div>
  );
}

export default Register;


