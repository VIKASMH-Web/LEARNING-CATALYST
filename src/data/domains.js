// Domain Logic — Roadmap domains including career paths AND language-specific mini-roadmaps

export const enDomains = [
    // === CAREER PATHS ===
    { title: "Full Stack Developer", path: "0 → Production", category: "career", steps: ["HTML/CSS Foundations", "JS/TypeScript Depth", "Frontend Frameworks (React)", "Backend (Node/Python/Go)", "DB & Architecture", "DevOps & Deployment"] },
    { title: "Backend Developer", path: "Logic & Scalability", category: "career", steps: ["Server Fundamentals", "API Design (REST/gRPC)", "Data Persistence (SQL/NoSQL)", "Caching & Message Queues", "Microservices", "System Design"] },
    { title: "Frontend Developer", path: "UI & Performance", category: "career", steps: ["Browser Architecture", "Advanced CSS & Layout", "JS Core & Patterns", "Framework Mastery", "State Management", "Performance Optimization"] },
    { title: "AI Engineer", path: "NPU & Inference", category: "career", steps: ["Linear Algebra/Calc", "Deep Learning Architectures", "PyTorch/TensorFlow", "Optimizing for Edge (ONNX)", "NPU Acceleration", "Model Deployment"] },
    { title: "ML Engineer", path: "Data & Algorithms", category: "career", steps: ["Statistical Learning", "Supervised/Unsupervised", "Feature Engineering", "Scikit-Learn", "MLOps Pipelines", "Distributed Training"] },
    { title: "LLM Engineer", path: "Generative AI", category: "career", steps: ["Transformer Architecture", "Attention Mechanisms", "Fine-tuning (QLoRA)", "RAG Systems", "Prompt Engineering", "Ethics & Evaluation"] },
    { title: "Data Scientist", path: "Analysis & Metrics", category: "career", steps: ["EDA & Statistics", "Probability Theory", "Data Wrangling (Pandas)", "Visualization (Seaborn)", "Predictive Modeling", "Hypothesis Testing"] },
    { title: "Data Analyst", path: "Insights & Visuals", category: "career", steps: ["Excel/SQL Core", "Data Cleaning", "BI Tools (Tableau/PowerBI)", "Reporting Patterns", "Statistical Summaries", "Dashboarding"] },
    { title: "DevOps Engineer", path: "Automation & Infrastructure", category: "career", steps: ["Linux Internals", "GitOps Workflows", "CI/CD (Actions/Jenkins)", "Docker & K8s", "Infrastructure as Code", "Monitoring & Logging"] },
    { title: "Cybersecurity Engineer", path: "Defense & Offense", category: "career", steps: ["Networking Security", "Encryption & Auth", "Penetration Testing", "Vulnerability Research", "Cloud Security", "Incident Response"] },
    { title: "Mobile App Developer", path: "Native & Cross-Platform", category: "career", steps: ["Mobile UI Patterns", "Native APIs", "Swift/Kotlin Mastery", "React Native/Flutter", "Storage & Offline Sync", "App Store Operations"] },
    { title: "Cloud Engineer", path: "Infrastructure & Scale", category: "career", steps: ["Cloud Fundamentals", "Networking & IAM", "Compute & Storage", "Serverless Architecture", "Cost Optimization", "Global Distribution"] },

    // === LANGUAGE-SPECIFIC MINI-ROADMAPS ===
    { title: "Python", path: "Language Mastery", category: "language", steps: ["Fundamentals & Syntax", "Data Structures & Algorithms", "OOP & Modules", "Projects & Applications", "Advanced Concepts", "Testing & Best Practices"] },
    { title: "Java", path: "Language Mastery", category: "language", steps: ["Fundamentals & Syntax", "OOP & Collections", "Exception Handling & I/O", "Projects & Applications", "Advanced Concepts (Concurrency)", "Testing & Build Tools"] },
    { title: "C / C++", path: "Language Mastery", category: "language", steps: ["Fundamentals & Syntax", "Pointers & Memory", "Data Structures", "Projects & Applications", "Advanced Concepts (Templates/STL)", "Systems Programming"] },
    { title: "JavaScript", path: "Language Mastery", category: "language", steps: ["Fundamentals & ES6+", "DOM & Browser APIs", "Async Programming", "Projects & Applications", "Advanced Patterns", "Node.js & Tooling"] },
    { title: "C#", path: "Language Mastery", category: "language", steps: ["Fundamentals & .NET", "OOP & Collections", "LINQ & Async", "Projects & Applications", "Advanced Concepts", "Testing & Deployment"] },
    { title: "Swift", path: "Language Mastery", category: "language", steps: ["Fundamentals & Syntax", "Optionals & Closures", "UIKit & SwiftUI", "Projects & Applications", "Advanced Concepts", "App Store Publishing"] },
    { title: "SQL", path: "Database Query Language", category: "language", steps: ["Basic Queries (SELECT/WHERE)", "Joins & Subqueries", "Aggregation & Grouping", "Database Design & Normalization", "Advanced SQL (Window Functions)", "Performance & Indexing"] },
    { title: "HTML & CSS", path: "Web Foundations", category: "language", steps: ["HTML Basics & Semantics", "CSS Selectors & Box Model", "Flexbox & Grid", "Responsive Design", "Animations & Transitions", "Accessibility & Best Practices"] },

    // === TOOLS ===
    { title: "Git & GitHub", path: "Version Control", category: "tool", steps: ["Git Basics (init, add, commit)", "Branching & Merging", "Remote Repos & GitHub", "Collaboration (PRs, Issues)", "Advanced Git (Rebase, Stash)", "CI/CD Integration"] },
];

// Placeholder for other languages
export const knDomains = [
    { title: "ಫುಲ್ ಸ್ಟಾಕ್ ಡೆವಲಪರ್", path: "0 → ಉತ್ಪಾದನೆ", category: "career", steps: ["HTML/CSS ಅಡಿಪಾಯಗಳು", "JS/TypeScript ಆಳ", "ಫ್ರಂಟ್ಎಂಡ್ ಫ್ರೇಮ್ವರ್ಕ್ಸ್ (React)", "ಬ್ಯಾಕೆಂಡ್ (Node/Python/Go)", "DB ಮತ್ತು ಆರ್ಕಿಟೆಕ್ಚರ್", "DevOps ಮತ್ತು ಡೆಪ್ಲಾಯ್ಮೆಂಟ್"] },
];

export const translations = {
    en: enDomains,
    kn: knDomains,
    ta: [],
    ml: [],
    hi: [],
    te: [],
    mr: []
};

export const getDomains = (lang = 'en') => {
    const list = translations[lang] && translations[lang].length > 0 ? translations[lang] : enDomains;
    if (list.length < enDomains.length) {
         return enDomains.map((d, i) => list[i] || d);
    }
    return list;
};
