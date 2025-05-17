// src/App.jsx import React, { useState } from "react"; import "./App.css"; import planeBackground from "./assets/full-plane-bg.jpg"; import logo from "./assets/swiftair-logo.png"; import { db } from "./firebase"; import { doc, getDoc } from "firebase/firestore";

function App() { const [trackingNumber, setTrackingNumber] = useState(""); const [trackingInfo, setTrackingInfo] = useState(null); const [language, setLanguage] = useState("en");

const translations = { en: { title: "SwiftAir Logistics Company", subtitle: "Track your shipment instantly", placeholder: "Enter tracking number", trackButton: "Track", status: "Status", location: "Location", destination: "Destination", estimatedDelivery: "Estimated Delivery", contact: "For more inquiries and help, please contact our delivery agent on QQ with QQ number: 3940893022 (QQID: 4580Anton)", notFound: "Tracking number not found." }, zh: { title: "迅捷航空物流公司", subtitle: "立即跟踪您的货物", placeholder: "输入追踪号码", trackButton: "跟踪", status: "状态", location: "当前位置", destination: "目的地", estimatedDelivery: "预计送达", contact: "如需帮助，请通过 QQ 联系我们的派送员，QQ号: 3940893022（QQID: 4580Anton）", notFound: "未找到追踪号码。" } };

const t = translations[language];

const handleTrack = async () => { const docRef = doc(db, "tracking", trackingNumber.toUpperCase()); const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  setTrackingInfo(docSnap.data());
} else {
  setTrackingInfo({ error: t.notFound });
}

};

return ( <div className="app" style={{ backgroundImage: url(${planeBackground}) }} > <div className="logo-container"> <img src={logo} alt="SwiftAir Logo" className="logo" /> <button className="lang-toggle" onClick={() => setLanguage(language === "en" ? "zh" : "en")}> {language === "en" ? "中文" : "EN"} </button> </div>

<div className="overlay">
    <h1>{t.title}</h1>
    <p>{t.subtitle}</p>
    <div className="tracker">
      <input
        type="text"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
        placeholder={t.placeholder}
      />
      <button onClick={handleTrack}>{t.trackButton}</button>
    </div>

    {trackingInfo && (
      <div className="tracking-result">
        {trackingInfo.error ? (
          <p>{trackingInfo.error}</p>
        ) : (
          <>
            <p><strong>{t.status}:</strong> {language === "zh" ? trackingInfo.status_zh : trackingInfo.status}</p>
            <p><strong>{t.location}:</strong> {language === "zh" ? trackingInfo.location_zh : trackingInfo.location}</p>
            <p><strong>{t.destination}:</strong> {language === "zh" ? trackingInfo.destination_zh : trackingInfo.destination}</p>
            <p><strong>{t.estimatedDelivery}:</strong> {trackingInfo.estimatedDelivery}</p>
            <p>{t.contact}</p>
          </>
        )}
      </div>
    )}
  </div>
</div>

); }

export default App;

