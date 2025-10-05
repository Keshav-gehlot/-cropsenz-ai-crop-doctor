// AI-Powered Remedies Service
// Implements the agricultural expert prompt system as described

import { predictLikelyDiseases, getCropDiseaseCompatibilityScore } from './cropDiseaseMapping';

interface RemedyPromptData {
  crop: string;
  disease: string;
  confidence: number;
  location?: string;
  season?: string;
  farmSize?: string;
  previousTreatments?: string[];
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
    effectiveness: number;
  };
  chemicalControl: {
    pesticides: string[];
    dosage: string;
    safetyInstructions: string[];
    phiPeriod: string;
    effectiveness: number;
  };
  preventivePractices: string[];
  urgencyLevel: 'low' | 'medium' | 'high';
  seasonalConsiderations: string[];
  estimatedCost: {
    organic: string;
    chemical: string;
  };
  timeToSeeResults: string;
  followUpActions: string[];
}

class AIRemediesService {
  // private readonly AI_API_ENDPOINT = process.env.REACT_APP_AI_API_ENDPOINT || 'https://api.openai.com/v1/chat/completions';
  // private readonly AI_API_KEY = process.env.REACT_APP_AI_API_KEY;

  /**
   * Generate the agricultural expert prompt based on detected crop and disease
   */
  private generateExpertPrompt(data: RemedyPromptData): string {
    const basePrompt = `You are an agricultural expert and plant doctor with 20+ years of field experience. Based on the detected crop and disease from the Crop Health API, provide clear and actionable remedies.

DETECTED INFORMATION:
- Crop: ${data.crop}
- Disease: ${data.disease}
- Detection Confidence: ${Math.round(data.confidence * 100)}%
${data.location ? `- Location: ${data.location}` : ''}
${data.season ? `- Current Season: ${data.season}` : ''}
${data.farmSize ? `- Farm Size: ${data.farmSize}` : ''}
${data.previousTreatments?.length ? `- Previous Treatments: ${data.previousTreatments.join(', ')}` : ''}

PROVIDE A COMPREHENSIVE RESPONSE INCLUDING:

1. SHORT EXPLANATION OF THE DISEASE:
   - What causes this disease
   - How it spreads
   - Why it's harmful to ${data.crop}
   - Typical symptoms to watch for

2. ORGANIC CONTROL METHODS (PRIORITY):
   - List 3-5 effective organic treatments
   - Specific ingredients and quantities needed
   - Step-by-step application instructions
   - Expected effectiveness percentage
   - Best timing for application

3. CHEMICAL CONTROL (IF SEVERE INFESTATION):
   - Recommended approved pesticides/fungicides
   - Exact dosage and dilution ratios
   - Safety instructions and protective equipment needed
   - Pre-harvest interval (PHI) period
   - Application timing and frequency

4. PREVENTIVE FARMING PRACTICES:
   - Long-term practices to avoid recurrence
   - Crop rotation recommendations
   - Field management techniques
   - Monitoring strategies

5. ADDITIONAL FARMER-FRIENDLY INFORMATION:
   - Urgency level (low/medium/high)
   - Seasonal considerations
   - Estimated treatment costs
   - Time to see visible results
   - Follow-up actions needed

Make the response simple, step-by-step, and farmer-friendly. Use local agricultural terminology when possible. Focus on practical, actionable advice that a farmer can implement immediately.

RESPONSE FORMAT: Provide a structured JSON response that can be easily parsed and displayed in a mobile app interface.`;

    return basePrompt;
  }

  /**
   * Call AI API to generate remedies
   */
  async generateRemedies(data: RemedyPromptData): Promise<AIRemedyResponse> {
    try {
      // Validate crop-disease compatibility
      const compatibilityScore = getCropDiseaseCompatibilityScore(data.crop, data.disease);
      
      // If low compatibility, suggest more likely diseases
      if (compatibilityScore < 0.5) {
        const likelyDiseases = predictLikelyDiseases(data.crop);
        console.warn(`Low compatibility for ${data.crop} + ${data.disease}. Consider: ${likelyDiseases.join(', ')}`);
      }

      // const prompt = this.generateExpertPrompt(data);

      // For development - return mock data
      // In production, uncomment the actual API call below
      return this.getMockResponse(data);

      /* PRODUCTION API CALL - Uncomment when ready
      const response = await fetch(this.AI_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.AI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are an expert agricultural consultant specializing in crop disease management and sustainable farming practices.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        throw new Error(`AI API Error: ${response.status}`);
      }

      const result = await response.json();
      const aiResponse = JSON.parse(result.choices[0].message.content);
      
      return aiResponse;
      */
    } catch (error) {
      console.error('AI Remedies generation error:', error);
      // Fallback to mock response on error
      return this.getMockResponse(data);
    }
  }

