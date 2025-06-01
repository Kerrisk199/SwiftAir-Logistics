import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";
import Header from "./components/Header";
import { setTrackingDetails } from "./firebase";

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
  const [packageImage, setPackageImage] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

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

  const handleImageUpload = async (file) => {
    const cloudName = "drsmangjc";
    const uploadPreset = "package_uploads";
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!trackingNumber) {
      alert("Tracking number is required");
      return;
    }

    try {
      let imageUrl = existingImageUrl;

      if (packageImage) {
        imageUrl = await handleImageUpload(packageImage);
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

      if (imageUrl) {
        entry.imageUrl = imageUrl;
      }

      await setTrackingDetails(trackingNumber, entry);

      showToast(editId ? "Tracking updated successfully!" : "Tracking added successfully!");

      setEditId(null);
      setTrackingNumber("");
      setStatus("");
      setStatusZh("");
      setLocation("");
      setLocationZh("");
      setDestination("");
      setDestinationZh("");
      setEstimatedDelivery("");
      setPackageImage(null);
      setExistingImageUrl(null);

      fetchTrackingData();
    } catch (error) {
      console.error("Error saving data:", error);
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
    setExistingImageUrl(item.imageUrl || null);
    setPackageImage(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this tracking entry?")) {
      await deleteDoc(doc(db, "tracking", id));
      showToast("Tracking entry deleted");
      fetchTrackingData();
    }
  };

  const toggleTranslation = () => {
    setIsTranslated((prev) => !prev);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "80px auto 0" }}>
      <Header isTranslated={isTranslated} toggleTranslation={toggleTranslation} />
      <h2>Admin Panel - Manage Tracking Info</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tracking Number"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          disabled={editId !== null}
        />
        <input
          type="text"
          placeholder="Status (English)"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <input
          type="text"
          placeholder="Status (Chinese)"
          value={status_zh}
          onChange={(e) => setStatusZh(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location (English)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location (Chinese)"
          value={location_zh}
          onChange={(e) => setLocationZh(e.target.value)}
        />
        <input
          type="text"
          placeholder="Destination (English)"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <input
          type="text"
          placeholder="Destination (Chinese)"
          value={destination_zh}
          onChange={(e) => setDestinationZh(e.target.value)}
        />
        <input
          type="date"
          value={estimatedDelivery}
          onChange={(e) => setEstimatedDelivery(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setPackageImage(e.target.files[0])}
        />
        {existingImageUrl && (
          <div style={{ marginTop: "10px" }}>
            <img
              src={existingImageUrl}
              alt="Current"
              style={{
                maxWidth: "100%",
                maxHeight: "150px",
                borderRadius: "10px",
              }}
            />
          </div>
        )}
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
              setPackageImage(null);
              setExistingImageUrl(null);
            }}
            style={{ marginLeft: "10px", padding: "10px 20px" }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: "#4BB543",
            color: "white",
            padding: "12px 20px",
            borderRadius: "8px",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
            zIndex: 1000,
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          {toastMessage}
        </div>
      )}

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
                style={{ marginLeft: "10px" }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                style={{ marginLeft: "10px" }}
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
