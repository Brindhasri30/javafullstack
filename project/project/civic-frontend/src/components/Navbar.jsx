import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!token) return null;

  const navLink = (to, label) => (
    <Link
      to={to}
      style={{
        color: location.pathname === to ? "#fff" : "rgba(255,255,255,0.75)",
        fontWeight: location.pathname === to ? 700 : 500,
        fontSize: "0.92rem",
        padding: "6px 12px",
        borderRadius: "6px",
        background: location.pathname === to ? "rgba(255,255,255,0.15)" : "transparent",
        transition: "all 0.15s",
        textDecoration: "none",
      }}
    >
      {label}
    </Link>
  );

  return (
    <nav style={{
      background: "linear-gradient(135deg, #1e40af 0%, #2563eb 100%)",
      padding: "0 24px",
      display: "flex",
      alignItems: "center",
      height: "60px",
      boxShadow: "0 2px 8px rgba(37,99,235,0.3)",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginRight: "32px" }}>
        <span style={{ fontSize: "1.4rem" }}>🏛️</span>
        <span style={{ color: "#fff", fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.01em" }}>
          CivicReport
        </span>
      </div>

      <div style={{ display: "flex", gap: "4px", flex: 1 }}>
        {role === "ROLE_USER" && (
          <>
            {navLink("/report", "Report Issue")}
            {navLink("/my-complaints", "My Complaints")}
          </>
        )}
        {role === "ROLE_ADMIN" && navLink("/admin", "Admin Panel")}
        {role === "ROLE_WORKER" && navLink("/worker", "Worker Panel")}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.85rem" }}>{email}</span>
        <button
          onClick={handleLogout}
          style={{
            background: "rgba(255,255,255,0.15)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.3)",
            padding: "6px 16px",
            borderRadius: "6px",
            fontSize: "0.85rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.15s",
          }}
          onMouseOver={e => e.target.style.background = "rgba(255,255,255,0.25)"}
          onMouseOut={e => e.target.style.background = "rgba(255,255,255,0.15)"}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
