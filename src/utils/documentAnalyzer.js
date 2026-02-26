/**
 * Document Content Analyzer
 * Analyzes extracted text from academic documents to identify:
 * - Subjects and topics
 * - Question patterns from PYQs and model papers
 * - Syllabus units and modules
 * - Timetable information
 */

// ── Subject Detection Patterns ──
// Each subject has core keywords, secondary keywords, and topic extractors
const SUBJECT_DATABASE = {
    'Mathematics': {
        coreKeywords: ['mathematics', 'math', 'calculus', 'algebra', 'trigonometry', 'differential equation'],
        secondaryKeywords: ['integral', 'derivative', 'matrix', 'determinant', 'laplace', 'fourier', 'vector',
            'eigenvalue', 'eigenvector', 'probability', 'statistics', 'permutation', 'combination',
            'complex number', 'partial fraction', 'limit', 'continuity', 'maxima', 'minima',
            'taylor', 'maclaurin', 'beta function', 'gamma function', 'numerical method',
            'interpolation', 'regression', 'correlation', 'mean', 'variance', 'standard deviation',
            'binomial', 'poisson', 'normal distribution', 'z-transform', 'differential',
            'integration', 'theorem', 'equation', 'polynomial', 'logarithm', 'sin', 'cos', 'tan'],
        topicGroups: {
            'Calculus & Differentiation': ['differentiation', 'derivative', 'maxima', 'minima', 'taylor', 'maclaurin', 'limit', 'continuity', 'rolle', 'mean value theorem'],
            'Integration': ['integration', 'integral', 'partial fraction', 'beta function', 'gamma function', 'double integral', 'triple integral', 'area under curve'],
            'Linear Algebra': ['matrix', 'determinant', 'eigenvalue', 'eigenvector', 'rank', 'system of equation', 'cayley hamilton', 'diagonalization', 'vector space', 'linear transformation'],
            'Differential Equations': ['differential equation', 'ode', 'pde', 'laplace transform', 'first order', 'second order', 'homogeneous', 'bernoulli', 'exact equation'],
            'Probability & Statistics': ['probability', 'statistics', 'mean', 'variance', 'standard deviation', 'binomial', 'poisson', 'normal distribution', 'bayes', 'random variable'],
            'Complex Analysis': ['complex number', 'analytic function', 'cauchy', 'residue', 'contour', 'conformal mapping'],
            'Numerical Methods': ['numerical method', 'newton raphson', 'bisection', 'interpolation', 'runge kutta', 'euler method', 'simpson', 'trapezoidal'],
            'Fourier & Transforms': ['fourier', 'laplace', 'z-transform', 'fourier series', 'fourier transform'],
        }
    },
    'Physics': {
        coreKeywords: ['physics', 'mechanics', 'thermodynamics', 'optics', 'electromagnetism'],
        secondaryKeywords: ['newton', 'force', 'velocity', 'acceleration', 'momentum', 'energy', 'wave',
            'quantum', 'photon', 'electron', 'magnetic', 'electric field', 'potential', 'capacitor',
            'resistance', 'current', 'ohm', 'kirchhoff', 'faraday', 'gauss', 'maxwell',
            'relativity', 'entropy', 'heat', 'temperature', 'pressure', 'volume', 'work', 'power',
            'oscillation', 'frequency', 'wavelength', 'interference', 'diffraction', 'polarization',
            'refraction', 'reflection', 'lens', 'mirror', 'laser', 'semiconductor'],
        topicGroups: {
            'Classical Mechanics': ['newton', 'force', 'momentum', 'energy', 'work', 'power', 'torque', 'rotation', 'oscillation', 'shm', 'pendulum'],
            'Electromagnetism': ['electric field', 'magnetic field', 'gauss', 'faraday', 'maxwell', 'coulomb', 'capacitor', 'inductor', 'electromagnetic'],
            'Thermodynamics': ['thermodynamics', 'entropy', 'enthalpy', 'heat', 'temperature', 'carnot', 'adiabatic', 'isothermal'],
            'Optics': ['optics', 'refraction', 'reflection', 'interference', 'diffraction', 'polarization', 'lens', 'mirror', 'laser'],
            'Quantum Physics': ['quantum', 'photon', 'wave function', 'schrodinger', 'heisenberg', 'planck', 'bohr model'],
            'Waves & Oscillations': ['wave', 'frequency', 'wavelength', 'standing wave', 'resonance', 'doppler'],
        }
    },
    'Chemistry': {
        coreKeywords: ['chemistry', 'organic chemistry', 'inorganic chemistry', 'physical chemistry'],
        secondaryKeywords: ['atom', 'molecule', 'compound', 'element', 'bonding', 'reaction', 'acid',
            'base', 'oxidation', 'reduction', 'electrochemistry', 'solution', 'mole', 'stoichiometry',
            'periodic table', 'orbital', 'hybridization', 'isomer', 'alkane', 'alkene', 'alkyne',
            'aromatic', 'benzene', 'polymer', 'catalyst', 'equilibrium', 'ph', 'buffer', 'titration'],
        topicGroups: {
            'Organic Reactions': ['nucleophilic', 'electrophilic', 'substitution', 'elimination', 'addition reaction', 'named reaction', 'grignard', 'wittig', 'aldol'],
            'Chemical Bonding': ['bonding', 'covalent', 'ionic', 'metallic', 'hybridization', 'vsepr', 'molecular orbital'],
            'Thermochemistry': ['enthalpy', 'entropy', 'gibbs', 'hess law', 'endothermic', 'exothermic', 'equilibrium constant'],
            'Electrochemistry': ['electrochemistry', 'oxidation', 'reduction', 'galvanic cell', 'electrolysis', 'nernst', 'electrode potential'],
        }
    },
    'Data Structures & Algorithms': {
        coreKeywords: ['data structure', 'algorithm', 'dsa'],
        secondaryKeywords: ['array', 'linked list', 'stack', 'queue', 'tree', 'graph', 'hash',
            'sorting', 'searching', 'binary search', 'recursion', 'dynamic programming',
            'greedy', 'backtracking', 'bfs', 'dfs', 'dijkstra', 'prim', 'kruskal',
            'avl', 'heap', 'trie', 'segment tree', 'time complexity', 'space complexity',
            'big o', 'traversal', 'inorder', 'preorder', 'postorder', 'insertion', 'deletion',
            'merge sort', 'quick sort', 'bubble sort', 'selection sort', 'hashing'],
        topicGroups: {
            'Arrays & Strings': ['array', 'string', 'two pointer', 'sliding window', 'prefix sum', 'subarray'],
            'Linked Lists': ['linked list', 'singly linked', 'doubly linked', 'circular linked', 'reverse linked'],
            'Stacks & Queues': ['stack', 'queue', 'deque', 'priority queue', 'infix', 'postfix', 'prefix'],
            'Trees': ['tree', 'binary tree', 'bst', 'binary search tree', 'avl', 'red black', 'b tree', 'inorder', 'preorder'],
            'Graphs': ['graph', 'bfs', 'dfs', 'dijkstra', 'bellman ford', 'floyd warshall', 'minimum spanning tree', 'topological sort', 'prim', 'kruskal'],
            'Sorting & Searching': ['sorting', 'searching', 'merge sort', 'quick sort', 'binary search', 'selection sort', 'counting sort', 'radix sort'],
            'Dynamic Programming': ['dynamic programming', 'memoization', 'tabulation', 'knapsack', 'lcs', 'lis', 'coin change', 'matrix chain'],
            'Hashing': ['hashing', 'hash table', 'hash map', 'collision', 'open addressing', 'chaining'],
        }
    },
    'Database Systems': {
        coreKeywords: ['database', 'dbms', 'rdbms', 'sql'],
        secondaryKeywords: ['table', 'relation', 'normalization', 'query', 'join', 'index',
            'transaction', 'acid', 'concurrency', 'deadlock', 'er diagram', 'schema',
            'primary key', 'foreign key', 'view', 'trigger', 'procedure', 'cursor',
            'nosql', 'mongodb', 'aggregate', 'group by', 'having', 'subquery',
            'relational algebra', 'tuple', 'attribute', 'functional dependency', '1nf', '2nf', '3nf', 'bcnf'],
        topicGroups: {
            'SQL & Queries': ['sql', 'select', 'insert', 'update', 'delete', 'join', 'subquery', 'group by', 'having', 'order by', 'aggregate', 'union'],
            'Normalization': ['normalization', '1nf', '2nf', '3nf', 'bcnf', 'functional dependency', 'decomposition', 'lossless', 'dependency preservation'],
            'Transaction Management': ['transaction', 'acid', 'commit', 'rollback', 'concurrency', 'lock', 'timestamp', 'serializability', 'two phase locking'],
            'ER Modeling': ['er diagram', 'entity', 'relationship', 'cardinality', 'participation', 'weak entity', 'generalization', 'specialization'],
            'Indexing & Storage': ['index', 'b tree', 'b+ tree', 'hashing', 'file organization', 'clustering', 'primary index', 'secondary index'],
        }
    },
    'Operating Systems': {
        coreKeywords: ['operating system', 'os'],
        secondaryKeywords: ['process', 'thread', 'scheduling', 'deadlock', 'memory management',
            'paging', 'segmentation', 'virtual memory', 'file system', 'semaphore', 'mutex',
            'cpu scheduling', 'page replacement', 'disk scheduling', 'fcfs', 'sjf', 'round robin',
            'priority scheduling', 'lru', 'fifo', 'optimal', 'banker', 'dining philosopher',
            'producer consumer', 'reader writer', 'kernel', 'system call', 'context switch'],
        topicGroups: {
            'Process Management': ['process', 'pcb', 'context switch', 'process state', 'fork', 'exec', 'interprocess communication', 'process synchronization'],
            'CPU Scheduling': ['cpu scheduling', 'fcfs', 'sjf', 'round robin', 'priority scheduling', 'preemptive', 'non preemptive', 'gantt chart', 'turnaround time', 'waiting time'],
            'Deadlock': ['deadlock', 'banker algorithm', 'resource allocation', 'deadlock prevention', 'deadlock avoidance', 'deadlock detection', 'recovery'],
            'Memory Management': ['memory management', 'paging', 'segmentation', 'virtual memory', 'page table', 'page fault', 'page replacement', 'lru', 'fifo', 'optimal', 'thrashing'],
            'Synchronization': ['semaphore', 'mutex', 'monitor', 'critical section', 'race condition', 'dining philosopher', 'producer consumer', 'reader writer'],
            'File Systems': ['file system', 'directory', 'allocation method', 'disk scheduling', 'fcfs', 'sstf', 'scan', 'cscan', 'inode'],
        }
    },
    'Computer Networks': {
        coreKeywords: ['computer network', 'networking', 'cn'],
        secondaryKeywords: ['osi', 'tcp', 'ip', 'udp', 'http', 'https', 'ftp', 'smtp', 'dns',
            'routing', 'switching', 'subnet', 'mac address', 'ip address', 'firewall',
            'protocol', 'packet', 'frame', 'socket', 'port', 'lan', 'wan', 'man',
            'ethernet', 'wifi', 'ssl', 'tls', 'vpn', 'nat', 'dhcp', 'arp',
            'congestion control', 'flow control', 'error detection', 'hamming', 'crc',
            'transmission', 'bandwidth', 'latency', 'throughput'],
        topicGroups: {
            'OSI & TCP/IP Model': ['osi model', 'tcp/ip', 'physical layer', 'data link', 'network layer', 'transport layer', 'application layer', 'session layer', 'presentation layer'],
            'Routing': ['routing', 'rip', 'ospf', 'bgp', 'distance vector', 'link state', 'router', 'routing table', 'subnet'],
            'Transport Layer': ['tcp', 'udp', 'congestion control', 'flow control', 'three way handshake', 'sliding window', 'go back n', 'selective repeat'],
            'Application Layer': ['http', 'https', 'ftp', 'smtp', 'dns', 'dhcp', 'snmp', 'pop3', 'imap'],
            'Network Security': ['firewall', 'encryption', 'ssl', 'tls', 'vpn', 'ipsec', 'digital signature', 'certificate', 'authentication'],
            'Data Link Layer': ['ethernet', 'mac', 'arp', 'switch', 'bridge', 'csma', 'collision detection', 'error detection', 'hamming', 'crc'],
        }
    },
    'Programming': {
        coreKeywords: ['programming', 'object oriented', 'oop'],
        secondaryKeywords: ['variable', 'function', 'class', 'object', 'inheritance', 'polymorphism',
            'encapsulation', 'abstraction', 'interface', 'constructor', 'destructor',
            'python', 'java', 'c++', 'cpp', 'c programming',
            'pointer', 'struct', 'array', 'loop', 'conditional', 'recursion',
            'file handling', 'exception handling', 'template', 'generic', 'overloading', 'overriding',
            'virtual function', 'abstract class', 'design pattern', 'singleton', 'factory'],
        topicGroups: {
            'OOP Concepts': ['class', 'object', 'inheritance', 'polymorphism', 'encapsulation', 'abstraction', 'interface', 'abstract class'],
            'Functions & Recursion': ['function', 'recursion', 'parameter', 'return type', 'call by value', 'call by reference', 'lambda'],
            'Pointers & Memory': ['pointer', 'memory allocation', 'malloc', 'calloc', 'new', 'delete', 'reference', 'dangling pointer'],
            'File Handling': ['file handling', 'fopen', 'fclose', 'fread', 'fwrite', 'input output', 'stream'],
            'Exception Handling': ['exception', 'try', 'catch', 'throw', 'finally', 'error handling'],
        }
    },
    'Machine Learning': {
        coreKeywords: ['machine learning', 'deep learning', 'artificial intelligence', 'neural network'],
        secondaryKeywords: ['regression', 'classification', 'clustering', 'decision tree', 'random forest',
            'svm', 'support vector', 'naive bayes', 'knn', 'k-means', 'pca',
            'gradient descent', 'backpropagation', 'overfitting', 'underfitting',
            'training', 'testing', 'validation', 'cross validation', 'precision', 'recall',
            'f1 score', 'accuracy', 'confusion matrix', 'cnn', 'rnn', 'lstm',
            'transformer', 'attention', 'epoch', 'batch', 'learning rate', 'loss function',
            'activation function', 'relu', 'sigmoid', 'softmax', 'dropout', 'regularization'],
        topicGroups: {
            'Supervised Learning': ['regression', 'classification', 'linear regression', 'logistic regression', 'decision tree', 'random forest', 'svm', 'knn', 'naive bayes'],
            'Unsupervised Learning': ['clustering', 'k-means', 'hierarchical clustering', 'pca', 'dimensionality reduction', 'association rule'],
            'Neural Networks': ['neural network', 'perceptron', 'multilayer', 'backpropagation', 'activation function', 'relu', 'sigmoid', 'softmax'],
            'Deep Learning': ['cnn', 'rnn', 'lstm', 'gan', 'autoencoder', 'transformer', 'attention mechanism', 'transfer learning'],
            'Model Evaluation': ['accuracy', 'precision', 'recall', 'f1 score', 'confusion matrix', 'roc', 'auc', 'cross validation', 'overfitting', 'underfitting'],
        }
    },
    'Web Development': {
        coreKeywords: ['web development', 'web technology', 'web programming'],
        secondaryKeywords: ['html', 'css', 'javascript', 'react', 'angular', 'node', 'express',
            'dom', 'api', 'rest', 'json', 'xml', 'ajax', 'fetch', 'responsive',
            'bootstrap', 'flexbox', 'grid', 'sass', 'webpack', 'npm', 'git',
            'server', 'client', 'frontend', 'backend', 'fullstack', 'mvc', 'routing'],
        topicGroups: {
            'HTML & CSS': ['html', 'css', 'semantic', 'flexbox', 'grid', 'responsive', 'media query', 'animation', 'selector'],
            'JavaScript': ['javascript', 'dom', 'event', 'closure', 'promise', 'async await', 'callback', 'prototype', 'scope'],
            'Frontend Frameworks': ['react', 'angular', 'vue', 'component', 'state', 'props', 'hooks', 'redux', 'routing'],
            'Backend': ['node', 'express', 'api', 'rest', 'middleware', 'authentication', 'session', 'cookie'],
        }
    },
    'Digital Electronics': {
        coreKeywords: ['digital electronics', 'digital logic', 'logic design'],
        secondaryKeywords: ['gate', 'boolean', 'flip flop', 'counter', 'register', 'decoder', 'encoder',
            'multiplexer', 'demultiplexer', 'adder', 'subtractor', 'karnaugh', 'k-map',
            'truth table', 'combinational', 'sequential', 'latch', 'sr', 'jk', 'd flip flop',
            'adc', 'dac', 'binary', 'hexadecimal', 'octal', 'number system', 'complement'],
        topicGroups: {
            'Number Systems': ['binary', 'octal', 'hexadecimal', 'bcd', 'complement', 'conversion'],
            'Boolean Algebra': ['boolean', 'de morgan', 'karnaugh map', 'k-map', 'sop', 'pos', 'canonical', 'simplification'],
            'Combinational Circuits': ['adder', 'subtractor', 'multiplexer', 'demultiplexer', 'encoder', 'decoder', 'comparator'],
            'Sequential Circuits': ['flip flop', 'sr', 'jk', 'd flip flop', 't flip flop', 'latch', 'counter', 'register', 'shift register'],
        }
    },
    'Software Engineering': {
        coreKeywords: ['software engineering', 'sdlc', 'software development life cycle'],
        secondaryKeywords: ['agile', 'waterfall', 'spiral', 'prototype', 'requirement', 'testing',
            'unit test', 'integration test', 'system test', 'black box', 'white box',
            'use case', 'uml', 'class diagram', 'sequence diagram', 'design pattern',
            'coupling', 'cohesion', 'module', 'maintenance', 'scrum', 'kanban'],
        topicGroups: {
            'SDLC Models': ['waterfall', 'agile', 'spiral', 'prototype', 'iterative', 'incremental', 'v model', 'rad'],
            'Software Testing': ['testing', 'unit test', 'integration test', 'system test', 'acceptance test', 'black box', 'white box', 'regression'],
            'UML & Design': ['uml', 'use case', 'class diagram', 'sequence diagram', 'activity diagram', 'state diagram', 'design pattern'],
            'Project Management': ['scrum', 'kanban', 'sprint', 'backlog', 'estimation', 'risk management', 'configuration management'],
        }
    },
    'Computer Architecture': {
        coreKeywords: ['computer architecture', 'computer organization', 'coa'],
        secondaryKeywords: ['cpu', 'alu', 'register', 'bus', 'cache', 'pipeline', 'risc', 'cisc',
            'instruction set', 'addressing mode', 'microprocessor', 'interrupt',
            'memory hierarchy', 'dma', 'io', 'fetch', 'decode', 'execute'],
        topicGroups: {
            'CPU Design': ['alu', 'control unit', 'register', 'instruction cycle', 'fetch', 'decode', 'execute', 'pipeline', 'hazard'],
            'Memory': ['cache', 'main memory', 'virtual memory', 'memory hierarchy', 'sram', 'dram', 'rom', 'associative mapping'],
            'Instruction Set': ['risc', 'cisc', 'addressing mode', 'instruction format', 'opcode', 'operand'],
            'I/O Organization': ['interrupt', 'dma', 'io mapped', 'memory mapped', 'polling', 'handshaking'],
        }
    },
    'Discrete Mathematics': {
        coreKeywords: ['discrete mathematics', 'discrete math'],
        secondaryKeywords: ['set', 'relation', 'function', 'graph theory', 'logic', 'proposition',
            'predicate', 'proof', 'induction', 'combinatorics', 'recurrence', 'lattice',
            'group', 'ring', 'field', 'boolean algebra', 'counting', 'pigeonhole',
            'euler', 'hamilton', 'planar', 'chromatic', 'tree', 'isomorphism'],
        topicGroups: {
            'Mathematical Logic': ['proposition', 'predicate', 'quantifier', 'truth table', 'tautology', 'contradiction', 'inference'],
            'Set Theory': ['set', 'subset', 'union', 'intersection', 'complement', 'power set', 'cartesian product'],
            'Relations & Functions': ['relation', 'equivalence', 'partial order', 'function', 'injection', 'surjection', 'bijection'],
            'Graph Theory': ['graph', 'euler', 'hamilton', 'planar', 'chromatic', 'tree', 'spanning tree', 'isomorphism', 'degree'],
            'Combinatorics': ['permutation', 'combination', 'pigeonhole', 'inclusion exclusion', 'generating function', 'recurrence relation'],
        }
    },
    'English / Communication': {
        coreKeywords: ['english', 'communication skill', 'technical writing'],
        secondaryKeywords: ['grammar', 'tense', 'vocabulary', 'comprehension', 'essay', 'letter',
            'report writing', 'presentation', 'speaking', 'listening', 'reading',
            'active voice', 'passive voice', 'punctuation', 'sentence', 'paragraph'],
        topicGroups: {
            'Grammar': ['tense', 'voice', 'narration', 'article', 'preposition', 'conjunction', 'clause', 'sentence correction'],
            'Writing': ['essay', 'letter', 'report', 'email', 'memo', 'paragraph writing', 'precis'],
            'Comprehension': ['reading comprehension', 'passage', 'inference', 'vocabulary', 'synonym', 'antonym'],
        }
    },
    'Economics': {
        coreKeywords: ['economics', 'microeconomics', 'macroeconomics'],
        secondaryKeywords: ['demand', 'supply', 'market', 'equilibrium', 'gdp', 'inflation',
            'fiscal', 'monetary', 'trade', 'elasticity', 'cost', 'revenue',
            'profit', 'monopoly', 'oligopoly', 'competition'],
        topicGroups: {
            'Microeconomics': ['demand', 'supply', 'elasticity', 'consumer behavior', 'production function', 'cost', 'revenue', 'profit maximization'],
            'Macroeconomics': ['gdp', 'inflation', 'unemployment', 'fiscal policy', 'monetary policy', 'aggregate demand', 'aggregate supply'],
            'Market Structures': ['perfect competition', 'monopoly', 'oligopoly', 'monopolistic competition'],
        }
    },
};

