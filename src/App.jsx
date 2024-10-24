import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LandingPage } from './pages/landingpage/LandingPage';
import { Login } from './pages/login/Login';
import { Signup } from './pages/signup/signup';
import { Dashboard } from './pages/dashboard/dashboard';

import './App.css'
import './tailwind.css'; 

function App() {

  return (
    <>
    <Router>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    </Router>
    </>
  )
}

export default App
