import React, { useState } from 'react';
import { Play, RotateCcw, Box, Square, ArrowUpRight } from 'lucide-react';

export const DimensionsDemo: React.FC = () => {
  const [isExtruded, setIsExtruded] = useState<boolean>(false);

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
            {!isExtruded ? (
              /* Flat 2D Square */
              <g transform="translate(85, 60)">
                <rect x="0" y="0" width="170" height="170" fill="#e0e7ff" stroke="#3730a3" strokeWidth="4" rx="4" />
                <line x1="0" y1="185" x2="170" y2="185" stroke="#3730a3" strokeWidth="3" markerEnd="url(#arrow)" />
                <text x="85" y="205" textAnchor="middle" className="text-sm font-black fill-indigo-900">Length (1D)</text>
                <text x="-25" y="90" textAnchor="middle" className="text-sm font-black fill-indigo-900" transform="rotate(-90 -25 90)">Width (2D)</text>
              </g>
            ) : (
              /* Pop-up 3D Cube */
              <g transform="translate(60, 40)" className="animate-in fade-in zoom-in-95 duration-500">
                {/* Back Top Face */}
                <polygon points="60,0 200,0 140,50 0,50" fill="#c7d2fe" stroke="#3730a3" strokeWidth="3.5" />
                {/* Left Side Face */}
                <polygon points="0,50 0,190 60,140 60,0" fill="#818cf8" stroke="#3730a3" strokeWidth="3.5" />
                {/* Front Face */}
                <polygon points="0,50 140,50 140,190 0,190" fill="#4f46e5" stroke="#3730a3" strokeWidth="3.5" />
                {/* Right Side Face */}
                <polygon points="140,50 200,0 200,140 140,190" fill="#6366f1" stroke="#3730a3" strokeWidth="3.5" />

                {/* Dimension Arrows */}
                <text x="70" y="215" textAnchor="middle" className="text-sm font-black fill-indigo-950">1. Length</text>
                <text x="185" y="180" textAnchor="middle" className="text-sm font-black fill-indigo-950">2. Width</text>
                <text x="-25" y="120" textAnchor="middle" className="text-sm font-black fill-purple-900" transform="rotate(-90 -25 120)">3. Height (Pop Up!)</text>
              </g>
            )}
          </svg>

          {/* Status Banner */}
          <div className="mt-4 flex items-center gap-3">
            {!isExtruded ? (
              <div className="flex items-center gap-2 text-indigo-900 bg-indigo-50 px-6 py-2.5 rounded-2xl border-2 border-indigo-200 font-extrabold text-xl">
                <Square className="w-6 h-6" />
                <span>2D Flat Square (2 Dimensions)</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-purple-900 bg-purple-50 px-6 py-2.5 rounded-2xl border-2 border-purple-200 font-extrabold text-xl animate-in fade-in">
                <Box className="w-6 h-6 text-purple-700" />
                <span>3D Solid Cube (3 Dimensions: Length, Width, Height)</span>
              </div>
            )}
          </div>
        </div>

        {/* Controls Column */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-md">
            <h3 className="text-2xl font-black text-slate-900 mb-6">Dimension Comparison</h3>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsExtruded(!isExtruded)}
                className="flex-1 h-16 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xl flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 active:scale-95"
              >
                <ArrowUpRight className="w-7 h-7 stroke-[3]" />
                <span>{isExtruded ? 'Flatten (2D)' : 'Extrude (3D)'}</span>
              </button>

              <button
                onClick={() => setIsExtruded(false)}
                className="w-16 h-16 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center active:scale-95 border-2 border-slate-200"
                title="Reset to 2D"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-5 bg-purple-50 rounded-2xl border border-purple-200 space-y-2">
            <div className="flex items-center gap-2 text-purple-950 font-black text-base">
              <span>● 2D = Length &amp; Width only</span>
            </div>
            <div className="flex items-center gap-2 text-purple-950 font-black text-base">
              <span>● 3D = Length, Width, AND Height</span>
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