// ── Question Pattern Detection ──
// Patterns that indicate questions in exam papers
const QUESTION_INDICATORS = [
    /(?:^|\n)\s*(?:q\.?\s*\d+|question\s*\d+|q\s*no\s*\.?\s*\d+)/i,
    /(?:^|\n)\s*\d+\s*[\.\)]\s*(?:what|how|why|explain|describe|define|discuss|compare|derive|prove|state|list|write|draw|solve|calculate|find|determine|evaluate|illustrate|differentiate|distinguish|elaborate|analyze|design|implement)/i,
    /(?:explain|define|discuss|describe|what is|what are|how does|derive|prove|state and prove|write short note|compare and contrast|differentiate between|distinguish between|give example|write algorithm|draw diagram)/i,
    /(?:^|\n)\s*(?:[a-e][\.\)]|[ivxl]+[\.\)]|\([a-e]\))\s+/i,
    /\b(?:marks?|mark)\s*[:=]?\s*\d+/i,
    /\b\d+\s*marks?\b/i,
    /\bor\b.*\b(?:explain|define|discuss|describe|write|derive|prove|solve)/i,
];

// ── Unit/Module Detection ──
const UNIT_PATTERNS = [
    /(?:unit|module|chapter|section)\s*[-:]?\s*(\d+|[ivxl]+)/i,
    /(?:unit|module|chapter|section)\s*[-:]?\s*(\d+|[ivxl]+)\s*[-:]?\s*(.+)/i,
];

