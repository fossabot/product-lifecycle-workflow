import { Sparkles, ArrowRight } from "lucide-react";
import { AGENTS, AGENT_COLORS, AGENT_ICONS, SEVEN_QUESTIONS } from "../constants";

export default function StartPage({ idea, setIdea, onStart }) {
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", background: "#eff6ff", color: "#1d4ed8", borderRadius: 999, fontSize: 14, fontWeight: 500, marginBottom: 24 }}>
          <Sparkles size={14} />
          <span>فريق وكلاء ذكي — ٣ مراحل متتالية</span>
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 900, color: "#111827", marginBottom: 12, lineHeight: 1.3 }}>المُخطط الذكي</h1>
        <p style={{ color: "#6b7280", fontSize: 18, lineHeight: 1.8, maxWidth: 500, margin: "0 auto" }}>
          صِف ما تريد تحقيقه — أي شيء — وسيتولى فريق الوكلاء استيعاب طلبك، البحث العميق حوله، ثم إنتاج مستند تخطيط احترافي شامل
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 32 }}>
        {AGENTS.map((ag, i) => {
          const Icon = AGENT_ICONS[i];
          return (
            <div key={ag.id} style={{ background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: "1px solid #f3f4f6", textAlign: "center" }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: AGENT_COLORS[i], color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                <Icon size={18} />
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1f2937", marginBottom: 4 }}>{ag.nameAr}</div>
              <div style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.6 }}>{ag.descAr}</div>
            </div>
          );
        })}
      </div>
      <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: "1px solid #f3f4f6", padding: 24 }}>
        <label style={{ display: "block", fontSize: 14, fontWeight: 700, color: "#374151", marginBottom: 12, textAlign: "right" }}>
          {SEVEN_QUESTIONS[0]}
        </label>
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          style={{ width: "100%", padding: "12px 16px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 12, resize: "none", textAlign: "right", fontSize: 14, lineHeight: 1.8, color: "#1f2937", outline: "none", boxSizing: "border-box" }}
          rows={4}
          placeholder="مثال: أريد كتابة مقال عن تأثير الذكاء الاصطناعي على التعليم... أو: أريد بناء تطبيق لإدارة المهام..."
        />
        <button
          onClick={onStart}
          disabled={!idea.trim()}
          style={{ marginTop: 16, width: "100%", padding: "14px 0", background: idea.trim() ? "#2563eb" : "#93c5fd", color: "#fff", borderRadius: 12, fontWeight: 700, fontSize: 16, border: "none", cursor: idea.trim() ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
        >
          ابدأ المقابلة <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
