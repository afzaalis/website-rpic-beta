import React, { useState, useEffect } from "react";
import ReceiptModal from "./ReceiptModal";
import "./order.css";

function OrderPage() {
  const [selectedPCs, setSelectedPCs] = useState(
    JSON.parse(localStorage.getItem("selectedPCs")) || []
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const total = selectedPCs.reduce((acc, pc) => {
      const duration = pc.duration || 1;
      return acc + pc.price * duration;
    }, 0);
    setTotalPrice(total);
  }, [selectedPCs]);

  const handleDurationChange = (index, duration) => {
    const updatedPCs = [...selectedPCs];
    updatedPCs[index].duration = parseInt(duration, 10);
    setSelectedPCs(updatedPCs);
  };

  const handleTimeChange = (index, time) => {
    const updatedPCs = [...selectedPCs];
    updatedPCs[index].startTime = time; // Simpan waktu mulai
    setSelectedPCs(updatedPCs);
  };

  const handleCheckboxChange = (index) => {
    const updatedPCs = [...selectedPCs];
    updatedPCs[index].isChecked = !updatedPCs[index].isChecked;
    setSelectedPCs(updatedPCs);
  };

  const handleBuyClick = () => {
    // Validasi waktu mulai
    const isValid = selectedPCs.every((pc) => pc.startTime);
    if (!isValid) {
      setErrorMessage("Harap atur waktu mulai untuk semua PC yang dipilih.");
      return;
    }
    setErrorMessage(""); // Reset pesan error jika valid
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="order-container">
      <h1>ORDER</h1>
      <div className="order-content">
        <div className="order-list">
          {selectedPCs.map((pc, index) => (
            <div key={index} className="order-item">
              <input
                type="checkbox"
                checked={pc.isChecked}
                onChange={() => handleCheckboxChange(index)}
                className="order-checkbox"
              />
              <img
                src={`../../images/pc${pc.type.toLowerCase()}.png`}
                alt="PC"
                className="order-image"
              />
              <div className="order-details">
                <h2 className="order-title">
                  {pc.number} ({pc.type})
                </h2>
                <p className="order-price">
                  Harga per jam: Rp. {pc.price.toLocaleString()}
                </p>
                <p>
                  WAKTU MULAI:
                  <input
                    type="time"
                    className="order-time"
                    value={pc.startTime || ""}
                    onChange={(e) => handleTimeChange(index, e.target.value)}
                  />
                </p>
                <p>
                  DURASI (jam):
                  <input
                    type="number"
                    className="order-duration"
                    min="1"
                    value={pc.duration || 1}
                    onChange={(e) =>
                      handleDurationChange(index, e.target.value)
                    }
                  />
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="order-summary">
          <h2>RINGKASAN ORDER</h2>
          <p className="order-total">
            TOTAL <span>Rp. {totalPrice.toLocaleString()}</span>
          </p>
          {errorMessage && (
            <p className="error-message" style={{ color: "red" }}>
              {errorMessage}
            </p>
          )}
          <button className="voucher-btn">
            <div className="left-content">
              <img
                src="../../img/voucher.png"
                alt="Voucher Icon"
                className="voucher-icon"
              />
              <span>Voucher Saya</span>
            </div>
            <span className="arrow-icon">➔</span>
          </button>
          <button className="buy-btn" onClick={handleBuyClick}>
            Beli
          </button>
        </div>
      </div>

      {isModalOpen && (
        <ReceiptModal
          totalPrice={totalPrice}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default OrderPage;
