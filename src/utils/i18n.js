import { useState, useEffect } from 'react';

const translations = {
    en: {
        dashboard: "Dashboard",
        learning_hub: "Learning Hub",
        academic_planner: "Academic Planner",
        presentation_booster: "Presentation Booster",
        mock_interview: "Mock Interview",
        code_engine: "Code Engine",
        profile: "Profile",
        help_centre: "Help Centre",
        navigation: "Navigation",
        voice_mode: "Voice Mode",
        listening: "Listening...",
        command_not_recognized: "Command not recognized",
        navigating_to: "Navigating to",
        search_placeholder: "What do you want to learn?",
        results_for: "Results for",
    },
    kn: { // Kannada
        dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
        learning_hub: "ಕಲಿಕಾ ಹಬ್",
        academic_planner: "ಶೈಕ್ಷಣಿಕ ಯೋಜಕ",
        presentation_booster: "ಪ್ರಸೆಂಟೇಶನ್ ಬೂಸ್ಟರ್",
        mock_interview: "ಮಾಕ್ ಸಂದರ್ಶನ",
        code_engine: "ಕೋಡ್ ಎಂಜಿನ್",
        profile: "ಪ್ರೊಫೈಲ್",
        help_centre: "ಸಹಾಯ ಕೇಂದ್ರ",
        navigation: "ನ್ಯಾವಿಗೇಶನ್",
        voice_mode: "ಧ್ವನಿ ಮೋಡ್",
        listening: "ಕೇಳಿಸಿಕೊಳ್ಳಲಾಗುತ್ತಿದೆ...",
        command_not_recognized: "ಆಜ್ಞೆ ಗುರುತಿಸಲಾಗಿಲ್ಲ",
        navigating_to: "ಗೆ ಹೋಗಲಾಗುತ್ತಿದೆ",
        search_placeholder: "ನೀವು ಏನನ್ನು ಕಲಿಯಲು ಬಯಸುತ್ತೀರಿ?",
        results_for: "ಗಾಗಿ ಫಲಿತಾಂಶಗಳು",
    },
    hi: { // Hindi
        dashboard: "डैशबोर्ड",
        learning_hub: "लर्निंग हब",
        academic_planner: "शैक्षणिक योजनाकार",
        presentation_booster: "प्रस्तुति बूस्टर",
        mock_interview: "मॉक इंटरव्यू",
        code_engine: "कोड इंजन",
        profile: "प्रोफ़ाइल",
        help_centre: "सहायता केंद्र",
        navigation: "नेविगेशन",
        voice_mode: "वॉइस मोड",
        listening: "सुन रहे हैं...",
        command_not_recognized: "आदेश पहचाना नहीं गया",
        navigating_to: "पर जा रहे हैं",
        search_placeholder: "आप क्या सीखना चाहते हैं?",
        results_for: "के लिए परिणाम",
    },
    ta: { // Tamil
        dashboard: "டாஷ்போர்டு",
        learning_hub: "கற்றல் மையம்",
        academic_planner: "கல்வித் திட்டமிடுபவர்",
        presentation_booster: "விளக்கக்காட்சி ஊக்கி",
        mock_interview: "மாதிரி நேர்காணல்",
        code_engine: "குறியீடு இயந்திரம்",
        profile: "சுயவிவரம்",
        help_centre: "உதவி மையம்",
        navigation: "வழிசெலுத்தல்",
        voice_mode: "குரல் பயன்முறை",
        listening: "கேட்கிறது...",
        command_not_recognized: "கட்டளை அங்கீகரிக்கப்படவில்லை",
        navigating_to: "செல்கிறது",
        search_placeholder: "நீங்கள் என்ன கற்க விரும்புகிறீர்கள்?",
        results_for: "முடிவுகள்",
    },
    te: { // Telugu
        dashboard: "డ్యాష్‌బోర్డ్",
        learning_hub: "లెర్నింగ్ హబ్",
        academic_planner: "అకడమిక్ ప్లానర్",
        presentation_booster: "ప్రెజెంటేషన్ బూస్టర్",
        mock_interview: "మాక్ ఇంటర్వ్యూ",
        code_engine: "కోడ్ ఇంజిన్",
        profile: "ప్రొఫైల్",
        help_centre: "సహాయ కేంద్రం",
        navigation: "నావిగేషన్",
        voice_mode: "వాయిస్ మోడ్",
        listening: "వింటున్నాము...",
        command_not_recognized: "ఆజ్ఞ గుర్తించబడలేదు",
        navigating_to: "కు వెళ్తున్నాము",
        search_placeholder: "మీరు ఏమి నేర్చుకోవాలనుకుంటున్నారు?",
        results_for: "కోసం ఫలితాలు",
    },
    mr: { // Marathi
        dashboard: "डॅशबोर्ड",
        learning_hub: "लर्निंग हब",
        academic_planner: "शैक्षणिक नियोजक",
        presentation_booster: "प्रेझेंटेशन बूस्टर",
        mock_interview: "मॉक इंटरव्यू",
        code_engine: "कोड इंजिन",
        profile: "प्रोफाइल",
        help_centre: "मदत केंद्र",
        navigation: "नेव्हिगेशन",
        voice_mode: "व्हॉइस मोड",
        listening: "ऐकत आहे...",
        command_not_recognized: "आज्ञा ओळखली नाही",
        navigating_to: "वर जात आहे",
        search_placeholder: "तुम्हाला काय शिकायचे आहे?",
        results_for: "साठी निकाल",
    },
    ml: { // Malayalam
        dashboard: "ഡാഷ്‌ബോർഡ്",
        learning_hub: "ലേണിംഗ് ഹബ്",
        academic_planner: "അക്കാദമിക് പ്ലാനർ",
        presentation_booster: "പ്രസന്റേഷൻ ബൂസ്റ്റർ",
        mock_interview: "മോക്ക് ഇന്റർവ്യൂ",
        code_engine: "കോഡ് എഞ്ചിൻ",
        profile: "പ്രൊഫൈൽ",
        help_centre: "സഹായ കേന്ദ്രം",
        navigation: "നാവിഗേഷൻ",
        voice_mode: "വോയ്‌സ് മോഡ്",
        listening: "കേൾക്കുന്നു...",
        command_not_recognized: "ആജ്ഞ തിരിച്ചറിഞ്ഞില്ല",
        navigating_to: "ലേക്ക് പോകുന്നു",
        search_placeholder: "നിങ്ങൾ എന്ത് പഠിക്കാൻ ആഗ്രഹിക്കുന്നു?",
        results_for: "ഫലങ്ങൾ",
    }
};

export const useTranslation = () => {
    const [lang, setLang] = useState(localStorage.getItem('lc_lang') || 'en');

    useEffect(() => {
        localStorage.setItem('lc_lang', lang);
        // Trigger global event if needed, but for now state is enough in components that use it
    }, [lang]);

    const t = (key) => {
        return translations[lang]?.[key] || translations['en']?.[key] || key;
    };

    const changeLanguage = (newLang) => {
        if (translations[newLang]) {
            setLang(newLang);
        }
    };

    return { t, lang, changeLanguage, languages: Object.keys(translations) };
};
