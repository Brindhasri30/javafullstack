import React, { useState } from "react";
import API from "../utils/api";

export default function ReportIssue() {
  const [form, setForm] = useState({ title: "", description: "", location: "", category: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const email = localStorage.getItem("email") || "";
      await API.post("/issues", { ...form, email });
      setSuccess(true);
      setForm({ title: "", description: "", location: "", category: "" });
      setTimeout(() => setSuccess(false), 4000);
    } catch {
      alert("Failed to report issue");
    } finally { setLoading(false); }
  };

  const cats = [
    { value:"Road", icon:"🛣️" }, { value:"Garbage", icon:"🗑️" },
    { value:"Water", icon:"💧" }, { value:"Electricity", icon:"⚡" },
    { value:"Drainage", icon:"🌊" }, { value:"Other", icon:"📌" },
  ];

  return (
    <div style={{ background:"#f1f5f9", minHeight:"calc(100vh - 60px)", padding:"40px 24px" }}>
      <div style={{ maxWidth:"640px", margin:"0 auto" }}>
        <div style={{ marginBottom:"28px" }}>
          <h2 style={{ fontSize:"1.6rem", fontWeight:800, color:"#0f172a", margin:0 }}>📣 Report an Issue</h2>
          <p style={{ color:"#64748b", marginTop:"6px" }}>Help us improve your community by reporting civic issues.</p>
        </div>

        {success && (
          <div style={{ background:"#d1fae5", border:"1px solid #6ee7b7", borderRadius:"10px", padding:"14px 18px", marginBottom:"24px", color:"#065f46", fontWeight:600 }}>
            ✅ Issue reported successfully! Our team will look into it.
          </div>
        )}

        <div style={{ background:"#fff", borderRadius:"12px", border:"1px solid #e2e8f0", boxShadow:"0 4px 24px rgba(0,0,0,0.07)", padding:"32px" }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom:"20px" }}>
              <label style={{ display:"block", fontWeight:600, fontSize:"0.9rem", color:"#374151", marginBottom:"8px" }}>Category</label>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"10px" }}>
                {cats.map(c => (
                  <label key={c.value} style={{
                    display:"flex", flexDirection:"column", alignItems:"center", padding:"12px 8px",
                    border: form.category === c.value ? "2px solid #2563eb" : "1.5px solid #e2e8f0",
                    borderRadius:"10px", cursor:"pointer",
                    background: form.category === c.value ? "#eff6ff" : "#fafafa",
                    transition:"all 0.15s",
                  }}>
                    <input type="radio" name="category" value={c.value} onChange={handleChange} style={{ display:"none" }} required />
                    <span style={{ fontSize:"1.5rem" }}>{c.icon}</span>
                    <span style={{ fontSize:"0.82rem", fontWeight:600, color: form.category === c.value ? "#2563eb" : "#374151", marginTop:"4px" }}>{c.value}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={{ marginBottom:"18px" }}>
              <label style={{ display:"block", fontWeight:600, fontSize:"0.9rem", color:"#374151", marginBottom:"6px" }}>Issue Title</label>
              <input name="title" value={form.title} placeholder="e.g. Large pothole on Main Street" onChange={handleChange} required />
            </div>

            <div style={{ marginBottom:"18px" }}>
              <label style={{ display:"block", fontWeight:600, fontSize:"0.9rem", color:"#374151", marginBottom:"6px" }}>Location</label>
              <input name="location" value={form.location} placeholder="e.g. 123 Main Street, near the park" onChange={handleChange} required />
            </div>

            <div style={{ marginBottom:"28px" }}>
              <label style={{ display:"block", fontWeight:600, fontSize:"0.9rem", color:"#374151", marginBottom:"6px" }}>Description</label>
              <textarea
                name="description" value={form.description}
                placeholder="Describe the issue in detail…"
                onChange={handleChange} required rows={4}
                style={{ width:"100%", resize:"vertical", fontFamily:"inherit", fontSize:"0.95rem", border:"1.5px solid #e2e8f0", borderRadius:"10px", padding:"10px 14px", outline:"none", boxSizing:"border-box" }}
              />
            </div>

            <button type="submit" disabled={loading} style={{
              width:"100%", padding:"13px",
              background: loading ? "#93c5fd" : "linear-gradient(135deg,#2563eb,#1d4ed8)",
              color:"#fff", borderRadius:"10px", fontSize:"1rem", fontWeight:700,
              boxShadow:"0 4px 14px rgba(37,99,235,0.35)", border:"none", cursor:"pointer",
            }}>
              {loading ? "Submitting…" : "📤 Submit Issue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
