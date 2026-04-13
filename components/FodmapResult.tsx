import { FodmapAnalysis } from "@/types/fodmap";

const LEVEL_CONFIG = {
  low:    { bg: "#E8F5E9", border: "#C8E6C9", dot: "#4CAF50", text: "#1B5E20", label: "Low FODMAP" },
  medium: { bg: "#FFF8E1", border: "#FFE0B2", dot: "#FF9800", text: "#E65100", label: "Modéré" },
  high:   { bg: "#FFEBEE", border: "#FFCDD2", dot: "#F44336", text: "#B71C1C", label: "High FODMAP" },
};

export default function FodmapResult({ data }: { data: FodmapAnalysis }) {
  const cfg = LEVEL_CONFIG[data.level];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

      {/* Niveau */}
      <div style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, borderRadius: "18px", padding: "18px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: "12px", color: cfg.text, letterSpacing: "0.06em", margin: "0 0 4px" }}>NIVEAU FODMAP</p>
            <p style={{ fontSize: "28px", fontWeight: 500, color: cfg.text, margin: 0, letterSpacing: "-0.03em" }}>{cfg.label}</p>
          </div>
          <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: cfg.dot, border: `2px solid ${cfg.border}` }} />
        </div>
      </div>

      {/* Portions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        <div style={{ background: "#fff", border: "1px solid #DAEAF8", borderRadius: "14px", padding: "14px" }}>
          <p style={{ fontSize: "11px", color: "#85B7EB", margin: "0 0 4px" }}>Portion analysée</p>
          <p style={{ fontSize: "20px", fontWeight: 500, color: "#0C447C", margin: 0 }}>{data.portion}g</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #DAEAF8", borderRadius: "14px", padding: "14px" }}>
          <p style={{ fontSize: "11px", color: "#85B7EB", margin: "0 0 4px" }}>Portion sûre</p>
          <p style={{ fontSize: "20px", fontWeight: 500, color: "#0C447C", margin: 0 }}>
            {data.safe_portion === 0 ? "—" : `${data.safe_portion}g`}
          </p>
        </div>
      </div>

      {/* FODMAP présents */}
      {data.fodmaps.length > 0 && (
        <div style={{ background: "#fff", border: "1px solid #DAEAF8", borderRadius: "14px", padding: "14px" }}>
          <p style={{ fontSize: "11px", color: "#85B7EB", letterSpacing: "0.06em", margin: "0 0 10px" }}>FODMAP PRÉSENTS</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {data.fodmaps.map((f) => (
              <span key={f} style={{
                background: "#E6F1FB",
                color: "#185FA5",
                border: "1px solid #B5D4F4",
                fontSize: "12px",
                padding: "5px 12px",
                borderRadius: "20px",
              }}>{f}</span>
            ))}
          </div>
        </div>
      )}

      {/* Conseil */}
      <div style={{
        background: "#fff",
        borderLeft: "3px solid #185FA5",
        borderRadius: "0 14px 14px 0",
        padding: "14px 16px",
        border: "1px solid #DAEAF8",
        borderLeftColor: "#185FA5",
        borderLeftWidth: "3px",
      }}>
        <p style={{ fontSize: "11px", color: "#85B7EB", letterSpacing: "0.06em", margin: "0 0 6px" }}>CONSEIL</p>
        <p style={{ fontSize: "13px", color: "#0C447C", lineHeight: 1.6, margin: 0 }}>{data.tips}</p>
      </div>

    </div>
  );
}