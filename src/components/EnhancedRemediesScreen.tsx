import { useState, useEffect } from 'react';
import { ArrowLeft, Leaf, Beaker, Shield, Bookmark, ChevronDown, ChevronRight, Brain, AlertCircle, Target, Calendar, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Alert, AlertDescription } from './ui/alert';
import { Screen } from '../App';

interface EnhancedRemediesScreenProps {
  onNavigate: (screen: Screen) => void;
  detectedCrop: string;
  detectedDisease: string;
  confidence: number;
}

interface AIRemedyResponse {
  crop: string;
  disease: string;
  confidence: number;
  explanation: string;
  organicControl: {
    methods: string[];
    ingredients: string[];
    applicationSteps: string[];
  };
  chemicalControl: {
    pesticides: string[];
    dosage: string;
    safetyInstructions: string[];
    phiPeriod: string;
  };
  preventivePractices: string[];
  urgencyLevel: 'low' | 'medium' | 'high';
  seasonalConsiderations: string[];
}

export function EnhancedRemediesScreen({ 
  onNavigate, 
  detectedCrop, 
  detectedDisease, 
  confidence
}: EnhancedRemediesScreenProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [bookmarkedItems, setBookmarkedItems] = useState<string[]>([]);
  const [aiRemedies, setAiRemedies] = useState<AIRemedyResponse | null>(null);
  const [isGeneratingRemedies, setIsGeneratingRemedies] = useState(false);

  // Simulate AI-powered remedy generation based on detected disease
  const generateAIRemedies = async (crop: string, disease: string) => {
    setIsGeneratingRemedies(true);
    
    // This would be your actual AI API call
    // const prompt = `You are an agricultural expert and plant doctor. Based on the detected crop (${crop}) and disease (${disease}), provide clear and actionable remedies...`;
    
    // Simulated AI response - replace with actual API call
    setTimeout(() => {
      const mockAIResponse: AIRemedyResponse = {
        crop: crop,
        disease: disease,
        confidence: confidence || 0.93,
        explanation: `${disease} is a ${crop.toLowerCase() === 'cocoa' ? 'fungal' : 'bacterial'} infection that causes ${crop.toLowerCase() === 'cocoa' ? 'brown/black patches on pods, leading to crop loss if untreated' : 'yellowing and wilting of leaves, affecting plant vigor'}.`,
        organicControl: {
          methods: ['Neem-based spray application', 'Pruning infected parts', 'Copper sulfate treatment'],
          ingredients: ['Neem oil (10ml/L)', 'Liquid soap (2-3 drops)', 'Water (1L)'],
          applicationSteps: [
            'Remove and destroy infected plant parts immediately',
            'Mix neem oil with water and soap emulsifier',
            'Spray during early morning or late evening',
            'Repeat application every 7-10 days until symptoms reduce',
            'Maintain proper field sanitation'
          ]
        },
        chemicalControl: {
          pesticides: ['Copper Oxychloride 50% WP', 'Mancozeb 75% WP'],
          dosage: '2-3g per liter of water',
          safetyInstructions: [
            'Wear protective clothing and gloves',
            'Avoid spraying during windy conditions',
            'Do not spray during flowering period',
            'Store chemicals away from children and food'
          ],
          phiPeriod: '14 days before harvest'
        },
        preventivePractices: [
          'Ensure proper field drainage to prevent waterlogging',
          'Maintain adequate spacing between plants for air circulation',
          'Remove fallen leaves and pods regularly',
          'Practice crop rotation with non-host plants',
          'Use disease-resistant varieties when available',
          'Monitor field regularly for early detection'
        ],
        urgencyLevel: 'high',
        seasonalConsiderations: [
          'Most active during humid, warm weather conditions',
          'Increase monitoring during rainy season',
          'Apply preventive treatments before monsoon'
        ]
      };
      
      setAiRemedies(mockAIResponse);
      setIsGeneratingRemedies(false);
    }, 2000);
  };

  useEffect(() => {
    if (detectedCrop && detectedDisease) {
      generateAIRemedies(detectedCrop, detectedDisease);
    }
  }, [detectedCrop, detectedDisease]);

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const AIRemedySection = () => {
    if (!aiRemedies) return null;

    return (
      <div className="space-y-6">
        {/* Disease Overview */}
        <Card className="border-l-4 border-l-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-primary" />
                <div>
                  <CardTitle className="text-lg">AI-Generated Remedies</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    🌱 {aiRemedies.crop} • 🦠 {aiRemedies.disease}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={getUrgencyColor(aiRemedies.urgencyLevel)}>
                  {aiRemedies.urgencyLevel.toUpperCase()} PRIORITY
                </Badge>
                <Badge variant="outline">
                  {Math.round(aiRemedies.confidence * 100)}% Confidence
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Disease Explanation:</strong> {aiRemedies.explanation}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Organic Control */}
        <Card>
          <Collapsible>
            <CollapsibleTrigger
              className="w-full"
              onClick={() => toggleExpanded('organic-ai')}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Leaf className="w-5 h-5 text-green-600" />
                    <CardTitle>Organic Control Methods</CardTitle>
                  </div>
                  {expandedItems.includes('organic-ai') ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Recommended Methods
                    </h4>
                    <ul className="space-y-1">
                      {aiRemedies.organicControl.methods.map((method, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                          {method}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Ingredients Required</h4>
                    <div className="bg-green-50 p-3 rounded-lg">
                      {aiRemedies.organicControl.ingredients.map((ingredient, index) => (
                        <div key={index} className="text-sm text-green-800">
                          • {ingredient}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Step-by-Step Application</h4>
                    <ol className="space-y-2">
                      {aiRemedies.organicControl.applicationSteps.map((step, index) => (
                        <li key={index} className="flex gap-3 text-sm">
                          <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">
                            {index + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Chemical Control */}
        <Card>
          <Collapsible>
            <CollapsibleTrigger
              className="w-full"
              onClick={() => toggleExpanded('chemical-ai')}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Beaker className="w-5 h-5 text-blue-600" />
                    <CardTitle>Chemical Control (If Severe)</CardTitle>
                  </div>
                  {expandedItems.includes('chemical-ai') ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Recommended Pesticides</h4>
                    <div className="space-y-2">
                      {aiRemedies.chemicalControl.pesticides.map((pesticide, index) => (
                        <Badge key={index} variant="outline" className="mr-2 mb-1">
                          {pesticide}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Dosage</h4>
                    <p className="text-sm bg-blue-50 p-2 rounded text-blue-800">
                      {aiRemedies.chemicalControl.dosage}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-red-600">Safety Instructions</h4>
                    <ul className="space-y-1">
                      {aiRemedies.chemicalControl.safetyInstructions.map((instruction, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                          {instruction}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Alert>
                    <Calendar className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Pre-Harvest Interval (PHI):</strong> {aiRemedies.chemicalControl.phiPeriod}
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Preventive Practices */}
        <Card>
          <Collapsible>
            <CollapsibleTrigger
              className="w-full"
              onClick={() => toggleExpanded('preventive-ai')}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-purple-600" />
                    <CardTitle>Preventive Farming Practices</CardTitle>
                  </div>
                  {expandedItems.includes('preventive-ai') ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Long-term Prevention</h4>
                    <div className="grid gap-2">
                      {aiRemedies.preventivePractices.map((practice, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm p-2 bg-purple-50 rounded">
                          <Shield className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                          {practice}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Seasonal Considerations
                    </h4>
                    <ul className="space-y-1">
                      {aiRemedies.seasonalConsiderations.map((consideration, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                          {consideration}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Save & Bookmark */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => toggleBookmark('ai-remedy')}
            className={bookmarkedItems.includes('ai-remedy') ? 'text-primary border-primary' : ''}
          >
            <Bookmark className="w-4 h-4 mr-2" />
            {bookmarkedItems.includes('ai-remedy') ? 'Bookmarked' : 'Save Remedy'}
          </Button>
          
          <Button onClick={() => {/* Implement download/share functionality */}}>
            Download as PDF
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
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
          <h1 className="text-xl font-semibold">
            {detectedCrop && detectedDisease ? 'AI Crop Doctor Remedies' : 'Crop Doctor Remedies'}
          </h1>
        </div>
      </div>

      <div className="container-responsive max-w-7xl mx-auto p-4">
        {isGeneratingRemedies && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="text-center space-y-3">
                <Brain className="w-8 h-8 mx-auto text-primary animate-pulse" />
                <div>
                  <h3 className="font-semibold">Generating AI-Powered Remedies...</h3>
                  <p className="text-sm text-muted-foreground">
                    Analyzing {detectedCrop} for {detectedDisease} treatment options
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {aiRemedies && !isGeneratingRemedies && (
          <div className="mb-6">
            <AIRemedySection />
          </div>
        )}

        {(!detectedCrop || !detectedDisease) && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Upload an image in the Diagnosis screen to get AI-powered, crop-specific remedies.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}