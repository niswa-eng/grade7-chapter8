import React, { useState } from 'react';
import { XCircle, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

export const NonExamples83: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<'size' | 'angles' | 'shape'>('size');
  const [isOverlaying, setIsOverlaying] = useState<boolean>(false);

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-6xl mx-auto p-6 select-none">
      <div>
        <span className="text-sm font-black text-rose-600 uppercase tracking-widest flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4" /> Non-Examples
        </span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          When Shapes Are NOT Congruent
        </h2>
        <p className="text-2xl font-bold text-slate-700 leading-snug">
          If either the shape OR the size is different, the shapes are NOT congruent!
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8 items-center my-auto">
        {/* SVG Display Stage */}
        <div className="col-span-12 md:col-span-7 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl flex flex-col items-center justify-center min-h-[420px] relative">
          {selectedCase === 'size' && (
            <div className="flex flex-col items-center">
              <svg viewBox="0 0 340 220" className="w-full h-56 overflow-visible">
                {/* Square 1: 3cm */}
                <rect x={isOverlaying ? 130 : 50} y={isOverlaying ? 70 : 80} width="80" height="80" fill="#fed7aa" stroke="#ea580c" strokeWidth="3" opacity={isOverlaying ? 0.7 : 1} />
                <text x={isOverlaying ? 170 : 90} y={isOverlaying ? 60 : 70} textAnchor="middle" className="text-sm font-black fill-orange-800">3 cm square</text>

                {/* Square 2: 5cm */}
                <rect x="130" y="50" width="140" height="140" fill="#dbeafe" stroke="#2563eb" strokeWidth="4" />
                <text x="200" y="40" textAnchor="middle" className="text-sm font-black fill-blue-800">5 cm square</text>
              </svg>
              <div className="text-rose-800 bg-rose-50 px-5 py-2.5 rounded-2xl font-black text-base border-2 border-rose-300 mt-2 text-center">
                Same shape, but DIFFERENT SIZE → They are <span className="text-purple-700 font-extrabold underline">SIMILAR</span>, NOT CONGRUENT!
              </div>
            </div>
          )}

          {selectedCase === 'angles' && (
            <div className="flex flex-col items-center">
              <svg viewBox="0 0 340 220" className="w-full h-56 overflow-visible">
                {/* Rectangle 6x3 */}
                <rect x={isOverlaying ? 130 : 40} y={isOverlaying ? 70 : 70} width="130" height="70" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" opacity={isOverlaying ? 0.7 : 1} />
                <text x={isOverlaying ? 195 : 105} y="60" textAnchor="middle" className="text-xs font-black fill-blue-800">Rectangle (90° angles)</text>

                {/* Parallelogram 6x3 */}
                <polygon points="160,70 290,70 260,140 130,140" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />
                <text x="210" y="165" textAnchor="middle" className="text-xs font-black fill-amber-800">Parallelogram (Slanted angles)</text>
              </svg>
              <div className="text-rose-800 bg-rose-50 px-5 py-2.5 rounded-2xl font-black text-base border-2 border-rose-300 mt-2 text-center">
                Same side lengths (6 cm and 3 cm), but DIFFERENT ANGLES → NOT CONGRUENT!
              </div>
            </div>
          )}

          {selectedCase === 'shape' && (
            <div className="flex flex-col items-center">
              <svg viewBox="0 0 340 220" className="w-full h-56 overflow-visible">
                {/* Normal L-Shape */}
                <polygon points="40,60 110,60 110,90 70,90 70,150 40,150" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
                <text x="75" y="50" textAnchor="middle" className="text-xs font-black fill-blue-800">Shape A</text>

                {/* Modified L-Shape with longer arm */}
                <polygon points="180,60 280,60 280,90 210,90 210,150 180,150" fill="#fee2e2" stroke="#dc2626" strokeWidth="3" />
                <text x="230" y="50" textAnchor="middle" className="text-xs font-black fill-red-800">Shape B (Longer top arm)</text>
              </svg>
              <div className="text-rose-800 bg-rose-50 px-5 py-2.5 rounded-2xl font-black text-base border-2 border-rose-300 mt-2 text-center">
                One arm is longer → Shapes are DIFFERENT → NOT CONGRUENT!
              </div>
            </div>
          )}

          {/* Overlay Toggle Button */}
          <button
            onClick={() => setIsOverlaying(!isOverlaying)}
            className="mt-4 h-12 px-6 rounded-2xl bg-slate-900 text-white font-black text-sm flex items-center gap-2 active:scale-95 shadow-md"
          >
            <Layers className="w-4 h-4" />
            <span>{isOverlaying ? 'Separate' : 'Overlay'}</span>
          </button>
        </div>

        {/* Case Selector */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-3">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            Counterexamples:
          </span>

          <button
            onClick={() => {
              setSelectedCase('size');
              setIsOverlaying(false);
            }}
            className={`p-4 rounded-2xl text-left border-2 font-black transition-all ${
              selectedCase === 'size'
                ? 'bg-rose-600 text-white border-rose-700 shadow-xl'
                : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="text-lg">Case 1: Same Shape, Different Size</div>
            <p className={`text-xs mt-1 ${selectedCase === 'size' ? 'text-rose-100' : 'text-slate-500'}`}>
              One square is enlarged. They are "similar", not congruent.
            </p>
          </button>

          <button
            onClick={() => {
              setSelectedCase('angles');
              setIsOverlaying(false);
            }}
            className={`p-4 rounded-2xl text-left border-2 font-black transition-all ${
              selectedCase === 'angles'
                ? 'bg-rose-600 text-white border-rose-700 shadow-xl'
                : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="text-lg">Case 2: Same Sides, Different Angles</div>
            <p className={`text-xs mt-1 ${selectedCase === 'angles' ? 'text-rose-100' : 'text-slate-500'}`}>
              Rectangle vs Parallelogram with sides 6 cm &amp; 3 cm.
            </p>
          </button>

          <button
            onClick={() => {
              setSelectedCase('shape');
              setIsOverlaying(false);
            }}
            className={`p-4 rounded-2xl text-left border-2 font-black transition-all ${
              selectedCase === 'shape'
                ? 'bg-rose-600 text-white border-rose-700 shadow-xl'
                : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="text-lg">Case 3: Slightly Different Shape</div>
            <p className={`text-xs mt-1 ${selectedCase === 'shape' ? 'text-rose-100' : 'text-slate-500'}`}>
              Two L-shapes where one arm length is different.
            </p>
          </button>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-orange-950 font-bold text-lg">
        <span>"Similar" means same shape but different size. Congruent requires both shape and size to be identical.</span>
      </div>
    </div>
  );
};
