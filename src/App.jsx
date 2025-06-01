import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./App.css";
import { getTrackingDetails } from "./firebase";
import logo from "./assets/swiftair-logo.png";
import planeBackground from "./assets/full-plane-bg.jpg";

function App() {
  const { i18n, t } = useTranslation();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [isTranslated, setIsTranslated] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const handleTrack = async () => {
    const data = await getTrackingDetails(trackingNumber);
    setTrackingInfo(data);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "zh" : "en";
    i18n.changeLanguage(newLang);
    setIsTranslated(newLang === "zh");
  };

  return (
    <div
      className="app"
      style={{ backgroundImage: `url(${planeBackground})` }}
    >
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
        <button onClick={toggleLanguage} className="language-toggle">
          {i18n.language === "en" ? "切换到中文" : "Switch to English"}
        </button>
      </div>

      <div className="content">
        <div className="tracker">
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder={t("trackPackagePlaceholder")}
            style={{
              backgroundColor: "white",
              color: "black",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "100%",
              maxWidth: "400px",
              fontSize: "16px"
            }}
          />
          <button onClick={handleTrack}>{t("trackPackageButton")}</button>
        </div>

        {trackingInfo && (
          <div className="tracking-result" style={{ marginTop: "20px" }}>
            {trackingInfo.error ? (
              <p>{trackingInfo.error}</p>
            ) : (
              <>
                <p>
                  <strong>{t("statusLabel")}:</strong>{" "}
                  {isTranslated
                    ? trackingInfo.status_zh || trackingInfo.status
                    : trackingInfo.status}
                </p>
                <p>
                  <strong>{t("locationLabel")}:</strong>{" "}
                  {isTranslated
                    ? trackingInfo.location_zh || trackingInfo.location
                    : trackingInfo.location}
                </p>
                <p>
                  <strong>{t("destinationLabel")}:</strong>{" "}
                  {isTranslated
                    ? trackingInfo.destination_zh || trackingInfo.destination
                    : trackingInfo.destination}
                </p>
                <p>
                  <strong>{t("estimatedDeliveryLabel")}:</strong>{" "}
                  {trackingInfo.estimatedDelivery}
                </p>

                <button
                  onClick={() => setShowImage(true)}
                  style={{
                    marginTop: "15px",
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  {t("viewPackageButton")}
                </button>

                {showImage && (
                  <div
                    onClick={() => setShowImage(false)}
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "rgba(0,0,0,0.7)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 9999,
                    }}
                  >
                    {trackingInfo.imageUrl ? (
                      <img
                        src={trackingInfo.imageUrl}
                        alt="Package"
                        style={{
                          maxWidth: "90%",
                          maxHeight: "90%",
                          borderRadius: "10px",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          background: "white",
                          padding: "20px",
                          borderRadius: "10px",
                          color: "black",
                        }}
                      >
                        {t("noImageAvailable")}
                      </div>
                    )}
                  </div>
                )}

                <p style={{ marginTop: "20px" }}>{t("contactInfo")}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
