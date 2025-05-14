// src/App.jsx

import React, { useState } from "react";
import "./App.css";
import planeBackground from "./assets/full-plane-bg.jpg";

function App() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingInfo, setTrackingInfo] = useState(null);

  const handleTrack = () => {
    if (trackingNumber.toUpperCase() === "ABC123") {
      setTrackingInfo({
        status: "Waiting For Customs Clearance",
        location: "Beijing, China",
        destination: "Hebei City, Yunnan",
        estimatedDelivery: "2025-05-14",
      });
    } else {
      setTrackingInfo({
        error: "Tracking number not found.",
      });
    }
  };

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${planeBackground})`,
      }}
    >
      <div className="overlay">
        <h1>SwiftAir Logistics Company</h1>
        <p>Track your shipment instantly</p>
        <div className="tracker">
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Enter tracking number"
          />
          <button onClick={handleTrack}>Track</button>
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
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
