import React, { useState } from "react";
import "./App.css";
import planeBackground from "./assets/full-plane-bg.jpg";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import Header from "./components/Header"; // Header with logo + language switch

function App() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [language, setLanguage] = useState("en");

  const isTranslated = language === "zh";
  const toggleTranslation = () => {
    setLanguage((prev) => (prev === "en" ? "zh" : "en"));
  };

  const translations = {
    en: {
      title: "SwiftAir Logistics Company",
      subtitle: "Track your package easily",
      placeholder: "Enter tracking number",
      trackButton: "Track",
      status: "Status",
      location: "Location",
      destination: "Destination",
      estimatedDelivery: "Estimated Delivery",
      contact: "For more inquiries, contact our agent on QQ: 3940893022 (QQID: 4580Anto)",
      notFound: "Tracking number not found.",
    },
    zh: {
      title: "SwiftAir 物流公司",
      subtitle: "轻松追踪您的包裹",
      placeholder: "输入追踪号码",
      trackButton: "查询",
      status: "状态",
      location: "位置",
      destination: "目的地",
      estimatedDelivery: "预计送达",
      contact: "如需更多咨询，请通过QQ联系我们的代理：3940893022 (QQID: 4580Anto)",
      notFound: "未找到追踪号码。",
    },
  };

  const t = translations[language];

  const handleTrack = async () => {
    if (!trackingNumber) return;

    const docRef = doc(db, "tracking", trackingNumber);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setTrackingInfo(docSnap.data());
    } else {
      setTrackingInfo({ error: t.notFound });
    }
  };

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${planeBackground})`,
      }}
    >
      {/* Header with logo and language switch */}
      <Header isTranslated={isTranslated} toggleTranslation={toggleTranslation} />

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
          <div className="tracking-result" style={{ marginTop: "20px" }}>
            {trackingInfo.error ? (
              <p>{trackingInfo.error}</p>
            ) : (
              <>
                <p>
                  <strong>{t.status}:</strong>{" "}
                  {isTranslated ? trackingInfo.status_zh || trackingInfo.status : trackingInfo.status}
                </p>
                <p>
                  <strong>{t.location}:</strong>{" "}
                  {isTranslated ? trackingInfo.location_zh || trackingInfo.location : trackingInfo.location}
                </p>
                <p>
                  <strong>{t.destination}:</strong>{" "}
                  {isTranslated ? trackingInfo.destination_zh || trackingInfo.destination : trackingInfo.destination}
                </p>
                <p>
                  <strong>{t.estimatedDelivery}:</strong>{" "}
                  {trackingInfo.estimatedDelivery}
                </p>
                <p>{t.contact}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
