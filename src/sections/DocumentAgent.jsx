import { FileText, Loader2, CheckCircle2, Copy, Download, Check, Sparkles } from "lucide-react";
import SmallBtn from "../components/SmallBtn";
import { renderMd } from "../utils/renderMd";

export default function DocumentAgent({ generating, prd, prdDone, copied, onCopy, onDownload, onReset }) {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: "1px solid #f3f4f6", overflow: "hidden" }}>
        <div style={{ background: "#059669", color: "#fff", padding: "16px 24px", display: "flex", alignItems: "center", gap: 12 }}>
          <FileText size={22} />
          <div>
            <div style={{ fontWeight: 700 }}>وكيل إنتاج المستند</div>
            <div style={{ fontSize: 12, color: "#6ee7b7" }}>{generating ? "جاري الإنتاج..." : prdDone ? "اكتمل المستند" : ""}</div>
          </div>
        </div>
        <div style={{ padding: 24, maxHeight: "calc(100vh - 380px)", minHeight: 280, overflowY: "auto" }}>
          {generating && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "64px 0", gap: 16 }}>
              <Loader2 size={48} style={{ color: "#059669", animation: "spin 1s linear infinite" }} />
              <p style={{ color: "#374151", fontWeight: 500, margin: 0 }}>جاري إنتاج مستند التخطيط...</p>
              <p style={{ color: "#9ca3af", fontSize: 14, margin: 0 }}>قد يستغرق دقيقة</p>
            </div>
          )}
          {prd && (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid #f3f4f6" }}>
                <span style={{ color: "#16a34a", fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
                  <CheckCircle2 size={16} /> مستند التخطيط جاهز
                </span>
                <div style={{ display: "flex", gap: 4 }}>
                  <SmallBtn onClick={onCopy}>{copied ? <Check size={16} /> : <Copy size={16} />}</SmallBtn>
                  <SmallBtn onClick={onDownload}><Download size={16} /></SmallBtn>
                </div>
              </div>
              <div style={{ lineHeight: 1.8, textAlign: "right" }} dangerouslySetInnerHTML={{ __html: renderMd(prd) }} />
            </div>
          )}
        </div>
        {prdDone && (
          <div style={{ borderTop: "1px solid #f3f4f6", padding: 16 }}>
            <button
              onClick={onReset}
              style={{ width: "100%", padding: "12px 0", background: "#f3f4f6", color: "#374151", borderRadius: 12, fontWeight: 500, fontSize: 15, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
            >
              <Sparkles size={16} /> بدء طلب جديد
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
