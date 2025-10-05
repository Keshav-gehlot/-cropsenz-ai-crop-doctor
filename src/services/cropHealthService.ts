// OpenEPI Crop Health API Integration Service
// Based on the provided Python SDK documentation

interface CropHealthPrediction {
  crop: string;
  disease: string;
  confidence: number;
  health_status: 'healthy' | 'diseased';
  prediction_type: 'binary' | 'singleHLT' | 'multiHLT';
  metadata?: {
    timestamp: string;
    model_version: string;
    processing_time: number;
  };
}

interface APIResponse {
  success: boolean;
  data?: CropHealthPrediction;
  error?: string;
}

class CropHealthService {
  private readonly API_BASE_URL = 'https://api.openepi.io'; // Replace with actual endpoint
  private readonly API_KEY = import.meta.env.VITE_OPENEPI_API_KEY; // Set in environment variables

  /**
   * Get binary prediction (healthy/diseased) for crop image
   * Equivalent to: CropHealthClient.get_binary_prediction(image_data)
   */
  async getBinaryPrediction(imageFile: File): Promise<APIResponse> {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('model_type', 'binary');

      const response = await fetch(`${this.API_BASE_URL}/crop-health/binary`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.API_KEY}`,
          // Don't set Content-Type, let browser set it for FormData
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: {
          ...data,
          prediction_type: 'binary'
        }
      };
    } catch (error) {
      console.error('Binary prediction error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Get single-HLT prediction for crop image
   * Equivalent to: CropHealthClient.get_singleHLT_prediction(image_data)
   */
  async getSingleHLTPrediction(imageFile: File): Promise<APIResponse> {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('model_type', 'singleHLT');

      const response = await fetch(`${this.API_BASE_URL}/crop-health/single-hlt`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.API_KEY}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: {
          ...data,
          prediction_type: 'singleHLT'
        }
      };
    } catch (error) {
      console.error('Single-HLT prediction error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Get multi-HLT prediction for crop image
   * Equivalent to: CropHealthClient.get_multiHLT_prediction(image_data)
   */
  async getMultiHLTPrediction(imageFile: File): Promise<APIResponse> {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('model_type', 'multiHLT');

      const response = await fetch(`${this.API_BASE_URL}/crop-health/multi-hlt`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.API_KEY}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: {
          ...data,
          prediction_type: 'multiHLT'
        }
      };
    } catch (error) {
      console.error('Multi-HLT prediction error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Enhanced prediction method that tries multiple models for best accuracy
   */
  async getComprehensivePrediction(imageFile: File): Promise<APIResponse> {
    try {
      // Start with binary prediction for quick health assessment
      const binaryResult = await this.getBinaryPrediction(imageFile);
      
      if (!binaryResult.success || binaryResult.data?.health_status === 'healthy') {
        return binaryResult;
      }

      // If diseased, get detailed analysis with multi-HLT
      const detailedResult = await this.getMultiHLTPrediction(imageFile);
      
      if (detailedResult.success) {
        return detailedResult;
      }

      // Fallback to single-HLT if multi-HLT fails
      return await this.getSingleHLTPrediction(imageFile);
      
    } catch (error) {
      console.error('Comprehensive prediction error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Comprehensive analysis failed'
      };
    }
  }

  /**
   * Convert image to base64 for preview purposes
   */
  async imageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * Validate image file before upload
   */
  validateImageFile(file: File): { isValid: boolean; error?: string } {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      return {
        isValid: false,
        error: 'Please upload a valid image file (JPEG, JPG, PNG, or WebP)'
      };
    }

    if (file.size > maxSize) {
      return {
        isValid: false,
        error: 'Image file size must be less than 10MB'
      };
    }

    return { isValid: true };
  }
}

// Singleton instance
export const cropHealthService = new CropHealthService();

// Export types for use in components
export type { CropHealthPrediction, APIResponse };

// Mock data for development/testing (remove in production)
export const mockPredictions = {
  cocoa_black_pod: {
    crop: 'Cocoa',
    disease: 'Black Pod Disease',
    confidence: 0.93,
    health_status: 'diseased' as const,
    prediction_type: 'multiHLT' as const,
    metadata: {
      timestamp: new Date().toISOString(),
      model_version: 'v2.1.0',
      processing_time: 1250
    }
  },
  tomato_blight: {
    crop: 'Tomato',
    disease: 'Late Blight',
    confidence: 0.87,
    health_status: 'diseased' as const,
    prediction_type: 'multiHLT' as const,
    metadata: {
      timestamp: new Date().toISOString(),
      model_version: 'v2.1.0',
      processing_time: 980
    }
  },
  healthy_corn: {
    crop: 'Corn',
    disease: 'Healthy',
    confidence: 0.96,
    health_status: 'healthy' as const,
    prediction_type: 'binary' as const,
    metadata: {
      timestamp: new Date().toISOString(),
      model_version: 'v2.1.0',
      processing_time: 750
    }
  }
};