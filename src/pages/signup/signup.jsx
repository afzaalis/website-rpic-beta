import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../signup/signup.css';

export const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match.');
    } else if (password.length < 8) {
      setError('Password must be at least 8 characters.');
    } else {
      setError('');

      try {
        // Handle signup logic here
        console.log('Signup successful:', username, email);
        navigate('/login');
      } catch (error) {
        console.error('Error during signup:', error);
        setError('Signup failed. Please try again.');
      }
    }
  };

  return (
    <div className="signup-outsideContainer">
      <div className="signup-container">
        <h1 style={{ fontSize: '24px' }}>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ backgroundColor: '#F7FBFF' }}
          />
          <input
            type="email"
            placeholder="Example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ backgroundColor: '#F7FBFF' }}
          />
          <input
            type="password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ backgroundColor: '#F7FBFF' }}
          />
          {error && <p style={{ color: 'red', fontSize: '10px' }}>{error}</p>}
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ backgroundColor: '#F7FBFF' }}
          />
          <button className="btn-submit" type="submit">
            Sign up
          </button>
        </form>
        <div className="line-or">
          <span>Or</span>
        </div>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
      <div className="signup-gambar">
        <img src="img/mod2.jpg" alt="signup image" />
      </div>
    </div>
  );
};
