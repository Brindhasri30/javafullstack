import React, { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "ROLE_USER" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/register", form);
      alert(res.data);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data || "Registration failed");
    } finally { setLoading(false); }
  };

  const s = {
    page: { minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(135deg,#eff6ff 0%,#dbeafe 100%)" },
    wrap: { width:"100%", maxWidth:"420px", padding:"0 16px" },
    card: { background:"#fff", borderRadius:"12px", border:"1px solid #e2e8f0", boxShadow:"0 4px 24px rgba(0,0,0,0.08)", padding:"36px" },
    label: { display:"block", fontWeight:600, marginBottom:"6px", fontSize:"0.9rem", color:"#374151" },
    field: { marginBottom:"18px" },
    btn: { width:"100%", padding:"12px", background:"linear-gradient(135deg,#2563eb,#1d4ed8)", color:"#fff", borderRadius:"10px", fontSize:"1rem", fontWeight:700, boxShadow:"0 4px 14px rgba(37,99,235,0.35)", border:"none", cursor:"pointer" },
    foot: { textAlign:"center", marginTop:"20px", color:"#64748b", fontSize:"0.9rem" },
  };

  return (
    <div style={s.page}>
      <div style={s.wrap}>
        <div style={{ textAlign:"center", marginBottom:"32px" }}>
          <div style={{ fontSize:"3rem", marginBottom:"8px" }}>🏛️</div>
          <h1 style={{ fontSize:"1.8rem", fontWeight:800, color:"#1e40af", margin:0 }}>CivicReport</h1>
          <p style={{ color:"#64748b", marginTop:"6px" }}>Create your account to get started.</p>
        </div>
        <div style={s.card}>
          <form onSubmit={handleSubmit}>
            <div style={s.field}>
              <label style={s.label}>Full Name</label>
              <input name="name" placeholder="John Doe" onChange={handleChange} required />
            </div>
            <div style={s.field}>
              <label style={s.label}>Email address</label>
              <input name="email" type="email" placeholder="you@example.com" onChange={handleChange} required />
            </div>
            <div style={{ ...s.field, marginBottom:"28px" }}>
              <label style={s.label}>Password</label>
              <input name="password" type="password" placeholder="••••••••" onChange={handleChange} required />
            </div>
            <div style={{ ...s.field, marginBottom:"28px" }}>
              <label style={s.label}>Account Type</label>
              <select name="role" onChange={handleChange} value={form.role} style={{ width:"100%", padding:"10px 14px", borderRadius:"10px", border:"1.5px solid #e2e8f0", fontSize:"0.95rem", fontWeight:600, background:"#f8fafc", cursor:"pointer" }}>
                <option value="ROLE_USER">👤 Citizen (User)</option>
                <option value="ROLE_WORKER">🔧 Field Worker</option>
              </select>
            </div>
            <button type="submit" disabled={loading} style={{ ...s.btn, opacity: loading ? 0.7 : 1 }}>
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>
          <p style={s.foot}>Already have an account? <a href="/login" style={{ fontWeight:600 }}>Sign in</a></p>
        </div>
      </div>
    </div>
  );
}
