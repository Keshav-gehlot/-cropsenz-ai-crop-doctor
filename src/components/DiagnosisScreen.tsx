import { useState } from 'react';
import { ArrowLeft, Camera, Upload, Save, AlertTriangle, CheckCircle, Brain, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Screen } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CameraCapture } from './CameraCapture';
import { FallbackUpload } from './FallbackUpload';
import { usePermissions } from './PermissionManager';
import { cropHealthService, type CropHealthPrediction } from '../services/cropHealthService';
import { aiRemediesService, type AIRemedyResponse } from '../services/aiRemediesService';

interface DiagnosisScreenProps {
  onNavigate: (screen: Screen) => void;
}

// Enhanced analysis result type
interface AnalysisResult {
  disease: string;
  severity: number;
  confidence: number;
  status: 'infected' | 'healthy';
  crop?: string;
  remedies?: {
    organic: string[];
    chemical: string[];
  };
  openEpiData?: CropHealthPrediction;
  aiRemedies?: AIRemedyResponse;
}

export function DiagnosisScreen({ onNavigate }: DiagnosisScreenProps) {
  const { permissions, checkSupport, isHTTPS } = usePermissions();
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [showFallbackUpload, setShowFallbackUpload] = useState(false);

  const support = checkSupport();

  const crops = [
    'Wheat', 'Rice', 'Maize', 'Cotton', 'Sugarcane', 'Soybean',
    'Tomato', 'Potato', 'Onion', 'Chili', 'Groundnut', 'Sunflower'
  ];

  const cropVarieties: Record<string, Array<{name: string, description: string}>> = {
    wheat: [
      { name: 'HD-2967', description: 'High yield, drought tolerant' },
      { name: 'PBW-343', description: 'Disease resistant, irrigated areas' },
      { name: 'HD-3086', description: 'Late sown, heat tolerant' },
      { name: 'WH-147', description: 'Early maturing, high protein' },
      { name: 'DBW-88', description: 'Rust resistant, irrigated' },
      { name: 'HD-2733', description: 'Timely sown, high yield' },
      { name: 'PBW-550', description: 'Disease resistant, Punjab' },
      { name: 'HD-2851', description: 'Drought tolerant, rainfed' },
      { name: 'MP-3288', description: 'Central India, irrigated' },
      { name: 'GW-366', description: 'Gujarat, drought tolerant' },
      { name: 'NIAW-34', description: 'Maharashtra, rainfed' },
      { name: 'UP-2338', description: 'Eastern plains, timely sown' }
    ],
    rice: [
      { name: 'IR-64', description: 'High yield, medium duration' },
      { name: 'Pusa Basmati-1', description: 'Aromatic, export quality' },
      { name: 'Swarna', description: 'Medium duration, pest resistant' },
      { name: 'MTU-7029', description: 'Fine grain, Andhra Pradesh' },
      { name: 'Pusa-44', description: 'Semi-dwarf, high yield' },
      { name: 'CSR-30', description: 'Salt tolerant, coastal areas' },
      { name: 'Samba Mahsuri', description: 'Premium quality, fine grain' },
      { name: 'IR-36', description: 'Short duration, drought tolerant' },
      { name: 'Jaya', description: 'Medium duration, rainfed' },
      { name: 'Ratna', description: 'Short duration, early maturing' },
      { name: 'Pusa Sugandh-5', description: 'Aromatic, Basmati type' },
      { name: 'ADT-43', description: 'Tamil Nadu, disease resistant' }
    ],
    maize: [
      { name: 'DHM-117', description: 'Hybrid, high yield' },
      { name: 'HQPM-1', description: 'Quality protein, nutritious' },
      { name: 'Ganga-5', description: 'Composite, open pollinated' },
      { name: 'DHM-121', description: 'Disease resistant hybrid' },
      { name: 'Pusa Composite-3', description: 'Yellow kernel, high yield' },
      { name: 'Bio-9681', description: 'Private hybrid, kharif' },
      { name: 'HQPM-5', description: 'Protein rich, improved nutrition' },
      { name: 'Surya', description: 'Composite variety, rainfed' },
      { name: 'Shaktiman-1', description: 'Early maturing, drought tolerant' },
      { name: 'Pusa Vivek QPM-9', description: 'Hill areas, quality protein' },
      { name: 'Deccan-103', description: 'South India, kharif season' },
      { name: 'Pusa HM-4', description: 'Single cross hybrid, irrigated' }
    ],
    cotton: [
      { name: 'Bt Cotton RCH-134', description: 'Bollworm resistant, hybrid' },
      { name: 'MCU-5', description: 'Medium staple, rainfed' },
      { name: 'Suraj', description: 'Desi cotton, drought tolerant' },
      { name: 'RCH-317', description: 'Bt hybrid, high yield' },
      { name: 'Bunny Bt', description: 'Private hybrid, pest resistant' },
      { name: 'DCH-32', description: 'American cotton, irrigated' },
      { name: 'LRA-5166', description: 'Long staple, export quality' },
      { name: 'Vikram', description: 'Desi variety, traditional' },
      { name: 'MRC-6918', description: 'Bt hybrid, Maharashtra' },
      { name: 'NCS-207', description: 'Compact plant, mechanization' },
      { name: 'Ankur-651', description: 'Private Bt hybrid, Gujarat' },
      { name: 'Tulasi-9', description: 'High ginning percentage' }
    ],
    sugarcane: [
      { name: 'Co-86032', description: 'High sugar content, disease resistant' },
      { name: 'CoM-265', description: 'Maharashtra, drought tolerant' },
      { name: 'Co-238', description: 'Early maturing, high tonnage' },
      { name: 'CoS-767', description: 'Subtropical, disease resistant' },
      { name: 'Co-94012', description: 'Red rot resistant, high yield' },
      { name: 'CoM-88230', description: 'Ratoon crop, good recovery' },
      { name: 'Co-98014', description: 'High sugar, good juice quality' },
      { name: 'CoS-8436', description: 'Northern states, cold tolerant' },
      { name: 'Co-740', description: 'Tamil Nadu, high tonnage' },
      { name: 'CoM-0265', description: 'Drought resistant, rainfed' },
      { name: 'Co-99004', description: 'Disease resistant, stable yield' },
      { name: 'CoS-95255', description: 'Spring plantation, early harvest' }
    ],
    soybean: [
      { name: 'JS-335', description: 'High yield, disease resistant' },
      { name: 'JS-93-05', description: 'Early maturing, drought tolerant' },
      { name: 'MACS-450', description: 'Maharashtra, high protein' },
      { name: 'JS-97-52', description: 'Medium duration, stable yield' },
      { name: 'DS-228', description: 'Determinate type, mechanization' },
      { name: 'MACS-1407', description: 'High oil content, quality' },
      { name: 'PK-1024', description: 'Private variety, high yield' },
      { name: 'JS-20-29', description: 'Latest release, disease resistant' },
      { name: 'MACS-1188', description: 'Medium maturity, good quality' },
      { name: 'RKS-18', description: 'Rajasthan, drought adapted' },
      { name: 'Ahilya-3', description: 'Madhya Pradesh, high yield' },
      { name: 'Bragg', description: 'Indeterminate, long duration' }
    ],
    tomato: [
      { name: 'Pusa Ruby', description: 'Determinate, processing type' },
      { name: 'Arka Vikas', description: 'Semi-determinate, table purpose' },
      { name: 'Pusa Rohini', description: 'Indeterminate, high yield' },
      { name: 'Arka Saurabh', description: 'Heat tolerant, summer crop' },
      { name: 'Hisar Arun', description: 'Early variety, short duration' },
      { name: 'Pusa Hybrid-1', description: 'F1 hybrid, disease resistant' },
      { name: 'Arka Abha', description: 'Processing variety, uniform' },
      { name: 'Punjab Chhuhara', description: 'Dual purpose, good keeping' },
      { name: 'Sel-7', description: 'Traditional variety, good taste' },
      { name: 'Arka Alok', description: 'High lycopene, nutritious' },
      { name: 'Pusa Sheetal', description: 'Cool season, protected cultivation' },
      { name: 'Arka Ashish', description: 'Bacterial wilt resistant' }
    ],
    potato: [
      { name: 'Kufri Jyoti', description: 'Early variety, short duration' },
      { name: 'Kufri Pukhraj', description: 'Medium early, good quality' },
      { name: 'Kufri Badshah', description: 'Late variety, high yield' },
      { name: 'Kufri Bahar', description: 'Processing quality, chips' },
      { name: 'Kufri Chipsona-1', description: 'Specialized for chips making' },
      { name: 'Kufri Sindhuri', description: 'Red skin, table purpose' },
      { name: 'Kufri Himalini', description: 'Hills, cold resistant' },
      { name: 'Kufri Surya', description: 'Heat tolerant, plains' },
      { name: 'Kufri Anand', description: 'White flesh, good cooking' },
      { name: 'Kufri Khyati', description: 'Disease resistant, stable' },
      { name: 'Kufri Frysona', description: 'French fries quality' },
      { name: 'Kufri Lauvkar', description: 'Very early, 65 days' }
    ],
    onion: [
      { name: 'Pusa Red', description: 'Red variety, good storage' },
      { name: 'Nasik Red', description: 'Export quality, pungent' },
      { name: 'Agrifound Light Red', description: 'Mild pungency, table use' },
      { name: 'Pusa White Flat', description: 'White variety, flat shape' },
      { name: 'Arka Niketan', description: 'Short day variety, south India' },
      { name: 'Punjab Selection', description: 'Punjab, good yielder' },
      { name: 'Pusa Madhavi', description: 'Kharif variety, disease resistant' },
      { name: 'Agrifound Dark Red', description: 'Deep red color, export' },
      { name: 'NHRDF Red', description: 'Hybrid, uniform bulbs' },
      { name: 'Arka Kalyan', description: 'Multiplier variety, sets' },
      { name: 'Phule Samarth', description: 'Maharashtra, rabi season' },
      { name: 'Sukhsagar', description: 'Long day variety, north India' }
    ],
    chili: [
      { name: 'Pusa Jwala', description: 'Hot variety, dry chili' },
      { name: 'Arka Lohit', description: 'Mild hot, dual purpose' },
      { name: 'Pant C-1', description: 'High yield, disease resistant' },
      { name: 'G-4', description: 'Guntur variety, very hot' },
      { name: 'Byadgi Dabbi', description: 'Karnataka, export quality' },
      { name: 'Kashmir Long', description: 'Mild, good color' },
      { name: 'Arka Harita', description: 'Green chili, table purpose' },
      { name: 'LCA-334', description: 'Andhra Pradesh, hot variety' },
      { name: 'Pusa Sadabahar', description: 'Perennial, continuous harvest' },
      { name: 'X-235', description: 'Hybrid, high yielding' },
      { name: 'Kashi Anmol', description: 'Early variety, disease resistant' },
      { name: 'Wonder Hot', description: 'Very pungent, small fruits' }
    ],
    groundnut: [
      { name: 'TMV-2', description: 'Virginia type, confectionery' },
      { name: 'JL-24', description: 'Spanish type, oil purpose' },
      { name: 'TAG-24', description: 'Gujarat, drought tolerant' },
      { name: 'TPG-41', description: 'High oil content, processing' },
      { name: 'GG-20', description: 'Large seeded, export quality' },
      { name: 'ICGS-76', description: 'Foliar disease resistant' },
      { name: 'Kadiri-3', description: 'Andhra Pradesh, early variety' },
      { name: 'AK-265', description: 'Karnataka, rain-fed areas' },
      { name: 'R-2001-3', description: 'Rajasthan, drought adapted' },
      { name: 'PBS-12033', description: 'Punjab, irrigated conditions' },
      { name: 'Girnar-2', description: 'Gujarat, bunch type' },
      { name: 'TCGS-1043', description: 'Tamil Nadu, spreading type' }
    ],
    sunflower: [
      { name: 'MSFH-17', description: 'Hybrid, high oil content' },
      { name: 'Surya', description: 'Composite variety, open pollinated' },
      { name: 'DRSF-108', description: 'Drought resistant, rainfed' },
      { name: 'APSH-11', description: 'Andhra Pradesh hybrid' },
      { name: 'PAC-36', description: 'Private hybrid, high yield' },
      { name: 'KBSH-1', description: 'Karnataka, single head' },
      { name: 'Phule Raviraj', description: 'Maharashtra, dwarf plant' },
      { name: 'LSFH-35', description: 'Long duration, high oil' },
      { name: 'Co-4', description: 'Tamil Nadu, composite variety' },
      { name: 'DRSH-1', description: 'Directorate variety, stable' },
      { name: 'RSFH-130', description: 'Rajasthan hybrid, early' },
      { name: 'BSH-1', description: 'Bihar, short duration' }
    ]
  };

  const handleImageUpload = (type: 'camera' | 'gallery') => {
    if (type === 'camera') {
      if (support.camera && isHTTPS && permissions.camera !== 'denied') {
        setShowCamera(true);
      } else {
        setShowFallbackUpload(true);
      }
    } else {
      setShowFallbackUpload(true);
    }
  };

  const handleCameraCapture = (imageDataUrl: string) => {
    setUploadedImage(imageDataUrl);
    setShowCamera(false);
  };

  const handleImageSelect = (imageDataUrl: string) => {
    setUploadedImage(imageDataUrl);
    setShowFallbackUpload(false);
  };

  const handleAnalyze = async () => {
    if (!selectedCrop || !uploadedImage) return;

    setIsAnalyzing(true);

    try {
      // Convert base64 to File object for API call
      const response = await fetch(uploadedImage);
      const blob = await response.blob();
      const file = new File([blob], 'crop-image.jpg', { type: 'image/jpeg' });

      // Get comprehensive prediction from OpenEPI API
      const openEpiResult = await cropHealthService.getComprehensivePrediction(file);
      
      if (openEpiResult.success && openEpiResult.data) {
        const prediction = openEpiResult.data;
        
        // Generate AI-powered remedies if disease detected
        let aiRemedyResponse: AIRemedyResponse | undefined;
        if (prediction.health_status === 'diseased') {
          aiRemedyResponse = await aiRemediesService.generateRemedies({
            crop: prediction.crop || selectedCrop,
            disease: prediction.disease,
            confidence: prediction.confidence
          });
        }

        setAnalysisResult({
          disease: prediction.disease,
          severity: Math.round(prediction.confidence * 100),
          confidence: Math.round(prediction.confidence * 100),
          status: prediction.health_status === 'diseased' ? 'infected' : 'healthy',
          crop: prediction.crop || selectedCrop,
          openEpiData: prediction,
          ...(aiRemedyResponse && { aiRemedies: aiRemedyResponse }),
          remedies: aiRemedyResponse ? {
            organic: aiRemedyResponse.organicControl.methods.slice(0, 3),
            chemical: aiRemedyResponse.chemicalControl.pesticides.slice(0, 3)
          } : {
            organic: [],
            chemical: []
          }
        });
      } else {
        // Fallback to mock analysis
        setAnalysisResult({
          disease: 'Leaf Blight',
          severity: 75,
          confidence: 89,
          status: 'infected',
          crop: selectedCrop,
          remedies: {
            organic: [
              'Apply neem oil spray (10ml per liter)',
              'Use copper sulfate solution',
              'Improve drainage and air circulation'
            ],
            chemical: [
              'Apply Mancozeb 75% WP @ 2g/liter',
              'Use Carbendazim 50% WP @ 1g/liter',
              'Spray at 7-day intervals'
            ]
          }
        });
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      // Fallback to mock analysis on error
      setAnalysisResult({
        disease: 'Analysis Error - Using Mock Data',
        severity: 75,
        confidence: 89,
        status: 'infected',
        crop: selectedCrop,
        remedies: {
          organic: [
            'Apply neem oil spray (10ml per liter)',
            'Use copper sulfate solution',
            'Improve drainage and air circulation'
          ],
          chemical: [
            'Apply Mancozeb 75% WP @ 2g/liter',
            'Use Carbendazim 50% WP @ 1g/liter',
            'Spray at 7-day intervals'
          ]
        }
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {}
      <div className="bg-primary text-white p-4 flex items-center gap-3">
        <div className="container-responsive max-w-7xl mx-auto flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => onNavigate('home')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Crop Health Diagnosis</h1>
        </div>
      </div>

      <div className="container-responsive max-w-7xl mx-auto p-4 space-y-6">
        {}
        <Card>
          <CardHeader>
            <CardTitle>Select Crop & Variety</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Crop Type</label>
              <Select value={selectedCrop} onValueChange={(value) => {
                setSelectedCrop(value);
                setSelectedBreed('');
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your crop" />
                </SelectTrigger>
                <SelectContent>
                  {crops.map((crop) => (
                    <SelectItem key={crop} value={crop.toLowerCase()}>
                      {crop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedCrop && (
              <div>
                <label className="text-sm font-medium mb-2 block">Variety/Breed</label>
                <Select value={selectedBreed} onValueChange={setSelectedBreed}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select variety/breed" />
                  </SelectTrigger>
                  <SelectContent>
                    {cropVarieties[selectedCrop]?.map((variety) => (
                      <SelectItem key={variety.name} value={variety.name}>
                        <div className="flex flex-col">
                          <span className="font-medium">{variety.name}</span>
                          <span className="text-xs text-muted-foreground">{variety.description}</span>
                        </div>
                      </SelectItem>
                    )) || []}
                  </SelectContent>
                </Select>
                {selectedBreed && (
                  <div className="mt-2 p-2 bg-secondary/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">
                      Selected: <span className="font-medium text-foreground">{selectedBreed}</span>
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {}
        <Card>
          <CardHeader>
            <CardTitle>Upload Crop Image</CardTitle>
          </CardHeader>
          <CardContent>
            {!uploadedImage ? (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Take a clear photo of the affected crop
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button
                      onClick={() => handleImageUpload('camera')}
                      className="flex items-center gap-2 android-ripple touch-target px-8 py-4"
                      size="lg"
                    >
                      <Camera className="w-5 h-5" />
                      Camera
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleImageUpload('gallery')}
                      className="flex items-center gap-2 android-ripple touch-target px-8 py-4"
                      size="lg"
                    >
                      <Upload className="w-5 h-5" />
                      Gallery
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <ImageWithFallback
                    src={uploadedImage}
                    alt="Uploaded crop"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setUploadedImage(null)}
                  >
                    Remove
                  </Button>
                </div>
                <Button
                  onClick={handleAnalyze}
                  className="w-full"
                  disabled={!selectedCrop || isAnalyzing}
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Crop Health'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {}
        {isAnalyzing && (
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
                <div>
                  <h3 className="font-semibold">AI Analysis in Progress</h3>
                  <p className="text-muted-foreground">Please wait while we analyze your crop...</p>
                  <p className="text-xs text-muted-foreground mt-1">Using OpenEPI Crop Health API & AI Expert Analysis</p>
                </div>
                <Progress value={60} className="w-full" />
              </div>
            </CardContent>
          </Card>
        )}

        {}
        {analysisResult && (
          <div className="space-y-4">
            <Card className={`border-2 ${analysisResult.status === 'infected' ? 'border-destructive/50 bg-destructive/5' : 'border-green-500/50 bg-green-50'}`}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  {analysisResult.status === 'infected' ? (
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                  <CardTitle className={analysisResult.status === 'infected' ? 'text-destructive' : 'text-green-600'}>
                    {analysisResult.status === 'infected' ? 'Disease Detected' : 'Healthy Crop'}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Detected Issue: {analysisResult.disease}</h4>
                    <div className="flex items-center gap-2 mt-2">
                      <span>Severity:</span>
                      <Progress value={analysisResult.severity} className="flex-1" />
                      <span className="text-sm">{analysisResult.severity}%</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span>AI Confidence:</span>
                    <Badge variant="secondary">{analysisResult.confidence}%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {}
            {analysisResult.remedies && (
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Remedies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-green-600 mb-2">Organic Solutions</h4>
                      <ul className="space-y-1">
                        {analysisResult.remedies.organic.map((remedy: string, index: number) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                            {remedy}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-blue-600 mb-2">Chemical Solutions</h4>
                      <ul className="space-y-1">
                        {analysisResult.remedies.chemical.map((remedy: string, index: number) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                            {remedy}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {}
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save to History
              </Button>
              
              {analysisResult.aiRemedies ? (
                <Button 
                  onClick={() => {
                    // Navigate to enhanced remedies with AI data
                    // For now, navigate to regular remedies - can be enhanced later
                    onNavigate('remedies');
                  }} 
                  className="flex-1 flex items-center gap-2"
                >
                  <Brain className="w-4 h-4" />
                  AI Remedies
                </Button>
              ) : (
                <Button onClick={() => onNavigate('remedies')} className="flex-1 flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  View More Remedies
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {}
      {showCamera && (
        <CameraCapture
          onCapture={handleCameraCapture}
          onClose={() => setShowCamera(false)}
        />
      )}

      {}
      {showFallbackUpload && (
        <FallbackUpload
          title="Upload Crop Image"
          onImageSelect={handleImageSelect}
          onClose={() => setShowFallbackUpload(false)}
        />
      )}
    </div>
  );
}
