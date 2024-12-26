import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./order.css";

const PaymentMethod = ({ id, name, icon, selected, onClick }) => (
  <div 
    onClick={onClick}
    className={`payment-method ${selected ? 'selected' : ''}`}
  >
    <div className="method-info">
      <img src={icon} alt={name} className="method-icon" />
      <span>{name}</span>
    </div>
    <div className={`radio-indicator ${selected ? 'selected' : ''}`} />
  </div>
);

function ReceiptModal({ totalPrice, remainingTime, onClose }) {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("");
  const [bookingId, setBookingId] = useState(null);

  useEffect(() => {
    const storedBookingId = localStorage.getItem("bookingId");
    if (storedBookingId) {
      setBookingId(storedBookingId);
    }
  }, []);

  const paymentMethods = [
    { id: 'dana', name: 'Dana', icon: '/img/imgPayment/dana.png' },
    { id: 'gopay', name: 'Gopay', icon: '/img/imgPayment/gopay.png' },
    { id: 'mandiri', name: 'Mandiri Virtual Account', icon: '/img/imgPayment/mandiri.png' },
    { id: 'bca', name: 'BCA Virtual Account', icon: '/img/imgPayment/bca.png' },
  ];

  const handleConfirmPurchase = async () => {
    if (!selectedMethod) {
      alert("Pilih metode pembayaran sebelum melanjutkan.");
      return;
    }

    if (bookingId) {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/bookings/${bookingId}/payment`,
          { paymentStatus: "Confirmed" },
          { headers: { 'Content-Type': 'application/json' }}
        );
        
        if (response.status === 200) {
          navigate('/homereservasi');
        }
      } catch (error) {
        alert("Terjadi kesalahan saat mengonfirmasi pembayaran.");
      }
    }
  };

  return (
    <div className="modal open">
      <div className="modal-content" style={{backgroundColor:"#2C2D59"}}>
        <div className="modal-header">
          <h2 className="modal-title">Pembayaran</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>

        <div className="payment-methods">
          {paymentMethods.map(method => (
            <PaymentMethod
              key={method.id}
              {...method}
              selected={selectedMethod === method.id}
              onClick={() => setSelectedMethod(method.id)}
            />
          ))}
        </div>

        <div className="payment-summary">
          <h3 className="summary-title">Ringkasan pembayaran</h3>
          <div className="summary-item">
            <span>PC Beta 2x</span>
            <span>Rp. {totalPrice.toLocaleString()}</span>
          </div>

          <div className="total-amount">
            <span>Total Tagihan</span>
            <span>Rp{totalPrice.toLocaleString()}</span>
          </div>

          <div className="timer">
            <span style={{color:"red"}}>Waktu tersisa: {formatTime(remainingTime)}</span>
          </div>

          <button
            onClick={handleConfirmPurchase}
            className="pay-button"
          >
            Bayar
          </button>
        </div>
      </div>
    </div>
  );
}

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${secs}`;
};

export default ReceiptModal;
