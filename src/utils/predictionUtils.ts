import { UserAnswers } from '@/types';

// ============================================
// KNN CLASSIFIER IMPLEMENTATION
// ============================================

interface TrainingPoint {
  className: string;
  features: number[]; // Probability vector dari TM
  distance?: number;
}

export class KNNClassifier {
  private trainingData: TrainingPoint[] = [];
  private k: number = 3;

  constructor(k: number = 3) {
    this.k = k;
  }

  /**
   * Add training data point (representative profile untuk setiap class)
   */
  addTrainingPoint(className: string, features: number[]): void {
    if (features.length !== 9) {
      throw new Error('Features harus punya 9 elements (sesuai jumlah kelas)');
    }
    this.trainingData.push({ className, features });
  }

  /**
   * Euclidean distance antara 2 probability vectors
   */
  private euclideanDistance(a: number[], b: number[]): number {
    return Math.sqrt(a.reduce((sum, val, i) => sum + Math.pow(val - b[i], 2), 0));
  }

  /**
   * Predict class berdasarkan KNN voting
   */
  predict(
    features: number[]
  ): {
    className: string;
    confidence: number;
    neighbors: Array<{ className: string; distance: number }>;
  } {
    if (features.length !== 9) {
      throw new Error('Input features harus 9 elements');
    }

    // Step 1: Calculate distance ke semua training points
    const withDistances = this.trainingData.map(point => ({
      ...point,
      distance: this.euclideanDistance(features, point.features),
    }));

    // Step 2: Sort by distance (ascending)
    const sorted = withDistances.sort((a, b) => a.distance! - b.distance!);

    // Step 3: Get k nearest neighbors
    const kNearest = sorted.slice(0, this.k);

    // Step 4: Voting - count occurrences
    const votes: Record<string, number> = {};
    kNearest.forEach(neighbor => {
      votes[neighbor.className] = (votes[neighbor.className] || 0) + 1;
    });

    // Step 5: Get winner class
    const sortedVotes = Object.entries(votes).sort((a, b) => b[1] - a[1]);
    const winnerClass = sortedVotes[0][0];
    const voteCount = sortedVotes[0][1];
    const confidence = voteCount / this.k; // 0.33 - 1.0

    return {
      className: winnerClass,
      confidence,
      neighbors: kNearest.map(n => ({
        className: n.className,
        distance: n.distance!,
      })),
    };
  }

  /**
   * Get semua training points (untuk debug)
   */
  getTrainingData(): TrainingPoint[] {
    return [...this.trainingData];
  }

  /**
   * Clear training data
   */
  clear(): void {
    this.trainingData = [];
  }
}

/**
 * Initialize KNN dengan typical profiles untuk setiap class
 * Profiles ini adalah "representative probability vectors" untuk setiap penyakit
 */
