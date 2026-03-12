import { useState } from "react";
import { callClaude } from "./utils/callClaude";
import { SEVEN_QUESTIONS } from "./constants";
import ProgressBar from "./sections/ProgressBar";
import StartPage from "./sections/StartPage";
import InterviewerAgent from "./sections/InterviewerAgent";
import ResearchAgent from "./sections/ResearchAgent";
import DocumentAgent from "./sections/DocumentAgent";

export default function PRDAgentCrew() {
  const [step, setStep] = useState(0);
  const [idea, setIdea] = useState("");
  const [started, setStarted] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState(["", "", "", "", "", "", ""]);
  const [curAns, setCurAns] = useState("");
  const [intDone, setIntDone] = useState(false);
  const [researching, setResearching] = useState(false);
  const [report, setReport] = useState("");
  const [resDone, setResDone] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [prd, setPrd] = useState("");
  const [prdDone, setPrdDone] = useState(false);
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState(false);

  function doStart() {
    if (!idea.trim()) return;
    const a = answers.slice();
    a[0] = idea.trim();
    setAnswers(a);
    setQIdx(1);
    setStarted(true);
  }

  function doAnswer() {
    if (!curAns.trim()) return;
    const a = answers.slice();
    a[qIdx] = curAns.trim();
    setAnswers(a);
    setCurAns("");
    if (qIdx < 6) setQIdx(qIdx + 1);
    else setIntDone(true);
  }

  async function doResearch() {
    setStep(1);
    setResearching(true);
    setErr("");
    const summary = SEVEN_QUESTIONS.map((q, i) => `**${q}**\n${answers[i]}`).join("\n\n");
    const prompt = `أنت وكيل بحث متخصص. مهمتك إجراء بحث عميق وشامل بناءً على الطلب التالي الذي جمعه وكيل المقابلة من المستخدم:\n\n${summary}\n\n═══ تعليمات البحث ═══\n\n١. حلّل طبيعة الطلب أولاً: هل هو منتج رقمي، خدمة، محتوى (مقال/كتاب)، مشروع تقني، نظام، أو غير ذلك؟\n٢. بناءً على طبيعة الطلب، أجرِ بحثاً شاملاً يغطي:\n\n- **السياق العام**: ما الوضع الراهن في هذا المجال؟ ما الاتجاهات الحالية؟\n- **أفضل الممارسات**: كيف يُنفَّذ هذا النوع من العمل باحترافية؟\n- **أمثلة ناجحة**: نماذج مرجعية ناجحة مع تحليل أسباب نجاحها\n- **الأدوات والموارد**: أفضل الأدوات والتقنيات المتاحة\n- **الجمهور والسوق**: فهم الجمهور المستهدف واحتياجاته\n- **التحديات والمخاطر**: عقبات شائعة وكيفية تجنبها\n- **فرص التميز**: كيف يمكن أن يتميز هذا العمل\n\nقدّم التقرير بصيغة Markdown مهيكلة. كن دقيقاً وعملياً واستند إلى بيانات حقيقية.\nاكتب التقرير بالعربية.`;
    try {
      const r = await callClaude([{ role: "user", content: prompt }], true);
      setReport(r);
      setResDone(true);
    } catch {
      setErr("فشل البحث. يرجى المحاولة مرة أخرى.");
    }
    setResearching(false);
  }

  async function doPRD() {
    setStep(2);
    setGenerating(true);
    setErr("");
    const summary = SEVEN_QUESTIONS.map((q, i) => `**${q}**\n${answers[i]}`).join("\n\n");
    const prompt = `أنت وكيل متخصص في إنتاج مستندات التخطيط والمتطلبات الاحترافية. لديك مصدران:\n\n═══ طلب المستخدم (من وكيل المقابلة) ═══\n${summary}\n\n═══ تقرير البحث (من وكيل البحث) ═══\n${report}\n\n═══ تعليمات ═══\n\n١. حلّل طبيعة الطلب: منتج رقمي، خدمة، محتوى، مشروع تقني، أو غير ذلك.\n٢. أنتج مستند تخطيط احترافي شامل بالعربية يتكيف مع نوع الطلب.\n\nإذا كان منتجاً رقمياً/تطبيقاً/نظاماً اتبع هيكل PRD:\n- ملخص تنفيذي، المشكلة والفرصة، الجمهور، الأهداف ومقاييس النجاح\n- نطاق MVP، قصص المستخدمين، المتطلبات الوظيفية وغير الوظيفية\n- التصميم، البنية التقنية، التحليل المرجعي، خارطة الطريق، معايير القبول\n\nإذا كان محتوى (مقال، كتاب، تقرير...):\n- ملخص المشروع، الهدف والرسالة، الجمهور\n- الهيكل التفصيلي، المصادر، أسلوب الكتابة، معايير الجودة، الجدول الزمني\n\nإذا كان خدمة أو مشروعاً عاماً:\n- ملخص تنفيذي، تعريف المشروع ونطاقه، الأهداف والنتائج المتوقعة\n- أصحاب المصلحة، المتطلبات التفصيلية، خطة التنفيذ، المخاطر، معايير النجاح\n\nكن دقيقاً ومحدداً وعملياً. استخدم بيانات البحث لدعم كل قرار.\nقدّم المستند بصيغة Markdown مهيكلة.`;
    try {
      const r = await callClaude([{ role: "user", content: prompt }], false);
      setPrd(r);
      setPrdDone(true);
    } catch {
      setErr("فشل إنتاج المستند. يرجى المحاولة مرة أخرى.");
    }
    setGenerating(false);
  }

  function doCopy(text) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function doDL(text, filename) {
    const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
  }

  function doReset() {
    setStep(0); setIdea(""); setStarted(false); setQIdx(0);
    setAnswers(["", "", "", "", "", "", ""]); setCurAns("");
    setIntDone(false); setResearching(false); setReport("");
    setResDone(false); setGenerating(false); setPrd("");
    setPrdDone(false); setErr("");
  }

  return (
    <div dir="rtl" style={{ fontFamily: "system-ui, -apple-system, sans-serif", minHeight: "100vh", background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)" }}>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}} textarea:focus{border-color:#3b82f6!important;box-shadow:0 0 0 2px rgba(59,130,246,0.2)}`}</style>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", opacity: 0.03, backgroundImage: "radial-gradient(circle at 1px 1px, #333 1px, transparent 0)", backgroundSize: "32px 32px" }} />
      <div style={{ position: "relative", zIndex: 10, maxWidth: 900, margin: "0 auto", padding: "32px 16px" }}>

        {started && <ProgressBar step={step} states={[intDone, resDone, prdDone]} />}

        {err && (
          <div style={{ maxWidth: 700, margin: "0 auto 24px", padding: "12px 16px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, color: "#b91c1c", fontSize: 14, textAlign: "right" }}>
            {err}
          </div>
        )}

        {!started && <StartPage idea={idea} setIdea={setIdea} onStart={doStart} />}

        {started && step === 0 && (
          <InterviewerAgent
            qIdx={qIdx}
            answers={answers}
            curAns={curAns}
            setCurAns={setCurAns}
            intDone={intDone}
            onAnswer={doAnswer}
            onResearch={doResearch}
          />
        )}

        {step === 1 && (
          <ResearchAgent
            researching={researching}
            report={report}
            resDone={resDone}
            copied={copied}
            onCopy={() => doCopy(report)}
            onDownload={() => doDL(report, "research-report.md")}
            onPRD={doPRD}
          />
        )}

        {step === 2 && (
          <DocumentAgent
            generating={generating}
            prd={prd}
            prdDone={prdDone}
            copied={copied}
            onCopy={() => doCopy(prd)}
            onDownload={() => doDL(prd, "planning-document.md")}
            onReset={doReset}
          />
        )}
      </div>
    </div>
  );
}
