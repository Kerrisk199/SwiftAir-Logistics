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

function Admin() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [estimatedDelivery, setEstimatedDelivery] = useState("");

  // Chinese translations
  const [statusZh, setStatusZh] = useState("");
  const [locationZh, setLocationZh] = useState("");
  const [destinationZh, setDestinationZh] = useState("");
  const [estimatedDeliveryZh, setEstimatedDeliveryZh] = useState("");

  const [trackingList, setTrackingList] = useState([]);
  const [editId, setEditId] = useState(null);

  // Fetch all tracking docs from Firestore
  const fetchTrackingData = async () => {
    const querySnapshot = await getDocs(collection(db, "tracking"));
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setTrackingList(data);
  };

  useEffect(() => {
    fetchTrackingData();
  }, []);

  // Add or update a tracking entry
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
      status_zh: statusZh,
      location_zh: locationZh,
      destination_zh: destinationZh,
      estimatedDelivery_zh: estimatedDeliveryZh,
    };

    try {
      if (editId) {
        // Update existing document
        const docRef = doc(db, "tracking", editId);
        await updateDoc(docRef, entry);
        setEditId(null);
      } else {
        // Add new document with trackingNumber as ID
        const docRef = doc(db, "tracking", trackingNumber);
        await setDoc(docRef, entry);
      }
      setTrackingNumber("");
      setStatus("");
      setLocation("");
      setDestination("");
      setEstimatedDelivery("");
      setStatusZh("");
      setLocationZh("");
      setDestinationZh("");
      setEstimatedDeliveryZh("");
      fetchTrackingData();
    } catch (error) {
      console.error("Error adding/updating document:", error);
    }
  };

  // Edit an existing entry - populate the form with values
  const handleEdit = (item) => {
    setEditId(item.id);
    setTrackingNumber(item.id); // id is document ID = trackingNumber
    setStatus(item.status || "");
    setLocation(item.location || "");
    setDestination(item.destination || "");
    setEstimatedDelivery(item.estimatedDelivery || "");

    setStatusZh(item.status_zh || "");
    setLocationZh(item.location_zh || "");
    setDestinationZh(item.destination_zh || "");
    setEstimatedDeliveryZh(item.estimatedDelivery_zh || "");
  };

  // Delete a tracking entry
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this tracking entry?")) {
      await deleteDoc(doc(db, "tracking", id));
      fetchTrackingData();
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Admin Panel - Manage Tracking Info</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Tracking Number"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          required
          disabled={!!editId} // Disable editing tracking number on update
          style={{ width: "100%", marginBottom: "8px", padding: "8px" }}
        />
        <input
          type="text"
          placeholder="Status (English)"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ width: "100%", marginBottom: "8px", padding: "8px" }}
        />
        <input
          type="text"
          placeholder="Location (English)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ width: "100%", marginBottom: "8px", padding: "8px" }}
        />
        <input
          type="text"
          placeholder="Destination (English)"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={{ width: "100%", marginBottom: "8px", padding: "8px" }}
        />
        <input
          type="date"
          placeholder="Estimated Delivery (English)"
          value={estimatedDelivery}
          onChange={(e) => setEstimatedDelivery(e.target.value)}
          style={{ width: "100%", marginBottom: "8px", padding: "8px" }}
        />

        {/* Chinese inputs */}
        <input
          type="text"
          placeholder="Status (Chinese)"
          value={statusZh}
          onChange={(e) => setStatusZh(e.target.value)}
          style={{ width: "100%", marginBottom: "8px", padding: "8px" }}
        />
        <input
          type="text"
          placeholder="Location (Chinese)"
          value={locationZh}
          onChange={(e) => setLocationZh(e.target.value)}
          style={{ width: "100%", marginBottom: "8px", padding: "8px" }}
        />
        <input
          type="text"
          placeholder="Destination (Chinese)"
          value={destinationZh}
          onChange={(e) => setDestinationZh(e.target.value)}
          style={{ width: "100%", marginBottom: "8px", padding: "8px" }}
        />
        <input
          type="date"
          placeholder="Estimated Delivery (Chinese)"
          value={estimatedDeliveryZh}
          onChange={(e) => setEstimatedDeliveryZh(e.target.value)}
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
              setStatusZh("");
              setLocationZh("");
              setDestinationZh("");
              setEstimatedDeliveryZh("");
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
