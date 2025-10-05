import { useState } from 'react';
import { ArrowLeft, Leaf, Beaker, Shield, Bookmark, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Screen } from '../App';

interface RemediesScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function RemediesScreen({ onNavigate }: RemediesScreenProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [bookmarkedItems, setBookmarkedItems] = useState<string[]>([]);

  const organicRemedies = [
    {
      id: 'neem-oil',
      title: 'Neem Oil Spray',
      disease: 'Aphids, Whiteflies',
      dosage: '10ml per liter of water',
      steps: [
        'Mix 10ml neem oil with 1 liter water',
        'Add 2-3 drops of liquid soap as emulsifier',
        'Spray during early morning or evening',
        'Repeat every 7-10 days'
      ],
      effectiveness: 85
    },
    {
      id: 'garlic-chili',
      title: 'Garlic-Chili Extract',
      disease: 'Pest Deterrent',
      dosage: '50ml per liter of water',
      steps: [
        'Blend 100g garlic + 50g chili with 1L water',
        'Strain the mixture thoroughly',
        'Dilute 1:20 before spraying',
        'Apply weekly for prevention'
      ],
      effectiveness: 78
    },
    {
      id: 'turmeric-paste',
      title: 'Turmeric Paste',
      disease: 'Fungal Infections',
      dosage: '20g per liter of water',
      steps: [
        'Mix turmeric powder with water to form paste',
        'Add to spray tank with water',
        'Apply to affected areas',
        'Reapply after rain'
      ],
      effectiveness: 70
    }
  ];

  const chemicalRemedies = [
    {
      id: 'mancozeb',
      title: 'Mancozeb 75% WP',
      disease: 'Late Blight, Downy Mildew',
      dosage: '2g per liter of water',
      steps: [
        'Dissolve 2g in small amount of water',
        'Add to spray tank and mix well',
        'Spray uniformly on crop',
        'Maintain 7-day spray interval'
      ],
      effectiveness: 95,
      precautions: ['Wear protective gear', 'Avoid spraying during flowering', 'Follow PHI period']
    },
    {
      id: 'imidacloprid',
      title: 'Imidacloprid 17.8% SL',
      disease: 'Sucking Pests',
      dosage: '0.5ml per liter of water',
      steps: [
        'Measure required quantity carefully',
        'Mix with water in spray tank',
        'Apply as foliar spray',
        'Do not exceed recommended dose'
      ],
      effectiveness: 92,
      precautions: ['Toxic to bees', 'Use during evening hours', 'Store away from children']
    }
  ];

  const preventiveMeasures = [
    {
      id: 'crop-rotation',
      title: 'Crop Rotation',
      description: 'Rotate crops every season to break pest and disease cycles',
      benefits: ['Soil health improvement', 'Pest reduction', 'Nutrient management']
    },
    {
      id: 'companion-planting',
      title: 'Companion Planting',
      description: 'Plant marigold, basil around main crops as natural pest deterrents',
      benefits: ['Natural pest control', 'Improved biodiversity', 'Better pollination']
    },
    {
      id: 'proper-drainage',
      title: 'Proper Drainage',
      description: 'Maintain good water drainage to prevent fungal diseases',
      benefits: ['Disease prevention', 'Root health', 'Better aeration']
    }
  ];

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

  const RemedyCard = ({ remedy, type }: { remedy: any; type: 'organic' | 'chemical' }) => (
    <Card key={remedy.id} className="hover:shadow-md transition-shadow">
      <Collapsible>
        <CollapsibleTrigger
          className="w-full"
          onClick={() => toggleExpanded(remedy.id)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-left">
                {type === 'organic' ? (
                  <Leaf className="w-5 h-5 text-green-600" />
                ) : (
                  <Beaker className="w-5 h-5 text-blue-600" />
                )}
                <div>
                  <CardTitle className="text-base">{remedy.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{remedy.disease}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{remedy.effectiveness}%</Badge>
                {expandedItems.includes(remedy.id) ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm mb-2">Dosage</h4>
                <p className="text-sm bg-muted p-2 rounded">{remedy.dosage}</p>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">Application Steps</h4>
                <ol className="text-sm space-y-1">
                  {remedy.steps.map((step: string, index: number) => (
                    <li key={index} className="flex gap-2">
                      <span className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {remedy.precautions && (
                <div>
                  <h4 className="font-semibold text-sm mb-2 text-red-600">Precautions</h4>
                  <ul className="text-sm space-y-1">
                    {remedy.precautions.map((precaution: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                        {precaution}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleBookmark(remedy.id)}
                  className={bookmarkedItems.includes(remedy.id) ? 'text-primary' : ''}
                >
                  <Bookmark className="w-4 h-4 mr-1" />
                  {bookmarkedItems.includes(remedy.id) ? 'Bookmarked' : 'Bookmark'}
                </Button>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );

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
          <h1 className="text-xl font-semibold">Crop Doctor Remedies</h1>
        </div>
      </div>

      <div className="container-responsive max-w-7xl mx-auto p-4">
        <Tabs defaultValue="organic" className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="organic" className="flex items-center gap-1">
              <Leaf className="w-4 h-4" />
              Organic
            </TabsTrigger>
            <TabsTrigger value="chemical" className="flex items-center gap-1">
              <Beaker className="w-4 h-4" />
              Chemical
            </TabsTrigger>
            <TabsTrigger value="preventive" className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              Preventive
            </TabsTrigger>
          </TabsList>

          <TabsContent value="organic" className="space-y-4">
            <div className="mb-4">
              <h3 className="font-semibold text-green-600 mb-2">Organic Solutions</h3>
              <p className="text-sm text-muted-foreground">
                Natural and eco-friendly remedies for crop protection
              </p>
            </div>

            <div className="space-y-3">
              {organicRemedies.map((remedy) => (
                <RemedyCard key={remedy.id} remedy={remedy} type="organic" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="chemical" className="space-y-4">
            <div className="mb-4">
              <h3 className="font-semibold text-blue-600 mb-2">Chemical Solutions</h3>
              <p className="text-sm text-muted-foreground">
                Effective chemical treatments for severe infestations
              </p>
            </div>

            <div className="space-y-3">
              {chemicalRemedies.map((remedy) => (
                <RemedyCard key={remedy.id} remedy={remedy} type="chemical" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="preventive" className="space-y-4">
            <div className="mb-4">
              <h3 className="font-semibold text-purple-600 mb-2">Preventive Measures</h3>
              <p className="text-sm text-muted-foreground">
                Best practices to prevent crop diseases and pest infestations
              </p>
            </div>

            <div className="space-y-3">
              {preventiveMeasures.map((measure) => (
                <Card key={measure.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-purple-600" />
                      <CardTitle className="text-base">{measure.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">{measure.description}</p>
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Benefits</h4>
                      <div className="flex flex-wrap gap-1">
                        {measure.benefits.map((benefit, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
