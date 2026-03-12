import { useRef, useEffect } from "react";
import { HelpCircle, Send, CheckCircle2, ArrowRight, Search } from "lucide-react";
import ChatBubble from "../components/ChatBubble";
import { SEVEN_QUESTIONS } from "../constants";

export default function InterviewerAgent({ qIdx, answers, curAns, setCurAns, intDone, onAnswer, onResearch }) {
  const chatEnd = useRef(null);
  const taRef = useRef(null);

  useEffect(() => {
    if (chatEnd.current) chatEnd.current.scrollIntoView({ behavior: "smooth" });
  }, [qIdx, intDone]);

  useEffect(() => {
    if (taRef.current) {
      taRef.current.style.height = "auto";
      taRef.current.style.height = taRef.current.scrollHeight + "px";
    }
  }, [curAns]);

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: "1px solid #f3f4f6", overflow: "hidden" }}>
        <div style={{ background: "#2563eb", color: "#fff", padding: "16px 24px", display: "flex", alignItems: "center", gap: 12 }}>
          <HelpCircle size={22} />
          <div>
            <div style={{ fontWeight: 700 }}>وكيل الاستيعاب</div>
            <div style={{ fontSize: 12, color: "#bfdbfe" }}>السؤال {Math.min(qIdx + 1, 7)} من ٧</div>
          </div>
          <div style={{ marginRight: "auto", display: "flex", gap: 4 }}>
            {[0,1,2,3,4,5,6].map((i) => {
              const filled = i < qIdx || (i === qIdx && intDone);
              return <div key={i} style={{ width: 24, height: 6, borderRadius: 3, background: filled ? "#fff" : (i === qIdx && !intDone) ? "#93c5fd" : "rgba(255,255,255,0.2)" }} />;
            })}
          </div>
        </div>
        <div style={{ padding: 24, maxHeight: "calc(100vh - 420px)", minHeight: 280, overflowY: "auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <ChatBubble type="bot" text={SEVEN_QUESTIONS[0]} />
            <ChatBubble type="user" text={answers[0]} />
            {Array.from({ length: Math.min(qIdx, 6) }).map((_, idx) => {
              const qi = idx + 1;
              return (
                <div key={qi} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <ChatBubble type="bot" text={SEVEN_QUESTIONS[qi]} />
                  {answers[qi] && <ChatBubble type="user" text={answers[qi]} />}
                </div>
              );
            })}
            {!intDone && qIdx > 0 && !answers[qIdx] && <ChatBubble type="bot" text={SEVEN_QUESTIONS[qIdx]} />}
            {intDone && (
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#dcfce7", color: "#15803d", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <CheckCircle2 size={16} />
                </div>
                <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "16px 4px 16px 16px", padding: "12px 16px", maxWidth: "85%" }}>
                  <p style={{ fontSize: 14, color: "#166534", fontWeight: 500, margin: 0, lineHeight: 1.7 }}>
                    تم استيعاب جميع التفاصيل بنجاح. جاهز لتمرير الملف إلى وكيل البحث العميق.
                  </p>
                </div>
              </div>
            )}
            <div ref={chatEnd} />
          </div>
        </div>
        {!intDone && qIdx > 0 && (
          <div style={{ borderTop: "1px solid #f3f4f6", padding: 16, display: "flex", gap: 12, alignItems: "flex-end" }}>
            <textarea
              ref={taRef}
              value={curAns}
              onChange={(e) => setCurAns(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onAnswer(); } }}
              style={{ flex: 1, padding: "12px 16px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 12, resize: "none", textAlign: "right", fontSize: 14, lineHeight: 1.7, outline: "none", maxHeight: 120, boxSizing: "border-box" }}
              rows={1}
              placeholder="اكتب إجابتك..."
            />
            <button
              onClick={onAnswer}
              disabled={!curAns.trim()}
              style={{ padding: 12, background: curAns.trim() ? "#2563eb" : "#93c5fd", color: "#fff", borderRadius: 12, border: "none", cursor: curAns.trim() ? "pointer" : "not-allowed", flexShrink: 0 }}
            >
              <Send size={18} />
            </button>
          </div>
        )}
        {intDone && (
          <div style={{ borderTop: "1px solid #f3f4f6", padding: 16 }}>
            <button
              onClick={onResearch}
              style={{ width: "100%", padding: "14px 0", background: "#7c3aed", color: "#fff", borderRadius: 12, fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
            >
              <Search size={18} /> تمرير إلى وكيل البحث العميق <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
