import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./history.css"; 
const HistoryPage = () => {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    // Ambil data order dari localStorage saat komponen dimuat
    const data = JSON.parse(localStorage.getItem("orderData")) || [];
    setOrderData(data);
  }, []);

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
      <div className="navbar-container">
        <img src="../../favicon.ico" alt="Logo" className="navbar-logo" />
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/profile" className="navbar-link">
              Profile
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/homereservasi" className="navbar-link">
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/history" className="navbar-link">
              History
            </Link>
          </li>
        </ul>
      </div>
    </div>

      {/* History Page Content */}
      <div className="history-container">
        <h1>Booking History</h1>
        {orderData.length === 0 ? (
          <p style={{ textAlign: "center", color: "red" }}>
            No booking history available.
          </p>
        ) : (
          <table id="historyTable">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Table Number</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((order, index) => (
                <tr key={index}>
                  <td>{order.date}</td>
                  <td>{order.time || "N/A"}</td>
                  <td>
                    {order.pcNumber} ({order.type})
                  </td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
