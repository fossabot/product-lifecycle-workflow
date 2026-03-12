export default function SmallBtn({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{ padding: 8, background: "transparent", border: "none", cursor: "pointer", borderRadius: 8, color: "#6b7280", display: "flex", alignItems: "center" }}
    >
      {children}
    </button>
  );
}
