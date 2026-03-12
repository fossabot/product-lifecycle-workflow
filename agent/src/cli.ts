#!/usr/bin/env node
import "dotenv/config";
import chalk from "chalk";
import inquirer from "inquirer";
import ora from "ora";
import * as fs from "fs";
import * as path from "path";
import { createWorkflowAgent, createPhaseAgent } from "./agents/create-agents.js";
import { PHASES, WORKFLOW_DOCUMENTS } from "./config/documents.js";
import type { ProjectContext } from "./types/index.js";

// ============================================================
// Banner
// ============================================================
function printBanner() {
  console.log(
    chalk.cyan(`
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║   🚀  Product Lifecycle Workflow Agent                   ║
║   نظام وركفلو دورة حياة المنتج                          ║
║                                                          ║
║   Built with DeepAgents + LangGraph                      ║
║   25 Documents · 8 Phases · 9 Agents                     ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
`)
  );
}

// ============================================================
// Gather project context from user
// ============================================================
async function gatherProjectContext(): Promise<ProjectContext> {
  console.log(chalk.yellow("\n📋 أدخل بيانات المشروع:\n"));

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "اسم المشروع (Project Name):",
      validate: (v: string) => (v.length > 0 ? true : "مطلوب"),
    },
    {
      type: "editor",
      name: "projectDescription",
      message: "وصف المشروع والمشكلة التي يحلها (أكتب بالتفصيل ثم احفظ):",
      validate: (v: string) => (v.length > 10 ? true : "اكتب وصف أكثر تفصيلاً"),
    },
    {
      type: "input",
      name: "targetAudience",
      message: "الجمهور المستهدف (Target Audience):",
      default: "",
    },
    {
      type: "input",
      name: "industry",
      message: "الصناعة/المجال (Industry):",
      default: "",
    },
    {
      type: "input",
      name: "techStack",
      message: "التقنيات المستخدمة (Tech Stack):",
      default: "",
    },
    {
      type: "input",
      name: "teamSize",
      message: "حجم الفريق (Team Size):",
      default: "",
    },
    {
      type: "input",
      name: "timeline",
      message: "الجدول الزمني (Timeline):",
      default: "",
    },
  ]);

  return answers as ProjectContext;
}

// ============================================================
// Run mode selection
// ============================================================
async function selectRunMode(): Promise<{
  mode: "full" | "phase" | "document" | "status";
  phaseId?: string;
  docId?: number;
}> {
  const { mode } = await inquirer.prompt([
    {
      type: "list",
      name: "mode",
      message: "اختر طريقة التشغيل:",
      choices: [
        { name: "🚀 تشغيل كامل (Full Workflow) - كل الـ 25 وثيقة", value: "full" },
        { name: "📂 تشغيل مرحلة (Single Phase)", value: "phase" },
        { name: "📄 تشغيل وثيقة (Single Document)", value: "document" },
        { name: "📊 عرض الحالة (Status)", value: "status" },
      ],
    },
  ]);

  if (mode === "phase") {
    const { phaseId } = await inquirer.prompt([
      {
        type: "list",
        name: "phaseId",
        message: "اختر المرحلة:",
        choices: PHASES.map((p) => ({
          name: `${p.nameAr} (${p.name}) - ${p.documents.length} وثائق`,
          value: p.id,
        })),
      },
    ]);
    return { mode, phaseId };
  }

  if (mode === "document") {
    const { docId } = await inquirer.prompt([
      {
        type: "list",
        name: "docId",
        message: "اختر الوثيقة:",
        choices: WORKFLOW_DOCUMENTS.map((d) => ({
          name: `[${String(d.id).padStart(2, "0")}] ${d.titleAr} (${d.title})`,
          value: d.id,
        })),
      },
    ]);
    return { mode, docId };
  }

  return { mode };
}

// ============================================================
// Show workflow status
// ============================================================
function showStatus(outputDir: string) {
  console.log(chalk.cyan("\n📊 حالة الوركفلو:\n"));

  for (const phase of PHASES) {
    const docs = WORKFLOW_DOCUMENTS.filter((d) => d.phase === phase.id);
    const completed = docs.filter((d) =>
      fs.existsSync(path.join(outputDir, d.filename))
    ).length;
    const total = docs.length;
    const bar = "█".repeat(completed) + "░".repeat(total - completed);
    const pct = Math.round((completed / total) * 100);
    const color = pct === 100 ? chalk.green : pct > 0 ? chalk.yellow : chalk.gray;

    console.log(color(`  [${bar}] ${pct}% ${phase.nameAr} (${completed}/${total})`));

    for (const doc of docs) {
      const exists = fs.existsSync(path.join(outputDir, doc.filename));
      const icon = exists ? chalk.green("✅") : chalk.gray("⬜");
      console.log(`    ${icon} ${String(doc.id).padStart(2, "0")}. ${doc.titleAr}`);
    }
    console.log();
  }
}

