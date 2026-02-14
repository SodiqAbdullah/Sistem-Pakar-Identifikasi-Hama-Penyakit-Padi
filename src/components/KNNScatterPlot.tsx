'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { KNNInfo } from '@/types';
import { SimplePCA, PCAPoint } from '@/utils/pcaUtils';

interface KNNScatterPlotProps {
  knnInfo: KNNInfo;
  queryPoint?: number[];
}

const CLASS_COLORS: Record<string, string> = {
  'Healthy_Plant': '#10b981',
  'BLB': '#ef4444',
  'BPH': '#f97316',
  'Brown_Spot': '#8b4513',
  'False_Smut': '#f59e0b',
  'Hispa': '#d946ef',
  'Neck_Blast': '#6366f1',
  'Sheath_Blight_Rot': '#06b6d4',
  'Stemborer': '#6b7280',
};

// Static training data (45 profiles)
const TRAINING_DATA: { className: string; features: number[] }[] = [
  { className: 'Healthy_Plant', features: [0.85, 0.02, 0.03, 0.02, 0.02, 0.02, 0.02, 0.01, 0.01] },
  { className: 'Healthy_Plant', features: [0.90, 0.01, 0.02, 0.02, 0.01, 0.01, 0.01, 0.01, 0.01] },
  { className: 'Healthy_Plant', features: [0.80, 0.03, 0.04, 0.03, 0.03, 0.03, 0.02, 0.01, 0.01] },
  { className: 'Healthy_Plant', features: [0.88, 0.02, 0.02, 0.02, 0.02, 0.02, 0.01, 0.01, 0.00] },
  { className: 'Healthy_Plant', features: [0.82, 0.03, 0.03, 0.03, 0.03, 0.02, 0.02, 0.01, 0.01] },
  { className: 'BLB', features: [0.05, 0.80, 0.03, 0.05, 0.02, 0.02, 0.02, 0.01, 0.00] },
  { className: 'BLB', features: [0.02, 0.85, 0.04, 0.03, 0.02, 0.02, 0.01, 0.01, 0.00] },
  { className: 'BLB', features: [0.03, 0.75, 0.05, 0.05, 0.03, 0.03, 0.03, 0.02, 0.01] },
  { className: 'BLB', features: [0.04, 0.82, 0.03, 0.04, 0.02, 0.02, 0.02, 0.01, 0.00] },
  { className: 'BLB', features: [0.03, 0.78, 0.05, 0.06, 0.03, 0.02, 0.02, 0.01, 0.00] },
  { className: 'BPH', features: [0.04, 0.03, 0.80, 0.05, 0.02, 0.03, 0.02, 0.01, 0.00] },
  { className: 'BPH', features: [0.02, 0.05, 0.85, 0.03, 0.02, 0.02, 0.01, 0.00, 0.00] },
  { className: 'BPH', features: [0.03, 0.04, 0.75, 0.06, 0.03, 0.04, 0.03, 0.01, 0.01] },
  { className: 'BPH', features: [0.03, 0.04, 0.82, 0.04, 0.02, 0.03, 0.01, 0.01, 0.00] },
  { className: 'BPH', features: [0.04, 0.06, 0.78, 0.05, 0.03, 0.02, 0.01, 0.01, 0.00] },
  { className: 'Brown_Spot', features: [0.05, 0.05, 0.04, 0.80, 0.02, 0.02, 0.01, 0.01, 0.00] },
  { className: 'Brown_Spot', features: [0.03, 0.04, 0.03, 0.85, 0.02, 0.02, 0.01, 0.00, 0.00] },
  { className: 'Brown_Spot', features: [0.04, 0.06, 0.05, 0.75, 0.03, 0.03, 0.02, 0.01, 0.01] },
  { className: 'Brown_Spot', features: [0.04, 0.05, 0.04, 0.82, 0.02, 0.02, 0.01, 0.00, 0.00] },
  { className: 'Brown_Spot', features: [0.05, 0.06, 0.05, 0.77, 0.03, 0.02, 0.01, 0.01, 0.00] },
  { className: 'False_Smut', features: [0.03, 0.03, 0.02, 0.02, 0.80, 0.05, 0.03, 0.01, 0.01] },
  { className: 'False_Smut', features: [0.02, 0.02, 0.01, 0.02, 0.85, 0.04, 0.02, 0.01, 0.01] },
  { className: 'False_Smut', features: [0.04, 0.04, 0.03, 0.03, 0.75, 0.05, 0.03, 0.02, 0.01] },
  { className: 'False_Smut', features: [0.03, 0.03, 0.02, 0.02, 0.82, 0.04, 0.03, 0.01, 0.00] },
  { className: 'False_Smut', features: [0.02, 0.02, 0.02, 0.03, 0.78, 0.05, 0.03, 0.02, 0.01] },
  { className: 'Hispa', features: [0.05, 0.02, 0.03, 0.02, 0.02, 0.80, 0.03, 0.02, 0.01] },
  { className: 'Hispa', features: [0.03, 0.03, 0.02, 0.02, 0.02, 0.85, 0.02, 0.01, 0.00] },
  { className: 'Hispa', features: [0.04, 0.04, 0.04, 0.03, 0.03, 0.75, 0.03, 0.02, 0.02] },
  { className: 'Hispa', features: [0.04, 0.02, 0.03, 0.02, 0.02, 0.82, 0.03, 0.01, 0.01] },
  { className: 'Hispa', features: [0.03, 0.03, 0.02, 0.03, 0.03, 0.78, 0.03, 0.02, 0.01] },
  { className: 'Neck_Blast', features: [0.02, 0.05, 0.04, 0.03, 0.02, 0.02, 0.80, 0.01, 0.01] },
  { className: 'Neck_Blast', features: [0.01, 0.06, 0.03, 0.02, 0.02, 0.02, 0.83, 0.01, 0.00] },
  { className: 'Neck_Blast', features: [0.03, 0.04, 0.05, 0.04, 0.03, 0.03, 0.75, 0.02, 0.01] },
  { className: 'Neck_Blast', features: [0.02, 0.05, 0.03, 0.03, 0.02, 0.02, 0.82, 0.01, 0.00] },
  { className: 'Neck_Blast', features: [0.01, 0.06, 0.04, 0.03, 0.02, 0.02, 0.78, 0.02, 0.01] },
  { className: 'Sheath_Blight_Rot', features: [0.02, 0.02, 0.01, 0.02, 0.02, 0.02, 0.02, 0.80, 0.07] },
  { className: 'Sheath_Blight_Rot', features: [0.01, 0.02, 0.01, 0.01, 0.01, 0.01, 0.01, 0.85, 0.07] },
  { className: 'Sheath_Blight_Rot', features: [0.03, 0.03, 0.02, 0.03, 0.02, 0.02, 0.03, 0.75, 0.06] },
  { className: 'Sheath_Blight_Rot', features: [0.02, 0.02, 0.01, 0.02, 0.02, 0.02, 0.02, 0.82, 0.06] },
  { className: 'Sheath_Blight_Rot', features: [0.01, 0.03, 0.01, 0.01, 0.01, 0.01, 0.02, 0.78, 0.08] },
  { className: 'Stemborer', features: [0.03, 0.01, 0.02, 0.01, 0.02, 0.01, 0.01, 0.05, 0.84] },
  { className: 'Stemborer', features: [0.02, 0.01, 0.01, 0.01, 0.01, 0.01, 0.00, 0.06, 0.87] },
  { className: 'Stemborer', features: [0.04, 0.02, 0.03, 0.02, 0.03, 0.02, 0.02, 0.05, 0.77] },
  { className: 'Stemborer', features: [0.02, 0.01, 0.02, 0.01, 0.02, 0.01, 0.01, 0.06, 0.84] },
  { className: 'Stemborer', features: [0.03, 0.02, 0.01, 0.02, 0.01, 0.01, 0.01, 0.04, 0.82] },
];

