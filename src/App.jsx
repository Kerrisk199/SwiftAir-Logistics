// src/App.jsx

import React, { useState } from "react";
import "./App.css";
import planeBackground from "./assets/full-plane-bg.jpg";
import logo from "./assets/swiftair-logo.png";

function App() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [language, setLanguage] = useState("en"); // Language toggle

  const translations = {
    en: {
      title: "SwiftAir Logistics Company",
      subtitle: "Track your shipment instantly",
      placeholder: "Enter tracking number",
      button: "Track",
      error: "Tracking number not found.",
      inquiries: "For more inquiries and help:",
      contact: "Please contact our delivery agent on QQ with QQ number:",
      agentId: "(QQID: 4580Anton)",
    },
    zh: {
      title: "迅捷航空物流公司",
      subtitle: "立即追踪您的货物",
      placeholder: "输入追踪号码",
      button: "追踪",
      error: "未找到追踪号码。",
      inquiries: "如需更多咨询与帮助：",
      contact: "请联系我们的送货代理，QQ号：",
      agentId: "（QQ号：4580Anton）",
    },
  };

  const t = translations[language];

  const trackingData = {
    ABC123: {
      status: "Waiting For Customs Clearance",
      location: "Beijing, China",
      destination: "Hebei City, Yunnan",
      estimatedDelivery: "2025-05-14",
    },
    XYZ789: {
      status: "In Transit",
      location: "Shanghai, China",
      destination: "Lagos, Nigeria",
      estimatedDelivery: "2025-05-18",
    },
    QWE456: {
      status: "Delivered",
      location: "Abuja, Nigeria",
      destination: "Port Harcourt, Nigeria",
      estimatedDelivery: "2025-05-10",
    },
    LMN321: {
      status: "Departed Origin",
      location: "Nanjing, China",
      destination: "Accra, Ghana",
      estimatedDelivery: "2025-05-17",
    },
    RTY987: {
      status: "Arrived at Sorting Center",
      location: "Guangzhou, China",
      destination: "Nairobi, Kenya",
      estimatedDelivery: "2025-05-19",
    },
    DEF654: {
      status: "Shipment Delayed",
      location: "Wuhan, China",
      destination: "Cairo, Egypt",
      estimatedDelivery: "2025-05-21",
    },
    GHI159: {
      status: "Awaiting Pickup",
      location: "Shenzhen, China",
      destination: "Addis Ababa, Ethiopia",
      estimatedDelivery: "2025-05-20",
    },
    JKL753: {
      status: "In Customs",
      location: "Chengdu, China",
      destination: "Lusaka, Zambia",
      estimatedDelivery: "2025-05-23",
    },
    MNO258: {
      status: "Shipment Accepted",
      location: "Tianjin, China",
      destination: "Harare, Zimbabwe",
      estimatedDelivery: "2025-05-22",
    },
    PQR147: {
      status: "Processing Order",
      location: "Hangzhou, China",
      destination: "Kigali, Rwanda",
      estimatedDelivery: "2025-05-24",
    },
  };

  const handleTrack = () => {
    const info = trackingData[trackingNumber.toUpperCase()];
    if (info) {
      setTrackingInfo(info);
    } else {
      setTrackingInfo({ error: t.error });
    }
  };

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "zh" : "en"));
  };

  return (
    <div
      className="app"
      style={{ backgroundImage: `url(${planeBackground})` }}
    >
      <div className="logo-container">
        <img src={logo} alt="SwiftAir Logo" className="logo" />
      </div>

      <div className="overlay">
        <button className="lang-toggle" onClick={toggleLanguage}>
          {language === "en" ? "中文" : "English"}
        </button>

        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>

        <div className="tracker">
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder={t.placeholder}
          />
          <button onClick={handleTrack}>{t.button}</button>
        </div>

        {trackingInfo && (
          <div className="tracking-result">
            {trackingInfo.error ? (
              <p>{trackingInfo.error}</p>
            ) : (
              <>
                <p><strong>Status:</strong> {trackingInfo.status}</p>
                <p><strong>Location:</strong> {trackingInfo.location}</p>
                <p><strong>Destination:</strong> {trackingInfo.destination}</p>
                <p><strong>Estimated Delivery:</strong> {trackingInfo.estimatedDelivery}</p>
                <p>
                  <strong>{t.inquiries}</strong><br />
                  {t.contact} <strong>3940893022</strong> {t.agentId}
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
