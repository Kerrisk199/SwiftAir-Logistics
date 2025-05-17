import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Admin from "./Admin";

function AppRoutes() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const adminPassword = "12345678900Pp";  // Change to your actual password

  const handleAdminLogin = (password) => {
    if (password === adminPassword) {
      setIsAdminAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route
        path="/admin"
        element={
          isAdminAuthenticated ? (
            <Admin />
          ) : (
            <AdminLogin onLogin={handleAdminLogin} />
          )
        }
      />
      {/* Redirect unknown routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(password);
    setPassword("");
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "0.5rem", width: "200px", marginRight: "1rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Login
        </button>
      </form>
    </div>
  );
}

export default AppRoutes;
