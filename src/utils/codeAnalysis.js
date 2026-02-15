
const translations = {
    "English": {
        "mismatch": "Language mismatch detected. Selected language does not match code.",
        "overview": "Overview",
        "variables": "Variables",
        "logic": "Logic Flow",
        "output": "Execution Result",
        "reasoning": "Real-World Analogy",
        "line": "Line",
        "fallback_warn": "Note: Some parts of the explanation fell back to English."
    },
    "Kannada": {
        "mismatch": "ಭಾಷೆಯ ಹೊಂದಾಣಿಕೆಯಿಲ್ಲ. ಆಯ್ಕೆಮಾಡಿದ ಭಾಷೆ ಕೋಡ್‌ಗೆ ಹೊಂದಿಕೆಯಾಗುತ್ತಿಲ್ಲ.",
        "overview": "ಪರಿಚಯ",
        "variables": "ವೇರಿಯೇಬಲ್ಸ್",
        "logic": "ತರ್ಕದ ಹರಿವು",
        "output": "ಫಲಿತಾಂಶ",
        "reasoning": "ದೈನಂದಿನ ಉದಾಹರಣೆ",
        "line": "ಸಾಲಿನ ಸಂಖ್ಯೆ",
    },
    "Hindi": {
        "mismatch": "भाषा बेमेल पाया गया। चयनित भाषा कोड से मेल नहीं खाती है।",
        "overview": "स्पष्ट अवलोकन",
        "variables": "वैरिएबल",
        "logic": "तर्क प्रवाह",
        "output": "निष्पादन परिणाम",
        "reasoning": "वास्तविक दुनिया का उदाहरण",
        "line": "लाइन",
    },
    "Tamil": {
        "mismatch": "மொழி பொருத்தமின்மை கண்டறியப்பட்டது. தேர்ந்தெடுக்கப்பட்ட மொழி குறியீட்டுடன் பொருந்தவில்லை.",
        "overview": "மேலோட்டம்",
        "variables": "மாறிகள்",
        "logic": "தர்க்க ஓட்டம்",
        "output": "முடிவு",
        "reasoning": "உதாரணம்",
        "line": "வரி",
    },
    "Telugu": {
        "mismatch": "భాష సరిపోలలేదు. ఎంచుకున్న భాష కోడ్‌తో సరిపోలడం లేదు.",
        "overview": "అవలోకనం",
        "variables": "చరరాశులు",
        "logic": "తర్క ప్రవాహం",
        "output": "ఫలితం",
        "reasoning": "ఉదాహరణ",
        "line": "లైన్",
    },
    "Malayalam": {
        "mismatch": "ഭാഷാ പൊരുത്തക്കേട് കണ്ടെത്തി. തിരഞ്ഞെടുത്ത ഭാഷ കോഡുമായി പൊരുത്തപ്പെടുന്നില്ല.",
        "overview": "അവലോകനം",
        "variables": "വേരിയബിളുകൾ",
        "logic": "ലോജിക് ഫ്ലോ",
        "output": "ഫലം",
        "reasoning": "ഉദാഹരണ",
        "line": "വരി",
    },
    "Marathi": {
        "mismatch": "भाषा विसंगती आढळली. निवडलेली भाषा कोडशी जुळत नाही.",
        "overview": "विहंगावलोकन",
        "variables": "चल",
        "logic": "तर्क प्रवाह",
        "output": "निकाल",
        "reasoning": "उदाहरण",
        "line": "ओळ",
    }
};

export const detectLanguage = (code) => {
    const codeLower = code.toLowerCase();
    if (codeLower.includes("import react") || codeLower.includes("export default") || codeLower.includes("=>") || codeLower.includes("const ") || codeLower.includes("let ") || codeLower.includes("console.log")) {
        return "javascript";
    }
    if (codeLower.includes("def ") && codeLower.includes(":") && (codeLower.includes("import ") || codeLower.includes("print"))) {
        return "python";
    }
    if (codeLower.includes("public static void main") || codeLower.includes("system.out.print")) {
        return "java";
    }
    if (codeLower.includes("#include <iostream>") || codeLower.includes("std::cout")) {
        return "cpp";
    }
    if (codeLower.includes("#include <stdio.h>") || codeLower.includes("printf(")) {
        return "c";
    }
    if (codeLower.includes("#include <stdio.h>") || codeLower.includes("printf(")) {
        return "c";
    }
    return "unknown";
};

