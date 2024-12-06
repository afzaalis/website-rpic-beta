import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // import useNavigate
import "./LandingPage.css";

export const LandingPage = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const welcomeTimeout = setTimeout(() => {
      setShowWelcome(false);
    }, 2000);

    const redirectTimeout = setTimeout(() => {
      navigate("/dashboard"); 
    }, 4000);

    return () => {
      clearTimeout(welcomeTimeout);
      clearTimeout(redirectTimeout);
    };
  }, [navigate]);

  return (
    <div className="page-enter">
      <div className="intro">
        {showWelcome ? (
          <h1 className="fade-in" id="welcome-message" style={{color:"white"}}>
            Welcome To RPIC
          </h1>
        ) : (
          <h1 className="fade-in" id="reserve-message" style={{color:"white"}}>
            Reserve Your Table Here..
          </h1>
        )}
      </div>
    </div>
  );
};