interface PlotData {
  trainingPoints: (PCAPoint & { className: string })[];
  queryPoint?: PCAPoint;
  neighborPoints?: (PCAPoint & { className: string; neighborIndex: number })[];
  bounds: { minX: number; maxX: number; minY: number; maxY: number };
}

export default function KNNScatterPlot({ knnInfo, queryPoint }: KNNScatterPlotProps) {
  const plotData = useMemo((): PlotData => {
    const pca = new SimplePCA();
    
    // Get training features
    const trainingFeatures = TRAINING_DATA.map(td => td.features);
    
    // Fit PCA
    const trainingPoints2D = pca.fitTransform(trainingFeatures);
    
    // Transform query point if provided
    let queryPoint2D: PCAPoint | undefined;
    if (queryPoint) {
      queryPoint2D = pca.transform([queryPoint])[0];
    }
    
    // Get neighbor points
    let neighborPoints2D: (PCAPoint & { className: string; neighborIndex: number })[] | undefined;
    if (knnInfo.neighbors && knnInfo.neighbors.length > 0) {
      neighborPoints2D = knnInfo.neighbors.map((neighbor, idx) => {
        const neighborData = TRAINING_DATA.find(td => td.className === neighbor.className);
        if (!neighborData) return null;
        const point2D = pca.transform([neighborData.features])[0];
        return {
          ...point2D,
          className: neighbor.className,
          neighborIndex: idx,
        };
      }).filter((p): p is (PCAPoint & { className: string; neighborIndex: number }) => p !== null);
    }
    
    // Calculate bounds with padding
    const allX = [
      ...trainingPoints2D.map(p => p.x),
      ...(queryPoint2D ? [queryPoint2D.x] : []),
      ...(neighborPoints2D ? neighborPoints2D.map(p => p.x) : []),
    ];
    const allY = [
      ...trainingPoints2D.map(p => p.y),
      ...(queryPoint2D ? [queryPoint2D.y] : []),
      ...(neighborPoints2D ? neighborPoints2D.map(p => p.y) : []),
    ];
    
    const minX = Math.min(...allX);
    const maxX = Math.max(...allX);
    const minY = Math.min(...allY);
    const maxY = Math.max(...allY);
    
    const padding = 0.15;
    const rangeX = maxX - minX || 1;
    const rangeY = maxY - minY || 1;
    
    return {
      trainingPoints: trainingPoints2D.map((p, idx) => ({
        ...p,
        className: TRAINING_DATA[idx].className,
      })),
      queryPoint: queryPoint2D,
      neighborPoints: neighborPoints2D,
      bounds: {
        minX: minX - rangeX * padding,
        maxX: maxX + rangeX * padding,
        minY: minY - rangeY * padding,
        maxY: maxY + rangeY * padding,
      },
    };
  }, [knnInfo, queryPoint]);

  const width = 500;
  const height = 400;
  const margin = 40;
  
  const plotWidth = width - 2 * margin;
  const plotHeight = height - 2 * margin;
  
  const xScale = (x: number) => margin + ((x - plotData.bounds.minX) / (plotData.bounds.maxX - plotData.bounds.minX)) * plotWidth;
  const yScale = (y: number) => height - margin - ((y - plotData.bounds.minY) / (plotData.bounds.maxY - plotData.bounds.minY)) * plotHeight;

  // Group points by class for legend
  const classCount = new Map<string, number>();
  plotData.trainingPoints.forEach(p => {
    classCount.set(p.className, (classCount.get(p.className) || 0) + 1);
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-white rounded-lg border border-slate-200 p-6 mt-6"
    >
      <h4 className="font-bold text-slate-900 mb-4">📊 KNN Clustering Visualization (PCA 2D)</h4>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* SVG Plot */}
        <div className="flex-1">
          <svg width={width} height={height} className="border border-slate-200 rounded bg-slate-50">
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map(i => (
              <g key={`grid-${i}`} opacity={0.1}>
                <line
                  x1={margin + i * plotWidth}
                  y1={margin}
                  x2={margin + i * plotWidth}
                  y2={height - margin}
                  stroke="gray"
                  strokeDasharray="2"
                />
                <line
                  x1={margin}
                  y1={margin + i * plotHeight}
                  x2={width - margin}
                  y2={margin + i * plotHeight}
                  stroke="gray"
                  strokeDasharray="2"
                />
              </g>
            ))}

            {/* Axes */}
            <line x1={margin} y1={height - margin} x2={width - margin} y2={height - margin} stroke="black" strokeWidth={2} />
            <line x1={margin} y1={margin} x2={margin} y2={height - margin} stroke="black" strokeWidth={2} />

            {/* Training points */}
            {plotData.trainingPoints.map((point, idx) => (
              <circle
                key={`training-${idx}`}
                cx={xScale(point.x)}
                cy={yScale(point.y)}
                r={5}
                fill={CLASS_COLORS[point.className] || '#ccc'}
                opacity={0.7}
                stroke="white"
                strokeWidth={1}
              />
            ))}

            {/* Query point */}
            {plotData.queryPoint && (
              <g>
                <circle
                  cx={xScale(plotData.queryPoint.x)}
                  cy={yScale(plotData.queryPoint.y)}
                  r={8}
                  fill="none"
                  stroke="#0ea5e9"
                  strokeWidth={3}
                />
                <circle
                  cx={xScale(plotData.queryPoint.x)}
                  cy={yScale(plotData.queryPoint.y)}
                  r={12}
                  fill="none"
                  stroke="#0ea5e9"
                  strokeWidth={1}
                  opacity={0.5}
                />
              </g>
            )}

            {/* Neighbor points - with badges */}
            {plotData.neighborPoints?.map((point, idx) => (
              <g key={`neighbor-${idx}`}>
                {/* Connection line to query point */}
                {plotData.queryPoint && (
                  <line
                    x1={xScale(plotData.queryPoint.x)}
                    y1={yScale(plotData.queryPoint.y)}
                    x2={xScale(point.x)}
                    y2={yScale(point.y)}
                    stroke="#fbbf24"
                    strokeWidth={1}
                    strokeDasharray="3"
                    opacity={0.6}
                  />
                )}
                
                {/* Larger point */}
                <circle
                  cx={xScale(point.x)}
                  cy={yScale(point.y)}
                  r={7}
                  fill={CLASS_COLORS[point.className]}
                  stroke="#fbbf24"
                  strokeWidth={2}
                />
                
                {/* Rank badge */}
                <circle
                  cx={xScale(point.x) + 10}
                  cy={yScale(point.y) - 10}
                  r={9}
                  fill={
                    point.neighborIndex === 0 ? '#fbbf24' :
                    point.neighborIndex === 1 ? '#c0c0c0' :
                    '#cd7f32'
                  }
                />
                <text
                  x={xScale(point.x) + 10}
                  y={yScale(point.y) - 8}
                  textAnchor="middle"
                  fontSize={11}
                  fontWeight="bold"
                  fill="black"
                >
                  {point.neighborIndex + 1}
                </text>
              </g>
            ))}

            {/* Axis labels */}
            <text x={width - margin + 10} y={height - margin + 5} fontSize={12} fill="gray">
              PC1
            </text>
            <text x={margin - 25} y={margin - 10} fontSize={12} fill="gray">
              PC2
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div className="flex-1 min-w-[200px]">
          <div className="space-y-3">
            {/* Query point legend */}
            <div className="flex items-center gap-2">
              <svg width={20} height={20}>
                <circle cx={10} cy={10} r={5} fill="none" stroke="#0ea5e9" strokeWidth={2} />
              </svg>
              <span className="text-xs text-slate-700">Query Point (Input Gambar)</span>
            </div>

            {/* Class legend */}
            <div className="border-t border-slate-200 pt-2">
              <p className="text-xs font-semibold text-slate-700 mb-2">Classes ({Array.from(classCount.keys()).length}):</p>
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {Array.from(classCount.entries()).map(([className, count]) => (
                  <div key={className} className="flex items-center gap-2 text-xs">
                    {/* eslint-disable-next-line */}
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: CLASS_COLORS[className] || '#ccc' }}
                    />
                    <span className="text-slate-700">
                      {className.replace(/_/g, ' ')} ({count})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Neighbors info */}
            {plotData.neighborPoints && plotData.neighborPoints.length > 0 && (
              <div className="border-t border-slate-200 pt-2">
                <p className="text-xs font-semibold text-slate-700 mb-2">🏆 Nearest Neighbors:</p>
                <div className="space-y-1">
                  {plotData.neighborPoints
                    .sort((a, b) => a.neighborIndex - b.neighborIndex)
                    .map((point) => {
                      const badgeColor = 
                        point.neighborIndex === 0 ? '#fbbf24' :
                        point.neighborIndex === 1 ? '#c0c0c0' :
                        '#cd7f32';
                      
                      return (
                        <div key={`neighbor-info-${point.neighborIndex}`} className="flex items-center gap-2 text-xs">
                          {/* eslint-disable-next-line */}
                          <span
                            className="w-5 h-5 rounded-full flex items-center justify-center text-white font-bold text-xs"
                            style={{ backgroundColor: badgeColor }}
                          >
                            {point.neighborIndex + 1}
                          </span>
                          <span className="text-slate-700">
                            {point.className.replace(/_/g, ' ')}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info text */}
      <p className="text-xs text-slate-600 mt-4">
        Visualisasi di atas menunjukkan distribusi 45 training profiles dalam ruang 2D (direduksi dari 9D menggunakan PCA). 
        Query point menunjukkan input gambar Anda, dan K=3 nearest neighbors ditandai dengan badge peringkat.
      </p>
    </motion.div>
  );
}
