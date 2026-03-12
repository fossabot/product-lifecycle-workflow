import { createDeepAgent, type SubAgent } from "deepagents";
import { getModelString } from "../config/models.js";
import {
  ORCHESTRATOR_PROMPT,
  AGENT_PROMPTS,
} from "../prompts/system.js";
import { docxTools } from "../tools/docx-tools.js";
import { searchTools } from "../tools/search-tools.js";
import { workflowTools } from "../tools/workflow-tools.js";

// ============================================================
// Create specialized subagents
// ============================================================

function createSubagents(): SubAgent[] {
  const model = getModelString();

  return [
    // 1. Strategy Agent (Phase 1: docs 01-06)
    {
      name: "strategy-agent",
      description:
        "وكيل الاستراتيجية - يملأ وثائق المرحلة 1 (فرضية التأسيس، الاستراتيجية، PR-FAQ، بحث السوق، موجز المنتج، OKRs)",
      system_prompt: AGENT_PROMPTS["strategy-agent"],
      tools: [...docxTools, ...searchTools],
      model,
    },

    // 2. Research Agent (Phase 2: docs 07-08)
    {
      name: "research-agent",
      description:
        "وكيل البحث - يملأ وثائق المرحلة 2 (بحث المستخدم والشخصيات، خريطة رحلة العميل)",
      system_prompt: AGENT_PROMPTS["research-agent"],
      tools: [...docxTools, ...searchTools],
      model,
    },

    // 3. Planning Agent (Phase 3: docs 09-12)
    {
      name: "planning-agent",
      description:
        "وكيل التخطيط - يملأ وثائق المرحلة 3 (خارطة الطريق، الباكلوج، تعريف الجاهزية، تعريف الإنجاز)",
      system_prompt: AGENT_PROMPTS["planning-agent"],
      tools: [...docxTools],
      model,
    },

    // 4. Architecture Agent (Phase 4: docs 13-16)
    {
      name: "architecture-agent",
      description:
        "وكيل البنية - يملأ وثائق المرحلة 4 (بنية التطبيق، التصميم التقني، قاموس البيانات، توثيق API)",
      system_prompt: AGENT_PROMPTS["architecture-agent"],
      tools: [...docxTools],
      model,
    },

    // 5. Dev Standards Agent (Phase 5: docs 17-18)
    {
      name: "dev-standards-agent",
      description:
        "وكيل معايير التطوير - يملأ وثائق المرحلة 5 (قواعد البرمجة بالـ AI، خطة إعادة الهيكلة)",
      system_prompt: AGENT_PROMPTS["dev-standards-agent"],
      tools: [...docxTools],
      model,
    },

    // 6. Quality Agent (Phase 6: docs 19-22)
    {
      name: "quality-agent",
      description:
        "وكيل الجودة - يملأ وثائق المرحلة 6 (الاختبار، الأمان، إمكانية الوصول، التحليلات)",
      system_prompt: AGENT_PROMPTS["quality-agent"],
      tools: [...docxTools],
      model,
    },

    // 7. Release Agent (Phase 7: doc 23)
    {
      name: "release-agent",
      description:
        "وكيل الإصدار - يملأ وثيقة المرحلة 7 (خطة النشر والإصدار)",
      system_prompt: AGENT_PROMPTS["release-agent"],
      tools: [...docxTools],
      model,
    },

    // 8. Operations Agent (Phase 8: docs 24-25)
    {
      name: "operations-agent",
      description:
        "وكيل العمليات - يملأ وثائق المرحلة 8 (الاستجابة للحوادث، مراجعة ما بعد الإطلاق)",
      system_prompt: AGENT_PROMPTS["operations-agent"],
      tools: [...docxTools],
      model,
    },
  ];
}

// ============================================================
// Create the main orchestrator deep agent
// ============================================================
export function createWorkflowAgent() {
  const model = getModelString();
  const subagents = createSubagents();

  const agent = createDeepAgent({
    model,
    systemPrompt: ORCHESTRATOR_PROMPT,
    tools: [...workflowTools, ...docxTools, ...searchTools],
    subagents,
  });

  return agent;
}

// ============================================================
// Create a single-phase agent (for targeted execution)
// ============================================================
export function createPhaseAgent(agentName: string) {
  const model = getModelString();
  const prompt = AGENT_PROMPTS[agentName];

  if (!prompt) {
    throw new Error(`Unknown agent: ${agentName}`);
  }

  const tools =
    agentName === "strategy-agent" || agentName === "research-agent"
      ? [...docxTools, ...searchTools]
      : [...docxTools];

  const agent = createDeepAgent({
    model,
    systemPrompt: prompt,
    tools,
  });

  return agent;
}
