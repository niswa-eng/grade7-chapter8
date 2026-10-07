import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Sparkles, FlipHorizontal, Move, CheckCircle2 } from 'lucide-react';

export const TransformationsDemo: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'translated' | 'rotated' | 'reflected'>('rotated');
  const [animProgress, setAnimProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Free interactive playground state
  const [dragX, setDragX] = useState<number>(60);
  const [dragY, setDragY] = useState<number>(130);
  const [rotAngle, setRotAngle] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Play animation for activeMode
  useEffect(() => {
    let animId: number;
    if (isPlaying) {
      const startTime = performance.now();
      const duration = 1400;

      const animate = (time: number) => {
        const elapsed = time - startTime;
        const p = Math.min(1, elapsed / duration);
        setAnimProgress(p);
        if (p < 1) {
          animId = requestAnimationFrame(animate);
        } else {
          setIsPlaying(false);
        }
      };
      animId = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  const handlePlay = () => {
    setAnimProgress(0);
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setAnimProgress(0);
    setDragX(60);
    setDragY(130);
    setRotAngle(0);
    setIsFlipped(false);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-6xl mx-auto p-6 select-none">
      <div>
        <span className="text-sm font-black text-orange-600 uppercase tracking-widest">
          Unit 8.3 · Concept 3
        </span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          Same Shape, Different Position
        </h2>
        <p className="text-2xl font-bold text-slate-700 leading-snug">
          Congruent shapes remain congruent even if they are <span className="text-blue-600 font-extrabold">turned (rotated)</span>, <span className="text-emerald-600 font-extrabold">slid (translated)</span>, or <span className="text-fuchsia-600 font-extrabold">flipped (reflected)</span>!
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8 items-center my-auto">
        {/* SVG Display Stage */}
        <div className="col-span-12 md:col-span-7 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl flex flex-col items-center justify-center min-h-[420px] relative">
          <svg viewBox="0 0 360 280" className="w-full h-72 overflow-visible">
            {/* Target Partner Shape on Right (Fixed at x=230, y=140) */}
            <g transform="translate(230, 140)">
              {/* L-shape partner */}
              <polygon
                points="0,0 80,0 80,30 30,30 30,90 0,90"
                fill="#f8fafc"
                stroke="#64748b"
                strokeWidth="4"
              />
              <text x="40" y="-12" textAnchor="middle" className="text-xs font-black fill-slate-500">Target Partner</text>
            </g>

            {/* Mirror line if in Reflected mode */}
            {activeMode === 'reflected' && (
              <line x1="175" y1="20" x2="175" y2="260" stroke="#c026d3" strokeWidth="3" strokeDasharray="6 6" />
            )}

            {/* Moving / Transforming Shape */}
            {activeMode === 'translated' && (
              <g transform={`translate(${60 + animProgress * 170}, 140)`}>
                <polygon
                  points="0,0 80,0 80,30 30,30 30,90 0,90"
                  fill={animProgress === 1 ? '#bbf7d0' : '#dbeafe'}
                  stroke={animProgress === 1 ? '#16a34a' : '#2563eb'}
                  strokeWidth="4"
                />
              </g>
            )}

            {activeMode === 'rotated' && (
              <g
                transform={`translate(${230}, 140)`}
                style={{
                  transformOrigin: '270px 180px',
                  transform: `translate(${-(1 - animProgress) * 160}px, 0px) rotate(${(1 - animProgress) * 90}deg)`
                }}
              >
                <polygon
                  points="0,0 80,0 80,30 30,30 30,90 0,90"
                  fill={animProgress === 1 ? '#bbf7d0' : '#fed7aa'}
                  stroke={animProgress === 1 ? '#16a34a' : '#ea580c'}
                  strokeWidth="4"
                />
              </g>
            )}

            {activeMode === 'reflected' && (
              <g
                transform={`translate(${activeMode === 'reflected' ? 120 + animProgress * 110 : 60}, 140)`}
                style={{
                  transform: `scaleX(${animProgress < 0.5 ? 1 - 2 * animProgress : -1 + 2 * (animProgress - 0.5)})`
                }}
              >
                <polygon
                  points="0,0 80,0 80,30 30,30 30,90 0,90"
                  fill={animProgress === 1 ? '#bbf7d0' : '#fbcfe8'}
                  stroke={animProgress === 1 ? '#16a34a' : '#db2777'}
                  strokeWidth="4"
                />
              </g>
            )}
          </svg>

          {/* Overlap Status Banner */}
          {animProgress === 1 && (
            <div className="mt-4 flex items-center gap-2 text-emerald-800 bg-emerald-100 px-6 py-2.5 rounded-2xl font-black text-xl border border-emerald-300 animate-in fade-in">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 stroke-[3]" />
              <span>Shapes lock exactly! Position changes do not alter congruence.</span>
            </div>
          )}
        </div>

        {/* Controls Column */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            Select Transformation:
          </span>

          <div className="grid grid-cols-1 gap-2.5">
            <button
              onClick={() => {
                setActiveMode('rotated');
                setAnimProgress(0);
                setIsPlaying(false);
              }}
              className={`p-4 rounded-2xl text-left border-2 font-black transition-all ${
                activeMode === 'rotated'
                  ? 'bg-orange-600 text-white border-orange-700 shadow-xl'
                  : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="text-lg">1. Rotated (Turned)</div>
              <p className={`text-xs font-semibold ${activeMode === 'rotated' ? 'text-orange-100' : 'text-slate-500'}`}>
                Turned at an angle, but size and angles are preserved.
              </p>
            </button>

            <button
              onClick={() => {
                setActiveMode('translated');
                setAnimProgress(0);
                setIsPlaying(false);
              }}
              className={`p-4 rounded-2xl text-left border-2 font-black transition-all ${
                activeMode === 'translated'
                  ? 'bg-blue-600 text-white border-blue-700 shadow-xl'
                  : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="text-lg">2. Translated (Slid)</div>
              <p className={`text-xs font-semibold ${activeMode === 'translated' ? 'text-blue-100' : 'text-slate-500'}`}>
                Slid along a straight line without turning or flipping.
              </p>
            </button>

            <button
              onClick={() => {
                setActiveMode('reflected');
                setAnimProgress(0);
                setIsPlaying(false);
              }}
              className={`p-4 rounded-2xl text-left border-2 font-black transition-all ${
                activeMode === 'reflected'
                  ? 'bg-fuchsia-600 text-white border-fuchsia-700 shadow-xl'
                  : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="text-lg">3. Reflected (Flipped)</div>
              <p className={`text-xs font-semibold ${activeMode === 'reflected' ? 'text-fuchsia-100' : 'text-slate-500'}`}>
                Flipped over a mirror line to form a mirror image.
              </p>
            </button>
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={handlePlay}
              disabled={isPlaying}
              className="flex-1 h-16 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xl flex items-center justify-center gap-2 shadow-lg active:scale-95"
            >
              <Play className="w-6 h-6 fill-current" />
              <span>Play</span>
            </button>

            <button
              onClick={handleReset}
              className="w-16 h-16 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center active:scale-95 border-2 border-slate-200"
              title="Reset"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-orange-950 font-bold text-lg">
        <span>Turn it, slide it, or flip it — if it still fits exactly, it is CONGRUENT.</span>
      </div>
    </div>
  );
};
