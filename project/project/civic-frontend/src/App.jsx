import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ReportIssue from "./Pages/ReportIssue";
import MyComplaints from "./Pages/MyComplaints";
import AdminPanel from "./Pages/AdminPanel";
import WorkerPanel from "./Pages/WorkerPanel";
import Navbar from "./components/Navbar";

function ProtectedRoute({ element, allowedRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (!token || role !== allowedRole) return <Navigate to="/login" />;
  return element;
}

function App() {
  return (
    <Router future={{ v7_startTransition: true }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/report" element={<ProtectedRoute element={<ReportIssue />} allowedRole="ROLE_USER" />} />
        <Route path="/my-complaints" element={<ProtectedRoute element={<MyComplaints />} allowedRole="ROLE_USER" />} />
        <Route path="/admin" element={<ProtectedRoute element={<AdminPanel />} allowedRole="ROLE_ADMIN" />} />
        <Route path="/worker" element={<ProtectedRoute element={<WorkerPanel />} allowedRole="ROLE_WORKER" />} />
      </Routes>
    </Router>
  );
}

export default App;