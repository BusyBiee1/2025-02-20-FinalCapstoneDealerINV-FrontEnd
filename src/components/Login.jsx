// Import necessary dependencies
import React, { useState } from 'react'; // React and useState hook for managing component state
import { useNavigate } from 'react-router-dom'; // Hook for programmatic navigation
import axios from 'axios'; // HTTP client for making API requests
import '../styles/Login.css'; // Import CSS styles for the Login component

// Define the Login component
function Login() {
  // State variables to manage form inputs and component state
  const [username, setUsername] = useState(''); // State for username input
  const [password, setPassword] = useState(''); // State for password input
  const [errorMessage, setErrorMessage] = useState(''); // State for displaying error messages
  const navigate = useNavigate(); // Hook to programmatically navigate to different routes

  // Function to handle the login form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log('Login attempt with:', { username, password }); // Log login attempt details for debugging
    setErrorMessage(''); // Clear any previous error messages

    try {
      // Send a POST request to the login API endpoint using Axios
      //const apiStr = `${import.meta.env.VITE_API_URL}/api/users/login${id}`;
      //console.log('apiStr:', `${import.meta.env.VITE_API_URL}/api/users/login${id}`); // Log the API endpoint URL for debugging
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, {
        username,
        password
      });

      console.log('Response status:', response.status); // Log the response status for debugging
      console.log('Response data:', response.data); // Log the response data for debugging

      // If the login was successful (Axios automatically throws for non-2xx status codes)
      console.log('Login successful, storing user data');
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify({
        u_id: response.data.u_id,
        firstname: response.data.firstname,
        lastname: response.data.lastname,
      }));

      console.log('Triggering storage event');
      // Trigger a storage event to update login status in other tabs/windows
      window.dispatchEvent(new Event('storage'));

      console.log('Navigating to dashboard');
      navigate('/dashboard'); // Navigate to the dashboard page
    } catch (error) {
      console.error('Login error:', error); // Log any errors to the console for debugging
      // Set error message based on the error response or a default message
      setErrorMessage(error.response?.data?.message || 'An error occurred during login. Please try again.');
    }
  };

  // Render the component's UI
  return (
    <div className="login-container"> {/* Container for the login form */}
      <h2>Login</h2> {/* Heading for the login form */}
      <form onSubmit={handleLogin}> {/* Form with onSubmit event handler */}
        <input
          className="input-field" // CSS class for styling
          type="text" // Input type for username
          value={username} // Controlled input value from state
          onChange={(e) => setUsername(e.target.value)} // Update username state on input change
          placeholder="Username" // Placeholder text for the input
        />
        <input
          className="input-field" // CSS class for styling
          type="password" // Input type for password (masked input)
          value={password} // Controlled input value from state
          onChange={(e) => setPassword(e.target.value)} // Update password state on input change
          placeholder="Password" // Placeholder text for the input
        />
        <button type="submit">Login</button> {/* Submit button for the form */}
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Conditionally render error message if it exists */}
      </form>
    </div>
  );
}

export default Login; // Export the Login component for use in other parts of the application


/*
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
      <h2>Login</h2> {
      <form onSubmit={handleLogin}> 
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
        {errorMessage && <p className="error-message">{errorMessage}</p>} 
      </form>
    </div>
  );
}

export default Login;
*/

/*************************Deescription of the login component**************************************************************** */
/*
In the provided Login component, the API call is directly tied to the form submission event, 
so it does not require the use of useEffect. The component's state is updated based on 
the API response, and no cleanup is needed. If the component had additional side effects, 
such as setting up a timer or subscribing to events, then useEffect would be the appropriate 
hook to use to manage those effects.
.
The Login component in the provided code does not use the useEffect hook, even though it 
makes an API call. This is because the API call is made within the handleLogin function, 
which is triggered by the form submission event, rather than being part of a side effect 
that needs to be managed by useEffect.
Here's an explanation of why useEffect is not used in this component:
API Call in Event Handler: The API call is made within the handleLogin function, which is 
called when the login form is submitted. This is a direct user interaction, not a side 
effect that needs to be managed by useEffect.
No Dependency Changes: The handleLogin function does not rely on any state variables or 
props that would require it to be re-executed when they change. The function simply makes 
an API call based on the current username and password state values.
No Cleanup Needed: The handleLogin function does not set up any subscriptions, timers, 
or other resources that need to be cleaned up. It simply makes an API call and updates 
the component's state based on the response.
In contrast, the useEffect hook is typically used for the following purposes:
Fetching Data: Fetching data from an API or other external source when the component 
mounts or when certain dependencies change.
Setting up Subscriptions: Subscribing to events or setting up other side effects that 
need to be cleaned up when the component unmounts or when certain dependencies change.
Performing Cleanup: Cleaning up resources, such as timers or event listeners, when the 
component unmounts or when certain dependencies change.
In the provided Login component, the API call is directly tied to the form submission event, 
so it does not require the use of useEffect. The component's state is updated based on the 
API response, and no cleanup is needed.
If the component had additional side effects, such as setting up a timer or subscribing to events, then useEffect would be the appropriate hook to use to manage those effects.
*/

