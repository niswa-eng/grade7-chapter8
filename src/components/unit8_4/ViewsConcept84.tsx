import React, { useState } from 'react';
import { ThreeSolidViewer } from './ThreeSolidViewer';
import { Eye, ArrowRight, ArrowDown, ArrowUp } from 'lucide-react';

interface ViewsConcept84Props {
  isInteractMode: boolean;
}

export const ViewsConcept84: React.FC<ViewsConcept84Props> = ({ isInteractMode }) => {
  const [activeView, setActiveView] = useState<'front' | 'side' | 'plan'>('front');

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-6xl mx-auto p-6 select-none overflow-y-auto">
      <div>
        <span className="text-sm font-black text-purple-600 uppercase tracking-widest">
          Unit 8.4 · Concept 4
        </span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          Views of 3D Shapes: Front, Side, and Plan
        </h2>
        <p className="text-2xl font-bold text-slate-700 leading-snug">
          We represent 3D solids using three 2D projections: <span className="text-blue-600 font-extrabold">Front</span>, <span className="text-emerald-600 font-extrabold">Side (Right)</span>, and <span className="text-purple-600 font-extrabold">Plan (Top)</span> view!
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8 items-center my-auto">
        {/* 3D Model with camera orientation */}
        <div className="col-span-12 md:col-span-7 bg-white rounded-3xl p-4 border-2 border-slate-200 shadow-xl flex flex-col items-center justify-center h-[420px] relative">
          <ThreeSolidViewer solidId="cuboid" isInteractMode={isInteractMode} orthoView={activeView} />

          {/* Floor orientation badge */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-black text-slate-700 shadow-sm">
            Current Camera: <span className="text-purple-700 uppercase font-extrabold">{activeView} VIEW</span>
          </div>
        </div>

        {/* 2D Projection Diagram & Controls */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
          {/* Three Large View Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setActiveView('front')}
              className={`h-16 rounded-2xl font-black text-lg border-2 flex flex-col items-center justify-center transition-all active:scale-95 ${
                activeView === 'front'
                  ? 'bg-blue-600 text-white border-blue-700 shadow-lg shadow-blue-600/30'
                  : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>Front</span>
              <span className="text-[10px] opacity-75 font-semibold">Looking Ahead</span>
            </button>

            <button
              onClick={() => setActiveView('side')}
              className={`h-16 rounded-2xl font-black text-lg border-2 flex flex-col items-center justify-center transition-all active:scale-95 ${
                activeView === 'side'
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-lg shadow-emerald-600/30'
                  : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>Side</span>
              <span className="text-[10px] opacity-75 font-semibold">From the Right</span>
            </button>

            <button
              onClick={() => setActiveView('plan')}
              className={`h-16 rounded-2xl font-black text-lg border-2 flex flex-col items-center justify-center transition-all active:scale-95 ${
                activeView === 'plan'
                  ? 'bg-purple-600 text-white border-purple-700 shadow-lg shadow-purple-600/30'
                  : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>Plan</span>
              <span className="text-[10px] opacity-75 font-semibold">From Above</span>
            </button>
          </div>

          {/* 2D Outline Diagram beside solid */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-lg flex flex-col items-center justify-center min-h-[220px]">
            <span className="text-xs font-black uppercase text-slate-400 mb-2">
              2D Orthographic Projection ({activeView.toUpperCase()} VIEW):
            </span>

            {activeView === 'front' && (
              <svg viewBox="0 0 200 140" className="w-56 h-36">
                <rect x="20" y="30" width="160" height="80" fill="#dbeafe" stroke="#2563eb" strokeWidth="4" />
                <text x="100" y="75" textAnchor="middle" className="text-sm font-black fill-blue-900">Front View (Rectangle)</text>
              </svg>
            )}

            {activeView === 'side' && (
              <svg viewBox="0 0 200 140" className="w-56 h-36">
                <rect x="45" y="30" width="110" height="80" fill="#dcfce7" stroke="#16a34a" strokeWidth="4" />
                <text x="100" y="75" textAnchor="middle" className="text-sm font-black fill-emerald-900">Side View (Rectangle)</text>
              </svg>
            )}

            {activeView === 'plan' && (
              <svg viewBox="0 0 200 140" className="w-56 h-36">
                <rect x="20" y="25" width="160" height="90" fill="#f3e8ff" stroke="#9333ea" strokeWidth="4" />
                <text x="100" y="75" textAnchor="middle" className="text-sm font-black fill-purple-900">Plan View (Rectangle)</text>
              </svg>
            )}

            <p className="text-xs font-bold text-slate-500 mt-2 text-center">
              The 2D outline seen when looking directly at the solid with zero perspective angle.
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-purple-950 font-bold text-lg">
        <span>Plan view is the mathematical term for the view looking directly from above.</span>
      </div>
    </div>
  );
};
