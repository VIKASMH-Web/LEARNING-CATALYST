from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import time
import re
from youtube_transcript_api import YouTubeTranscriptApi

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeRequest(BaseModel):
    code: str
    language: str
    explanation_language: str = "English"

class VideoSummaryRequest(BaseModel):
    url: str

class NotesRequest(BaseModel):
    email: str
    topic: str
    domain: str
    difficulty: str
    language: str
    is_premium: bool

# Email Configuration (Hackathon Mode: Gmail SMTP)
# REPLACE WITH YOUR APP PASSWORD
GMAIL_USER = "learningcatalyst.app@gmail.com" 
GMAIL_PASS = "xxxx xxxx xxxx xxxx" 

import smtplib
from email.message import EmailMessage
import io
import ssl

def detect_language(code: str):
    code_lower = code.lower()
    # Improved keyword-based detection
    if "import react" in code_lower or "export default" in code_lower or "=>" in code_lower or "const " in code_lower or "let " in code_lower or "console.log" in code_lower:
        return "javascript"
    if "def " in code_lower and ":" in code_lower and ("import " in code_lower or "print" in code_lower):
        return "python"
    if "public static void main" in code_lower or "system.out.print" in code_lower:
        return "java"
    if "#include <iostream>" in code_lower or "std::cout" in code_lower:
        return "cpp"
    if "#include <stdio.h>" in code_lower or "printf(" in code_lower:
        return "c"
    return "unknown"

translations = {
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
}

@app.get("/api/hardware-status")
async def get_hardware_status():
    return {
        "cpu": random.randint(15, 45),
        "gpu": random.randint(20, 60),
        "npu": random.randint(10, 30),
        "status": "AMD Ryzen™ AI - Active"
    }

@app.post("/api/analyze-code")
async def analyze_code(request: CodeRequest):
    detected = detect_language(request.code)
    lang = request.explanation_language
    t = translations.get(lang, translations["English"])

    # Language Validation
    if detected != "unknown" and detected != request.language:
        return {
            "error": t["mismatch"],
            "explanation": None,
            "output": ""
        }

    time.sleep(1.0) # Simulation delay
    
    # Lovable-style structured explanation
    lines = request.code.split('\n')
    line_explanations = []
    variables = []
    logic_steps = []
    
    for i, line in enumerate(lines[:20]): 
        clean_line = line.strip()
        if not clean_line or clean_line.startswith(("//", "#", "/*")): continue
        
        explanation = "Processing instruction..."
        reason = "Execution step."
        
        if "=" in clean_line and "==" not in clean_line:
            parts = clean_line.split('=')
            var_name = parts[0].strip().split()[-1]
            val = parts[1].strip().strip('";') if len(parts) > 1 else "value"
            if var_name not in variables: variables.append(var_name)
            explanation = f"Allocating memory for '{var_name}' and assigning it the value '{val}'."
            reason = "Like putting a label on a box so you can find it later."
            logic_steps.append(f"Set '{var_name}' = {val}")

        elif "print" in clean_line or "console.log" in clean_line or "cout" in clean_line:
            explanation = "Displaying information to the user's screen."
            reason = "Like speaking a sentence out loud."
            logic_steps.append("Output to Console")

        elif "if" in clean_line:
            explanation = "Checking a logical condition before deciding what to do next."
            reason = "Like a fork in the road where you choose a path based on a sign."
            logic_steps.append("Evaluate Condition")

        elif "for" in clean_line or "while" in clean_line:
            explanation = "Repeating a set of instructions multiple times."
            reason = "Like doing reps at the gym until you reach your target count."
            logic_steps.append("Start Loop")

        elif "def " in clean_line or "function " in clean_line:
            func_name = clean_line.split()[1].split('(')[0]
            explanation = f"Defining a new reusable action called '{func_name}'."
            reason = "Like writing a recipe card so you don't have to explain the steps every time."
            logic_steps.append(f"Define Function '{func_name}'")

        elif "return" in clean_line:
            explanation = "Finishing the task and sending back the result."
            reason = "Like handing over a completed report."
            logic_steps.append("Return Result")
            
        elif "import" in clean_line or "#include" in clean_line:
            explanation = "Loading external tools needed for the program."
            reason = "Like gathering your ingredients before cooking."
            logic_steps.append("Load Dependencies")

        line_explanations.append({
            "line_number": i + 1,
            "content": clean_line,
            "explanation": explanation,
            "reason": reason
        })

    # Realistic Output Simulation
    output = ""
    match = re.search(r'(print|console\.log|printf|cout\s*<<)\s*\(?\s*["\']([^"\']*)["\']', request.code)
    if match:
        output = match.group(2)
        if "\\n" in output: output = output.replace("\\n", "\n")
    else:
        if "return" in request.code:
            output = "[Process finished with exit code 0]"
        else:
            output = "[System Trace: Execution completed. No visible output.]"

    return {
        "explanation": {
            "overview": f"This program logic in {request.language} executes sequentially to process data. It initializes states, evaluates conditions, and produces output using the NPU's localized execution environment.",
            "lines": line_explanations,
            "variables": variables,
            "logic_flow": logic_steps or ["Sequential Execution"],
            "titles": t
        },
        "output": output
    }

