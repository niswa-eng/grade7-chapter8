import React from 'react';

interface PracticeDiagramProps {
  type?: string;
}

export const PracticeDiagram: React.FC<PracticeDiagramProps> = ({ type }) => {
  if (!type) return null;

  switch (type) {
    // 8.1 Diagrams
    case 'equilateral-triangle':
      return (
        <svg viewBox="0 0 240 220" className="w-full max-w-[240px] h-auto drop-shadow-sm">
          <polygon points="120,25 215,190 25,190" fill="#eff6ff" stroke="#2563eb" strokeWidth="4" />
          <circle cx="120" cy="25" r="5" fill="#2563eb" />
          <circle cx="215" cy="190" r="5" fill="#2563eb" />
          <circle cx="25" cy="190" r="5" fill="#2563eb" />
        </svg>
      );

    case 'rectangle':
      return (
        <svg viewBox="0 0 260 160" className="w-full max-w-[260px] h-auto drop-shadow-sm">
          <rect x="25" y="30" width="210" height="100" fill="#f0fdf4" stroke="#16a34a" strokeWidth="4" rx="2" />
          <circle cx="130" cy="80" r="6" fill="#ea580c" />
          <text x="130" y="105" textAnchor="middle" className="text-xs font-bold fill-slate-500">Centre</text>
        </svg>
      );

    case 'scalene-triangle':
      return (
        <svg viewBox="0 0 240 200" className="w-full max-w-[240px] h-auto drop-shadow-sm">
          <polygon points="40,40 220,130 60,180" fill="#faf5ff" stroke="#9333ea" strokeWidth="4" />
          <text x="50" y="30" className="text-sm font-bold fill-slate-700">A</text>
          <text x="225" y="145" className="text-sm font-bold fill-slate-700">B</text>
          <text x="45" y="195" className="text-sm font-bold fill-slate-700">C</text>
        </svg>
      );

    case 'parallelogram-diagonal':
      return (
        <svg viewBox="0 0 280 180" className="w-full max-w-[280px] h-auto drop-shadow-sm">
          <polygon points="70,35 250,35 210,145 30,145" fill="#fffbeb" stroke="#d97706" strokeWidth="4" />
          <line x1="70" y1="35" x2="210" y2="145" stroke="#dc2626" strokeWidth="3" strokeDasharray="8 6" />
          <text x="140" y="80" className="text-xs font-bold fill-red-700">Diagonal</text>
        </svg>
      );

    case 'kite-rhombus-compare':
      return (
        <div className="flex items-center gap-6 justify-center">
          <svg viewBox="0 0 140 180" className="w-32 h-auto">
            <polygon points="70,20 125,75 70,165 15,75" fill="#eff6ff" stroke="#2563eb" strokeWidth="3" />
            <text x="70" y="100" textAnchor="middle" className="text-sm font-black fill-blue-900">Kite</text>
          </svg>
          <svg viewBox="0 0 140 180" className="w-32 h-auto">
            <polygon points="70,20 130,90 70,160 10,90" fill="#fdf2f8" stroke="#db2777" strokeWidth="3" />
            <text x="70" y="95" textAnchor="middle" className="text-sm font-black fill-pink-900">Rhombus</text>
          </svg>
        </div>
      );

    case 'half-shape-grid':
      return (
        <svg viewBox="0 0 240 240" className="w-full max-w-[240px] h-auto border-2 border-slate-300 rounded-2xl bg-white">
          <defs>
            <pattern id="q-grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#e2e8f0" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#q-grid)" />
          {/* Mirror line */}
          <line x1="120" y1="0" x2="120" y2="240" stroke="#c026d3" strokeWidth="3" strokeDasharray="6 6" />
          {/* Half shape on left */}
          <polygon points="120,60 60,60 60,150 120,180" fill="#e0e7ff" stroke="#4338ca" strokeWidth="3" />
          <text x="125" y="25" className="text-xs font-black fill-fuchsia-700">Mirror line m</text>
        </svg>
      );

    case 'pinwheel-pattern':
      return (
        <svg viewBox="0 0 200 200" className="w-full max-w-[200px] h-auto">
          <circle cx="100" cy="100" r="8" fill="#ea580c" />
          <path d="M 100 100 Q 140 70 170 30 Q 130 40 100 100" fill="#fed7aa" stroke="#ea580c" strokeWidth="3" />
          <path d="M 100 100 Q 130 150 110 190 Q 90 150 100 100" fill="#fed7aa" stroke="#ea580c" strokeWidth="3" />
          <path d="M 100 100 Q 50 110 20 80 Q 60 70 100 100" fill="#fed7aa" stroke="#ea580c" strokeWidth="3" />
        </svg>
      );

    // 8.2 Diagrams
    case 'circle-labelled-a-f':
      return (
        <svg viewBox="0 0 300 260" className="w-full max-w-[300px] h-auto drop-shadow-sm">
          <circle cx="150" cy="130" r="90" fill="#f8fafc" stroke="#334155" strokeWidth="4" />
          {/* A: Centre */}
          <circle cx="150" cy="130" r="5" fill="#ea580c" />
          <text x="150" y="120" textAnchor="middle" className="text-sm font-black fill-orange-600">A</text>
          {/* B: Radius */}
          <line x1="150" y1="130" x2="240" y2="130" stroke="#2563eb" strokeWidth="3.5" />
          <text x="195" y="125" textAnchor="middle" className="text-sm font-black fill-blue-700">B</text>
          {/* C: Diameter */}
          <line x1="86" y1="66" x2="214" y2="194" stroke="#16a34a" strokeWidth="3.5" />
          <text x="100" y="80" textAnchor="middle" className="text-sm font-black fill-emerald-700">C</text>
          {/* D: Chord */}
          <line x1="75" y1="175" x2="160" y2="218" stroke="#9333ea" strokeWidth="3.5" />
          <text x="110" y="210" textAnchor="middle" className="text-sm font-black fill-purple-700">D</text>
          {/* E: Tangent */}
          <line x1="30" y1="130" x2="30" y2="240" stroke="#db2777" strokeWidth="3.5" />
          <text x="45" y="180" className="text-sm font-black fill-pink-700">E</text>
          {/* F: Circumference arrow */}
          <text x="250" y="75" className="text-sm font-black fill-slate-800">F (boundary)</text>
          <path d="M 230 80 Q 210 60 190 55" fill="none" stroke="#0f172a" strokeWidth="2" markerEnd="url(#arrow)" />
        </svg>
      );

    case 'radius-calc-circle':
      return (
        <svg viewBox="0 0 220 220" className="w-full max-w-[220px] h-auto">
          <circle cx="110" cy="110" r="85" fill="#f0fdf4" stroke="#16a34a" strokeWidth="4" />
          <circle cx="110" cy="110" r="5" fill="#ea580c" />
          <line x1="110" y1="110" x2="195" y2="110" stroke="#2563eb" strokeWidth="4" />
          <text x="150" y="100" textAnchor="middle" className="text-base font-extrabold fill-blue-800">r = 7 cm</text>
        </svg>
      );

    case 'regular-hexagon':
      return (
        <svg viewBox="0 0 220 220" className="w-full max-w-[220px] h-auto">
          <polygon points="110,25 185,68 185,152 110,195 35,152 35,68" fill="#ecfdf5" stroke="#059669" strokeWidth="4" />
          <circle cx="110" cy="110" r="4" fill="#059669" />
        </svg>
      );

    case 'rectangle-non-regular':
      return (
        <svg viewBox="0 0 240 160" className="w-full max-w-[240px] h-auto">
          <rect x="25" y="35" width="190" height="90" fill="#fff7ed" stroke="#ea580c" strokeWidth="4" />
          <text x="120" y="25" textAnchor="middle" className="text-sm font-bold fill-slate-600">8 cm</text>
          <text x="225" y="85" className="text-sm font-bold fill-slate-600">4 cm</text>
          {/* 90 deg corner markers */}
          <rect x="25" y="35" width="16" height="16" fill="none" stroke="#ea580c" strokeWidth="2" />
          <rect x="199" y="35" width="16" height="16" fill="none" stroke="#ea580c" strokeWidth="2" />
        </svg>
      );

    case 'regular-octagon':
      return (
        <svg viewBox="0 0 220 220" className="w-full max-w-[220px] h-auto">
          <polygon points="80,25 140,25 195,80 195,140 140,195 80,195 25,140 25,80" fill="#eff6ff" stroke="#2563eb" strokeWidth="4" />
        </svg>
      );

    case 'tangent-radius-diagram':
      return (
        <svg viewBox="0 0 260 220" className="w-full max-w-[260px] h-auto">
          <circle cx="110" cy="110" r="75" fill="#f8fafc" stroke="#334155" strokeWidth="4" />
          <circle cx="110" cy="110" r="5" fill="#ea580c" />
          <text x="110" y="95" className="text-sm font-black fill-slate-800">O</text>
          <line x1="110" y1="110" x2="185" y2="110" stroke="#2563eb" strokeWidth="3.5" />
          <circle cx="185" cy="110" r="5" fill="#dc2626" />
          <text x="195" y="105" className="text-sm font-black fill-red-700">P</text>
          <line x1="185" y1="20" x2="185" y2="200" stroke="#dc2626" strokeWidth="3.5" />
          {/* Right angle marker at P */}
          <rect x="169" y="110" width="16" height="16" fill="none" stroke="#dc2626" strokeWidth="2.5" />
        </svg>
      );

    // 8.3 Diagrams
    case 'congruent-four-shapes-a-d':
      return (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-white rounded-2xl border-2 border-slate-200 text-center">
            <span className="text-sm font-black text-blue-700">Shape A</span>
            <svg viewBox="0 0 100 80" className="w-full h-16">
              <polygon points="20,70 80,70 60,20" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
            </svg>
          </div>
          <div className="p-3 bg-white rounded-2xl border-2 border-slate-200 text-center">
            <span className="text-sm font-black text-amber-700">Shape B (Enlarged)</span>
            <svg viewBox="0 0 100 80" className="w-full h-16">
              <polygon points="10,75 90,75 65,10" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />
            </svg>
          </div>
          <div className="p-3 bg-white rounded-2xl border-2 border-slate-200 text-center">
            <span className="text-sm font-black text-blue-700">Shape C (Rotated)</span>
            <svg viewBox="0 0 100 80" className="w-full h-16">
              <polygon points="30,15 30,75 80,55" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
            </svg>
          </div>
          <div className="p-3 bg-white rounded-2xl border-2 border-slate-200 text-center">
            <span className="text-sm font-black text-rose-700">Shape D (Different)</span>
            <svg viewBox="0 0 100 80" className="w-full h-16">
              <polygon points="15,70 85,70 85,30 30,30" fill="#ffe4e6" stroke="#e11d48" strokeWidth="3" />
            </svg>
          </div>
        </div>
      );

    case 'triangles-abc-pqr-side':
      return (
        <div className="flex items-center gap-4 justify-center">
          <svg viewBox="0 0 120 120" className="w-28 h-auto">
            <polygon points="20,100 100,100 60,30" fill="#eff6ff" stroke="#2563eb" strokeWidth="3" />
            <text x="10" y="110" className="text-xs font-black fill-slate-800">A</text>
            <text x="105" y="110" className="text-xs font-black fill-slate-800">B</text>
            <text x="60" y="20" className="text-xs font-black fill-slate-800">C</text>
            <text x="60" y="115" textAnchor="middle" className="text-xs font-black fill-blue-700">5 cm</text>
          </svg>
          <span className="text-lg font-bold text-slate-400">≅</span>
          <svg viewBox="0 0 120 120" className="w-28 h-auto">
            <polygon points="20,100 100,100 60,30" fill="#f0fdf4" stroke="#16a34a" strokeWidth="3" />
            <text x="10" y="110" className="text-xs font-black fill-slate-800">P</text>
            <text x="105" y="110" className="text-xs font-black fill-slate-800">Q</text>
            <text x="60" y="20" className="text-xs font-black fill-slate-800">R</text>
            <text x="60" y="115" textAnchor="middle" className="text-xs font-black fill-emerald-700">PQ = ?</text>
          </svg>
        </div>
      );

    case 'congruent-angles-70':
      return (
        <div className="flex items-center gap-4 justify-center">
          <svg viewBox="0 0 120 120" className="w-28 h-auto">
            <polygon points="20,95 100,95 40,25" fill="#fff7ed" stroke="#ea580c" strokeWidth="3" />
            <text x="35" y="85" className="text-xs font-black fill-orange-700">70°</text>
            <text x="10" y="105" className="text-xs font-black fill-slate-800">A</text>
          </svg>
          <span className="text-lg font-bold text-slate-400">≅</span>
          <svg viewBox="0 0 120 120" className="w-28 h-auto">
            <polygon points="100,25 20,25 80,95" fill="#fdf4ff" stroke="#c026d3" strokeWidth="3" />
            <text x="35" y="45" className="text-xs font-black fill-purple-700">∠P = ?</text>
            <text x="10" y="20" className="text-xs font-black fill-slate-800">P</text>
          </svg>
        </div>
      );

    case 'l-shape-reflection-grid':
      return (
        <svg viewBox="0 0 240 240" className="w-full max-w-[240px] h-auto border-2 border-slate-300 rounded-2xl bg-white">
          <defs>
            <pattern id="l-grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#e2e8f0" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#l-grid)" />
          {/* Mirror line */}
          <line x1="120" y1="0" x2="120" y2="240" stroke="#ea580c" strokeWidth="3" strokeDasharray="6 6" />
          {/* Given L shape on left */}
          <polygon points="90,60 90,150 30,150 30,120 60,120 60,60" fill="#fed7aa" stroke="#c2410c" strokeWidth="3" />
          <text x="125" y="25" className="text-xs font-black fill-orange-800">Mirror line</text>
        </svg>
      );

    // 8.4 Diagrams
    case 'solid-cube-outline':
    case 'solid-cuboid-outline':
    case 'solid-cylinder-outline':
    case 'solid-pyramid-outline':
    case 'solid-tri-prism-outline':
    case 'solid-cone-outline':
    case 'cylinder-views-grid':
    case 'model-1-views-grid':
      return (
        <svg viewBox="0 0 240 180" className="w-full max-w-[240px] h-auto drop-shadow-sm">
          {/* Isometric cube box sketch */}
          <polygon points="70,75 140,40 210,75 140,110" fill="#e0e7ff" stroke="#3730a3" strokeWidth="3" />
          <polygon points="70,75 140,110 140,165 70,130" fill="#c7d2fe" stroke="#3730a3" strokeWidth="3" />
          <polygon points="140,110 210,75 210,130 140,165" fill="#a5b4fc" stroke="#3730a3" strokeWidth="3" />
        </svg>
      );

    default:
      return null;
  }
};
