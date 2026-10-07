import React, { useState } from 'react';
import { RotateCw, Eye, EyeOff, Sparkles, Check } from 'lucide-react';

interface PatternItem {
  id: string;
  name: string;
  lines: number;
  order: number;
  notes: string;
  renderSVG: (rot: number, showLines: boolean) => React.ReactNode;
}

export const Patterns81: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('flower');
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [revealedLines, setRevealedLines] = useState<boolean>(false);
  const [revealedOrder, setRevealedOrder] = useState<boolean>(false);

  const patterns: PatternItem[] = [
    {
      id: 'flower',
      name: '6-Petal Symmetrical Flower',
      lines: 6,
      order: 6,
      notes: 'Has both line and rotational symmetry. 6 mirror lines and order 6.',
      renderSVG: (rot, showLines) => (
        <svg viewBox="0 0 260 260" className="w-72 h-72 overflow-visible">
          <g
            style={{
              transformOrigin: '130px 130px',
              transform: `rotate(${rot}deg)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <path
                key={deg}
                d="M 130 130 C 110 60, 150 60, 130 130 Z"
                fill="#f472b6"
                stroke="#db2777"
                strokeWidth="3"
                transform={`rotate(${deg} 130 130)`}
              />
            ))}
            <circle cx="130" cy="130" r="18" fill="#fbbf24" stroke="#d97706" strokeWidth="3" />
          </g>

          {showLines && (
            <g stroke="#c026d3" strokeWidth="3" strokeDasharray="6 6">
              <line x1="130" y1="20" x2="130" y2="240" />
              <line x1="30" y1="75" x2="230" y2="185" />
              <line x1="30" y1="185" x2="230" y2="75" />
            </g>
          )}
          <circle cx="130" cy="130" r="6" fill="#ea580c" />
        </svg>
      )
    },
    {
      id: 'pinwheel',
      name: 'Three-Bladed Pinwheel (Curved)',
      lines: 0,
      order: 3,
      notes: 'Curved blades spin in one direction: NO mirror lines (0 lines), but rotational symmetry order 3!',
      renderSVG: (rot, showLines) => (
        <svg viewBox="0 0 260 260" className="w-72 h-72 overflow-visible">
          <g
            style={{
              transformOrigin: '130px 130px',
              transform: `rotate(${rot}deg)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            {[0, 120, 240].map((deg) => (
              <path
                key={deg}
                d="M 130 130 Q 180 80 220 50 Q 170 70 130 130"
                fill="#60a5fa"
                stroke="#1d4ed8"
                strokeWidth="3.5"
                transform={`rotate(${deg} 130 130)`}
              />
            ))}
            <circle cx="130" cy="130" r="14" fill="#3b82f6" />
          </g>
          {showLines && (
            <text x="130" y="240" textAnchor="middle" className="text-sm font-black fill-red-600">
              No lines of symmetry (0 lines)
            </text>
          )}
          <circle cx="130" cy="130" r="6" fill="#ea580c" />
        </svg>
      )
    },
    {
      id: 'recycle',
      name: 'Recycling 3-Arrow Logo',
      lines: 0,
      order: 3,
      notes: 'Arrows chase each other in a circle: NO reflection symmetry, but rotational order 3 (matches every 120°).',
      renderSVG: (rot, showLines) => (
        <svg viewBox="0 0 260 260" className="w-72 h-72 overflow-visible">
          <g
            style={{
              transformOrigin: '130px 130px',
              transform: `rotate(${rot}deg)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            {[0, 120, 240].map((deg) => (
              <g key={deg} transform={`rotate(${deg} 130 130)`}>
                <path d="M 130 50 L 175 90 L 160 90 L 160 115 L 140 115 L 140 90 L 125 90 Z" fill="#22c55e" stroke="#15803d" strokeWidth="2.5" />
                <path d="M 140 115 Q 110 125 100 150" fill="none" stroke="#22c55e" strokeWidth="8" strokeLinecap="round" />
              </g>
            ))}
          </g>
          {showLines && (
            <text x="130" y="240" textAnchor="middle" className="text-sm font-black fill-red-600">
              Chasing arrows: 0 lines of symmetry
            </text>
          )}
          <circle cx="130" cy="130" r="6" fill="#ea580c" />
        </svg>
      )
    },
    {
      id: 'tiled-square',
      name: 'Tiled Square Motif',
      lines: 4,
      order: 4,
      notes: 'Square geometric tile: 4 lines of symmetry (vertical, horizontal, 2 diagonals) and order 4.',
      renderSVG: (rot, showLines) => (
        <svg viewBox="0 0 260 260" className="w-72 h-72 overflow-visible">
          <g
            style={{
              transformOrigin: '130px 130px',
              transform: `rotate(${rot}deg)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            <rect x="50" y="50" width="160" height="160" fill="#ede9fe" stroke="#7c3aed" strokeWidth="4" rx="8" />
            <polygon points="130,55 205,130 130,205 55,130" fill="#c4b5fd" stroke="#6d28d9" strokeWidth="3" />
            <circle cx="130" cy="130" r="28" fill="#a78bfa" stroke="#5b21b6" strokeWidth="2.5" />
          </g>
          {showLines && (
            <g stroke="#c026d3" strokeWidth="3" strokeDasharray="6 6">
              <line x1="130" y1="20" x2="130" y2="240" />
              <line x1="20" y1="130" x2="240" y2="130" />
              <line x1="30" y1="30" x2="230" y2="230" />
              <line x1="230" y1="30" x2="30" y2="230" />
            </g>
          )}
          <circle cx="130" cy="130" r="6" fill="#ea580c" />
        </svg>
      )
    }
  ];

  const current = patterns.find((p) => p.id === selectedId) || patterns[0];

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-6xl mx-auto p-6 select-none">
      <div>
        <span className="text-sm font-black text-blue-600 uppercase tracking-widest">
          Unit 8.1 · Concept 6
        </span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          Symmetry in Patterns &amp; Logos
        </h2>
        <p className="text-2xl font-bold text-slate-700 leading-snug">
          Real-world logos and tiles often combine line and rotational symmetry.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8 items-center my-auto">
        {/* SVG Display Stage */}
        <div className="col-span-12 md:col-span-7 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl flex flex-col items-center justify-center min-h-[420px]">
          <div className="text-xl font-extrabold text-slate-900 mb-2">{current.name}</div>

          <div className="my-2">{current.renderSVG(rotationAngle, revealedLines)}</div>

          {/* Reveal badges */}
          <div className="flex items-center gap-3 mt-4">
            <div className={`px-4 py-2 rounded-xl font-black text-sm border-2 ${
              revealedLines ? 'bg-fuchsia-100 text-fuchsia-900 border-fuchsia-300' : 'bg-slate-100 text-slate-400 border-slate-200'
            }`}>
              Lines: {revealedLines ? `${current.lines} lines of symmetry` : 'Hidden'}
            </div>

            <div className={`px-4 py-2 rounded-xl font-black text-sm border-2 ${
              revealedOrder ? 'bg-blue-100 text-blue-900 border-blue-300' : 'bg-slate-100 text-slate-400 border-slate-200'
            }`}>
              Order: {revealedOrder ? `Order ${current.order}` : 'Hidden'}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={() => setRevealedLines(!revealedLines)}
              className="h-12 px-5 rounded-xl bg-slate-900 text-white font-black text-sm flex items-center gap-2 active:scale-95"
            >
              {revealedLines ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{revealedLines ? 'Hide Lines' : 'Show Lines'}</span>
            </button>

            <button
              onClick={() => setRevealedOrder(!revealedOrder)}
              className="h-12 px-5 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center gap-2 active:scale-95"
            >
              {revealedOrder ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{revealedOrder ? 'Hide Order' : 'Show Order'}</span>
            </button>

            <button
              onClick={() => setRotationAngle((prev) => (prev + 360 / Math.max(1, current.order)) % 360)}
              className="h-12 px-5 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center gap-2 active:scale-95"
            >
              <RotateCw className="w-4 h-4" />
              <span>Rotate ({rotationAngle}°)</span>
            </button>
          </div>
        </div>

        {/* Pattern Chooser */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-3">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            Patterns:
          </span>
          {patterns.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedId(p.id);
                setRotationAngle(0);
                setRevealedLines(false);
                setRevealedOrder(false);
              }}
              className={`p-4 rounded-2xl text-left border-2 font-black transition-all active:scale-98 ${
                selectedId === p.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xl'
                  : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="text-lg mb-1">{p.name}</div>
              <p className={`text-xs font-semibold ${selectedId === p.id ? 'text-slate-300' : 'text-slate-500'}`}>
                {p.notes}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 font-bold text-lg">
        <span>Curved pinwheel blades and recycling arrows produce rotational symmetry without any mirror lines.</span>
      </div>
    </div>
  );
};
