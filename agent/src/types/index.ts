import { z } from "zod";

// ============================================================
// Phase definitions
// ============================================================
export const PhaseId = z.enum([
  "vision_strategy",
  "discovery_research",
  "planning_roadmap",
  "design_architecture",
  "development_standards",
  "quality_testing",
  "deployment_launch",
  "post_launch",
]);
export type PhaseId = z.infer<typeof PhaseId>;

export const DocStatus = z.enum([
  "not_started",
  "in_progress",
  "completed",
  "approved",
  "needs_update",
]);
export type DocStatus = z.infer<typeof DocStatus>;

// ============================================================
// Document metadata
// ============================================================
export interface WorkflowDocument {
  id: number;
  filename: string;
  title: string;
  titleAr: string;
  phase: PhaseId;
  status: DocStatus;
  dependsOn: number[];
  outputPath?: string;
}

// ============================================================
// Phase metadata
// ============================================================
export interface PhaseDefinition {
  id: PhaseId;
  name: string;
  nameAr: string;
  agentName: string;
  documents: number[];
  transitionCriteria: string[];
}

// ============================================================
// Project context passed between agents
// ============================================================
export const ProjectContextSchema = z.object({
  projectName: z.string().describe("اسم المشروع"),
  projectDescription: z.string().describe("وصف المشروع والمشكلة"),
  targetAudience: z.string().optional().describe("الجمهور المستهدف"),
  industry: z.string().optional().describe("الصناعة/المجال"),
  techStack: z.string().optional().describe("التقنيات المستخدمة"),
  teamSize: z.string().optional().describe("حجم الفريق"),
  timeline: z.string().optional().describe("الجدول الزمني"),
  budget: z.string().optional().describe("الميزانية"),
  additionalContext: z.string().optional().describe("سياق إضافي"),
});
export type ProjectContext = z.infer<typeof ProjectContextSchema>;

// ============================================================
// Agent execution result
// ============================================================
export interface PhaseResult {
  phaseId: PhaseId;
  status: "success" | "failure" | "partial";
  documentsCompleted: number[];
  summary: string;
  errors?: string[];
}

// ============================================================
// Workflow state
// ============================================================
export interface WorkflowState {
  projectContext: ProjectContext;
  currentPhase: PhaseId;
  documents: Map<number, WorkflowDocument>;
  phaseResults: PhaseResult[];
  isComplete: boolean;
}
