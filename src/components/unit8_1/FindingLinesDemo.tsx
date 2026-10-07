import React, { useState } from 'react';
import { Play, RotateCcw, Check, X } from 'lucide-react';

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
  const [isFolded, setIsFolded] = useState<boolean>(false);

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
      angle: 32,
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
      reason: 'From top vertex to midpoint of base.'
    },
    {
      id: 'tri-line2',
      name: 'From Bottom-Right Vertex',
      isSymmetric: true,
      angle: 150,
      reason: 'From right vertex to opposite side midpoint.'
    },
    {
      id: 'tri-line3',
      name: 'Arbitrary Slanted Line',
      isSymmetric: false,
      angle: 45,
      reason: 'Does not pass through opposite midpoint! Fails fold test.'
    }
  ];

  const currentLines =
    selectedShape === 'rectangle' ? rectLines : selectedShape === 'kite' ? kiteLines : triLines;
  const activeLine = currentLines.find((l) => l.id === activeLineId) || currentLines[0];

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-6xl mx-auto p-6 select-none">
      <div>
        <span className="text-sm font-black text-blue-600 uppercase tracking-widest">
          Unit 8.1 · Concept 2
        </span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          Testing Candidate Lines of Symmetry
        </h2>
        <p className="text-2xl font-bold text-slate-700 leading-snug">
          Never assume a line is a line of symmetry without testing! Tap candidate lines below to run the fold test.
        </p>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-12 gap-8 items-center my-auto">
        {/* Visual Shape Stage */}
        <div className="col-span-12 md:col-span-7 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl flex flex-col items-center justify-center min-h-[400px] relative">
          <svg viewBox="0 0 320 280" className="w-80 h-72 drop-shadow-md overflow-visible">
            {selectedShape === 'rectangle' && (
              <>
                {/* Rectangle: 40,70 to 280,210 */}
                <rect x="40" y="70" width="240" height="140" fill="#eff6ff" stroke="#2563eb" strokeWidth="4" rx="2" />

                {/* Candidate Lines */}
                {activeLine.id === 'rect-vert' && (
                  <>
                    <line x1="160" y1="40" x2="160" y2="240" stroke="#c026d3" strokeWidth="4" strokeDasharray="8 6" />
                    {isFolded && (
                      <rect x="40" y="70" width="120" height="140" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="4" opacity="0.8" />
                    )}
                  </>
                )}
                {activeLine.id === 'rect-horiz' && (
                  <>
                    <line x1="20" y1="140" x2="300" y2="140" stroke="#c026d3" strokeWidth="4" strokeDasharray="8 6" />
                    {isFolded && (
                      <rect x="40" y="70" width="240" height="70" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="4" opacity="0.8" />
                    )}
                  </>
                )}
                {activeLine.id === 'rect-diag' && (
                  <>
                    <line x1="25" y1="55" x2="295" y2="225" stroke="#dc2626" strokeWidth="4" strokeDasharray="8 6" />
                    {isFolded && (
                      /* Folded corner sticking out */
                      <polygon points="40,70 280,210 200,260" fill="#fca5a5" stroke="#dc2626" strokeWidth="4" opacity="0.85" />
                    )}
                  </>
                )}
              </>
            )}

            {selectedShape === 'kite' && (
              <>
                <polygon points="160,30 260,110 160,250 60,110" fill="#fdf2f8" stroke="#db2777" strokeWidth="4" />
                {activeLine.id === 'kite-vert' && (
                  <>
                    <line x1="160" y1="10" x2="160" y2="270" stroke="#c026d3" strokeWidth="4" strokeDasharray="8 6" />
                    {isFolded && (
                      <polygon points="160,30 260,110 160,250" fill="#f472b6" stroke="#be185d" strokeWidth="3" opacity="0.75" />
                    )}
                  </>
                )}
                {activeLine.id === 'kite-horiz' && (
                  <>
                    <line x1="30" y1="110" x2="290" y2="110" stroke="#dc2626" strokeWidth="4" strokeDasharray="8 6" />
                    {isFolded && (
                      <polygon points="160,190 260,110 60,110" fill="#fca5a5" stroke="#dc2626" strokeWidth="3" opacity="0.8" />
                    )}
                  </>
                )}
              </>
            )}

            {selectedShape === 'equilateral' && (
              <>
                <polygon points="160,35 270,235 50,235" fill="#f0fdf4" stroke="#16a34a" strokeWidth="4" />
                {activeLine.id === 'tri-line1' && (
                  <line x1="160" y1="15" x2="160" y2="255" stroke="#c026d3" strokeWidth="4" strokeDasharray="8 6" />
                )}
                {activeLine.id === 'tri-line2' && (
                  <line x1="270" y1="235" x2="105" y2="135" stroke="#c026d3" strokeWidth="4" strokeDasharray="8 6" />
                )}
                {activeLine.id === 'tri-line3' && (
                  <line x1="80" y1="40" x2="220" y2="260" stroke="#dc2626" strokeWidth="4" strokeDasharray="8 6" />
                )}
              </>
            )}
          </svg>

          {/* Test Status Feedback */}
          <div className="mt-4 flex items-center gap-3">
            {activeLine.isSymmetric ? (
              <div className="flex items-center gap-2 text-emerald-800 bg-emerald-50 px-5 py-2.5 rounded-2xl border-2 border-emerald-300 font-extrabold text-lg">
                <Check className="w-6 h-6 text-emerald-600 stroke-[3]" />
                <span>Valid Line of Symmetry! Halves match perfectly.</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-rose-800 bg-rose-50 px-5 py-2.5 rounded-2xl border-2 border-rose-300 font-extrabold text-lg">
                <X className="w-6 h-6 text-rose-600 stroke-[3]" />
                <span>NOT a line of symmetry! Halves mismatch when folded.</span>
              </div>
            )}
          </div>
        </div>

        {/* Controls Column */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
          {/* Shape Selector */}
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2 block">
              Choose Shape:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  setSelectedShape('rectangle');
                  setActiveLineId('rect-diag');
                  setIsFolded(false);
                }}
                className={`h-14 rounded-2xl font-black text-sm border-2 transition-all ${
                  selectedShape === 'rectangle' ? 'bg-blue-600 text-white border-blue-700' : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                Rectangle
              </button>
              <button
                onClick={() => {
                  setSelectedShape('kite');
                  setActiveLineId('kite-vert');
                  setIsFolded(false);
                }}
                className={`h-14 rounded-2xl font-black text-sm border-2 transition-all ${
                  selectedShape === 'kite' ? 'bg-blue-600 text-white border-blue-700' : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                Kite
              </button>
              <button
                onClick={() => {
                  setSelectedShape('equilateral');
                  setActiveLineId('tri-line1');
                  setIsFolded(false);
                }}
                className={`h-14 rounded-2xl font-black text-sm border-2 transition-all ${
                  selectedShape === 'equilateral' ? 'bg-blue-600 text-white border-blue-700' : 'bg-white text-slate-700 border-slate-200'
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
                  onClick={() => {
                    setActiveLineId(line.id);
                    setIsFolded(false);
                  }}
                  className={`w-full p-4 rounded-2xl text-left border-2 font-black transition-all ${
                    activeLineId === line.id
                      ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                      : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-base">{line.name}</span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-lg font-black uppercase ${
                      line.isSymmetric ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                    }`}>
                      {line.isSymmetric ? 'Valid' : 'Invalid'}
                    </span>
                  </div>
                  <p className={`text-xs font-semibold ${activeLineId === line.id ? 'text-slate-300' : 'text-slate-500'}`}>
                    {line.reason}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Fold Trigger Button */}
          <button
            onClick={() => setIsFolded(!isFolded)}
            className="h-16 rounded-2xl bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-black text-xl flex items-center justify-center gap-3 shadow-lg shadow-fuchsia-600/30 active:scale-95"
          >
            <Play className="w-6 h-6 fill-current" />
            <span>{isFolded ? 'Unfold Shape' : 'Fold Along Line'}</span>
          </button>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 font-bold text-lg">
        Demonstration tool: The teacher taps lines and folds to prove why diagonal lines on a rectangle fail!
      </div>
    </div>
  );
};
