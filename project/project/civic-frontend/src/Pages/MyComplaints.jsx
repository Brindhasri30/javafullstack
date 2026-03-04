import React, { useEffect, useState } from "react";
import API from "../utils/api";

const statusConfig = {
  OPEN:        { label:"Open",        bg:"#dbeafe", color:"#1d4ed8", icon:"🟦" },
  IN_PROGRESS: { label:"In Progress", bg:"#fef3c7", color:"#92400e", icon:"🟡" },
  RESOLVED:    { label:"Resolved",    bg:"#d1fae5", color:"#065f46", icon:"🟢" },
  CLOSED:      { label:"Closed",      bg:"#f1f5f9", color:"#475569", icon:"⚪" },
};

const catIcon = { Road:"🛣️", Garbage:"🗑️", Water:"💧", Electricity:"⚡", Drainage:"🌊", Other:"📌" };

export default function MyComplaints() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem("email") || "";
    API.get(`/issues/my?email=${email}`)
      .then(res => setIssues(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ background:"#f1f5f9", minHeight:"calc(100vh - 60px)", padding:"40px 24px" }}>
      <div style={{ maxWidth:"800px", margin:"0 auto" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"28px" }}>
          <div>
            <h2 style={{ fontSize:"1.6rem", fontWeight:800, color:"#0f172a", margin:0 }}>📋 My Complaints</h2>
            <p style={{ color:"#64748b", marginTop:"6px" }}>{issues.length} issue{issues.length !== 1 ? "s" : ""} reported</p>
          </div>
          <a href="/report" style={{
            padding:"10px 20px", background:"linear-gradient(135deg,#2563eb,#1d4ed8)",
            color:"#fff", borderRadius:"10px", fontWeight:700, fontSize:"0.9rem",
            boxShadow:"0 4px 14px rgba(37,99,235,0.3)", textDecoration:"none",
          }}>+ New Issue</a>
        </div>

        {loading && <p style={{ color:"#64748b", textAlign:"center" }}>Loading…</p>}

        {!loading && issues.length === 0 && (
          <div style={{ textAlign:"center", padding:"60px 20px", background:"#fff", borderRadius:"12px", border:"1px solid #e2e8f0" }}>
            <div style={{ fontSize:"3rem", marginBottom:"12px" }}>📬</div>
            <p style={{ color:"#64748b", fontWeight:600 }}>No complaints yet. Start by reporting an issue!</p>
          </div>
        )}

        <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
          {issues.map(issue => {
            const st = statusConfig[issue.status] || statusConfig.OPEN;
            return (
              <div key={issue.id} style={{
                background:"#fff", borderRadius:"12px", border:"1px solid #e2e8f0",
                boxShadow:"0 2px 8px rgba(0,0,0,0.05)", padding:"20px 24px",
                display:"flex", gap:"16px", alignItems:"flex-start",
              }}>
                <div style={{ fontSize:"2rem", lineHeight:1 }}>{catIcon[issue.category] || "📌"}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"10px", flexWrap:"wrap", marginBottom:"6px" }}>
                    <h3 style={{ margin:0, fontSize:"1.05rem", fontWeight:700, color:"#0f172a" }}>{issue.title}</h3>
                    <span style={{ padding:"3px 10px", borderRadius:"999px", fontSize:"0.78rem", fontWeight:700, background:st.bg, color:st.color }}>
                      {st.icon} {st.label}
                    </span>
                  </div>
                  <p style={{ margin:"0 0 8px", color:"#475569", fontSize:"0.9rem" }}>{issue.description}</p>
                  <div style={{ display:"flex", gap:"16px", fontSize:"0.82rem", color:"#94a3b8" }}>
                    <span>📍 {issue.location}</span>
                    {issue.category && <span>🏷️ {issue.category}</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
