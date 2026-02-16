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
    "Full Stack Developer": {
        "HTML/CSS Foundations": [
            { 
                title: "MDN Web Docs", 
                description: "The ultimate resource for HTML semantics and standards.", 
                type: "Documentation", 
                difficulty: "Beginner", 
                link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
                aiCurated: true
            },
            { 
                title: "CSS Tricks - Flexbox Guide", 
                description: "A complete visual guide to CSS Flexbox layout.", 
                type: "Article", 
                difficulty: "Beginner", 
                link: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
                aiCurated: true
            },
            { 
                title: "Responsive Web Design", 
                description: "freeCodeCamp's certification course with 5 projects.", 
                type: "Course", 
                difficulty: "Beginner", 
                link: "https://www.freecodecamp.org/learn/responsive-web-design/",
                aiCurated: false
            }
        ],
        "JS/TypeScript Depth": [
            { 
                title: "JavaScript.info", 
                description: "Modern JavaScript Tutorial from the basics to advanced topics.", 
                type: "Documentation", 
                difficulty: "Intermediate", 
                link: "https://javascript.info/",
                aiCurated: true
            },
            { 
                title: "Total TypeScript", 
                description: "Interactive TypeScript exercises to master type safety.", 
                type: "Course", 
                difficulty: "Advanced", 
                link: "https://www.totaltypescript.com/",
                aiCurated: true
            },
            { 
                title: "Namaste JavaScript", 
                description: "Deep dive into JS internals like hoisting and closures.", 
                type: "Video", 
                difficulty: "Intermediate", 
                link: "https://www.youtube.com/playlist?list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP",
                aiCurated: false
            }
        ]
    },
    "AI Engineer": {
         "Linear Algebra/Calc": [
             { 
                 title: "Essence of Linear Algebra", 
                 description: "3Blue1Brown's visual introduction to vectors and matrices.", 
                 type: "Video", 
                 difficulty: "Beginner", 
                 link: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab",
                 aiCurated: true 
             },
             { 
                 title: "Khan Academy Math", 
                 description: "Comprehensive exercises for Calculus and Statistics.", 
                 type: "Course", 
                 difficulty: "Beginner", 
                 link: "https://www.khanacademy.org/math",
                 aiCurated: false 
             }
         ],
         "Deep Learning Architectures": [
             { 
                 title: "Deep Learning Book", 
                 description: "The bible of Deep Learning by Goodfellow, Bengio, and Courville.", 
                 type: "Documentation", 
                 difficulty: "Advanced", 
                 link: "https://www.deeplearningbook.org/",
                 aiCurated: true 
             },
             { 
                 title: "Fast.ai", 
                 description: "Practical Deep Learning for Coders using PyTorch.", 
                 type: "Course", 
                 difficulty: "Intermediate", 
                 link: "https://course.fast.ai/",
                 aiCurated: true 
             }
         ]
    }
};
