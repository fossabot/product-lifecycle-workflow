import { tool } from "langchain";
import { z } from "zod";
import * as fs from "fs";
import * as path from "path";
import { WORKFLOW_DOCUMENTS, PHASES, getPhaseById } from "../config/documents.js";

// ============================================================
// Tool: Get workflow status
// ============================================================
export const getWorkflowStatus = tool(
  async ({ outputDir }: { outputDir: string }) => {
    const dir = path.resolve(outputDir);
    const status: string[] = [];

    for (const phase of PHASES) {
      status.push(`\n## ${phase.nameAr} (${phase.name})`);
      const docs = WORKFLOW_DOCUMENTS.filter((d) => d.phase === phase.id);
      for (const doc of docs) {
        const filePath = path.join(dir, doc.filename);
        const exists = fs.existsSync(filePath);
        const icon = exists ? "✅" : "⬜";
        status.push(`  ${icon} [${String(doc.id).padStart(2, "0")}] ${doc.titleAr}`);
      }
    }

    return status.join("\n");
  },
  {
    name: "get_workflow_status",
    description: "Get the current status of all 25 workflow documents",
    schema: z.object({
      outputDir: z.string().describe("Output directory to check"),
    }),
  }
);

// ============================================================
// Tool: Check phase transition criteria
// ============================================================
export const checkPhaseTransition = tool(
  async ({
    phaseId,
    outputDir,
  }: {
    phaseId: string;
    outputDir: string;
  }) => {
    const phase = getPhaseById(phaseId);
    if (!phase) return `Phase not found: ${phaseId}`;

    const dir = path.resolve(outputDir);
    const docs = WORKFLOW_DOCUMENTS.filter((d) => d.phase === phaseId);
    const allExist = docs.every((d) => fs.existsSync(path.join(dir, d.filename)));

    const result = [
      `## فحص المرحلة: ${phase.nameAr}`,
      `الوثائق: ${docs.length} | مكتملة: ${docs.filter((d) => fs.existsSync(path.join(dir, d.filename))).length}`,
      "",
      "### معايير الانتقال:",
      ...phase.transitionCriteria.map((c) => `  - [ ] ${c}`),
      "",
      allExist
        ? "✅ جميع الوثائق موجودة - يمكن الانتقال للمرحلة التالية"
        : "⚠️ بعض الوثائق ناقصة - لا يمكن الانتقال بعد",
    ];

    return result.join("\n");
  },
  {
    name: "check_phase_transition",
    description: "Check if a phase's documents are complete and ready for transition",
    schema: z.object({
      phaseId: z.string().describe("Phase ID to check"),
      outputDir: z.string().describe("Output directory"),
    }),
  }
);

// ============================================================
// Tool: Get phase documents info
// ============================================================
export const getPhaseInfo = tool(
  async ({ phaseId }: { phaseId: string }) => {
    const phase = getPhaseById(phaseId);
    if (!phase) return `Phase not found: ${phaseId}`;

    const docs = WORKFLOW_DOCUMENTS.filter((d) => d.phase === phaseId);
    const info = [
      `## ${phase.nameAr} (${phase.name})`,
      `الوكيل: ${phase.agentName}`,
      "",
      "### الوثائق:",
      ...docs.map(
        (d) =>
          `  ${String(d.id).padStart(2, "0")}. ${d.titleAr} (${d.title}) - يعتمد على: [${d.dependsOn.join(", ") || "لا شيء"}]`
      ),
      "",
      "### معايير الانتقال:",
      ...phase.transitionCriteria.map((c) => `  - ${c}`),
    ];

    return info.join("\n");
  },
  {
    name: "get_phase_info",
    description: "Get detailed info about a specific phase",
    schema: z.object({
      phaseId: z.string().describe("Phase ID"),
    }),
  }
);

export const workflowTools = [
  getWorkflowStatus,
  checkPhaseTransition,
  getPhaseInfo,
];