// ============================================================
// Run the full workflow
// ============================================================
async function runFullWorkflow(
  context: ProjectContext,
  outputDir: string
) {
  const spinner = ora("جاري إنشاء المنسق الرئيسي...").start();

  try {
    const agent = createWorkflowAgent();
    spinner.succeed("المنسق جاهز");

    const taskMessage = `
## مشروع: ${context.projectName}

### الوصف:
${context.projectDescription}

### الجمهور المستهدف: ${context.targetAudience || "غير محدد"}
### الصناعة: ${context.industry || "غير محدد"}
### التقنيات: ${context.techStack || "غير محدد"}
### حجم الفريق: ${context.teamSize || "غير محدد"}
### الجدول الزمني: ${context.timeline || "غير محدد"}

## المطلوب:
نفّذ الوركفلو الكامل - املأ جميع الـ 25 وثيقة بالترتيب.
احفظ كل وثيقة في المجلد: ${outputDir}
ابدأ بالمرحلة 1 (الرؤية والاستراتيجية) وانتقل تسلسلياً.

## تعليمات هامة:
- استخدم generate_docx لإنشاء كل وثيقة
- فوّض كل مرحلة للوكيل المتخصص عبر task()
- اكتب محتوى حقيقي مفصل وليس placeholders
- استخدم internet_search للبحث عن بيانات السوق
- استخدم check_phase_transition للتحقق قبل الانتقال
`;

    console.log(chalk.yellow("\n🔄 بدء تنفيذ الوركفلو...\n"));

    // Stream the agent execution
    const stream = await agent.stream(
      { messages: [{ role: "user", content: taskMessage }] },
      { recursionLimit: 150 }
    );

    for await (const event of stream) {
      // Print agent activity
      if (event.messages) {
        const lastMsg = event.messages[event.messages.length - 1];
        if (lastMsg?.content && typeof lastMsg.content === "string") {
          const preview = lastMsg.content.substring(0, 200);
          if (preview.trim()) {
            console.log(chalk.dim(`  💬 ${preview}${lastMsg.content.length > 200 ? "..." : ""}`));
          }
        }
      }
    }

    console.log(chalk.green("\n✅ الوركفلو مكتمل!\n"));
    showStatus(outputDir);
  } catch (error) {
    spinner.fail("خطأ في التنفيذ");
    console.error(chalk.red(`\n❌ ${error}`));
    process.exit(1);
  }
}

// ============================================================
// Run a single phase
// ============================================================
async function runSinglePhase(
  context: ProjectContext,
  phaseId: string,
  outputDir: string
) {
  const phase = PHASES.find((p) => p.id === phaseId);
  if (!phase) {
    console.error(chalk.red("مرحلة غير معروفة"));
    return;
  }

  const spinner = ora(`جاري إنشاء ${phase.agentName}...`).start();

  try {
    const agent = createPhaseAgent(phase.agentName);
    spinner.succeed(`${phase.agentName} جاهز`);

    const docs = WORKFLOW_DOCUMENTS.filter((d) => d.phase === phaseId);
    const docsInfo = docs
      .map((d) => `  - [${String(d.id).padStart(2, "0")}] ${d.titleAr} (${d.filename})`)
      .join("\n");

    const taskMessage = `
## مشروع: ${context.projectName}
${context.projectDescription}

## المطلوب:
املأ وثائق المرحلة "${phase.nameAr}":
${docsInfo}

احفظ كل وثيقة في: ${outputDir}
اكتب محتوى مفصل وحقيقي بالعربية مع المصطلحات التقنية بالإنجليزية.
`;

    console.log(chalk.yellow(`\n🔄 تنفيذ: ${phase.nameAr}...\n`));

    const result = await agent.invoke({
      messages: [{ role: "user", content: taskMessage }],
    });

    const lastMsg = result.messages[result.messages.length - 1];
    if (lastMsg?.content) {
      console.log(chalk.white(String(lastMsg.content).substring(0, 1000)));
    }

    console.log(chalk.green(`\n✅ ${phase.nameAr} مكتملة!\n`));
  } catch (error) {
    spinner.fail("خطأ");
    console.error(chalk.red(`\n❌ ${error}`));
  }
}

// ============================================================
// Main
// ============================================================
async function main() {
  printBanner();

  // Check for API key
  if (!process.env.ANTHROPIC_API_KEY && !process.env.OPENAI_API_KEY) {
    console.error(
      chalk.red(
        "\n❌ لم يتم العثور على API key. أضف ANTHROPIC_API_KEY أو OPENAI_API_KEY في ملف .env\n"
      )
    );
    console.log(chalk.dim("  cp .env.example .env"));
    console.log(chalk.dim("  # ثم أضف الـ API key\n"));
    process.exit(1);
  }

  const outputDir = process.env.OUTPUT_DIR || "./output";
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const { mode, phaseId, docId } = await selectRunMode();

  if (mode === "status") {
    showStatus(outputDir);
    return;
  }

  const context = await gatherProjectContext();

  // Save context for future use
  fs.writeFileSync(
    path.join(outputDir, "project-context.json"),
    JSON.stringify(context, null, 2),
    "utf-8"
  );

  switch (mode) {
    case "full":
      await runFullWorkflow(context, outputDir);
      break;
    case "phase":
      if (phaseId) await runSinglePhase(context, phaseId, outputDir);
      break;
    case "document":
      // For single doc, run the phase agent for that doc's phase
      if (docId) {
        const doc = WORKFLOW_DOCUMENTS.find((d) => d.id === docId);
        if (doc) {
          const phase = PHASES.find((p) => p.id === doc.phase);
          if (phase) await runSinglePhase(context, phase.id, outputDir);
        }
      }
      break;
  }
}

main().catch(console.error);
