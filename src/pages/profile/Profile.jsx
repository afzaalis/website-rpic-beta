import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./profile.css";

const Profile = () => {
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [voucherDetail, setVoucherDetail] = useState("");
  const [userData, setUserData] = useState({
    name: "Atyan AJG",
    username: "@atyanajg",
    email: "atyanajg@gmail.com",
    phone: "-",
  });

  // Handle open/close voucher modal
  const handleVoucherClick = (voucherName) => {
    setVoucherDetail(`Detail for ${voucherName}`);
    setIsVoucherModalOpen(true);
  };

  const handleCloseVoucherModal = () => {
    setIsVoucherModalOpen(false);
  };

  const handleEditProfileClick = () => {
    setIsEditProfileModalOpen(true);
  };

  const handleCloseEditProfileModal = () => {
    setIsEditProfileModalOpen(false);
  };

  const handleSaveProfileChanges = () => {
    setUserData({
      name: document.getElementById("editName").value,
      username: document.getElementById("editUsername").value,
      email: document.getElementById("editEmail").value,
      phone: document.getElementById("editPhone").value,
    });

    setIsEditProfileModalOpen(false);
  };

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

      <div className="text-judul">
        <h1>Profile</h1>
      </div>

      {/* Profile Page Content */}
      <div className="profile-container">
        <img src="/img/profileBg.png" alt="" className="profile-image" />
        <div className="profile-header">
          <h2 className="profile-name" style={{ textAlign: "left" }}>
            {userData.name}
          </h2>
          <p className="profile-username" style={{ textAlign: "left" }}>
            {userData.email}
          </p>
        </div>

        <div className="profile-info">
          <p className="profile-bio">Customer</p>
          <div className="profile-details">
            <div className="detail-item">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{userData.email}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Phone:</span>
              <span className="detail-value">{userData.phone}</span>
            </div>
          </div>
          <button className="btn-edit" onClick={handleEditProfileClick}>
            Edit Profile
          </button>
        </div>

        {/* Voucher Section */}
        <div className="voucher-section">
          <h3>Voucher Saya</h3>
          <div className="voucher-list">
            <div className="voucher-item">
              <span className="voucher-name">Voucher 10% Off</span>
              <span className="voucher-expiry">Expires: 31 Dec 2024</span>
              <button
                className="btn-view-voucher"
                onClick={() => handleVoucherClick("Voucher 10% Off")}
              >
                Lihat Voucher
              </button>
            </div>
            <div className="voucher-item">
              <span className="voucher-name">Voucher Free 1 Hour</span>
              <span className="voucher-expiry">Expires: 15 Jan 2025</span>
              <button
                className="btn-view-voucher"
                onClick={() => handleVoucherClick("Voucher Free 1 Hour")}
              >
                Lihat Voucher
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Structure */}
      {isVoucherModalOpen && (
        <div id="voucherModal" className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={handleCloseVoucherModal}>
              &times;
            </span>
            <h2>Voucher Detail</h2>
            <p id="voucherDetail">{voucherDetail}</p>
          </div>
        </div>
      )}

      {/* Edit Profile Modal Structure */}
      {isEditProfileModalOpen && (
        <div id="editProfileModal" className={`modal ${isEditProfileModalOpen ? "open" : ""}`}>
          <div className="modal-content">
            <span
              className="close-btn"
              onClick={handleCloseEditProfileModal}
            >
              &times;
            </span>
            <h2>Edit Profile</h2>
            <form id="editProfileForm">
              <label htmlFor="editName">Name</label>
              <input
                type="text"
                id="editName"
                name="name"
                defaultValue={userData.name}
              />

              <label htmlFor="editUsername">Username</label>
              <input
                type="text"
                id="editUsername"
                name="username"
                defaultValue={userData.username}
              />

              <label htmlFor="editEmail">Email</label>
              <input
                type="email"
                id="editEmail"
                name="email"
                defaultValue={userData.email}
              />

              <label htmlFor="editPhone">Phone</label>
              <input
                type="text"
                id="editPhone"
                name="phone"
                defaultValue={userData.phone}
              />

              <button
                type="button"
                className="btn-save"
                onClick={handleSaveProfileChanges}
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
