export const roadmapResources = {
    "Full Stack Developer": {
        "HTML/CSS Foundations": [
            { title: "MDN Web Docs", type: "Documentation", link: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
            { title: "CSS Tricks", type: "Article", link: "https://css-tricks.com/" },
            { title: "freeCodeCamp HTML/CSS", type: "Course", link: "https://www.freecodecamp.org/learn/responsive-web-design/" }
        ],
        "JS/TypeScript Depth": [
            { title: "JavaScript.info", type: "Documentation", link: "https://javascript.info/" },
            { title: "Total TypeScript", type: "Course", link: "https://www.totaltypescript.com/" },
            { title: "Namaste JavaScript", type: "Video", link: "https://www.youtube.com/playlist?list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP" }
        ],
        "Frontend Frameworks (React)": [
            { title: "React Docs (Beta)", type: "Documentation", link: "https://react.dev/" },
            { title: "React Patterns", type: "Article", link: "https://reactpatterns.com/" },
            { title: "Build 25 Projects", type: "Video", link: "https://www.youtube.com/watch?v=0pThnRneDJA" }
        ],
        "Backend (Node/Python/Go)": [
            { title: "Node.js Best Practices", type: "GitHub", link: "https://github.com/goldbergyoni/nodebestpractices" },
            { title: "FastAPI Documentation", type: "Documentation", link: "https://fastapi.tiangolo.com/" }
        ],
        "DB & Architecture": [
            { title: "PostgreSQL Tutorial", type: "Course", link: "https://www.postgresqltutorial.com/" },
            { title: "System Design Primer", type: "GitHub", link: "https://github.com/donnemartin/system-design-primer" }
        ],
        "DevOps & Deployment": [
             { title: "Docker for Beginners", type: "Video", link: "https://www.youtube.com/watch?v=fqMOX6JJhGo" },
             { title: "AWS Free Tier", type: "Platform", link: "https://aws.amazon.com/free/" }
        ]
    },
    // Adding sample structure for others to avoid undefined errors. 
    // In production, populate all.
    "AI Engineer": {
         "Linear Algebra/Calc": [
             { title: "3Blue1Brown - Essence of Linear Algebra", type: "Video", link: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab" },
             { title: "Khan Academy Math", type: "Course", link: "https://www.khanacademy.org/math" }
         ],
         "Deep Learning Architectures": [
             { title: "Deep Learning Book", type: "Book", link: "https://www.deeplearningbook.org/" },
             { title: "Fast.ai", type: "Course", link: "https://course.fast.ai/" }
         ],
         "PyTorch/TensorFlow": [
             { title: "PyTorch 60min Blitz", type: "Documentation", link: "https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html" }
         ]
    }
    // ... Function to handle safe access will be used, so partial data is fine for now.
};
