import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./history.css"; 

const HistoryPage = () => {
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Assuming there's an API endpoint to get the booking history
    const userId = localStorage.getItem("userId"); // Replace with actual secure storage
    if (userId) {
      fetchBookingHistory(userId);
    }
  }, []);

  const fetchBookingHistory = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/bookings/history/${userId}`);
      const data = await response.json();
      if (response.ok) {
        setOrderData(data);
      } else {
        console.error("Failed to fetch history:", data.error);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "yellow";
      case "cancelled":
        return "red";
      case "confirmed":
        return "green";
      default:
        return "grey";
    }
  };

  const showReservationDetails = (item) => {
    alert(`Reservation #${item.id}\nStatus: ${item.status}\nDate: ${item.created_at}\nSelected PCs: ${JSON.stringify(item.selected_pcs)}`);
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <div className="navbar-container">
        <img src="../../favicon.ico" alt="Logo" className="navbar-logo" style={{marginRight:"20px"}}/>
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
          </ul>
        </div>
      </div>

      {/* History Page Content */}
      <div className="history-container">
        <h1>Booking History</h1>
        {isLoading ? (
          <p style={{ textAlign: "center", color: "white" }}>Loading...</p>
        ) : orderData.length === 0 ? (
          <p style={{ textAlign: "center", color: "red" }}>No booking history available.</p>
        ) : (
          <div className="history-list">
            {orderData.map((order) => {
              const statusColor = getStatusColor(order.status);
              return (
                <div key={order.id} className="history-item" onClick={() => showReservationDetails(order)}>
                  <h4>Reservation #{order.id}</h4>
                  <p>Date: {order.created_at}</p>
                  <p>Status: <span style={{ color: statusColor }}>{order.status}</span></p>
                  <p>Selected PCs:</p>
                  {order.selected_pcs.map((pc, index) => (
                    <div key={index}>
                      <p>PC ID: {pc.pc_id}, Hours: {pc.hours}, Price: {pc.price}</p>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
