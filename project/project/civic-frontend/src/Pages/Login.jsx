import React, { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      const token = res.data;
      localStorage.setItem("token", token);
      let role = "ROLE_USER";
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        role = payload.role || (payload.roles && payload.roles[0]) || "ROLE_USER";
      } catch { role = "ROLE_USER"; }
      localStorage.setItem("role", role);
      localStorage.setItem("email", form.email);
      if (role === "ROLE_ADMIN") navigate("/admin");
      else if (role === "ROLE_WORKER") navigate("/worker");
      else navigate("/report");
    } catch (err) {
      alert(err.response?.data || "Login failed");
    } finally { setLoading(false); }
  };

  const s = {
    page: { minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(135deg,#eff6ff 0%,#dbeafe 100%)" },
    wrap: { width:"100%", maxWidth:"420px", padding:"0 16px" },
    icon: { fontSize:"3rem", marginBottom:"8px" },
    title: { fontSize:"1.8rem", fontWeight:800, color:"#1e40af", margin:0 },
    sub: { color:"#64748b", marginTop:"6px" },
    card: { background:"#fff", borderRadius:"12px", border:"1px solid #e2e8f0", boxShadow:"0 4px 24px rgba(0,0,0,0.08)", padding:"36px" },
    label: { display:"block", fontWeight:600, marginBottom:"6px", fontSize:"0.9rem", color:"#374151" },
    field: { marginBottom:"20px" },
    btn: { width:"100%", padding:"12px", background:"linear-gradient(135deg,#2563eb,#1d4ed8)", color:"#fff", borderRadius:"10px", fontSize:"1rem", fontWeight:700, boxShadow:"0 4px 14px rgba(37,99,235,0.35)", border:"none", cursor:"pointer" },
    foot: { textAlign:"center", marginTop:"20px", color:"#64748b", fontSize:"0.9rem" },
  };

  return (
    <div style={s.page}>
      <div style={s.wrap}>
        <div style={{ textAlign:"center", marginBottom:"32px" }}>
          <div style={s.icon}>🏛️</div>
          <h1 style={s.title}>CivicReport</h1>
          <p style={s.sub}>Welcome back! Sign in to your account.</p>
        </div>
        <div style={s.card}>
          <form onSubmit={handleSubmit}>
            <div style={s.field}>
              <label style={s.label}>Email address</label>
              <input name="email" type="email" placeholder="you@example.com" onChange={handleChange} required />
            </div>
            <div style={{ ...s.field, marginBottom:"28px" }}>
              <label style={s.label}>Password</label>
              <input name="password" type="password" placeholder="••••••••" onChange={handleChange} required />
            </div>
            <button type="submit" disabled={loading} style={{ ...s.btn, opacity: loading ? 0.7 : 1 }}>
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
          <p style={s.foot}>Don't have an account? <a href="/register" style={{ fontWeight:600 }}>Register</a></p>
        </div>
      </div>
    </div>
  );
}
