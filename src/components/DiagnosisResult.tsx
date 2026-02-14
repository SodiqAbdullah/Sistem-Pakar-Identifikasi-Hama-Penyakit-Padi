'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Heart, FileText, Image as ImageIcon, RotateCcw } from 'lucide-react';
import { DiagnosisResult as DiagnosisResultType } from '@/types';
import { getSeverityColor, getSeverityText, getConfidenceLevel, getConfidenceLevelColor } from '@/utils/predictionUtils';
import KNNClusteringDiagram from './KNNClusteringDiagram';

interface DiagnosisResultProps {
  result: DiagnosisResultType;
  onReset: () => void;
  imagePreview?: string | null;
}

export default function DiagnosisResult({ result, onReset, imagePreview }: DiagnosisResultProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'images'>('overview');

  const getIcon = () => {
    if (result.diseaseInfo.severity === 'healthy') {
      return <CheckCircle className="w-12 h-12 text-green-600" />;
    }
    return <AlertCircle className="w-12 h-12 text-orange-600" />;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getImageExamples = () => {
    return result.diseaseInfo.image_examples.filter(img => {
      const filename = img.split('/').pop() || '';
      const classPrefix = result.diseaseClass;
      return filename.startsWith(classPrefix);
    });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-4xl mx-auto"
    >
      {/* Header with Diagnosis */}
      <motion.div
        variants={itemVariants}
        className={`${getSeverityColor(result.diseaseInfo.severity)} rounded-lg p-8 mb-6 border-2`}
      >
        <div className="flex items-center gap-4 mb-4">
          {getIcon()}
          <div className="flex-1">
            <h2 className="text-3xl font-bold">{result.diseaseName}</h2>
            <p className="text-sm opacity-75 mt-1">{getSeverityText(result.diseaseInfo.severity)} Tingkat Keparahan</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{Math.round(result.finalScore)}%</div>
            <p className="text-sm opacity-75">Tingkat Kepercayaan</p>
          </div>
        </div>
      </motion.div>

      {/* Score Details */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
      >
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-600 font-semibold mb-1">Analisis AI</p>
          <p className="text-2xl font-bold text-blue-900">{Math.round(result.aiProbability * 100)}%</p>
          <p className="text-xs text-blue-600 mt-1">Bobot: 70%</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-600 font-semibold mb-1">Validasi User</p>
          <p className="text-2xl font-bold text-green-900">{Math.round(result.userScore)}%</p>
          <p className="text-xs text-green-600 mt-1">Bobot: 30%</p>
        </div>

        <div className={`${result.diseaseInfo.severity === 'healthy' ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'} border rounded-lg p-4`}>
          <p className="text-sm font-semibold mb-1">Kepercayaan Diri</p>
          <p className={`text-2xl font-bold ${getConfidenceLevelColor(result.finalScore)}`}>
            {getConfidenceLevel(result.finalScore)}
          </p>
          <p className="text-xs text-gray-600 mt-1">Level Identifikasi</p>
        </div>
      </motion.div>

      {/* Main Content with Tabs */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 px-4 font-semibold flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white border-b-2 border-blue-600'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <AlertCircle size={18} />
            Ringkasan
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`flex-1 py-3 px-4 font-semibold flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'details'
                ? 'bg-blue-600 text-white border-b-2 border-blue-600'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <FileText size={18} />
            Detail & Solusi
          </button>
          <button
            onClick={() => setActiveTab('images')}
            className={`flex-1 py-3 px-4 font-semibold flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'images'
                ? 'bg-blue-600 text-white border-b-2 border-blue-600'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <ImageIcon size={18} />
            Contoh Gambar
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Deskripsi</h3>
                <p className="text-slate-700 leading-relaxed">{result.diseaseInfo.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Gejala yang Terdeteksi</h3>
                <ul className="space-y-2">
                  {result.diseaseInfo.symptoms.map((symptom, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-700">
                      <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-blue-700 mb-2">
                  <span className="font-semibold">Penjelasan AI:</span> Sistem mengidentifikasi penyakit ini berdasarkan analisis fitur visual dari gambar yang diunggah. Probabilitas {Math.round(result.aiProbability * 100)}% menunjukkan tingkat kesamaan dengan pola penyakit yang ada di dataset pelatihan.
                </p>
              </div>

              {result.knnInfo && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="text-sm text-purple-700">
                    <span className="font-semibold">Validasi KNN:</span> {result.knnInfo.method}. Sistem menemukan {result.knnInfo.neighbors.length} tetangga terdekat dalam ruang fitur, yang memperkuat kepercayaan pada prediksi {result.diseaseClass} dengan level {(result.knnInfo.knnConfidence * 100).toFixed(0)}%.
                  </p>
                  {result.knnInfo.neighbors.length > 0 && (
                    <div className="mt-3 text-xs text-purple-600">
                      <p className="font-semibold mb-1">K-Nearest Neighbors:</p>
                      {result.knnInfo.neighbors.map((neighbor, idx) => (
                        <div key={idx} className="ml-2">
                          • {neighbor.className} (distance: {neighbor.distance.toFixed(3)})
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {result.knnInfo && (
                <div className="mt-6">
                  <KNNClusteringDiagram 
                    knnInfo={result.knnInfo} 
                    predictedClass={result.diseaseClass}
                  />
                </div>
              )}
            </motion.div>
          )}

          {/* Details Tab */}
          {activeTab === 'details' && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Heart className="text-red-500" size={20} />
                  Solusi Penanganan
                </h3>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-slate-800 leading-relaxed whitespace-pre-wrap">
                  {result.diseaseInfo.solution}
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700">
                  <span className="font-semibold">Catatan:</span> Konsultasikan dengan ahli pertanian lokal atau petugas dari Dinas Pertanian untuk penanganan yang lebih spesifik sesuai dengan kondisi lahan Anda.
                </p>
              </div>
            </motion.div>
          )}

          {/* Images Tab */}
          {activeTab === 'images' && (
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-bold text-slate-900 mb-4">Contoh Gambar Gejala</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getImageExamples().slice(0, 6).map((imgPath, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="relative rounded-lg overflow-hidden shadow-md border border-slate-200 aspect-square bg-slate-100"
                  >
                    <img
                      src={imgPath}
                      alt={`Contoh ${idx + 1}`}
                      className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.png';
                      }}
                    />
                    <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity" />
                  </motion.div>
                ))}
              </div>
              {getImageExamples().length === 0 && (
                <p className="text-slate-600 text-center py-8">Tidak ada gambar contoh tersedia untuk kategori ini.</p>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div variants={itemVariants} className="flex gap-4 mt-8">
        <button
          onClick={onReset}
          className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw size={18} />
          Diagnosa Ulang
        </button>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.print();
          }}
          className="flex-1 py-3 px-4 bg-slate-200 hover:bg-slate-300 active:scale-95 text-slate-900 font-bold rounded-lg transition-all"
        >
          Cetak Hasil
        </a>
      </motion.div>
    </motion.div>
  );
}
