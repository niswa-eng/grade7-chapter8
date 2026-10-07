import React, { useState } from 'react';
import { solids8_4_data, Solid3DInfo } from '../../data/unit8_4_data';
import { Eye } from 'lucide-react';

interface SolidViewsPreset {
  id: string;
  name: string;
  frontDiagram: React.ReactNode;
  sideDiagram: React.ReactNode;
  planDiagram: React.ReactNode;
  notes: string;
}

export const ViewsSimpleSolids: React.FC = () => {
  const [selectedSolid, setSelectedSolid] = useState<string>('cylinder');

  const solidPresets: SolidViewsPreset[] = [
    {
      id: 'cylinder',
      name: 'Upright Cylinder',
      frontDiagram: (
        <svg viewBox="0 0 100 100" className="w-20 h-20">
          <rect x="25" y="15" width="50" height="70" fill="#f3e8ff" stroke="#9333ea" strokeWidth="3" />
        </svg>
      ),
      sideDiagram: (
        <svg viewBox="0 0 100 100" className="w-20 h-20">
          <rect x="25" y="15" width="50" height="70" fill="#f3e8ff" stroke="#9333ea" strokeWidth="3" />
        </svg>
      ),
      planDiagram: (
        <svg viewBox="0 0 100 100" className="w-20 h-20">
          <circle cx="50" cy="50" r="32" fill="#f3e8ff" stroke="#9333ea" strokeWidth="3" />
        </svg>
      ),
      notes: 'Standing upright: Front view is a rectangle, Side view is a rectangle, Plan view is a circle!'
    },
    {
      id: 'cone',
      name: 'Cone on Base',
      frontDiagram: (
        <svg viewBox="0 0 100 100" className="w-20 h-20">
          <polygon points="50,15 80,85 20,85" fill="#ffedd5" stroke="#ea580c" strokeWidth="3" />
        </svg>
      ),
      sideDiagram: (
        <svg viewBox="0 0 100 100" className="w-20 h-20">
          <polygon points="50,15 80,85 20,85" fill="#ffedd5" stroke="#ea580c" strokeWidth="3" />
        </svg>
      ),
      planDiagram: (
        <svg viewBox="0 0 100 100" className="w-20 h-20">
          <circle cx="50" cy="50" r="32" fill="#ffedd5" stroke="#ea580c" strokeWidth="3" />
          <circle cx="50" cy="50" r="4" fill="#ea580c" />
        </svg>
      ),
      notes: 'Front and Side are triangles. Plan view is a circle with a centre dot representing the apex!'
    },
    {
      id: 'tri_prism',
      name: 'Triangular Prism (Lying down)',
      frontDiagram: (
        <svg viewBox="0 0 100 100" className="w-20 h-20">
          <polygon points="50,20 85,80 15,80" fill="#ecfdf5" stroke="#059669" strokeWidth="3" />
        </svg>
      ),
      sideDiagram: (
        <svg viewBox="0 0 100 100" className="w-20 h-20">
          <rect x="15" y="30" width="70" height="50" fill="#ecfdf5" stroke="#059669" strokeWidth="3" />
        </svg>
      ),
      planDiagram: (
        <svg viewBox="0 0 100 100" className="w-20 h-20">
          <rect x="15" y="20" width="70" height="60" fill="#ecfdf5" stroke="#059669" strokeWidth="3" />
          <line x1="15" y1="50" x2="85" y2="50" stroke="#059669" strokeWidth="2.5" />
        </svg>
      ),
      notes: 'Front view is a triangle. Side view is a rectangle. Plan view is a rectangle with a central ridge line.'
    },
    {
      id: 'square_pyramid',
      name: 'Square-Based Pyramid',
      frontDiagram: (
        <svg viewBox="0 0 100 100" className="w-20 h-20">
          <polygon points="50,15 85,85 15,85" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />
        </svg>
      ),
      sideDiagram: (
        <svg viewBox="0 0 100 100" className="w-20 h-20">
          <polygon points="50,15 85,85 15,85" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />
        </svg>
      ),
      planDiagram: (
        <svg viewBox="0 0 100 100" className="w-20 h-20">
          <rect x="20" y="20" width="60" height="60" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />
          <line x1="20" y1="20" x2="80" y2="80" stroke="#d97706" strokeWidth="2" />
          <line x1="80" y1="20" x2="20" y2="80" stroke="#d97706" strokeWidth="2" />
        </svg>
      ),
      notes: 'Front and Side are triangles. Plan view is a square with two diagonals meeting at the apex.'
    },
    {
      id: 'sphere',
      name: 'Sphere',
      frontDiagram: (
        <svg viewBox="0 0 100 100" className="w-20 h-20">
          <circle cx="50" cy="50" r="32" fill="#cffafe" stroke="#0891b2" strokeWidth="3" />
        </svg>
      ),
      sideDiagram: (
        <svg viewBox="0 0 100 100" className="w-20 h-20">
          <circle cx="50" cy="50" r="32" fill="#cffafe" stroke="#0891b2" strokeWidth="3" />
        </svg>
      ),
      planDiagram: (
        <svg viewBox="0 0 100 100" className="w-20 h-20">
          <circle cx="50" cy="50" r="32" fill="#cffafe" stroke="#0891b2" strokeWidth="3" />
        </svg>
      ),
      notes: 'A sphere appears as an identical circle from every single viewing direction!'
    }
  ];

  const current = solidPresets.find((s) => s.id === selectedSolid) || solidPresets[0];

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-6xl mx-auto p-6 select-none overflow-y-auto">
      <div>
        <span className="text-sm font-black text-purple-600 uppercase tracking-widest">
          Unit 8.4 · Projection Gallery
        </span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          Views of Simple 3D Solids
        </h2>
        <p className="text-2xl font-bold text-slate-700 leading-snug">
          Compare Front, Side, and Plan views for standard geometric solids.
        </p>
      </div>

      {/* Solid Selector Chips */}
      <div className="flex gap-2 flex-wrap my-2">
        {solidPresets.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedSolid(s.id)}
            className={`px-5 py-2.5 rounded-2xl font-black text-sm border-2 transition-all active:scale-95 ${
              selectedSolid === s.id
                ? 'bg-purple-600 text-white border-purple-700 shadow-md'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Three Views Cards Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto">
        {/* Front View */}
        <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl flex flex-col items-center justify-between text-center min-h-[260px]">
          <span className="px-4 py-1.5 rounded-xl bg-blue-100 text-blue-900 font-black text-sm uppercase">
            Front View
          </span>
          <div className="my-auto py-2">{current.frontDiagram}</div>
          <span className="text-xs font-bold text-slate-400">Viewed directly from the front</span>
        </div>

        {/* Side View */}
        <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl flex flex-col items-center justify-between text-center min-h-[260px]">
          <span className="px-4 py-1.5 rounded-xl bg-emerald-100 text-emerald-900 font-black text-sm uppercase">
            Side View
          </span>
          <div className="my-auto py-2">{current.sideDiagram}</div>
          <span className="text-xs font-bold text-slate-400">Viewed directly from the right</span>
        </div>

        {/* Plan View */}
        <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl flex flex-col items-center justify-between text-center min-h-[260px]">
          <span className="px-4 py-1.5 rounded-xl bg-purple-100 text-purple-900 font-black text-sm uppercase">
            Plan View
          </span>
          <div className="my-auto py-2">{current.planDiagram}</div>
          <span className="text-xs font-bold text-slate-400">Viewed directly from above (Top)</span>
        </div>
      </div>

      {/* Description Banner */}
      <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-purple-950 font-bold text-lg">
        {current.notes}
      </div>
    </div>
  );
};
