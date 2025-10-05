import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'ta' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation data
const translations = {
  en: {
    common: {
      home: 'Home',
      diagnose: 'Diagnose',
      market: 'Market',
      quality: 'Quality',
      storage: 'Storage',
      remedies: 'Remedies',
      history: 'History',
      profile: 'Profile',
      back: 'Back',
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      search: 'Search',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      warning: 'Warning',
      info: 'Information',
      yes: 'Yes',
      no: 'No',
      ok: 'OK',
      close: 'Close',
      next: 'Next',
      previous: 'Previous',
      continue: 'Continue',
      finish: 'Finish'
    },
    app: {
      title: 'CropSenz',
      subtitle: 'Smart Agriculture Assistant',
      description: 'AI-powered crop analysis and farming guidance'
    },
    navigation: {
      home: 'Home',
      diagnosis: 'Crop Diagnosis',
      market: 'Market Prices',
      grading: 'Quality Grading',
      storage: 'Storage Solutions',
      remedies: 'Treatment Remedies',
      history: 'Analysis History',
      profile: 'User Profile'
    },
    login: {
      title: 'Welcome Back',
      subtitle: 'Sign in to your farming assistant',
      phone: 'Phone Number',
      phonePlaceholder: 'Enter your phone number',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      loginButton: 'Sign In',
      forgotPassword: 'Forgot Password?',
      noAccount: "Don't have an account?",
      signUp: 'Sign Up',
      invalidCredentials: 'Invalid phone number or password'
    },
    home: {
      welcomeBack: 'Welcome Back',
      quickActions: 'Quick Actions',
      recentAnalysis: 'Recent Analysis',
      cropHealth: 'Crop Health',
      todaysWeather: 'Today\'s Weather',
      marketTrends: 'Market Trends',
      farmingTips: 'Farming Tips'
    },
    diagnosis: {
      title: 'Crop Diagnosis',
      subtitle: 'AI-powered crop health analysis',
      uploadPhoto: 'Upload Crop Photo',
      takePhoto: 'Take Photo',
      analyzeButton: 'Analyze Crop',
      results: 'Analysis Results',
      confidence: 'Confidence',
      recommendations: 'Recommendations',
      noImageSelected: 'No image selected',
      selectImage: 'Please select or capture an image'
    },
    storage: {
      title: 'Storage Suggestions',
      subtitle: 'Smart storage solutions for your harvested crops',
      privateSolutions: 'Private Storage Solutions',
      privateDescription: 'Best practices for farmers with their own storage facilities',
      governmentFacilities: 'Government Cold Storage Facilities',
      governmentDescription: 'Affordable cold storage options for small farmers',
      rentalMarketplace: 'Storage Rental Marketplace',
      rentalDescription: 'Rent storage space or list your extra storage for others',
      browseRentals: 'Browse Rentals',
      listStorage: 'List Your Storage',
      availableFacilities: 'Available Facilities Near You',
      contactOwner: 'Contact Owner',
      getQuote: 'Get Quote',
      addListing: 'Add New Listing',
      listingTitle: 'Listing Title',
      location: 'Location',
      capacity: 'Capacity (MT)',
      rate: 'Rate (₹/kg/month)',
      storageType: 'Storage Type',
      features: 'Features',
      availableFrom: 'Available From',
      contact: 'Contact Number',
      description: 'Additional Details'
    },
    market: {
      title: 'Market Prices',
      subtitle: 'Live market rates and price trends',
      todayPrices: 'Today\'s Prices',
      priceAlert: 'Price Alert',
      trends: 'Price Trends',
      forecast: 'Price Forecast',
      recommendation: 'Sell/Hold Recommendation'
    },
    language: {
      select: 'Select Language',
      english: 'English',
      hindi: 'हिंदी',
      tamil: 'தமிழ்',
      bengali: 'বাংলা'
    }
  },
  hi: {
    common: {
      home: 'होम',
      diagnose: 'निदान',
      market: 'बाज़ार',
      quality: 'गुणवत्ता',
      storage: 'भंडारण',
      remedies: 'उपचार',
      history: 'इतिहास',
      profile: 'प्रोफ़ाइल',
      back: 'वापस',
      submit: 'जमा करें',
      cancel: 'रद्द करें',
      save: 'सेव करें',
      edit: 'संपादित करें',
      delete: 'हटाएं',
      search: 'खोजें',
      loading: 'लोड हो रहा है...',
      error: 'त्रुटि',
      success: 'सफलता',
      warning: 'चेतावनी',
      info: 'जानकारी',
      yes: 'हाँ',
      no: 'नहीं',
      ok: 'ठीक है',
      close: 'बंद करें',
      next: 'अगला',
      previous: 'पिछला',
      continue: 'जारी रखें',
      finish: 'समाप्त'
    },
    app: {
      title: 'CropSenz',
      subtitle: 'स्मार्ट कृषि सहायक',
      description: 'AI-संचालित फसल विश्लेषण और कृषि मार्गदर्शन'
    },
    navigation: {
      home: 'होम',
      diagnosis: 'फसल निदान',
      market: 'बाज़ार दरें',
      grading: 'गुणवत्ता ग्रेडिंग',
      storage: 'भंडारण समाधान',
      remedies: 'उपचार दवाएं',
      history: 'विश्लेषण इतिहास',
      profile: 'उपयोगकर्ता प्रोफ़ाइल'
    },
    login: {
      title: 'वापस स्वागत है',
      subtitle: 'अपने कृषि सहायक में साइन इन करें',
      phone: 'फोन नंबर',
      phonePlaceholder: 'अपना फोन नंबर दर्ज करें',
      password: 'पासवर्ड',
      passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
      loginButton: 'साइन इन करें',
      forgotPassword: 'पासवर्ड भूल गए?',
      noAccount: 'कोई खाता नहीं है?',
      signUp: 'साइन अप करें',
      invalidCredentials: 'गलत फोन नंबर या पासवर्ड'
    },
    home: {
      welcomeBack: 'वापस स्वागत है',
      quickActions: 'त्वरित कार्य',
      recentAnalysis: 'हाल का विश्लेषण',
      cropHealth: 'फसल स्वास्थ्य',
      todaysWeather: 'आज का मौसम',
      marketTrends: 'बाज़ार के रुझान',
      farmingTips: 'कृषि सुझाव'
    },
    diagnosis: {
      title: 'फसल निदान',
      subtitle: 'AI-संचालित फसल स्वास्थ्य विश्लेषण',
      uploadPhoto: 'फसल की फोटो अपलोड करें',
      takePhoto: 'फोटो लें',
      analyzeButton: 'फसल का विश्लेषण करें',
      results: 'विश्लेषण परिणाम',
      confidence: 'विश्वास',
      recommendations: 'सिफारिशें',
      noImageSelected: 'कोई छवि चयनित नहीं',
      selectImage: 'कृपया एक छवि चुनें या कैप्चर करें'
    },
    storage: {
      title: 'भंडारण सुझाव',
      subtitle: 'आपकी कटी हुई फसलों के लिए स्मार्ट भंडारण समाधान',
      privateSolutions: 'निजी भंडारण समाधान',
      privateDescription: 'अपनी भंडारण सुविधाओं वाले किसानों के लिए सर्वोत्तम प्रथाएं',
      governmentFacilities: 'सरकारी कोल्ड स्टोरेज सुविधाएं',
      governmentDescription: 'छोटे किसानों के लिए किफायती कोल्ड स्टोरेज विकल्प',
      rentalMarketplace: 'भंडारण किराया बाज़ार',
      rentalDescription: 'भंडारण स्थान किराए पर लें या अपना अतिरिक्त भंडारण सूचीबद्ध करें',
      browseRentals: 'किराए देखें',
      listStorage: 'अपना भंडारण सूचीबद्ध करें',
      availableFacilities: 'आपके पास उपलब्ध सुविधाएं',
      contactOwner: 'मालिक से संपर्क करें',
      getQuote: 'कोटेशन प्राप्त करें',
      addListing: 'नई लिस्टिंग जोड़ें',
      listingTitle: 'लिस्टिंग शीर्षक',
      location: 'स्थान',
      capacity: 'क्षमता (MT)',
      rate: 'दर (₹/किग्रा/महीना)',
      storageType: 'भंडारण प्रकार',
      features: 'विशेषताएं',
      availableFrom: 'से उपलब्ध',
      contact: 'संपर्क नंबर',
      description: 'अतिरिक्त विवरण'
    },
    market: {
      title: 'बाज़ार दरें',
      subtitle: 'लाइव बाज़ार दरें और मूल्य रुझान',
      todayPrices: 'आज की दरें',
      priceAlert: 'मूल्य अलर्ट',
      trends: 'मूल्य रुझान',
      forecast: 'मूल्य पूर्वानुमान',
      recommendation: 'बेचें/रखें सिफारिश'
    },
    language: {
      select: 'भाषा चुनें',
      english: 'English',
      hindi: 'हिंदी',
      tamil: 'தமிழ்',
      bengali: 'বাংলা'
    }
  },
  ta: {
    common: {
      home: 'முகப்பு',
      diagnose: 'நோய் கண்டறிதல்',
      market: 'சந்தை',
      quality: 'தரம்',
      storage: 'சேமிப்பு',
      remedies: 'மருந்துகள்',
      history: 'வரலாறு',
      profile: 'சுயவிவரம்',
      back: 'திரும்பு',
      submit: 'சமர்ப்பிக்கவும்',
      cancel: 'ரத்து செய்',
      save: 'சேமிக்கவும்',
      edit: 'திருத்து',
      delete: 'நீக்கு',
      search: 'தேடு',
      loading: 'ஏற்றுகிறது...',
      error: 'பிழை',
      success: 'வெற்றி',
      warning: 'எச்சரிக்கை',
      info: 'தகவல்',
      yes: 'ஆம்',
      no: 'இல்லை',
      ok: 'சரி',
      close: 'மூடு',
      next: 'அடுத்து',
      previous: 'முந்தைய',
      continue: 'தொடர்',
      finish: 'முடிக்க'
    },
    app: {
      title: 'CropSenz',
      subtitle: 'ஸ்மார்ட் விவசாய உதவியாளர்',
      description: 'AI-இயங்கும் பயிர் பகுப்பாய்வு மற்றும் விவசாய வழிகாட்டுதல்'
    },
    navigation: {
      home: 'முகப்பு',
      diagnosis: 'பயிர் நோய் கண்டறிதல்',
      market: 'சந்தை விலைகள்',
      grading: 'தர மதிப்பீடு',
      storage: 'சேமிப்பு தீர்வுகள்',
      remedies: 'சிகிச்சை மருந்துகள்',
      history: 'பகுப்பாய்வு வரலாறு',
      profile: 'பயனர் சுயவிவரம்'
    },
    login: {
      title: 'மீண்டும் வரவேற்கிறோம்',
      subtitle: 'உங்கள் விவசாய உதவியாளரில் உள்நுழையவும்',
      phone: 'தொலைபேசி எண்',
      phonePlaceholder: 'உங்கள் தொலைபேசி எண்ணை உள்ளிடவும்',
      password: 'கடவுச்சொல்',
      passwordPlaceholder: 'உங்கள் கடவுச்சொல்லை உள்ளிடவும்',
      loginButton: 'உள்நுழைக',
      forgotPassword: 'கடவுச்சொல் மறந்துவிட்டதா?',
      noAccount: 'கணக்கு இல்லையா?',
      signUp: 'பதிவு செய்யவும்',
      invalidCredentials: 'தவறான தொலைபேசி எண் அல்லது கடவுச்சொல்'
    },
    home: {
      welcomeBack: 'மீண்டும் வரவேற்கிறோம்',
      quickActions: 'விரைவு செயல்கள்',
      recentAnalysis: 'சமீபத்திய பகுப்பாய்வு',
      cropHealth: 'பயிர் ஆரோக்கியம்',
      todaysWeather: 'இன்றைய வானிலை',
      marketTrends: 'சந்தை போக்குகள்',
      farmingTips: 'விவசாய குறிப்புகள்'
    },
    diagnosis: {
      title: 'பயிர் நோய் கண்டறிதல்',
      subtitle: 'AI-இயங்கும் பயிர் ஆரோக்கிய பகுப்பாய்வு',
      uploadPhoto: 'பயிர் புகைப்படம் பதிவேற்றவும்',
      takePhoto: 'புகைப்படம் எடுக்கவும்',
      analyzeButton: 'பயிரை பகுப்பாய்வு செய்யவும்',
      results: 'பகுப்பாய்வு முடிவுகள்',
      confidence: 'நம்பிக்கை',
      recommendations: 'பரிந்துரைகள்',
      noImageSelected: 'படம் தேர்ந்தெடுக்கப்படவில்லை',
      selectImage: 'தயவுசெய்து ஒரு படத்தை தேர்ந்தெடுக்கவும் அல்லது எடுக்கவும்'
    },
    storage: {
      title: 'சேமிப்பு பரிந்துரைகள்',
      subtitle: 'உங்கள் அறுவடை செய்யப்பட்ட பயிர்களுக்கு ஸ்மார்ட் சேமிப்பு தீர்வுகள்',
      privateSolutions: 'தனியார் சேமிப்பு தீர்வுகள்',
      privateDescription: 'தங்கள் சொந்த சேமிப்பு வசதிகளைக் கொண்ட விவசாயிகளுக்கான சிறந்த நடைமுறைகள்',
      governmentFacilities: 'அரசு குளிர்சாதன சேமிப்பு வசதிகள்',
      governmentDescription: 'சிறு விவசாயிகளுக்கு மலிவான குளிர்சாதன சேமிப்பு விருப்பங்கள்',
      rentalMarketplace: 'சேமிப்பு வாடகை சந்தை',
      rentalDescription: 'சேமிப்பு இடத்தை வாடகைக்கு எடுக்கவும் அல்லது உங்கள் கூடுதல் சேமிப்பை பட்டியலிடவும்',
      browseRentals: 'வாடகைகளை உலாவவும்',
      listStorage: 'உங்கள் சேமிப்பை பட்டியலிடவும்',
      availableFacilities: 'உங்களுக்கு அருகிலுள்ள வசதিகள்',
      contactOwner: 'உரிமையாளரைத் தொடர்பு கொள்ளவும்',
      getQuote: 'மேற்கோள் பெறவும்',
      addListing: 'புதிய பட்டியல் சேர்க்கவும்',
      listingTitle: 'பட்டியல் தலைப்பு',
      location: 'இடம்',
      capacity: 'திறன் (MT)',
      rate: 'விலை (₹/kg/மாதம்)',
      storageType: 'சேமிப்பு வகை',
      features: 'அம்சங்கள்',
      availableFrom: 'இருந்து கிடைக்கும்',
      contact: 'தொடர்பு எண்',
      description: 'கூடுதல் விவரங்கள்'
    },
    market: {
      title: 'சந்தை விலைகள்',
      subtitle: 'நேரடி சந்தை விலைகள் மற்றும் விலை போக்குகள்',
      todayPrices: 'இன்றைய விலைகள்',
      priceAlert: 'விலை எச்சரிக்கை',
      trends: 'விலை போக்குகள்',
      forecast: 'விலை முன்னறிவிப்பு',
      recommendation: 'விற்பனை/வைத்திருக்க பரிந்துரை'
    },
    language: {
      select: 'மொழியைத் தேர்ந்தெடுக்கவும்',
      english: 'English',
      hindi: 'हिंदी',
      tamil: 'தமிழ்',
      bengali: 'বাংলা'
    }
  },
  bn: {
    common: {
      home: 'হোম',
      diagnose: 'নির্ণয়',
      market: 'বাজার',
      quality: 'গুণমান',
      storage: 'সংরক্ষণ',
      remedies: 'প্রতিকার',
      history: 'ইতিহাস',
      profile: 'প্রোফাইল',
      back: 'পিছনে',
      submit: 'জমা দিন',
      cancel: 'বাতিল',
      save: 'সংরক্ষণ করুন',
      edit: 'সম্পাদনা',
      delete: 'মুছুন',
      search: 'অনুসন্ধান',
      loading: 'লোড হচ্ছে...',
      error: 'ত্রুটি',
      success: 'সফল',
      warning: 'সতর্কতা',
      info: 'তথ্য',
      yes: 'হ্যাঁ',
      no: 'না',
      ok: 'ঠিক আছে',
      close: 'বন্ধ করুন',
      next: 'পরবর্তী',
      previous: 'পূর্ববর্তী',
      continue: 'চালিয়ে যান',
      finish: 'শেষ'
    },
    app: {
      title: 'CropSenz',
      subtitle: 'স্মার্ট কৃষি সহায়ক',
      description: 'এআই-চালিত ফসল বিশ্লেষণ এবং কৃষি নির্দেশনা'
    },
    navigation: {
      home: 'হোম',
      diagnosis: 'ফসল নির্ণয়',
      market: 'বাজার দর',
      grading: 'গুণমান গ্রেডিং',
      storage: 'সংরক্ষণ সমাধান',
      remedies: 'চিকিৎসা প্রতিকার',
      history: 'বিশ্লেষণ ইতিহাস',
      profile: 'ব্যবহারকারী প্রোফাইল'
    },
    login: {
      title: 'স্বাগতম',
      subtitle: 'আপনার কৃষি সহায়কে সাইন ইন করুন',
      phone: 'ফোন নম্বর',
      phonePlaceholder: 'আপনার ফোন নম্বর লিখুন',
      password: 'পাসওয়ার্ড',
      passwordPlaceholder: 'আপনার পাসওয়ার্ড লিখুন',
      loginButton: 'সাইন ইন করুন',
      forgotPassword: 'পাসওয়ার্ড ভুলে গেছেন?',
      noAccount: 'কোনো অ্যাকাউন্ট নেই?',
      signUp: 'সাইন আপ করুন',
      invalidCredentials: 'ভুল ফোন নম্বর বা পাসওয়ার্ড'
    },
    home: {
      welcomeBack: 'স্বাগতম',
      quickActions: 'দ্রুত কার্যক্রম',
      recentAnalysis: 'সাম্প্রতিক বিশ্লেষণ',
      cropHealth: 'ফসলের স্বাস্থ্য',
      todaysWeather: 'আজকের আবহাওয়া',
      marketTrends: 'বাজারের প্রবণতা',
      farmingTips: 'কৃষি টিপস'
    },
    diagnosis: {
      title: 'ফসল নির্ণয়',
      subtitle: 'এআই-চালিত ফসলের স্বাস্থ্য বিশ্লেষণ',
      uploadPhoto: 'ফসলের ছবি আপলোড করুন',
      takePhoto: 'ছবি তুলুন',
      analyzeButton: 'ফসল বিশ্লেষণ করুন',
      results: 'বিশ্লেষণের ফলাফল',
      confidence: 'আত্মবিশ্বাস',
      recommendations: 'সুপারিশ',
      noImageSelected: 'কোনো ছবি নির্বাচিত নয়',
      selectImage: 'অনুগ্রহ করে একটি ছবি নির্বাচন করুন বা তুলুন'
    },
    storage: {
      title: 'সংরক্ষণ পরামর্শ',
      subtitle: 'আপনার কাটা ফসলের জন্য স্মার্ট সংরক্ষণ সমাধান',
      privateSolutions: 'ব্যক্তিগত সংরক্ষণ সমাধান',
      privateDescription: 'নিজস্ব সংরক্ষণ সুবিধা সহ কৃষকদের জন্য সেরা অনুশীলন',
      governmentFacilities: 'সরকারি কোল্ড স্টোরেজ সুবিধা',
      governmentDescription: 'ছোট কৃষকদের জন্য সাশ্রয়ী কোল্ড স্টোরেজ বিকল্প',
      rentalMarketplace: 'সংরক্ষণ ভাড়া বাজার',
      rentalDescription: 'সংরক্ষণ স্থান ভাড়া নিন বা আপনার অতিরিক্ত সংরক্ষণ তালিকাভুক্ত করুন',
      browseRentals: 'ভাড়া দেখুন',
      listStorage: 'আপনার সংরক্ষণ তালিকাভুক্ত করুন',
      availableFacilities: 'আপনার কাছে উপলব্ধ সুবিধা',
      contactOwner: 'মালিকের সাথে যোগাযোগ করুন',
      getQuote: 'কোটেশন পান',
      addListing: 'নতুন তালিকা যোগ করুন',
      listingTitle: 'তালিকার শিরোনাম',
      location: 'স্থান',
      capacity: 'ধারণক্ষমতা (এমটি)',
      rate: 'হার (₹/কেজি/মাস)',
      storageType: 'সংরক্ষণের ধরন',
      features: 'বৈশিষ্ট্য',
      availableFrom: 'থেকে উপলব্ধ',
      contact: 'যোগাযোগ নম্বর',
      description: 'অতিরিক্ত বিবরণ'
    },
    market: {
      title: 'বাজার দর',
      subtitle: 'লাইভ বাজার দর এবং দামের প্রবণতা',
      todayPrices: 'আজকের দাম',
      priceAlert: 'দামের সতর্কতা',
      trends: 'দামের প্রবণতা',
      forecast: 'দামের পূর্বাভাস',
      recommendation: 'বিক্রি/ধরে রাখার সুপারিশ'
    },
    language: {
      select: 'ভাষা নির্বাচন করুন',
      english: 'English',
      hindi: 'हिंदী',
      tamil: 'தமিழ்',
      bengali: 'বাংলা'
    }
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved && ['en', 'hi', 'ta', 'bn'].includes(saved)) ? saved as Language : 'en';
  });

  const setLanguageWithPersistence = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: setLanguageWithPersistence, t }}>
      {children}
    </LanguageContext.Provider>
  );
}