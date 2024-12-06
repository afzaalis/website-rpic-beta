import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa'; 
import './homereservasi.css'; 

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Menghapus token dari localStorage
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="navbar-link logout-btn">
      <FaSignOutAlt style={{ marginRight: '8px' }} /> Logout
    </button>
  );
};

const HomeReservasi = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <img src="../../favicon.ico" alt="Logo" className="navbar-logo" />
          <ul className="navbar-menu">
            <li className="navbar-item">
              <Link to="/profile" className="navbar-link">Profile</Link>
            </li>
            <li className="navbar-item">
              <Link to="/homereservasi" className="navbar-link">Home</Link>
            </li>
            <li className="navbar-item">
              <Link to="/history" className="navbar-link">History</Link>
            </li>
            <li className="navbar-item">
              <LogoutButton /> 
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="home-content">
        <h1>Select Your PC Type</h1>
        <div className="container">
          <div className="carousel">
            {/* Alpha PC Card */}
            <div className="card">
              <h3 className="title">Alpha PC</h3>
              <div className="bar">
                <div className="emptybar"></div>
                <div className="filledbar"></div>
              </div>
              <Link to="/alphapage">
                <img src="/img/imgDashboard/alpha.png" alt="Alpha PC" className="pc-image" />
              </Link>
              <p>High-performance PC for ultimate gaming experience.</p>
            </div>

            {/* Beta PC Card */}
            <div className="card">
              <h3 className="title">Beta PC</h3>
              <div className="bar">
                <div className="emptybar"></div>
                <div className="filledbar"></div>
              </div>
              <Link to="/betapage">
                <img src="/img/imgDashboard/beta.png" alt="Beta PC" className="pc-image" />
              </Link>
              <p>Balanced performance for all-around use.</p>
            </div>

            {/* Driving Simulator Card */}
            <div className="card">
              <h3 className="title">Driving Simulator</h3>
              <div className="bar">
                <div className="emptybar"></div>
                <div className="filledbar"></div>
              </div>
              <Link to="/drivingsimulator">
                <img src="/img/imgDashboard/drivesimulator.png" alt="Driving Simulator" className="pc-image" />
              </Link>
              <p>Realistic driving experience with state-of-the-art simulator.</p>
            </div>
          </div>
        </div>

        <h2>PRICE LIST</h2>
        <div className="price-list-images">
          <img src="../../img/pricelistAlphaBeta.png" alt="Price List Image 1" className="price-image" />
          <img src="../../img/pricelistDrivingSimulator.png" alt="Price List Image 2" className="price-image" />
        </div>
      </div>
    </div>
  );
};

export default HomeReservasi;
