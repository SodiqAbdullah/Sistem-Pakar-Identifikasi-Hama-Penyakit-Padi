'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ClassifyResult, KNNInfo } from '@/types';
import { Zap } from 'lucide-react';

interface DiagnosisChartProps {
  predictions: ClassifyResult[];
  knnInfo?: KNNInfo;
}

// Dynamically import Chart component to avoid hydration issues
const DynamicChart = dynamic(
  () => import('./ChartComponent').then((mod) => mod.default),
  { loading: () => <div className="w-full bg-white p-6 rounded-lg shadow-md border border-slate-200 flex items-center justify-center h-80">Memuat grafik...</div> }
);

export default function DiagnosisChart({ predictions, knnInfo }: DiagnosisChartProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      {/* Method info badge */}
      {knnInfo && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4 flex items-start gap-3"
        >
          <Zap className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-purple-900 mb-1">{knnInfo.method}</p>
            <p className="text-purple-700 text-sm">
              KNN Validation: {knnInfo.knnPredictedClass} (confidence {(knnInfo.knnConfidence * 100).toFixed(0)}%)
            </p>
          </div>
        </motion.div>
      )}

      {/* Chart */}
      <DynamicChart predictions={predictions} />
    </motion.div>
  );
}

