import React, { useState } from 'react';
import { Compass, Play, RotateCcw, Eye, EyeOff, Check } from 'lucide-react';

export const SketchingRegularPolygonDemo: React.FC = () => {
  const [selectedShape, setSelectedShape] = useState<'hexagon' | 'pentagon'>('hexagon');
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [showProtractor, setShowProtractor] = useState<boolean>(false);

  const n = selectedShape === 'hexagon' ? 6 : 5;
  const angleStep = selectedShape === 'hexagon' ? 60 : 72;

  const stepsText = [
    'Step 1: Draw a circle with a compass and mark the centre point O.',
    `Step 2: Calculate central angle: 360° ÷ ${n} = ${angleStep}°.`,
    `Step 3: Using a protractor, mark ${n} equally spaced points at ${angleStep}° intervals around the circle.`,
    'Step 4: Use a straightedge to join neighbouring points around the circumference.'
  ];

  // Circle geometry
  const cx = 150;
  const cy = 150;
  const r = 95;

  const points: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
    points.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-6xl mx-auto p-6 select-none">
      <div>
        <span className="text-sm font-black text-emerald-600 uppercase tracking-widest">
          Unit 8.2 · Construction Skill
        </span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          Sketching Regular Polygons (Circle Method)
        </h2>
        <p className="text-2xl font-bold text-slate-700 leading-snug">
          How to construct an exact regular polygon by dividing 360° around a circle.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8 items-center my-auto">
        {/* SVG Drawing Canvas */}
        <div className="col-span-12 md:col-span-7 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl flex flex-col items-center justify-center min-h-[420px] relative">
          <svg viewBox="0 0 300 300" className="w-80 h-80 overflow-visible">
            {/* Step 1+: Circle */}
            <circle cx={cx} cy={cy} r={r} fill="#f8fafc" stroke="#64748b" strokeWidth="3" strokeDasharray={stepIndex >= 3 ? '4 4' : 'none'} />
            <circle cx={cx} cy={cy} r="6" fill="#ea580c" />
            <text x={cx} y={cy - 12} textAnchor="middle" className="text-sm font-black fill-orange-600">O</text>

            {/* Step 2+: Angle radial lines */}
            {stepIndex >= 1 && (
              <g stroke="#93c5fd" strokeWidth="2" strokeDasharray="3 3">
                {points.map((pt, idx) => (
                  <line key={idx} x1={cx} y1={cy} x2={pt[0]} y2={pt[1]} />
                ))}
                {/* Arc showing angle */}
                <path d={`M ${cx} ${cy - 35} A 35 35 0 0 1 ${cx + 35 * Math.sin((angleStep * Math.PI) / 180)} ${cy - 35 * Math.cos((angleStep * Math.PI) / 180)}`} fill="none" stroke="#2563eb" strokeWidth="2.5" />
                <text x={cx + 18} y={cy - 42} className="text-xs font-black fill-blue-700">{angleStep}°</text>
              </g>
            )}

            {/* Step 3+: Marked Points */}
            {stepIndex >= 2 && (
              <g>
                {points.map((pt, idx) => (
                  <circle key={idx} cx={pt[0]} cy={pt[1]} r="7" fill="#dc2626" />
                ))}
              </g>
            )}

            {/* Step 4: Joined edges */}
            {stepIndex >= 3 && (
              <polygon
                points={points.map((p) => p.join(',')).join(' ')}
                fill="#ecfdf5"
                stroke="#059669"
                strokeWidth="4"
              />
            )}

            {/* Transparent Protractor Overlay */}
            {showProtractor && (
              <g opacity="0.65" pointerEvents="none">
                <circle cx={cx} cy={cy} r="85" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
                {/* Protractor degree tick marks */}
                {[...Array(36)].map((_, i) => {
                  const deg = i * 10;
                  const rad = (deg * Math.PI) / 180;
                  const inner = deg % 30 === 0 ? 70 : 77;
                  return (
                    <line
                      key={deg}
                      x1={cx + inner * Math.cos(rad)}
                      y1={cy + inner * Math.sin(rad)}
                      x2={cx + 85 * Math.cos(rad)}
                      y2={cy + 85 * Math.sin(rad)}
                      stroke="#854d0e"
                      strokeWidth={deg % 30 === 0 ? '2' : '1'}
                    />
                  );
                })}
                <text x={cx} y={cy + 50} textAnchor="middle" className="text-xs font-black fill-amber-900">
                  Protractor Guide (360°)
                </text>
              </g>
            )}
          </svg>

          {/* Protractor Toggle */}
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => setShowProtractor(!showProtractor)}
              className={`h-12 px-5 rounded-2xl font-black text-sm flex items-center gap-2 border-2 transition-all ${
                showProtractor
                  ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-md'
                  : 'bg-slate-100 text-slate-700 border-slate-300'
              }`}
            >
              {showProtractor ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showProtractor ? 'Hide Protractor' : 'Show Protractor'}</span>
            </button>
          </div>
        </div>

        {/* Stepper & Controls */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
          {/* Shape Selector */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setSelectedShape('hexagon');
                setStepIndex(0);
              }}
              className={`p-3.5 rounded-2xl font-black text-base border-2 transition-all ${
                selectedShape === 'hexagon'
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-md'
                  : 'bg-white text-slate-800 border-slate-200'
              }`}
            >
              Hexagon (60° steps)
            </button>
            <button
              onClick={() => {
                setSelectedShape('pentagon');
                setStepIndex(0);
              }}
              className={`p-3.5 rounded-2xl font-black text-base border-2 transition-all ${
                selectedShape === 'pentagon'
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-md'
                  : 'bg-white text-slate-800 border-slate-200'
              }`}
            >
              Pentagon (72° steps)
            </button>
          </div>

          {/* Active Step Card */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-md">
            <div className="text-xs font-black uppercase text-emerald-700 mb-1">
              Step {stepIndex + 1} of 4
            </div>
            <p className="text-xl font-extrabold text-slate-900 leading-snug">
              {stepsText[stepIndex]}
            </p>
          </div>

          {/* Step forward / replay buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setStepIndex((prev) => Math.min(3, prev + 1))}
              disabled={stepIndex >= 3}
              className={`flex-1 h-16 rounded-2xl font-black text-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 ${
                stepIndex >= 3
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                  : 'bg-emerald-600 text-white shadow-emerald-600/30 hover:bg-emerald-700'
              }`}
            >
              <Play className="w-6 h-6 fill-current" />
              <span>Next Step</span>
            </button>
            <button
              onClick={() => setStepIndex(0)}
              className="w-16 h-16 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center active:scale-95 border-2 border-slate-200"
              title="Reset construction"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-bold text-lg">
        <span>For a regular hexagon, the distance between neighbouring vertices is exactly equal to the radius of the circle.</span>
      </div>
    </div>
  );
};