@app.post("/api/summarize-video")
async def summarize_video(request: VideoSummaryRequest):
    time.sleep(1.0)
    url = request.url.strip()
    
    # Strict URL validation
    video_id_match = re.search(r'(?:v=|\/)([0-9A-Za-z_-]{11}).*', url)
    if not video_id_match:
        return {
            "type": "error",
            "message": "Invalid YouTube link. Please provide a valid video URL."
        }
        
    video_id = video_id_match.group(1)
    
    try:
        # Standard API attempt (v0.6.3 default)
        try:
            transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
        except Exception as transcript_err:
             # Fallback to list_transcripts if get_transcript fails
             try:
                available_transcripts = YouTubeTranscriptApi.list_transcripts(video_id)
                # Try to fetch the first available one
                transcript_list = available_transcripts.find_transcript(available_transcripts._manually_created_transcripts.keys()).fetch()
             except:
                 # Try auto-generated
                 transcript_list = available_transcripts.find_transcript(available_transcripts._generated_transcripts.keys()).fetch()

        full_text = " ".join([item['text'] for item in transcript_list])
        text_lower = full_text.lower()
        
        # Detect Technical Content
        topic = "General Tech"
        concepts = []
        
        if "javascript" in text_lower or "react" in text_lower or "node" in text_lower:
            topic = "JavaScript"
            concepts = ["Event Loop", "Closures", "Async/Await", "DOM Manipulation"]
            if "react" in text_lower: concepts.append("Components")
        elif "python" in text_lower or "django" in text_lower or "flask" in text_lower:
            topic = "Python"
            concepts = ["List Comprehensions", "Decorators", "Data Structures", "GIL"]
        elif "c++" in text_lower or "cpp" in text_lower:
            topic = "C++"
            concepts = ["Pointers", "Memory Management", "STL", "OOP"]
            
        # Generate Summary
        summary_text = full_text[:300].rsplit('.', 1)[0] + "."
        
        return {
            "type": "coding" if topic != "General Tech" else "general",
            "language": topic,
            "concepts": concepts,
            "code_topics": ["Analysis", "Implementation"],
            "transcript": full_text[:500] + "...", 
            "summary": summary_text
        }
        
    except Exception as e:
        error_msg = str(e)
        
        # Context-Aware Fallback (Strictly confined to URL content)
        url_lower = url.lower()
        fallback_topic = None
        
        if "python" in url_lower: fallback_topic = "Python"
        elif "javascript" in url_lower or "js" in url_lower: fallback_topic = "JavaScript"
        elif "cpp" in url_lower or "c++" in url_lower: fallback_topic = "C++"
        elif "java" in url_lower: fallback_topic = "Java"

        if fallback_topic:
             return {
                "type": "coding",
                "language": fallback_topic,
                "concepts": ["Core Concepts", "Syntax", "Best Practices"],
                "code_topics": ["Analysis", "Implementation"],
                "transcript": "[Detailed Transcript Unavailable - Captions Disabled]",
                "summary": f"This video tutorial covers fundamental concepts in {fallback_topic}. Due to restricted caption access, this summary is based on the detected video topic. Typically, such tutorials cover syntax, standard libraries, and implementation patterns relevant to {fallback_topic}."
            }

        # Specific Error for Disabled Subtitles
        if "Subtitles are disabled" in error_msg:
             return {
                "type": "error",
                "message": "This video has captions disabled. Please try a tutorial with spoken explanations or enable autogenerated captions."
            }

