import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../dashboard/dashboard.css';

export const Dashboard = () => {
  const navigate = useNavigate(); 

  const goSignUp = () => {
    navigate("/signup"); 
  }

  const goLogin = () => {
    navigate("/login"); 
  }

  useEffect(() => {
    // Menambahkan kelas fade-in ke elemen saat halaman dimuat
    const elements = document.querySelectorAll('.pengantar, .intro');
    elements.forEach((element) => {
      setTimeout(() => {
        element.classList.add('fade-in');
      }, 200); // Delay untuk animasi
    });
  }, []);

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="navbar-container">
          <img src='./favicon.ico' alt="Logo" className="navbar-logo" 
          style={{ width: '50px', height: '50px' }}
          />
          <ul className="navbar-menu">
            <li className="navbar-item"><a href="/aboutus" className="navbar-link">About</a></li>
            <li className="navbar-item"><a href="/news" className="navbar-link">News</a></li>
            <li className="navbar-item"><a href="/help" className="navbar-link">Help</a></li>
            <li className="navbar-item"><a href="/help" className="navbar-link">Contact</a></li>
          </ul>
          <div className="button-group">
            <button className="signup-button" onClick={goSignUp}>Sign Up</button> 
            <button className="login-button" onClick={goLogin}>Login</button> 
          </div>
        </div>
      </nav>

      <div className="pengantar">
        <h1>What's RPIC?</h1>
        <p>adalah platform yang digunakan untuk membuat reservasi di internet cafe</p>
      </div>

      <div className="intro">
        <div className="intro-text">
          <h1>Reserve Your PC</h1>
          <h2>Temukan PC yang pas untukmu...</h2>
        </div>
        <div className="intro-image">
          <img src="./img/showcase.jpg" alt="Intro Image" />
        </div>
      </div>

      <section className="content">
        <h1>What's in RPIC?</h1>
        <div className="grid-container">
          <img src="../imgDashboard/Frame 42.png" alt="Image 1" />
          <img src="../imgDashboard/Frame 43.png" alt="Image 2" />
          <img src="../imgDashboard/Frame 44.png" alt="Image 3" />
        </div>
      </section>

      <footer className="footer-container">
        <div className="footer-content">
          <div className="information">
            <p>MOD gaming center Bandung</p>
            <p>jalan purnawarman sumur no 24 - 26 40117 Bandung West Java</p>
          </div>
          <div className="about">
            <ul>
              <li>Pelajari</li>
              <li>Tentang Opportuneer</li>
              <li>FAQ</li>
              <li>Partner Kami</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};
