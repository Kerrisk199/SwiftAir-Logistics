import React, { useState } from "react";
import "./App.css";
import planeBackground from "./assets/full-plane-bg.jpg";
import logo from "./assets/swiftair-logo.png"; // Logo import

function App() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [language, setLanguage] = useState("en"); // 'en' or 'zh'

  // Tracking data with English and Chinese
  const trackingData = {
    ABC123: {
      en: {
        status: "Waiting For Customs Clearance",
        location: "Beijing, China",
        destination: "Hebei City, Yunnan",
        estimatedDelivery: "2025-05-14",
        contact:
          "For more inquiries and help, please contact our delivery agent on QQ with QQ number: 3940893022 (QQID: 4580Anton)",
      },
      zh: {
        status: "等待海关清关",
        location: "中国，北京",
        destination: "云南，河北市",
        estimatedDelivery: "2025-05-14",
        contact:
          "如需更多查询和帮助，请通过QQ联系您的配送代理，QQ号：3940893022（QQID：4580Anton）",
      },
    },
    DEF456: {
      en: {
        status: "In Transit",
        location: "Shanghai, China",
        destination: "Guangzhou, China",
        estimatedDelivery: "2025-05-18",
        contact:
          "For more inquiries and help, please contact our delivery agent on QQ with QQ number: 3940893022 (QQID: 4580Anton)",
      },
      zh: {
        status: "运输中",
        location: "中国，上海",
        destination: "中国，广州",
        estimatedDelivery: "2025-05-18",
        contact:
          "如需更多查询和帮助，请通过QQ联系您的配送代理，QQ号：3940893022（QQID：4580Anton）",
      },
    },
    // Add up to 10 tracking codes like this
    GHI789: {
      en: {
        status: "Delivered",
        location: "New York, USA",
        destination: "Los Angeles, USA",
        estimatedDelivery: "2025-05-10",
        contact:
          "For more inquiries and help, please contact our delivery agent on QQ with QQ number: 3940893022 (QQID: 4580Anton)",
      },
      zh: {
        status: "已送达",
        location: "美国，纽约",
        destination: "美国，洛杉矶",
        estimatedDelivery: "2025-05-10",
        contact:
          "如需更多查询和帮助，请通过QQ联系您的配送代理，QQ号：3940893022（QQID：4580Anton）",
      },
    },
    JKL012: {
      en: {
        status: "Out for Delivery",
        location: "London, UK",
        destination: "Manchester, UK",
        estimatedDelivery: "2025-05-16",
        contact:
          "For more inquiries and help, please contact our delivery agent on QQ with QQ number: 3940893022 (QQID: 4580Anton)",
      },
      zh: {
        status: "派送中",
        location: "英国，伦敦",
        destination: "英国，曼彻斯特",
        estimatedDelivery: "2025-05-16",
        contact:
          "如需更多查询和帮助，请通过QQ联系您的配送代理，QQ号：3940893022（QQID：4580Anton）",
      },
    },
    MNO345: {
      en: {
        status: "Shipment Received",
        location: "Tokyo, Japan",
        destination: "Osaka, Japan",
        estimatedDelivery: "2025-05-20",
        contact:
          "For more inquiries and help, please contact our delivery agent on QQ with QQ number: 3940893022 (QQID: 4580Anton)",
      },
      zh: {
        status: "已收货",
        location: "日本，东京",
        destination: "日本，大阪",
        estimatedDelivery: "2025-05-20",
        contact:
          "如需更多查询和帮助，请通过QQ联系您的配送代理，QQ号：3940893022（QQID：4580Anton）",
      },
    },
    // Add more tracking codes here as needed...
  };

  const handleTrack = () => {
    const info = trackingData[trackingNumber.toUpperCase()];
    if (info) {
      setTrackingInfo(info);
    } else {
      setTrackingInfo({ error: "Tracking number not found." });
    }
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "zh" : "en"));
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

      {/* Language toggle button - previous position and style */}
      <button className="language-toggle" onClick={toggleLanguage}>
        {language === "en" ? "中文" : "English"}
      </button>

      <div className="overlay">
        <h1>SwiftAir Logistics Company</h1>
        <p>{language === "en" ? "Track your shipment instantly" : "即时查询您的货物"}</p>
        <div className="tracker">
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder={language === "en" ? "Enter tracking number" : "输入追踪号码"}
          />
          <button onClick={handleTrack}>{language === "en" ? "Track" : "查询"}</button>
        </div>
        {trackingInfo && (
          <div className="tracking-result">
            {trackingInfo.error ? (
              <p>{trackingInfo.error}</p>
            ) : (
              <>
                <p><strong>{language === "en" ? "Status:" : "状态："}</strong> {trackingInfo[language].status}</p>
                <p><strong>{language === "en" ? "Location:" : "当前位置："}</strong> {trackingInfo[language].location}</p>
                <p><strong>{language === "en" ? "Destination:" : "目的地："}</strong> {trackingInfo[language].destination}</p>
                <p><strong>{language === "en" ? "Estimated Delivery:" : "预计送达："}</strong> {trackingInfo[language].estimatedDelivery}</p>
                <p>{trackingInfo[language].contact}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