/**
 * Analyze extracted text content from academic documents
 * @param {Object} extractedTexts - { syllabus: { text, pageCount, ... }, pyqs: { text, ... }, ... }
 * @param {Object} uploadedFiles - Original file objects for file name analysis
 * @returns {Object} Complete analysis results
 */
export function analyzeDocumentContent(extractedTexts, uploadedFiles) {
    // Combine all text for full analysis
    const allText = Object.values(extractedTexts)
        .map(e => (e.text || '').toLowerCase())
        .join(' \n ');
    
    const allFileNames = Object.values(uploadedFiles)
        .filter(Boolean)
        .map(f => f.name.toLowerCase());
    
    const combinedText = allText + ' ' + allFileNames.join(' ');

    // 1. Detect subjects from actual content
    const subjectScores = detectSubjects(combinedText);
    const detectedSubjects = subjectScores
        .filter(s => s.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(s => s.name);

    // 2. Extract topics found in content
    const detectedTopics = extractTopics(combinedText, detectedSubjects);

    // 3. Extract questions from PYQ/model paper text
    const extractedQuestions = extractQuestions(extractedTexts);

    // 4. Extract units/modules from syllabus text
    const extractedUnits = extractUnits(extractedTexts);

    // 5. Generate important question predictions based on frequency analysis
    const importantQuestions = generateImportantQuestions(combinedText, detectedSubjects, extractedQuestions, detectedTopics);

    // 6. Generate study timetable based on actual subjects and difficulty
    const studyTimetable = generateStudyTimetable(detectedSubjects, detectedTopics);

    // 7. Generate curated resources for detected subjects
    const bestResources = generateResources(detectedSubjects);

    // 8. Stats
    const totalUploads = Object.values(uploadedFiles).filter(Boolean).length;
    const totalPages = Object.values(extractedTexts).reduce((sum, e) => sum + (e.pageCount || 0), 0);
    const totalWords = allText.split(/\s+/).filter(w => w.length > 1).length;
    const uploadTypes = [];
    if (uploadedFiles.syllabus) uploadTypes.push('Syllabus');
    if (uploadedFiles.timetable) uploadTypes.push('Timetable');
    if (uploadedFiles.modelPapers) uploadTypes.push('Model Papers');
    if (uploadedFiles.pyqs) uploadTypes.push('PYQs');

    return {
        detectedSubjects,
        detectedTopics,
        extractedQuestions,
        extractedUnits,
        importantQuestions,
        studyTimetable,
        bestResources: bestResources.slice(0, 8),
        totalUploads,
        totalPages,
        totalWords,
        uploadTypes,
        hasPYQs: !!uploadedFiles.pyqs,
        hasModelPapers: !!uploadedFiles.modelPapers,
        hasSyllabus: !!uploadedFiles.syllabus,
        subjectScores,
    };
}

/**
 * Detect subjects from text content using keyword scoring
 */
function detectSubjects(text) {
    const results = [];

    for (const [subjectName, config] of Object.entries(SUBJECT_DATABASE)) {
        let score = 0;
        const matchedKeywords = [];

        // Core keywords have higher weight
        for (const kw of config.coreKeywords) {
            const count = countOccurrences(text, kw);
            if (count > 0) {
                score += count * 10;
                matchedKeywords.push(kw);
            }
        }

        // Secondary keywords have lower weight
        for (const kw of config.secondaryKeywords) {
            const count = countOccurrences(text, kw);
            if (count > 0) {
                score += count * 2;
                matchedKeywords.push(kw);
            }
        }

        // Bonus for having matches from multiple keyword categories
        const uniqueMatches = new Set(matchedKeywords);
        if (uniqueMatches.size >= 5) score *= 1.5;
        if (uniqueMatches.size >= 10) score *= 1.3;

        results.push({
            name: subjectName,
            score: Math.round(score),
            matchedKeywords: [...uniqueMatches].slice(0, 10),
            confidence: score > 50 ? 'High' : score > 20 ? 'Medium' : score > 0 ? 'Low' : 'None'
        });
    }

    return results;
}

/**
 * Extract specific topics found in the text for each subject
 */
function extractTopics(text, detectedSubjects) {
    const topics = {};

    for (const subjectName of detectedSubjects) {
        const config = SUBJECT_DATABASE[subjectName];
        if (!config || !config.topicGroups) continue;

        topics[subjectName] = [];
        for (const [topicName, keywords] of Object.entries(config.topicGroups)) {
            let topicScore = 0;
            const matched = [];

            for (const kw of keywords) {
                const count = countOccurrences(text, kw);
                if (count > 0) {
                    topicScore += count;
                    matched.push(kw);
                }
            }

            if (topicScore > 0) {
                topics[subjectName].push({
                    name: topicName,
                    score: topicScore,
                    matchedTerms: matched,
                    frequency: topicScore > 10 ? 'Very High' : topicScore > 5 ? 'High' : 'Medium'
                });
            }
        }

        // Sort by score
        topics[subjectName].sort((a, b) => b.score - a.score);
    }

    return topics;
}

/**
 * Extract actual questions from PYQ and model paper text
 */
function extractQuestions(extractedTexts) {
    const questions = [];
    const questionTexts = [];
    
    // Collect text from PYQs and model papers
    if (extractedTexts.pyqs?.text) questionTexts.push({ source: 'PYQ', text: extractedTexts.pyqs.text });
    if (extractedTexts.modelPapers?.text) questionTexts.push({ source: 'Model Paper', text: extractedTexts.modelPapers.text });
    // Also check syllabus for sample questions
    if (extractedTexts.syllabus?.text) questionTexts.push({ source: 'Syllabus', text: extractedTexts.syllabus.text });

    for (const { source, text } of questionTexts) {
        const lines = text.split(/\n/);

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line || line.length < 15) continue;

            // Check if line looks like a question
            const isQuestion =
                /^\s*(?:q\.?\s*\d+|question\s*\d+|\d+\s*[\.\)])\s*/i.test(line) ||
                /(?:explain|define|discuss|describe|what\s+(?:is|are)|how\s+(?:does|do|is|are|can)|derive|prove|state\s+and\s+prove|distinguish|differentiate|compare|write\s+(?:short\s+)?note|solve|calculate|find|determine|illustrate|list|enumerate)/i.test(line);

            if (isQuestion && line.length > 20) {
                // Clean up the question text
                let qText = line
                    .replace(/^\s*(?:q\.?\s*\d+|question\s*\d+|\d+)\s*[\.\)]\s*/i, '')
                    .replace(/^\s*[\(\[]\s*[a-e]\s*[\)\]]\s*/i, '')
                    .trim();

                // detect marks
                const marksMatch = qText.match(/(\d+)\s*marks?/i);
                const marks = marksMatch ? parseInt(marksMatch[1]) : null;

                if (qText.length > 15 && qText.length < 500) {
                    // Capitalize first letter
                    qText = qText.charAt(0).toUpperCase() + qText.slice(1);
                    
                    questions.push({
                        text: qText,
                        source,
                        marks,
                        lineNumber: i + 1,
                    });
                }
            }
        }
    }

    // Deduplicate similar questions
    const uniqueQuestions = [];
    const seen = new Set();
    for (const q of questions) {
        const normalized = q.text.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 50);
        if (!seen.has(normalized)) {
            seen.add(normalized);
            uniqueQuestions.push(q);
        }
    }

    return uniqueQuestions.slice(0, 30);
}

