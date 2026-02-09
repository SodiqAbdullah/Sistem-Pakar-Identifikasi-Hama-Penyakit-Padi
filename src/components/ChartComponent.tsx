'use client';

import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ClassifyResult } from '@/types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartComponentProps {
  predictions: ClassifyResult[];
}

export default function ChartComponent({ predictions }: ChartComponentProps) {
  // Ambil top 3 predictions
  const topPredictions = predictions.slice(0, 3);

  // Disable animation untuk performance
  const chartOptions: any = {
    responsive: true,
    maintainAspectRatio: true,
    animation: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Hasil Prediksi AI - 3 Kelas Teratas',
        font: {
          size: 14,
          weight: 'bold' as const,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function (value: any) {
            return value + '%';
          },
        },
      },
    },
  };

  const chartData = {
    labels: topPredictions.map(pred =>
      pred.className
        .replace(/_/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    ),
    datasets: [
      {
        label: 'Probabilitas (%)',
        data: topPredictions.map(pred => Math.round(pred.probability * 100)),
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(34, 197, 94, 0.7)',
          'rgba(251, 191, 36, 0.7)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(34, 197, 94)',
          'rgb(251, 191, 36)',
        ],
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md border border-slate-200">
      <Bar data={chartData} options={chartOptions} height={300} />
    </div>
  );
}