export const initializeKNNClassifier = (): KNNClassifier => {
  const knn = new KNNClassifier(3);

  // Typical probability profiles (didasarkan pada expected distributions)
  // Format: [Healthy_Plant, BLB, BPH, Brown_Spot, False_Smut, Hispa, Neck_Blast, Sheath_Blight_Rot, Stemborer]

  // Healthy Plant - tinggi di index 0
  knn.addTrainingPoint('Healthy_Plant', [0.85, 0.02, 0.03, 0.02, 0.02, 0.02, 0.02, 0.01, 0.01]);
  knn.addTrainingPoint('Healthy_Plant', [0.90, 0.01, 0.02, 0.02, 0.01, 0.01, 0.01, 0.01, 0.01]);
  knn.addTrainingPoint('Healthy_Plant', [0.80, 0.03, 0.04, 0.03, 0.03, 0.03, 0.02, 0.01, 0.01]);
  knn.addTrainingPoint('Healthy_Plant', [0.88, 0.02, 0.02, 0.02, 0.02, 0.02, 0.01, 0.01, 0.00]);
  knn.addTrainingPoint('Healthy_Plant', [0.82, 0.03, 0.03, 0.03, 0.03, 0.02, 0.02, 0.01, 0.01]);

  // BLB (Bacterial Leaf Blight)
  knn.addTrainingPoint('BLB', [0.05, 0.80, 0.03, 0.05, 0.02, 0.02, 0.02, 0.01, 0.00]);
  knn.addTrainingPoint('BLB', [0.02, 0.85, 0.04, 0.03, 0.02, 0.02, 0.01, 0.01, 0.00]);
  knn.addTrainingPoint('BLB', [0.03, 0.75, 0.05, 0.05, 0.03, 0.03, 0.03, 0.02, 0.01]);
  knn.addTrainingPoint('BLB', [0.04, 0.82, 0.03, 0.04, 0.02, 0.02, 0.02, 0.01, 0.00]);
  knn.addTrainingPoint('BLB', [0.03, 0.78, 0.05, 0.06, 0.03, 0.02, 0.02, 0.01, 0.00]);

  // BPH (Brown Plant Hopper)
  knn.addTrainingPoint('BPH', [0.04, 0.03, 0.80, 0.05, 0.02, 0.03, 0.02, 0.01, 0.00]);
  knn.addTrainingPoint('BPH', [0.02, 0.05, 0.85, 0.03, 0.02, 0.02, 0.01, 0.00, 0.00]);
  knn.addTrainingPoint('BPH', [0.03, 0.04, 0.75, 0.06, 0.03, 0.04, 0.03, 0.01, 0.01]);
  knn.addTrainingPoint('BPH', [0.03, 0.04, 0.82, 0.04, 0.02, 0.03, 0.01, 0.01, 0.00]);
  knn.addTrainingPoint('BPH', [0.04, 0.06, 0.78, 0.05, 0.03, 0.02, 0.01, 0.01, 0.00]);

  // Brown Spot
  knn.addTrainingPoint('Brown_Spot', [0.05, 0.05, 0.04, 0.80, 0.02, 0.02, 0.01, 0.01, 0.00]);
  knn.addTrainingPoint('Brown_Spot', [0.03, 0.04, 0.03, 0.85, 0.02, 0.02, 0.01, 0.00, 0.00]);
  knn.addTrainingPoint('Brown_Spot', [0.04, 0.06, 0.05, 0.75, 0.03, 0.03, 0.02, 0.01, 0.01]);
  knn.addTrainingPoint('Brown_Spot', [0.04, 0.05, 0.04, 0.82, 0.02, 0.02, 0.01, 0.00, 0.00]);
  knn.addTrainingPoint('Brown_Spot', [0.05, 0.06, 0.05, 0.77, 0.03, 0.02, 0.01, 0.01, 0.00]);

  // False Smut
  knn.addTrainingPoint('False_Smut', [0.03, 0.03, 0.02, 0.02, 0.80, 0.05, 0.03, 0.01, 0.01]);
  knn.addTrainingPoint('False_Smut', [0.02, 0.02, 0.01, 0.02, 0.85, 0.04, 0.02, 0.01, 0.01]);
  knn.addTrainingPoint('False_Smut', [0.04, 0.04, 0.03, 0.03, 0.75, 0.05, 0.03, 0.02, 0.01]);
  knn.addTrainingPoint('False_Smut', [0.03, 0.03, 0.02, 0.02, 0.82, 0.04, 0.03, 0.01, 0.00]);
  knn.addTrainingPoint('False_Smut', [0.02, 0.02, 0.02, 0.03, 0.78, 0.05, 0.03, 0.02, 0.01]);

  // Hispa
  knn.addTrainingPoint('Hispa', [0.05, 0.02, 0.03, 0.02, 0.02, 0.80, 0.03, 0.02, 0.01]);
  knn.addTrainingPoint('Hispa', [0.03, 0.03, 0.02, 0.02, 0.02, 0.85, 0.02, 0.01, 0.00]);
  knn.addTrainingPoint('Hispa', [0.04, 0.04, 0.04, 0.03, 0.03, 0.75, 0.03, 0.02, 0.02]);
  knn.addTrainingPoint('Hispa', [0.04, 0.02, 0.03, 0.02, 0.02, 0.82, 0.03, 0.01, 0.01]);
  knn.addTrainingPoint('Hispa', [0.03, 0.03, 0.02, 0.03, 0.03, 0.78, 0.03, 0.02, 0.01]);

  // Neck Blast
  knn.addTrainingPoint('Neck_Blast', [0.02, 0.05, 0.04, 0.03, 0.02, 0.02, 0.80, 0.01, 0.01]);
  knn.addTrainingPoint('Neck_Blast', [0.01, 0.06, 0.03, 0.02, 0.02, 0.02, 0.83, 0.01, 0.00]);
  knn.addTrainingPoint('Neck_Blast', [0.03, 0.04, 0.05, 0.04, 0.03, 0.03, 0.75, 0.02, 0.01]);
  knn.addTrainingPoint('Neck_Blast', [0.02, 0.05, 0.03, 0.03, 0.02, 0.02, 0.82, 0.01, 0.00]);
  knn.addTrainingPoint('Neck_Blast', [0.01, 0.06, 0.04, 0.03, 0.02, 0.02, 0.78, 0.02, 0.01]);

  // Sheath Blight
  knn.addTrainingPoint('Sheath_Blight_Rot', [0.02, 0.02, 0.01, 0.02, 0.02, 0.02, 0.02, 0.80, 0.07]);
  knn.addTrainingPoint('Sheath_Blight_Rot', [0.01, 0.02, 0.01, 0.01, 0.01, 0.01, 0.01, 0.85, 0.07]);
  knn.addTrainingPoint('Sheath_Blight_Rot', [0.03, 0.03, 0.02, 0.03, 0.02, 0.02, 0.03, 0.75, 0.06]);
  knn.addTrainingPoint('Sheath_Blight_Rot', [0.02, 0.02, 0.01, 0.02, 0.02, 0.02, 0.02, 0.82, 0.06]);
  knn.addTrainingPoint('Sheath_Blight_Rot', [0.01, 0.03, 0.01, 0.01, 0.01, 0.01, 0.02, 0.78, 0.08]);

  // Stemborer
  knn.addTrainingPoint('Stemborer', [0.03, 0.01, 0.02, 0.01, 0.02, 0.01, 0.01, 0.05, 0.84]);
  knn.addTrainingPoint('Stemborer', [0.02, 0.01, 0.01, 0.01, 0.01, 0.01, 0.00, 0.06, 0.87]);
  knn.addTrainingPoint('Stemborer', [0.04, 0.02, 0.03, 0.02, 0.03, 0.02, 0.02, 0.05, 0.77]);
  knn.addTrainingPoint('Stemborer', [0.02, 0.01, 0.02, 0.01, 0.02, 0.01, 0.01, 0.06, 0.84]);
  knn.addTrainingPoint('Stemborer', [0.03, 0.02, 0.01, 0.02, 0.01, 0.01, 0.01, 0.04, 0.82]);

  return knn;
};

