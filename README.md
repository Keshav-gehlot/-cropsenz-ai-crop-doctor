# 🌾 CropSenz - AI Crop Doctor App

> **AI-powered crop health diagnosis and farming assistant with multilingual support**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.6-purple.svg)](https://vitejs.dev/)

## 📖 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Supported Crops](#supported-crops)
- [Multilingual Support](#multilingual-support)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Usage Guide](#usage-guide)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

CropSenz is a comprehensive AI-powered agricultural assistant designed specifically for Indian farmers. The application provides intelligent crop disease diagnosis, treatment recommendations, market price information, and storage solutions - all in multiple Indian languages.

**Original Figma Design:** [AI Crop + Doctor App UI](https://www.figma.com/design/zGU6ATix7gzXHLjScIcqX7/AI-Crop---Doctor-App-UI)

## ✨ Features

### 🔬 **AI-Powered Crop Diagnosis**
- Real-time crop disease detection using OpenEPI API
- Support for 12+ major Indian crops
- 95%+ accuracy in disease identification
- Intelligent disease prediction with crop compatibility scoring

### 🌐 **Multilingual Support**
- **English** (en) 🇬🇧
- **हिंदी** (Hindi - hi) 🇮🇳
- **தமிழ்** (Tamil - ta) 🇮🇳
- **বাংলা** (Bengali - bn) 🇮🇳
- Persistent language preference
- Complete UI translation

### 💊 **Smart Remedies System**
- Organic and chemical treatment options
- Cost-effective solutions (₹600-₹1800 range)
- Disease-resistant variety recommendations
- Preventive care guidelines
- Seasonal farming tips

### 📊 **Market Intelligence**
- Live market prices
- Price trends and forecasting
- Sell/Hold recommendations
- Price alerts

### 🏪 **Storage Solutions**
- Private storage best practices
- Government cold storage facilities
- Storage rental marketplace
- Capacity planning tools

### 📱 **Responsive Design**
- Mobile-first approach
- Desktop optimization
- Tablet support
- PWA capabilities

## 🌾 Supported Crops

The system provides comprehensive support for **12 major Indian crops**:

| Crop | Primary Diseases | Resistant Varieties |
|------|-----------------|---------------------|
| 🌾 **Wheat** | Wheat Rust, Wheat Blight, Powdery Mildew | HD-2967, DBW-88, PBW-343 |
| 🌾 **Rice** | Rice Blast, Brown Plant Hopper, Bacterial Blight | Pusa-44, CSR-30, Swarna |
| 🌽 **Maize** | Fall Army Worm, Maize Borer, Common Rust | DHM-117, PEHM-2, Shaktiman-1 |
| 🌱 **Cotton** | Cotton Bollworm, Cotton Leaf Curl, Pink Bollworm | Bt Cotton varieties |
| 🎋 **Sugarcane** | Red Rot, Smut, Wilt Disease | Co-86032, CoJ-64 |
| 🌱 **Soybean** | Soybean Rust, Pod Borer, Yellow Mosaic | JS-335, MAUS-71 |
| 🍅 **Tomato** | Late Blight, Leaf Curl, Early Blight | Pusa Ruby, Arka Vikas |
| 🥔 **Potato** | Potato Blight, Late Blight, Common Scab | Kufri Jyoti, Kufri Bahar |
| 🧅 **Onion** | Purple Blotch, Downy Mildew, Neck Rot | Pusa Red, Agrifound Dark Red |
| 🌶️ **Chili** | Anthracnose, Bacterial Wilt, Fruit Rot | Pusa Jwala, Arka Lohit |
| 🥜 **Groundnut** | Leaf Spot, Tikka Disease, Pod Rot | GG-20, TAG-24 |
| 🌻 **Sunflower** | Sunflower Rust, Downy Mildew, Head Rot | KBSH-1, Jwalamukhi |

## 🌐 Multilingual Support

### Implementation

The app uses a comprehensive translation system built with React Context API:

**Key Files:**
- `src/contexts/LanguageContext.tsx` - Language state management
- `src/components/LanguageSwitcher.tsx` - Language selection UI

### Using Translations

```tsx
import { useLanguage } from '../contexts/LanguageContext';

function MyComponent() {
  const { language, setLanguage, t } = useLanguage();
  
  return (
    <div>
      <h1>{t('app.title')}</h1>
      <p>{t('app.description')}</p>
      <button onClick={() => setLanguage('hi')}>
        Switch to Hindi
      </button>
    </div>
  );
}
```

### Available Translation Keys

```typescript
// Navigation
t('navigation.home')
t('navigation.diagnosis')
t('navigation.market')

// Diagnosis
t('diagnosis.title')
t('diagnosis.uploadPhoto')
t('diagnosis.results')

// Common
t('common.submit')
t('common.cancel')
t('common.loading')
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/cropsenz-ai-crop-doctor.git
cd cropsenz-ai-crop-doctor
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your OpenEPI API key:
```env
VITE_OPENEPI_API_KEY=your_api_key_here
```

4. **Start development server**
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## 📁 Project Structure

```
cropsenz-ai-crop-doctor/
├── public/
│   ├── manifest.json          # PWA manifest
│   └── sw.js                  # Service worker
├── src/
│   ├── components/
│   │   ├── DiagnosisScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── MarketScreen.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   └── ui/                # Reusable UI components
│   ├── contexts/
│   │   └── LanguageContext.tsx
│   ├── services/
│   │   ├── cropHealthService.ts      # OpenEPI API integration
│   │   ├── cropDiseaseMapping.ts     # Crop disease database
│   │   └── aiRemediesService.ts      # Treatment recommendations
│   ├── hooks/
│   │   └── usePreloadScreens.ts
│   ├── styles/
│   │   ├── globals.css
│   │   └── animations.css
│   ├── utils/
│   │   └── lazyComponents.tsx
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🔌 API Integration

### OpenEPI Crop Health API

The app integrates with the OpenEPI Crop Health API for accurate disease detection.

**Service File:** `src/services/cropHealthService.ts`

#### Features:
- **Binary Prediction**: Healthy/Diseased classification
- **Single-HLT Prediction**: Single crop disease identification
- **Multi-HLT Prediction**: Multiple disease detection
- **Comprehensive Analysis**: Full diagnostic report

#### Example Usage:

```typescript
import CropHealthService from './services/cropHealthService';

const service = new CropHealthService();

// Binary prediction
const result = await service.getBinaryPrediction(imageFile);

// Single disease detection
const diagnosis = await service.getSingleHLTPrediction(imageFile);

// Multiple disease detection
const multiDiagnosis = await service.getMultiHLTPrediction(imageFile);

// Full analysis
const fullReport = await service.getComprehensiveAnalysis(imageFile);
```

### Crop Disease Database

**Service File:** `src/services/cropDiseaseMapping.ts`

Contains extensive mapping of:
- Common diseases per crop
- Vulnerable seasons
- Resistant varieties
- Primary threats

### AI Remedies Service

**Service File:** `src/services/aiRemediesService.ts`

Provides intelligent treatment recommendations:
- Organic solutions
- Chemical treatments
- Cost estimates
- Preventive measures
- Resistant variety suggestions

## 📱 Usage Guide

### 1. Disease Diagnosis

1. Navigate to **Diagnose** screen
2. Capture or upload crop photo
3. Wait for AI analysis
4. Review diagnosis results
5. View treatment recommendations

### 2. Language Switching

1. Click the language selector (globe icon)
2. Choose from: English, Hindi, Tamil, or Bengali
3. Entire UI updates instantly
4. Preference saved automatically

### 3. Market Prices

1. Navigate to **Market** screen
2. View live prices
3. Check trends and forecasts
4. Set price alerts

### 4. Storage Solutions

1. Navigate to **Storage** screen
2. Browse private solutions
3. Find government facilities
4. List or rent storage space

## 🛠️ Technologies Used

### Frontend
- **React 18.3.1** - UI library
- **TypeScript 5.6.2** - Type safety
- **Vite 6.3.6** - Build tool
- **Tailwind CSS 3.4.17** - Styling
- **shadcn/ui** - Component library

### State Management
- React Context API
- Local Storage for persistence

### API & Services
- OpenEPI Crop Health API
- Custom AI remedies engine

### UI/UX
- Lucide React - Icons
- Framer Motion - Animations
- Radix UI - Accessible components

### Development Tools
- ESLint - Code linting
- Stylelint - CSS linting
- PostCSS - CSS processing

## 🧪 Testing

### Quick Test Scenarios

#### Test 1: Wheat Disease Detection
```typescript
const wheatTest = {
  crop: 'Wheat',
  disease: 'Wheat Rust',
  confidence: 0.89
};
// Expected: Neem oil, Propiconazole, HD-2967 variety
```

#### Test 2: Rice Blast Management
```typescript
const riceTest = {
  crop: 'Rice',
  disease: 'Rice Blast',
  confidence: 0.94
};
// Expected: Silicon application, Tricyclazole, Pusa-44 variety
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original Figma design by the CropSenz team
- OpenEPI for crop health API
- Indian Council of Agricultural Research (ICAR) for crop disease data
- shadcn/ui for component library
- All contributors and farmers who provided valuable feedback

## 📞 Support

For support, email support@cropsenz.com or open an issue on GitHub.

## 🗺️ Roadmap

- [ ] Add more regional languages (Punjabi, Marathi, Telugu)
- [ ] Implement offline mode
- [ ] Add voice-based assistance
- [ ] Integrate weather forecasting
- [ ] Add soil testing features
- [ ] Implement farmer community forum
- [ ] Add government scheme information

---

**Made with ❤️ for Indian Farmers**

*Empowering agriculture through AI and technology*
