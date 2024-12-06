import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./order.css";

function ReceiptModal({ totalPrice, onClose }) {
    const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleConfirmPurchase = () => {
    if (!paymentMethod) {
      alert("Pilih metode pembayaran sebelum melanjutkan.");
      return;
    }
    alert(`Pembelian berhasil dengan metode: ${paymentMethod}`);
    onClose();
    navigate('/homereservasi');
  };

  return (
    <div className="modal open">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          ×
        </span>
        <div className="receipt-details">
          <h3>Pilih Metode Pembayaran:</h3>
          <div>
            <input
              type="radio"
              id="gopay"
              name="payment"
              value="Gopay"
              onChange={handlePaymentChange}
            />
            <label htmlFor="gopay">Gopay</label>
          </div>
          <div>
            <input
              type="radio"
              id="dana"
              name="payment"
              value="Dana"
              onChange={handlePaymentChange}
            />
            <label htmlFor="dana">Dana</label>
          </div>
          <div>
            <input
              type="radio"
              id="bank"
              name="payment"
              value="Bank"
              onChange={handlePaymentChange}
            />
            <label htmlFor="bank">Bank</label>
          </div>
        </div>
        <p className="receipt-total">
          TOTAL: Rp. {totalPrice.toLocaleString()}
        </p>
        <button onClick={handleConfirmPurchase}>
          Konfirmasi Pembelian

        </button>
      </div>
    </div>
  );
}

export default ReceiptModal;
