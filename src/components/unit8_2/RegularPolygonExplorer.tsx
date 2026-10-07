import React, { useState } from 'react';
import { regularPolygonsData } from '../../data/unit8_2_data';
import { Eye, EyeOff, Sparkles, Hash } from 'lucide-react';

export const RegularPolygonExplorer: React.FC = () => {
  const [n, setN] = useState<number>(5);
  const [showMirrorLines, setShowMirrorLines] = useState<boolean>(true);

  const poly = regularPolygonsData[n] || regularPolygonsData[5];

  // Generate regular polygon vertices mathematically
  const cx = 150;
  const cy = 150;
  const radius = 100;
  const points: [number, number][] = [];

  for (let i = 0; i < n; i++) {
    // Start at top (-90 degrees)
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / n;
    points.push([cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)]);
  }

  const pointsString = points.map((p) => p.join(',')).join(' ');

  // Generate mirror lines
  const mirrorLines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  if (n % 2 === 1) {
    // Odd n: line from each vertex through opposite side midpoint
    for (let i = 0; i < n; i++) {
      const v = points[i];
      const oppIdx1 = (i + Math.floor(n / 2)) % n;
      const oppIdx2 = (i + Math.ceil(n / 2)) % n;
      const midX = (points[oppIdx1][0] + points[oppIdx2][0]) / 2;
      const midY = (points[oppIdx1][1] + points[oppIdx2][1]) / 2;
      mirrorLines.push({ x1: v[0], y1: v[1], x2: midX, y2: midY });
    }
  } else {
    // Even n: n/2 lines through opposite vertices + n/2 lines through opposite midpoints
    for (let i = 0; i < n / 2; i++) {
      const v1 = points[i];
      const v2 = points[i + n / 2];
      mirrorLines.push({ x1: v1[0], y1: v1[1], x2: v2[0], y2: v2[1] });

      const m1x = (points[i][0] + points[(i + 1) % n][0]) / 2;
      const m1y = (points[i][1] + points[(i + 1) % n][1]) / 2;
      const m2x = (points[i + n / 2][0] + points[(i + n / 2 + 1) % n][0]) / 2;
      const m2y = (points[i + n / 2][1] + points[(i + n / 2 + 1) % n][1]) / 2;
      mirrorLines.push({ x1: m1x, y1: m1y, x2: m2x, y2: m2y });
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-6xl mx-auto p-6 select-none">
      <div>
        <span className="text-sm font-black text-emerald-600 uppercase tracking-widest">
          Unit 8.2 · Interactive Model
        </span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          Regular Polygon Explorer (n = 3 to 10)
        </h2>
        <p className="text-2xl font-bold text-slate-700 leading-snug">
          Rule: A regular polygon with <span className="text-blue-600 font-extrabold font-mono">n</span> sides has <span className="text-blue-600 font-extrabold font-mono">n</span> equal angles, <span className="text-fuchsia-600 font-extrabold font-mono">n</span> lines of symmetry, and order of rotational symmetry <span className="text-purple-600 font-extrabold font-mono">n</span>!
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8 items-center my-auto">
        {/* SVG Polygon Canvas */}
        <div className="col-span-12 md:col-span-7 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl flex flex-col items-center justify-center min-h-[420px] relative">
          <div className="text-2xl font-black text-slate-900 mb-2">
            {poly.name}
          </div>

          <svg viewBox="0 0 300 300" className="w-80 h-72 overflow-visible">
            {/* Regular Polygon */}
            <polygon
              points={pointsString}
              fill="#ecfdf5"
              stroke="#059669"
              strokeWidth="4.5"
            />

            {/* Vertices */}
            {points.map((pt, idx) => (
              <circle key={idx} cx={pt[0]} cy={pt[1]} r="5" fill="#059669" />
            ))}

            {/* Mirror lines */}
            {showMirrorLines && (
              <g stroke="#c026d3" strokeWidth="2.5" strokeDasharray="6 6">
                {mirrorLines.map((ml, idx) => (
                  <line key={idx} x1={ml.x1} y1={ml.y1} x2={ml.x2} y2={ml.y2} />
                ))}
              </g>
            )}

            {/* Centre point */}
            <circle cx={cx} cy={cy} r="6" fill="#ea580c" />
          </svg>

          {/* Toggle Mirror Lines */}
          <button
            onClick={() => setShowMirrorLines(!showMirrorLines)}
            className={`mt-3 h-12 px-5 rounded-2xl font-black text-sm flex items-center gap-2 border-2 transition-all ${
              showMirrorLines
                ? 'bg-fuchsia-600 text-white border-fuchsia-700 shadow-md'
                : 'bg-slate-100 text-slate-700 border-slate-300'
            }`}
          >
            {showMirrorLines ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showMirrorLines ? `Hide ${poly.linesOfSymmetry} Mirror Lines` : 'Show Mirror Lines'}</span>
          </button>
        </div>

        {/* Data Cards & Stepper */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
          {/* Quick n Buttons */}
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2 block">
              Sides (n):
            </span>
            <div className="flex gap-2 flex-wrap">
              {[3, 4, 5, 6, 8, 10].map((num) => (
                <button
                  key={num}
                  onClick={() => setN(num)}
                  className={`h-12 w-14 rounded-2xl font-black font-mono text-lg border-2 transition-all active:scale-95 ${
                    n === num
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-lg scale-105'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Large Slider */}
          <div className="p-4 bg-white rounded-3xl border-2 border-slate-200 shadow-md">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-black text-slate-600 uppercase">Number of sides (n):</span>
              <span className="text-3xl font-black font-mono text-emerald-700">{n}</span>
            </div>
            <input
              type="range"
              min="3"
              max="10"
              step="1"
              value={n}
              onChange={(e) => setN(parseInt(e.target.value))}
              className="w-full h-4 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          {/* Mathematical Properties Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border-2 border-slate-800 space-y-3">
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-sm text-slate-300 font-bold">Number of Sides:</span>
              <span className="text-2xl font-mono font-black text-amber-400">{poly.sides}</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-sm text-slate-300 font-bold">Number of Angles:</span>
              <span className="text-2xl font-mono font-black text-amber-400">{poly.angles}</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-sm text-slate-300 font-bold">Lines of Symmetry:</span>
              <span className="text-2xl font-mono font-black text-sky-400">{poly.linesOfSymmetry}</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-sm text-slate-300 font-bold">Order of Rotation:</span>
              <span className="text-2xl font-mono font-black text-purple-400">Order {poly.orderOfRotation}</span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="text-sm text-slate-300 font-bold">Each Interior Angle:</span>
              <span className="text-2xl font-mono font-black text-emerald-400">{poly.interiorAngleDisplay}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-bold text-lg">
        <span>For a regular heptagon (n = 7) and nonagon (n = 9), the interior angle is not a whole number.</span>
      </div>
    </div>
  );
};
