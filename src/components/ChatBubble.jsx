import { Bot, User } from "lucide-react";

export default function ChatBubble({ type, text }) {
  if (!text) return null;
  const isBot = type === "bot";
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", justifyContent: isBot ? "flex-start" : "flex-end" }}>
      {isBot && (
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
          <Bot size={16} />
        </div>
      )}
      <div style={{
        background: isBot ? "#eff6ff" : "#f3f4f6",
        borderRadius: isBot ? "16px 4px 16px 16px" : "16px 16px 4px 16px",
        padding: "12px 16px", maxWidth: "85%",
      }}>
        <p style={{ fontSize: 14, color: isBot ? "#374151" : "#1f2937", margin: 0, lineHeight: 1.7 }}>{text}</p>
      </div>
      {!isBot && (
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#e5e7eb", color: "#4b5563", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
          <User size={16} />
        </div>
      )}
    </div>
  );
}
