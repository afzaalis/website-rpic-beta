import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './drive.css';

const DrivingSimulatorPage = () => {
  const navigate = useNavigate();
  const [selectedPCs, setSelectedPCs] = useState([]);

  const handleClick = (pcNumber) => {
    const pcType = "Driving Simulator";
    const price = 30000;

    // Check if the PC is already selected
    if (selectedPCs.some(pc => pc.number === pcNumber)) {
      // Remove the PC from selection
      setSelectedPCs(prev => prev.filter(pc => pc.number !== pcNumber));
    } else if (selectedPCs.length < 3) {
      // Add the PC to selection if less than 3 PCs are selected
      setSelectedPCs(prev => [...prev, { number: pcNumber, type: pcType, price }]);
    } else {
      alert("Maksimal 3 PC dapat dipilih.");
    }
  };

  const handleConfirm = () => {
    if (selectedPCs.length === 0) {
      alert("Pilih minimal 1 PC sebelum konfirmasi.");
    } else {
      localStorage.setItem("selectedPCs", JSON.stringify(selectedPCs));
      navigate("/orderPage", { state: { selectedPCs } });
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
            <h1 style={{ color: 'white', textAlign: 'center' }}>PC DRIVING SIMULATOR</h1>
            <div className="color-note">
              <div className="note-item">
                <div className="color-box purple"></div>
                <span>Dipilih</span>
              </div>
              <div className="note-item">
                <div className="color-box black"></div>
                <span>Tidak Tersedia</span>
              </div>
              <div className="note-item">
                <div className="color-box white"></div>
                <span>Tersedia</span>
              </div>
            </div>

            <div className="grid-container">
              {/* Generate PC dynamically */}
              {[...Array(16).keys()].map(i => {
                const pcNumber = `S${i + 1}`;
                const isSelected = selectedPCs.some(pc => pc.number === pcNumber);

                return (
                  <div
                    key={pcNumber}
                    id={pcNumber}
                    className={`grid-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleClick(pcNumber)}
                  >
                    {pcNumber}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="info-panel">
            <h2>NOMOR PC</h2>
            <p>MAX : 3 PC UNTUK SEMUA JENIS PC</p>
            <div className="pc-display">
              {selectedPCs.length > 0
                ? selectedPCs.map(pc => pc.number).join(", ")
                : "PC belum dipilih"}
            </div>
            <button className="confirm-btn" onClick={handleConfirm}>KONFIRMASI</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrivingSimulatorPage;
