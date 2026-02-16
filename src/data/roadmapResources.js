export const roadmapResources = {
    "_defaults": [
        { 
            title: "Stack Overflow", 
            description: "The world's largest developer community. Ask, share, and learn.", 
            type: "Practice", 
            difficulty: "All", 
            link: "https://stackoverflow.com",
            aiCurated: false
        },
        { 
            title: "GitHub Explore", 
            description: "Discover trending repositories and contribute to open source.", 
            type: "Project", 
            difficulty: "Intermediate", 
            link: "https://github.com/explore",
            aiCurated: false
        },
        { 
            title: "YouTube Tech Talks", 
            description: "Talks from Google I/O, React Conf, and more.", 
            type: "Video", 
            difficulty: "All", 
            link: "https://youtube.com",
            aiCurated: false
        },
        {
            title: "DevDocs",
            description: "Fast, offline, and free documentation browser for developers.",
            type: "Documentation",
            difficulty: "All",
            link: "https://devdocs.io",
            aiCurated: true
        }
    ],

    // 1. Full Stack Developer
    "Full Stack Developer": {
        "HTML/CSS Foundations": [
            { title: "MDN Web Docs", description: "The ultimate resource for HTML semantics and standards.", type: "Documentation", difficulty: "Beginner", link: "https://developer.mozilla.org/en-US/docs/Web/HTML", aiCurated: true },
            { title: "CSS Tricks - Flexbox Guide", description: "A complete visual guide to CSS Flexbox layout.", type: "Article", difficulty: "Beginner", link: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/", aiCurated: true },
            { title: "Responsive Web Design", description: "freeCodeCamp's certification course with 5 projects.", type: "Course", difficulty: "Beginner", link: "https://www.freecodecamp.org/learn/responsive-web-design/", aiCurated: false }
        ],
        "JS/TypeScript Depth": [
            { title: "JavaScript.info", description: "Modern JavaScript Tutorial from the basics to advanced topics.", type: "Documentation", difficulty: "Intermediate", link: "https://javascript.info/", aiCurated: true },
            { title: "Total TypeScript", description: "Interactive TypeScript exercises to master type safety.", type: "Course", difficulty: "Advanced", link: "https://www.totaltypescript.com/", aiCurated: true },
            { title: "Namaste JavaScript", description: "Deep dive into JS internals like hoisting and closures.", type: "Video", difficulty: "Intermediate", link: "https://www.youtube.com/playlist?list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP", aiCurated: false }
        ],
        "Frontend Frameworks (React)": [
            { title: "React Docs (Beta)", description: "The new official React documentation with interactive examples.", type: "Documentation", difficulty: "Intermediate", link: "https://beta.reactjs.org/", aiCurated: true },
            { title: "Epic React by Kent C. Dodds", description: "Advanced patterns and best practices for production React apps.", type: "Course", difficulty: "Advanced", link: "https://epicreact.dev/", aiCurated: true },
            { title: "Redux Toolkit", description: "Standard way to write Redux logic.", type: "Documentation", difficulty: "Advanced", link: "https://redux-toolkit.js.org/", aiCurated: false }
        ],
        "Backend (Node/Python/Go)": [
            { title: "Node.js Design Patterns", description: "Mastering Node.js architecture and asynchronous patterns.", type: "Book", difficulty: "Advanced", link: "https://www.nodejsdesignpatterns.com/", aiCurated: true },
            { title: "FastApi Documentation", description: "Modern, fast (high-performance) web framework for Python.", type: "Documentation", difficulty: "Intermediate", link: "https://fastapi.tiangolo.com/", aiCurated: true },
            { title: "Build a Backend with Go", description: "Tutorial on building a RESTful API with key Go concepts.", type: "Video", difficulty: "Intermediate", link: "https://golang.org/doc/tutorial/web-service-gin", aiCurated: false }
        ],
        "DB & Architecture": [
            { title: "Use The Index, Luke", description: "A guide to database performance for developers.", type: "Documentation", difficulty: "Advanced", link: "https://use-the-index-luke.com/", aiCurated: true },
            { title: "System Design Primer", description: "Learn how to design large-scale systems.", type: "Project", difficulty: "Advanced", link: "https://github.com/donnemartin/system-design-primer", aiCurated: true }
        ],
        "DevOps & Deployment": [
            { title: "Docker for Beginners", description: "Learn to containerize applications.", type: "Video", difficulty: "Beginner", link: "https://www.youtube.com/watch?v=fqMOX6JJhGo", aiCurated: false },
            { title: "GitHub Actions Docs", description: "Automate your workflow from idea to production.", type: "Documentation", difficulty: "Intermediate", link: "https://docs.github.com/en/actions", aiCurated: true }
        ]
    },

    // 2. Backend Developer
    "Backend Developer": {
        "Server Fundamentals": [
            { title: "The Linux Command Line", description: "A complete introduction to the command line.", type: "Book", difficulty: "Beginner", link: "https://linuxcommand.org/tlcl.php", aiCurated: true },
            { title: "HTTP: The Definitive Guide", description: "Everything you need to know about HTTP.", type: "Book", difficulty: "Intermediate", link: "https://www.oreilly.com/library/view/http-the-definitive/1565925092/", aiCurated: false }
        ],
        "API Design (REST/gRPC)": [
            { title: "Microsoft REST API Guidelines", description: "Best practices for designing RESTful services.", type: "Documentation", difficulty: "Intermediate", link: "https://github.com/microsoft/api-guidelines", aiCurated: true },
            { title: "gRPC Official Docs", description: "A high performance, open source universal RPC framework.", type: "Documentation", difficulty: "Advanced", link: "https://grpc.io/docs/", aiCurated: true }
        ],
        "Data Persistence (SQL/NoSQL)": [
             { title: "PostgreSQL Tutorial", description: "Comprehensive guide to the world's most advanced open source database.", type: "Documentation", difficulty: "Beginner", link: "https://www.postgresqltutorial.com/", aiCurated: true },
             { title: "MongoDB University", description: "Free courses to learn MongoDB.", type: "Course", difficulty: "Intermediate", link: "https://university.mongodb.com/", aiCurated: false }
        ],
        "Caching & Message Queues": [
             { title: "Redis University", description: "Learn Redis from the creators.", type: "Course", difficulty: "Intermediate", link: "https://university.redis.com/", aiCurated: true },
             { title: "RabbitMQ Tutorials", description: "Get started with RabbitMQ messaging.", type: "Documentation", difficulty: "Intermediate", link: "https://www.rabbitmq.com/getstarted.html", aiCurated: false }
        ],
        "Microservices": [
             { title: "Microservices Patterns", description: "With examples in Java.", type: "Book", difficulty: "Advanced", link: "https://microservices.io/", aiCurated: true }
        ],
        "System Design": [
             { title: "Grokking the System Design Interview", description: "A guide to ace system design interviews.", type: "Course", difficulty: "Advanced", link: "https://www.educative.io/courses/grokking-the-system-design-interview", aiCurated: true }
        ]
    },

    // 3. Frontend Developer
    "Frontend Developer": {
        "Browser Architecture": [
            { title: "How Browsers Work", description: "Behind the scenes of modern web browsers.", type: "Article", difficulty: "Advanced", link: "https://web.dev/howbrowserswork/", aiCurated: true }
        ],
        "Advanced CSS & Layout": [
             { title: "CSS Grid Garden", description: "A game for learning CSS Grid Layout.", type: "Practice", difficulty: "Beginner", link: "https://cssgridgarden.com/", aiCurated: true },
             { title: "Sass Basics", description: "CSS with superpowers.", type: "Documentation", difficulty: "Intermediate", link: "https://sass-lang.com/guide", aiCurated: false }
        ],
        "JS Core & Patterns": [
             { title: "You Don't Know JS", description: "Deep dive into the core mechanisms of the JavaScript language.", type: "Book", difficulty: "Advanced", link: "https://github.com/getify/You-Dont-Know-JS", aiCurated: true }
        ],
        "Framework Mastery": [
             { title: "Vue.js Guide", description: "The progressive JavaScript framework.", type: "Documentation", difficulty: "Intermediate", link: "https://vuejs.org/guide/introduction.html", aiCurated: true }
        ],
        "State Management": [
             { title: "XState Docs", description: "State machines and statecharts for the modern web.", type: "Documentation", difficulty: "Advanced", link: "https://xstate.js.org/docs/", aiCurated: true }
        ],
        "Performance Optimization": [
             { title: "Web Vitals", description: "Essential metrics for a healthy site.", type: "Documentation", difficulty: "Advanced", link: "https://web.dev/vitals/", aiCurated: true }
        ]
    },

    // 4. Python Developer
    "Python Developer": {
        "Syntax & Standard Lib": [
            { title: "Python 3 Official Docs", description: "The source of truth for Python.", type: "Documentation", difficulty: "Beginner", link: "https://docs.python.org/3/", aiCurated: true },
            { title: "Automate the Boring Stuff", description: "Practical programming for total beginners.", type: "Book", difficulty: "Beginner", link: "https://automatetheboringstuff.com/", aiCurated: true }
        ],
        "Data Structures": [
             { title: "Problem Solving with Algorithms", description: "Using Python.", type: "Book", difficulty: "Intermediate", link: "https://runestone.academy/runestone/books/published/pythonds/index.html", aiCurated: false }
        ],
        "Automation & Scripting": [
             { title: "Real Python", description: "Python tutorials and articles.", type: "Article", difficulty: "Intermediate", link: "https://realpython.com/", aiCurated: true }
        ],
        "Web Frameworks (FastAPI)": [
             { title: "TestDriven.io", description: "Focus on testing and web development.", type: "Video", difficulty: "Advanced", link: "https://testdriven.io/", aiCurated: false }
        ],
        "Data Science Foundations": [
             { title: "Kaggle Learn", description: "Practical data skills you can apply immediately.", type: "Practice", difficulty: "Intermediate", link: "https://www.kaggle.com/learn", aiCurated: true }
        ],
        "Advanced Concurrency": [
             { title: "Python Concurrency with asyncio", description: "Managing concurrent tasks.", type: "Book", difficulty: "Advanced", link: "https://www.manning.com/books/python-concurrency-with-asyncio", aiCurated: true }
        ]
    },

    // 5. Java Developer
    "Java Developer": {
        "Core Java (JVM)": [
            { title: "Effective Java", description: "Best practices for the Java platform.", type: "Book", difficulty: "Advanced", link: "https://www.oreilly.com/library/view/effective-java-3rd/9780134686097/", aiCurated: true }
        ],
        "OOP & Design Patterns": [
             { title: "Refactoring.Guru", description: "Design Patterns and Refactoring.", type: "Documentation", difficulty: "Intermediate", link: "https://refactoring.guru/design-patterns/java", aiCurated: true }
        ],
        "Spring Boot Ecosystem": [
             { title: "Spring Guides", description: "Getting started guides for Spring.", type: "Documentation", difficulty: "Intermediate", link: "https://spring.io/guides", aiCurated: true }
        ],
        "Hibernate & JPA": [
             { title: "Vlad Mihalcea's High-Performance Java Persistence", description: "Getting the most out of your data layer.", type: "Book", difficulty: "Advanced", link: "https://vladmihalcea.com/books/high-performance-java-persistence/", aiCurated: true }
        ],
        "Microservices (Cloud)": [
             { title: "Spring Cloud", description: "Tools for building common patterns in distributed systems.", type: "Documentation", difficulty: "Advanced", link: "https://spring.io/projects/spring-cloud", aiCurated: false }
        ],
        "Build Tools (Maven/Gradle)": [
             { title: "Gradle User Manual", description: "Official documentation.", type: "Documentation", difficulty: "Intermediate", link: "https://docs.gradle.org/current/userguide/userguide.html", aiCurated: false }
        ]
    },

    // 6. C / C++ Developer
    "C / C++ Developer": {
        "Memory Management": [
             { title: "Beej's Guide to C Programming", description: "A friendly guide to C.", type: "Book", difficulty: "Beginner", link: "https://beej.us/guide/bgc/", aiCurated: true }
        ],
        "Pointers & References": [
             { title: "C++ FAQ - Pointers", description: "Common questions and best practices.", type: "Documentation", difficulty: "Intermediate", link: "https://isocpp.org/wiki/faq/pointers", aiCurated: false }
        ],
        "STL & Templates": [
             { title: "The C++ Standard Template Library", description: "A tutorial and reference.", type: "Documentation", difficulty: "Intermediate", link: "https://www.geeksforgeeks.org/the-c-standard-template-library-stl/", aiCurated: false }
        ],
        "Concurrency & Threading": [
             { title: "C++ Concurrency in Action", description: "Managing threads and locks.", type: "Book", difficulty: "Advanced", link: "https://www.manning.com/books/c-plus-plus-concurrency-in-action-second-edition", aiCurated: true }
        ],
        "Systems Programming": [
             { title: "Advanced Programming in the UNIX Environment", description: "The bible of UNIX programming.", type: "Book", difficulty: "Advanced", link: "https://www.amazon.com/Advanced-Programming-UNIX-Environment-3rd/dp/0321637739", aiCurated: true }
        ]
    },

    // 7. AI Engineer
    "AI Engineer": {
         "Linear Algebra/Calc": [
             { title: "Essence of Linear Algebra", description: "3Blue1Brown's visual introduction to vectors and matrices.", type: "Video", difficulty: "Beginner", link: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab", aiCurated: true },
             { title: "Khan Academy Math", description: "Comprehensive exercises for Calculus and Statistics.", type: "Course", difficulty: "Beginner", link: "https://www.khanacademy.org/math", aiCurated: false }
         ],
         "Deep Learning Architectures": [
             { title: "Deep Learning Book", description: "The bible of Deep Learning by Goodfellow, Bengio, and Courville.", type: "Documentation", difficulty: "Advanced", link: "https://www.deeplearningbook.org/", aiCurated: true },
             { title: "Fast.ai", description: "Practical Deep Learning for Coders using PyTorch.", type: "Course", difficulty: "Intermediate", link: "https://course.fast.ai/", aiCurated: true }
         ],
         "PyTorch/TensorFlow": [
             { title: "PyTorch Tutorials", description: "Official learning resources.", type: "Documentation", difficulty: "Intermediate", link: "https://pytorch.org/tutorials/", aiCurated: true }
         ],
         "Optimizing for Edge (ONNX)": [
             { title: "ONNX Runtime", description: "Cross-platform, high performance ML accelerator.", type: "Documentation", difficulty: "Advanced", link: "https://onnxruntime.ai/", aiCurated: false }
         ],
         "Model Deployment": [
             { title: "Full Stack Deep Learning", description: "Shipping ML projects.", type: "Course", difficulty: "Advanced", link: "https://fullstackdeeplearning.com/", aiCurated: true }
         ]
    },

    // 8. ML Engineer
    "ML Engineer": {
         "Statistical Learning": [
             { title: "ISLR", description: "An Introduction to Statistical Learning.", type: "Book", difficulty: "Intermediate", link: "https://www.statlearning.com/", aiCurated: true }
         ],
         "Supervised/Unsupervised": [
             { title: "Andrew Ng's Machine Learning", description: "The classic foundational course.", type: "Course", difficulty: "Beginner", link: "https://www.coursera.org/specializations/machine-learning-introduction", aiCurated: true }
         ],
         "Scikit-Learn": [
             { title: "Scikit-Learn Docs", description: "Machine Learning in Python.", type: "Documentation", difficulty: "Intermediate", link: "https://scikit-learn.org/stable/", aiCurated: true }
         ],
         "MLOps Pipelines": [
             { title: "MLOps Zoomcamp", description: "Learn MLOps from scratch.", type: "Course", difficulty: "Intermediate", link: "https://github.com/DataTalksClub/mlops-zoomcamp", aiCurated: true }
         ],
         "Distributed Training": [
             { title: "Ray", description: "Fast and simple distributed computing.", type: "Documentation", difficulty: "Advanced", link: "https://www.ray.io/", aiCurated: false }
         ]
    },

    // 9. LLM Engineer
    "LLM Engineer": {
         "Transformer Architecture": [
             { title: "The Illustrated Transformer", description: "A visual explanation of the Transformer model.", type: "Article", difficulty: "Intermediate", link: "https://jalammar.github.io/illustrated-transformer/", aiCurated: true }
         ],
         "Fine-tuning (QLoRA)": [
             { title: "Hugging Face Course", description: "NLP course using Transformers.", type: "Course", difficulty: "Intermediate", link: "https://huggingface.co/course/chapter1/1", aiCurated: true }
         ],
         "RAG Systems": [
             { title: "LangChain Docs", description: "Building applications with LLMs.", type: "Documentation", difficulty: "Intermediate", link: "https://python.langchain.com/docs/get_started/introduction", aiCurated: true }
         ],
         "Prompt Engineering": [
             { title: "Prompt Engineering Guide", description: "Guides, papers, and tools for prompt engineering.", type: "Documentation", difficulty: "Beginner", link: "https://www.promptingguide.ai/", aiCurated: true }
         ]
    },

    // 10. Data Scientist
    "Data Scientist": {
         "EDA & Statistics": [
             { title: "Exploratory Data Analysis", description: "Course by Johns Hopkins University.", type: "Course", difficulty: "Intermediate", link: "https://www.coursera.org/learn/exploratory-data-analysis", aiCurated: false }
         ],
         "Data Wrangling (Pandas)": [
             { title: "Pandas User Guide", description: "Official documentation.", type: "Documentation", difficulty: "Intermediate", link: "https://pandas.pydata.org/docs/user_guide/index.html", aiCurated: true }
         ],
         "Visualization (Seaborn)": [
             { title: "Seaborn Gallery", description: "Example gallery for statistical graphics.", type: "Documentation", difficulty: "Beginner", link: "https://seaborn.pydata.org/examples/index.html", aiCurated: true }
         ],
         "Predictive Modeling": [
             { title: "Applied Predictive Modeling", description: "Book by Max Kuhn.", type: "Book", difficulty: "Advanced", link: "http://appliedpredictivemodeling.com/", aiCurated: true }
         ]
    },

    // 11. Data Analyst
    "Data Analyst": {
         "Excel/SQL Core": [
             { title: "Mode SQL Tutorial", description: "Interactive SQL tutorial.", type: "Practice", difficulty: "Beginner", link: "https://mode.com/sql-tutorial/", aiCurated: true }
         ],
         "Data Cleaning": [
             { title: "Data Cleaning Challenge", description: "5-day challenge on Kaggle.", type: "Practice", difficulty: "Beginner", link: "https://www.kaggle.com/rtatman/data-cleaning-challenge-day-1", aiCurated: false }
         ],
         "BI Tools (Tableau/PowerBI)": [
             { title: "Tableau Public", description: "Free software to explore different visualizations.", type: "Tool", difficulty: "Intermediate", link: "https://public.tableau.com/en-us/s/", aiCurated: true }
         ],
         "Statistical Summaries": [
             { title: "Statistics for Data Science", description: "Video series on YouTube.", type: "Video", difficulty: "Beginner", link: "https://www.youtube.com/results?search_query=statistics+for+data+science", aiCurated: false }
         ]
    },

    // 12. DevOps Engineer
    "DevOps Engineer": {
         "Linux Internals": [
             { title: "Linux Journey", description: "Learn the ways of the Linux command line.", type: "Course", difficulty: "Beginner", link: "https://linuxjourney.com/", aiCurated: true }
         ],
         "GitOps Workflows": [
             { title: "GitOps.tech", description: "What is GitOps?", type: "Article", difficulty: "Intermediate", link: "https://www.gitops.tech/", aiCurated: true }
         ],
         "CI/CD (Actions/Jenkins)": [
             { title: "GitLab CI/CD", description: "Continuous Integration concepts.", type: "Documentation", difficulty: "Intermediate", link: "https://docs.gitlab.com/ee/ci/", aiCurated: false }
         ],
         "Docker & K8s": [
             { title: "Kubernetes Basics", description: "Learn Kubernetes basics.", type: "Documentation", difficulty: "Intermediate", link: "https://kubernetes.io/docs/tutorials/kubernetes-basics/", aiCurated: true }
         ],
         "Infrastructure as Code": [
             { title: "Terraform - Get Started", description: "Provision infrastructure.", type: "Documentation", difficulty: "Intermediate", link: "https://developer.hashicorp.com/terraform/tutorials", aiCurated: true }
         ]
    },

    // 13. Cybersecurity Engineer
    "Cybersecurity Engineer": {
         "Networking Security": [
             { title: "Cybrary", description: "Free cybersecurity training.", type: "Course", difficulty: "Beginner", link: "https://www.cybrary.it/", aiCurated: true }
         ],
         "Encryption & Auth": [
             { title: "Crypto 101", description: "Introductory course on cryptography.", type: "Course", difficulty: "Intermediate", link: "https://www.crypto101.io/", aiCurated: true }
         ],
         "Penetration Testing": [
             { title: "Hack The Box", description: "Penetration Testing Labs.", type: "Practice", difficulty: "Advanced", link: "https://www.hackthebox.com/", aiCurated: true }
         ],
         "Vulnerability Research": [
             { title: "OWASP Top 10", description: "Most critical security risks.", type: "Documentation", difficulty: "Intermediate", link: "https://owasp.org/www-project-top-ten/", aiCurated: true }
         ]
    },

    // 14. Mobile App Developer
    "Mobile App Developer": {
         "Mobile UI Patterns": [
             { title: "Material Design", description: "Google's open-source design system.", type: "Documentation", difficulty: "Beginner", link: "https://m3.material.io/", aiCurated: true }
         ],
         "Swift/Kotlin Mastery": [
             { title: "Swift.org", description: "Documentation for Swift.", type: "Documentation", difficulty: "Intermediate", link: "https://www.swift.org/documentation/", aiCurated: true },
             { title: "Kotlin Koans", description: "Learn Kotlin through exercises.", type: "Practice", difficulty: "Intermediate", link: "https://kotlinlang.org/docs/koans.html", aiCurated: true }
         ],
         "React Native/Flutter": [
             { title: "Flutter Docs", description: "Build apps for any screen.", type: "Documentation", difficulty: "Intermediate", link: "https://docs.flutter.dev/", aiCurated: true }
         ],
         "App Store Operations": [
             { title: "App Store Connect", description: "Manage your apps.", type: "Documentation", difficulty: "Advanced", link: "https://developer.apple.com/app-store-connect/", aiCurated: false }
         ]
    },

    // 15. Cloud Engineer
    "Cloud Engineer": {
         "Cloud Fundamentals": [
             { title: "AWS Cloud Practitioner", description: "Fundamentals of the AWS Cloud.", type: "Course", difficulty: "Beginner", link: "https://aws.amazon.com/certification/certified-cloud-practitioner/", aiCurated: true }
         ],
         "Networking & IAM": [
             { title: "Google Cloud Networking", description: "VPC, Load Balancing, CDN.", type: "Documentation", difficulty: "Intermediate", link: "https://cloud.google.com/vpc", aiCurated: false }
         ],
         "Compute & Storage": [
             { title: "Azure Compute", description: "Host your applications.", type: "Documentation", difficulty: "Intermediate", link: "https://azure.microsoft.com/en-us/product-categories/compute/", aiCurated: false }
         ],
         "Serverless Architecture": [
             { title: "Serverless Land", description: "Resources for serverless development.", type: "Article", difficulty: "Advanced", link: "https://serverlessland.com/", aiCurated: true }
         ],
         "Global Distribution": [
             { title: "Cloudflare Workers", description: "Deploy serverless code instantly across the globe.", type: "Documentation", difficulty: "Advanced", link: "https://workers.cloudflare.com/", aiCurated: true }
         ]
    }
};
