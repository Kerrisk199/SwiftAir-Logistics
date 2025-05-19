import React from "react";
import logo from "../assets/swiftair-logo.png";

const Header = ({ isTranslated, toggleTranslation }) => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 2,
    }}>
      {/* Logo */}
      <div className="logo-container">
        <img
          src={logo}
          alt="SwiftAir Logo"
          className="logo"
          onClick={() => window.location.href = "/"}
          style={{ cursor: "pointer" }}
        />
      </div>

      {/* Language toggle button */}
      <button className="language-toggle" onClick={toggleTranslation}>
        {isTranslated ? "Switch to English" : "切换到中文"}
      </button>
    </div>
  );
};

export default Header;
