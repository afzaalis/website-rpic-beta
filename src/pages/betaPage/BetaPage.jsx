import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './betapage.css'; 

const BetaPage = () => {
  const navigate = useNavigate();
  const [selectedPCs, setSelectedPCs] = useState([]);
  const [pcDisplay, setPcDisplay] = useState('--');

  const handleClick = (pcNumber) => {
    const pcType = "Beta"; // Set PC type
    const price = 10000; // Set price for Beta
    const pcObject = { number: pcNumber, type: pcType, price: price };

    let updatedSelectedPCs = [...selectedPCs];
    const pcIndex = updatedSelectedPCs.findIndex(pc => pc.number === pcNumber);

    // If PC is already selected, unselect it
    if (pcIndex !== -1) {
      updatedSelectedPCs = updatedSelectedPCs.filter(pc => pc.number !== pcNumber);
    }
    // If not selected and less than 3 PCs are selected, select it
    else if (updatedSelectedPCs.length < 3) {
      updatedSelectedPCs.push(pcObject);
    }

    setSelectedPCs(updatedSelectedPCs);
    setPcDisplay(updatedSelectedPCs.length > 0 ? updatedSelectedPCs.map(pc => pc.number).join(", ") : "--");

    // Update the color of the grid item based on selection
    const gridItem = document.getElementById(pcNumber);
    gridItem.style.backgroundColor = updatedSelectedPCs.find(pc => pc.number === pcNumber) ? "purple" : "white";
  };

  const handleConfirm = () => {
    if (selectedPCs.length > 0) {
      localStorage.setItem("selectedPCs", JSON.stringify(selectedPCs));
      navigate("/orderPage"); // Navigate to order page
    } else {
      alert("Pilih minimal 1 PC sebelum konfirmasi.");
    }
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <div className="navbar-container">
          <img src="../../favicon.ico" alt="Logo" className="navbar-logo" />
          <ul className="navbar-menu">
            <li className="navbar-item"><a href="/profile" className="navbar-link">Profile</a></li>
            <li className="navbar-item"><a href="/homeReservasi" className="navbar-link">Home</a></li>
            <li className="navbar-item"><a href="/history" className="navbar-link">History</a></li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        <div className="flex-container">
          <div className="pc-list">
            <h1 style={{ color: 'white', textAlign: 'center' }}>PC BETA</h1>
            <div className="color-note">
              <div className="note-item">
                <div className="color-box purple"></div>
                <span>dipilih</span>
              </div>
              <div className="note-item">
                <div className="color-box black"></div>
                <span>tidak tersedia</span>
              </div>
              <div className="note-item">
                <div className="color-box white"></div>
                <span>tersedia</span>
              </div>
            </div>

            <div className="grid-container">
              {/* Create grid items dynamically */}
              {['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12', 'B13', 'B14', 'B15', 'B16', 'B17'].map((pcNumber) => (
                <div
                  key={pcNumber}
                  id={pcNumber}
                  className="grid-item"
                  onClick={() => handleClick(pcNumber)}
                >
                  {pcNumber}
                </div>
              ))}
            </div>
          </div>

          <div className="info-panel">
            <h2>NOMOR PC</h2>
            <p>PC belum dipilih</p>
            <p>MAX : 3 PC UNTUK SEMUA JENIS PC</p>
            <div className="pc-display">{pcDisplay}</div>
            <button className="confirm-btn" onClick={handleConfirm}>KONFIRMASI</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetaPage;