/**
 * Extract units/modules from syllabus text
 */
function extractUnits(extractedTexts) {
    if (!extractedTexts.syllabus?.text) return [];

    const text = extractedTexts.syllabus.text;
    const lines = text.split(/\n/);
    const units = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        const match = line.match(/(?:unit|module|chapter|section)\s*[-:.]?\s*(\d+|[ivxlIVXL]+)\s*[-:.]?\s*(.*)/i);
        if (match) {
            const unitNum = match[1];
            let title = match[2]?.trim();
            // If title is empty, try the next line
            if (!title && i + 1 < lines.length) {
                title = lines[i + 1].trim();
            }
            if (title) {
                units.push({
                    number: unitNum,
                    title: title.substring(0, 100),
                    lineNumber: i + 1,
                });
            }
        }
    }

    return units;
}

/**
 * Generate important/high-probability questions based on analysis
 */
function generateImportantQuestions(text, detectedSubjects, extractedQuestions, detectedTopics) {
    const importantQuestions = [];

    // First, include actual extracted questions (they are the real deal)
    if (extractedQuestions.length > 0) {
        for (const q of extractedQuestions.slice(0, 15)) {
            importantQuestions.push({
                text: q.text,
                source: q.source,
                marks: q.marks,
                type: 'extracted',
            });
        }
    }

    // Then, generate predicted questions from high-frequency topics
    for (const subject of detectedSubjects.slice(0, 5)) {
        const topics = detectedTopics[subject];
        if (!topics) continue;

        for (const topic of topics.slice(0, 3)) {
            // Generate contextual questions based on topic keywords found
            const topicQuestion = generateTopicQuestion(subject, topic);
            if (topicQuestion) {
                importantQuestions.push({
                    text: topicQuestion,
                    source: 'AI Prediction',
                    marks: null,
                    type: 'predicted',
                    topic: topic.name,
                    subject,
                    frequency: topic.frequency,
                });
            }
        }
    }

    return importantQuestions.slice(0, 20);
}

