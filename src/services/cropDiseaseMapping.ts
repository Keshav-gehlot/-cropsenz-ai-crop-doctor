// Crop-specific disease mapping and intelligent detection
// Maps crops to their common diseases for better AI predictions

export interface CropDiseaseMapping {
  crop: string;
  commonDiseases: string[];
  vulnerableSeason: string[];
  resistantVarieties: string[];
  primaryThreats: string[];
}

export const cropDiseaseDatabase: Record<string, CropDiseaseMapping> = {
  'Wheat': {
    crop: 'Wheat',
    commonDiseases: [
      'Wheat Rust', 'Wheat Blight', 'Leaf Blight', 'Powdery Mildew', 
      'Karnal Bunt', 'Loose Smut', 'Black Rust', 'Yellow Rust'
    ],
    vulnerableSeason: ['Rabi season', 'Post-flowering', 'High humidity periods'],
    resistantVarieties: ['HD-2967', 'DBW-88', 'PBW-343', 'HD-3086'],
    primaryThreats: ['Wheat Rust', 'Wheat Blight']
  },

  'Rice': {
    crop: 'Rice',
    commonDiseases: [
      'Rice Blast', 'Brown Plant Hopper', 'Leaf Blight', 'Bacterial Blight',
      'Sheath Blight', 'False Smut', 'Tungro Virus'
    ],
    vulnerableSeason: ['Kharif season', 'Tillering stage', 'Panicle emergence'],
    resistantVarieties: ['Pusa-44', 'CSR-30', 'Swarna', 'IR-64'],
    primaryThreats: ['Rice Blast', 'Brown Plant Hopper']
  },

  'Maize': {
    crop: 'Maize',
    commonDiseases: [
      'Fall Army Worm', 'Maize Borer', 'Leaf Blight', 'Common Rust',
      'Gray Leaf Spot', 'Northern Corn Leaf Blight'
    ],
    vulnerableSeason: ['Kharif season', 'Vegetative growth', 'Tasseling stage'],
    resistantVarieties: ['DHM-117', 'PEHM-2', 'Shaktiman-1'],
    primaryThreats: ['Fall Army Worm', 'Maize Borer']
  },

  'Cotton': {
    crop: 'Cotton',
    commonDiseases: [
      'Cotton Bollworm', 'Cotton Leaf Curl', 'Leaf Blight', 'Pink Bollworm',
      'Whitefly', 'Thrips', 'Fusarium Wilt'
    ],
    vulnerableSeason: ['Flowering stage', 'Boll formation', 'Post-monsoon'],
    resistantVarieties: ['Bt Cotton varieties', 'RCH-317', 'MRC-6918'],
    primaryThreats: ['Cotton Bollworm', 'Cotton Leaf Curl']
  },

  'Sugarcane': {
    crop: 'Sugarcane',
    commonDiseases: [
      'Sugarcane Red Rot', 'Leaf Blight', 'Smut', 'Wilt Disease',
      'Scale Insect', 'Pyrilla'
    ],
    vulnerableSeason: ['Monsoon season', 'High humidity', 'Waterlogged conditions'],
    resistantVarieties: ['Co-86032', 'CoM-265', 'Co-238'],
    primaryThreats: ['Sugarcane Red Rot']
  },

  'Soybean': {
    crop: 'Soybean',
    commonDiseases: [
      'Soybean Rust', 'Leaf Blight', 'Pod Borer', 'Yellow Mosaic Virus',
      'Bacterial Pustule', 'Frogeye Leaf Spot'
    ],
    vulnerableSeason: ['Kharif season', 'Pod filling stage', 'High humidity'],
    resistantVarieties: ['JS-335', 'MACS-450', 'KDS-344'],
    primaryThreats: ['Soybean Rust', 'Pod Borer']
  },

  'Tomato': {
    crop: 'Tomato',
    commonDiseases: [
      'Late Blight', 'Tomato Leaf Curl', 'Leaf Blight', 'Early Blight',
      'Bacterial Wilt', 'Fruit Rot', 'Whitefly'
    ],
    vulnerableSeason: ['Monsoon season', 'High humidity', 'Cool nights'],
    resistantVarieties: ['Arka Vikas', 'Pusa Ruby', 'Hisar Arun'],
    primaryThreats: ['Late Blight', 'Tomato Leaf Curl']
  },

  'Potato': {
    crop: 'Potato',
    commonDiseases: [
      'Potato Blight', 'Late Blight', 'Leaf Blight', 'Early Blight',
      'Black Scurf', 'Common Scab', 'Potato Virus'
    ],
    vulnerableSeason: ['Cool humid weather', 'Post-monsoon', 'Tuber formation'],
    resistantVarieties: ['Kufri Jyoti', 'Kufri Pukhraj', 'Kufri Badshah'],
    primaryThreats: ['Potato Blight', 'Late Blight']
  },

  'Onion': {
    crop: 'Onion',
    commonDiseases: [
      'Onion Purple Blotch', 'Leaf Blight', 'Downy Mildew', 'Neck Rot',
      'Black Mold', 'Thrips'
    ],
    vulnerableSeason: ['High humidity', 'Monsoon season', 'Bulb maturation'],
    resistantVarieties: ['Agrifound Light Red', 'Pusa Ratnar', 'N-53'],
    primaryThreats: ['Onion Purple Blotch', 'Downy Mildew']
  },

  'Chili': {
    crop: 'Chili',
    commonDiseases: [
      'Chili Anthracnose', 'Leaf Blight', 'Bacterial Wilt', 'Fruit Rot',
      'Leaf Curl', 'Thrips', 'Aphids'
    ],
    vulnerableSeason: ['Fruit development', 'High humidity', 'Monsoon season'],
    resistantVarieties: ['Pusa Jwala', 'Arka Lohit', 'K-2'],
    primaryThreats: ['Chili Anthracnose', 'Bacterial Wilt']
  },

  'Groundnut': {
    crop: 'Groundnut',
    commonDiseases: [
      'Groundnut Leaf Spot', 'Leaf Blight', 'Rust', 'Tikka Disease',
      'Pod Rot', 'Collar Rot'
    ],
    vulnerableSeason: ['Kharif season', 'Pod development', 'High humidity'],
    resistantVarieties: ['TG-37A', 'Kadiri-6', 'GPBD-4'],
    primaryThreats: ['Groundnut Leaf Spot', 'Tikka Disease']
  },

  'Sunflower': {
    crop: 'Sunflower',
    commonDiseases: [
      'Sunflower Rust', 'Leaf Blight', 'Downy Mildew', 'Alternaria Blight',
      'Head Rot', 'Stem Rot'
    ],
    vulnerableSeason: ['Flowering stage', 'Head formation', 'High humidity'],
    resistantVarieties: ['MSFH-17', 'KBSH-1', 'Surya'],
    primaryThreats: ['Sunflower Rust', 'Downy Mildew']
  }
};