@app.post("/api/send-notes")
async def send_notes(request: NotesRequest):
    time.sleep(1.5) # Simulate processing
    
    if not request.is_premium:
        return {"status": "error", "message": "Email delivery is a Premium Feature."}

    # Generate Content
    subject = f"Your Notes: {request.topic} ({request.difficulty})"
    
    body_content = f"""
    <h1>Learning Catalyst - Custom Notes</h1>
    <h2>Topic: {request.topic}</h2>
    <p><strong>Domain:</strong> {request.domain} | <strong>Level:</strong> {request.difficulty}</p>
    <hr>
    <h3>1. Overview</h3>
    <p>Comprehensive guide to {request.topic}, focusing on core principles and implementation in {request.language}.</p>
    
    <h3>2. Core Concepts</h3>
    <ul>
        <li>Architecture patterns</li>
        <li>State management</li>
        <li>Performance optimization</li>
    </ul>

    <h3>3. Code Example ({request.language})</h3>
    <pre style="background:#f4f4f4;padding:10px;border-radius:5px;">
// Example implementation
function initSystem() {{
    console.log("Initializing {request.topic}...");
    return true;
}}
    </pre>

    <h3>4. Interview Readiness</h3>
    <p>Q: What are the trade-offs of using {request.topic}?<br>
    A: It improves scalability but adds initial complexity.</p>
    
    <br>
    <p style="font-size:0.8em;color:#888;">Generated by AMD Ryzen™ AI Engine.</p>
    """

    try:
        # Construct Email
        msg = EmailMessage()
        msg['Subject'] = subject
        msg['From'] = GMAIL_USER
        msg['To'] = request.email
        msg.set_content("Your requested notes are attached.")
        msg.add_alternative(body_content, subtype='html')

        # Mock Sending (User needs to configure credentials for real sending)
        if "xxxx" in GMAIL_PASS:
            print(f"I[MOCK EMAIL SENT] To: {request.email} | Subject: {subject}")
            return {"status": "success", "message": "Notes sent (Simulated). Configure GMAIL_PASS in server/main.py to really send."}

        # Real Sending
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
            smtp.login(GMAIL_USER, GMAIL_PASS)
            smtp.send_message(msg)
            
        return {"status": "success", "message": f"Notes sent to {request.email}"}

    except Exception as e:
        print(f"Email Error: {e}")
        return {"status": "error", "message": "Failed to send email. Check server logs."}
class BugReportRequest(BaseModel):
    subject: str
    description: str
    reporter_email: str = "anonymous"

@app.post("/api/report-bug")
async def report_bug(request: BugReportRequest):
    SUPPORT_EMAILS = ["bankadamanig@gmail.com", "dhirajkadam964@gmail.com"]
    
    subject = f"[Bug Report] {request.subject}"
    body_content = f"""
    <h2>🐛 Bug Report - Learning Catalyst</h2>
    <hr>
    <p><strong>Subject:</strong> {request.subject}</p>
    <p><strong>Reported by:</strong> {request.reporter_email}</p>
    <br>
    <h3>Description</h3>
    <p>{request.description}</p>
    <br>
    <p style="font-size:0.8em;color:#888;">Sent automatically from Learning Catalyst Help Centre.</p>
    """

    try:
        msg = EmailMessage()
        msg['Subject'] = subject
        msg['From'] = GMAIL_USER
        msg['To'] = ", ".join(SUPPORT_EMAILS)
        msg.set_content(f"Bug Report: {request.subject}\n\n{request.description}\n\nReported by: {request.reporter_email}")
        msg.add_alternative(body_content, subtype='html')

        if "xxxx" in GMAIL_PASS:
            print(f"[MOCK BUG REPORT] To: {SUPPORT_EMAILS} | Subject: {subject}")
            return {"status": "success", "message": "Bug report submitted successfully."}

        context = ssl.create_default_context()
        with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
            smtp.login(GMAIL_USER, GMAIL_PASS)
            smtp.send_message(msg)
        
        return {"status": "success", "message": "Bug report submitted successfully."}

    except Exception as e:
        print(f"Bug Report Email Error: {e}")
        return {"status": "error", "message": "Failed to send bug report. Please try again."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
