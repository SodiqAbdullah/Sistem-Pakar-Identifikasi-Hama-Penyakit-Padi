'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { KNNInfo } from '@/types';

interface KNNClusteringDiagramProps {
  knnInfo: KNNInfo;
  predictedClass: string;
}

export default function KNNClusteringDiagram({ knnInfo, predictedClass }: KNNClusteringDiagramProps) {
  const maxDistance = Math.max(...knnInfo.neighbors.map(n => n.distance));
  
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full space-y-6"
    >
      {/* KNN Title */}
      <motion.div variants={itemVariants} className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
          🎯 K-Nearest Neighbor Clustering (k=3)
        </h3>
        <p className="text-slate-600 text-sm">
          Visualisasi 3 tetangga terdekat dalam ruang fitur probabilitas. Semakin dekat (semakin kecil distance), semakin mirip dengan class yang diprediksi.
        </p>
      </motion.div>

      {/* Central Query Point */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-400 rounded-lg p-6"
      >
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full mb-2">
              <span className="text-2xl font-bold">?</span>
            </div>
            <p className="font-bold text-slate-900">Input Gambar</p>
            <p className="text-xs text-slate-600 mt-1">(Probability Vector)</p>
          </div>
        </div>
      </motion.div>

      {/* Nearest Neighbors List */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h4 className="font-bold text-slate-900">Tetangga Terdekat (Ranked by Distance):</h4>
        
        {knnInfo.neighbors.map((neighbor, index) => {
          const distancePercent = (neighbor.distance / maxDistance) * 100;
          const isMatch = neighbor.className === predictedClass;
          
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`p-4 rounded-lg border-2 ${
                isMatch
                  ? 'bg-green-50 border-green-300'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                  index === 0 ? 'bg-yellow-500' :
                  index === 1 ? 'bg-gray-400' :
                  'bg-orange-600'
                }`}>
                  {index + 1}
                </div>

                {/* Class name */}
                <div className="flex-1">
                  <p className="font-bold text-slate-900">{neighbor.className}</p>
                  <p className="text-xs text-slate-600">
                    Distance: {neighbor.distance.toFixed(4)}
                  </p>
                </div>

                {/* Distance bar */}
                <div className="flex-1">
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${100 - distancePercent}%` }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      className={`h-full ${
                        isMatch ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                    />
                  </div>
                  <p className="text-xs text-slate-600 text-right mt-1">
                    {(100 - distancePercent).toFixed(0)}% similarity
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Voting Result */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-lg p-6"
      >
        <h4 className="font-bold text-slate-900 mb-3">📊 Voting Result:</h4>
        <div className="bg-white rounded-lg p-4 space-y-2">
          <p className="text-sm text-slate-700">
            <span className="font-semibold">Predicted Class:</span> {knnInfo.knnPredictedClass}
          </p>
          <p className="text-sm text-slate-700">
            <span className="font-semibold">KNN Confidence:</span> {(knnInfo.knnConfidence * 100).toFixed(0)}%
          </p>
          <p className="text-sm text-slate-700">
            <span className="font-semibold">Voting Method:</span> Majority voting dari 3 nearest neighbors
          </p>
        </div>
      </motion.div>

      {/* Method Explanation */}
      <motion.div
        variants={itemVariants}
        className="bg-indigo-50 border border-indigo-200 rounded-lg p-4"
      >
        <h4 className="font-bold text-indigo-900 mb-2">💡 Cara Kerja KNN:</h4>
        <ol className="text-sm text-indigo-800 space-y-1 ml-4 list-decimal">
          <li>Hitung Euclidean distance antara input dengan semua training profiles</li>
          <li>Cari 3 profiles dengan distance terkecil (k=3 neighbors)</li>
          <li>Voting: class mana yang paling banyak muncul di 3 neighbors</li>
          <li>Confidence = jumlah vote / k (mis: 2/3 = 66.67%)</li>
          <li>Gunakan voting result untuk memperkuat prediksi AI</li>
        </ol>
      </motion.div>

      {/* Hybrid System Note */}
      <motion.div
        variants={itemVariants}
        className="bg-amber-50 border border-amber-200 rounded-lg p-4"
      >
        <p className="text-sm text-amber-900">
          <span className="font-semibold">ℹ️ Hybrid System:</span> KNN digunakan sebagai validator untuk memperkuat prediksi Deep Learning. Hasil final menggabungkan confidence dari kedua metode untuk akurasi maksimal.
        </p>
      </motion.div>
    </motion.div>
  );
}
