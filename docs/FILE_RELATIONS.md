# علاقات الملفات (File Relations)

## تبعيات المجلدات (مستوى عالٍ)

```mermaid
graph TD
    subgraph "طبقة العرض والمنطق المشترك"
        src[src/]
        components[src/components/]
        sections[src/sections/]
    end
    subgraph "طبقة الثوابت والمساعدة"
        constants[src/constants/]
        utils[src/utils/]
    end
    
    src --> sections
    src --> components
    src --> utils
    src --> constants
    sections --> components
    sections --> constants
    sections --> utils
```

## تبعيات الملفات داخل المجلدات الحرجة المشتركة

```mermaid
graph LR
    subgraph "src/"
        main[main.jsx]
        app[App.jsx]
        prd[PRDAgentCrew.jsx]
    end
    
    subgraph "src/sections/"
        interview[InterviewerAgent.jsx]
        research[ResearchAgent.jsx]
        doc[DocumentAgent.jsx]
        start[StartPage.jsx]
        progress[ProgressBar.jsx]
    end

    subgraph "src/components/"
        bubble[ChatBubble.jsx]
        btn[SmallBtn.jsx]
    end

    subgraph "src/utils/"
        claude[callClaude.js]
        md[renderMd.js]
    end

    subgraph "src/constants/"
        const[index.js]
    end
    
    main --> app
    app --> prd
    
    prd --> interview
    prd --> research
    prd --> doc
    prd --> start
    prd --> progress
    
    prd --> claude
    prd --> const
    
    interview --> bubble
    interview --> const
    
    research --> md
    research --> btn
    
    doc --> md
    doc --> btn
```

## تدفق البيانات لأهم 3 سيناريوهات استخدام

```mermaid
flowchart LR
    A[إدخال فكرة المشروع] --> B[مقابلة بـ 7 أسئلة]
    B -->|تخزين الإجابات| C[حالة PRDAgentCrew]
    C -->|تسليم الإجابات وموجه موحد| D[الوكيل البحثي]
    D -->|طلب عبر Claude API| E[تقرير البحث]
    E -->|تسليم التقرير + الإجابات| F[وكيل الوثيقة PRD]
    F -->|طلب عبر Claude API| G[مستند التخطيط النهائي]
```

## هرمية المكونات لواجهة المستخدم

```mermaid
graph TD
    App --> PRDAgentCrew
    PRDAgentCrew --> ProgressBar
    PRDAgentCrew --> StartPage
    PRDAgentCrew --> InterviewerAgent
    InterviewerAgent --> ChatBubble
    PRDAgentCrew --> ResearchAgent
    ResearchAgent --> renderMd
    ResearchAgent --> SmallBtn
    PRDAgentCrew --> DocumentAgent
    DocumentAgent --> renderMd
    DocumentAgent --> SmallBtn
```