  /**
   * Generate mock response for development and fallback
   */
  private getMockResponse(data: RemedyPromptData): AIRemedyResponse {
    // Comprehensive disease database for all crops in the project
    const diseaseDatabase: Record<string, Partial<AIRemedyResponse>> = {
      // WHEAT DISEASES
      'Wheat Rust': {
        explanation: 'Wheat rust is a fungal disease caused by Puccinia species that affects wheat leaves and stems, causing orange-red pustules and reducing grain yield significantly.',
        organicControl: {
          methods: ['Neem oil spray', 'Sulfur dust application', 'Trichoderma treatment', 'Resistant variety selection'],
          ingredients: ['Neem oil (10ml per liter)', 'Wettable sulfur (3g per liter)', 'Trichoderma powder (5g per liter)'],
          applicationSteps: [
            'Apply neem oil spray early morning or evening',
            'Dust sulfur powder on affected leaves',
            'Use Trichoderma as soil treatment',
            'Remove infected plant debris',
            'Ensure proper field drainage'
          ],
          effectiveness: 75
        },
        chemicalControl: {
          pesticides: ['Propiconazole 25% EC', 'Tebuconazole 10% + Sulfur 65% WG', 'Mancozeb 75% WP'],
          dosage: '1ml per liter (Propiconazole), 2g per liter (Tebuconazole mix)',
          safetyInstructions: [
            'Wear protective clothing and gloves',
            'Avoid spraying during flowering',
            'Do not graze animals in treated field for 7 days',
            'Maintain 15-day interval between sprays'
          ],
          phiPeriod: '35 days before harvest',
          effectiveness: 92
        },
        preventivePractices: [
          'Plant rust-resistant wheat varieties like HD-2967, DBW-88',
          'Maintain proper spacing between plants for air circulation',
          'Avoid excessive nitrogen fertilization',
          'Practice crop rotation with non-cereal crops',
          'Monitor weather for conducive conditions (cool, moist)'
        ],
        urgencyLevel: 'high' as const,
        seasonalConsiderations: [
          'Most active during cool, humid weather (15-25°C)',
          'Monitor closely during rabi season flowering stage',
          'Apply fungicide before rust season begins'
        ],
        estimatedCost: {
          organic: '₹600-900 per acre',
          chemical: '₹1200-1800 per acre'
        },
        timeToSeeResults: '5-10 days for symptom reduction',
        followUpActions: [
          'Continue monitoring for 2-3 weeks',
          'Apply second spray if symptoms persist',
          'Use resistant varieties in next season'
        ]
      },

      'Wheat Blight': {
        explanation: 'Wheat blight includes leaf blight and head blight caused by Alternaria and Fusarium species, leading to dark spots on leaves and grain quality reduction.',
        organicControl: {
          methods: ['Copper-based fungicide', 'Neem cake soil application', 'Baking soda spray'],
          ingredients: ['Copper sulfate (2g per liter)', 'Neem cake (250kg per acre)', 'Baking soda (5g per liter)'],
          applicationSteps: [
            'Apply copper sulfate spray on affected areas',
            'Mix neem cake in soil during preparation',
            'Use baking soda spray as preventive measure',
            'Ensure proper field sanitation'
          ],
          effectiveness: 70
        },
        urgencyLevel: 'medium' as const
      },

      // RICE DISEASES
      'Rice Blast': {
        explanation: 'Rice blast is caused by Magnaporthe oryzae fungus, creating diamond-shaped lesions on leaves and affecting panicles, potentially causing 50-90% yield loss.',
        organicControl: {
          methods: ['Silicon application', 'Neem oil treatment', 'Pseudomonas fluorescens', 'Organic matter enhancement'],
          ingredients: ['Silicon fertilizer (100kg per acre)', 'Neem oil (15ml per liter)', 'Pseudomonas (10g per liter)'],
          applicationSteps: [
            'Apply silicon fertilizer to strengthen plant cell walls',
            'Spray neem oil solution during early infection',
            'Use Pseudomonas as seed treatment and foliar spray',
            'Maintain proper water management',
            'Remove infected plant debris'
          ],
          effectiveness: 78
        },
        chemicalControl: {
          pesticides: ['Tricyclazole 75% WP', 'Carbendazim 50% WP', 'Kasugamycin 3% SL'],
          dosage: '0.6g per liter (Tricyclazole), 1g per liter (Carbendazim)',
          safetyInstructions: [
            'Wear protective gear during application',
            'Avoid spraying during windy conditions',
            'Do not apply during flowering stage',
            'Maintain recommended spray intervals'
          ],
          phiPeriod: '21 days before harvest',
          effectiveness: 94
        },
        preventivePractices: [
          'Use blast-resistant varieties like Pusa-44, CSR-30',
          'Maintain balanced fertilization (avoid excess nitrogen)',
          'Practice alternate wetting and drying irrigation',
          'Plant at recommended spacing (20x15 cm)',
          'Monitor field regularly during tillering stage'
        ],
        urgencyLevel: 'high' as const
      },

      'Brown Plant Hopper': {
        explanation: 'Brown Plant Hopper (BPH) is a major rice pest that sucks plant sap, causes hopper burn, and transmits viral diseases, leading to severe yield losses.',
        organicControl: {
          methods: ['Neem-based insecticide', 'Light trap installation', 'Biological control agents'],
          ingredients: ['Neem oil (20ml per liter)', 'Azadirachtin 0.03% (5ml per liter)'],
          applicationSteps: [
            'Install light traps to monitor and catch adults',
            'Spray neem oil solution during early nymph stage',
            'Release biological control agents like spiders',
            'Maintain proper water level management'
          ],
          effectiveness: 72
        },
        urgencyLevel: 'high' as const
      },

      // MAIZE DISEASES
      'Maize Borer': {
        explanation: 'Maize stem borer larvae bore into stalks and ears, causing structural damage, lodging, and yield reduction in corn crops.',
        organicControl: {
          methods: ['Bt spraying', 'Trichogramma release', 'Neem kernel extract'],
          ingredients: ['Bt solution (2g per liter)', 'Neem kernel extract (50g per liter)'],
          applicationSteps: [
            'Release Trichogramma parasitoids at 15-day intervals',
            'Apply Bt spray during early larval stage',
            'Use neem kernel extract as deterrent',
            'Remove and destroy infested plants'
          ],
          effectiveness: 80
        },
        urgencyLevel: 'medium' as const
      },

      'Fall Army Worm': {
        explanation: 'Fall Army Worm is an invasive pest affecting maize, causing severe defoliation and yield losses. Early detection and treatment are crucial.',
        organicControl: {
          methods: ['Neem-based spray', 'Bacillus thuringiensis', 'Pheromone traps'],
          ingredients: ['Neem oil (15ml per liter)', 'Bt powder (2g per liter)'],
          applicationSteps: [
            'Install pheromone traps for early detection',
            'Apply Bt spray targeting young larvae',
            'Use neem oil spray during evening hours',
            'Hand-pick egg masses and destroy'
          ],
          effectiveness: 75
        },
        urgencyLevel: 'high' as const
      },

      // COTTON DISEASES
      'Cotton Bollworm': {
        explanation: 'Cotton bollworm larvae feed on cotton bolls, flowers, and leaves, causing direct damage to yield and quality of cotton fiber.',
        organicControl: {
          methods: ['Bt cotton varieties', 'NPV application', 'Intercropping with marigold'],
          ingredients: ['NPV (250 LE per acre)', 'Neem oil (10ml per liter)'],
          applicationSteps: [
            'Use Bt cotton varieties as primary defense',
            'Apply NPV during early larval stage',
            'Intercrop with marigold for natural deterrent',
            'Monitor using pheromone traps'
          ],
          effectiveness: 85
        },
        urgencyLevel: 'high' as const
      },

      'Cotton Leaf Curl': {
        explanation: 'Cotton Leaf Curl Virus transmitted by whiteflies causes leaf curling, stunting, and severe yield reduction in cotton crops.',
        organicControl: {
          methods: ['Whitefly management', 'Reflective mulch', 'Resistant varieties'],
          ingredients: ['Neem oil (15ml per liter)', 'Yellow sticky traps'],
          applicationSteps: [
            'Plant virus-resistant cotton varieties',
            'Use reflective mulch to deter whiteflies',
            'Install yellow sticky traps',
            'Apply neem oil spray for whitefly control'
          ],
          effectiveness: 70
        },
        urgencyLevel: 'high' as const
      },

      // SUGARCANE DISEASES
      'Sugarcane Red Rot': {
        explanation: 'Red rot is a serious fungal disease of sugarcane caused by Colletotrichum falcatum, affecting stalks and reducing sugar content significantly.',
        organicControl: {
          methods: ['Hot water treatment', 'Trichoderma application', 'Resistant variety selection'],
          ingredients: ['Trichoderma (5kg per acre)', 'Copper sulfate (2g per liter)'],
          applicationSteps: [
            'Use hot water treatment for seed cane (50°C for 2 hours)',
            'Apply Trichoderma in soil before planting',
            'Remove and burn infected canes',
            'Maintain proper field drainage'
          ],
          effectiveness: 75
        },
        urgencyLevel: 'high' as const
      },

      // SOYBEAN DISEASES
      'Soybean Rust': {
        explanation: 'Soybean rust caused by Phakopsora pachyrhizi creates small pustules on leaves, leading to premature defoliation and yield loss.',
        organicControl: {
          methods: ['Sulfur dusting', 'Neem oil spray', 'Resistant varieties'],
          ingredients: ['Wettable sulfur (3g per liter)', 'Neem oil (10ml per liter)'],
          applicationSteps: [
            'Apply sulfur dust on lower leaf surfaces',
            'Spray neem oil during early infection',
            'Use rust-resistant soybean varieties',
            'Ensure adequate plant spacing'
          ],
          effectiveness: 72
        },
        urgencyLevel: 'medium' as const
      },

      // TOMATO DISEASES
      'Late Blight': {
        explanation: 'Late Blight is a devastating disease caused by Phytophthora infestans that affects tomatoes and potatoes. It spreads rapidly in cool, humid conditions and can destroy entire crops within days.',
        organicControl: {
          methods: ['Baking soda spray', 'Milk solution treatment', 'Copper-based fungicides', 'Companion planting with marigold'],
          ingredients: ['Baking soda (5g per liter)', 'Milk (100ml per liter)', 'Copper sulfate (2g per liter)', 'Neem oil (10ml per liter)'],
          applicationSteps: [
            'Remove affected leaves and fruits immediately',
            'Apply baking soda solution in early morning',
            'Spray milk solution weekly as preventive measure',
            'Use copper fungicide during high risk periods',
            'Ensure good air circulation around plants'
          ],
          effectiveness: 72
        },
        chemicalControl: {
          pesticides: ['Mancozeb 75% WP', 'Chlorothalonil', 'Cymoxanil + Mancozeb'],
          dosage: '2g per liter of water',
          safetyInstructions: [
            'Wear protective equipment including gloves and mask',
            'Spray during calm weather conditions',
            'Avoid spraying near water sources',
            'Follow label instructions strictly'
          ],
          phiPeriod: '7-14 days depending on chemical used',
          effectiveness: 88
        },
        preventivePractices: [
          'Use drip irrigation instead of overhead watering',
          'Provide adequate spacing for air circulation',
          'Remove plant debris regularly',
          'Practice crop rotation with non-host plants',
          'Use resistant varieties when available'
        ],
        urgencyLevel: 'high' as const,
        seasonalConsiderations: [
          'Most active during cool, humid weather (15-20°C)',
          'Monitor closely during monsoon season',
          'Apply preventive sprays before humid periods'
        ],
        estimatedCost: {
          organic: '₹500-800 per acre',
          chemical: '₹1000-1500 per acre'
        },
        timeToSeeResults: '3-7 days for symptom control',
        followUpActions: [
          'Continue monitoring for new infections',
          'Apply follow-up spray after 7-10 days',
          'Improve field drainage system'
        ]
      },

      'Tomato Leaf Curl': {
        explanation: 'Tomato Leaf Curl Virus transmitted by whiteflies causes severe leaf curling, stunting, and yield reduction in tomato crops.',
        organicControl: {
          methods: ['Whitefly control', 'Reflective mulch', 'Resistant varieties', 'Yellow sticky traps'],
          ingredients: ['Neem oil (15ml per liter)', 'Insecticidal soap (5ml per liter)'],
          applicationSteps: [
            'Plant virus-resistant tomato varieties',
            'Install yellow sticky traps to catch whiteflies',
            'Use reflective silver mulch around plants',
            'Apply neem oil spray for whitefly management'
          ],
          effectiveness: 68
        },
        urgencyLevel: 'high' as const
      },

      // POTATO DISEASES
      'Potato Blight': {
        explanation: 'Potato blight (Late blight) caused by Phytophthora infestans affects leaves, stems, and tubers, causing dark lesions and crop failure.',
        organicControl: {
          methods: ['Copper fungicide', 'Bordeaux mixture', 'Proper hilling'],
          ingredients: ['Copper sulfate (2.5g per liter)', 'Lime (2.5g per liter)'],
          applicationSteps: [
            'Apply Bordeaux mixture as preventive spray',
            'Hill soil around plants to protect tubers',
            'Remove infected plant parts immediately',
            'Ensure proper field drainage'
          ],
          effectiveness: 75
        },
        urgencyLevel: 'high' as const
      },

      // ONION DISEASES
      'Onion Purple Blotch': {
        explanation: 'Purple blotch is a fungal disease affecting onion leaves and bulbs, causing purple-colored lesions and reducing bulb quality.',
        organicControl: {
          methods: ['Copper spray', 'Proper spacing', 'Crop rotation'],
          ingredients: ['Copper oxychloride (2g per liter)', 'Neem oil (10ml per liter)'],
          applicationSteps: [
            'Apply copper spray during early infection',
            'Maintain proper plant spacing for air circulation',
            'Remove infected plant debris',
            'Practice 3-year crop rotation'
          ],
          effectiveness: 70
        },
        urgencyLevel: 'medium' as const
      },

      // CHILI DISEASES
      'Chili Anthracnose': {
        explanation: 'Anthracnose in chili causes dark, sunken lesions on fruits and leaves, leading to premature fruit drop and quality loss.',
        organicControl: {
          methods: ['Copper fungicide', 'Hot water treatment', 'Seed treatment'],
          ingredients: ['Copper sulfate (2g per liter)', 'Trichoderma (4g per kg seed)'],
          applicationSteps: [
            'Treat seeds with hot water before sowing',
            'Apply copper spray during fruit development',
            'Use Trichoderma as seed and soil treatment',
            'Maintain proper field sanitation'
          ],
          effectiveness: 74
        },
        urgencyLevel: 'medium' as const
      },

      // GROUNDNUT DISEASES
      'Groundnut Leaf Spot': {
        explanation: 'Leaf spot diseases (early and late leaf spot) in groundnut cause defoliation and pod yield reduction, affecting oil content.',
        organicControl: {
          methods: ['Sulfur dusting', 'Neem cake application', 'Resistant varieties'],
          ingredients: ['Wettable sulfur (3g per liter)', 'Neem cake (200kg per acre)'],
          applicationSteps: [
            'Apply sulfur dust on affected leaves',
            'Mix neem cake in soil during preparation',
            'Use leaf spot resistant groundnut varieties',
            'Maintain proper crop rotation'
          ],
          effectiveness: 76
        },
        urgencyLevel: 'medium' as const
      },

      // SUNFLOWER DISEASES
      'Sunflower Rust': {
        explanation: 'Sunflower rust causes orange pustules on leaves, reducing photosynthesis and affecting seed yield and oil content.',
        organicControl: {
          methods: ['Sulfur application', 'Resistant varieties', 'Proper spacing'],
          ingredients: ['Wettable sulfur (2g per liter)', 'Neem oil (8ml per liter)'],
          applicationSteps: [
            'Apply sulfur spray on lower leaf surfaces',
            'Plant rust-resistant sunflower varieties',
            'Maintain adequate row spacing',
            'Remove infected plant debris'
          ],
          effectiveness: 73
        },
        urgencyLevel: 'low' as const
      },

      // GENERIC/FALLBACK DISEASES
      'Leaf Blight': {
        explanation: 'Leaf blight affects various crops causing dark spots and lesions on leaves, reducing photosynthesis and overall plant vigor.',
        organicControl: {
          methods: ['Copper fungicide', 'Neem oil spray', 'Proper sanitation'],
          ingredients: ['Copper sulfate (2g per liter)', 'Neem oil (10ml per liter)'],
          applicationSteps: [
            'Remove infected leaves immediately',
            'Apply copper fungicide spray',
            'Use neem oil as organic alternative',
            'Maintain field cleanliness'
          ],
          effectiveness: 70
        },
        urgencyLevel: 'medium' as const
      }
    };

    // Intelligent disease mapping - if the detected disease isn't in our database,
    // try to find the most appropriate one for the crop
    let selectedDisease = data.disease;
    if (!diseaseDatabase[data.disease]) {
      const likelyDiseases = predictLikelyDiseases(data.crop);
      selectedDisease = likelyDiseases[0] || 'Leaf Blight';
      console.log(`Disease "${data.disease}" not found. Using "${selectedDisease}" for ${data.crop}`);
    }

    const template = diseaseDatabase[selectedDisease] || diseaseDatabase['Leaf Blight']!;
    
    return {
      crop: data.crop,
      disease: data.disease,
      confidence: data.confidence,
      explanation: template?.explanation || `${data.disease} is a common plant disease affecting ${data.crop}. Early detection and treatment are crucial for effective management.`,
      organicControl: template?.organicControl || {
        methods: ['Neem oil application', 'Pruning affected parts'],
        ingredients: ['Neem oil', 'Water', 'Liquid soap'],
        applicationSteps: ['Remove infected parts', 'Apply neem oil solution', 'Monitor regularly'],
        effectiveness: 70
      },
      chemicalControl: template?.chemicalControl || {
        pesticides: ['Copper-based fungicide'],
        dosage: '2g per liter',
        safetyInstructions: ['Wear protective gear', 'Follow label instructions'],
        phiPeriod: '14 days',
        effectiveness: 85
      },
      preventivePractices: template?.preventivePractices || [
        'Maintain field hygiene',
        'Ensure proper drainage',
        'Practice crop rotation'
      ],
      urgencyLevel: template?.urgencyLevel || 'medium',
      seasonalConsiderations: template?.seasonalConsiderations || [
        'Monitor during humid weather',
        'Increase vigilance during growing season'
      ],
      estimatedCost: template?.estimatedCost || {
        organic: '₹500-800 per acre',
        chemical: '₹1000-1500 per acre'
      },
      timeToSeeResults: template?.timeToSeeResults || '7-10 days',
      followUpActions: template?.followUpActions || [
        'Continue monitoring',
        'Apply follow-up treatment if needed',
        'Maintain preventive practices'
      ]
    };
  }

  /**
   * Get location-specific considerations
   */
  async getLocationSpecificAdvice(_crop: string, _disease: string, location: string): Promise<string[]> {
    // This could integrate with weather APIs, local agricultural extensions, etc.
    const locationAdvice: Record<string, string[]> = {
      'India': [
        'Consider monsoon timing for treatment applications',
        'Check with local Krishi Vigyan Kendra for region-specific varieties',
        'Follow Indian pesticide regulations and PHI periods'
      ],
      'Africa': [
        'Account for dry/wet season variations',
        'Use locally available organic materials',
        'Consider smallholder farming constraints'
      ]
    };

    return locationAdvice[location] || [
      'Consult local agricultural extension services',
      'Consider regional climate patterns',
      'Use locally approved pesticides only'
    ];
  }
}

// Singleton instance
export const aiRemediesService = new AIRemediesService();

// Export types
export type { RemedyPromptData, AIRemedyResponse };