export type LanguageCode = "en" | "hi" | "kn" | "bn" | "de" | "ta" | "te";

export type TranslationKeys = {
  home: string;
  form: string;
  about: string;
  admin: string;
  copyright: string;
  privacy: string;
  terms: string;

  microloan: string;
  microloanDesc: string;
  openAccount: string;
  openAccountDesc: string;
  checkEligibility: string;
  checkEligibilityDesc: string;
  trackHealth: string;
  trackHealthDesc: string;
};

export const translations: Record<LanguageCode, TranslationKeys> = {
  en: {
    home: "Home",
    form: "Form",
    about: "About",
    admin: "Admin Login",
    copyright: "All rights reserved.",
    privacy: "Privacy",
    terms: "Terms",

    microloan: "Apply for Microloan",
    microloanDesc: "Kickstart your journey to financial independence.",
    openAccount: "Open Digital Bank Account",
    openAccountDesc: "Secure and easy banking at your fingertips.",
    checkEligibility: "Check Scheme Eligibility",
    checkEligibilityDesc: "Find government schemes that fit your needs.",
    trackHealth: "Track Financial Health",
    trackHealthDesc: "Visualize savings, loans, and credit in one place.",
  },
  hi: {
    home: "होम",
    form: "फॉर्म",
    about: "हमारे बारे में",
    admin: "प्रशासक लॉगिन",
    copyright: "सभी अधिकार सुरक्षित।",
    privacy: "गोपनीयता",
    terms: "नियम और शर्तें",

    microloan: "माइक्रो लोन के लिए आवेदन करें",
    microloanDesc: "वित्तीय स्वतंत्रता की ओर अपना सफर शुरू करें।",
    openAccount: "डिजिटल बैंक खाता खोलें",
    openAccountDesc: "सुरक्षित और आसान बैंकिंग।",
    checkEligibility: "योजना पात्रता जांचें",
    checkEligibilityDesc: "आपके लिए उपयुक्त सरकारी योजनाएं खोजें।",
    trackHealth: "वित्तीय स्थिति ट्रैक करें",
    trackHealthDesc: "बचत, ऋण और क्रेडिट को एक ही स्थान पर देखें।",
  },
  kn: {
    home: "ಮುಖಪುಟ",
    form: "ಫಾರ್ಮ್",
    about: "ನಮ್ಮ ಬಗ್ಗೆ",
    admin: "ನಿರ್ವಾಹಕ ಲಾಗಿನ್",
    copyright: "ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
    privacy: "ಗೌಪ್ಯತೆ",
    terms: "ನಿಯಮಗಳು",

    microloan: "ಮೈಕ್ರೋ ಲೋನ್‌ಗಾಗಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ",
    microloanDesc: "ಆರ್ಥಿಕ ಸ್ವಾತಂತ್ರ್ಯದತ್ತ ನಿಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಿ.",
    openAccount: "ಡಿಜಿಟಲ್ ಬ್ಯಾಂಕ್ ಖಾತೆ ತೆರೆ",
    openAccountDesc: "ನಿಮ್ಮ ಕೈಯಲ್ಲೇ ಸುರಕ್ಷಿತ ಬ್ಯಾಂಕಿಂಗ್.",
    checkEligibility: "ಯೋಜನೆ ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ",
    checkEligibilityDesc: "ನಿಮಗಾಗಿ ಸರಿಯಾದ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ.",
    trackHealth: "ಹಣಕಾಸು ಆರೋಗ್ಯವನ್ನು ಟ್ರಾಕ್ ಮಾಡಿ",
    trackHealthDesc: "ಉಳಿತಾಯ, ಸಾಲ ಮತ್ತು ಕ್ರೆಡಿಟ್ ಅನ್ನು ಒಂದೇ ಕಡೆ ನೋಡಿ.",
  },
  bn: {
    home: "হোম",
    form: "ফর্ম",
    about: "আমাদের সম্পর্কে",
    admin: "অ্যাডমিন লগইন",
    copyright: "সর্বস্বত্ব সংরক্ষিত।",
    privacy: "গোপনীয়তা",
    terms: "শর্তাবলী",

    microloan: "মাইক্রো ঋণের জন্য আবেদন করুন",
    microloanDesc: "আর্থিক স্বাধীনতার যাত্রা শুরু করুন।",
    openAccount: "ডিজিটাল ব্যাংক অ্যাকাউন্ট খুলুন",
    openAccountDesc: "নিরাপদ এবং সহজ ব্যাংকিং।",
    checkEligibility: "স্কিমের যোগ্যতা যাচাই করুন",
    checkEligibilityDesc: "আপনার উপযোগী সরকারি স্কিম খুঁজে নিন।",
    trackHealth: "আর্থিক স্বাস্থ্য ট্র্যাক করুন",
    trackHealthDesc: "এক জায়গায় সঞ্চয়, ঋণ এবং ক্রেডিট দেখুন।",
  },
  de: {
    home: "Startseite",
    form: "Formular",
    about: "Über uns",
    admin: "Admin Login",
    copyright: "Alle Rechte vorbehalten.",
    privacy: "Datenschutz",
    terms: "Bedingungen",

    microloan: "Mikrokredit beantragen",
    microloanDesc: "Starten Sie Ihre Reise zur finanziellen Unabhängigkeit.",
    openAccount: "Digitales Bankkonto eröffnen",
    openAccountDesc: "Sicheres und einfaches Banking.",
    checkEligibility: "Förderfähigkeit prüfen",
    checkEligibilityDesc: "Finden Sie passende staatliche Programme.",
    trackHealth: "Finanzstatus verfolgen",
    trackHealthDesc: "Alle Finanzen an einem Ort im Blick behalten.",
  },
  ta: {
    home: "முகப்பு",
    form: "படிவம்",
    about: "எங்களை பற்றி",
    admin: "நிர்வாக உள்நுழைவு",
    copyright: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    privacy: "தனியுரிமை",
    terms: "விதிமுறைகள்",

    microloan: "மைக்ரோ கடனை விண்ணப்பிக்கவும்",
    microloanDesc: "நிதி சுதந்திரத்திற்கான பயணத்தைத் தொடங்குங்கள்.",
    openAccount: "டிஜிட்டல் வங்கி கணக்கு திறக்கவும்",
    openAccountDesc: "பாதுகாப்பான மற்றும் எளிதான வங்கி சேவை.",
    checkEligibility: "தகுதி நிலையை சரிபார்க்கவும்",
    checkEligibilityDesc: "உங்களுக்கு பொருத்தமான அரசுத் திட்டங்களை கண்டறியவும்.",
    trackHealth: "நிதி நிலையை கண்காணிக்கவும்",
    trackHealthDesc: "சேமிப்பு, கடன், மற்றும் கிரெடிட் அனைத்தையும் ஒரே இடத்தில் பார்வையிடுங்கள்.",
  },
  te: {
    home: "హోమ్",
    form: "ఫారమ్",
    about: "మా గురించి",
    admin: "అడ్మిన్ లాగిన్",
    copyright: "అన్ని హక్కులు కలిగి ఉన్నాయి.",
    privacy: "గోప్యతా విధానం",
    terms: "షరతులు",

    microloan: "మైక్రో లోన్‌కు దరఖాస్తు చేయండి",
    microloanDesc: "ఆర్థిక స్వాతంత్ర్యానికి మీ ప్రయాణం మొదలు పెట్టండి.",
    openAccount: "డిజిటల్ బ్యాంక్ ఖాతా ప్రారంభించండి",
    openAccountDesc: "భద్రతయుతమైన, సులభమైన బ్యాంకింగ్.",
    checkEligibility: "పధకానికి అర్హతను చెక్ చేయండి",
    checkEligibilityDesc: "మీకు సరిపోయే ప్రభుత్వ పథకాలను కనుగొనండి.",
    trackHealth: "ఆర్థిక ఆరోగ్యాన్ని ట్రాక్ చేయండి",
    trackHealthDesc: "మీ సేవింగ్స్, లోన్స్, క్రెడిట్‌ను ఒక్కచోట చూడండి.",
  }
};