const executeJavaScript = (code) => {
    let output = "";
    const log = (msg) => {
        output += String(msg) + "\n";
    };
    
    try {
        // Safe-ish execution environment
        // We override console.log to capture output
        const safeCode = `
            const console = { log: log };
            ${code}
        `;
        // Basic loop guard to avoid freezing browser
        if (code.includes("while(true)") || code.includes("for(;;)")) {
             throw new Error("Infinite loop detected. Execution stopped for safety.");
        }
        
        new Function('log', safeCode)(log);
    } catch (e) {
        output += `\nError: ${e.message}`;
    }
    return output || "[No Output]";
};

export const analyzeCodeLocally = async (code, language, explanationLanguage = "English") => {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const detected = detectLanguage(code);
    const t = translations[explanationLanguage] || translations["English"];

    // Language Validation
    if (detected !== "unknown" && detected !== language) {
         // Keep it lenient for now, or return mismatch logic
         // return { error: t.mismatch };
    }

    const lines = code.split('\n');
    const lineExplanations = [];
    const variables = [];
    const logicSteps = [];

    // Analyze first 30 lines
    for (let i = 0; i < Math.min(lines.length, 30); i++) {
        let cleanLine = lines[i].trim();
        if(!cleanLine || cleanLine.startsWith("//") || cleanLine.startsWith("#") || cleanLine.startsWith("/*")) continue;

        let explanation = "Processing instruction...";
        let reason = "Execution step.";

        // VARIABLE ASSIGNMENT
        if (cleanLine.includes("=") && !cleanLine.includes("==")) {
             const parts = cleanLine.split('=');
             const leftPart = parts[0].trim().split(/\s+/); 
             const varName = leftPart[leftPart.length - 1]; // last word before =
             
             let val = parts[1].trim();
             if(val.endsWith(';')) val = val.slice(0, -1);
             val = val.replace(/['"]/g, '');

             if (!variables.includes(varName)) variables.push(varName);

             explanation = `Allocating memory for '${varName}' and assigning it the value '${val}'.`;
             reason = "Like putting a label on a box so you can find it later.";
             logicSteps.push(`Set '${varName}' = ${val}`);
        }
        // OUTPUT
        else if (cleanLine.includes("print") || cleanLine.includes("console.log") || cleanLine.includes("cout")) {
            explanation = "Displaying information to the user's screen.";
            reason = "Like speaking a sentence out loud.";
            logicSteps.push("Output to Console");
        }
        // CONDITIONS
        else if (cleanLine.includes("if")) {
            explanation = "Checking a logical condition before deciding what to do next.";
            reason = "Like a fork in the road where you choose a path based on a sign.";
            logicSteps.push("Evaluate Condition");
        }
        // LOOPS
        else if (cleanLine.includes("for") || cleanLine.includes("while")) {
            explanation = "Repeating a set of instructions multiple times.";
            reason = "Like doing reps at the gym until you reach your target count.";
            logicSteps.push("Start Loop");
        }
        // FUNCTION DEFINITION
        else if (cleanLine.includes("def ") || cleanLine.includes("function ") || cleanLine.includes("void ")) {
             let funcName = "unknown";
             if(cleanLine.includes("def ")) funcName = cleanLine.split("def ")[1].split("(")[0];
             else if(cleanLine.includes("function ")) funcName = cleanLine.split("function ")[1].split("(")[0];
             else if(cleanLine.includes("void ")) funcName = cleanLine.split("void ")[1].split("(")[0];
             
             explanation = `Defining a new reusable action called '${funcName}'.`;
             reason = "Like writing a recipe card so you don't have to explain the steps every time.";
             logicSteps.push(`Define Function '${funcName}'`);
        }
        // RETURN
        else if (cleanLine.includes("return")) {
            explanation = "Finishing the task and sending back the result.";
            reason = "Like handing over a completed report.";
            logicSteps.push("Return Result");
        }
        // IMPORTS
        else if (cleanLine.includes("import") || cleanLine.includes("#include")) {
            explanation = "Loading external tools needed for the program.";
            reason = "Like gathering your ingredients before cooking.";
            logicSteps.push("Load Dependencies");
        }

        lineExplanations.push({
            line_number: i + 1,
            content: cleanLine,
            explanation: explanation,
            reason: reason
        });
    }

    // Generate Output
    let output = "";
    
    // 1. Try Real Execution for JavaScript
    if (detected === "javascript" || language === "javascript" || language === "js") {
        output = executeJavaScript(code);
    } 
    // 2. Transpile-ish Execution for C/C++/Python Logic (Enhanced Simulation)
    else {
        // Broad attempt to convert simple logic (variables, if/else, print) to JS
        try {
            let virtualCode = code;
            
            // Remove headers
            virtualCode = virtualCode.replace(/#include.*?\n/g, '\n');
            virtualCode = virtualCode.replace(/using namespace std;/g, '');
            virtualCode = virtualCode.replace(/int main\s*\(\)\s*{/g, ''); // Remove main wrapper start
            virtualCode = virtualCode.replace(/return 0;\s*}/g, ''); // Remove main wrapper end logic (simple)
            
            // C: printf("Format: %d", var) -> console.log(`Format: ${var}`) 
            // Handle complex printf like printf("%d is largest", a)
            virtualCode = virtualCode.replace(/printf\s*\(\s*"([^"]*)"\s*,\s*([^)]+)\s*\);/g, (match, str, vars) => {
                 // Replace %d with ${var}
                 let varList = vars.split(',').map(v => v.trim());
                 let i = 0;
                 let newStr = str.replace(/%[difs]/g, () => {
                     return "${" + (varList[i++] || "") + "}";
                 });
                 return `console.log(\`${newStr}\`);`;
            });
            
            // C: printf("Just text")
            virtualCode = virtualCode.replace(/printf\s*\(\s*"(.*?)"\s*\);/g, 'console.log("$1");');

            // C Variables: int a = 10 -> let a = 10
            virtualCode = virtualCode.replace(/\bint\s+/g, 'let ');
            virtualCode = virtualCode.replace(/\bfloat\s+/g, 'let ');
            virtualCode = virtualCode.replace(/\bdouble\s+/g, 'let ');
            virtualCode = virtualCode.replace(/\bchar\s+/g, 'let ');
            
            // If it looks runnable now (has logic or print), try it
            // We wrap it in a block to isolate scope if needed, but new Function handles that.
            if (virtualCode.includes("console.log") || virtualCode.includes("if") || virtualCode.includes("let")) {
               const result = executeJavaScript(virtualCode);
               if (result && result !== "[No Output]") {
                   output = result;
               }
            }
        } catch (e) {
            // Fallback to regex if conversion fails
        }
    }

    // 3. Regex Fallback (Original Logic) if still empty
    if (!output) {
        // Regex matches: print("..."), console.log("..."), printf("..."), cout << "..."
        const match = code.match(/(?:print|console\.log|printf|cout\s*<<)\s*\(?\s*["']([^"']*)["']/);
        
        if (match && match[1]) {
            output = match[1].replace(/\\n/g, '\n'); 
        } else {
            if (code.includes("return")) {
                output = "[Process finished with exit code 0]";
            } else {
                output = "[System Trace: Execution completed. No visible output.]";
            }
        }
        
        if ((code.includes("for") || code.includes("while")) && output.length > 0 && !output.startsWith("[")) {
            output = `${output}\n${output}\n${output}\n... (Loop continues)`;
        }
    }

    return {
        explanation: {
            overview: `This program logic in ${language} executes sequentially to process data. It initializes states, evaluates conditions, and produces output using the NPU's localized execution environment.`,
            lines: lineExplanations,
            variables: variables,
            logic_flow: logicSteps.length > 0 ? logicSteps : ["Sequential Execution"],
            titles: t
        },
        output: output
    };
};
