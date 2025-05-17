import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";
import logo from "./assets/swiftair-logo.png";  // Correct path and filename

function Admin() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [estimatedDelivery, setEstimatedDelivery] = useState("");
  const [trackingList, setTrackingList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isTranslated, setIsTranslated] = useState(false);

  const fetchTrackingData = async () => {
    const querySnapshot = await getDocs(collection(db, "tracking"));
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setTrackingList(data);
  };

  useEffect(() => {
    fetchTrackingData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!trackingNumber) {
      alert("Tracking number is required");
      return;
    }

    const entry = {
      status,
      location,
      destination,
      estimatedDelivery,
    };

    try {
      if (editId) {
        const docRef = doc(db, "tracking", editId);
        await updateDoc(docRef, entry);
        setEditId(null);
      } else {
        const docRef = doc(db, "tracking", trackingNumber);
        await setDoc(docRef, entry);
      }
      setTrackingNumber("");
      setStatus("");
      setLocation("");
      setDestination("");
      setEstimatedDelivery("");
      fetchTrackingData();
    } catch (error) {
      console.error("Error adding/updating document:", error);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setTrackingNumber(item.id);
    setStatus(item.status);
    setLocation(item.location);
    setDestination(item.destination);
    setEstimatedDelivery(item.estimatedDelivery);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this tracking entry?")) {
      await deleteDoc(doc(db, "tracking", id));
      fetchTrackingData();
    }
  };

  const toggleTranslation = () => {
    setIsTranslated((prev) => !prev);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      {/* Header with logo left and translator toggle right */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px"
      }}>
        {/* Logo on left */}
        <img
          src={logo}
          alt="SwiftAir Logo"
          style={{ height: "40px", cursor: "pointer" }}
          onClick={() => window.location.reload()}
        />

        {/* Translator toggle on right */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <label
            htmlFor="translator-toggle"
            style={{ marginRight: "8px", color: "#007bff", fontWeight: "600" }}
          >
            Translate
          </label>
          <input
            id="translator-toggle"
            type="checkbox"
            checked={isTranslated}
            onChange={toggleTranslation}
            style={{
              width: "40px",
              height: "20px",
              cursor: "pointer",
              accentColor: "#007bff"  // Blue color for switch
            }}
          />
        </div>
      </div>

      <h2>Admin Panel - Manage Tracking Info</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Tracking Number"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          required
          disabled={!!editId}
          style={{ width: "100%", marginBottom: "8px", padding: "8px" }}
        />
        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ width: "100%", marginBottom: "8px", padding: "8px" }}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ width: "100%", marginBottom: "8px", padding: "8px" }}
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={{ width: "100%", marginBottom: "8px", padding: "8px" }}
        />
        <input
          type="date"
          placeholder="Estimated Delivery"
          value={estimatedDelivery}
          onChange={(e) => setEstimatedDelivery(e.target.value)}
          style={{ width: "100%", marginBottom: "8px", padding: "8px" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>
          {editId ? "Update Tracking" : "Add Tracking"}
        </button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setTrackingNumber("");
              setStatus("");
              setLocation("");
              setDestination("");
              setEstimatedDelivery("");
            }}
            style={{ marginLeft: "10px", padding: "10px 20px" }}
          >
            Cancel
          </button>
        )}
      </form>

      <h3>Existing Tracking Entries</h3>
      {trackingList.length === 0 ? (
        <p>No tracking data found.</p>
      ) : (
        <ul>
          {trackingList.map((item) => (
            <li key={item.id} style={{ marginBottom: "10px" }}>
              <strong>{item.id}</strong> - {item.status} | {item.location}
              <button
                onClick={() => handleEdit(item)}
                style={{ marginLeft: "10px", padding: "2px 8px" }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                style={{ marginLeft: "5px", padding: "2px 8px", color: "red" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Admin;
