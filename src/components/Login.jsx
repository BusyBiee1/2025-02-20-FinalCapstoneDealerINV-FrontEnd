import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const navigate = useNavigate();

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Handles the login process by preventing the default form submission.
 * Checks if the entered username and password match the default credentials.
 * Navigates to the dashboard if credentials are correct; otherwise, alerts the user.
 * 
 * @param {Event} e - The event object from the form submission.
 */

/******  bf6b6645-6f84-43e5-be2c-3ba7cd5e972e  *******/
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
