import React from "react";
import logo from "../assets/swiftair-logo.png";

const Header = ({ isTranslated, toggleTranslation }) => {
  return (
    <div className="header">
      <div className="logo-container">
        <img
          src={logo}
          alt="SwiftAir Logo"
          className="logo"
          onClick={() => (window.location.href = "/")}
        />
      </div>
      <button className="language-toggle" onClick={toggleTranslation}>
        {isTranslated ? "Switch to English" : "切换到中文"}
      </button>
    </div>
  );
};

export default Header;
