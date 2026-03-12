import { HelpCircle, Search, FileText } from "lucide-react";

export const AGENTS = [
  { id: "interviewer", nameAr: "وكيل الاستيعاب", nameEn: "Requirements Interviewer", descAr: "يطرح ٧ أسئلة محورية لاستيعاب طلبك بالكامل" },
  { id: "researcher", nameAr: "وكيل البحث العميق", nameEn: "Deep Researcher", descAr: "يجري بحثاً شاملاً حول الموضوع وأفضل الممارسات" },
  { id: "prd_writer", nameAr: "وكيل إنتاج المستند", nameEn: "Document Producer", descAr: "يُنتج مستند التخطيط والمتطلبات النهائي" },
];

export const SEVEN_QUESTIONS = [
  "صِف ما تريد تحقيقه في جملتين إلى ثلاث جمل واضحة. (مثال: بناء تطبيق، كتابة مقال، تصميم نظام، إنشاء خدمة...)",
  "مَن هو الجمهور أو المستفيد المستهدف؟ ولماذا يحتاج هذا الشيء؟",
  "ما النتيجة النهائية المطلوبة بالتحديد؟ صِف الشكل أو المخرج الذي تتخيله.",
  "ما العناصر أو المكونات الأساسية التي يجب أن يتضمنها العمل؟",
  "هل هناك أمثلة أو مراجع مشابهة لما تريده؟ وما الذي تريد أن يكون مختلفاً عنها؟",
  "ما القيود أو المتطلبات الخاصة؟ (ميزانية، وقت، أدوات محددة، لغة، حجم، صيغة...)",
  "كيف ستحكم على نجاح النتيجة؟ ما المعايير التي تهمك أكثر؟",
];

export const AGENT_COLORS = ["#2563eb", "#7c3aed", "#059669"];
export const AGENT_ICONS = [HelpCircle, Search, FileText];
