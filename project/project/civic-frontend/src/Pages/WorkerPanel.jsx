import React, { useEffect, useState } from "react";
import API from "../utils/api";

const statusConfig = {
  OPEN:        { label:"Open",        bg:"#dbeafe", color:"#1d4ed8" },
  IN_PROGRESS: { label:"In Progress", bg:"#fef3c7", color:"#92400e" },
  RESOLVED:    { label:"Resolved",    bg:"#d1fae5", color:"#065f46" },
  CLOSED:      { label:"Closed",      bg:"#f1f5f9", color:"#475569" },
};

const catIcon = { Road:"🛣️", Garbage:"🗑️", Water:"💧", Electricity:"⚡", Drainage:"🌊", Other:"📌" };

export default function WorkerPanel() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/issues")
      .then(res => setIssues(res.data.filter(i => i.status === "OPEN" || i.status === "IN_PROGRESS")))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const markInProgress = async (id) => {
    try {
      await API.put(`/issues/${id}/status?status=IN_PROGRESS`);
      setIssues(prev => prev.map(i => i.id === id ? { ...i, status:"IN_PROGRESS" } : i));
    } catch { alert("Failed to update"); }
  };

  const markResolved = async (id) => {
    try {
      await API.put(`/issues/${id}/status?status=RESOLVED`);
      setIssues(prev => prev.filter(i => i.id !== id));
    } catch { alert("Failed to update"); }
  };

  return (
    <div style={{ background:"#f1f5f9", minHeight:"calc(100vh - 60px)", padding:"40px 24px" }}>
      <div style={{ maxWidth:"900px", margin:"0 auto" }}>
        <div style={{ marginBottom:"28px" }}>
          <h2 style={{ fontSize:"1.6rem", fontWeight:800, color:"#0f172a", margin:0 }}>🛠️ Worker Panel</h2>
          <p style={{ color:"#64748b", marginTop:"6px" }}>Issues assigned for field resolution.</p>
        </div>

        {loading && <p style={{ color:"#64748b" }}>Loading…</p>}

        {!loading && issues.length === 0 && (
          <div style={{ textAlign:"center", padding:"60px 20px", background:"#fff", borderRadius:"12px", border:"1px solid #e2e8f0" }}>
            <div style={{ fontSize:"3rem", marginBottom:"12px" }}>✅</div>
            <p style={{ color:"#64748b", fontWeight:600 }}>All caught up! No pending issues.</p>
          </div>
        )}

        <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
          {issues.map(issue => {
            const st = statusConfig[issue.status] || statusConfig.OPEN;
            return (
              <div key={issue.id} style={{
                background:"#fff", borderRadius:"12px", border:"1px solid #e2e8f0",
                boxShadow:"0 2px 8px rgba(0,0,0,0.05)", padding:"20px 24px",
              }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"12px" }}>
                  <div style={{ display:"flex", gap:"14px", alignItems:"flex-start" }}>
                    <div style={{ fontSize:"2rem" }}>{catIcon[issue.category] || "📌"}</div>
                    <div>
                      <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"4px" }}>
                        <h3 style={{ margin:0, fontSize:"1.05rem", fontWeight:700, color:"#0f172a" }}>{issue.title}</h3>
                        <span style={{ padding:"3px 10px", borderRadius:"999px", fontSize:"0.78rem", fontWeight:700, background:st.bg, color:st.color }}>{st.label}</span>
                      </div>
                      <p style={{ margin:"0 0 6px", color:"#475569", fontSize:"0.9rem" }}>{issue.description}</p>
                      <span style={{ fontSize:"0.82rem", color:"#94a3b8" }}>📍 {issue.location}</span>
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:"8px" }}>
                    {issue.status === "OPEN" && (
                      <button onClick={() => markInProgress(issue.id)} style={{
                        padding:"8px 16px", background:"#fef3c7", color:"#92400e",
                        border:"1.5px solid #fcd34d", borderRadius:"8px", fontWeight:700, fontSize:"0.85rem", cursor:"pointer",
                      }}>⏳ Start Work</button>
                    )}
                    <button onClick={() => markResolved(issue.id)} style={{
                      padding:"8px 16px", background:"#d1fae5", color:"#065f46",
                      border:"1.5px solid #6ee7b7", borderRadius:"8px", fontWeight:700, fontSize:"0.85rem", cursor:"pointer",
                    }}>✅ Mark Resolved</button>
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

