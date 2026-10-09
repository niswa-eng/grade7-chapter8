import React, { useState } from 'react';
import { Sparkles, Eye, Check } from 'lucide-react';

interface HookItem {
  id: string;
  name: string;
  category: string;
  render: (showMirror: boolean) => React.ReactNode;
}

export const SymmetryHook: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('butterfly');
  const [showMirrorLine, setShowMirrorLine] = useState<boolean>(true);

  const items: HookItem[] = [
    {
      id: 'butterfly',
      name: 'Butterfly',
      category: 'Animal Life',
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
      name: 'Botanical Leaf',
      category: 'Plant Life',
      render: (mirror) => (
        <svg viewBox="0 0 200 180" className="w-full h-full">
          <defs>
            {/* Natural gradient for leaf blade */}
            <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="50%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
          </defs>

          {/* Natural Stem / Petiole */}
          <path
            d="M 97 175 Q 100 178 103 175 L 102 145 L 98 145 Z"
            fill="#15803d"
            stroke="#166534"
            strokeWidth="1.5"
          />

          {/* Symmetrical Natural Leaf Body with gentle lobes and serrated curves */}
          <path
            d="M 100 15 
               C 88 28, 62 44, 52 68 
               C 44 88, 48 112, 60 128 
               C 72 144, 88 152, 100 155 
               C 112 152, 128 144, 140 128 
               C 152 112, 156 88, 148 68 
               C 138 44, 112 28, 100 15 Z"
            fill="url(#leafGrad)"
            stroke="#14532d"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Secondary lobes / natural contour texture */}
          <path
            d="M 100 15 
               C 92 35, 70 52, 64 74 
               C 58 96, 68 120, 80 135 
               C 90 148, 96 153, 100 155 
               C 104 153, 110 148, 120 135 
               C 132 120, 142 96, 136 74 
               C 130 52, 108 35, 100 15 Z"
            fill="#86efac"
            opacity="0.35"
          />

          {/* Central Midrib (Vein of symmetry) */}
          <path
            d="M 100 15 L 100 170"
            stroke="#14532d"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Left Lateral Veins (Arching naturally upward) */}
          <path d="M 100 45 C 88 48, 76 56, 66 65" fill="none" stroke="#166534" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 100 70 C 84 75, 70 86, 56 98" fill="none" stroke="#166534" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 100 95 C 84 102, 72 114, 60 125" fill="none" stroke="#166534" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 100 120 C 88 128, 80 136, 74 142" fill="none" stroke="#166534" strokeWidth="2" strokeLinecap="round" />

          {/* Left Tertiary Veins */}
          <path d="M 80 58 Q 74 52 70 54" fill="none" stroke="#166534" strokeWidth="1.2" opacity="0.8" />
          <path d="M 72 88 Q 65 82 62 84" fill="none" stroke="#166534" strokeWidth="1.2" opacity="0.8" />
          <path d="M 75 115 Q 68 108 64 110" fill="none" stroke="#166534" strokeWidth="1.2" opacity="0.8" />

          {/* Right Lateral Veins (Exact mirror reflection) */}
          <path d="M 100 45 C 112 48, 124 56, 134 65" fill="none" stroke="#166534" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 100 70 C 116 75, 130 86, 144 98" fill="none" stroke="#166534" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 100 95 C 116 102, 128 114, 140 125" fill="none" stroke="#166534" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 100 120 C 112 128, 120 136, 126 142" fill="none" stroke="#166534" strokeWidth="2" strokeLinecap="round" />

          {/* Right Tertiary Veins */}
          <path d="M 120 58 Q 126 52 130 54" fill="none" stroke="#166534" strokeWidth="1.2" opacity="0.8" />
          <path d="M 128 88 Q 135 82 138 84" fill="none" stroke="#166534" strokeWidth="1.2" opacity="0.8" />
          <path d="M 125 115 Q 132 108 136 110" fill="none" stroke="#166534" strokeWidth="1.2" opacity="0.8" />

          {/* Mirror line */}
          {mirror && (
            <line x1="100" y1="10" x2="100" y2="175" stroke="#c026d3" strokeWidth="4" strokeDasharray="8 6" />
          )}
        </svg>
      )
    },
    {
      id: 'snowflake',
      name: 'Snowflake',
      category: 'Nature Pattern',
      render: (mirror) => (
        <svg viewBox="0 0 200 180" className="w-full h-full">
          {/* Main 6 crystalline arms */}
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <g key={deg} transform={`rotate(${deg} 100 90)`}>
              <line x1="100" y1="90" x2="100" y2="25" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" />
              {/* Outer chevron branches */}
              <line x1="100" y1="40" x2="88" y2="52" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="100" y1="40" x2="112" y2="52" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
              {/* Mid chevron branches */}
              <line x1="100" y1="58" x2="84" y2="72" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="100" y1="58" x2="116" y2="72" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
              {/* Tip diamond */}
              <polygon points="100,22 104,28 100,34 96,28" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" />
            </g>
          ))}
          {/* Central hexagon */}
          <circle cx="100" cy="90" r="14" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.5" />
          <circle cx="100" cy="90" r="6" fill="#38bdf8" />
          {mirror && (
            <line x1="100" y1="12" x2="100" y2="168" stroke="#c026d3" strokeWidth="4" strokeDasharray="8 6" />
          )}
        </svg>
      )
    },
    {
      id: 'guitar',
      name: 'Acoustic Guitar',
      category: 'Musical Instrument',
      render: (mirror) => (
        <svg viewBox="0 0 200 180" className="w-full h-full">
          {/* Headstock & Tuners */}
          <rect x="94" y="10" width="12" height="24" rx="2" fill="#78350f" stroke="#451a03" strokeWidth="2" />
          <circle cx="88" cy="16" r="3" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
          <circle cx="88" cy="24" r="3" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
          <circle cx="112" cy="16" r="3" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
          <circle cx="112" cy="24" r="3" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />

          {/* Neck */}
          <rect x="96" y="34" width="8" height="50" fill="#b45309" stroke="#78350f" strokeWidth="2" />
          {/* Frets */}
          <line x1="96" y1="46" x2="104" y2="46" stroke="#fbbf24" strokeWidth="1.5" />
          <line x1="96" y1="58" x2="104" y2="58" stroke="#fbbf24" strokeWidth="1.5" />
          <line x1="96" y1="70" x2="104" y2="70" stroke="#fbbf24" strokeWidth="1.5" />

          {/* Symmetrical Guitar Body - Upper bout narrower, waist tapered, lower bout larger at bottom */}
          <path
            d="M 100 84 
               C 84 84, 73 92, 73 103 
               C 73 113, 81 117, 80 123 
               C 78 132, 58 141, 58 156 
               C 58 171, 78 174, 100 174 
               C 122 174, 142 171, 142 156 
               C 142 141, 122 132, 120 123 
               C 119 117, 127 113, 127 103 
               C 127 92, 116 84, 100 84 Z"
            fill="#d97706"
            stroke="#78350f"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Sound Hole & Decorative Rosette */}
          <circle cx="100" cy="110" r="14" fill="none" stroke="#fef08a" strokeWidth="1.5" />
          <circle cx="100" cy="110" r="11" fill="#451a03" stroke="#92400e" strokeWidth="2" />

          {/* Bridge on the larger lower bout */}
          <rect x="86" y="146" width="28" height="7" rx="2" fill="#451a03" stroke="#291203" strokeWidth="1" />

          {/* Strings */}
          <line x1="97" y1="34" x2="97" y2="147" stroke="#f8fafc" strokeWidth="1" opacity="0.8" />
          <line x1="99" y1="34" x2="99" y2="147" stroke="#f8fafc" strokeWidth="1.2" opacity="0.9" />
          <line x1="101" y1="34" x2="101" y2="147" stroke="#f8fafc" strokeWidth="1.2" opacity="0.9" />
          <line x1="103" y1="34" x2="103" y2="147" stroke="#f8fafc" strokeWidth="1" opacity="0.8" />

          {mirror && (
            <line x1="100" y1="8" x2="100" y2="175" stroke="#c026d3" strokeWidth="4" strokeDasharray="8 6" />
          )}
        </svg>
      )
    },
    {
      id: 'starfish',
      name: 'Sea Star (Starfish)',
      category: 'Marine Life',
      render: (mirror) => (
        <svg viewBox="0 0 200 180" className="w-full h-full">
          {/* 5-Armed Starfish centered at (100, 96), perfectly symmetrical along vertical axis */}
          <path
            d="M 100 24 
               L 112 70 
               L 158 72 
               L 122 98 
               L 136 146 
               L 100 118 
               L 64 146 
               L 78 98 
               L 42 72 
               L 88 70 Z"
            fill="#fb923c"
            stroke="#c2410c"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Texture suction nodes */}
          <circle cx="100" cy="45" r="3" fill="#ffedd5" />
          <circle cx="100" cy="65" r="3.5" fill="#ffedd5" />
          <circle cx="100" cy="95" r="5" fill="#ea580c" />
          <circle cx="85" cy="85" r="3" fill="#ffedd5" />
          <circle cx="115" cy="85" r="3" fill="#ffedd5" />
          <circle cx="78" cy="118" r="3" fill="#ffedd5" />
          <circle cx="122" cy="118" r="3" fill="#ffedd5" />
          <circle cx="65" cy="80" r="2.5" fill="#ffedd5" />
          <circle cx="135" cy="80" r="2.5" fill="#ffedd5" />

          {mirror && (
            <line x1="100" y1="15" x2="100" y2="170" stroke="#c026d3" strokeWidth="4" strokeDasharray="8 6" />
          )}
        </svg>
      )
    },
    {
      id: 'letter-a',
      name: 'Letter A',
      category: 'Alphabet',
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
      name: 'Smiley Emoji',
      category: 'Digital Icon',
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
      category: 'Architecture',
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
    <div className="w-full h-full flex flex-col justify-between max-w-6xl mx-auto p-6 select-none overflow-y-auto">
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
        <div className="col-span-12 lg:col-span-6 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl flex flex-col items-center justify-center min-h-[420px] relative">
          <div className="w-80 h-72">
            {activeItem.render(showMirrorLine)}
          </div>

          <div className="mt-2 flex items-center gap-3">
            <button
              onClick={() => setShowMirrorLine(!showMirrorLine)}
              className={`h-12 px-6 rounded-2xl font-extrabold text-sm flex items-center gap-2 border-2 transition-all active:scale-95 ${
                showMirrorLine
                  ? 'bg-fuchsia-600 text-white border-fuchsia-700 shadow-lg shadow-fuchsia-500/25'
                  : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
              }`}
            >
              <Eye className="w-5 h-5" />
              <span>{showMirrorLine ? 'Hide Mirror Line' : 'Show Mirror Line'}</span>
            </button>
          </div>

          {showMirrorLine && (
            <div className="mt-3 text-xs font-black text-fuchsia-700 bg-fuchsia-50 px-3.5 py-1.5 rounded-xl border border-fuchsia-200">
              Magenta Dashed Line = Line of Symmetry (Mirror Line)
            </div>
          )}
        </div>

        {/* Object Picker Tiles (2-column grid for 8 items) */}
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">
              Select Real-World Example ({items.length}):
            </span>
            <span className="text-xs font-bold text-blue-600">
              Active: {activeItem.name}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`p-3.5 rounded-2xl flex flex-col justify-between border-2 text-left transition-all active:scale-95 ${
                  selectedId === item.id
                    ? 'bg-blue-600 text-white border-blue-700 shadow-md ring-2 ring-blue-300'
                    : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className={`text-[10px] font-black uppercase tracking-wider ${
                    selectedId === item.id ? 'text-blue-100' : 'text-slate-400'
                  }`}>
                    {item.category}
                  </span>
                  {selectedId === item.id && (
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3] text-white" />
                    </span>
                  )}
                </div>
                <span className="text-base font-black truncate">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
