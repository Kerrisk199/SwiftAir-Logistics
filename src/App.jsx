// src/App.jsx

import React, { useState } from "react";
import "./App.css";
import planeBackground from "./assets/full-plane-bg.jpg";
import logo from "./assets/swiftair-logo.png"; // Logo import

function App() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [language, setLanguage] = useState("en"); // "en" or "cn"

  const handleTrack = () => {
    if (trackingNumber.toUpperCase() === "ABC123") {
      setTrackingInfo({
        status: {
          en: "Waiting For Customs Clearance",
          cn: "等待海关清关",
        },
        location: {
          en: "Beijing, China",
          cn: "中国北京",
        },
        destination: {
          en: "Hebei City, Yunnan",
          cn: "云南省河北市",
        },
        estimatedDelivery: "2025-05-14",
        inquiries: {
          en:
            "For more inquiries and help, please contact our delivery agent on QQ with QQ number: 3940893022 (QQID: 4580Anton)",
          cn: "如需更多查询和帮助，请联系QQ号：3940893022（QQID: 4580Anton）的派送代理",
        },
      });
    } else if (trackingNumber.toUpperCase() === "XYZ789") {
      setTrackingInfo({
        status: {
          en: "In Transit",
          cn: "运输中",
        },
        location: {
          en: "Shanghai, China",
          cn: "中国上海",
        },
        destination: {
          en: "Guangzhou, China",
          cn: "中国广州",
        },
        estimatedDelivery: "2025-05-20",
        inquiries: {
          en:
            "For more inquiries and help, please contact our delivery agent on QQ with QQ number: 3940893022 (QQID: 4580Anton)",
          cn: "如需更多查询和帮助，请联系QQ号：3940893022（QQID: 4580Anton）的派送代理",
        },
      });
    }
    // Add more tracking codes below as needed, up to 10
    else {
      setTrackingInfo({
        error: {
          en: "Tracking number not found.",
          cn: "未找到追踪号码。",
        },
      });
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "cn" : "en");
  };

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${planeBackground})`,
      }}
    >
      <div className="logo-container">
        <img src={logo} alt="SwiftAir Logo" className="logo" />
      </div>

      <div className="overlay">
        <button className="language-toggle" onClick={toggleLanguage}>
          {language === "en" ? "切换到中文" : "Switch to English"}
        </button>

        <h1>SwiftAir Logistics Company</h1>
        <p>{language === "en" ? "Track your shipment instantly" : "即时追踪您的货件"}</p>

        <div className="tracker">
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder={language === "en" ? "Enter tracking number" : "输入追踪号码"}
          />
          <button onClick={handleTrack}>{language === "en" ? "Track" : "追踪"}</button>
        </div>

        {trackingInfo && (
          <div className="tracking-result">
            {trackingInfo.error ? (
              <p>{trackingInfo.error[language]}</p>
            ) : (
              <>
                <p>
                  <strong>{language === "en" ? "Status:" : "状态："}</strong>{" "}
                  {trackingInfo.status[language]}
                </p>
                <p>
                  <strong>{language === "en" ? "Location:" : "位置："}</strong>{" "}
                  {trackingInfo.location[language]}
                </p>
                <p>
                  <strong>{language === "en" ? "Destination:" : "目的地："}</strong>{" "}
                  {trackingInfo.destination[language]}
                </p>
                <p>
                  <strong>{language === "en" ? "Estimated Delivery:" : "预计送达日期："}</strong>{" "}
                  {trackingInfo.estimatedDelivery}
                </p>
                <p>{trackingInfo.inquiries[language]}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
