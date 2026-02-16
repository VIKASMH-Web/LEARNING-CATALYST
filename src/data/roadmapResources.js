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
    },

    // =============================================
    // LANGUAGE-SPECIFIC MINI-ROADMAPS (No YouTube)
    // =============================================

    // Python
    "Python": {
        "Fundamentals & Syntax": [
            { title: "Python Official Tutorial", description: "The official Python tutorial — best starting point.", type: "Documentation", difficulty: "Beginner", link: "https://docs.python.org/3/tutorial/", duration: "8h", source: "Python.org", relevance: 100, aiCurated: true },
            { title: "Python Notes (PDF)", description: "Comprehensive Python notes for quick reference.", type: "Documentation", difficulty: "Beginner", link: "#notes-python", duration: "PDF", source: "Notes", relevance: 95, aiCurated: true },
            { title: "Python Exercises", description: "100+ beginner exercises with solutions.", type: "Practice", difficulty: "Beginner", link: "https://www.w3resource.com/python-exercises/", duration: "Ongoing", source: "W3Resource", relevance: 90, aiCurated: false }
        ],
        "Data Structures & Algorithms": [
            { title: "Python DS Documentation", description: "Built-in data structures in Python.", type: "Documentation", difficulty: "Intermediate", link: "https://docs.python.org/3/tutorial/datastructures.html", duration: "3h", source: "Python.org", relevance: 98, aiCurated: true },
            { title: "LeetCode Python Track", description: "DSA problems in Python.", type: "Practice", difficulty: "Intermediate", link: "https://leetcode.com/problemset/all/", duration: "Ongoing", source: "LeetCode", relevance: 95, aiCurated: true }
        ],
        "OOP & Modules": [
            { title: "Real Python OOP Guide", description: "Object-Oriented Programming in Python.", type: "Documentation", difficulty: "Intermediate", link: "https://realpython.com/python3-object-oriented-programming/", duration: "4h", source: "Real Python", relevance: 96, aiCurated: true },
            { title: "Python Packages Guide", description: "Creating and using Python packages.", type: "Documentation", difficulty: "Intermediate", link: "https://packaging.python.org/en/latest/tutorials/packaging-projects/", duration: "2h", source: "PyPA", relevance: 90, aiCurated: false }
        ],
        "Projects & Applications": [
            { title: "Build Python Projects", description: "Real-world Python project ideas.", type: "Project", difficulty: "Intermediate", link: "https://realpython.com/tutorials/projects/", duration: "Ongoing", source: "Real Python", relevance: 95, aiCurated: true },
            { title: "Python Project Ideas", description: "50+ project ideas with source code.", type: "Practice", difficulty: "Intermediate", link: "https://github.com/karan/Projects", duration: "Ongoing", source: "GitHub", relevance: 92, aiCurated: false }
        ],
        "Advanced Concepts": [
            { title: "Python Concurrency", description: "Threading, multiprocessing, and asyncio.", type: "Documentation", difficulty: "Advanced", link: "https://docs.python.org/3/library/concurrency.html", duration: "5h", source: "Python.org", relevance: 96, aiCurated: true },
            { title: "Python Design Patterns", description: "Common design patterns in Python.", type: "Documentation", difficulty: "Advanced", link: "https://python-patterns.guide/", duration: "4h", source: "Python Patterns", relevance: 94, aiCurated: true }
        ],
        "Testing & Best Practices": [
            { title: "Pytest Documentation", description: "The pytest framework for testing.", type: "Documentation", difficulty: "Intermediate", link: "https://docs.pytest.org/en/stable/", duration: "3h", source: "Pytest", relevance: 98, aiCurated: true },
            { title: "Python Best Practices", description: "The Hitchhiker's Guide to Python.", type: "Documentation", difficulty: "Intermediate", link: "https://docs.python-guide.org/", duration: "Book", source: "Python Guide", relevance: 96, aiCurated: true }
        ]
    },

    // Java
    "Java": {
        "Fundamentals & Syntax": [
            { title: "Oracle Java Tutorials", description: "Official Java learning path.", type: "Documentation", difficulty: "Beginner", link: "https://docs.oracle.com/javase/tutorial/", duration: "10h", source: "Oracle", relevance: 100, aiCurated: true },
            { title: "Java Notes (PDF)", description: "Complete Java programming notes.", type: "Documentation", difficulty: "Beginner", link: "#notes-java", duration: "PDF", source: "Notes", relevance: 95, aiCurated: true },
            { title: "Java Exercises", description: "Beginner to Advanced exercises.", type: "Practice", difficulty: "Beginner", link: "https://www.w3resource.com/java-exercises/", duration: "Ongoing", source: "W3Resource", relevance: 90, aiCurated: false }
        ],
        "OOP & Collections": [
            { title: "Java OOP Guide", description: "Object-Oriented concepts in Java.", type: "Documentation", difficulty: "Intermediate", link: "https://docs.oracle.com/javase/tutorial/java/concepts/", duration: "5h", source: "Oracle", relevance: 98, aiCurated: true },
            { title: "Java Collections Framework", description: "Lists, Sets, Maps, and more.", type: "Documentation", difficulty: "Intermediate", link: "https://docs.oracle.com/javase/tutorial/collections/", duration: "4h", source: "Oracle", relevance: 96, aiCurated: true }
        ],
        "Exception Handling & I/O": [
            { title: "Java I/O Tutorial", description: "Streams, files, and readers.", type: "Documentation", difficulty: "Intermediate", link: "https://docs.oracle.com/javase/tutorial/essential/io/", duration: "3h", source: "Oracle", relevance: 94, aiCurated: true },
            { title: "HackerRank Java", description: "Java practice challenges.", type: "Practice", difficulty: "Intermediate", link: "https://www.hackerrank.com/domains/java", duration: "Ongoing", source: "HackerRank", relevance: 92, aiCurated: false }
        ],
        "Projects & Applications": [
            { title: "Java Project Ideas", description: "Build real-world Java apps.", type: "Project", difficulty: "Intermediate", link: "https://github.com/iluwatar/java-design-patterns", duration: "Ongoing", source: "GitHub", relevance: 95, aiCurated: true }
        ],
        "Advanced Concepts (Concurrency)": [
            { title: "Java Concurrency Guide", description: "Threads, executors, and concurrent collections.", type: "Documentation", difficulty: "Advanced", link: "https://docs.oracle.com/javase/tutorial/essential/concurrency/", duration: "6h", source: "Oracle", relevance: 98, aiCurated: true }
        ],
        "Testing & Build Tools": [
            { title: "JUnit 5 User Guide", description: "Modern Java testing framework.", type: "Documentation", difficulty: "Intermediate", link: "https://junit.org/junit5/docs/current/user-guide/", duration: "3h", source: "JUnit", relevance: 96, aiCurated: true },
            { title: "Maven Getting Started", description: "Build automation with Maven.", type: "Documentation", difficulty: "Intermediate", link: "https://maven.apache.org/guides/getting-started/", duration: "2h", source: "Apache", relevance: 94, aiCurated: true }
        ]
    },

    // C / C++
    "C / C++": {
        "Fundamentals & Syntax": [
            { title: "C Programming Reference", description: "Complete C language reference.", type: "Documentation", difficulty: "Beginner", link: "https://en.cppreference.com/w/c", duration: "Ref", source: "cppreference", relevance: 100, aiCurated: true },
            { title: "C Handbook Notes (PDF)", description: "The Ultimate C Handbook.", type: "Documentation", difficulty: "Beginner", link: "#notes-c", duration: "PDF", source: "Notes", relevance: 96, aiCurated: true },
            { title: "C++ Notes (PDF)", description: "Comprehensive C++ notes.", type: "Documentation", difficulty: "Beginner", link: "#notes-cpp", duration: "PDF", source: "Notes", relevance: 95, aiCurated: true },
            { title: "Exercism C Track", description: "Practice C with mentored exercises.", type: "Practice", difficulty: "Beginner", link: "https://exercism.org/tracks/c", duration: "Ongoing", source: "Exercism", relevance: 90, aiCurated: false }
        ],
        "Pointers & Memory": [
            { title: "Pointer Tutorial", description: "Deep dive into pointers and memory.", type: "Documentation", difficulty: "Intermediate", link: "https://www.learn-c.org/en/Pointers", duration: "3h", source: "Learn-C", relevance: 96, aiCurated: true }
        ],
        "Data Structures": [
            { title: "GeeksforGeeks C DS", description: "Data structures implementation in C.", type: "Practice", difficulty: "Intermediate", link: "https://www.geeksforgeeks.org/data-structures/", duration: "Ongoing", source: "GFG", relevance: 95, aiCurated: true }
        ],
        "Projects & Applications": [
            { title: "C/C++ Project Ideas", description: "Build system-level projects.", type: "Project", difficulty: "Intermediate", link: "https://github.com/practical-tutorials/project-based-learning#cc", duration: "Ongoing", source: "GitHub", relevance: 94, aiCurated: true }
        ],
        "Advanced Concepts (Templates/STL)": [
            { title: "C++ STL Reference", description: "Standard Template Library reference.", type: "Documentation", difficulty: "Advanced", link: "https://en.cppreference.com/w/cpp/container", duration: "Ref", source: "cppreference", relevance: 98, aiCurated: true }
        ],
        "Systems Programming": [
            { title: "Linux System Programming", description: "POSIX system calls and low-level C.", type: "Documentation", difficulty: "Advanced", link: "https://man7.org/linux/man-pages/", duration: "Ref", source: "man7.org", relevance: 96, aiCurated: true }
        ]
    },

    // JavaScript
    "JavaScript": {
        "Fundamentals & ES6+": [
            { title: "JavaScript.info", description: "The Modern JavaScript Tutorial.", type: "Documentation", difficulty: "Beginner", link: "https://javascript.info/", duration: "20h", source: "JS.info", relevance: 100, aiCurated: true },
            { title: "JS Notes (PDF)", description: "JavaScript tutorial notes.", type: "Documentation", difficulty: "Beginner", link: "#notes-js", duration: "PDF", source: "Notes", relevance: 95, aiCurated: true },
            { title: "MDN JavaScript Guide", description: "Mozilla developer JS guide.", type: "Documentation", difficulty: "Beginner", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide", duration: "15h", source: "MDN", relevance: 98, aiCurated: true }
        ],
        "DOM & Browser APIs": [
            { title: "MDN DOM Reference", description: "Document Object Model APIs.", type: "Documentation", difficulty: "Intermediate", link: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model", duration: "5h", source: "MDN", relevance: 96, aiCurated: true }
        ],
        "Async Programming": [
            { title: "Promises & Async/Await", description: "Async JS patterns explained.", type: "Documentation", difficulty: "Intermediate", link: "https://javascript.info/async", duration: "4h", source: "JS.info", relevance: 98, aiCurated: true }
        ],
        "Projects & Applications": [
            { title: "JavaScript 30", description: "30 Day Vanilla JS Coding Challenge.", type: "Practice", difficulty: "Intermediate", link: "https://javascript30.com/", duration: "30 Days", source: "Wes Bos", relevance: 96, aiCurated: true },
            { title: "Frontend Mentor", description: "Real-world frontend challenges.", type: "Practice", difficulty: "Intermediate", link: "https://www.frontendmentor.io/", duration: "Ongoing", source: "Frontend Mentor", relevance: 94, aiCurated: false }
        ],
        "Advanced Patterns": [
            { title: "Patterns.dev", description: "Modern web app design patterns.", type: "Documentation", difficulty: "Advanced", link: "https://www.patterns.dev/", duration: "Book", source: "Patterns.dev", relevance: 98, aiCurated: true }
        ],
        "Node.js & Tooling": [
            { title: "Node.js Docs", description: "Official Node.js documentation.", type: "Documentation", difficulty: "Intermediate", link: "https://nodejs.org/en/docs/", duration: "Ref", source: "Node.js", relevance: 98, aiCurated: true },
            { title: "npm Documentation", description: "Package management guide.", type: "Documentation", difficulty: "Beginner", link: "https://docs.npmjs.com/", duration: "Ref", source: "npm", relevance: 90, aiCurated: false }
        ]
    },

    // C#
    "C#": {
        "Fundamentals & .NET": [
            { title: "C# Documentation", description: "Official Microsoft C# guide.", type: "Documentation", difficulty: "Beginner", link: "https://learn.microsoft.com/en-us/dotnet/csharp/", duration: "15h", source: "Microsoft", relevance: 100, aiCurated: true },
            { title: "C# Notes (PDF)", description: "C# tutorial reference notes.", type: "Documentation", difficulty: "Beginner", link: "#notes-csharp", duration: "PDF", source: "Notes", relevance: 95, aiCurated: true }
        ],
        "OOP & Collections": [
            { title: "C# OOP Concepts", description: "Classes, inheritance, interfaces.", type: "Documentation", difficulty: "Intermediate", link: "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/object-oriented/", duration: "5h", source: "Microsoft", relevance: 98, aiCurated: true }
        ],
        "LINQ & Async": [
            { title: "LINQ Documentation", description: "Language Integrated Query.", type: "Documentation", difficulty: "Intermediate", link: "https://learn.microsoft.com/en-us/dotnet/csharp/linq/", duration: "4h", source: "Microsoft", relevance: 96, aiCurated: true }
        ],
        "Projects & Applications": [
            { title: "C# Project Ideas", description: "Build real-world .NET apps.", type: "Project", difficulty: "Intermediate", link: "https://github.com/practical-tutorials/project-based-learning#c-1", duration: "Ongoing", source: "GitHub", relevance: 94, aiCurated: true }
        ],
        "Advanced Concepts": [
            { title: "C# Advanced Topics", description: "Generics, delegates, events.", type: "Documentation", difficulty: "Advanced", link: "https://learn.microsoft.com/en-us/dotnet/csharp/advanced-topics/", duration: "6h", source: "Microsoft", relevance: 96, aiCurated: true }
        ],
        "Testing & Deployment": [
            { title: "xUnit Documentation", description: ".NET testing framework.", type: "Documentation", difficulty: "Intermediate", link: "https://xunit.net/docs/getting-started/netcore/cmdline", duration: "2h", source: "xUnit", relevance: 94, aiCurated: true }
        ]
    },

    // Swift
    "Swift": {
        "Fundamentals & Syntax": [
            { title: "Swift Language Guide", description: "Official Swift documentation.", type: "Documentation", difficulty: "Beginner", link: "https://docs.swift.org/swift-book/", duration: "15h", source: "Swift.org", relevance: 100, aiCurated: true },
            { title: "Swift Notes (PDF)", description: "Swift language reference notes.", type: "Documentation", difficulty: "Beginner", link: "#notes-swift", duration: "PDF", source: "Notes", relevance: 95, aiCurated: true }
        ],
        "Optionals & Closures": [
            { title: "Swift Closures Guide", description: "Understanding closures and optionals.", type: "Documentation", difficulty: "Intermediate", link: "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/closures/", duration: "3h", source: "Swift.org", relevance: 96, aiCurated: true }
        ],
        "UIKit & SwiftUI": [
            { title: "SwiftUI Tutorials", description: "Apple's official SwiftUI tutorials.", type: "Documentation", difficulty: "Intermediate", link: "https://developer.apple.com/tutorials/swiftui", duration: "8h", source: "Apple", relevance: 100, aiCurated: true }
        ],
        "Projects & Applications": [
            { title: "Hacking with Swift", description: "100 Days of Swift projects.", type: "Practice", difficulty: "Intermediate", link: "https://www.hackingwithswift.com/100", duration: "100 Days", source: "HWS", relevance: 98, aiCurated: true }
        ],
        "Advanced Concepts": [
            { title: "Swift Concurrency", description: "Async/await & structured concurrency.", type: "Documentation", difficulty: "Advanced", link: "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency/", duration: "4h", source: "Swift.org", relevance: 96, aiCurated: true }
        ],
        "App Store Publishing": [
            { title: "App Store Connect", description: "Publishing guide.", type: "Documentation", difficulty: "Intermediate", link: "https://developer.apple.com/app-store-connect/", duration: "Guide", source: "Apple", relevance: 94, aiCurated: true }
        ]
    },

    // SQL
    "SQL": {
        "Basic Queries (SELECT/WHERE)": [
            { title: "SQLBolt", description: "Interactive SQL lessons.", type: "Practice", difficulty: "Beginner", link: "https://sqlbolt.com/", duration: "2h", source: "SQLBolt", relevance: 100, aiCurated: true },
            { title: "SQL Notes (PDF)", description: "SQL reference notes.", type: "Documentation", difficulty: "Beginner", link: "#notes-sql", duration: "PDF", source: "Notes", relevance: 96, aiCurated: true },
            { title: "W3Schools SQL", description: "SQL tutorial with try-it editor.", type: "Documentation", difficulty: "Beginner", link: "https://www.w3schools.com/sql/", duration: "5h", source: "W3Schools", relevance: 94, aiCurated: false }
        ],
        "Joins & Subqueries": [
            { title: "SQL Joins Visualized", description: "Visual explanation of all JOIN types.", type: "Documentation", difficulty: "Intermediate", link: "https://joins.spathon.com/", duration: "1h", source: "SQL Joins", relevance: 96, aiCurated: true }
        ],
        "Aggregation & Grouping": [
            { title: "HackerRank SQL", description: "SQL practice challenges.", type: "Practice", difficulty: "Intermediate", link: "https://www.hackerrank.com/domains/sql", duration: "Ongoing", source: "HackerRank", relevance: 95, aiCurated: true }
        ],
        "Database Design & Normalization": [
            { title: "Database Normalization Guide", description: "1NF through BCNF explained.", type: "Documentation", difficulty: "Intermediate", link: "https://www.guru99.com/database-normalization.html", duration: "3h", source: "Guru99", relevance: 94, aiCurated: true }
        ],
        "Advanced SQL (Window Functions)": [
            { title: "Window Functions Guide", description: "ROW_NUMBER, RANK, PARTITION BY.", type: "Documentation", difficulty: "Advanced", link: "https://mode.com/sql-tutorial/sql-window-functions/", duration: "3h", source: "Mode", relevance: 96, aiCurated: true }
        ],
        "Performance & Indexing": [
            { title: "Use The Index, Luke", description: "SQL performance tuning guide.", type: "Documentation", difficulty: "Advanced", link: "https://use-the-index-luke.com/", duration: "Book", source: "Use The Index", relevance: 98, aiCurated: true }
        ]
    },

    // HTML & CSS
    "HTML & CSS": {
        "HTML Basics & Semantics": [
            { title: "MDN HTML Basics", description: "Getting started with HTML.", type: "Documentation", difficulty: "Beginner", link: "https://developer.mozilla.org/en-US/docs/Learn/HTML", duration: "6h", source: "MDN", relevance: 100, aiCurated: true },
            { title: "HTML Notes (PDF)", description: "HTML reference notes.", type: "Documentation", difficulty: "Beginner", link: "#notes-html", duration: "PDF", source: "Notes", relevance: 95, aiCurated: true }
        ],
        "CSS Selectors & Box Model": [
            { title: "MDN CSS Guide", description: "CSS fundamentals and box model.", type: "Documentation", difficulty: "Beginner", link: "https://developer.mozilla.org/en-US/docs/Learn/CSS", duration: "8h", source: "MDN", relevance: 98, aiCurated: true },
            { title: "CSS Notes (PDF)", description: "CSS reference notes.", type: "Documentation", difficulty: "Beginner", link: "#notes-css", duration: "PDF", source: "Notes", relevance: 95, aiCurated: true }
        ],
        "Flexbox & Grid": [
            { title: "CSS Flexbox Guide", description: "Complete guide to Flexbox.", type: "Documentation", difficulty: "Intermediate", link: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/", duration: "2h", source: "CSS-Tricks", relevance: 98, aiCurated: true },
            { title: "CSS Grid Guide", description: "Complete guide to CSS Grid.", type: "Documentation", difficulty: "Intermediate", link: "https://css-tricks.com/snippets/css/complete-guide-grid/", duration: "2h", source: "CSS-Tricks", relevance: 98, aiCurated: true },
            { title: "Flexbox Froggy", description: "Learn Flexbox with a game.", type: "Practice", difficulty: "Beginner", link: "https://flexboxfroggy.com/", duration: "30m", source: "Flexbox Froggy", relevance: 96, aiCurated: true }
        ],
        "Responsive Design": [
            { title: "Responsive Web Design", description: "Media queries and responsive patterns.", type: "Documentation", difficulty: "Intermediate", link: "https://web.dev/responsive-web-design-basics/", duration: "3h", source: "web.dev", relevance: 96, aiCurated: true }
        ],
        "Animations & Transitions": [
            { title: "CSS Animations Guide", description: "Keyframes, transitions, transforms.", type: "Documentation", difficulty: "Intermediate", link: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations", duration: "3h", source: "MDN", relevance: 94, aiCurated: true }
        ],
        "Accessibility & Best Practices": [
            { title: "WCAG Guidelines", description: "Web Content Accessibility Guidelines.", type: "Documentation", difficulty: "Intermediate", link: "https://www.w3.org/WAI/standards-guidelines/wcag/", duration: "Ref", source: "W3C", relevance: 98, aiCurated: true }
        ]
    },

    // Git & GitHub
    "Git & GitHub": {
        "Git Basics (init, add, commit)": [
            { title: "Git Official Docs", description: "Pro Git book — free and comprehensive.", type: "Documentation", difficulty: "Beginner", link: "https://git-scm.com/book/en/v2", duration: "Book", source: "Git", relevance: 100, aiCurated: true },
            { title: "Git Cheat Sheet (PDF)", description: "Git commands quick reference.", type: "Documentation", difficulty: "Beginner", link: "#notes-git-cheatsheet", duration: "PDF", source: "Notes", relevance: 96, aiCurated: true },
            { title: "GitHub Tutorial (PDF)", description: "GitHub usage tutorial notes.", type: "Documentation", difficulty: "Beginner", link: "#notes-git-tutorial", duration: "PDF", source: "Notes", relevance: 95, aiCurated: true },
            { title: "Learn Git Branching", description: "Interactive visual Git tutorial.", type: "Practice", difficulty: "Beginner", link: "https://learngitbranching.js.org/", duration: "2h", source: "LGBI", relevance: 98, aiCurated: true }
        ],
        "Branching & Merging": [
            { title: "Git Branching Guide", description: "Branches, merging, and conflicts.", type: "Documentation", difficulty: "Intermediate", link: "https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging", duration: "3h", source: "Git", relevance: 96, aiCurated: true }
        ],
        "Remote Repos & GitHub": [
            { title: "GitHub Docs", description: "GitHub official documentation.", type: "Documentation", difficulty: "Beginner", link: "https://docs.github.com/en", duration: "Ref", source: "GitHub", relevance: 100, aiCurated: true },
            { title: "GitHub Skills", description: "Interactive GitHub learning paths.", type: "Practice", difficulty: "Beginner", link: "https://skills.github.com/", duration: "Ongoing", source: "GitHub", relevance: 96, aiCurated: true }
        ],
        "Collaboration (PRs, Issues)": [
            { title: "Contributing to Open Source", description: "How to make your first PR.", type: "Documentation", difficulty: "Intermediate", link: "https://opensource.guide/how-to-contribute/", duration: "2h", source: "OSS Guide", relevance: 94, aiCurated: true },
            { title: "First Contributions", description: "Practice making your first open source contribution.", type: "Practice", difficulty: "Beginner", link: "https://github.com/firstcontributions/first-contributions", duration: "1h", source: "GitHub", relevance: 96, aiCurated: true }
        ],
        "Advanced Git (Rebase, Stash)": [
            { title: "Git Rebase Guide", description: "Interactive rebase and advanced workflows.", type: "Documentation", difficulty: "Advanced", link: "https://git-scm.com/book/en/v2/Git-Branching-Rebasing", duration: "3h", source: "Git", relevance: 96, aiCurated: true }
        ],
        "CI/CD Integration": [
            { title: "GitHub Actions Docs", description: "Automate workflows with GitHub Actions.", type: "Documentation", difficulty: "Intermediate", link: "https://docs.github.com/en/actions", duration: "5h", source: "GitHub", relevance: 98, aiCurated: true },
            { title: "GitHub Actions Starter Workflows", description: "Pre-built CI/CD templates.", type: "Practice", difficulty: "Intermediate", link: "https://github.com/actions/starter-workflows", duration: "Ongoing", source: "GitHub", relevance: 94, aiCurated: false }
        ]
    },

    // Docker
    "Docker": {
        "Docker Fundamentals": [
            { title: "Docker Getting Started", description: "Official Docker tutorial for beginners.", type: "Documentation", difficulty: "Beginner", link: "https://docs.docker.com/get-started/", duration: "3h", source: "Docker", relevance: 100, aiCurated: true },
            { title: "Docker Curriculum", description: "Step-by-step Docker tutorial with hands-on examples.", type: "Course", difficulty: "Beginner", link: "https://docker-curriculum.com/", duration: "5h", source: "Prakhar", relevance: 96, aiCurated: true },
            { title: "Play with Docker", description: "Free browser-based Docker playground.", type: "Practice", difficulty: "Beginner", link: "https://labs.play-with-docker.com/", duration: "Ongoing", source: "PWD", relevance: 94, aiCurated: true }
        ],
        "Dockerfile & Images": [
            { title: "Dockerfile Reference", description: "Complete Dockerfile syntax and directives.", type: "Documentation", difficulty: "Intermediate", link: "https://docs.docker.com/reference/dockerfile/", duration: "Ref", source: "Docker", relevance: 98, aiCurated: true },
            { title: "Best Practices for Dockerfiles", description: "Optimizing image size and build speed.", type: "Documentation", difficulty: "Intermediate", link: "https://docs.docker.com/build/building/best-practices/", duration: "2h", source: "Docker", relevance: 96, aiCurated: true },
            { title: "Docker Hub Official Images", description: "Browse and use trusted base images.", type: "Practice", difficulty: "Beginner", link: "https://hub.docker.com/search?type=image&image_filter=official", duration: "Ref", source: "Docker Hub", relevance: 90, aiCurated: false }
        ],
        "Docker Compose": [
            { title: "Docker Compose Docs", description: "Define and manage multi-container applications.", type: "Documentation", difficulty: "Intermediate", link: "https://docs.docker.com/compose/", duration: "4h", source: "Docker", relevance: 100, aiCurated: true },
            { title: "Compose File Reference", description: "Full YAML specification for docker-compose.", type: "Documentation", difficulty: "Intermediate", link: "https://docs.docker.com/reference/compose-file/", duration: "Ref", source: "Docker", relevance: 96, aiCurated: true },
            { title: "Awesome Compose", description: "Sample Docker Compose projects for learning.", type: "Practice", difficulty: "Intermediate", link: "https://github.com/docker/awesome-compose", duration: "Ongoing", source: "GitHub", relevance: 94, aiCurated: true }
        ],
        "Networking & Volumes": [
            { title: "Docker Networking Overview", description: "Bridge, host, overlay, and custom networks.", type: "Documentation", difficulty: "Intermediate", link: "https://docs.docker.com/engine/network/", duration: "3h", source: "Docker", relevance: 96, aiCurated: true },
            { title: "Docker Volumes Guide", description: "Persistent data storage across containers.", type: "Documentation", difficulty: "Intermediate", link: "https://docs.docker.com/engine/storage/volumes/", duration: "2h", source: "Docker", relevance: 94, aiCurated: true },
            { title: "Docker Network Lab", description: "Hands-on networking exercises.", type: "Practice", difficulty: "Intermediate", link: "https://training.play-with-docker.com/docker-networking-hol/", duration: "2h", source: "PWD", relevance: 92, aiCurated: true }
        ],
        "Container Orchestration Basics": [
            { title: "Docker Swarm Tutorial", description: "Introduction to container orchestration with Swarm.", type: "Documentation", difficulty: "Advanced", link: "https://docs.docker.com/engine/swarm/swarm-tutorial/", duration: "4h", source: "Docker", relevance: 90, aiCurated: true },
            { title: "Kubernetes for Docker Users", description: "From Docker concepts to Kubernetes.", type: "Documentation", difficulty: "Advanced", link: "https://kubernetes.io/docs/reference/kubectl/docker-cli-to-kubectl/", duration: "3h", source: "K8s", relevance: 88, aiCurated: true },
            { title: "K8s Playground", description: "Try Kubernetes in your browser.", type: "Practice", difficulty: "Advanced", link: "https://labs.play-with-k8s.com/", duration: "Ongoing", source: "PWK", relevance: 86, aiCurated: false }
        ],
        "Production Best Practices": [
            { title: "Docker Security Guide", description: "Container security scanning and hardening.", type: "Documentation", difficulty: "Advanced", link: "https://docs.docker.com/engine/security/", duration: "3h", source: "Docker", relevance: 96, aiCurated: true },
            { title: "Docker Cheat Sheet", description: "Quick command reference for daily use.", type: "Documentation", difficulty: "All", link: "https://github.com/wsargent/docker-cheat-sheet", duration: "Ref", source: "GitHub", relevance: 94, aiCurated: true },
            { title: "Container Best Practices", description: "Google's container building best practices.", type: "Documentation", difficulty: "Advanced", link: "https://cloud.google.com/architecture/best-practices-for-building-containers", duration: "2h", source: "Google", relevance: 92, aiCurated: true }
        ]
    },

    // Postman
    "Postman": {
        "HTTP & API Basics": [
            { title: "MDN HTTP Guide", description: "Complete HTTP protocol reference.", type: "Documentation", difficulty: "Beginner", link: "https://developer.mozilla.org/en-US/docs/Web/HTTP", duration: "4h", source: "MDN", relevance: 98, aiCurated: true },
            { title: "RESTful API Design", description: "Best practices for designing REST APIs.", type: "Documentation", difficulty: "Beginner", link: "https://restfulapi.net/", duration: "3h", source: "RESTful API", relevance: 94, aiCurated: true },
            { title: "Public APIs List", description: "Hundreds of free APIs to practice with.", type: "Practice", difficulty: "Beginner", link: "https://github.com/public-apis/public-apis", duration: "Ref", source: "GitHub", relevance: 92, aiCurated: true }
        ],
        "Sending Requests": [
            { title: "Postman Getting Started", description: "Send your first API request step-by-step.", type: "Course", difficulty: "Beginner", link: "https://learning.postman.com/docs/getting-started/first-steps/sending-the-first-request/", duration: "1h", source: "Postman", relevance: 100, aiCurated: true },
            { title: "Postman Learning Center", description: "Official Postman tutorials and guides.", type: "Documentation", difficulty: "Beginner", link: "https://learning.postman.com/", duration: "Ongoing", source: "Postman", relevance: 98, aiCurated: true },
            { title: "JSONPlaceholder", description: "Free fake API for testing HTTP requests.", type: "Practice", difficulty: "Beginner", link: "https://jsonplaceholder.typicode.com/", duration: "Ongoing", source: "Typicode", relevance: 94, aiCurated: true }
        ],
        "Environment & Variables": [
            { title: "Postman Variables Guide", description: "Global, collection, and environment variables.", type: "Documentation", difficulty: "Intermediate", link: "https://learning.postman.com/docs/sending-requests/variables/variables/", duration: "2h", source: "Postman", relevance: 96, aiCurated: true },
            { title: "Managing Environments", description: "Set up dev/staging/prod API configs.", type: "Documentation", difficulty: "Intermediate", link: "https://learning.postman.com/docs/sending-requests/variables/managing-environments/", duration: "1h", source: "Postman", relevance: 94, aiCurated: true },
            { title: "Postman API Workspace", description: "Hands-on workspace templates.", type: "Practice", difficulty: "Intermediate", link: "https://www.postman.com/explore", duration: "Ongoing", source: "Postman", relevance: 90, aiCurated: false }
        ],
        "Testing & Assertions": [
            { title: "Writing Tests in Postman", description: "Automate response validation with scripts.", type: "Documentation", difficulty: "Intermediate", link: "https://learning.postman.com/docs/tests-and-scripts/write-scripts/test-scripts/", duration: "3h", source: "Postman", relevance: 98, aiCurated: true },
            { title: "Postman Scripting Reference", description: "pm.* API reference for test scripts.", type: "Documentation", difficulty: "Intermediate", link: "https://learning.postman.com/docs/tests-and-scripts/write-scripts/postman-sandbox-api-reference/", duration: "Ref", source: "Postman", relevance: 94, aiCurated: true },
            { title: "15 Days of Postman", description: "Structured challenge to master Postman testing.", type: "Practice", difficulty: "Intermediate", link: "https://www.postman.com/postman/workspace/15-days-of-postman---for-testers/", duration: "15d", source: "Postman", relevance: 96, aiCurated: true }
        ],
        "Collections & Automation": [
            { title: "Postman Collections Guide", description: "Organize and share API request groups.", type: "Documentation", difficulty: "Intermediate", link: "https://learning.postman.com/docs/collections/using-collections/", duration: "2h", source: "Postman", relevance: 96, aiCurated: true },
            { title: "Collection Runner", description: "Run automated test sequences.", type: "Documentation", difficulty: "Intermediate", link: "https://learning.postman.com/docs/collections/running-collections/intro-to-collection-runs/", duration: "2h", source: "Postman", relevance: 94, aiCurated: true },
            { title: "Newman CLI", description: "Run Postman collections from the command line.", type: "Practice", difficulty: "Advanced", link: "https://learning.postman.com/docs/collections/using-newman-cli/command-line-integration-with-newman/", duration: "2h", source: "Postman", relevance: 92, aiCurated: true }
        ],
        "Advanced Workflows": [
            { title: "Postman Mock Servers", description: "Create mock APIs for frontend development.", type: "Documentation", difficulty: "Advanced", link: "https://learning.postman.com/docs/designing-and-developing-your-api/mocking-data/mock-with-api/", duration: "2h", source: "Postman", relevance: 94, aiCurated: true },
            { title: "Postman Monitors", description: "Schedule and automate API monitoring.", type: "Documentation", difficulty: "Advanced", link: "https://learning.postman.com/docs/monitoring-your-api/intro-monitors/", duration: "2h", source: "Postman", relevance: 90, aiCurated: true },
            { title: "Postman API Documentation", description: "Auto-generate beautiful API docs.", type: "Practice", difficulty: "Intermediate", link: "https://learning.postman.com/docs/publishing-your-api/api-documentation-overview/", duration: "1h", source: "Postman", relevance: 92, aiCurated: true }
        ]
    },

    // VS Code
    "VS Code": {
        "Editor Setup & Navigation": [
            { title: "VS Code Official Docs", description: "Complete VS Code feature documentation.", type: "Documentation", difficulty: "Beginner", link: "https://code.visualstudio.com/docs", duration: "Ref", source: "Microsoft", relevance: 100, aiCurated: true },
            { title: "VS Code Getting Started", description: "First steps and basic navigation.", type: "Course", difficulty: "Beginner", link: "https://code.visualstudio.com/docs/getstarted/introvideos", duration: "2h", source: "Microsoft", relevance: 98, aiCurated: true },
            { title: "VS Code Settings Guide", description: "Customize your editor workspace.", type: "Documentation", difficulty: "Beginner", link: "https://code.visualstudio.com/docs/getstarted/settings", duration: "1h", source: "Microsoft", relevance: 94, aiCurated: true }
        ],
        "Keyboard Shortcuts & Productivity": [
            { title: "VS Code Shortcuts (Mac)", description: "Printable keyboard shortcut PDF.", type: "Documentation", difficulty: "Beginner", link: "https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf", duration: "PDF", source: "Microsoft", relevance: 98, aiCurated: true },
            { title: "VS Code Tips & Tricks", description: "Boost your productivity with hidden features.", type: "Documentation", difficulty: "Intermediate", link: "https://code.visualstudio.com/docs/getstarted/tips-and-tricks", duration: "2h", source: "Microsoft", relevance: 96, aiCurated: true },
            { title: "VS Code Can Do That?!", description: "Discover features most developers miss.", type: "Course", difficulty: "Intermediate", link: "https://vscodecandothat.com/", duration: "3h", source: "Burke", relevance: 94, aiCurated: true }
        ],
        "Extensions & Customization": [
            { title: "VS Code Marketplace", description: "Browse thousands of extensions.", type: "Documentation", difficulty: "Beginner", link: "https://marketplace.visualstudio.com/vscode", duration: "Ref", source: "Microsoft", relevance: 96, aiCurated: true },
            { title: "Extension Development Guide", description: "Create your own VS Code extensions.", type: "Documentation", difficulty: "Advanced", link: "https://code.visualstudio.com/api/get-started/your-first-extension", duration: "5h", source: "Microsoft", relevance: 88, aiCurated: true },
            { title: "VS Code Themes Gallery", description: "Find and install beautiful editor themes.", type: "Practice", difficulty: "Beginner", link: "https://vscodethemes.com/", duration: "Ref", source: "Community", relevance: 90, aiCurated: false }
        ],
        "Debugging & Terminal": [
            { title: "VS Code Debugging Guide", description: "Set breakpoints, watch variables, step through code.", type: "Documentation", difficulty: "Intermediate", link: "https://code.visualstudio.com/docs/editor/debugging", duration: "3h", source: "Microsoft", relevance: 98, aiCurated: true },
            { title: "Integrated Terminal Docs", description: "Master the built-in terminal.", type: "Documentation", difficulty: "Beginner", link: "https://code.visualstudio.com/docs/terminal/basics", duration: "1h", source: "Microsoft", relevance: 94, aiCurated: true },
            { title: "Launch Configurations", description: "Create custom debug configurations.", type: "Practice", difficulty: "Intermediate", link: "https://code.visualstudio.com/docs/editor/debugging#_launch-configurations", duration: "2h", source: "Microsoft", relevance: 92, aiCurated: true }
        ],
        "Git Integration & Source Control": [
            { title: "VS Code Git Support", description: "Built-in Git source control features.", type: "Documentation", difficulty: "Intermediate", link: "https://code.visualstudio.com/docs/sourcecontrol/overview", duration: "2h", source: "Microsoft", relevance: 96, aiCurated: true },
            { title: "GitLens Extension", description: "Supercharge Git inside VS Code.", type: "Documentation", difficulty: "Intermediate", link: "https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens", duration: "1h", source: "Marketplace", relevance: 94, aiCurated: true },
            { title: "VS Code & GitHub Integration", description: "PRs, issues, and Copilot inside the editor.", type: "Practice", difficulty: "Intermediate", link: "https://code.visualstudio.com/docs/sourcecontrol/github", duration: "2h", source: "Microsoft", relevance: 92, aiCurated: true }
        ],
        "Advanced Workflows & Snippets": [
            { title: "VS Code Snippets Guide", description: "Create custom code snippets.", type: "Documentation", difficulty: "Intermediate", link: "https://code.visualstudio.com/docs/editor/userdefinedsnippets", duration: "2h", source: "Microsoft", relevance: 94, aiCurated: true },
            { title: "Multi-root Workspaces", description: "Work with multiple project folders.", type: "Documentation", difficulty: "Advanced", link: "https://code.visualstudio.com/docs/editor/multi-root-workspaces", duration: "1h", source: "Microsoft", relevance: 90, aiCurated: true },
            { title: "VS Code Remote Development", description: "SSH, containers, and WSL workflows.", type: "Course", difficulty: "Advanced", link: "https://code.visualstudio.com/docs/remote/remote-overview", duration: "3h", source: "Microsoft", relevance: 92, aiCurated: true }
        ]
    },

    // AWS (Cloud Basics)
    "AWS (Cloud Basics)": {
        "Cloud Fundamentals & Console": [
            { title: "AWS Getting Started", description: "Official AWS resource center for beginners.", type: "Documentation", difficulty: "Beginner", link: "https://aws.amazon.com/getting-started/", duration: "3h", source: "AWS", relevance: 100, aiCurated: true },
            { title: "Cloud Practitioner Essentials", description: "Free foundational cloud training course.", type: "Course", difficulty: "Beginner", link: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials", duration: "6h", source: "AWS", relevance: 98, aiCurated: true },
            { title: "AWS Free Tier", description: "Practice with free compute, storage, and databases.", type: "Practice", difficulty: "Beginner", link: "https://aws.amazon.com/free/", duration: "Ongoing", source: "AWS", relevance: 96, aiCurated: true }
        ],
        "IAM & Security": [
            { title: "IAM User Guide", description: "Identity and access management deep dive.", type: "Documentation", difficulty: "Intermediate", link: "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html", duration: "4h", source: "AWS", relevance: 98, aiCurated: true },
            { title: "AWS Security Best Practices", description: "Shared responsibility model and security controls.", type: "Documentation", difficulty: "Intermediate", link: "https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html", duration: "3h", source: "AWS", relevance: 96, aiCurated: true },
            { title: "IAM Policy Simulator", description: "Test and validate IAM policies interactively.", type: "Practice", difficulty: "Intermediate", link: "https://policysim.aws.amazon.com/", duration: "1h", source: "AWS", relevance: 94, aiCurated: true }
        ],
        "EC2 & Compute": [
            { title: "EC2 Getting Started", description: "Launch your first virtual server.", type: "Documentation", difficulty: "Beginner", link: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html", duration: "2h", source: "AWS", relevance: 98, aiCurated: true },
            { title: "EC2 Instance Types Guide", description: "Choose the right instance for your workload.", type: "Documentation", difficulty: "Intermediate", link: "https://aws.amazon.com/ec2/instance-types/", duration: "1h", source: "AWS", relevance: 94, aiCurated: true },
            { title: "AWS Hands-On Tutorials", description: "Guided labs for EC2 and compute services.", type: "Practice", difficulty: "Beginner", link: "https://aws.amazon.com/getting-started/hands-on/", duration: "Ongoing", source: "AWS", relevance: 96, aiCurated: true }
        ],
        "S3 & Storage": [
            { title: "S3 User Guide", description: "Object storage fundamentals and configuration.", type: "Documentation", difficulty: "Beginner", link: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html", duration: "3h", source: "AWS", relevance: 98, aiCurated: true },
            { title: "Host a Static Website on S3", description: "Step-by-step static website hosting guide.", type: "Course", difficulty: "Beginner", link: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html", duration: "1h", source: "AWS", relevance: 96, aiCurated: true },
            { title: "S3 Storage Classes", description: "Understand S3 pricing and storage tiers.", type: "Documentation", difficulty: "Intermediate", link: "https://aws.amazon.com/s3/storage-classes/", duration: "1h", source: "AWS", relevance: 92, aiCurated: true }
        ],
        "Lambda & Serverless": [
            { title: "Lambda Getting Started", description: "Build your first serverless function.", type: "Documentation", difficulty: "Intermediate", link: "https://docs.aws.amazon.com/lambda/latest/dg/getting-started.html", duration: "2h", source: "AWS", relevance: 98, aiCurated: true },
            { title: "Serverless Application Model", description: "SAM framework for building serverless apps.", type: "Documentation", difficulty: "Intermediate", link: "https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html", duration: "4h", source: "AWS", relevance: 94, aiCurated: true },
            { title: "Serverless Land", description: "Patterns, examples, and learning resources.", type: "Practice", difficulty: "Intermediate", link: "https://serverlessland.com/", duration: "Ongoing", source: "AWS", relevance: 96, aiCurated: true }
        ],
        "Architecture & Best Practices": [
            { title: "Well-Architected Framework", description: "AWS best practices for cloud architecture.", type: "Documentation", difficulty: "Advanced", link: "https://aws.amazon.com/architecture/well-architected/", duration: "5h", source: "AWS", relevance: 98, aiCurated: true },
            { title: "AWS Architecture Center", description: "Reference architectures and diagrams.", type: "Documentation", difficulty: "Advanced", link: "https://aws.amazon.com/architecture/", duration: "Ref", source: "AWS", relevance: 96, aiCurated: true },
            { title: "AWS Skill Builder", description: "Free and premium training courses.", type: "Course", difficulty: "All", link: "https://explore.skillbuilder.aws/", duration: "Ongoing", source: "AWS", relevance: 94, aiCurated: true }
        ]
    }
};
