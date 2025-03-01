// Import necessary dependencies
import React, { useState } from 'react'; // React and useState hook for managing component state
import { useNavigate } from 'react-router-dom'; // Hook for programmatic navigation
import axios from 'axios'; // HTTP client for making API requests
import '../styles/Register.css'; // Import CSS styles for the Register component

// Define the Register component
function Register() {
  // State variables to manage form inputs and component state
  const [username, setUsername] = useState(''); // State for username input
  const [password, setPassword] = useState(''); // State for password input
  const [firstname, setFirstname] = useState(''); // State for first name input
  const [lastname, setLastname] = useState(''); // State for last name input
  const [message, setMessage] = useState(''); // State for displaying messages to the user
  const navigate = useNavigate(); // Hook to programmatically navigate to different routes

  // Function to validate username format
  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9]+$/; // Regular expression to allow only letters and numbers
    return usernameRegex.test(username); // Test if the username matches the regex pattern
  };

  // Function to validate password format
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; // Regex for at least 6 characters, with letters and numbers
    return passwordRegex.test(password); // Test if the password matches the regex pattern
  };

  // Function to handle the registration form submission
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setMessage(''); // Clear any previous messages

    // Validate username
    if (!validateUsername(username)) {
      setMessage('Username can only contain letters and numbers.');
      return; // Exit the function if validation fails
    }

    // Validate password
    if (!validatePassword(password)) {
      setMessage('Password must be at least 6 characters long and contain both letters and numbers.');
      return; // Exit the function if validation fails
    }

    try {
      // Send a POST request to the registration API endpoint using Axios
      //const apiStr = `${import.meta.env.VITE_API_URL}/api/users/register${id}`;
      //console.log('apiStr:', `${import.meta.env.VITE_API_URL}/api/users/register${id}`);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`, {
        username,
        password,
        firstname,
        lastname
      });

      // If the request is successful, set a success message
      setMessage('Registration successful');
      // Navigate to the login page after 2 seconds
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      // Log any errors to the console
      console.error('Registration error:', error);
      // Set an error message, either from the API response or a default message
      setMessage(error.response?.data?.message || 'An error occurred during registration');
    }
  };

  // Render the component's UI
  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}> {/* Form with onSubmit event handler */}
        <input
          className="input-field"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Update username state on input change
          placeholder="Username"
        />
        <input
          className="input-field"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state on input change
          placeholder="Password"
        />
        <input
          className="input-field"
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)} // Update firstname state on input change
          placeholder="First Name"
        />
        <input
          className="input-field"
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)} // Update lastname state on input change
          placeholder="Last Name"
        />
        <button type="submit">Register</button>
        {message && ( // Conditionally render message if it exists
          <p
            className={message.includes('successful') ? 'success-message' : 'error-message'}
          >
            {message} {/* Display the message */}
          </p>
        )}
      </form>
    </div>
  );
}

export default Register; // Export the Register component for use in other parts of the application




/*
// import dependencies
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

//   return (
//     <div className="register-container"> 
//       <h2>Register</h2> 
//       <form onSubmit={handleRegister}> {
//         <input
//           className="input-field" 
//           type="text" 
//           value={username} 
//           onChange={(e) => setUsername(e.target.value)} // Updates 'username' state on input change
//           placeholder="Username" 
//         />
//         <input
//           className="input-field" 
//           type="password" 
//           value={password} 
//           onChange={(e) => setPassword(e.target.value)} // Updates 'password' state on input change
//           placeholder="Password" 
//         />
//         <input
//           className="input-field" 
//           type="text" 
//           value={firstname} 
//           onChange={(e) => setFirstname(e.target.value)} // Updates 'firstname' state on input change
//           placeholder="First Name" 
//         />
//         <input
//           className="input-field" 
//           type="text" 
//           value={lastname} 
//           onChange={(e) => setLastname(e.target.value)} // Updates 'lastname' state on input change
//           placeholder="Last Name" 
//         />
//         <button type="submit">Register</button> 

//         {message && (
//           <p
//             className={message.includes('successful') ? 'success-message' : 'error-message'} 
//           >
//             {message} 
//           </p>
//         )}
//       </form>
//     </div>
//   );
// }

// export default Register;
// */


