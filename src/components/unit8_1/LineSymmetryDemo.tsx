import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, CheckCircle, XCircle } from 'lucide-react';

interface LineOption {
  id: string;
  name: string;
  isValid: boolean;
  angle: number; // in degrees
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  description: string;
}

export const LineSymmetryDemo: React.FC = () => {
  const [selectedLineId, setSelectedLineId] = useState<string>('vert');
  const [foldProgress, setFoldProgress] = useState<number>(0); // 0 to 1
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const lines: LineOption[] = [
    {
      id: 'vert',
      name: 'Vertical Line (Middle)',
      isValid: true,
      angle: 90,
      x1: 150,
      y1: 20,
      x2: 150,
      y2: 280,
      description: 'Dividing down the exact centre. The left half folds onto the right half.'
    },
    {
      id: 'horiz',
      name: 'Horizontal Line (Middle)',
      isValid: true,
      angle: 0,
      x1: 20,
      y1: 150,
      x2: 280,
      y2: 150,
      description: 'Dividing across the middle. The top half folds onto the bottom half.'
    },
    {
      id: 'diag',
      name: 'Diagonal Line',
      isValid: true,
      angle: 45,
      x1: 30,
      y1: 30,
      x2: 270,
      y2: 270,
      description: 'Corner to opposite corner. The halves fold across the diagonal.'
    },
    {
      id: 'bad',
      name: 'Bad Line (Off-Centre)',
      isValid: false,
      angle: 90,
      x1: 210,
      y1: 20,
      x2: 210,
      y2: 280,
      description: 'Not in the centre! When folded, one half sticks out past the edge.'
    }
  ];

  const activeLine = lines.find((l) => l.id === selectedLineId) || lines[0];

  // Play fold animation
  useEffect(() => {
    let animId: number;
    if (isPlaying) {
      const startTime = performance.now();
      const duration = 1600; // 1.6s

      const animate = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(1, elapsed / duration);
        // Smooth easing
        const eased = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
        setFoldProgress(eased);

        if (progress < 1) {
          animId = requestAnimationFrame(animate);
        } else {
          setIsPlaying(false);
          setFoldProgress(1);
        }
      };
      animId = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  const handlePlayFold = () => {
    setFoldProgress(0);
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setFoldProgress(0);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-6xl mx-auto p-6 select-none">
      {/* Header */}
      <div>
        <span className="text-sm font-black text-blue-600 uppercase tracking-widest">
          Unit 8.1 · Concept 1
        </span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          Line Symmetry &amp; The Fold Test
        </h2>
        <p className="text-2xl font-bold text-slate-700 leading-snug">
          A <span className="text-fuchsia-600 font-extrabold">line of symmetry (mirror line)</span> divides a shape into two parts that are exactly the same.
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-12 gap-8 items-center my-auto">
        {/* SVG Folding Canvas */}
        <div className="col-span-12 md:col-span-7 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl flex flex-col items-center justify-center min-h-[420px] relative">
          <svg viewBox="0 0 300 300" className="w-80 h-80 drop-shadow-md overflow-visible">
            {/* Base Shape: Square (60,60 to 240,240) */}
            <rect
              x="60"
              y="60"
              width="180"
              height="180"
              fill="#dbeafe"
              stroke="#1d4ed8"
              strokeWidth="4"
              rx="4"
            />

            {/* Folded Half Animation */}
            {activeLine.id === 'vert' && (
              <g
                style={{
                  transformOrigin: '150px 150px',
                  transform: `scaleX(${1 - 2 * foldProgress})`,
                  opacity: 0.9
                }}
              >
                {/* Left Half folding onto right */}
                <rect x="60" y="60" width="90" height="180" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="4" />
              </g>
            )}

            {activeLine.id === 'horiz' && (
              <g
                style={{
                  transformOrigin: '150px 150px',
                  transform: `scaleY(${1 - 2 * foldProgress})`,
                  opacity: 0.9
                }}
              >
                {/* Top Half folding onto bottom */}
                <rect x="60" y="60" width="180" height="90" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="4" />
              </g>
            )}

            {activeLine.id === 'diag' && (
              <g
                style={{
                  transformOrigin: '150px 150px',
                  transform: `rotate(${foldProgress * 90}deg) scale(${1 - 0.2 * Math.sin(foldProgress * Math.PI)})`,
                  opacity: 0.9
                }}
              >
                {/* Triangle half */}
                <polygon points="60,60 240,60 240,240" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="4" />
              </g>
            )}

            {activeLine.id === 'bad' && (
              <g
                style={{
                  transformOrigin: '210px 150px',
                  transform: `scaleX(${1 - 2 * foldProgress})`,
                  opacity: 0.85
                }}
              >
                {/* Asymmetric left block folding over x=210 line */}
                <rect x="60" y="60" width="150" height="180" fill="#fca5a5" stroke="#dc2626" strokeWidth="4" />
              </g>
            )}

            {/* Mirror line */}
            <line
              x1={activeLine.x1}
              y1={activeLine.y1}
              x2={activeLine.x2}
              y2={activeLine.y2}
              stroke={activeLine.isValid ? '#c026d3' : '#dc2626'}
              strokeWidth="5"
              strokeDasharray="10 8"
            />
          </svg>

          {/* Fold Result Banner */}
          <div className="mt-4 flex items-center gap-3">
            {activeLine.isValid ? (
              <div className="flex items-center gap-2 text-emerald-800 bg-emerald-50 px-5 py-2.5 rounded-2xl border-2 border-emerald-300 font-extrabold text-xl">
                <CheckCircle className="w-7 h-7 text-emerald-600" />
                <span>Halves match exactly! (Line of Symmetry)</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-rose-800 bg-rose-50 px-5 py-2.5 rounded-2xl border-2 border-rose-300 font-extrabold text-xl">
                <XCircle className="w-7 h-7 text-rose-600" />
                <span>Halves DO NOT match! (NOT a line of symmetry)</span>
              </div>
            )}
          </div>
        </div>

        {/* Controls Panel */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
          <span className="text-sm font-extrabold uppercase tracking-wider text-slate-500">
            Choose Line to Test:
          </span>

          <div className="grid grid-cols-1 gap-2.5">
            {lines.map((line) => (
              <button
                key={line.id}
                onClick={() => {
                  setSelectedLineId(line.id);
                  setFoldProgress(0);
                  setIsPlaying(false);
                }}
                className={`p-4 rounded-2xl text-left border-2 font-extrabold text-lg transition-all active:scale-98 ${
                  selectedLineId === line.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xl'
                    : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span>{line.name}</span>
                  <span className={`text-xs px-2.5 py-1 rounded-lg uppercase font-black ${
                    line.isValid ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                  }`}>
                    {line.isValid ? 'Symmetrical' : 'Not Symmetrical'}
                  </span>
                </div>
                <p className={`text-xs font-semibold ${selectedLineId === line.id ? 'text-slate-300' : 'text-slate-500'}`}>
                  {line.description}
                </p>
              </button>
            ))}
          </div>

          {/* Action Buttons & Slider */}
          <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-md mt-2">
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={handlePlayFold}
                className="flex-1 h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 active:scale-95"
              >
                <Play className="w-7 h-7 fill-current" />
                <span>Play Fold</span>
              </button>
              <button
                onClick={handleReset}
                className="w-16 h-16 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center active:scale-95 border-2 border-slate-200"
                title="Reset fold"
              >
                <RotateCcw className="w-7 h-7" />
              </button>
            </div>

            {/* Step Slider */}
            <div>
              <div className="flex justify-between text-xs font-black text-slate-500 uppercase mb-1">
                <span>Flat (0%)</span>
                <span>Fold progress: {Math.round(foldProgress * 100)}%</span>
                <span>Folded (100%)</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={foldProgress}
                onChange={(e) => {
                  setIsPlaying(false);
                  setFoldProgress(parseFloat(e.target.value));
                }}
                className="w-full h-4 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Teacher Teaching Note */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between text-amber-950 font-bold text-lg">
        <span>Teaching point: A line of symmetry can be vertical, horizontal, or diagonal. The fold must match completely!</span>
      </div>
    </div>
  );
};
