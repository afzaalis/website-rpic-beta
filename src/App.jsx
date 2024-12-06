import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/landingpage/LandingPage";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import HomeReservasi from "./pages/homeReservasi/HomeReservasi";
import BetaPage from "./pages/betaPage/BetaPage";
import AlphaPage from "./pages/alphaPage/AlphaPage";
import DrivingSimulatorPage from "./pages/drivingSimulator/DrivingSimulatorPage";
import OrderPage from "./pages/orderPage/Order";
import Profile from "./pages/profile/Profile";
import HistoryPage from "./pages/history/History";
import PrivateRoute from "./components/PrivateRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Menggunakan PrivateRoute untuk halaman yang harus login */}
        <Route 
          path="/homereservasi" 
          element={<PrivateRoute><HomeReservasi /></PrivateRoute>} 
        />
        <Route 
          path="/profile" 
          element={<PrivateRoute><Profile /></PrivateRoute>} 
        />
        <Route 
          path="/history" 
          element={<PrivateRoute><HistoryPage /></PrivateRoute>} 
        />
        <Route 
          path="/betapage" 
          element={<PrivateRoute><BetaPage /></PrivateRoute>} 
        />
        <Route 
          path="/alphapage" 
          element={<PrivateRoute><AlphaPage /></PrivateRoute>} 
        />
        <Route 
          path="/drivingsimulator" 
          element={<PrivateRoute><DrivingSimulatorPage /></PrivateRoute>} 
        />
        <Route 
          path="/orderpage" 
          element={<PrivateRoute><OrderPage /></PrivateRoute>} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
