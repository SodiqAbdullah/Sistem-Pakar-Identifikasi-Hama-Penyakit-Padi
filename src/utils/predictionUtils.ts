import { UserAnswers } from '@/types';

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

// Load Teachable Machine model
export const loadTeachableMachineModel = async () => {
  try {
    const tmImage = (await import('@teachablemachine/image')).default;
    const URL = '/model/';
    const modelURL = URL + 'model.json';
    const metadataURL = URL + 'metadata.json';

    const model = await tmImage.load(modelURL, metadataURL);
    return model;
  } catch (error) {
    console.error('Error loading Teachable Machine model:', error);
    throw error;
  }
};

// Predict image using Teachable Machine model
export const predictImage = async (model: any, imageElement: HTMLImageElement) => {
  try {
    const predictions = await model.predict(imageElement);

    // Sort predictions by probability (descending)
    const sorted = predictions.sort((a: any, b: any) => b.probability - a.probability);

    return {
      class: sorted[0].className,
      probability: sorted[0].probability,
      allPredictions: sorted.map((pred: any) => ({
        className: pred.className,
        probability: pred.probability,
      })),
    };
  } catch (error) {
    console.error('Error predicting image:', error);
    throw error;
  }
};
