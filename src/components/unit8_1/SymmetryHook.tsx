import React, { useState } from 'react';
import { Sparkles, Eye, Check } from 'lucide-react';

interface HookItem {
  id: string;
  name: string;
  render: (showMirror: boolean) => React.ReactNode;
}

export const SymmetryHook: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('butterfly');
  const [showMirrorLine, setShowMirrorLine] = useState<boolean>(true);

  const items: HookItem[] = [
    {
      id: 'butterfly',
      name: 'Butterfly',
      render: (mirror) => (
        <svg viewBox="0 0 200 180" className="w-full h-full">
          {/* Left Wing */}
          <path
            d="M 100 90 C 70 30, 20 40, 25 80 C 28 110, 60 110, 100 100 C 60 120, 40 160, 65 170 C 85 175, 95 130, 100 110 Z"
            fill="#60a5fa"
            stroke="#1d4ed8"
            strokeWidth="3"
          />
          <circle cx="55" cy="80" r="10" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
          <circle cx="70" cy="140" r="6" fill="#f472b6" />

          {/* Right Wing */}
          <path
            d="M 100 90 C 130 30, 180 40, 175 80 C 172 110, 140 110, 100 100 C 140 120, 160 160, 135 170 C 115 175, 105 130, 100 110 Z"
            fill="#60a5fa"
            stroke="#1d4ed8"
            strokeWidth="3"
          />
          <circle cx="145" cy="80" r="10" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
          <circle cx="130" cy="140" r="6" fill="#f472b6" />

          {/* Body & Antennae */}
          <ellipse cx="100" cy="100" rx="6" ry="35" fill="#1e293b" />
          <path d="M 100 68 Q 85 45 78 48" fill="none" stroke="#1e293b" strokeWidth="2.5" />
          <path d="M 100 68 Q 115 45 122 48" fill="none" stroke="#1e293b" strokeWidth="2.5" />

          {/* Mirror line */}
          {mirror && (
            <line x1="100" y1="15" x2="100" y2="175" stroke="#c026d3" strokeWidth="4" strokeDasharray="8 6" />
          )}
        </svg>
      )
    },
    {
      id: 'leaf',
      name: 'Leaf',
      render: (mirror) => (
        <svg viewBox="0 0 200 180" className="w-full h-full">
          {/* Leaf Body */}
          <path
            d="M 100 20 C 40 60, 40 130, 100 170 C 160 130, 160 60, 100 20 Z"
            fill="#4ade80"
            stroke="#15803d"
            strokeWidth="3.5"
          />
          {/* Veins */}
          <path d="M 100 60 Q 75 75 60 70" fill="none" stroke="#15803d" strokeWidth="2" />
          <path d="M 100 60 Q 125 75 140 70" fill="none" stroke="#15803d" strokeWidth="2" />
          <path d="M 100 100 Q 75 115 65 110" fill="none" stroke="#15803d" strokeWidth="2" />
          <path d="M 100 100 Q 125 115 135 110" fill="none" stroke="#15803d" strokeWidth="2" />

          {/* Stem */}
          <line x1="100" y1="170" x2="100" y2="180" stroke="#15803d" strokeWidth="4" />

          {mirror && (
            <line x1="100" y1="10" x2="100" y2="175" stroke="#c026d3" strokeWidth="4" strokeDasharray="8 6" />
          )}
        </svg>
      )
    },
    {
      id: 'letter-a',
      name: 'Letter A',
      render: (mirror) => (
        <svg viewBox="0 0 200 180" className="w-full h-full">
          <polygon points="100,20 160,160 135,160 120,120 80,120 65,160 40,160" fill="#f87171" stroke="#b91c1c" strokeWidth="3" />
          <polygon points="100,55 112,95 88,95" fill="#ffffff" stroke="#b91c1c" strokeWidth="2" />
          {mirror && (
            <line x1="100" y1="10" x2="100" y2="175" stroke="#c026d3" strokeWidth="4" strokeDasharray="8 6" />
          )}
        </svg>
      )
    },
    {
      id: 'face-emoji',
      name: 'Face Emoji',
      render: (mirror) => (
        <svg viewBox="0 0 200 180" className="w-full h-full">
          <circle cx="100" cy="95" r="70" fill="#fde047" stroke="#ca8a04" strokeWidth="4" />
          {/* Eyes */}
          <circle cx="75" cy="80" r="9" fill="#1e293b" />
          <circle cx="125" cy="80" r="9" fill="#1e293b" />
          {/* Smile */}
          <path d="M 70 115 Q 100 145 130 115" fill="none" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
          {mirror && (
            <line x1="100" y1="15" x2="100" y2="175" stroke="#c026d3" strokeWidth="4" strokeDasharray="8 6" />
          )}
        </svg>
      )
    },
    {
      id: 'tile-pattern',
      name: 'Tile Motif',
      render: (mirror) => (
        <svg viewBox="0 0 200 180" className="w-full h-full">
          <rect x="35" y="25" width="130" height="130" fill="#e0e7ff" stroke="#4338ca" strokeWidth="3" rx="10" />
          <polygon points="100,40 150,90 100,140 50,90" fill="#818cf8" stroke="#312e81" strokeWidth="2" />
          <circle cx="100" cy="90" r="16" fill="#fbcfe8" stroke="#db2777" strokeWidth="2" />
          {mirror && (
            <line x1="100" y1="15" x2="100" y2="165" stroke="#c026d3" strokeWidth="4" strokeDasharray="8 6" />
          )}
        </svg>
      )
    }
  ];

  const activeItem = items.find((i) => i.id === selectedId) || items[0];

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-6xl mx-auto p-6 select-none">
      {/* Top Explanation */}
      <div>
        <span className="text-sm font-black text-blue-600 uppercase tracking-widest">
          Unit 8.1 · Getting Started
        </span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          Symmetry in Everyday Life
        </h2>
        <p className="text-2xl font-bold text-slate-700 leading-snug">
          Look around us! When one side matches the other side exactly, we say the object has <span className="text-blue-600 font-extrabold">symmetry</span>.
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-12 gap-8 items-center my-auto">
        {/* Large Visual Display */}
        <div className="col-span-12 md:col-span-7 bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-xl flex flex-col items-center justify-center min-h-[360px] relative">
          <div className="w-80 h-72">
            {activeItem.render(showMirrorLine)}
          </div>

          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={() => setShowMirrorLine(!showMirrorLine)}
              className={`h-14 px-6 rounded-2xl font-extrabold text-base flex items-center gap-2 border-2 transition-all active:scale-95 ${
                showMirrorLine
                  ? 'bg-fuchsia-600 text-white border-fuchsia-700 shadow-lg shadow-fuchsia-500/25'
                  : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
              }`}
            >
              <Eye className="w-6 h-6" />
              <span>{showMirrorLine ? 'Hide Mirror Line' : 'Show Mirror Line'}</span>
            </button>
          </div>

          {showMirrorLine && (
            <div className="mt-3 text-base font-extrabold text-fuchsia-700 bg-fuchsia-50 px-4 py-2 rounded-xl border border-fuchsia-200">
              Dashed line = Line of Symmetry (Mirror Line)
            </div>
          )}
        </div>

        {/* Object Picker Tiles */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-3">
          <span className="text-sm font-extrabold uppercase tracking-wider text-slate-500 px-1">
            Everyday Examples
          </span>
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`h-20 px-6 rounded-2xl flex items-center justify-between border-2 font-black text-xl transition-all active:scale-98 ${
                selectedId === item.id
                  ? 'bg-blue-600 text-white border-blue-700 shadow-xl shadow-blue-600/30 scale-102'
                  : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-sm font-mono">
                  {selectedId === item.id ? <Check className="w-6 h-6 stroke-[3]" /> : '●'}
                </span>
                <span>{item.name}</span>
              </div>
              <span className="text-sm font-bold opacity-80">View</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
