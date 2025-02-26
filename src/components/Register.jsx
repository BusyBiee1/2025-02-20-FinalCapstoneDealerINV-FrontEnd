import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    return usernameRegex.test(username);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear any previous messages

    if (!validateUsername(username)) {
      setMessage('Username can only contain letters and numbers.');
      return;
    }

    if (!validatePassword(password)) {
      setMessage('Password must be at least 6 characters long and contain both letters and numbers.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, firstname, lastname }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Registration successful');
        setTimeout(() => navigate('/login'), 2000); // Navigate to login after 2 seconds
      } else {
        setMessage(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage('An error occurred during registration');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input className="input-field" 
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input className="input-field" 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input className="input-field" 
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          placeholder="First Name"
        />
        <input className="input-field" 
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          placeholder="Last Name"
        />
        <button type="submit">Register</button>
        {/* {message && <p className="message">{message}</p>} */}
        {message && <p className={message.includes('successful') ? 'success-message' : 'error-message'}>{message}</p>}        
      </form>
    </div>
  );
}

export default Register;