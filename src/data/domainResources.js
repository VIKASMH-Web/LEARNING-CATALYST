export const domainResources = {
  "frontend engineering": {
    title: "Frontend Engineering",
    description: "Master user interface development and performance engineering.",
    roadmap: ["HTML/CSS", "JavaScript", "React", "Performance", "Web Accessibility", "Testing"],
    resources: [
      { title: "React Official Documentation", type: "Documentation", difficulty: "Beginner", link: "https://react.dev" },
      { title: "Frontend System Design", type: "Article", difficulty: "Advanced", link: "#" },
      { title: "50 React Challenges", type: "Practice", difficulty: "Intermediate", link: "#" },
      { title: "CSS for JS Developers", type: "Course", difficulty: "Intermediate", link: "#" }
    ],
    interviewPrep: ["React Hooks", "State Management", "Rendering Optimizations", "Browser Rendering Loop"],
    skills: {
      "JavaScript": 62,
      "React": 41,
      "CSS": 75
    },
    action: "Complete 5 React state challenges first."
  },
  "backend engineering": {
    title: "Backend Engineering",
    description: "Build scalable server-side applications and APIs.",
    roadmap: ["Node.js", "Databases", "API Design", "System Design", "Security"],
    resources: [
      { title: "Node.js Design Patterns", type: "Book", difficulty: "Advanced", link: "#" },
      { title: "PostgreSQL Verification", type: "Documentation", difficulty: "Intermediate", link: "#" },
      { title: "Building REST APIs", type: "Video", difficulty: "Beginner", link: "#" }
    ],
    interviewPrep: ["Database Indexing", "Caching Strategies", "API Security", "Microservices"],
    skills: {
      "Node.js": 55,
      "SQL": 70,
      "System Design": 30
    },
    action: "Focus on Database Indexing and Optimization."
  },
  "ai/ml": {
    title: "AI & Machine Learning",
    description: "Develop intelligent systems using data and algorithms.",
    roadmap: ["Python", "Mathematics", "Machine Learning", "Deep Learning", "NLP"],
    resources: [
      { title: "Fast.ai Practical Deep Learning", type: "Course", difficulty: "Intermediate", link: "#" },
      { title: "TensorFlow Documentation", type: "Documentation", difficulty: "Advanced", link: "#" },
      { title: "Kaggle Competitions", type: "Practice", difficulty: "All Levels", link: "#" }
    ],
    interviewPrep: ["Neural Networks", "Gradient Descent", "Model Evaluation", "Transformers"],
    skills: {
      "Python": 80,
      "Math": 60,
      "ML Concepts": 45
    },
    action: "Implement a basic Neural Network from scratch."
  },
  "system design": {
    title: "System Design",
    description: "Architect scalable and reliable software systems.",
    roadmap: ["Scalability", "Reliability", "Distributed Systems", "Data Partitioning"],
    resources: [
      { title: "System Design Primer", type: "GitHub Repo", difficulty: "Intermediate", link: "#" },
      { title: "Designing Data-Intensive Applications", type: "Book", difficulty: "Advanced", link: "#" }
    ],
    interviewPrep: ["Load Balancing", "Consistent Hashing", "CAP Theorem"],
    skills: {
      "Architecture": 40,
      "Databases": 65,
      "Networking": 50
    },
    action: "Read about Distributed Locking mechanisms."
  },
  "cybersecurity": {
    title: "Cybersecurity",
    description: "Protect systems, networks, and programs from digital attacks.",
    roadmap: ["Network Security", "Ethical Hacking", "Cryptography", "Security Operations"],
    resources: [
      { title: "OWASP Top 10", type: "Documentation", difficulty: "Intermediate", link: "#" },
      { title: "Hack The Box", type: "Practice", difficulty: "All Levels", link: "#" }
    ],
    interviewPrep: ["Penetration Testing", "Encryption Algorithms", "Security Protocols"],
    skills: {
      "Networking": 60,
      "Linux": 70,
      "Scripting": 55
    },
    action: "Complete a CTF challenge on Hack The Box."
  },
   "data science": {
    title: "Data Science",
    description: "Extract insights and knowledge from data.",
    roadmap: ["Statistics", "Python/R", "Data Visualization", "Machine Learning"],
    resources: [
      { title: "Kaggle Data Science", type: "Course", difficulty: "Beginner", link: "#" },
      { title: "Data Analysis with Python", type: "Video", difficulty: "Intermediate", link: "#" }
    ],
    interviewPrep: ["Statistical Analysis", "A/B Testing", "Data Wrangling"],
    skills: {
      "Statistics": 50,
      "Python": 65,
      "Visualization": 60
    },
    action: "Analyze a public dataset and visualize findings."
  },
  "devops": {
    title: "DevOps",
    description: "Streamline development and operations for faster delivery.",
    roadmap: ["Linux", "Containerization", "CI/CD", "Cloud Platforms", "Monitoring"],
    resources: [
      { title: "Docker Documentation", type: "Documentation", difficulty: "Intermediate", link: "#" },
      { title: "Kubernetes The Hard Way", type: "Tutorial", difficulty: "Advanced", link: "#" }
    ],
    interviewPrep: ["Containerization", "Orchestration", "Infrastructure as Code"],
    skills: {
      "Linux": 75,
      "Docker": 60,
      "AWS": 40
    },
    action: "Set up a CI/CD pipeline for a simple app."
  },
  "mobile development": {
    title: "Mobile Development",
    description: "Create applications for mobile devices.",
    roadmap: ["React Native/Flutter", "Swift/Kotlin", "Mobile UI/UX", "App Store Deployment"],
    resources: [
      { title: "React Native Docs", type: "Documentation", difficulty: "Intermediate", link: "#" },
      { title: "Flutter Widget of the Week", type: "Video", difficulty: "Beginner", link: "#" }
    ],
    interviewPrep: ["Mobile Performance", "Offline Storage", "Push Notifications"],
     skills: {
      "React Native": 50,
      "Native Modules": 30,
      "UI Design": 60
    },
    action: "Check out React Native Gesture Handler."
  }
};
