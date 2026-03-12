# 🚀 Product Lifecycle Workflow Agent

نظام وكلاء ذكي لإدارة دورة حياة تطوير المنتج الكاملة - مبني على **DeepAgents + LangGraph**.

يقوم بملء 25 وثيقة تلقائياً عبر 8 مراحل باستخدام 9 وكلاء متخصصين.

## ⚡ التشغيل السريع

```bash
# 1. استنسخ المشروع
git clone https://github.com/CLOCKWORK-TEMPTATION/product-lifecycle-workflow.git
cd product-lifecycle-workflow/agent

# 2. ثبّت الحزم
npm install

# 3. أضف الـ API key
cp .env.example .env
# حرّر .env وأضف ANTHROPIC_API_KEY أو OPENAI_API_KEY

# 4. شغّل الوكيل
npm run run:phase
```

## 🖥️ طرق التشغيل

### 1. CLI التفاعلي (الأسهل)
```bash
npm run run:phase
```
يعرض قائمة تفاعلية لاختيار:
- 🚀 **تشغيل كامل** - كل الـ 25 وثيقة تلقائياً
- 📂 **مرحلة واحدة** - اختر مرحلة محددة
- 📄 **وثيقة واحدة** - اختر وثيقة محددة
- 📊 **عرض الحالة** - شوف إيه اتعمل وإيه لسه

### 2. برمجياً (Programmatic API)
```typescript
import { createWorkflowAgent } from "./src/index.js";

const agent = createWorkflowAgent();

const result = await agent.invoke({
  messages: [{
    role: "user",
    content: `
      نفّذ الوركفلو الكامل لمشروع: تطبيق إدارة المهام بالـ AI
      الوصف: تطبيق يستخدم الذكاء الاصطناعي لتنظيم وترتيب المهام تلقائياً
      الجمهور: فرق التطوير في الشركات الناشئة
      التقنيات: React, Node.js, OpenAI API
      احفظ الملفات في: ./output
    `
  }]
});
```

### 3. مرحلة واحدة برمجياً
```typescript
import { createPhaseAgent, PHASES } from "./src/index.js";

const agent = createPhaseAgent("strategy-agent");

const result = await agent.invoke({
  messages: [{
    role: "user",
    content: "املأ وثائق المرحلة 1 لمشروع: ..."
  }]
});
```

## 📁 بنية المشروع

```
agent/
├── src/
│   ├── agents/
│   │   └── create-agents.ts    # إنشاء الوكلاء الـ 9
│   ├── config/
│   │   ├── documents.ts        # الـ 25 وثيقة + التبعيات
│   │   └── models.ts           # إعدادات الـ LLM
│   ├── prompts/
│   │   └── system.ts           # System prompts لكل وكيل
│   ├── tools/
│   │   ├── docx-tools.ts       # أدوات إنشاء ملفات Word
│   │   ├── search-tools.ts     # أدوات البحث على الإنترنت
│   │   └── workflow-tools.ts   # أدوات تتبع الوركفلو
│   ├── types/
│   │   └── index.ts            # TypeScript types
│   ├── cli.ts                  # واجهة CLI التفاعلية
│   └── index.ts                # Programmatic API
├── .env.example
├── package.json
└── tsconfig.json
```

## 🤖 فريق الوكلاء

| # | الوكيل | المرحلة | الوثائق |
|---|--------|---------|---------|
| 🎯 | **Orchestrator** (المنسق) | يدير الكل | يتحكم في الوركفلو |
| 1 | **Strategy Agent** | الرؤية والاستراتيجية | 01-06 |
| 2 | **Research Agent** | الاكتشاف والبحث | 07-08 |
| 3 | **Planning Agent** | التخطيط | 09-12 |
| 4 | **Architecture Agent** | التصميم والبنية | 13-16 |
| 5 | **Dev Standards Agent** | معايير التطوير | 17-18 |
| 6 | **Quality Agent** | الجودة والاختبار | 19-22 |
| 7 | **Release Agent** | النشر والإطلاق | 23 |
| 8 | **Operations Agent** | ما بعد الإطلاق | 24-25 |

## 🔧 الإعدادات

### متغيرات البيئة (.env)

| المتغير | مطلوب | الوصف |
|---------|-------|-------|
| `ANTHROPIC_API_KEY` | نعم* | مفتاح Anthropic (Claude) |
| `OPENAI_API_KEY` | نعم* | مفتاح OpenAI (GPT-4) |
| `TAVILY_API_KEY` | لا | للبحث على الإنترنت (بحث السوق) |
| `MODEL_NAME` | لا | اسم الموديل (default: claude-sonnet-4-5) |
| `OUTPUT_DIR` | لا | مجلد المخرجات (default: ./output) |

*واحد منهم على الأقل مطلوب

## 📊 كيف يعمل

```
المستخدم → CLI → المنسق الرئيسي (Orchestrator)
                        │
                        ├→ strategy-agent    → وثائق 01-06
                        ├→ research-agent    → وثائق 07-08
                        ├→ planning-agent    → وثائق 09-12
                        ├→ architecture-agent → وثائق 13-16
                        ├→ dev-standards-agent → وثائق 17-18
                        ├→ quality-agent     → وثائق 19-22
                        ├→ release-agent     → وثيقة 23
                        └→ operations-agent  → وثائق 24-25
                                                    │
                                                    ▼
                                            25 ملف DOCX جاهز
```

1. **تدخل بيانات المشروع** عبر CLI التفاعلي
2. **المنسق يخطط** ويقسّم العمل على الوكلاء
3. **كل وكيل يملأ** وثائقه باستخدام أدوات الـ DOCX
4. **المنسق يتحقق** من معايير الانتقال بين المراحل
5. **تحصل على 25 ملف Word** مملوءة بالكامل

## 📜 License

MIT
