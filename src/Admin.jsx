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
import Header from "./components/Header";

function Admin() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [status, setStatus] = useState("");
  const [status_zh, setStatusZh] = useState("");
  const [location, setLocation] = useState("");
  const [location_zh, setLocationZh] = useState("");
  const [destination, setDestination] = useState("");
  const [destination_zh, setDestinationZh] = useState("");
  const [estimatedDelivery, setEstimatedDelivery] = useState("");
  const [trackingList, setTrackingList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isTranslated, setIsTranslated] = useState(false);

  const fetchTrackingData = async () => {
    const querySnapshot = await getDocs(collection(db, "tracking"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
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
      status_zh,
      location,
      location_zh,
      destination,
      destination_zh,
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
      setStatusZh("");
      setLocation("");
      setLocationZh("");
      setDestination("");
      setDestinationZh("");
      setEstimatedDelivery("");
      fetchTrackingData();
    } catch (error) {
      console.error("Error adding/updating document:", error);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setTrackingNumber(item.id);
    setStatus(item.status || "");
    setStatusZh(item.status_zh || "");
    setLocation(item.location || "");
    setLocationZh(item.location_zh || "");
    setDestination(item.destination || "");
    setDestinationZh(item.destination_zh || "");
    setEstimatedDelivery(item.estimatedDelivery || "");
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
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
      <Header isTranslated={isTranslated} toggleTranslation={toggleTranslation} />

      <h2>Admin Panel - Manage Tracking Info</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tracking Number"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          required
          disabled={!!editId}
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
        />

        <input
          type="text"
          placeholder="Status (English)"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
        />
        <input
          type="text"
          placeholder="Status (Chinese)"
          value={status_zh}
          onChange={(e) => setStatusZh(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
        />

        <input
          type="text"
          placeholder="Location (English)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
        />
        <input
          type="text"
          placeholder="Location (Chinese)"
          value={location_zh}
          onChange={(e) => setLocationZh(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
        />

        <input
          type="text"
          placeholder="Destination (English)"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
        />
        <input
          type="text"
          placeholder="Destination (Chinese)"
          value={destination_zh}
          onChange={(e) => setDestinationZh(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
        />

        <input
          type="date"
          value={estimatedDelivery}
          onChange={(e) => setEstimatedDelivery(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
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
              setStatusZh("");
              setLocation("");
              setLocationZh("");
              setDestination("");
              setDestinationZh("");
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
              <button onClick={() => handleEdit(item)} style={{ marginLeft: "10px" }}>
                Edit
              </button>
              <button onClick={() => handleDelete(item.id)} style={{ marginLeft: "10px" }}>
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
