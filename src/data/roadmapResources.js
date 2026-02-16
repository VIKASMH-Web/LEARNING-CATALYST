// Helper to get YouTube thumbnail
const getYoutubeThumb = (id) => `https://img.youtube.com/vi/${id}/mqdefault.jpg`;

export const roadmapResources = {
    "_defaults": [
        { 
            title: "Stack Overflow", 
            description: "The world's largest developer community.", 
            type: "Practice", 
            difficulty: "All", 
            link: "https://stackoverflow.com",
            duration: "N/A",
            source: "Stack Overflow",
            relevance: 80,
            aiCurated: false
        },
        { 
            title: "GitHub Explore", 
            description: "Discover trending repositories.", 
            type: "Project", 
            difficulty: "Intermediate", 
            link: "https://github.com/explore",
            duration: "Ongoing",
            source: "GitHub",
            relevance: 85,
            aiCurated: false
        },
        {
            title: "DevDocs",
            description: "Fast, offline documentation browser.",
            type: "Documentation",
            difficulty: "All",
            link: "https://devdocs.io",
            duration: "Reference",
            source: "DevDocs",
            relevance: 90,
            aiCurated: true
        }
    ],

    // 1. Full Stack Developer
    "Full Stack Developer": {
        "HTML/CSS Foundations": [
            { 
                title: "MDN Web Docs: HTML", 
                description: "The official guide to HTML standards and semantics.", 
                type: "Documentation", 
                difficulty: "Beginner", 
                link: "https://developer.mozilla.org/en-US/docs/Web/HTML", 
                duration: "10h",
                source: "MDN",
                relevance: 98,
                aiCurated: true 
            },
            { 
                title: "HTML & CSS Full Course", 
                description: "Complete beginner course by SuperSimpleDev.", 
                type: "Video", 
                difficulty: "Beginner", 
                link: "https://www.youtube.com/watch?v=Ke90Tje7VS0",
                videoId: "Ke90Tje7VS0",
                duration: "6h 30m",
                source: "YouTube",
                relevance: 95,
                aiCurated: true 
            },
            { 
                title: "Frontend Mentor", 
                description: "Solve real-world HTML, CSS and JS challenges.", 
                type: "Practice", 
                difficulty: "Beginner", 
                link: "https://www.frontendmentor.io/", 
                duration: "Project",
                source: "Frontend Mentor",
                relevance: 90,
                aiCurated: false 
            }
        ],
        "JS/TypeScript Depth": [
            { title: "JavaScript.info", description: "The Modern JavaScript Tutorial.", type: "Documentation", difficulty: "Intermediate", link: "https://javascript.info/", duration: "20h", source: "JS.info", relevance: 99, aiCurated: true },
            { title: "JavaScript Mastery", description: "Complete JS course with projects.", type: "Video", difficulty: "Intermediate", link: "https://www.youtube.com/watch?v=PkZNo7MFNFg", videoId: "PkZNo7MFNFg", duration: "3h", source: "YouTube", relevance: 92, aiCurated: false },
            { title: "LeetCode: JavaScript 30", description: "30 days of JS coding challenges.", type: "Practice", difficulty: "Advanced", link: "https://leetcode.com/studyplan/30-days-of-javascript/", duration: "30 Days", source: "LeetCode", relevance: 88, aiCurated: true }
        ],
        "Frontend Frameworks (React)": [
            { title: "React.dev", description: "The library for web and native user interfaces.", type: "Documentation", difficulty: "Intermediate", link: "https://react.dev/", duration: "15h", source: "React", relevance: 100, aiCurated: true },
            { title: "React JS - Full Course", description: "Build a Netflix Clone with React.", type: "Video", difficulty: "Beginner", link: "https://www.youtube.com/watch?v=SqcY0GlETPk", videoId: "SqcY0GlETPk", duration: "10h", source: "YouTube", relevance: 94, aiCurated: true },
            { title: "Build Your Own React", description: "Rewrite React from scratch to understand it.", type: "Project", difficulty: "Advanced", link: "https://pomb.us/build-your-own-react/", duration: "4h", source: "Rodrigo Pombo", relevance: 96, aiCurated: true }
        ],
        "Backend (Node/Python/Go)": [
            { title: "Node.js Design Patterns", description: "Design patterns for robust Node.js apps.", type: "Documentation", difficulty: "Advanced", link: "https://www.nodejsdesignpatterns.com/", duration: "Book", source: "Node.js", relevance: 90, aiCurated: true },
            { title: "Node.js Full Course", description: "Learn Node.js in 1 Hour.", type: "Video", difficulty: "Beginner", link: "https://www.youtube.com/watch?v=TlB_eWDSMt4", videoId: "TlB_eWDSMt4", duration: "1h", source: "YouTube", relevance: 85, aiCurated: false },
            { title: "Roadmap.sh Backend", description: "Step by step guide to becoming a backend dev.", type: "Practice", difficulty: "Intermediate", link: "https://roadmap.sh/backend", duration: "Ongoing", source: "Roadmap.sh", relevance: 95, aiCurated: true }
        ],
        "DB & Architecture": [
            { title: "PostgreSQL Docs", description: "The world's most advanced open source database.", type: "Documentation", difficulty: "Intermediate", link: "https://www.postgresql.org/docs/", duration: "Ref", source: "Postgres", relevance: 98, aiCurated: true },
            { title: "Database Systems Course", description: "CMU Database Systems course.", type: "Video", difficulty: "Advanced", link: "https://www.youtube.com/watch?v=uikbtpVZS2s", videoId: "uikbtpVZS2s", duration: "20h", source: "CMU/YouTube", relevance: 92, aiCurated: true },
            { title: "SQLBolt", description: "Learn SQL with simple, interactive exercises.", type: "Practice", difficulty: "Beginner", link: "https://sqlbolt.com/", duration: "2h", source: "SQLBolt", relevance: 90, aiCurated: false }
        ],
        "DevOps & Deployment": [
             { title: "Docker Docs", description: "Get started with Docker.", type: "Documentation", difficulty: "Beginner", link: "https://docs.docker.com/get-started/", duration: "5h", source: "Docker", relevance: 99, aiCurated: true },
             { title: "DevOps Bootcamp", description: "Learn Docker, Kubernetes, Terraform and more.", type: "Video", difficulty: "Intermediate", link: "https://www.youtube.com/watch?v=j5Zsa_eOXeY", videoId: "j5Zsa_eOXeY", duration: "4h", source: "YouTube", relevance: 94, aiCurated: true },
             { title: "SadServers", description: "Troubleshoot broken Linux servers.", type: "Practice", difficulty: "Advanced", link: "https://sadservers.com/", duration: "Ongoing", source: "SadServers", relevance: 96, aiCurated: true }
        ]
    },

    // 2. AI Engineer
    "AI Engineer": {
         "Linear Algebra/Calc": [
             { title: "Immersive Linear Algebra", description: "Interactive linear algebra guide.", type: "Documentation", difficulty: "Intermediate", link: "http://immersivemath.com/ila/index.html", duration: "10h", source: "ImmersiveMath", relevance: 92, aiCurated: true },
             { title: "Essence of Linear Algebra", description: "3Blue1Brown's visual masterpiece.", type: "Video", difficulty: "Beginner", link: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab", videoId: "fNk_zzaMoSs", duration: "3h", source: "3Blue1Brown", relevance: 99, aiCurated: true },
             { title: "Khan Academy", description: "Practice Calculus and Algebra.", type: "Practice", difficulty: "Beginner", link: "https://www.khanacademy.org/math", duration: "Ongoing", source: "Khan", relevance: 90, aiCurated: false }
         ],
         "Deep Learning Architectures": [
             { title: "Neural Networks & Deep Learning", description: "Michael Nielsen's free online book.", type: "Documentation", difficulty: "Advanced", link: "http://neuralnetworksanddeeplearning.com/", duration: "15h", source: "Nielson", relevance: 96, aiCurated: true },
             { title: "MIT 6.S191: Deep Learning", description: "Intro to Deep Learning.", type: "Video", difficulty: "Intermediate", link: "https://www.youtube.com/watch?v=5tvmMX8r_OM", videoId: "5tvmMX8r_OM", duration: "12h", source: "MIT", relevance: 98, aiCurated: true },
             { title: "TensorFlow Playground", description: "Tinker with a neural network in your browser.", type: "Practice", difficulty: "Beginner", link: "https://playground.tensorflow.org/", duration: "1h", source: "Google", relevance: 94, aiCurated: true }
         ],
         "PyTorch/TensorFlow": [
             { title: "PyTorch 60min Blitz", description: "Official fast-track to PyTorch.", type: "Documentation", difficulty: "Intermediate", link: "https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html", duration: "1h", source: "PyTorch", relevance: 97, aiCurated: true },
             { title: "PyTorch Full Course", description: "Learn PyTorch for Deep Learning.", type: "Video", difficulty: "Beginner", link: "https://www.youtube.com/watch?v=Z_ikDlimN6A", videoId: "Z_ikDlimN6A", duration: "26h", source: "FreeCodeCamp", relevance: 95, aiCurated: true },
             { title: "Kaggle: Titanic", description: "Start your first ML competition.", type: "Practice", difficulty: "Beginner", link: "https://www.kaggle.com/c/titanic", duration: "Project", source: "Kaggle", relevance: 92, aiCurated: false }
         ],
         "Optimizing for Edge (ONNX)": [
             { title: "ONNX Runtime", description: "Optimize and deploy models.", type: "Documentation", difficulty: "Advanced", link: "https://onnxruntime.ai/", duration: "Ref", source: "Microsoft", relevance: 90, aiCurated: true },
             { title: "TinyML", description: "Machine Learning on Embedded Systems.", type: "Video", difficulty: "Advanced", link: "https://www.youtube.com/watch?v=TgekTwrftcg", videoId: "TgekTwrftcg", duration: "1h", source: "YouTube", relevance: 88, aiCurated: false },
             { title: "Edge Impulse", description: "Build data-driven solutions for Edge.", type: "Practice", difficulty: "Intermediate", link: "https://www.edgeimpulse.com/", duration: "Tool", source: "EdgeImpulse", relevance: 91, aiCurated: true }
         ],
         "NPU Acceleration": [
             { title: "AI Acceleration", description: "Understanding Hardware Accelerators.", type: "Documentation", difficulty: "Advanced", link: "https://docs.nvidia.com/deeplearning/performance/index.html", duration: "5h", source: "NVIDIA", relevance: 93, aiCurated: true },
             { title: "How TPUs Work", description: "Google Cloud Tech explainer.", type: "Video", difficulty: "Intermediate", link: "https://www.youtube.com/watch?v=MXxN4fv01c8", videoId: "MXxN4fv01c8", duration: "10m", source: "Google", relevance: 85, aiCurated: false },
             { title: "Coral.ai", description: "Local AI with TPU.", type: "Practice", difficulty: "Advanced", link: "https://coral.ai/docs/", duration: "Project", source: "Google", relevance: 89, aiCurated: true }
         ],
         "Model Deployment": [
             { title: "Serving Models", description: "TensorFlow Serving docs.", type: "Documentation", difficulty: "Intermediate", link: "https://www.tensorflow.org/tfx/guide/serving", duration: "Ref", source: "TensorFlow", relevance: 94, aiCurated: true },
             { title: "MLOps Specialization", description: "Andrew Ng's course on production ML.", type: "Video", difficulty: "Advanced", link: "https://www.coursera.org/specializations/mlops-machine-learning-engineering", videoId: "", duration: "Course", source: "Coursera", relevance: 96, aiCurated: true },
             { title: "Hugging Face Spaces", description: "Host your ML demo apps.", type: "Practice", difficulty: "Beginner", link: "https://huggingface.co/spaces", duration: "Project", source: "Hugging Face", relevance: 98, aiCurated: true }
         ]
    },

        // 3. Frontend Developer
    "Frontend Developer": {
        "Browser Architecture": [
            { title: "How Browsers Work", description: "Behind the scenes of modern web browsers.", type: "Documentation", difficulty: "Advanced", link: "https://web.dev/howbrowserswork/", duration: "1h", source: "Web.dev", relevance: 95, aiCurated: true },
            { title: "Chrome DevTools", description: "Mastering the browser's debugger.", type: "Video", difficulty: "Intermediate", link: "https://www.youtube.com/watch?v=x4q86IjJFag", videoId: "x4q86IjJFag", duration: "45m", source: "Google", relevance: 90, aiCurated: false },
            { title: "Critical Rendering Path", description: "Optimize render blocking resources.", type: "Practice", difficulty: "Advanced", link: "https://web.dev/critical-rendering-path/", duration: "Workshop", source: "Web.dev", relevance: 93, aiCurated: true }
        ],
        "Advanced CSS & Layout": [
             { title: "CSS Grid Garden", description: "Learn Grid Layout with a game.", type: "Practice", difficulty: "Beginner", link: "https://cssgridgarden.com/", duration: "30m", source: "Codepip", relevance: 98, aiCurated: true },
             { title: "Sass Guide", description: "CSS with superpowers.", type: "Documentation", difficulty: "Intermediate", link: "https://sass-lang.com/guide", duration: "2h", source: "Sass", relevance: 85, aiCurated: false },
             { title: "Kevin Powell CSS", description: "The King of CSS on YouTube.", type: "Video", difficulty: "Intermediate", link: "https://www.youtube.com/watch?v=rg7Fvvl3taU", videoId: "rg7Fvvl3taU", duration: "Various", source: "YouTube", relevance: 96, aiCurated: true }
        ],
        "JS Core & Patterns": [
             { title: "You Don't Know JS", description: "Deep dive into JS core.", type: "Documentation", difficulty: "Advanced", link: "https://github.com/getify/You-Dont-Know-JS", duration: "Book", source: "GitHub", relevance: 99, aiCurated: true },
             { title: "JS Event Loop", description: "What the heck is the event loop anyway?", type: "Video", difficulty: "Intermediate", link: "https://www.youtube.com/watch?v=8aGhZQkoFbQ", videoId: "8aGhZQkoFbQ", duration: "30m", source: "JSConf", relevance: 100, aiCurated: true },
             { title: "Just JavaScript", description: "Rebuild your mental model of JS.", type: "Practice", difficulty: "Intermediate", link: "https://justjavascript.com/", duration: "Course", source: "Dan Abramov", relevance: 95, aiCurated: true }
        ],
        "Framework Mastery": [
             { title: "Vue.js Official", description: "The Progressive JavaScript Framework.", type: "Documentation", difficulty: "Intermediate", link: "https://vuejs.org/guide/introduction.html", duration: "10h", source: "Vue", relevance: 92, aiCurated: true },
             { title: "Svelte Tutorial", description: "Interactive cybernetically enhanced web apps.", type: "Practice", difficulty: "Beginner", link: "https://svelte.dev/tutorial", duration: "2h", source: "Svelte", relevance: 94, aiCurated: true },
             { title: "Angular Crash Course", description: "Learn Angular in 2024.", type: "Video", difficulty: "Intermediate", link: "https://www.youtube.com/watch?v=3qBXWUpoPHo", videoId: "3qBXWUpoPHo", duration: "1h", source: "YouTube", relevance: 88, aiCurated: false }
        ],
        "State Management": [
             { title: "Redux Fundamentals", description: "Core concepts of Redux.", type: "Documentation", difficulty: "Advanced", link: "https://redux.js.org/tutorials/fundamentals/part-1-overview", duration: "4h", source: "Redux", relevance: 90, aiCurated: true },
             { title: "Zustand Bear", description: "Small, fast state management.", type: "Practice", difficulty: "Intermediate", link: "https://github.com/pmndrs/zustand", duration: "Repo", source: "GitHub", relevance: 95, aiCurated: true },
             { title: "State Machines", description: "XState for robust logic.", type: "Video", difficulty: "Advanced", link: "https://www.youtube.com/watch?v=s0h34OkEVUE", videoId: "s0h34OkEVUE", duration: "1h", source: "YouTube", relevance: 88, aiCurated: false }
        ],
        "Performance Optimization": [
             { title: "Web Vitals", description: "Optimize for UX and SEO.", type: "Documentation", difficulty: "Advanced", link: "https://web.dev/vitals/", duration: "3h", source: "Google", relevance: 97, aiCurated: true },
             { title: "Lighthouse", description: "Audit your web apps.", type: "Practice", difficulty: "Intermediate", link: "https://developers.google.com/web/tools/lighthouse", duration: "Tool", source: "Google", relevance: 95, aiCurated: false },
             { title: "React Profiler", description: "Optimizing Performance in React.", type: "Video", difficulty: "Advanced", link: "https://www.youtube.com/watch?v=CaShN6mCJB0", videoId: "CaShN6mCJB0", duration: "20m", source: "Ben Awad", relevance: 92, aiCurated: true }
        ]
    },

    // 4. Python Developer
    "Python Developer": {
        "Syntax & Standard Lib": [
            { title: "Python 3 Docs", description: "Official documentation.", type: "Documentation", difficulty: "Beginner", link: "https://docs.python.org/3/", duration: "Ref", source: "Python.org", relevance: 100, aiCurated: true },
            { title: "Python for Beginners", description: "Mosh's famous 6 hour course.", type: "Video", difficulty: "Beginner", link: "https://www.youtube.com/watch?v=_uQrJ0TkZlc", videoId: "_uQrJ0TkZlc", duration: "6h", source: "Mosh", relevance: 98, aiCurated: true },
            { title: "CodeWars Python", description: "Practice katas.", type: "Practice", difficulty: "Intermediate", link: "https://www.codewars.com/?language=python", duration: "Ongoing", source: "CodeWars", relevance: 92, aiCurated: false }
        ],
        "Data Structures": [
             { title: "Problem Solving with Algorithms", description: "Interactive Python book.", type: "Documentation", difficulty: "Intermediate", link: "https://runestone.academy/runestone/books/published/pythonds/index.html", duration: "Book", source: "Runestone", relevance: 94, aiCurated: true },
             { title: "NeetCode 150", description: "DSA roadmap with Python.", type: "Video", difficulty: "Advanced", link: "https://neetcode.io/", videoId: "", duration: "Course", source: "NeetCode", relevance: 96, aiCurated: true },
             { title: "Real Python DSA", description: "Tutorials on arrays, linked lists.", type: "Practice", difficulty: "Beginner", link: "https://realpython.com/search?q=data+structures", duration: "Various", source: "RealPython", relevance: 90, aiCurated: false }
        ],
        "Automation & Scripting": [
             { title: "Automate the Boring Stuff", description: "Practical automation projects.", type: "Documentation", difficulty: "Beginner", link: "https://automatetheboringstuff.com/", duration: "Book", source: "Al Sweigart", relevance: 99, aiCurated: true },
             { title: "Python Scripting", description: "Write scripts for everything.", type: "Video", difficulty: "Intermediate", link: "https://www.youtube.com/watch?v=ix9cRaBkVe0", videoId: "ix9cRaBkVe0", duration: "1h", source: "YouTube", relevance: 88, aiCurated: false },
             { title: "Build a Bot", description: "Create a Discord/Slack bot.", type: "Practice", difficulty: "Intermediate", link: "https://realpython.com/how-to-make-a-discord-bot-python/", duration: "Project", source: "RealPython", relevance: 92, aiCurated: true }
        ],
        "Web Frameworks (FastAPI)": [
             { title: "FastAPI Docs", description: "Modern, high-performance web framework.", type: "Documentation", difficulty: "Intermediate", link: "https://fastapi.tiangolo.com/", duration: "Ref", source: "FastAPI", relevance: 97, aiCurated: true },
             { title: "Django Crash Course", description: "Build a website with Django.", type: "Video", difficulty: "Intermediate", link: "https://www.youtube.com/watch?v=PTZiDnuC86g", videoId: "PTZiDnuC86g", duration: "1h", source: "Traversy", relevance: 90, aiCurated: false },
             { title: "TestDriven.io", description: "TDD with Python and Flask.", type: "Practice", difficulty: "Advanced", link: "https://testdriven.io/", duration: "Course", source: "TestDriven", relevance: 94, aiCurated: true }
        ],
        "Data Science Foundations": [
             { title: "Pandas Docs", description: "Data analysis toolkit.", type: "Documentation", difficulty: "Intermediate", link: "https://pandas.pydata.org/", duration: "Ref", source: "Pandas", relevance: 95, aiCurated: true },
             { title: "Kaggle Course", description: "Intro to Machine Learning.", type: "Practice", difficulty: "Beginner", link: "https://www.kaggle.com/learn/intro-to-machine-learning", duration: "3h", source: "Kaggle", relevance: 98, aiCurated: true },
             { title: "Data Science for Everyone", description: "Conceptual introduction.", type: "Video", difficulty: "Beginner", link: "https://www.youtube.com/watch?v=ua-CiDNNj30", videoId: "ua-CiDNNj30", duration: "2h", source: "Datacamp", relevance: 85, aiCurated: false }
        ],
        "Advanced Concurrency": [
             { title: "AsyncIO Docs", description: "Asynchronous I/O.", type: "Documentation", difficulty: "Advanced", link: "https://docs.python.org/3/library/asyncio.html", duration: "Ref", source: "Python", relevance: 92, aiCurated: true },
             { title: "Python Concurrency", description: "Threading vs Multiprocessing vs Async.", type: "Video", difficulty: "Advanced", link: "https://www.youtube.com/watch?v=GpqAQxH1Afc", videoId: "GpqAQxH1Afc", duration: "45m", source: "mCoding", relevance: 95, aiCurated: true },
             { title: "Concurrent Futures", description: "Easy parallelism.", type: "Practice", difficulty: "Intermediate", link: "https://realpython.com/python-concurrency/", duration: "Tutorial", source: "RealPython", relevance: 90, aiCurated: false }
        ]
    },
    
    // 5. Java Developer
    "Java Developer": {
        "Core Java (JVM)": [
            { title: "Java SE 21 Docs", description: "Official API specification.", type: "Documentation", difficulty: "Beginner", link: "https://docs.oracle.com/en/java/javase/21/", duration: "Ref", source: "Oracle", relevance: 98, aiCurated: true },
            { title: "Java Tutorial for Beginners", description: "Complete Java course.", type: "Video", difficulty: "Beginner", link: "https://www.youtube.com/watch?v=eIrMbAQSU34", videoId: "eIrMbAQSU34", duration: "2h", source: "Mosh", relevance: 96, aiCurated: true },
            { title: "Hyperskill Java", description: "Project-based learning.", type: "Practice", difficulty: "Intermediate", link: "https://hyperskill.org/tracks", duration: "Course", source: "JetBrains", relevance: 92, aiCurated: false }
        ],
        "OOP & Design Patterns": [
             { title: "Refactoring.Guru", description: "Design patterns in Java.", type: "Documentation", difficulty: "Intermediate", link: "https://refactoring.guru/design-patterns/java", duration: "Ref", source: "RefactoringGuru", relevance: 99, aiCurated: true },
             { title: "Design Patterns Video", description: "Christopher Okhravi's series.", type: "Video", difficulty: "Advanced", link: "https://www.youtube.com/watch?v=v9ejT8FO-7I", videoId: "v9ejT8FO-7I", duration: "Series", source: "YouTube", relevance: 95, aiCurated: true },
             { title: "Head First Design Patterns", description: "The classic book.", type: "Documentation", difficulty: "Beginner", link: "https://www.oreilly.com/library/view/head-first-design/0596007124/", duration: "Book", source: "O'Reilly", relevance: 90, aiCurated: false }
        ],
        "Spring Boot Ecosystem": [
             { title: "Spring Boot Docs", description: "Build production-grade apps.", type: "Documentation", difficulty: "Intermediate", link: "https://spring.io/projects/spring-boot", duration: "Ref", source: "Spring", relevance: 98, aiCurated: true },
             { title: "Spring Boot Course", description: "Amigoscode full course.", type: "Video", difficulty: "Intermediate", link: "https://www.youtube.com/watch?v=9SGDpanrc8U", videoId: "9SGDpanrc8U", duration: "3h", source: "Amigoscode", relevance: 96, aiCurated: true },
             { title: "Build a REST API", description: "Practical Spring Boot project.", type: "Practice", difficulty: "Intermediate", link: "https://spring.io/guides/gs/rest-service/", duration: "30m", source: "Spring", relevance: 94, aiCurated: false }
        ],
        "Hibernate & JPA": [
             { title: "Hibernate ORM", description: "Domain model persistence.", type: "Documentation", difficulty: "Advanced", link: "https://hibernate.org/orm/documentation/6.3/", duration: "Ref", source: "Hibernate", relevance: 90, aiCurated: true },
             { title: "JPA & Hibernate", description: "Java Brains tutorial.", type: "Video", difficulty: "Intermediate", link: "https://www.youtube.com/playlist?list=PL35F87EED32D93922", videoId: "", duration: "Series", source: "JavaBrains", relevance: 88, aiCurated: false },
             { title: "Baeldung Hibernate", description: "In-depth articles.", type: "Practice", difficulty: "Advanced", link: "https://www.baeldung.com/learn-jpa-hibernate", duration: "Ref", source: "Baeldung", relevance: 95, aiCurated: true }
        ],
        "Microservices (Cloud)": [
             { title: "Spring Cloud", description: "Microservices tools.", type: "Documentation", difficulty: "Advanced", link: "https://spring.io/projects/spring-cloud", duration: "Ref", source: "Spring", relevance: 92, aiCurated: true },
             { title: "Microservices with Java", description: "Architecture patterns.", type: "Video", difficulty: "Advanced", link: "https://www.youtube.com/watch?v=1aWhYEynZQw", videoId: "1aWhYEynZQw", duration: "1h", source: "TechTalks", relevance: 90, aiCurated: false },
             { title: "JHipster", description: "Generate microservices.", type: "Practice", difficulty: "Intermediate", link: "https://www.jhipster.tech/", duration: "Tool", source: "JHipster", relevance: 88, aiCurated: true }
        ],
        "Build Tools (Maven/Gradle)": [
             { title: "Maven in 5 Minutes", description: "Quick start.", type: "Documentation", difficulty: "Beginner", link: "https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html", duration: "5m", source: "Apache", relevance: 85, aiCurated: false },
             { title: "Gradle vs Maven", description: "Which one to choose?", type: "Video", difficulty: "Intermediate", link: "https://www.youtube.com/watch?v=n1V8AtPPqZA", videoId: "n1V8AtPPqZA", duration: "10m", source: "YouTube", relevance: 80, aiCurated: false },
             { title: "Building with Gradle", description: "Official training.", type: "Practice", difficulty: "Advanced", link: "https://gradle.org/training/", duration: "Course", source: "Gradle", relevance: 92, aiCurated: true }
        ]
    },
    
    // 2. Backend Developer (Re-adding with rich data)
    "Backend Developer": {
        "Server Fundamentals": [
            { title: "Linux Command Line", description: "The bible for Linux users.", type: "Documentation", difficulty: "Beginner", link: "https://linuxcommand.org/tlcl.php", duration: "Book", source: "LinuxCommand", relevance: 98, aiCurated: true },
            { title: "HTTP: The Definitive Guide", description: "Must-read for backend devs.", type: "Documentation", difficulty: "Intermediate", link: "https://www.oreilly.com/library/view/http-the-definitive/1565925092/", duration: "Book", source: "O'Reilly", relevance: 90, aiCurated: false },
            { title: "Traversy Node.js", description: "Node.js Crash Course.", type: "Video", difficulty: "Beginner", link: "https://www.youtube.com/watch?v=fBNz5xF-Kx4", videoId: "fBNz5xF-Kx4", duration: "1h 30m", source: "YouTube", relevance: 95, aiCurated: true }
        ],
        "API Design (REST/gRPC)": [
            { title: "Microsoft REST Guidelines", description: "Industry standard for REST APIs.", type: "Documentation", difficulty: "Intermediate", link: "https://github.com/microsoft/api-guidelines", duration: "Ref", source: "Microsoft", relevance: 95, aiCurated: true },
            { title: "gRPC Crash Course", description: "Learn gRPC with Go.", type: "Video", difficulty: "Advanced", link: "https://www.youtube.com/watch?v=2Sm_O75I7H0", videoId: "2Sm_O75I7H0", duration: "45m", source: "YouTube", relevance: 92, aiCurated: true },
            { title: "Swagger Editor", description: "Design your API.", type: "Practice", difficulty: "Beginner", link: "https://editor.swagger.io/", duration: "Tool", source: "SmartBear", relevance: 88, aiCurated: false }
        ],
        "Data Persistence (SQL/NoSQL)": [
             { title: "PostgreSQL Tutorial", description: "Master Postgres.", type: "Documentation", difficulty: "Beginner", link: "https://www.postgresqltutorial.com/", duration: "Course", source: "PostgresTutorial", relevance: 98, aiCurated: true },
             { title: "MongoDB University", description: "Official MongoDB courses.", type: "Course", difficulty: "Intermediate", link: "https://learn.mongodb.com/", duration: "Various", source: "MongoDB", relevance: 94, aiCurated: true },
             { title: "SQL Murder Mystery", description: "Solve a crime with SQL.", type: "Practice", difficulty: "Beginner", link: "https://mystery.knightlab.com/", duration: "Game", source: "KnightLab", relevance: 90, aiCurated: false }
        ],
        "Caching & Message Queues": [
             { title: "Redis Crash Course", description: "Learn Redis in 30 mins.", type: "Video", difficulty: "Intermediate", link: "https://www.youtube.com/watch?v=jgpVdJB2sKQ", videoId: "jgpVdJB2sKQ", duration: "30m", source: "YouTube", relevance: 92, aiCurated: true },
             { title: "RabbitMQ Tutorials", description: "Official RabbitMQ guides.", type: "Documentation", difficulty: "Intermediate", link: "https://www.rabbitmq.com/getstarted.html", duration: "Ref", source: "RabbitMQ", relevance: 90, aiCurated: true },
             { title: "System Design: Caching", description: "Deep dive into caching strategies.", type: "Documentation", difficulty: "Advanced", link: "https://aws.amazon.com/caching/", duration: "Article", source: "AWS", relevance: 88, aiCurated: false }
        ],
        "Microservices": [
             { title: "Microservices Patterns", description: "Chris Richardson's patterns.", type: "Documentation", difficulty: "Advanced", link: "https://microservices.io/", duration: "Ref", source: "Microservices.io", relevance: 96, aiCurated: true },
             { title: "Designing Microservices", description: "Google Cloud Architecture.", type: "Documentation", difficulty: "Advanced", link: "https://cloud.google.com/architecture/microservices-architecture-concepts", duration: "Guide", source: "Google", relevance: 92, aiCurated: true },
             { title: "Uber Architecture", description: "How Uber scaled to 4000 services.", type: "Video", difficulty: "Advanced", link: "https://www.youtube.com/watch?v=kb-m2fasdDY", videoId: "kb-m2fasdDY", duration: "45m", source: "YouTube", relevance: 85, aiCurated: false }
        ],
        "System Design": [
             { title: "System Design Primer", description: "The ultimate guide for interviews.", type: "Documentation", difficulty: "Advanced", link: "https://github.com/donnemartin/system-design-primer", duration: "Repo", source: "GitHub", relevance: 100, aiCurated: true },
             { title: "Grokking System Design", description: "Course for system design.", type: "Course", difficulty: "Advanced", link: "https://www.educative.io/courses/grokking-the-system-design-interview", duration: "Course", source: "Educative", relevance: 95, aiCurated: true },
             { title: "Hussein Nasser", description: "Database and Backend engineering.", type: "Video", difficulty: "Advanced", link: "https://www.youtube.com/user/hvnsweeting", videoId: "", duration: "Channel", source: "YouTube", relevance: 90, aiCurated: false }
        ]
    },

    // 6. C / C++ Developer
    "C / C++ Developer": {
        "Memory Management": [
             { title: "Beej's Guide to C", description: "Humorous and deep C guide.", type: "Documentation", difficulty: "Beginner", link: "https://beej.us/guide/bgc/", duration: "Book", source: "Beej", relevance: 95, aiCurated: true },
             { title: "Memory Layout of C", description: "Stack vs Heap visually.", type: "Video", difficulty: "Intermediate", link: "https://www.youtube.com/watch?v=_8-ht2AKyH4", videoId: "_8-ht2AKyH4", duration: "20m", source: "YouTube", relevance: 92, aiCurated: true },
             { title: "Valgrind Quick Start", description: "Detect memory leaks.", type: "Practice", difficulty: "Advanced", link: "https://valgrind.org/docs/manual/quick-start.html", duration: "Tool", source: "Valgrind", relevance: 90, aiCurated: false }
        ],
        "Pointers & References": [
             { title: "Pointers in C/C++", description: "FreeCodeCamp full course.", type: "Video", difficulty: "Beginner", link: "https://www.youtube.com/watch?v=zuegQmMdy8M", videoId: "zuegQmMdy8M", duration: "4h", source: "FreeCodeCamp", relevance: 98, aiCurated: true },
             { title: "C++ FAQ", description: "Bjarne Stroustrup's FAQ.", type: "Documentation", difficulty: "Intermediate", link: "https://www.stroustrup.com/bs_faq.html", duration: "Ref", source: "Stroustrup", relevance: 94, aiCurated: true },
             { title: "Pointer Exercises", description: "Practice pointer arithmetic.", type: "Practice", difficulty: "Intermediate", link: "https://www.w3resource.com/c-programming-exercises/pointer/index.php", duration: "List", source: "W3Resource", relevance: 88, aiCurated: false }
        ],
        "STL & Templates": [
             { title: "cppreference.com", description: "The definitive C++ reference.", type: "Documentation", difficulty: "Advanced", link: "https://en.cppreference.com/w/", duration: "Ref", source: "CppReference", relevance: 99, aiCurated: true },
             { title: "Back to Basics: STL", description: "CppCon talk on STL.", type: "Video", difficulty: "Intermediate", link: "https://www.youtube.com/watch?v=RRVYpIET_RU", videoId: "RRVYpIET_RU", duration: "1h", source: "CppCon", relevance: 95, aiCurated: true },
             { title: "HackerRank C++", description: "Solve STL problems.", type: "Practice", difficulty: "Beginner", link: "https://www.hackerrank.com/domains/cpp", duration: "Ongoing", source: "HackerRank", relevance: 90, aiCurated: false }
        ],
        "Concurrency & Threading": [
             { title: "C++ Concurrency", description: "Modern C++ threading.", type: "Documentation", difficulty: "Advanced", link: "https://learning.oreilly.com/library/view/c-concurrency-in/9781617294693/", duration: "Book", source: "Manning", relevance: 92, aiCurated: true },
             { title: "Multithreading in C++", description: "Video tutorial series.", type: "Video", difficulty: "Advanced", link: "https://www.youtube.com/watch?v=wXBcwHwIt_I", videoId: "wXBcwHwIt_I", duration: "Series", source: "TheCherno", relevance: 94, aiCurated: true },
             { title: "Deadlock Empire", description: "Game to learn concurrency.", type: "Practice", difficulty: "Advanced", link: "https://deadlockempire.github.io/", duration: "Game", source: "GitHub", relevance: 96, aiCurated: true }
        ],
        "Systems Programming": [
             { title: "OS: Three Easy Pieces", description: "Best free OS book.", type: "Documentation", difficulty: "Advanced", link: "https://pages.cs.wisc.edu/~remzi/OSTEP/", duration: "Book", source: "Wisc.edu", relevance: 98, aiCurated: true },
             { title: "Writing an OS in Rust", description: "Modern take on systems.", type: "Project", difficulty: "Advanced", link: "https://os.phil-opp.com/", duration: "Blog", source: "PhilOpp", relevance: 90, aiCurated: false },
             { title: "Linux Kernel Dev", description: "Intro to kernel modules.", type: "Video", difficulty: "Advanced", link: "https://www.youtube.com/watch?v=WiZ05pnHZqM", videoId: "WiZ05pnHZqM", duration: "Various", source: "YouTube", relevance: 88, aiCurated: true }
        ],
        "Compilers & Optimization": [
             { title: "Compiler Explorer", description: "Interactive assembly viewer.", type: "Practice", difficulty: "Advanced", link: "https://godbolt.org/", duration: "Tool", source: "Godbolt", relevance: 95, aiCurated: true },
             { title: "LLVM Tutorial", description: "Write a language with LLVM.", type: "Documentation", difficulty: "Advanced", link: "https://llvm.org/docs/tutorial/", duration: "Tutorial", source: "LLVM", relevance: 92, aiCurated: true },
             { title: "Let's Build a Compiler", description: "Jack Crenshaw's classic.", type: "Documentation", difficulty: "Advanced", link: "https://compilers.iecc.com/crenshaw/", duration: "Book", source: "IECC", relevance: 90, aiCurated: false }
        ]
    },

    // 8. ML Engineer
    "ML Engineer": {
         "Statistical Learning": [
             { title: "ISLR Book", description: "Intro to Statistical Learning.", type: "Documentation", difficulty: "Intermediate", link: "https://www.statlearning.com/", duration: "Book", source: "StatLearning", relevance: 97, aiCurated: true },
             { title: "StatQuest", description: "Statistics made easy.", type: "Video", difficulty: "Beginner", link: "https://www.youtube.com/watch?v=qBigTkBLU6g", videoId: "qBigTkBLU6g", duration: "Channel", source: "StatQuest", relevance: 99, aiCurated: true },
             { title: "Seeing Theory", description: "Visual introduction to probability.", type: "Practice", difficulty: "Beginner", link: "https://seeing-theory.brown.edu/", duration: "Interactive", source: "Brown.edu", relevance: 94, aiCurated: true }
         ],
         "Supervised/Unsupervised": [
             { title: "Andrew Ng ML", description: "The original ML course.", type: "Course", difficulty: "Beginner", link: "https://www.coursera.org/specializations/machine-learning-introduction", duration: "Course", source: "Coursera", relevance: 100, aiCurated: true },
             { title: "Scikit-Learn Algorithms", description: "Visual map of algos.", type: "Documentation", difficulty: "Intermediate", link: "https://scikit-learn.org/stable/tutorial/machine_learning_map/index.html", duration: "Ref", source: "Scikit-Learn", relevance: 92, aiCurated: false },
             { title: "Kaggle Competitions", description: "Practice on real data.", type: "Practice", difficulty: "Intermediate", link: "https://www.kaggle.com/competitions", duration: "Ongoing", source: "Kaggle", relevance: 96, aiCurated: true }
         ],
         "Feature Engineering": [
             { title: "Feature Engineering for ML", description: "O'Reilly specific guide.", type: "Documentation", difficulty: "Intermediate", link: "https://www.oreilly.com/library/view/feature-engineering-for/9781491953235/", duration: "Book", source: "O'Reilly", relevance: 90, aiCurated: true },
             { title: "Feature Engineering Course", description: "Kaggle mini-course.", type: "Practice", difficulty: "Intermediate", link: "https://www.kaggle.com/learn/feature-engineering", duration: "4h", source: "Kaggle", relevance: 95, aiCurated: true }
         ],
         "Scikit-Learn": [
             { title: "Scikit-Learn Docs", description: "User guide.", type: "Documentation", difficulty: "Intermediate", link: "https://scikit-learn.org/stable/user_guide.html", duration: "Ref", source: "Scikit", relevance: 98, aiCurated: true },
             { title: "ML with Python", description: "FreeCodeCamp ML course.", type: "Video", difficulty: "Beginner", link: "https://www.youtube.com/watch?v=i_LwzRVP7bg", videoId: "i_LwzRVP7bg", duration: "4h", source: "FreeCodeCamp", relevance: 92, aiCurated: true }
         ],
         "MLOps Pipelines": [
             { title: "MLOps Zoomcamp", description: "Free MLOps bootcamp.", type: "Course", difficulty: "Intermediate", link: "https://github.com/DataTalksClub/mlops-zoomcamp", duration: "Course", source: "GitHub", relevance: 98, aiCurated: true },
             { title: "Made With ML", description: "Production ML guide.", type: "Documentation", difficulty: "Advanced", link: "https://madewithml.com/", duration: "Guide", source: "MadeWithML", relevance: 96, aiCurated: true }
         ],
         "Distributed Training": [
             { title: "Ray Documentation", description: "Scale Python apps.", type: "Documentation", difficulty: "Advanced", link: "https://docs.ray.io/en/latest/", duration: "Ref", source: "Ray", relevance: 90, aiCurated: true },
             { title: "Dask Tutorial", description: "Parallel computing in Python.", type: "Video", difficulty: "Intermediate", link: "https://www.youtube.com/watch?v=nnndxbr_Xq4", videoId: "nnndxbr_Xq4", duration: "30m", source: "YouTube", relevance: 88, aiCurated: false }
         ]
    },

    // 9. LLM Engineer
    "LLM Engineer": {
         "Transformer Architecture": [
             { title: "The Illustrated Transformer", description: "Visual explanation.", type: "Documentation", difficulty: "Intermediate", link: "https://jalammar.github.io/illustrated-transformer/", duration: "Article", source: "Jay Alammar", relevance: 99, aiCurated: true },
             { title: "Attention Is All You Need", description: "The original paper.", type: "Documentation", difficulty: "Advanced", link: "https://arxiv.org/abs/1706.03762", duration: "Paper", source: "Arxiv", relevance: 95, aiCurated: true },
             { title: "Andrej Karpathy - GPT", description: "Build GPT from scratch.", type: "Video", difficulty: "Advanced", link: "https://www.youtube.com/watch?v=kCc8FmEb1nY", videoId: "kCc8FmEb1nY", duration: "2h", source: "Andrej Karpathy", relevance: 100, aiCurated: true }
         ],
         "Fine-tuning (QLoRA)": [
             { title: "Hugging Face Course", description: "Fine-tuning chapter.", type: "Course", difficulty: "Intermediate", link: "https://huggingface.co/learn/nlp-course/chapter3/1", duration: "Course", source: "Hugging Face", relevance: 98, aiCurated: true },
             { title: "PEFT & LoRA", description: "Efficient fine-tuning.", type: "Documentation", difficulty: "Advanced", link: "https://huggingface.co/docs/peft/index", duration: "Ref", source: "Hugging Face", relevance: 94, aiCurated: true }
         ],
         "RAG Systems": [
             { title: "LangChain Crash Course", description: "Build RAG apps.", type: "Video", difficulty: "Intermediate", link: "https://www.youtube.com/watch?v=LbT1yp6quS8", videoId: "LbT1yp6quS8", duration: "1h", source: "YouTube", relevance: 96, aiCurated: true },
             { title: "Pinecone Learning", description: "Vector database concepts.", type: "Documentation", difficulty: "Intermediate", link: "https://www.pinecone.io/learn/", duration: "Blog", source: "Pinecone", relevance: 92, aiCurated: false }
         ],
         "Prompt Engineering": [
             { title: "Prompt Engineering Guide", description: "Comprehensive guide.", type: "Documentation", difficulty: "Beginner", link: "https://www.promptingguide.ai/", duration: "Ref", source: "PromptingGuide", relevance: 98, aiCurated: true },
             { title: "ChatGPT Prompt Eng", description: "DeepLearning.AI short course.", type: "Course", difficulty: "Beginner", link: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/", duration: "1h", source: "DeepLearning.AI", relevance: 95, aiCurated: true }
         ],
         "Ethics & Evaluation": [
             { title: "AI Ethics Norms", description: "Responsible AI.", type: "Documentation", difficulty: "Intermediate", link: "https://ai.google/responsibility/principles/", duration: "Ref", source: "Google", relevance: 90, aiCurated: true },
             { title: "LLM Evaluation", description: "How to eval LLMs.", type: "Article", difficulty: "Advanced", link: "https://dagshub.com/blog/how-to-evaluate-llm-performance/", duration: "Blog", source: "DagsHub", relevance: 88, aiCurated: false }
         ]
    },

    // 10. Data Scientist
    "Data Scientist": {
         "EDA & Statistics": [
             { title: "Exploratory Data Analysis", description: "John Hopkins Coursera.", type: "Course", difficulty: "Intermediate", link: "https://www.coursera.org/learn/exploratory-data-analysis", duration: "Course", source: "Coursera", relevance: 95, aiCurated: true },
             { title: "Python for Data Analysis", description: "Wes McKinney's book.", type: "Documentation", difficulty: "Intermediate", link: "https://wesmckinney.com/book/", duration: "Book", source: "Wes McKinney", relevance: 98, aiCurated: true }
         ],
         "Data Wrangling (Pandas)": [
             { title: "Pandas User Guide", description: "Essential reference.", type: "Documentation", difficulty: "Intermediate", link: "https://pandas.pydata.org/docs/user_guide/index.html", duration: "Ref", source: "Pandas", relevance: 99, aiCurated: true }, 
             { title: "Keith Galli Pandas", description: "Pandas Tutorial.", type: "Video", difficulty: "Beginner", link: "https://www.youtube.com/watch?v=vmEHCJofslg", videoId: "vmEHCJofslg", duration: "1h", source: "Keith Galli", relevance: 94, aiCurated: true }
         ],
         "Visualization (Seaborn)": [
             { title: "Seaborn Gallery", description: "Visualization examples.", type: "Documentation", difficulty: "Beginner", link: "https://seaborn.pydata.org/examples/index.html", duration: "Ref", source: "Seaborn", relevance: 96, aiCurated: true },
             { title: "Matplotlib Tutorial", description: "Plotting in Python.", type: "Video", difficulty: "Beginner", link: "https://www.youtube.com/watch?v=DAQNHzOcO5A", videoId: "DAQNHzOcO5A", duration: "1h", source: "Derek Banas", relevance: 90, aiCurated: false }
         ],
         "Predictive Modeling": [
             { title: "Applied Predictive Modeling", description: "Practical guide.", type: "Documentation", difficulty: "Advanced", link: "http://appliedpredictivemodeling.com/", duration: "Book", source: "Springer", relevance: 92, aiCurated: true },
             { title: "Kaggle Prediction", description: "House prices competition.", type: "Practice", difficulty: "Intermediate", link: "https://www.kaggle.com/c/house-prices-advanced-regression-techniques", duration: "Project", source: "Kaggle", relevance: 95, aiCurated: true }
         ],
         "Hypothesis Testing": [
             { title: "Hypothesis Testing 101", description: "Intro to testing.", type: "Video", difficulty: "Beginner", link: "https://www.youtube.com/watch?v=0oc49DyA3hU", videoId: "0oc49DyA3hU", duration: "10m", source: "YouTube", relevance: 90, aiCurated: false },
             { title: "A/B Testing", description: "Udacity free course.", type: "Course", difficulty: "Intermediate", link: "https://www.udacity.com/course/ab-testing--ud257", duration: "Course", source: "Udacity", relevance: 94, aiCurated: true }
         ]
    },
    
    // 11. Data Analyst (Partial - using patterns)
    "Data Analyst": {
         "Excel/SQL Core": [
             { title: "Excel for Analysts", description: "Advanced Excel skills.", type: "Video", difficulty: "Beginner", link: "https://www.youtube.com/watch?v=qrbf9DtR3_c", videoId: "qrbf9DtR3_c", duration: "40m", source: "YouTube", relevance: 90, aiCurated: false },
             { title: "SQLBolt", description: "Interactive SQL.", type: "Practice", difficulty: "Beginner", link: "https://sqlbolt.com/", duration: "2h", source: "SQLBolt", relevance: 95, aiCurated: true }
         ],
         "Data Cleaning": [
             { title: "Data Cleaning Challenge", description: "Kaggle challenge.", type: "Practice", difficulty: "Intermediate", link: "https://www.kaggle.com/rtatman/data-cleaning-challenge-day-1", duration: "Daily", source: "Kaggle", relevance: 92, aiCurated: true }
         ],
         "BI Tools (Tableau/PowerBI)": [
             { title: "Tableau Public", description: "Learn Tableau.", type: "Documentation", difficulty: "Intermediate", link: "https://public.tableau.com/en-us/s/", duration: "Tool", source: "Tableau", relevance: 94, aiCurated: true },
             { title: "PowerBI Tutorial", description: "Full course.", type: "Video", difficulty: "Beginner", link: "https://www.youtube.com/watch?v=c7LrqSxjJQQ", videoId: "c7LrqSxjJQQ", duration: "1h", source: "YouTube", relevance: 90, aiCurated: false }
         ]
    },


    
    // 12. DevOps Engineer
    "DevOps Engineer": {
         "Linux Internals": [
             { title: "Linux Journey", description: "Learn the ways of the Linux command line.", type: "Course", difficulty: "Beginner", link: "https://linuxjourney.com/", duration: "Course", source: "LinuxJourney", relevance: 98, aiCurated: true },
             { title: "Linux SysAdmin Basics", description: "Udacity free course.", type: "Video", difficulty: "Beginner", link: "https://www.udacity.com/course/linux-command-line-basics--ud595", duration: "Course", source: "Udacity", relevance: 92, aiCurated: true },
             { title: "OverTheWire Bandit", description: "Wargame to learn Linux.", type: "Practice", difficulty: "Intermediate", link: "https://overthewire.org/wargames/bandit/", duration: "Game", source: "OverTheWire", relevance: 95, aiCurated: true }
         ],
         "GitOps Workflows": [
             { title: "GitOps Principles", description: "OpenGitOps documentation.", type: "Documentation", difficulty: "Intermediate", link: "https://opengitops.dev/", duration: "Ref", source: "OpenGitOps", relevance: 98, aiCurated: true },
             { title: "What is GitOps?", description: "GitLab explainer.", type: "Video", difficulty: "Beginner", link: "https://www.youtube.com/watch?v=f5EpcWp0THw", videoId: "f5EpcWp0THw", duration: "10m", source: "GitLab", relevance: 90, aiCurated: false },
             { title: "ArgoCD Tutorial", description: "Hands-on with ArgoCD.", type: "Practice", difficulty: "Advanced", link: "https://argo-cd.readthedocs.io/en/stable/", duration: "Tool", source: "ArgoCD", relevance: 94, aiCurated: true }
         ],
         "CI/CD (Actions/Jenkins)": [
             { title: "GitHub Actions Docs", description: "Automate your workflow.", type: "Documentation", difficulty: "Intermediate", link: "https://docs.github.com/en/actions", duration: "Ref", source: "GitHub", relevance: 99, aiCurated: true },
             { title: "Jenkins Zero to Hero", description: "Complete Jenkins course.", type: "Video", difficulty: "Intermediate", link: "https://www.youtube.com/watch?v=FX322RVNGj4", videoId: "FX322RVNGj4", duration: "4h", source: "YouTube", relevance: 92, aiCurated: false },
             { title: "GitLab CI Pipeline", description: "Build your first pipeline.", type: "Practice", difficulty: "Beginner", link: "https://docs.gitlab.com/ee/ci/quick_start/", duration: "Guide", source: "GitLab", relevance: 95, aiCurated: true }
         ],
         "Docker & K8s": [
             { title: "Kubernetes Basics", description: "Interactive tutorial.", type: "Documentation", difficulty: "Intermediate", link: "https://kubernetes.io/docs/tutorials/kubernetes-basics/", duration: "Guide", source: "K8s", relevance: 100, aiCurated: true },
             { title: "Docker Crash Course", description: "NetworkChuck Docker.", type: "Video", difficulty: "Beginner", link: "https://www.youtube.com/watch?v=eGz9DS-aIeY", videoId: "eGz9DS-aIeY", duration: "20m", source: "NetworkChuck", relevance: 95, aiCurated: true },
             { title: "Katacoda Scenarios", description: "Interactive K8s labs.", type: "Practice", difficulty: "Intermediate", link: "https://www.oreilly.com/online-learning/katacoda.html", duration: "Lab", source: "O'Reilly", relevance: 92, aiCurated: false }
         ],
         "Infrastructure as Code": [
             { title: "Terraform Tutorials", description: "HashiCorp official learn.", type: "Documentation", difficulty: "Intermediate", link: "https://developer.hashicorp.com/terraform/tutorials", duration: "Ref", source: "HashiCorp", relevance: 98, aiCurated: true },
             { title: "Ansible 101", description: "Jeff Geerling's series.", type: "Video", difficulty: "Intermediate", link: "https://www.youtube.com/watch?v=goclfp6a2IQ", videoId: "goclfp6a2IQ", duration: "Series", source: "Jeff Geerling", relevance: 96, aiCurated: true },
             { title: "Pulumi Get Started", description: "IaC with code.", type: "Practice", difficulty: "Intermediate", link: "https://www.pulumi.com/docs/get-started/", duration: "Tool", source: "Pulumi", relevance: 90, aiCurated: false }
         ],
         "Monitoring & Logging": [
             { title: "Prometheus Docs", description: "Monitoring system.", type: "Documentation", difficulty: "Advanced", link: "https://prometheus.io/docs/introduction/overview/", duration: "Ref", source: "Prometheus", relevance: 94, aiCurated: true },
             { title: "Grafana Crash Course", description: "Visualize metrics.", type: "Video", difficulty: "Intermediate", link: "https://www.youtube.com/watch?v=lILY8eSspEo", videoId: "lILY8eSspEo", duration: "1h", source: "YouTube", relevance: 92, aiCurated: false },
             { title: "ELK Stack", description: "Elasticsearch Logstash Kibana.", type: "Practice", difficulty: "Advanced", link: "https://www.elastic.co/what-is/elk-stack", duration: "Read", source: "Elastic", relevance: 90, aiCurated: true }
         ]
    },

    // 13. Cybersecurity Engineer
    "Cybersecurity Engineer": {
         "Networking Security": [
             { title: "Cybrary Networking", description: "Core networking concepts.", type: "Course", difficulty: "Beginner", link: "https://www.cybrary.it/course/cisco-ccna/", duration: "Course", source: "Cybrary", relevance: 95, aiCurated: true },
             { title: "NetworkChuck CCNA", description: "Fun networking course.", type: "Video", difficulty: "Beginner", link: "https://www.youtube.com/playlist?list=PLIhvC56v63IJVXv0GGkCMxHFUUbCiS_Lap", videoId: "", duration: "Series", source: "NetworkChuck", relevance: 98, aiCurated: true },
             { title: "Packet Tracer", description: "Simulate networks.", type: "Practice", difficulty: "Intermediate", link: "https://www.netacad.com/courses/packet-tracer", duration: "Tool", source: "Cisco", relevance: 90, aiCurated: false }
         ],
         "Encryption & Auth": [
             { title: "Crypto 101", description: "Intro to Cryptography.", type: "Documentation", difficulty: "Intermediate", link: "https://www.crypto101.io/", duration: "PDF", source: "Crypto101", relevance: 92, aiCurated: true },
             { title: "Computerphile Hashes", description: "How passwords are stored.", type: "Video", difficulty: "Beginner", link: "https://www.youtube.com/watch?v=8ZtInClXe1Q", videoId: "8ZtInClXe1Q", duration: "10m", source: "Computerphile", relevance: 94, aiCurated: false },
             { title: "Cryptopals Challenges", description: "Implement crypto attacks.", type: "Practice", difficulty: "Advanced", link: "https://cryptopals.com/", duration: "Challenges", source: "Cryptopals", relevance: 98, aiCurated: true }
         ],
         "Penetration Testing": [
             { title: "OWASP Top 10", description: "Top web vulnerabilities.", type: "Documentation", difficulty: "Intermediate", link: "https://owasp.org/www-project-top-ten/", duration: "Ref", source: "OWASP", relevance: 100, aiCurated: true },
             { title: "Hacking Core", description: "NetworkChuck hacker roadmap.", type: "Video", difficulty: "Beginner", link: "https://www.youtube.com/watch?v=3Kq1MIfTWCE", videoId: "3Kq1MIfTWCE", duration: "15m", source: "NetworkChuck", relevance: 90, aiCurated: false },
             { title: "Hack The Box", description: "Practice labs.", type: "Practice", difficulty: "Advanced", link: "https://www.hackthebox.com/", duration: "Labs", source: "HTB", relevance: 99, aiCurated: true }
         ],
         "Vulnerability Research": [
             { title: "CVE Details", description: "Database of vulnerabilities.", type: "Documentation", difficulty: "Advanced", link: "https://www.cvedetails.com/", duration: "Ref", source: "CVE", relevance: 92, aiCurated: true },
             { title: "LiveOverflow", description: "CTF and Hacking videos.", type: "Video", difficulty: "Advanced", link: "https://www.youtube.com/channel/UClcE-kVhqyiHCcjYwcpfj9w", videoId: "", duration: "Channel", source: "LiveOpverflow", relevance: 96, aiCurated: true },
             { title: "PortSwigger Academy", description: "Web Security Academy.", type: "Practice", difficulty: "Intermediate", link: "https://portswigger.net/web-security", duration: "Course", source: "PortSwigger", relevance: 98, aiCurated: true }
         ],
         "Cloud Security": [
             { title: "AWS Security Spec", description: "Cloud security concepts.", type: "Documentation", difficulty: "Advanced", link: "https://aws.amazon.com/certification/certified-security-specialty/", duration: "Exam", source: "AWS", relevance: 95, aiCurated: true },
             { title: "Cloud Security Alliance", description: "Best practices.", type: "Documentation", difficulty: "Intermediate", link: "https://cloudsecurityalliance.org/", duration: "Ref", source: "CSA", relevance: 90, aiCurated: false }
         ],
         "Incident Response": [
             { title: "NIST IR Guide", description: "The standard for IR.", type: "Documentation", difficulty: "Advanced", link: "https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final", duration: "PDF", source: "NIST", relevance: 92, aiCurated: true },
             { title: "Blue Team Labs", description: "Defense exercises.", type: "Practice", difficulty: "Intermediate", link: "https://blueteamlabs.online/", duration: "Labs", source: "BTLO", relevance: 95, aiCurated: true }
         ]
    },

    // 14. Mobile App Developer
    "Mobile App Developer": {
         "Mobile UI Patterns": [
             { title: "Material Design 3", description: "Google's design system.", type: "Documentation", difficulty: "Beginner", link: "https://m3.material.io/", duration: "Ref", source: "Google", relevance: 98, aiCurated: true },
             { title: "Human Interface Guidelines", description: "Apple's design system.", type: "Documentation", difficulty: "Beginner", link: "https://developer.apple.com/design/human-interface-guidelines/", duration: "Ref", source: "Apple", relevance: 98, aiCurated: true },
             { title: "Dribbble Mobile", description: "Design inspiration.", type: "Practice", difficulty: "Beginner", link: "https://dribbble.com/tags/mobile", duration: "Gallery", source: "Dribbble", relevance: 90, aiCurated: false }
         ],
         "Swift/Kotlin Mastery": [
             { title: "Swift Docs", description: "The Swift Programming Language.", type: "Documentation", difficulty: "Intermediate", link: "https://docs.swift.org/swift-book/", duration: "Book", source: "Swift.org", relevance: 99, aiCurated: true },
             { title: "Kotlin for Android", description: "Android specifics.", type: "Video", difficulty: "Beginner", link: "https://www.youtube.com/watch?v=EExSSotojVI", videoId: "EExSSotojVI", duration: "13h", source: "FreeCodeCamp", relevance: 95, aiCurated: true },
             { title: "Kotlin Koans", description: "Interactive exercises.", type: "Practice", difficulty: "Intermediate", link: "https://kotlinlang.org/docs/koans.html", duration: "Lab", source: "JetBrains", relevance: 96, aiCurated: true }
         ],
         "React Native/Flutter": [
             { title: "React Native Docs", description: "Learn Once, Write Anywhere.", type: "Documentation", difficulty: "Intermediate", link: "https://reactnative.dev/docs/getting-started", duration: "Ref", source: "Meta", relevance: 98, aiCurated: true },
             { title: "Flutter Widget of the Week", description: "Short Flutter videos.", type: "Video", difficulty: "Beginner", link: "https://www.youtube.com/playlist?list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG", videoId: "", duration: "Series", source: "Google", relevance: 95, aiCurated: true },
             { title: "Expo Snack", description: "Run RN in browser.", type: "Practice", difficulty: "Beginner", link: "https://snack.expo.dev/", duration: "Tool", source: "Expo", relevance: 92, aiCurated: false }
         ],
         "Native APIs": [
             { title: "Android Developers", description: "API reference.", type: "Documentation", difficulty: "Advanced", link: "https://developer.android.com/reference", duration: "Ref", source: "Google", relevance: 95, aiCurated: true },
             { title: "iOS SDK", description: "Apple Developer Documentation.", type: "Documentation", difficulty: "Advanced", link: "https://developer.apple.com/documentation/technologies", duration: "Ref", source: "Apple", relevance: 95, aiCurated: true }
         ],
         "App Store Operations": [
             { title: "App Store Connect", description: "Submission guide.", type: "Documentation", difficulty: "Intermediate", link: "https://developer.apple.com/app-store-connect/", duration: "Guide", source: "Apple", relevance: 94, aiCurated: true },
             { title: "Google Play Console", description: "Publishing on Android.", type: "Documentation", difficulty: "Intermediate", link: "https://play.google.com/console/about/", duration: "Guide", source: "Google", relevance: 94, aiCurated: true }
         ],
         "Storage & Offline Sync": [
             { title: "Firebase Realtime DB", description: "NoSQL cloud database.", type: "Documentation", difficulty: "Intermediate", link: "https://firebase.google.com/docs/database", duration: "Ref", source: "Firebase", relevance: 96, aiCurated: true },
             { title: "SQLite on Android", description: "Local storage.", type: "Documentation", difficulty: "Intermediate", link: "https://developer.android.com/training/data-storage/sqlite", duration: "Ref", source: "Android", relevance: 92, aiCurated: false }
         ]
    },

    // 15. Cloud Engineer
    "Cloud Engineer": {
         "Cloud Fundamentals": [
             { title: "AWS Cloud Practitioner", description: "Official certification prep.", type: "Course", difficulty: "Beginner", link: "https://aws.amazon.com/certification/certified-cloud-practitioner/", duration: "Course", source: "AWS", relevance: 100, aiCurated: true },
             { title: "Azure Fundamentals", description: "AZ-900 prep.", type: "Video", difficulty: "Beginner", link: "https://www.youtube.com/watch?v=NKEFWyqJ5XA", videoId: "NKEFWyqJ5XA", duration: "3h", source: "FreeCodeCamp", relevance: 95, aiCurated: true },
             { title: "Qwiklabs", description: "Hands-on labs.", type: "Practice", difficulty: "Beginner", link: "https://www.cloudskillsboost.google/", duration: "Labs", source: "Google", relevance: 92, aiCurated: false }
         ],
         "Networking & IAM": [
             { title: "AWS VPC", description: "Virtual Private Cloud.", type: "Documentation", difficulty: "Intermediate", link: "https://docs.aws.amazon.com/vpc/", duration: "Ref", source: "AWS", relevance: 96, aiCurated: true },
             { title: "IAM Roles Explained", description: "Security best practices.", type: "Video", difficulty: "Intermediate", link: "https://www.youtube.com/watch?v=B-MwKnNBh5s", videoId: "B-MwKnNBh5s", duration: "20m", source: "YouTube", relevance: 92, aiCurated: false }
         ],
         "Compute & Storage": [
             { title: "EC2 Cheat Sheet", description: "Instance types and pricing.", type: "Documentation", difficulty: "Intermediate", link: "https://tutorialsdojo.com/amazon-ec2/", duration: "Ref", source: "TutorialsDojo", relevance: 94, aiCurated: true },
             { title: "S3 Masterclass", description: "Storage classes explained.", type: "Video", difficulty: "Intermediate", link: "https://www.youtube.com/watch?v=e6w9LwZJFIA", videoId: "e6w9LwZJFIA", duration: "45m", source: "YouTube", relevance: 90, aiCurated: false }
         ],
         "Serverless Architecture": [
             { title: "Serverless Land", description: "Patterns and examples.", type: "Documentation", difficulty: "Advanced", link: "https://serverlessland.com/", duration: "Ref", source: "AWS", relevance: 98, aiCurated: true },
             { title: "Lambda Tutorial", description: "Build a serverless API.", type: "Video", difficulty: "Intermediate", link: "https://www.youtube.com/watch?v=eOBq__h4OJ4", videoId: "eOBq__h4OJ4", duration: "1h", source: "YouTube", relevance: 94, aiCurated: false },
             { title: "Serverless Stack", description: "Guide to serverless apps.", type: "Practice", difficulty: "Intermediate", link: "https://serverless-stack.com/", duration: "Guide", source: "SST", relevance: 96, aiCurated: true }
         ],
         "Cost Optimization": [
             { title: "AWS Cost Explorer", description: "Analyze usage.", type: "Documentation", difficulty: "Intermediate", link: "https://aws.amazon.com/aws-cost-management/aws-cost-explorer/", duration: "Tool", source: "AWS", relevance: 90, aiCurated: true },
             { title: "FinOps Foundation", description: "Cloud financial management.", type: "Documentation", difficulty: "Advanced", link: "https://www.finops.org/", duration: "Ref", source: "FinOps", relevance: 88, aiCurated: false }
         ],
         "Global Distribution": [
             { title: "Cloudflare Workers", description: "Edge computing.", type: "Documentation", difficulty: "Advanced", link: "https://workers.cloudflare.com/", duration: "Ref", source: "Cloudflare", relevance: 98, aiCurated: true },
             { title: "AWS CloudFront", description: "CDN explained.", type: "Video", difficulty: "Intermediate", link: "https://www.youtube.com/watch?v=AT-nHW3_SVI", videoId: "AT-nHW3_SVI", duration: "15m", source: "BeABetterDev", relevance: 92, aiCurated: false }
         ]
    }
};
