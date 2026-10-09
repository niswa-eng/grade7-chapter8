import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Check, X, CheckCircle, XCircle } from 'lucide-react';

interface CandidateLine {
  id: string;
  name: string;
  isSymmetric: boolean;
  angle: number; // degrees
  reason: string;
}

export const FindingLinesDemo: React.FC = () => {
  const [selectedShape, setSelectedShape] = useState<'rectangle' | 'kite' | 'equilateral'>('rectangle');
  const [activeLineId, setActiveLineId] = useState<string>('rect-diag');
  const [foldProgress, setFoldProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Rectangle candidate lines
  const rectLines: CandidateLine[] = [
    {
      id: 'rect-vert',
      name: 'Vertical Midline',
      isSymmetric: true,
      angle: 90,
      reason: 'Bisects top and bottom edges. Left folds onto right.'
    },
    {
      id: 'rect-horiz',
      name: 'Horizontal Midline',
      isSymmetric: true,
      angle: 0,
      reason: 'Bisects left and right edges. Top folds onto bottom.'
    },
    {
      id: 'rect-diag',
      name: 'Diagonal Line (A to C)',
      isSymmetric: false,
      angle: 30.26,
      reason: 'A rectangle diagonal is NOT a line of symmetry! The folded corner sticks out.'
    }
  ];

  // Kite candidate lines
  const kiteLines: CandidateLine[] = [
    {
      id: 'kite-vert',
      name: 'Main Vertical Axis',
      isSymmetric: true,
      angle: 90,
      reason: 'Connects the vertices between equal pairs of sides. Perfect symmetry.'
    },
    {
      id: 'kite-horiz',
      name: 'Cross Horizontal Diagonal',
      isSymmetric: false,
      angle: 0,
      reason: 'Top pair of sides is shorter than bottom pair! Fold does not match.'
    }
  ];

  // Equilateral triangle candidate lines
  const triLines: CandidateLine[] = [
    {
      id: 'tri-line1',
      name: 'Vertical from Top Vertex',
      isSymmetric: true,
      angle: 90,
      reason: 'From top vertex to midpoint of base. Divides triangle into two equal halves.'
    },
    {
      id: 'tri-line2',
      name: 'From Bottom-Right Vertex',
      isSymmetric: true,
      angle: 30,
      reason: 'From right vertex to opposite side midpoint. Perfect reflection.'
    },
    {
      id: 'tri-line3',
      name: 'Slanted Line (Off-Midpoint)',
      isSymmetric: false,
      angle: 73.18,
      reason: 'Misses the opposite midpoint! Halves do not overlap when folded.'
    }
  ];

  const currentLines =
    selectedShape === 'rectangle' ? rectLines : selectedShape === 'kite' ? kiteLines : triLines;
  const activeLine = currentLines.find((l) => l.id === activeLineId) || currentLines[0];

  // Fold animation loop
  useEffect(() => {
    let animId: number;
    if (isPlaying) {
      const startTime = performance.now();
      const duration = 1600;

      const animate = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(1, elapsed / duration);
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

  const handleSelectShape = (shape: 'rectangle' | 'kite' | 'equilateral') => {
    setSelectedShape(shape);
    setIsPlaying(false);
    setFoldProgress(0);
    if (shape === 'rectangle') setActiveLineId('rect-diag');
    if (shape === 'kite') setActiveLineId('kite-vert');
    if (shape === 'equilateral') setActiveLineId('tri-line1');
  };

  const handleSelectLine = (id: string) => {
    setActiveLineId(id);
    setIsPlaying(false);
    setFoldProgress(0);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-6xl mx-auto p-6 select-none overflow-y-auto">
      <div>
        <span className="text-sm font-black text-blue-600 uppercase tracking-widest">
          Unit 8.1 · Concept 2
        </span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          Testing Candidate Lines of Symmetry
        </h2>
        <p className="text-2xl font-bold text-slate-700 leading-snug">
          Watch paper fold along candidate lines. Does the folded half fit exactly on the other half?
        </p>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-12 gap-8 items-center my-auto">
        {/* Visual Shape Stage with Folding Animation */}
        <div className="col-span-12 lg:col-span-7 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl flex flex-col items-center justify-center min-h-[420px] relative">
          <svg viewBox="0 0 320 300" className="w-80 h-76 drop-shadow-md overflow-visible">
            {/* 1. RECTANGLE CANVAS */}
            {selectedShape === 'rectangle' && (
              <>
                {/* Base Rectangle: 40,70 to 280,210 */}
                <rect x="40" y="70" width="240" height="140" fill="#eff6ff" stroke="#2563eb" strokeWidth="4" rx="2" />

                {/* Candidate Line: Vertical Midline */}
                {activeLine.id === 'rect-vert' && (
                  <>
                    <g
                      style={{
                        transformOrigin: '160px 140px',
                        transform: `scaleX(${1 - 2 * foldProgress})`,
                        opacity: 0.9
                      }}
                    >
                      <rect x="40" y="70" width="120" height="140" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="3.5" />
                    </g>
                    <line x1="160" y1="40" x2="160" y2="240" stroke="#c026d3" strokeWidth="4" strokeDasharray="8 6" />
                  </>
                )}

                {/* Candidate Line: Horizontal Midline */}
                {activeLine.id === 'rect-horiz' && (
                  <>
                    <g
                      style={{
                        transformOrigin: '160px 140px',
                        transform: `scaleY(${1 - 2 * foldProgress})`,
                        opacity: 0.9
                      }}
                    >
                      <rect x="40" y="70" width="240" height="70" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="3.5" />
                    </g>
                    <line x1="20" y1="140" x2="300" y2="140" stroke="#c026d3" strokeWidth="4" strokeDasharray="8 6" />
                  </>
                )}

                {/* Candidate Line: Diagonal Line (NOT a line of symmetry) */}
                {activeLine.id === 'rect-diag' && (
                  <>
                    {/* Top-right triangle folding across diagonal */}
                    <g
                      style={{
                        transformOrigin: '160px 140px',
                        transform: `rotate(30.26deg) scaleY(${1 - 2 * foldProgress}) rotate(-30.26deg)`,
                        opacity: 0.88
                      }}
                    >
                      <polygon
                        points="40,70 280,70 280,210"
                        fill={foldProgress > 0.5 ? '#fca5a5' : '#93c5fd'}
                        stroke={foldProgress > 0.5 ? '#dc2626' : '#1d4ed8'}
                        strokeWidth="3.5"
                      />
                      {/* Corner marker */}
                      <circle cx="280" cy="70" r="5" fill="#dc2626" stroke="#ffffff" strokeWidth="1.5" />
                    </g>

                    <line x1="20" y1="58" x2="300" y2="222" stroke="#dc2626" strokeWidth="4" strokeDasharray="8 6" />

                    {/* Mismatch indicator tag when fully folded */}
                    {foldProgress > 0.8 && (
                      <g opacity={Math.min(1, (foldProgress - 0.8) * 5)}>
                        <path d="M 158 279 L 175 295 L 235 295" fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="3 3" />
                        <rect x="235" y="282" width="75" height="22" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
                        <text x="272" y="296" textAnchor="middle" className="text-[10px] font-black fill-red-700 font-mono">
                          Sticks Out!
                        </text>
                      </g>
                    )}
                  </>
                )}
              </>
            )}

            {/* 2. KITE CANVAS */}
            {selectedShape === 'kite' && (
              <>
                {/* Base Kite: (160, 30), (260, 110), (160, 250), (60, 110) */}
                <polygon points="160,30 260,110 160,250 60,110" fill="#fdf2f8" stroke="#db2777" strokeWidth="4" />

                {/* Candidate Line: Main Vertical Axis */}
                {activeLine.id === 'kite-vert' && (
                  <>
                    <g
                      style={{
                        transformOrigin: '160px 140px',
                        transform: `scaleX(${1 - 2 * foldProgress})`,
                        opacity: 0.9
                      }}
                    >
                      <polygon points="160,30 60,110 160,250" fill="#f472b6" stroke="#be185d" strokeWidth="3.5" />
                    </g>
                    <line x1="160" y1="10" x2="160" y2="270" stroke="#c026d3" strokeWidth="4" strokeDasharray="8 6" />
                  </>
                )}

                {/* Candidate Line: Cross Horizontal Diagonal */}
                {activeLine.id === 'kite-horiz' && (
                  <>
                    <g
                      style={{
                        transformOrigin: '160px 110px',
                        transform: `scaleY(${1 - 2 * foldProgress})`,
                        opacity: 0.88
                      }}
                    >
                      <polygon
                        points="60,110 160,30 260,110"
                        fill={foldProgress > 0.5 ? '#fca5a5' : '#f472b6'}
                        stroke={foldProgress > 0.5 ? '#dc2626' : '#be185d'}
                        strokeWidth="3.5"
                      />
                    </g>
                    <line x1="30" y1="110" x2="290" y2="110" stroke="#dc2626" strokeWidth="4" strokeDasharray="8 6" />

                    {/* Mismatch note */}
                    {foldProgress > 0.8 && (
                      <g opacity={Math.min(1, (foldProgress - 0.8) * 5)}>
                        <rect x="110" y="210" width="100" height="22" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
                        <text x="160" y="224" textAnchor="middle" className="text-[10px] font-black fill-red-700 font-mono">
                          Falls Short!
                        </text>
                      </g>
                    )}
                  </>
                )}
              </>
            )}

            {/* 3. EQUILATERAL TRIANGLE CANVAS */}
            {selectedShape === 'equilateral' && (
              <>
                {/* Base Triangle: (160, 35), (265, 217), (55, 217) */}
                <polygon points="160,35 265,217 55,217" fill="#f0fdf4" stroke="#16a34a" strokeWidth="4" />

                {/* Candidate Line: Vertical Altitude */}
                {activeLine.id === 'tri-line1' && (
                  <>
                    <g
                      style={{
                        transformOrigin: '160px 126px',
                        transform: `scaleX(${1 - 2 * foldProgress})`,
                        opacity: 0.9
                      }}
                    >
                      <polygon points="160,35 55,217 160,217" fill="#86efac" stroke="#15803d" strokeWidth="3.5" />
                    </g>
                    <line x1="160" y1="15" x2="160" y2="245" stroke="#c026d3" strokeWidth="4" strokeDasharray="8 6" />
                  </>
                )}

                {/* Candidate Line: From Bottom-Right Vertex */}
                {activeLine.id === 'tri-line2' && (
                  <>
                    <g
                      style={{
                        transformOrigin: '186.25px 171.5px',
                        transform: `rotate(30deg) scaleY(${1 - 2 * foldProgress}) rotate(-30deg)`,
                        opacity: 0.9
                      }}
                    >
                      <polygon points="265,217 160,35 107.5,126" fill="#86efac" stroke="#15803d" strokeWidth="3.5" />
                      {/* Guide pin at top vertex (160, 35) that folds onto bottom-left vertex (55, 217) */}
                      <circle cx="160" cy="35" r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                    </g>
                    <line x1="285" y1="228" x2="88" y2="114" stroke="#c026d3" strokeWidth="4" strokeDasharray="8 6" />
                  </>
                )}

                {/* Candidate Line: Slanted Line (Off-Midpoint) */}
                {activeLine.id === 'tri-line3' && (
                  <>
                    <g
                      style={{
                        transformOrigin: '187.5px 126px',
                        transform: `rotate(73.18deg) scaleY(${1 - 2 * foldProgress}) rotate(-73.18deg)`,
                        opacity: 0.88
                      }}
                    >
                      <polygon
                        points="160,35 265,217 215,217"
                        fill={foldProgress > 0.5 ? '#fca5a5' : '#86efac'}
                        stroke={foldProgress > 0.5 ? '#dc2626' : '#15803d'}
                        strokeWidth="3.5"
                      />
                      {/* Corner pin at (265, 217) that reflects below base to (173, 245) */}
                      <circle cx="265" cy="217" r="5" fill="#dc2626" stroke="#ffffff" strokeWidth="1.5" />
                    </g>
                    {/* Slanted Line passing through top vertex (160, 35) to (215, 217) on base */}
                    <line x1="145" y1="-1" x2="228" y2="260" stroke="#dc2626" strokeWidth="4" strokeDasharray="8 6" />

                    {/* Mismatch indicator tag when fully folded */}
                    {foldProgress > 0.8 && (
                      <g opacity={Math.min(1, (foldProgress - 0.8) * 5)}>
                        <path d="M 173 245 L 185 275 L 245 275" fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="3 3" />
                        <rect x="245" y="262" width="72" height="22" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
                        <text x="281" y="276" textAnchor="middle" className="text-[10px] font-black fill-red-700 font-mono">
                          Sticks Out!
                        </text>
                      </g>
                    )}
                  </>
                )}
              </>
            )}
          </svg>

          {/* Test Status Feedback Banner */}
          <div className="mt-4 flex items-center gap-3">
            {activeLine.isSymmetric ? (
              <div className="flex items-center gap-2 text-emerald-800 bg-emerald-50 px-5 py-2.5 rounded-2xl border-2 border-emerald-300 font-extrabold text-base">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
                <span>Line of Symmetry! Halves fold &amp; match exactly.</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-rose-800 bg-rose-50 px-5 py-2.5 rounded-2xl border-2 border-rose-300 font-extrabold text-base">
                <XCircle className="w-6 h-6 text-rose-600" />
                <span>NOT a Line of Symmetry! Halves do not overlap.</span>
              </div>
            )}
          </div>
        </div>

        {/* Controls Column */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
          {/* Shape Selector */}
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2 block">
              Select 2D Shape:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleSelectShape('rectangle')}
                className={`h-12 rounded-xl font-black text-xs border-2 transition-all ${
                  selectedShape === 'rectangle' ? 'bg-blue-600 text-white border-blue-700 shadow-sm' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Rectangle
              </button>
              <button
                onClick={() => handleSelectShape('kite')}
                className={`h-12 rounded-xl font-black text-xs border-2 transition-all ${
                  selectedShape === 'kite' ? 'bg-blue-600 text-white border-blue-700 shadow-sm' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Kite
              </button>
              <button
                onClick={() => handleSelectShape('equilateral')}
                className={`h-12 rounded-xl font-black text-xs border-2 transition-all ${
                  selectedShape === 'equilateral' ? 'bg-blue-600 text-white border-blue-700 shadow-sm' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Equilateral ▲
              </button>
            </div>
          </div>

          {/* Candidate Lines to Test */}
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2 block">
              Candidate Lines to Test:
            </span>
            <div className="space-y-2">
              {currentLines.map((line) => (
                <button
                  key={line.id}
                  onClick={() => handleSelectLine(line.id)}
                  className={`w-full p-3 rounded-2xl text-left border-2 font-black transition-all ${
                    activeLineId === line.id
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                      : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-sm">{line.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-lg font-black uppercase ${
                      line.isSymmetric ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                    }`}>
                      {line.isSymmetric ? 'Symmetry' : 'Not Symmetry'}
                    </span>
                  </div>
                  <p className={`text-xs font-semibold leading-relaxed ${activeLineId === line.id ? 'text-slate-300' : 'text-slate-500'}`}>
                    {line.reason}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Fold Trigger Controls (Play Fold / Reset just like Slide 3) */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePlayFold}
              disabled={isPlaying}
              className="flex-1 h-14 rounded-2xl bg-fuchsia-600 hover:bg-fuchsia-700 disabled:opacity-50 text-white font-black text-base flex items-center justify-center gap-2 shadow-lg shadow-fuchsia-600/25 active:scale-95 transition-all"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>{foldProgress > 0 && !isPlaying ? 'Play Fold Again' : 'Play Fold Test'}</span>
            </button>
            <button
              onClick={handleReset}
              className="w-14 h-14 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center border border-slate-200 active:scale-95"
              title="Reset fold"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 font-bold text-sm">
        <span><strong>Cambridge Rule:</strong> A line of symmetry divides a shape into two parts that fold exactly onto each other without sticking out!</span>
      </div>
    </div>
  );
};
