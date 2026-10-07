import React, { useState } from 'react';
import { Play, RotateCcw, Sparkles, CheckCircle2 } from 'lucide-react';

export const CongruentHook: React.FC = () => {
  const [slideProgress, setSlideProgress] = useState<number>(0); // 0 (apart) to 1 (overlapped)
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const handlePlaySlide = () => {
    setIsAnimating(true);
    let start = performance.now();
    const duration = 1200;
    const animate = (time: number) => {
      const p = Math.min(1, (time - start) / duration);
      setSlideProgress(p);
      if (p < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };
    requestAnimationFrame(animate);
  };

  const handleReset = () => {
    setSlideProgress(0);
    setIsAnimating(false);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-6xl mx-auto p-6 select-none">
      <div>
        <span className="text-sm font-black text-orange-600 uppercase tracking-widest">
          Unit 8.3 · Getting Started
        </span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          The Perfect Fit
        </h2>
        <p className="text-2xl font-bold text-slate-700 leading-snug">
          Think of two identical stamped coins or cookie-cutter shapes. When placed on top of each other, they match up completely!
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8 items-center my-auto">
        {/* SVG Canvas */}
        <div className="col-span-12 md:col-span-7 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl flex flex-col items-center justify-center min-h-[400px] relative">
          <svg viewBox="0 0 360 260" className="w-96 h-64 overflow-visible">
            {/* Target Shape (Static Coin/Cookie on right) */}
            <g transform="translate(190, 40)">
              <rect x="0" y="0" width="130" height="130" rx="24" fill="#fef3c7" stroke="#d97706" strokeWidth="4" />
              <circle cx="65" cy="65" r="35" fill="#fde68a" stroke="#b45309" strokeWidth="3" />
              <text x="65" y="72" textAnchor="middle" className="text-xl font-black fill-amber-900">£1</text>
            </g>

            {/* Sliding Shape (Moves from left (40) towards right (190)) */}
            <g transform={`translate(${40 + slideProgress * 150}, 40)`} opacity={slideProgress === 1 ? 0.9 : 1}>
              <rect
                x="0"
                y="0"
                width="130"
                height="130"
                rx="24"
                fill={slideProgress === 1 ? '#dcfce7' : '#e0e7ff'}
                stroke={slideProgress === 1 ? '#16a34a' : '#4338ca'}
                strokeWidth="4"
              />
              <circle cx="65" cy="65" r="35" fill={slideProgress === 1 ? '#bbf7d0' : '#c7d2fe'} stroke={slideProgress === 1 ? '#15803d' : '#3730a3'} strokeWidth="3" />
              <text x="65" y="72" textAnchor="middle" className="text-xl font-black fill-indigo-900">£1</text>
            </g>
          </svg>

          {/* Overlap Status Banner */}
          {slideProgress === 1 && (
            <div className="mt-4 flex items-center gap-2 text-emerald-800 bg-emerald-100 px-6 py-2.5 rounded-2xl font-black text-xl border border-emerald-300 animate-in fade-in">
              <Sparkles className="w-6 h-6 text-emerald-600 fill-current" />
              <span>Perfect match! Exactly the same shape and size.</span>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-md">
            <h3 className="text-2xl font-black text-slate-900 mb-2">Test the Fit</h3>
            <p className="text-slate-600 font-bold text-base mb-6">
              Tap "Slide Shape" to see if Shape A lands exactly on top of Shape B with zero gap or overlap.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePlaySlide}
                disabled={isAnimating}
                className="flex-1 h-16 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30 active:scale-95"
              >
                <Play className="w-6 h-6 fill-current" />
                <span>Slide Shape</span>
              </button>

              <button
                onClick={handleReset}
                className="w-16 h-16 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center active:scale-95 border-2 border-slate-200"
                title="Reset position"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-orange-950 font-bold text-lg">
        Cambridge definition: When two shapes fit exactly on top of each other, we say they are CONGRUENT.
      </div>
    </div>
  );
};
