import React, { useState, useEffect } from 'react';
import { RotateCcw, Box, Square, ArrowUpRight, Play, Pause } from 'lucide-react';

export const DimensionsDemo: React.FC = () => {
  const [extrudeProgress, setExtrudeProgress] = useState<number>(0); // 0 = 2D flat, 1 = 3D cube
  const [isAutoExtruding, setIsAutoExtruding] = useState<boolean>(false);

  // Auto extrusion loop
  useEffect(() => {
    let animId: number;
    if (isAutoExtruding) {
      let forward = true;
      const step = () => {
        setExtrudeProgress((prev) => {
          if (forward) {
            if (prev >= 1) {
              forward = false;
              return 1;
            }
            return Math.min(1, prev + 0.02);
          } else {
            if (prev <= 0) {
              forward = true;
              return 0;
            }
            return Math.max(0, prev - 0.02);
          }
        });
        animId = requestAnimationFrame(step);
      };
      animId = requestAnimationFrame(step);
    }
    return () => cancelAnimationFrame(animId);
  }, [isAutoExtruding]);

  const p = extrudeProgress;
  // Dynamic isometric projection based on progress p
  const depthX = 55 * p;
  const depthY = 45 * p;

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-6xl mx-auto p-6 select-none">
      <div>
        <span className="text-sm font-black text-purple-600 uppercase tracking-widest">
          Unit 8.4 · Concept 1
        </span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          2D Shapes vs 3D Solids
        </h2>
        <p className="text-2xl font-bold text-slate-700 leading-snug">
          A <span className="text-blue-600 font-extrabold">2D shape is flat</span> (length and width). A <span className="text-purple-600 font-extrabold">3D solid</span> has length, width, and <strong className="text-purple-700 underline">height</strong>!
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8 items-center my-auto">
        {/* SVG Pop-up Canvas */}
        <div className="col-span-12 md:col-span-7 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl flex flex-col items-center justify-center min-h-[420px] relative">
          <svg viewBox="0 0 340 280" className="w-88 h-72 overflow-visible">
            <g transform="translate(75, 75)">
              {/* Back Top Face (appears as p increases) */}
              {p > 0.02 && (
                <polygon
                  points={`0,0 ${depthX},${-depthY} ${140 + depthX},${-depthY} 140,0`}
                  fill="#c7d2fe"
                  stroke="#3730a3"
                  strokeWidth="3.5"
                  opacity={p}
                />
              )}

              {/* Right Side Face (appears as p increases) */}
              {p > 0.02 && (
                <polygon
                  points={`140,0 ${140 + depthX},${-depthY} ${140 + depthX},${140 - depthY} 140,140`}
                  fill="#6366f1"
                  stroke="#3730a3"
                  strokeWidth="3.5"
                  opacity={p}
                />
              )}

              {/* Front Face (Square) */}
              <rect
                x="0"
                y="0"
                width="140"
                height="140"
                fill={p > 0.5 ? '#4f46e5' : '#e0e7ff'}
                stroke="#3730a3"
                strokeWidth="4"
                rx="2"
                style={{ transition: 'fill 0.3s ease' }}
              />

              {/* Length indicator (Bottom edge) */}
              <line x1="0" y1="155" x2="140" y2="155" stroke="#3730a3" strokeWidth="2.5" />
              <text x="70" y="172" textAnchor="middle" className="text-xs font-black fill-indigo-950">
                1. Length (x)
              </text>

              {/* Width/Height indicator (Left edge) */}
              <line x1="-15" y1="0" x2="-15" y2="140" stroke="#3730a3" strokeWidth="2.5" />
              <text
                x="-25"
                y="70"
                textAnchor="middle"
                className="text-xs font-black fill-indigo-950"
                transform="rotate(-90 -25 70)"
              >
                2. Width (y)
              </text>

              {/* Height / Depth extrusion indicator */}
              {p > 0.15 && (
                <g opacity={p}>
                  <line
                    x1="145"
                    y1="140"
                    x2={145 + depthX}
                    y2={140 - depthY}
                    stroke="#7c3aed"
                    strokeWidth="3"
                    strokeDasharray="4 2"
                  />
                  <text
                    x={150 + depthX / 2 + 10}
                    y={140 - depthY / 2 + 10}
                    className="text-xs font-black fill-purple-700"
                  >
                    3. Height (z)
                  </text>
                </g>
              )}
            </g>
          </svg>

          {/* Status Banner */}
          <div className="mt-4 flex items-center gap-3">
            {p < 0.2 ? (
              <div className="flex items-center gap-2 text-indigo-900 bg-indigo-50 px-6 py-2 rounded-2xl border-2 border-indigo-200 font-extrabold text-lg">
                <Square className="w-5 h-5" />
                <span>2D Flat Shape (Length &amp; Width)</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-purple-900 bg-purple-50 px-6 py-2 rounded-2xl border-2 border-purple-200 font-extrabold text-lg animate-in fade-in">
                <Box className="w-5 h-5 text-purple-700" />
                <span>3D Solid ({Math.round(p * 100)}% Extruded: Length, Width, Height)</span>
              </div>
            )}
          </div>
        </div>

        {/* Controls Column */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-md">
            <h3 className="text-xl font-black text-slate-900 mb-4">Extrusion Controller</h3>

            {/* Slider */}
            <div className="mb-5">
              <div className="flex justify-between text-xs font-black text-slate-600 uppercase mb-1">
                <span>Flat 2D (0%)</span>
                <span className="text-purple-700 font-mono text-sm">{Math.round(p * 100)}%</span>
                <span>Solid 3D (100%)</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={p}
                onChange={(e) => {
                  setIsAutoExtruding(false);
                  setExtrudeProgress(parseFloat(e.target.value));
                }}
                className="w-full h-4 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setIsAutoExtruding(!isAutoExtruding);
                }}
                className={`flex-1 h-14 rounded-2xl font-black text-lg flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all ${
                  isAutoExtruding
                    ? 'bg-amber-600 text-white shadow-amber-600/30'
                    : 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/30'
                }`}
              >
                {isAutoExtruding ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                <span>{isAutoExtruding ? 'Pause' : 'Animate'}</span>
              </button>

              <button
                onClick={() => {
                  setIsAutoExtruding(false);
                  setExtrudeProgress(p > 0.5 ? 0 : 1);
                }}
                className="px-4 h-14 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-black text-sm border-2 border-indigo-200 active:scale-95"
              >
                {p > 0.5 ? 'Flatten' : 'Extrude'}
              </button>

              <button
                onClick={() => {
                  setIsAutoExtruding(false);
                  setExtrudeProgress(0);
                }}
                className="w-14 h-14 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center active:scale-95 border-2 border-slate-200"
                title="Reset"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 space-y-1.5">
            <div className="flex items-center gap-2 text-purple-950 font-black text-sm">
              <span>● 2D = 2 Dimensions (Length &amp; Width)</span>
            </div>
            <div className="flex items-center gap-2 text-purple-950 font-black text-sm">
              <span>● 3D = 3 Dimensions (Length, Width, &amp; Height)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-purple-950 font-bold text-lg">
        <span>3D shapes are called solids because they occupy three-dimensional space.</span>
      </div>
    </div>
  );
};

