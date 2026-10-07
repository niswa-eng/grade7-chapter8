import React, { useState } from 'react';
import { Check, X, AlertTriangle } from 'lucide-react';

export const RegularPolygonConcept: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<'regular-square' | 'rect-nonreg' | 'rhombus-nonreg'>('regular-square');

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-6xl mx-auto p-6 select-none">
      <div>
        <span className="text-sm font-black text-emerald-600 uppercase tracking-widest">
          Unit 8.2 · Regular Polygons
        </span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          What Makes a Polygon "Regular"?
        </h2>
        <p className="text-2xl font-bold text-slate-700 leading-snug">
          A regular polygon must satisfy <span className="text-emerald-600 font-extrabold">TWO conditions</span>: ALL sides equal length AND ALL angles equal size!
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8 items-center my-auto">
        {/* Visual Diagram */}
        <div className="col-span-12 md:col-span-7 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl flex flex-col items-center justify-center min-h-[420px]">
          {selectedDemo === 'regular-square' && (
            <div className="flex flex-col items-center">
              <svg viewBox="0 0 280 240" className="w-72 h-64 overflow-visible">
                {/* Regular Square: all sides equal, all angles 90 */}
                <rect x="50" y="30" width="180" height="180" fill="#ecfdf5" stroke="#059669" strokeWidth="4" />
                {/* 90 deg corner markers */}
                <rect x="50" y="30" width="18" height="18" fill="none" stroke="#059669" strokeWidth="2.5" />
                <rect x="212" y="30" width="18" height="18" fill="none" stroke="#059669" strokeWidth="2.5" />
                <rect x="50" y="192" width="18" height="18" fill="none" stroke="#059669" strokeWidth="2.5" />
                <rect x="212" y="192" width="18" height="18" fill="none" stroke="#059669" strokeWidth="2.5" />
                {/* Single tick marks on each of the 4 equal sides */}
                <line x1="140" y1="24" x2="140" y2="36" stroke="#059669" strokeWidth="3" />
                <line x1="140" y1="204" x2="140" y2="216" stroke="#059669" strokeWidth="3" />
                <line x1="44" y1="120" x2="56" y2="120" stroke="#059669" strokeWidth="3" />
                <line x1="224" y1="120" x2="236" y2="120" stroke="#059669" strokeWidth="3" />
              </svg>
              <div className="text-emerald-800 bg-emerald-100 px-6 py-2.5 rounded-2xl font-black text-lg border border-emerald-300 mt-2">
                ✓ ALL 4 sides equal AND ALL 4 angles equal (90°) → REGULAR
              </div>
            </div>
          )}

          {selectedDemo === 'rect-nonreg' && (
            <div className="flex flex-col items-center">
              <svg viewBox="0 0 280 240" className="w-72 h-64 overflow-visible">
                {/* Rectangle: angles equal (all 90), but sides NOT equal */}
                <rect x="30" y="55" width="220" height="130" fill="#fff7ed" stroke="#ea580c" strokeWidth="4" />
                {/* All angles 90 */}
                <rect x="30" y="55" width="18" height="18" fill="none" stroke="#16a34a" strokeWidth="2.5" />
                <rect x="232" y="55" width="18" height="18" fill="none" stroke="#16a34a" strokeWidth="2.5" />
                <rect x="30" y="167" width="18" height="18" fill="none" stroke="#16a34a" strokeWidth="2.5" />
                <rect x="232" y="167" width="18" height="18" fill="none" stroke="#16a34a" strokeWidth="2.5" />
                {/* Tick marks: double tick on long sides, single on short sides */}
                <line x1="137" y1="48" x2="137" y2="62" stroke="#ea580c" strokeWidth="3" />
                <line x1="143" y1="48" x2="143" y2="62" stroke="#ea580c" strokeWidth="3" />
                <line x1="137" y1="178" x2="137" y2="192" stroke="#ea580c" strokeWidth="3" />
                <line x1="143" y1="178" x2="143" y2="192" stroke="#ea580c" strokeWidth="3" />
                <line x1="24" y1="120" x2="36" y2="120" stroke="#ea580c" strokeWidth="3" />
                <line x1="244" y1="120" x2="256" y2="120" stroke="#ea580c" strokeWidth="3" />
              </svg>
              <div className="text-rose-800 bg-rose-100 px-6 py-2.5 rounded-2xl font-black text-lg border border-rose-300 mt-2">
                ✗ Angles all 90° (YES), but sides NOT all equal (NO) → NOT REGULAR
              </div>
            </div>
          )}

          {selectedDemo === 'rhombus-nonreg' && (
            <div className="flex flex-col items-center">
              <svg viewBox="0 0 280 240" className="w-72 h-64 overflow-visible">
                {/* Rhombus: all sides equal, but angles NOT all equal */}
                <polygon points="140,25 240,120 140,215 40,120" fill="#fef2f2" stroke="#dc2626" strokeWidth="4" />
                {/* Single tick marks on all 4 sides */}
                <line x1="88" y1="70" x2="96" y2="76" stroke="#dc2626" strokeWidth="3" />
                <line x1="184" y1="70" x2="192" y2="76" stroke="#dc2626" strokeWidth="3" />
                <line x1="88" y1="168" x2="96" y2="162" stroke="#dc2626" strokeWidth="3" />
                <line x1="184" y1="168" x2="192" y2="162" stroke="#dc2626" strokeWidth="3" />
                {/* Angle arcs: sharp top/bottom vs obtuse left/right */}
                <path d="M 130 50 A 20 20 0 0 0 150 50" fill="none" stroke="#2563eb" strokeWidth="2.5" />
                <path d="M 60 115 A 25 25 0 0 1 60 125" fill="none" stroke="#ea580c" strokeWidth="2.5" />
              </svg>
              <div className="text-rose-800 bg-rose-100 px-6 py-2.5 rounded-2xl font-black text-lg border border-rose-300 mt-2">
                ✗ Sides all equal (YES), but angles NOT equal (NO) → NOT REGULAR
              </div>
            </div>
          )}
        </div>

        {/* Comparison Selector */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-3">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            Compare Shapes:
          </span>

          <button
            onClick={() => setSelectedDemo('regular-square')}
            className={`p-4 rounded-2xl text-left border-2 font-black transition-all ${
              selectedDemo === 'regular-square'
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-xl scale-102'
                : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="text-lg">Square (Regular)</div>
            <p className={`text-xs mt-1 ${selectedDemo === 'regular-square' ? 'text-emerald-100' : 'text-slate-500'}`}>
              ✓ Sides equal AND ✓ Angles equal. Meets both criteria.
            </p>
          </button>

          <button
            onClick={() => setSelectedDemo('rect-nonreg')}
            className={`p-4 rounded-2xl text-left border-2 font-black transition-all ${
              selectedDemo === 'rect-nonreg'
                ? 'bg-rose-600 text-white border-rose-700 shadow-xl scale-102'
                : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="text-lg">Rectangle (Counterexample 1)</div>
            <p className={`text-xs mt-1 ${selectedDemo === 'rect-nonreg' ? 'text-rose-100' : 'text-slate-500'}`}>
              ✓ Angles all equal, but ✗ sides are different lengths.
            </p>
          </button>

          <button
            onClick={() => setSelectedDemo('rhombus-nonreg')}
            className={`p-4 rounded-2xl text-left border-2 font-black transition-all ${
              selectedDemo === 'rhombus-nonreg'
                ? 'bg-rose-600 text-white border-rose-700 shadow-xl scale-102'
                : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="text-lg">Rhombus (Counterexample 2)</div>
            <p className={`text-xs mt-1 ${selectedDemo === 'rhombus-nonreg' ? 'text-rose-100' : 'text-slate-500'}`}>
              ✓ Sides all equal, but ✗ angles are different sizes.
            </p>
          </button>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-bold text-lg">
        Golden rule: A polygon is ONLY regular when both conditions are satisfied!
      </div>
    </div>
  );
};
