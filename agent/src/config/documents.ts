import type { WorkflowDocument, PhaseDefinition } from "../types/index.js";

// ============================================================
// All 25 workflow documents with dependencies
// ============================================================
export const WORKFLOW_DOCUMENTS: WorkflowDocument[] = [
  // Phase 1: Vision & Strategy
  { id: 1,  filename: "01-Founding-Hypothesis.docx",                  title: "Founding Hypothesis",                  titleAr: "فرضية التأسيس",                         phase: "vision_strategy",       status: "not_started", dependsOn: [] },
  { id: 2,  filename: "02-Product-Strategy.docx",                     title: "Product Strategy",                     titleAr: "استراتيجية المنتج",                      phase: "vision_strategy",       status: "not_started", dependsOn: [1] },
  { id: 3,  filename: "03-PR-FAQ-Document.docx",                      title: "PR-FAQ Document",                      titleAr: "وثيقة البيان الصحفي",                    phase: "vision_strategy",       status: "not_started", dependsOn: [2] },
  { id: 4,  filename: "04-Market-Research-Competitive-Analysis.docx",  title: "Market Research & Competitive Analysis", titleAr: "بحث السوق والتحليل التنافسي",           phase: "vision_strategy",       status: "not_started", dependsOn: [2] },
  { id: 5,  filename: "05-Product-Brief-AI-Development.docx",         title: "Product Brief for AI Development",     titleAr: "موجز المنتج لتطوير AI",                 phase: "vision_strategy",       status: "not_started", dependsOn: [2, 4] },
  { id: 6,  filename: "06-OKRs.docx",                                 title: "OKRs",                                 titleAr: "الأهداف والنتائج الرئيسية",              phase: "vision_strategy",       status: "not_started", dependsOn: [2, 5] },

  // Phase 2: Discovery & Research
  { id: 7,  filename: "07-User-Research-Personas.docx",               title: "User Research & Personas",             titleAr: "بحث المستخدم والشخصيات",                phase: "discovery_research",    status: "not_started", dependsOn: [4, 6] },
  { id: 8,  filename: "08-Customer-Journey-Map.docx",                 title: "Customer Journey Map",                 titleAr: "خريطة رحلة العميل",                     phase: "discovery_research",    status: "not_started", dependsOn: [7] },

  // Phase 3: Planning & Roadmap
  { id: 9,  filename: "09-Product-Roadmap.docx",                      title: "Product Roadmap",                      titleAr: "خارطة طريق المنتج",                     phase: "planning_roadmap",      status: "not_started", dependsOn: [6, 8] },
  { id: 10, filename: "10-Product-Backlog-User-Stories.docx",         title: "Product Backlog & User Stories",        titleAr: "سجل المنتج وقصص المستخدمين",            phase: "planning_roadmap",      status: "not_started", dependsOn: [9, 7] },
  { id: 11, filename: "11-Definition-of-Ready.docx",                  title: "Definition of Ready",                  titleAr: "تعريف الجاهزية",                        phase: "planning_roadmap",      status: "not_started", dependsOn: [10] },
  { id: 12, filename: "12-Definition-of-Done.docx",                   title: "Definition of Done",                   titleAr: "تعريف الإنجاز",                         phase: "planning_roadmap",      status: "not_started", dependsOn: [10] },

  // Phase 4: Design & Architecture
  { id: 13, filename: "13-App-Architecture-Plan.docx",                title: "App Architecture Plan",                titleAr: "خطة بنية التطبيق",                      phase: "design_architecture",   status: "not_started", dependsOn: [5, 10] },
  { id: 14, filename: "14-Technical-Design-Document.docx",            title: "Technical Design Document",            titleAr: "وثيقة التصميم التقني",                  phase: "design_architecture",   status: "not_started", dependsOn: [13] },
  { id: 15, filename: "15-Data-Dictionary-Catalog.docx",              title: "Data Dictionary & Catalog",            titleAr: "قاموس وكتالوج البيانات",                phase: "design_architecture",   status: "not_started", dependsOn: [14] },
  { id: 16, filename: "16-API-Documentation.docx",                    title: "API Documentation",                    titleAr: "توثيق واجهة البرمجة",                   phase: "design_architecture",   status: "not_started", dependsOn: [14] },

  // Phase 5: Development Standards
  { id: 17, filename: "17-AI-Coding-Rules-Standards.docx",            title: "AI Coding Rules & Standards",          titleAr: "قواعد ومعايير البرمجة بالـ AI",          phase: "development_standards", status: "not_started", dependsOn: [13] },
  { id: 18, filename: "18-Refactoring-Plan.docx",                     title: "Refactoring Plan",                     titleAr: "خطة إعادة الهيكلة",                     phase: "development_standards", status: "not_started", dependsOn: [14] },

  // Phase 6: Quality & Testing
  { id: 19, filename: "19-Testing-Strategy-QA-Plan.docx",             title: "Testing Strategy & QA Plan",           titleAr: "استراتيجية الاختبار وضمان الجودة",       phase: "quality_testing",       status: "not_started", dependsOn: [12, 14] },
  { id: 20, filename: "20-Product-Security-Assessment.docx",          title: "Product Security Assessment",          titleAr: "تقييم أمان المنتج",                     phase: "quality_testing",       status: "not_started", dependsOn: [13, 14] },
  { id: 21, filename: "21-Accessibility-Compliance-Checklist.docx",   title: "Accessibility Compliance Checklist",   titleAr: "قائمة فحص إمكانية الوصول",              phase: "quality_testing",       status: "not_started", dependsOn: [14] },
  { id: 22, filename: "22-Analytics-Tracking-Plan.docx",              title: "Analytics Tracking Plan",              titleAr: "خطة تتبع التحليلات",                    phase: "quality_testing",       status: "not_started", dependsOn: [6, 8] },

  // Phase 7: Deployment & Launch
  { id: 23, filename: "23-Deployment-Release-Plan.docx",              title: "Deployment & Release Plan",            titleAr: "خطة النشر والإصدار",                    phase: "deployment_launch",     status: "not_started", dependsOn: [19, 20, 21] },

  // Phase 8: Post-Launch & Operations
  { id: 24, filename: "24-Incident-Response-Plan.docx",               title: "Incident Response Plan",               titleAr: "خطة الاستجابة للحوادث",                 phase: "post_launch",           status: "not_started", dependsOn: [13, 23] },
  { id: 25, filename: "25-Post-Launch-Review-Retrospective.docx",     title: "Post-Launch Review & Retrospective",   titleAr: "مراجعة ما بعد الإطلاق",                 phase: "post_launch",           status: "not_started", dependsOn: [22, 23] },
];

