import React, { useState } from 'react';
import { PlusCircle, RotateCcw, ArrowRight, Check } from 'lucide-react';

export const CircleBuildDemo: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<number>(0); // 0: Centre, 1: Radius, 2: Diameter, 3: Circumference, 4: Chord, 5: Tangent
  const [chordAngle1, setChordAngle1] = useState<number>(45);
  const [chordAngle2, setChordAngle2] = useState<number>(190);
  const [tangentAngle, setTangentAngle] = useState<number>(30); // in degrees

  const stages = [
    {
      title: '1. The Centre',
      def: 'The point located exactly in the middle of the circle, equidistant from every point on the circumference.',
      color: '#ea580c'
    },
    {
      title: '2. Radius (Radii)',
      def: 'A straight line segment from the centre to any point on the circumference. Plural: radii. Every radius in a circle has the exact same length!',
      color: '#2563eb'
    },
    {
      title: '3. Diameter (d = 2r)',
      def: 'A straight line passing through the centre joining two points on the circle. Diameter = 2 × radius. If radius = 5 cm, diameter = 10 cm.',
      color: '#16a34a'
    },
    {
      title: '4. Circumference',
      def: 'The outer boundary or perimeter of the circle — the total distance all the way around.',
      color: '#0f172a'
    },
    {
      title: '5. Chord',
      def: 'A straight line joining any two points on the circle. The diameter is the longest chord possible!',
      color: '#9333ea'
    },
    {
      title: '6. Tangent (90° Rule)',
      def: 'A straight line that touches the circle at exactly ONE point. The tangent and the radius meet at a right angle (90°).',
      color: '#dc2626'
    }
  ];

  // Circle geometry
  const cx = 150;
  const cy = 150;
  const r = 90;

  // Chord endpoints
  const chordX1 = cx + r * Math.cos((chordAngle1 * Math.PI) / 180);
  const chordY1 = cy + r * Math.sin((chordAngle1 * Math.PI) / 180);
  const chordX2 = cx + r * Math.cos((chordAngle2 * Math.PI) / 180);
  const chordY2 = cy + r * Math.sin((chordAngle2 * Math.PI) / 180);

  // Tangent point and line
  const tanPx = cx + r * Math.cos((tangentAngle * Math.PI) / 180);
  const tanPy = cy + r * Math.sin((tangentAngle * Math.PI) / 180);
  const tanDx = -Math.sin((tangentAngle * Math.PI) / 180);
  const tanDy = Math.cos((tangentAngle * Math.PI) / 180);
  const tanLineX1 = tanPx - tanDx * 90;
  const tanLineY1 = tanPy - tanDy * 90;
  const tanLineX2 = tanPx + tanDx * 90;
  const tanLineY2 = tanPy + tanDy * 90;

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-6xl mx-auto p-6 select-none">
      <div>
        <span className="text-sm font-black text-emerald-600 uppercase tracking-widest">
          Unit 8.2 · Part A: Circles
        </span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          Building the Circle Step-by-Step
        </h2>
        <p className="text-2xl font-bold text-slate-700 leading-snug">
          Build the circle one feature at a time to explore its anatomy.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8 items-center my-auto">
        {/* Large Visual Circle Stage */}
        <div className="col-span-12 md:col-span-7 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl flex flex-col items-center justify-center min-h-[420px] relative">
          <svg viewBox="0 0 300 300" className="w-80 h-80 overflow-visible">
            {/* Circumference boundary */}
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="#f8fafc"
              stroke={currentStage >= 3 ? '#0f172a' : '#cbd5e1'}
              strokeWidth={currentStage === 3 ? '6' : '3.5'}
              strokeDasharray={currentStage < 3 ? '4 4' : 'none'}
            />

            {/* Glowing trace if at Circumference stage */}
            {currentStage === 3 && (
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="10"
                opacity="0.5"
              />
            )}

            {/* Stage 1+: Radius */}
            {currentStage >= 1 && (
              <>
                <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke="#2563eb" strokeWidth="4" />
                <circle cx={cx + r} cy={cy} r="5" fill="#2563eb" />
                <text x={cx + 45} y={cy - 10} className="text-sm font-black fill-blue-700">r</text>
              </>
            )}

            {/* Extra Radii animation demo in stage 1 */}
            {currentStage === 1 && (
              <>
                <line x1={cx} y1={cy} x2={cx} y2={cy - r} stroke="#60a5fa" strokeWidth="3" strokeDasharray="4 4" />
                <line x1={cx} y1={cy} x2={cx - r * 0.707} y2={cy + r * 0.707} stroke="#60a5fa" strokeWidth="3" strokeDasharray="4 4" />
              </>
            )}

            {/* Stage 2+: Diameter */}
            {currentStage >= 2 && (
              <>
                <line x1={cx - r} y1={cy} x2={cx} y2={cy} stroke="#16a34a" strokeWidth="4" />
                <circle cx={cx - r} cy={cy} r="5" fill="#16a34a" />
                <text x={cx - 55} y={cy - 10} className="text-sm font-black fill-emerald-700">r</text>
                <text x={cx} y={cy + 30} textAnchor="middle" className="text-base font-black fill-emerald-800">
                  d = 2r (Diameter)
                </text>
              </>
            )}

            {/* Stage 4+: Chord */}
            {currentStage >= 4 && (
              <>
                <line x1={chordX1} y1={chordY1} x2={chordX2} y2={chordY2} stroke="#9333ea" strokeWidth="4" />
                <circle cx={chordX1} cy={chordY1} r="7" fill="#9333ea" />
                <circle cx={chordX2} cy={chordY2} r="7" fill="#9333ea" />
                <text x={(chordX1 + chordX2) / 2} y={(chordY1 + chordY2) / 2 - 10} className="text-sm font-black fill-purple-800">
                  Chord
                </text>
              </>
            )}

            {/* Stage 5: Tangent */}
            {currentStage >= 5 && (
              <>
                {/* Radius to point of contact */}
                <line x1={cx} y1={cy} x2={tanPx} y2={tanPy} stroke="#ef4444" strokeWidth="3" strokeDasharray="4 4" />
                {/* Tangent line */}
                <line x1={tanLineX1} y1={tanLineY1} x2={tanLineX2} y2={tanLineY2} stroke="#dc2626" strokeWidth="4" />
                {/* Point of contact P */}
                <circle cx={tanPx} cy={tanPy} r="6" fill="#dc2626" />
                <text x={tanPx + 15} y={tanPy - 10} className="text-sm font-black fill-red-700">P (Tangent)</text>
                {/* 90 deg right-angle indicator */}
                <rect
                  x={tanPx - 10}
                  y={tanPy - 10}
                  width="12"
                  height="12"
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="2"
                  transform={`rotate(${tangentAngle} ${tanPx} ${tanPy})`}
                />
              </>
            )}

            {/* Centre point (Always visible) */}
            <circle cx={cx} cy={cy} r="7" fill="#ea580c" stroke="#ffffff" strokeWidth="2.5" />
            <text x={cx} y={cy - 12} textAnchor="middle" className="text-sm font-black fill-orange-600">O (Centre)</text>
          </svg>

          {/* Interactive controls for Stage 4 (Chord) or Stage 5 (Tangent) */}
          {currentStage === 4 && (
            <div className="w-full mt-3 p-3 bg-purple-50 rounded-2xl border border-purple-200 flex items-center justify-between">
              <span className="text-xs font-black text-purple-900">Chord Position:</span>
              <input
                type="range"
                min="0"
                max="360"
                value={chordAngle2}
                onChange={(e) => setChordAngle2(parseFloat(e.target.value))}
                className="w-40 accent-purple-600"
              />
              <button
                onClick={() => {
                  setChordAngle1(0);
                  setChordAngle2(180);
                }}
                className="px-3 py-1 bg-purple-600 text-white rounded-xl text-xs font-black active:scale-95"
              >
                Snap to Diameter
              </button>
            </div>
          )}

          {currentStage === 5 && (
            <div className="w-full mt-3 p-3 bg-red-50 rounded-2xl border border-red-200 flex items-center justify-between">
              <span className="text-xs font-black text-red-900">Tangent Angle:</span>
              <input
                type="range"
                min="0"
                max="360"
                value={tangentAngle}
                onChange={(e) => setTangentAngle(parseFloat(e.target.value))}
                className="w-56 accent-red-600"
              />
              <span className="text-xs font-mono font-bold text-red-700">{tangentAngle}°</span>
            </div>
          )}
        </div>

        {/* Stage Navigation & Explanations */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
          {/* Active Stage Card */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-black uppercase px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800">
                Part {currentStage + 1} of 6
              </span>
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-3" style={{ color: stages[currentStage].color }}>
              {stages[currentStage].title}
            </h3>
            <p className="text-xl font-bold text-slate-700 leading-snug">
              {stages[currentStage].def}
            </p>
          </div>

          {/* Stepper buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentStage((prev) => (prev + 1) % stages.length)}
              className="flex-1 h-16 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 active:scale-95"
            >
              <PlusCircle className="w-6 h-6" />
              <span>{currentStage === stages.length - 1 ? 'Start Over' : 'Add Next Part'}</span>
            </button>

            <button
              onClick={() => setCurrentStage(0)}
              className="w-16 h-16 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center active:scale-95 border-2 border-slate-200"
              title="Reset circle"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
          </div>

          {/* Quick jump stage buttons */}
          <div className="grid grid-cols-3 gap-2">
            {stages.map((stg, idx) => (
              <button
                key={stg.title}
                onClick={() => setCurrentStage(idx)}
                className={`p-2.5 rounded-xl text-center font-bold text-xs border-2 transition-all ${
                  currentStage === idx
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {stg.title.split('.')[1]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-bold text-lg">
        <span>Diameter = 2 × radius. The diameter is the longest chord in any circle.</span>
      </div>
    </div>
  );
};