/**
 * Generate a question for a specific topic based on its matched terms
 */
function generateTopicQuestion(subject, topic) {
    const templates = [
        `Explain the concept of ${topic.name} in ${subject} with examples.`,
        `Discuss the key aspects of ${topic.name} as studied in ${subject}.`,
        `Describe ${topic.name} and its significance in ${subject}.`,
        `Compare and contrast different approaches within ${topic.name}.`,
        `Write a detailed note on ${topic.name} with relevant diagrams where applicable.`,
    ];

    // Pick a template based on the topic's matched terms count
    const index = topic.matchedTerms.length % templates.length;
    return templates[index];
}

/**
 * Generate study timetable based on detected subjects and their difficulty scores
 */
function generateStudyTimetable(detectedSubjects, detectedTopics) {
    if (detectedSubjects.length === 0) return [];

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const timetable = [];

    for (let i = 0; i < 7; i++) {
        const day = daysOfWeek[i];

        if (i === 6) {
            // Sunday is revision day
            timetable.push({
                day,
                focus: `Revision: ${detectedSubjects.slice(0, Math.min(3, detectedSubjects.length)).join(', ')}`,
                hours: '4 hours',
                priority: 'Revision',
                topics: 'Revise weak areas, practice problems, self-test',
            });
            continue;
        }

        // Distribute subjects across weekdays
        const subjectIndex = i % detectedSubjects.length;
        const subject = detectedSubjects[subjectIndex];
        const topics = detectedTopics[subject];

        // Determine priority based on topic count (more topics = higher priority)
        const topicCount = topics?.length || 0;
        let priority, hours;
        if (topicCount >= 5) {
            priority = 'Critical';
            hours = '5 hours';
        } else if (topicCount >= 3) {
            priority = 'High';
            hours = '4 hours';
        } else {
            priority = 'Medium';
            hours = '3 hours';
        }

        const topicFocus = topics?.slice(0, 2).map(t => t.name).join(', ') || 'General study';

        timetable.push({
            day,
            focus: subject,
            hours,
            priority,
            topics: topicFocus,
        });
    }

    return timetable;
}

