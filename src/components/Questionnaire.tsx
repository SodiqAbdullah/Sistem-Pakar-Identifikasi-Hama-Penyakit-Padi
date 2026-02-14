'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { UserAnswers, DiseaseInfo } from '@/types';

interface QuestionnaireProps {
  diseaseInfo: DiseaseInfo;
  onSubmit: (answers: UserAnswers) => void;
}

export default function Questionnaire({ diseaseInfo, onSubmit }: QuestionnaireProps) {
  const [answers, setAnswers] = useState<UserAnswers>({
    question1: null as any,
    question2: null as any,
    question3: null as any,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (questionKey: 'question1' | 'question2' | 'question3', value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionKey]: value,
    }));
  };

  const handleSubmit = () => {
    // If there are no validation questions (e.g., Healthy_Plant), skip validation
    if (diseaseInfo.validation_questions.length === 0) {
      setSubmitted(true);
      setTimeout(() => {
        onSubmit(answers);
      }, 1500);
      return;
    }

    if (answers.question1 === null || answers.question2 === null || answers.question3 === null) {
      alert('Silakan jawab semua pertanyaan terlebih dahulu.');
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      onSubmit(answers);
    }, 500);
  };

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
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 border border-slate-200">
        <motion.div variants={itemVariants} className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
            Validasi Diagnosa
          </h2>
          <p className="text-sm md:text-base text-slate-600">
            Silakan jawab pertanyaan berikut untuk memvalidasi diagnosa AI:
          </p>
        </motion.div>

        <div className="space-y-4 md:space-y-6">
          {diseaseInfo.validation_questions.length === 0 ? (
            <motion.div
              variants={itemVariants}
              className="bg-green-50 border border-green-200 rounded-lg p-4 md:p-6 text-center"
            >
              <p className="text-sm md:text-base text-green-800 font-medium">
                Tanaman ini dalam kondisi sehat. Tidak perlu validasi lebih lanjut.
              </p>
            </motion.div>
          ) : (
            diseaseInfo.validation_questions.map((question, index) => {
              const questionKey = `question${index + 1}` as 'question1' | 'question2' | 'question3';
              const isAnswered = answers[questionKey] !== null;

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="border border-slate-300 rounded-lg p-4 md:p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-2 md:gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm md:text-base text-slate-900 font-medium mb-3 md:mb-4">{question}</p>

                      <div className="flex gap-2 md:gap-3 flex-wrap">
                        <button
                          onClick={() => handleAnswerChange(questionKey, 25)}
                          className={`flex-1 py-1.5 md:py-2 px-2 md:px-3 rounded-lg font-medium text-xs md:text-sm transition-all min-w-0 ${
                            answers[questionKey] === 25
                              ? 'bg-orange-400 text-white'
                              : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                          }`}
                        >
                          <span className="hidden md:inline">Tidak Yakin</span>
                          <span className="md:hidden">Tidak</span>
                        </button>
                        <button
                          onClick={() => handleAnswerChange(questionKey, 50)}
                          className={`flex-1 py-1.5 md:py-2 px-2 md:px-3 rounded-lg font-medium text-xs md:text-sm transition-all min-w-0 ${
                            answers[questionKey] === 50
                              ? 'bg-yellow-300 text-yellow-900'
                              : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                          }`}
                        >
                          <span className="hidden md:inline">Agak Yakin</span>
                          <span className="md:hidden">Agak</span>
                        </button>
                        <button
                          onClick={() => handleAnswerChange(questionKey, 100)}
                          className={`flex-1 py-1.5 md:py-2 px-2 md:px-3 rounded-lg font-medium text-xs md:text-sm transition-all min-w-0 ${
                            answers[questionKey] === 100
                              ? 'bg-green-500 text-white'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          <span className="hidden md:inline">Sangat Yakin</span>
                          <span className="md:hidden">Sangat</span>
                        </button>
                      </div>

                      {isAnswered && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="mt-2 md:mt-3 flex items-center gap-2 text-green-600 text-xs md:text-sm"
                        >
                          <Check size={14} className="flex-shrink-0" />
                          <span>Jawaban Tercatat</span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        <motion.button
          variants={itemVariants}
          onClick={handleSubmit}
          disabled={submitted}
          className={`w-full mt-8 py-3 rounded-lg font-bold text-white transition-all ${
            submitted
              ? 'bg-green-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
          }`}
        >
          {submitted ? 'Diproses...' : 'Lihat Hasil Diagnosa'}
        </motion.button>
      </div>
    </motion.div>
  );
}