// Intelligent disease prediction based on crop type
export function predictLikelyDiseases(crop: string, symptoms?: string[]): string[] {
  const cropData = cropDiseaseDatabase[crop];
  if (!cropData) {
    return ['Leaf Blight']; // Generic fallback
  }

  // If symptoms are provided, try to match them
  if (symptoms && symptoms.length > 0) {
    const symptomKeywords = symptoms.join(' ').toLowerCase();
    
    // Simple keyword matching for common symptoms
    if (symptomKeywords.includes('rust') || symptomKeywords.includes('orange')) {
      return cropData.commonDiseases.filter(d => d.includes('Rust'));
    }
    if (symptomKeywords.includes('blight') || symptomKeywords.includes('spot')) {
      return cropData.commonDiseases.filter(d => d.includes('Blight') || d.includes('Spot'));
    }
    if (symptomKeywords.includes('curl') || symptomKeywords.includes('virus')) {
      return cropData.commonDiseases.filter(d => d.includes('Curl') || d.includes('Virus'));
    }
    if (symptomKeywords.includes('borer') || symptomKeywords.includes('worm')) {
      return cropData.commonDiseases.filter(d => d.includes('Borer') || d.includes('Worm'));
    }
  }

  // Return primary threats for the crop
  return cropData.primaryThreats;
}

// Get season-specific recommendations
export function getSeasonalRecommendations(crop: string, _currentSeason?: string): string[] {
  const cropData = cropDiseaseDatabase[crop];
  if (!cropData) return [];

  const recommendations = [
    `Monitor for ${cropData.primaryThreats.join(' and ')} during vulnerable periods`,
    `Consider planting resistant varieties: ${cropData.resistantVarieties.slice(0, 3).join(', ')}`,
    `Be extra vigilant during: ${cropData.vulnerableSeason.join(', ')}`
  ];

  return recommendations;
}

// Enhanced crop-disease compatibility scoring
export function getCropDiseaseCompatibilityScore(crop: string, disease: string): number {
  const cropData = cropDiseaseDatabase[crop];
  if (!cropData) return 0.5; // Neutral score for unknown crops

  if (cropData.primaryThreats.includes(disease)) return 0.9;
  if (cropData.commonDiseases.includes(disease)) return 0.7;
  if (disease === 'Leaf Blight') return 0.6; // Generic disease
  
  return 0.3; // Low compatibility for unrelated diseases
}