/**
 * Generate curated resources for detected subjects
 */
function generateResources(detectedSubjects) {
    const resourceDB = {
        'Mathematics': [
            { name: 'NPTEL Mathematics Lectures', type: 'Video', link: 'https://nptel.ac.in/courses/111' },
            { name: 'MIT OpenCourseWare - Calculus', type: 'Course', link: 'https://ocw.mit.edu/courses/mathematics/' },
            { name: 'Khan Academy Mathematics', type: 'Course', link: 'https://www.khanacademy.org/math' },
        ],
        'Physics': [
            { name: 'Walter Lewin MIT Physics', type: 'Video', link: 'https://www.youtube.com/playlist?list=PLyQSN7X0ro203puVhQsmCj9qIjq1_3uBM' },
            { name: 'HyperPhysics Reference', type: 'Resource', link: 'http://hyperphysics.phy-astr.gsu.edu/' },
        ],
        'Chemistry': [
            { name: 'NPTEL Chemistry', type: 'Video', link: 'https://nptel.ac.in/courses/104' },
            { name: 'Khan Academy Chemistry', type: 'Course', link: 'https://www.khanacademy.org/science/chemistry' },
        ],
        'Data Structures & Algorithms': [
            { name: 'Abdul Bari - Algorithms', type: 'Video', link: 'https://www.youtube.com/c/AbdulBari' },
            { name: 'GeeksforGeeks DSA', type: 'Practice', link: 'https://www.geeksforgeeks.org/data-structures/' },
            { name: 'VisuAlgo - Algorithm Visualization', type: 'Resource', link: 'https://visualgo.net/' },
        ],
        'Programming': [
            { name: 'FreeCodeCamp Tutorials', type: 'Video', link: 'https://www.freecodecamp.org/' },
            { name: 'LeetCode Practice', type: 'Practice', link: 'https://leetcode.com/' },
        ],
        'Database Systems': [
            { name: 'Stanford DB Course', type: 'Course', link: 'https://www.edx.org/course/databases' },
            { name: 'W3Schools SQL Tutorial', type: 'Resource', link: 'https://www.w3schools.com/sql/' },
        ],
        'Computer Networks': [
            { name: 'Computer Networking - Kurose', type: 'Book', link: 'https://gaia.cs.umass.edu/kurose_ross/' },
            { name: 'Cisco Networking Academy', type: 'Course', link: 'https://www.netacad.com/' },
        ],
        'Operating Systems': [
            { name: 'Neso Academy - OS', type: 'Video', link: 'https://www.youtube.com/c/nesoacademy' },
            { name: 'OSTEP Free Textbook', type: 'Book', link: 'https://pages.cs.wisc.edu/~remzi/OSTEP/' },
        ],
        'Machine Learning': [
            { name: 'Andrew Ng - ML Course', type: 'Course', link: 'https://www.coursera.org/learn/machine-learning' },
            { name: 'Kaggle Learn', type: 'Practice', link: 'https://www.kaggle.com/learn' },
        ],
        'Web Development': [
            { name: 'The Odin Project', type: 'Course', link: 'https://www.theodinproject.com/' },
            { name: 'MDN Web Docs', type: 'Resource', link: 'https://developer.mozilla.org/' },
        ],
        'Digital Electronics': [
            { name: 'Neso Academy - Digital Electronics', type: 'Video', link: 'https://www.youtube.com/c/nesoacademy' },
            { name: 'All About Circuits', type: 'Resource', link: 'https://www.allaboutcircuits.com/' },
        ],
        'Software Engineering': [
            { name: 'NPTEL Software Engineering', type: 'Video', link: 'https://nptel.ac.in/courses/106' },
            { name: 'GeeksforGeeks SE', type: 'Resource', link: 'https://www.geeksforgeeks.org/software-engineering/' },
        ],
        'Computer Architecture': [
            { name: 'Neso Academy - COA', type: 'Video', link: 'https://www.youtube.com/c/nesoacademy' },
            { name: 'GeeksforGeeks COA', type: 'Resource', link: 'https://www.geeksforgeeks.org/computer-organization-and-architecture-tutorials/' },
        ],
        'Discrete Mathematics': [
            { name: 'TheTrevTutor - Discrete Math', type: 'Video', link: 'https://www.youtube.com/c/TheTrevTutor' },
            { name: 'MIT OCW Discrete Math', type: 'Course', link: 'https://ocw.mit.edu/courses/mathematics/18-062j-mathematics-for-computer-science-fall-2010/' },
        ],
        'English / Communication': [
            { name: 'Grammarly Writing Tips', type: 'Resource', link: 'https://www.grammarly.com/blog/' },
            { name: 'Purdue OWL', type: 'Resource', link: 'https://owl.purdue.edu/' },
        ],
        'Economics': [
            { name: 'Khan Academy Economics', type: 'Course', link: 'https://www.khanacademy.org/economics-finance-domain' },
            { name: 'CORE Economics', type: 'Course', link: 'https://www.core-econ.org/' },
        ],
    };

    const resources = [];
    for (const subject of detectedSubjects) {
        if (resourceDB[subject]) {
            resources.push(...resourceDB[subject]);
        } else {
            resources.push(
                { name: `${subject} - YouTube Lectures`, type: 'Video', link: `https://www.youtube.com/results?search_query=${encodeURIComponent(subject + ' lectures')}` },
                { name: `${subject} - Study Notes`, type: 'Resource', link: `https://www.google.com/search?q=${encodeURIComponent(subject + ' study notes pdf')}` }
            );
        }
    }

    return resources;
}

/**
 * Count occurrences of a keyword in text (word boundary aware)
 */
function countOccurrences(text, keyword) {
    if (!text || !keyword) return 0;
    // Use a simple sliding approach for multi-word keywords
    const kw = keyword.toLowerCase();
    const txt = text.toLowerCase();
    let count = 0;
    let pos = 0;
    while ((pos = txt.indexOf(kw, pos)) !== -1) {
        count++;
        pos += kw.length;
    }
    return count;
}
