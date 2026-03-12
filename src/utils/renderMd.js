export function renderMd(text) {
  if (!text) return "";
  return text
    .replace(/^#### (.+)$/gm, '<h4 style="font-size:16px;font-weight:700;margin:12px 0 6px;color:#1f2937">$1</h4>')
    .replace(/^### (.+)$/gm, '<h3 style="font-size:18px;font-weight:700;margin:16px 0 8px;color:#1f2937">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="font-size:20px;font-weight:700;margin:24px 0 12px;color:#111827;border-bottom:1px solid #e5e7eb;padding-bottom:8px">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 style="font-size:24px;font-weight:800;margin:32px 0 16px;color:#111827">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, '<li style="margin:0 16px 4px 0;list-style:disc inside;color:#374151">$1</li>')
    .replace(/^\* (.+)$/gm, '<li style="margin:0 16px 4px 0;list-style:disc inside;color:#374151">$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li style="margin:0 16px 4px 0;list-style:decimal inside;color:#374151">$1</li>')
    .replace(/\n\n/g, '<div style="margin-bottom:12px"></div>')
    .replace(/\n/g, "<br/>");
}
