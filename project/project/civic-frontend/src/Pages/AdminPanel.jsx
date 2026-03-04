import React, { useEffect, useState } from "react";
import API from "../utils/api";

const statusConfig = {
  OPEN:        { label:"Open",        bg:"#dbeafe", color:"#1d4ed8" },
  IN_PROGRESS: { label:"In Progress", bg:"#fef3c7", color:"#92400e" },
  RESOLVED:    { label:"Resolved",    bg:"#d1fae5", color:"#065f46" },
  CLOSED:      { label:"Closed",      bg:"#f1f5f9", color:"#475569" },
};

const catIcon = { Road:"🛣️", Garbage:"🗑️", Water:"💧", Electricity:"⚡", Drainage:"🌊", Other:"📌" };

export default function AdminPanel() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  const fetchIssues = () => {
    API.get("/issues")
      .then(res => setIssues(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchIssues(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/issues/${id}/status?status=${status}`);
      setIssues(prev => prev.map(i => i.id === id ? { ...i, status } : i));
    } catch { alert("Failed to update status"); }
  };

  const counts = issues.reduce((acc, i) => { acc[i.status] = (acc[i.status] || 0) + 1; return acc; }, {});
  const filtered = filter === "ALL" ? issues : issues.filter(i => i.status === filter);

  const StatCard = ({ label, count, bg, color }) => (
    <div style={{ background:"#fff", borderRadius:"12px", border:"1px solid #e2e8f0", padding:"20px 24px", flex:1, minWidth:"130px" }}>
      <div style={{ fontSize:"1.8rem", fontWeight:800, color }}>{count || 0}</div>
      <div style={{ fontSize:"0.85rem", color:"#64748b", fontWeight:600, marginTop:"4px" }}>{label}</div>
    </div>
  );

  return (
    <div style={{ background:"#f1f5f9", minHeight:"calc(100vh - 60px)", padding:"40px 24px" }}>
      <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
        <div style={{ marginBottom:"28px" }}>
          <h2 style={{ fontSize:"1.6rem", fontWeight:800, color:"#0f172a", margin:0 }}>🛡️ Admin Panel</h2>
          <p style={{ color:"#64748b", marginTop:"6px" }}>Manage and update all reported civic issues.</p>
        </div>

        <div style={{ display:"flex", gap:"16px", marginBottom:"28px", flexWrap:"wrap" }}>
          <StatCard label="Total" count={issues.length} color="#2563eb" />
          <StatCard label="Open" count={counts.OPEN} color="#1d4ed8" />
          <StatCard label="In Progress" count={counts.IN_PROGRESS} color="#92400e" />
          <StatCard label="Resolved" count={counts.RESOLVED} color="#065f46" />
        </div>

        <div style={{ display:"flex", gap:"8px", marginBottom:"20px", flexWrap:"wrap" }}>
          {["ALL","OPEN","IN_PROGRESS","RESOLVED","CLOSED"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding:"7px 16px",
              background: filter === f ? "#2563eb" : "#fff",
              color: filter === f ? "#fff" : "#374151",
              border: "1.5px solid " + (filter === f ? "#2563eb" : "#e2e8f0"),
              borderRadius:"8px", fontWeight:600, fontSize:"0.85rem", cursor:"pointer",
            }}>{f.replace("_"," ")}</button>
          ))}
        </div>

        {loading && <p style={{ color:"#64748b" }}>Loading…</p>}

        <div style={{ background:"#fff", borderRadius:"12px", border:"1px solid #e2e8f0", overflow:"hidden", boxShadow:"0 2px 8px rgba(0,0,0,0.05)" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"0.9rem" }}>
            <thead>
              <tr style={{ background:"#f8fafc", borderBottom:"1.5px solid #e2e8f0" }}>
                {["#","Category","Title","Location","Reported By","Status","Action"].map(h => (
                  <th key={h} style={{ padding:"14px 16px", textAlign:"left", fontWeight:700, color:"#374151", fontSize:"0.82rem", textTransform:"uppercase", letterSpacing:"0.04em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((issue, idx) => {
                const st = statusConfig[issue.status] || statusConfig.OPEN;
                return (
                  <tr key={issue.id} style={{ borderBottom:"1px solid #f1f5f9", transition:"background 0.1s" }}
                    onMouseOver={e => e.currentTarget.style.background="#f8fafc"}
                    onMouseOut={e => e.currentTarget.style.background="transparent"}
                  >
                    <td style={{ padding:"14px 16px", color:"#94a3b8", fontWeight:600 }}>#{issue.id}</td>
                    <td style={{ padding:"14px 16px" }}><span style={{ fontSize:"1.3rem" }}>{catIcon[issue.category] || "📌"}</span></td>
                    <td style={{ padding:"14px 16px", fontWeight:600, color:"#0f172a", maxWidth:"200px" }}>
                      <div style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{issue.title}</div>
                      <div style={{ fontSize:"0.8rem", color:"#94a3b8", marginTop:"2px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{issue.description}</div>
                    </td>
                    <td style={{ padding:"14px 16px", color:"#475569", maxWidth:"150px" }}>
                      <div style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{issue.location}</div>
                    </td>
                    <td style={{ padding:"14px 16px", color:"#475569", fontSize:"0.85rem" }}>{issue.user?.email || "-"}</td>
                    <td style={{ padding:"14px 16px" }}>
                      <span style={{ padding:"4px 10px", borderRadius:"999px", fontSize:"0.78rem", fontWeight:700, background:st.bg, color:st.color }}>
                        {st.label}
                      </span>
                    </td>
                    <td style={{ padding:"14px 16px" }}>
                      <select
                        value={issue.status}
                        onChange={e => updateStatus(issue.id, e.target.value)}
                        style={{ padding:"6px 10px", borderRadius:"8px", border:"1.5px solid #e2e8f0", fontSize:"0.85rem", cursor:"pointer", background:"#f8fafc", fontWeight:600 }}
                      >
                        <option value="OPEN">Open</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="RESOLVED">Resolved</option>
                        <option value="CLOSED">Closed</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
              {!loading && filtered.length === 0 && (
                <tr><td colSpan={7} style={{ padding:"40px", textAlign:"center", color:"#94a3b8" }}>No issues found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

