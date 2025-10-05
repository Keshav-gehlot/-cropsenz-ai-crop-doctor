# 🌾 CropSenz - AI-Powered Crop Doctor

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Production Ready](https://img.shields.io/badge/Status-Production%20Ready-success)](https://github.com/Keshav-gehlot/-cropsenz-ai-crop-doctor)

> **Empowering farmers with AI-driven agricultural intelligence** 🚜

CropSenz is a comprehensive, production-ready AI agriculture application designed to revolutionize farming practices. Built with cutting-edge technology, it provides farmers with multilingual support, AI-powered disease diagnosis, real-time market intelligence, and smart storage solutions—all in one powerful platform.

---

## 🌟 Key Features

### 🤖 AI Disease Diagnosis
- **Intelligent Crop Analysis**: Upload crop images for instant AI-powered disease detection
- **Comprehensive Database**: Covers a wide range of crop diseases and pests
- **Treatment Recommendations**: Get actionable advice for disease management
- **Early Detection**: Identify issues before they spread, saving crops and resources

### 🌍 Multilingual Support
Support for **4 languages** to reach farmers globally:
- 🇬🇧 English
- 🇮🇳 Hindi (हिंदी)
- 🇮🇳 Marathi (मराठी)
- 🇮🇳 Punjabi (ਪੰਜਾਬੀ)

### 📊 Market Intelligence
- **Real-Time Price Data**: Track crop prices across different markets
- **Price Trends & Analytics**: Make informed selling decisions
- **Market Insights**: Stay updated with agricultural market news
- **Demand Forecasting**: Understand market dynamics for better planning

### 📦 Storage Solutions
- **Storage Management**: Track and manage crop inventory
- **Quality Monitoring**: Monitor storage conditions
- **Best Practices**: Get recommendations for optimal storage
- **Loss Prevention**: Minimize post-harvest losses with smart alerts

---

## 🏗️ Technical Architecture

### Frontend Stack
```
├── React 18+ (UI Framework)
├── TypeScript (Type Safety)
├── Vite (Build Tool & Dev Server)
├── TailwindCSS (Styling)
├── React Router (Navigation)
├── Zustand/Redux (State Management)
└── i18next (Internationalization)
```

### AI & Backend
```
├── TensorFlow.js / ML Models (Disease Detection)
├── REST APIs (Backend Communication)
├── Firebase/Supabase (Authentication & Database)
├── Cloud Storage (Image Processing)
└── Real-time Data Sync
```

### Code Quality & Developer Experience
```
├── ESLint (Linting)
├── Prettier (Code Formatting)
├── Husky (Git Hooks)
├── TypeScript Strict Mode
└── Component-based Architecture
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Keshav-gehlot/-cropsenz-ai-crop-doctor.git
   cd -cropsenz-ai-crop-doctor
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Configure your API keys and environment variables
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   ```
   Navigate to http://localhost:5173
   ```

---

## 📦 Build & Deployment

### Production Build
```bash
npm run build
# or
yarn build
```

### Preview Production Build
```bash
npm run preview
# or
yarn preview
```

### Deployment Options

#### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### Docker
```bash
docker build -t cropsenz .
docker run -p 80:80 cropsenz
```

---

## 🎨 User Interface

CropSenz features a **modern, polished UI** designed with farmers in mind:

- ✅ **Intuitive Navigation**: Easy-to-use interface for all skill levels
- ✅ **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- ✅ **Accessible**: WCAG 2.1 compliant for inclusive design
- ✅ **Dark/Light Mode**: Choose your preferred theme
- ✅ **Offline Support**: Progressive Web App (PWA) capabilities

---

## 📱 Application Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Shared components
│   ├── disease/        # Disease detection components
│   ├── market/         # Market intelligence components
│   └── storage/        # Storage management components
├── pages/              # Page components
│   ├── Dashboard/      # Main dashboard
│   ├── Diagnosis/      # Disease diagnosis
│   ├── Market/         # Market insights
│   └── Storage/        # Storage solutions
├── hooks/              # Custom React hooks
├── services/           # API services
│   ├── ai/            # AI model integration
│   ├── market/        # Market data APIs
│   └── storage/       # Storage APIs
├── store/              # State management
├── locales/            # i18n translations
├── utils/              # Utility functions
├── types/              # TypeScript definitions
└── assets/             # Static assets
```

---

## 🔧 Configuration

### Environment Variables
```env
# API Configuration
VITE_API_URL=your_api_url
VITE_AI_MODEL_URL=your_ai_model_url

# Authentication
VITE_AUTH_PROVIDER=firebase
VITE_FIREBASE_API_KEY=your_firebase_key

# Market Data
VITE_MARKET_API_KEY=your_market_api_key

# Analytics
VITE_ANALYTICS_ID=your_analytics_id
```

---

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run e2e tests
npm run test:e2e
```

---

## 📚 Documentation

For detailed documentation, visit:
- [User Guide](docs/USER_GUIDE.md)
- [API Documentation](docs/API.md)
- [Contributing Guidelines](CONTRIBUTING.md)
- [Architecture Overview](docs/ARCHITECTURE.md)

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and development process.

---

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature request? Please open an issue on our [GitHub Issues](https://github.com/Keshav-gehlot/-cropsenz-ai-crop-doctor/issues) page.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Keshav Gehlot**
- GitHub: [@Keshav-gehlot](https://github.com/Keshav-gehlot)

---

## 🙏 Acknowledgments

- Thanks to the open-source community for amazing tools and libraries
- Special thanks to farmers who provided valuable feedback
- AI models powered by state-of-the-art machine learning research
- Market data providers for real-time agricultural information

---

## 🌟 Roadmap

### Current Version (v1.0)
- ✅ AI Disease Diagnosis
- ✅ Multilingual Support (4 languages)
- ✅ Market Intelligence
- ✅ Storage Solutions
- ✅ Responsive UI

### Upcoming Features (v2.0)
- 🔄 Weather Integration
- 🔄 Soil Health Analysis
- 🔄 Community Forum
- 🔄 Expert Consultation Booking
- 🔄 IoT Device Integration
- 🔄 Crop Yield Prediction
- 🔄 Fertilizer Recommendation System

---

## 📞 Support

Need help? Reach out to us:
- 📧 Email: support@cropsenz.com
- 💬 Discord: [Join our community](https://discord.gg/cropsenz)
- 📱 Twitter: [@CropSenz](https://twitter.com/cropsenz)

---

## 💡 Impact

CropSenz is designed to make a real difference:
- 🌱 **Increase Crop Yield**: Early disease detection saves harvests
- 💰 **Maximize Profit**: Smart market insights for better selling decisions
- 🌍 **Sustainable Farming**: Reduce waste through better storage management
- 📱 **Accessible Technology**: Available in local languages for all farmers

---

<div align="center">

**Built with ❤️ for farmers around the world**

⭐ Star this repository if you find it helpful!

</div>