// ============================================================
// Phase definitions
// ============================================================
export const PHASES: PhaseDefinition[] = [
  {
    id: "vision_strategy",
    name: "Vision & Strategy",
    nameAr: "الرؤية والاستراتيجية",
    agentName: "strategy-agent",
    documents: [1, 2, 3, 4, 5, 6],
    transitionCriteria: [
      "فرضية التأسيس مكتملة ومراجعة",
      "الاستراتيجية معتمدة",
      "OKRs محددة وقابلة للقياس",
      "بحث السوق يدعم الفرضية",
    ],
  },
  {
    id: "discovery_research",
    name: "Discovery & Research",
    nameAr: "الاكتشاف والبحث",
    agentName: "research-agent",
    documents: [7, 8],
    transitionCriteria: [
      "شخصيات المستخدمين مكتملة (3 على الأقل)",
      "خريطة الرحلة تغطي جميع المراحل",
      "نقاط الألم محددة ومرتبة",
    ],
  },
  {
    id: "planning_roadmap",
    name: "Planning & Roadmap",
    nameAr: "التخطيط وخارطة الطريق",
    agentName: "planning-agent",
    documents: [9, 10, 11, 12],
    transitionCriteria: [
      "خارطة الطريق معتمدة",
      "الباكلوج يحتوي على 2-3 سبرنتات جاهزة",
      "DoR و DoD متفق عليهما",
    ],
  },
  {
    id: "design_architecture",
    name: "Design & Architecture",
    nameAr: "التصميم والبنية المعمارية",
    agentName: "architecture-agent",
    documents: [13, 14, 15, 16],
    transitionCriteria: [
      "البنية المعمارية مراجعة ومعتمدة",
      "التصميم التقني يغطي جميع القصص",
      "قاموس البيانات مكتمل",
      "توثيق API شامل",
    ],
  },
  {
    id: "development_standards",
    name: "Development Standards",
    nameAr: "معايير التطوير",
    agentName: "dev-standards-agent",
    documents: [17, 18],
    transitionCriteria: [
      "قواعد البرمجة موزعة على الفريق",
      "خطة إعادة الهيكلة مجدولة",
    ],
  },
  {
    id: "quality_testing",
    name: "Quality & Testing",
    nameAr: "الجودة والاختبار",
    agentName: "quality-agent",
    documents: [19, 20, 21, 22],
    transitionCriteria: [
      "استراتيجية الاختبار شاملة",
      "لا ثغرات أمنية حرجة",
      "معايير WCAG AA محققة",
      "Analytics مُعدّة وجاهزة",
    ],
  },
  {
    id: "deployment_launch",
    name: "Deployment & Launch",
    nameAr: "النشر والإطلاق",
    agentName: "release-agent",
    documents: [23],
    transitionCriteria: [
      "خطة النشر مفصلة",
      "خطة التراجع مختبرة",
      "المراقبة مفعلة",
    ],
  },
  {
    id: "post_launch",
    name: "Post-Launch & Operations",
    nameAr: "ما بعد الإطلاق والعمليات",
    agentName: "operations-agent",
    documents: [24, 25],
    transitionCriteria: [
      "خطة الاستجابة للحوادث جاهزة",
      "تقرير مراجعة ما بعد الإطلاق مكتمل",
      "الدروس المستفادة موثقة",
    ],
  },
];

// ============================================================
// Helpers
// ============================================================
export function getPhaseById(id: string): PhaseDefinition | undefined {
  return PHASES.find((p) => p.id === id);
}

export function getDocById(id: number): WorkflowDocument | undefined {
  return WORKFLOW_DOCUMENTS.find((d) => d.id === id);
}

export function getPhaseDocuments(phaseId: string): WorkflowDocument[] {
  return WORKFLOW_DOCUMENTS.filter((d) => d.phase === phaseId);
}