// Dynamic import untuk browser-only code
let tmImageLoaded: any = null;

async function getTmImage() {
  if (tmImageLoaded) return tmImageLoaded;
  
  try {
    // Import di runtime untuk browser
    const module = await import('@teachablemachine/image');
    tmImageLoaded = module;
    return module;
  } catch (error) {
    console.error('Failed to import Teachable Machine:', error);
    throw error;
  }
}

// Hitung user score dari jawaban validasi (0-100)
export const calculateUserScore = (answers: UserAnswers): number => {
  const totalScore = ((answers.question1 + answers.question2 + answers.question3) / 300) * 100;
  return Math.round(totalScore);
};

// Hitung final score dengan bobot: 70% AI + 30% User
export const calculateFinalScore = (aiProbability: number, userScore: number): number => {
  const finalScore = (aiProbability * 0.7) + (userScore * 0.3);
  return Math.round(finalScore * 100) / 100;
};

// Format probability menjadi string percentage
export const formatProbability = (probability: number): string => {
  return `${Math.round(probability * 100)}%`;
};

// Get severity color based on severity level
export const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case 'severe':
      return 'bg-red-100 text-red-800 border-red-300';
    case 'moderate':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'mild':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'healthy':
      return 'bg-green-100 text-green-800 border-green-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

// Get severity badge text
export const getSeverityText = (severity: string): string => {
  switch (severity) {
    case 'severe':
      return 'Parah';
    case 'moderate':
      return 'Sedang';
    case 'mild':
      return 'Ringan';
    case 'healthy':
      return 'Sehat';
    default:
      return 'Tidak Diketahui';
  }
};

