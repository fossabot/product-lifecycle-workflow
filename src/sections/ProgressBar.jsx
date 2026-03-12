import { CheckCircle2 } from "lucide-react";
import { AGENTS, AGENT_COLORS, AGENT_ICONS } from "../constants";

export default function ProgressBar({ step, states }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 32 }}>
      {AGENTS.map((ag, i) => {
        const Icon = AGENT_ICONS[i];
        const active = step === i;
        const done = states[i];
        return (
          <div key={ag.id} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 130 }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                background: done ? "#dcfce7" : active ? AGENT_COLORS[i] : "#f3f4f6",
                color: done ? "#15803d" : active ? "#fff" : "#9ca3af",
                boxShadow: active ? "0 4px 12px rgba(0,0,0,0.15)" : "none",
                border: done ? "2px solid #86efac" : "2px solid transparent",
                transition: "all 0.4s",
              }}>
                {done ? <CheckCircle2 size={22} /> : <Icon size={20} />}
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, marginTop: 8, color: active ? "#111827" : done ? "#15803d" : "#9ca3af", textAlign: "center" }}>{ag.nameAr}</span>
              <span style={{ fontSize: 10, color: active ? "#6b7280" : "#d1d5db" }}>{ag.nameEn}</span>
            </div>
            {i < 2 && <div style={{ width: 48, height: 2, background: done ? "#4ade80" : "#e5e7eb", margin: "0 4px" }} />}
          </div>
        );
      })}
    </div>
  );
}
