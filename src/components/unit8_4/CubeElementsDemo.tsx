import React, { useState } from 'react';
import { Layers, Minus, Dot, Sparkles, Check } from 'lucide-react';

export const CubeElementsDemo: React.FC = () => {
  const [activeElement, setActiveElement] = useState<'faces' | 'edges' | 'vertices'>('faces');
  const [highlightCount, setHighlightCount] = useState<number>(6); // how many elements revealed

  // Cube wireframe vertices in isometric projection:
  // Front face: A(70,110), B(170,110), C(170,210), D(70,210)
  // Back face:  E(130,50),  F(230,50),  G(230,150), H(130,150)
  const vertices = [
    { x: 70, y: 110, label: '1' },
    { x: 170, y: 110, label: '2' },
    { x: 170, y: 210, label: '3' },
    { x: 70, y: 210, label: '4' },
    { x: 130, y: 50, label: '5' },
    { x: 230, y: 50, label: '6' },
    { x: 230, y: 150, label: '7' },
    { x: 130, y: 150, label: '8' }
  ];

  const edges = [
    // Front 4
    { x1: 70, y1: 110, x2: 170, y2: 110 },
    { x1: 170, y1: 110, x2: 170, y2: 210 },
    { x1: 170, y1: 210, x2: 70, y2: 210 },
    { x1: 70, y1: 210, x2: 70, y2: 110 },
    // Back 4
    { x1: 130, y1: 50, x2: 230, y2: 50 },
    { x1: 230, y1: 50, x2: 230, y2: 150 },
    { x1: 230, y1: 150, x2: 130, y2: 150 },
    { x1: 130, y1: 150, x2: 130, y2: 50 },
    // Connecting 4
    { x1: 70, y1: 110, x2: 130, y2: 50 },
    { x1: 170, y1: 110, x2: 230, y2: 50 },
    { x1: 170, y1: 210, x2: 230, y2: 150 },
    { x1: 70, y1: 210, x2: 130, y2: 150 }
  ];

  const faces = [
    { name: 'Front Face', points: '70,110 170,110 170,210 70,210', color: '#60a5fa' },
    { name: 'Top Face', points: '70,110 130,50 230,50 170,110', color: '#93c5fd' },
    { name: 'Right Face', points: '170,110 230,50 230,150 170,210', color: '#3b82f6' },
    { name: 'Bottom Face', points: '70,210 170,210 230,150 130,150', color: '#1d4ed8' },
    { name: 'Left Face', points: '70,110 130,50 130,150 70,210', color: '#2563eb' },
    { name: 'Back Face', points: '130,50 230,50 230,150 130,150', color: '#1e40af' }
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-6xl mx-auto p-6 select-none">
      <div>
        <span className="text-sm font-black text-purple-600 uppercase tracking-widest">
          Unit 8.4 · Concept 2
        </span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          Faces, Edges, and Vertices on a Cube
        </h2>
        <p className="text-2xl font-bold text-slate-700 leading-snug">
          Learn the three primary anatomical components that define any 3D solid!
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8 items-center my-auto">
        {/* SVG Display Stage */}
        <div className="col-span-12 md:col-span-7 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl flex flex-col items-center justify-center min-h-[420px] relative">
          <svg viewBox="0 0 300 260" className="w-80 h-72 overflow-visible">
            {/* Faces Rendering */}
            {activeElement === 'faces' ? (
              <g>
                {faces.slice(0, highlightCount).map((f, i) => (
                  <polygon
                    key={f.name}
                    points={f.points}
                    fill={f.color}
                    opacity="0.75"
                    stroke="#1e3a8a"
                    strokeWidth="3"
                  />
                ))}
              </g>
            ) : (
              /* Transparent Wireframe Cube Base */
              <g stroke="#94a3b8" strokeWidth="2.5" fill="none">
                <polygon points="70,110 170,110 170,210 70,210" />
                <polygon points="130,50 230,50 230,150 130,150" strokeDasharray="4 4" />
                <line x1="70" y1="110" x2="130" y2="50" />
                <line x1="170" y1="110" x2="230" y2="50" />
                <line x1="170" y1="210" x2="230" y2="150" />
                <line x1="70" y1="210" x2="130" y2="150" strokeDasharray="4 4" />
              </g>
            )}

            {/* Edges Highlight */}
            {activeElement === 'edges' && (
              <g>
                {edges.slice(0, highlightCount).map((e, idx) => (
                  <line
                    key={idx}
                    x1={e.x1}
                    y1={e.y1}
                    x2={e.x2}
                    y2={e.y2}
                    stroke="#dc2626"
                    strokeWidth="5.5"
                    strokeLinecap="round"
                  />
                ))}
              </g>
            )}

            {/* Vertices Highlight (Dots) */}
            {activeElement === 'vertices' && (
              <g>
                {vertices.slice(0, highlightCount).map((v) => (
                  <g key={v.label}>
                    <circle cx={v.x} cy={v.y} r="10" fill="#ea580c" stroke="#ffffff" strokeWidth="3" />
                    <text x={v.x} y={v.y + 4} textAnchor="middle" className="text-xs font-black fill-white">
                      {v.label}
                    </text>
                  </g>
                ))}
              </g>
            )}
          </svg>

          {/* Counts & Definition Banner */}
          <div className="mt-4 flex items-center gap-3">
            {activeElement === 'faces' && (
              <div className="text-blue-900 bg-blue-50 px-6 py-2.5 rounded-2xl border-2 border-blue-200 font-black text-xl">
                6 Faces (All flat squares)
              </div>
            )}
            {activeElement === 'edges' && (
              <div className="text-rose-900 bg-rose-50 px-6 py-2.5 rounded-2xl border-2 border-rose-200 font-black text-xl">
                12 Edges (Where two faces meet)
              </div>
            )}
            {activeElement === 'vertices' && (
              <div className="text-orange-900 bg-orange-50 px-6 py-2.5 rounded-2xl border-2 border-orange-200 font-black text-xl">
                8 Vertices (Corners where edges meet)
              </div>
            )}
          </div>
        </div>

        {/* Feature Selectors */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-3">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            Select Element to Inspect:
          </span>

          {/* Faces */}
          <button
            onClick={() => {
              setActiveElement('faces');
              setHighlightCount(6);
            }}
            className={`p-4 rounded-2xl text-left border-2 font-black transition-all ${
              activeElement === 'faces'
                ? 'bg-blue-600 text-white border-blue-700 shadow-xl scale-102'
                : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xl">1. Faces</span>
              <span className="text-sm font-mono px-2 py-0.5 rounded-lg bg-white/20">6 Faces</span>
            </div>
            <p className={`text-xs font-semibold ${activeElement === 'faces' ? 'text-blue-100' : 'text-slate-500'}`}>
              <strong>Face:</strong> A flat or curved individual surface of a solid.
            </p>
          </button>

          {/* Edges */}
          <button
            onClick={() => {
              setActiveElement('edges');
              setHighlightCount(12);
            }}
            className={`p-4 rounded-2xl text-left border-2 font-black transition-all ${
              activeElement === 'edges'
                ? 'bg-rose-600 text-white border-rose-700 shadow-xl scale-102'
                : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xl">2. Edges</span>
              <span className="text-sm font-mono px-2 py-0.5 rounded-lg bg-white/20">12 Edges</span>
            </div>
            <p className={`text-xs font-semibold ${activeElement === 'edges' ? 'text-rose-100' : 'text-slate-500'}`}>
              <strong>Edge:</strong> A straight or curved line where two faces meet.
            </p>
          </button>

          {/* Vertices */}
          <button
            onClick={() => {
              setActiveElement('vertices');
              setHighlightCount(8);
            }}
            className={`p-4 rounded-2xl text-left border-2 font-black transition-all ${
              activeElement === 'vertices'
                ? 'bg-orange-600 text-white border-orange-700 shadow-xl scale-102'
                : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xl">3. Vertices</span>
              <span className="text-sm font-mono px-2 py-0.5 rounded-lg bg-white/20">8 Vertices</span>
            </div>
            <p className={`text-xs font-semibold ${activeElement === 'vertices' ? 'text-orange-100' : 'text-slate-500'}`}>
              <strong>Vertex:</strong> A corner point where edges meet (Plural: <em>vertices</em>).
            </p>
          </button>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-purple-950 font-bold text-lg">
        Cambridge summary on a Cube: Faces = 6, Edges = 12, Vertices = 8!
      </div>
    </div>
  );
};
