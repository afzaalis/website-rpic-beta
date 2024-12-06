import React from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate();

    const handleSignUp = () => {
      navigate('/signup');
    };
  
    const handleLogin = () => {
      navigate('/login');
    };
  return (
    <div className="dashboard">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <img
            src="../../favicon.ico"
            alt="Logo"
            className="navbar-logo"
            style={{ width: "40px", height: "40px" }}
          />
          <ul className="navbar-menu">
            <li className="navbar-item">
              <a href="#about" className="navbar-link">
                About
              </a>
            </li>
            <li className="navbar-item">
              <a href="#facilities" className="navbar-link">
                Facilities
              </a>
            </li>
            <li className="navbar-item">
              <a href="#events" className="navbar-link">
                Events
              </a>
            </li>
            <li className="navbar-item">
              <a href="#testimonials" className="navbar-link">
                Testimonials
              </a>
            </li>
          </ul>
          <div className="button-group">
            <button className="signup-button" onClick={handleSignUp}>
              Sign Up
            </button>
            <button className="login-button" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Pengantar */}
      <div className="pengantar">
        <h1>What's RPIC?</h1>
        <p>Platform reservasi untuk internet cafe, MOD gaming center di Bandung.</p>
      </div>

      {/* Intro */}
      <div className="intro" id="about">
        <div className="intro-text">
          <h1>Reserve Your PC</h1>
          <h2>Temukan PC yang pas untukmu...</h2>
        </div>
        <div className="intro-image">
          <img
            src="/img/imgDashboard/certif-mod.jpg"
            alt="Intro Image"
            style={{ borderRadius: "15px" }}
          />
        </div>
      </div>

      {/* Facilities */}
      <section className="content" id="facilities">
        <h1>Explore Our Facilities</h1>
        <div className="grid-container">
          <img src="/img/imgDashboard/alpha.png" alt="Image 1" />
          <img src="/img/imgDashboard/beta.png" alt="Image 2" />
          <img src="/img/imgDashboard/drivesimulator.png" alt="Image 3" />
        </div>
      </section>

      {/* Promotions */}
      <section className="promotions">
        <h1>Special Offers</h1>
        <div className="promotion-cards">
          <div className="promotion-card">
            <h2>First-Time User</h2>
            <p>Get 20% off on your first reservation!</p>
          </div>
          <div className="promotion-card">
            <h2>Weekly Member</h2>
            <p>Book for a week and save 10%!</p>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="events" id="events">
        <h1>Upcoming Events</h1>
        <div className="event-cards">
          <div className="event-card">
            <h2>MOD Esports Tournament</h2>
            <p>Join our Dota 2 tournament and win exciting prizes!</p>
            <p>
              <strong>Date:</strong> November 5, 2024
            </p>
          </div>
          <div className="event-card">
            <h2>Community Game Night</h2>
            <p>Gather with fellow gamers and enjoy a night of fun!</p>
            <p>
              <strong>Date:</strong> November 12, 2024
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials" id="testimonials">
        <h1>What Our Customers Say</h1>
        <div className="testimonial-container">
          <div className="testimonial">
            <p>
              "Tempat yang sangat nyaman dan PC-nya mantap! Pengalaman gaming
              yang luar biasa."
            </p>
            <p>- Arif, Gamer</p>
          </div>
          <div className="testimonial">
            <p>
              "Service terbaik di Bandung! Tempatnya cocok untuk e-sports
              tournaments."
            </p>
            <p>- Budi, Organizer</p>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="partners">
        <h1>Our Partners</h1>
        <div className="partner-logos">
          <img src="/img/partners/brand1.png" alt="Brand 1" />
          <img src="/img/partners/brand2.png" alt="Brand 2" />
          <img src="/img/partners/brand3.png" alt="Brand 3" />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-container">
        <div className="footer-content">
          <div className="information">
            <p>MOD gaming center Bandung</p>
            <p>jalan purnawarman sumur no 24 - 26 40117 Bandung West Java</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
