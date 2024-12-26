import React, { useState, useEffect } from "react";
import axios from "axios";
import ReceiptModal from "./ReceiptModal"; 
import "./order.css";

function OrderPage() {
  const [selectedPCs, setSelectedPCs] = useState(
    JSON.parse(localStorage.getItem("selectedPCs")) || []
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [remainingTime, setRemainingTime] = useState(300); // Timer untuk modal
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = selectedPCs.reduce((acc, pc) => {
        const duration = pc.duration || 1;
        return acc + pc.price * duration;
      }, 0);
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [selectedPCs]);

  useEffect(() => {
    if (isModalOpen) {
      const timer = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handlePaymentTimeout();
          }
          return prev - 1;
        });
      }, 1000);

      setTimerId(timer);
      return () => clearInterval(timer);
    }
  }, [isModalOpen]);

  const handleDurationChange = (index, duration) => {
    const updatedPCs = [...selectedPCs];
    updatedPCs[index].duration = parseInt(duration, 10);
    setSelectedPCs(updatedPCs);
  };

  const handleTimeChange = (index, time) => {
    const updatedPCs = [...selectedPCs];
    updatedPCs[index].startTime = time;
    setSelectedPCs(updatedPCs);
  };

  const handleOrderSubmit = async () => {
    const isValid = selectedPCs.every((pc) => pc.startTime && pc.duration);
    if (!isValid) {
      setErrorMessage("Harap lengkapi waktu mulai dan durasi untuk semua PC.");
      return;
    }
  
    const userId = localStorage.getItem("userId");
    console.log("user id:", userId);
  
    if (!userId) {
      setErrorMessage("Pengguna tidak ditemukan. Harap login terlebih dahulu.");
      return;
    }
  
    const bookings = selectedPCs.map((pc) => ({
      pc_id: pc.id,
      hours: pc.duration,
      price: pc.price * pc.duration,
      startTime: pc.startTime,
    }));
  
    try {
      const response = await axios.post("http://localhost:3000/api/bookings", {
        userId,
        selectedPCs: bookings,
        totalPrice,
      });
  
      if (response.status === 201) {
        console.log("Order submitted successfully", response.data);
        setErrorMessage("");
        // Simpan bookingId ke localStorage
        localStorage.setItem("bookingId", response.data.bookingId); 
        setIsModalOpen(true); 
      } else {
        setErrorMessage("Gagal mengirim pesanan. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error during API call: ", error);
      setErrorMessage("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  const handlePaymentTimeout = () => {
    alert("Waktu pembayaran telah habis. Pemesanan dibatalkan.");
    setIsModalOpen(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  return (
    <div className="order-container">
      <h1>Halaman Pemesanan</h1>
      <div className="order-content">
        <div className="order-list">
          {selectedPCs.map((pc, index) => (
            <div key={index} className="order-item">
              <div className="order-details">
                <h2>{`${pc.type} - ${pc.number}`}</h2>
                <p>Harga per jam: Rp. {pc.price.toLocaleString()}</p>

                <label>Waktu Mulai:</label>
                <input
                  type="time"
                  value={pc.startTime || ""}
                  onChange={(e) => handleTimeChange(index, e.target.value)}
                />

                <label>Durasi (jam):</label>
                <input
                  type="number"
                  min="2"
                  value={pc.duration || 1}
                  onChange={(e) => handleDurationChange(index, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="order-summary">
          <h2>Ringkasan Pemesanan</h2>
          <p>Total Harga: Rp. {totalPrice.toLocaleString()}</p>
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button onClick={handleOrderSubmit} className="submit-order-btn">
            Konfirmasi Pesanan
          </button>
        </div>
      </div>

      {isModalOpen && (
        <ReceiptModal
          totalPrice={totalPrice}
          remainingTime={remainingTime}
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
}

export default OrderPage;
