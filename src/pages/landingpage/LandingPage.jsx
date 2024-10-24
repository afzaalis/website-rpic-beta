import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../landingpage/LandingPage.css';

export const LandingPage = () => {
  const [isVisibleFirst, setIsVisibleFirst] = useState(true);
  const [isVisibleSecond, setIsVisibleSecond] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsVisibleFirst(false);
      setIsVisibleSecond(true);
    }, 2000); 

    const timer2 = setTimeout(() => {
      navigate('/login'); 
    }, 4000); 

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [navigate]);

  return (
    <div className='page-enter'>
      <div className="intro">
        <img src="/favicon.ico" alt="Icon" />
        {isVisibleFirst && <h1 className="fade-in">Welcome To RPIC</h1>}
        {isVisibleSecond && <h1 className="fade-in">Reserve Your Table Here..</h1>}
      </div>
    </div>
  );
};
