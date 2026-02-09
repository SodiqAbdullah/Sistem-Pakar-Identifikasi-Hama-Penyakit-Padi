'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ClassifyResult } from '@/types';

interface DiagnosisChartProps {
  predictions: ClassifyResult[];
}

// Dynamically import Chart component to avoid hydration issues
const DynamicChart = dynamic(
  () => import('./ChartComponent').then((mod) => mod.default),
  { loading: () => <div className="w-full bg-white p-6 rounded-lg shadow-md border border-slate-200 flex items-center justify-center h-80">Memuat grafik...</div> }
);

export default function DiagnosisChart({ predictions }: DiagnosisChartProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <DynamicChart predictions={predictions} />;
}

