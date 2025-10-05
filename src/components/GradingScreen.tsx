import { useState } from 'react';
import { ArrowLeft, Camera, Upload, Download, Share, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Screen } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface GradingScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface GradingResult {
  grade: string;
  score: number;
  parameters: {
    [key: string]: number;
  };
  recommendations: string[];
  classification: string;
  marketValue: string;
  recommendation: string;
}

export function GradingScreen({ onNavigate }: GradingScreenProps) {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isGrading, setIsGrading] = useState(false);
  const [gradingResult, setGradingResult] = useState<GradingResult | null>(null);

  const handleImageUpload = () => {
    const newImages = [
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=200&h=200&fit=crop'
    ];
    setUploadedImages([...uploadedImages, ...newImages.slice(0, 2)]);
  };

  const handleGradeAnalysis = () => {
    setIsGrading(true);
    setTimeout(() => {
      setGradingResult({
        grade: 'A',
        score: 92,
        parameters: {
          color: 95,
          size: 88,
          texture: 94,
          moisture: 89
        },
        classification: 'Export Quality',
        marketValue: '₹2,450/quintal',
        recommendation: 'Excellent quality crop suitable for export market. Hold for better prices if storage facilities are available.',
        recommendations: [
          'Store in moisture-free environment',
          'Maintain optimal temperature',
          'Handle with care to preserve quality'
        ]
      });
      setIsGrading(false);
    }, 2500);
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'bg-green-500';
      case 'B': return 'bg-yellow-500';
      case 'C': return 'bg-orange-500';
      default: return 'bg-gray-500';
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
          <h1 className="text-xl font-semibold">Crop Quality Grading</h1>
        </div>
      </div>

      <div className="container-responsive max-w-7xl mx-auto p-4 space-y-6">
        {}
        <Card>
          <CardHeader>
            <CardTitle>Upload Crop Images</CardTitle>
            <p className="text-sm text-muted-foreground">
              Upload multiple images for better accuracy
            </p>
          </CardHeader>
          <CardContent>
            {uploadedImages.length === 0 ? (
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  Upload clear images of your harvested crop
                </p>
                <div className="flex gap-2 justify-center">
                  <Button onClick={handleImageUpload} className="flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    Add Images
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative">
                      <ImageWithFallback
                        src={image}
                        alt={`Crop image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleImageUpload} className="flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    Add More
                  </Button>
                  <Button
                    onClick={handleGradeAnalysis}
                    className="flex-1"
                    disabled={isGrading}
                  >
                    {isGrading ? 'Analyzing Quality...' : 'Analyze Quality'}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {}
        {isGrading && (
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8 text-primary animate-pulse" />
                </div>
                <div>
                  <h3 className="font-semibold">Quality Analysis in Progress</h3>
                  <p className="text-muted-foreground">Evaluating color, size, texture, and moisture...</p>
                </div>
                <Progress value={75} className="w-full" />
              </div>
            </CardContent>
          </Card>
        )}

        {}
        {gradingResult && (
          <div className="space-y-4">
            {}
            <Card className="border-2 border-green-500/50 bg-green-50">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className={`w-20 h-20 ${getGradeColor(gradingResult.grade)} rounded-full flex items-center justify-center mx-auto`}>
                    <span className="text-2xl font-bold text-white">
                      {gradingResult.grade}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Grade {gradingResult.grade}</h3>
                    <p className="text-lg text-green-600 font-semibold">
                      {gradingResult.classification}
                    </p>
                    <p className="text-muted-foreground">
                      Overall Score: {gradingResult.score}/100
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    {gradingResult.marketValue}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {}
            <Card>
              <CardHeader>
                <CardTitle>Quality Parameters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(gradingResult.parameters).map(([param, score]) => (
                    <div key={param} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="capitalize font-medium">{param}</span>
                        <span className="text-sm">{score}/100</span>
                      </div>
                      <Progress value={score as number} className="w-full" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {}
            <Card>
              <CardHeader>
                <CardTitle>Market Recommendation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground">{gradingResult.recommendation}</p>
              </CardContent>
            </Card>

            {}
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download Report
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Share className="w-4 h-4" />
                Share Report
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
