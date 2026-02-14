export interface KNNNeighbor {
  className: string;
  distance: number;
}

export interface KNNInfo {
  knnPredictedClass: string;
  knnConfidence: number;
  neighbors: KNNNeighbor[];
  method: string; // "Hybrid: K-Nearest Neighbor + Deep Learning"
}

export interface PredictionResult {
  class: string;
  probability: number;
  allPredictions: ClassifyResult[];
  knnInfo?: KNNInfo;
}

export interface ClassifyResult {
  className: string;
  probability: number;
}

export interface DiseaseInfo {
  name_id: string;
  description: string;
  symptoms: string[];
  validation_questions: string[];
  solution: string;
  image_examples: string[];
  severity: 'healthy' | 'mild' | 'moderate' | 'severe';
}

export interface UserAnswers {
  question1: number;
  question2: number;
  question3: number;
}

export interface DiagnosisResult {
  diseaseClass: string;
  diseaseName: string;
  aiProbability: number;
  userScore: number;
  finalScore: number;
  diseaseInfo: DiseaseInfo;
  knnInfo?: KNNInfo;
}

export interface Step {
  id: number;
  name: 'upload' | 'validation' | 'result';
}
