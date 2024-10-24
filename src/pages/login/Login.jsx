import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../login/login.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoaded, setIsLoaded] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true); // Set when component is loaded to trigger fade-in
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields.');
    } else if (password.length < 8) {
      setError('Password must be at least 8 characters.');
    } else {
      setError('');
      try {
        console.log('Login successful:');
        navigate('/myprofile');
      } catch (error) {
        console.error('Error during login:', error);
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="login-outsideContainer">
      <div className={`login-container ${isLoaded ? 'fade-in' : ''}`}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ backgroundColor: '#F7FBFF' }}
            />
          </div>
          <div className="form-group">
            {error && <p style={{ color: 'red', fontSize: '10px' }}>{error}</p>}
            <input
              type="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ backgroundColor: '#F7FBFF' }}
            />
          </div>
          <p className="forgot-password" style={{ textAlign: 'right' }}>
            <Link to="/">Forgot Password?</Link>
          </p>
          <button className="btn-submit" type="submit">
            Sign in
          </button>
        </form>
        <div className="line-or">
          <span style={{color:'white'}}>Or</span>
        </div>
        <p>Don't you have an account? <Link to="/signup">SignUp</Link></p>
      </div>
      <div className={`login-gambar ${isLoaded ? 'fade-in' : ''}`}>
        <img src="img/loginimg.jpg" alt="login image" />
      </div>
    </div>
  );
};
