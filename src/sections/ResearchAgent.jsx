import { Search, Loader2, CheckCircle2, Copy, Download, Check, ArrowRight, FileText } from "lucide-react";
import SmallBtn from "../components/SmallBtn";
import { renderMd } from "../utils/renderMd";

export default function ResearchAgent({ researching, report, resDone, copied, onCopy, onDownload, onPRD }) {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: "1px solid #f3f4f6", overflow: "hidden" }}>
        <div style={{ background: "#7c3aed", color: "#fff", padding: "16px 24px", display: "flex", alignItems: "center", gap: 12 }}>
          <Search size={22} />
          <div>
            <div style={{ fontWeight: 700 }}>وكيل البحث العميق</div>
            <div style={{ fontSize: 12, color: "#c4b5fd" }}>{researching ? "جاري البحث..." : "اكتمل البحث"}</div>
          </div>
        </div>
        <div style={{ padding: 24, maxHeight: "calc(100vh - 380px)", minHeight: 280, overflowY: "auto" }}>
          {researching && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "64px 0", gap: 16 }}>
              <Loader2 size={48} style={{ color: "#7c3aed", animation: "spin 1s linear infinite" }} />
              <p style={{ color: "#374151", fontWeight: 500, margin: 0 }}>جاري البحث العميق...</p>
              <p style={{ color: "#9ca3af", fontSize: 14, margin: 0 }}>قد يستغرق دقيقة أو أكثر</p>
            </div>
          )}
          {report && (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid #f3f4f6" }}>
                <span style={{ color: "#16a34a", fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
                  <CheckCircle2 size={16} /> اكتمل تقرير البحث
                </span>
                <div style={{ display: "flex", gap: 4 }}>
                  <SmallBtn onClick={onCopy}>{copied ? <Check size={16} /> : <Copy size={16} />}</SmallBtn>
                  <SmallBtn onClick={onDownload}><Download size={16} /></SmallBtn>
                </div>
              </div>
              <div style={{ lineHeight: 1.8, textAlign: "right" }} dangerouslySetInnerHTML={{ __html: renderMd(report) }} />
            </div>
          )}
        </div>
        {resDone && (
          <div style={{ borderTop: "1px solid #f3f4f6", padding: 16 }}>
            <button
              onClick={onPRD}
              style={{ width: "100%", padding: "14px 0", background: "#059669", color: "#fff", borderRadius: 12, fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
            >
              <FileText size={18} /> تمرير إلى وكيل إنتاج المستند <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