// Get confidence level text based on final score
export const getConfidenceLevel = (finalScore: number): string => {
  if (finalScore >= 80) return 'Sangat Tinggi';
  if (finalScore >= 60) return 'Tinggi';
  if (finalScore >= 40) return 'Sedang';
  return 'Rendah';
};

// Get confidence level color
export const getConfidenceLevelColor = (finalScore: number): string => {
  if (finalScore >= 80) return 'text-green-600';
  if (finalScore >= 60) return 'text-blue-600';
  if (finalScore >= 40) return 'text-yellow-600';
  return 'text-red-600';
};

// Load Teachable Machine model dengan retry logic
export const loadTeachableMachineModel = async (maxRetries = 3) => {
  let lastError: any;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Loading model (attempt ${attempt}/${maxRetries})...`);
      
      // Get Teachable Machine module
      const tmImage = await getTmImage();
      
      if (!tmImage || !tmImage.load) {
        throw new Error(`Teachable Machine module not properly loaded. Got: ${typeof tmImage}`);
      }

      // URL ke folder model
      const URL = '/model/';
      const modelURL = URL + 'model.json';
      const metadataURL = URL + 'metadata.json';

      console.log(`Fetching model from: ${modelURL}`);
      console.log(`Fetching metadata from: ${metadataURL}`);

      // Set a timeout for model loading
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Model loading timeout (60s exceeded)')), 60000)
      );

      // Load model dengan timeout
      const modelPromise = tmImage.load(modelURL, metadataURL);
      const model = await Promise.race([modelPromise, timeoutPromise]);
      
      console.log('✓ Model loaded successfully');
      console.log('✓ Ready for predictions');
      return model;
    } catch (error) {
      lastError = error;
      console.error(`Attempt ${attempt} failed:`, error);
      
      if (attempt < maxRetries) {
        const waitTime = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
        console.log(`Retrying in ${waitTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }

  const errorMessage = `Model failed to load after ${maxRetries} attempts: ${
    lastError instanceof Error ? lastError.message : 'Unknown error'
  }`;
  console.error(errorMessage);
  throw new Error(errorMessage);
};

// Predict image using Teachable Machine + KNN Hybrid
export const predictImage = async (model: any, imageElement: HTMLImageElement) => {
  try {
    // Step 1: Get predictions dari Teachable Machine
    const predictions = await model.predict(imageElement);

    // Step 2: Extract probability vector (features untuk KNN)
    const probabilityVector = predictions.map((pred: any) => pred.probability);

    // Step 3: Initialize KNN dan predict
    const knn = initializeKNNClassifier();
    const knnResult = knn.predict(probabilityVector);

    // Step 4: Sort TM predictions by probability (descending)
    const sorted = predictions.sort((a: any, b: any) => b.probability - a.probability);

    // Step 5: Hybrid result - combine TM + KNN
    // Find TM's top prediction
    const tmTopClass = sorted[0].className;
    const tmTopProbability = sorted[0].probability;

    // Boost confidence jika KNN agrees
    let finalClass = tmTopClass;
    let finalProbability = tmTopProbability;
    let knnVoteWeight = 0;

    if (knnResult.className === tmTopClass) {
      // Both agree - boost confidence
      knnVoteWeight = 0.3; // 30% confidence boost dari KNN
      finalProbability = Math.min(
        1.0,
        (tmTopProbability * 0.7 + knnResult.confidence * 0.3) // 70% TM, 30% KNN
      );
    } else if (knnResult.confidence > 0.66) {
      // KNN sangat yakin dengan class berbeda (2 out of 3 neighbors)
      // Bisa gunakan hasil TM saja (KNN hanya validator)
      knnVoteWeight = -0.1; // Slight decrease in confidence
    }

    return {
      class: finalClass,
      probability: finalProbability,
      allPredictions: sorted.map((pred: any) => ({
        className: pred.className,
        probability: pred.probability,
      })),
      // KNN metadata untuk display
      knnInfo: {
        knnPredictedClass: knnResult.className,
        knnConfidence: knnResult.confidence,
        neighbors: knnResult.neighbors,
        method: 'Hybrid: K-Nearest Neighbor + Deep Learning',
      },
    };
  } catch (error) {
    console.error('Error predicting image:', error);
    throw error;
  }
};
