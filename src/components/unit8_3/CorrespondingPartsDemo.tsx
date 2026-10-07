import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight } from 'lucide-react';

export const CorrespondingPartsDemo: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState<'side-ab' | 'side-bc' | 'side-ca' | 'angle-a' | 'angle-b' | 'angle-c'>('side-ab');

  // Triangle 1 ABC: A(40,160), B(160,160), C(90,50)
  // Triangle 2 PQR: P(200,160), Q(320,160), R(250,50) (congruent)

  const pairs = [
    { id: 'side-ab', type: 'side', label: 'Side AB corresponds to Side PQ', val1: 'AB = 6 cm', val2: 'PQ = 6 cm', color: '#2563eb' },
    { id: 'side-bc', type: 'side', label: 'Side BC corresponds to Side QR', val1: 'BC = 7 cm', val2: 'QR = 7 cm', color: '#16a34a' },
    { id: 'side-ca', type: 'side', label: 'Side CA corresponds to Side RP', val1: 'CA = 5 cm', val2: 'RP = 5 cm', color: '#9333ea' },
    { id: 'angle-a', type: 'angle', label: 'Angle A corresponds to Angle P', val1: '∠A = 70°', val2: '∠P = 70°', color: '#ea580c' },
    { id: 'angle-b', type: 'angle', label: 'Angle B corresponds to Angle Q', val1: '∠B = 45°', val2: '∠Q = 45°', color: '#dc2626' },
    { id: 'angle-c', type: 'angle', label: 'Angle C corresponds to Angle R', val1: '∠C = 65°', val2: '∠R = 65°', color: '#0891b2' }
  ];

  const activePair = pairs.find((p) => p.id === selectedElement) || pairs[0];

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-6xl mx-auto p-6 select-none">
      <div>
        <span className="text-sm font-black text-orange-600 uppercase tracking-widest">
          Unit 8.3 · Key Concept
        </span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          Corresponding Sides &amp; Corresponding Angles
        </h2>
        <p className="text-2xl font-bold text-slate-700 leading-snug">
          When shapes are congruent: <span className="text-blue-600 font-extrabold">corresponding sides are equal in length</span> and <span className="text-orange-600 font-extrabold">corresponding angles are equal in size</span>.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8 items-center my-auto">
        {/* SVG Triangles ABC and PQR */}
        <div className="col-span-12 md:col-span-7 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl flex flex-col items-center justify-center min-h-[420px] relative">
          <svg viewBox="0 0 360 220" className="w-full h-64 overflow-visible">
            {/* Triangle 1 ABC */}
            <g>
              <polygon points="40,170 160,170 90,60" fill="#f8fafc" stroke="#94a3b8" strokeWidth="3" />
              {/* Highlighted elements */}
              {selectedElement === 'side-ab' && (
                <line x1="40" y1="170" x2="160" y2="170" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />
              )}
              {selectedElement === 'side-bc' && (
                <line x1="160" y1="170" x2="90" y2="60" stroke="#16a34a" strokeWidth="6" strokeLinecap="round" />
              )}
              {selectedElement === 'side-ca' && (
                <line x1="90" y1="60" x2="40" y2="170" stroke="#9333ea" strokeWidth="6" strokeLinecap="round" />
              )}
              {selectedElement === 'angle-a' && (
                <circle cx="40" cy="170" r="16" fill="#fed7aa" stroke="#ea580c" strokeWidth="3" opacity="0.8" />
              )}
              {selectedElement === 'angle-b' && (
                <circle cx="160" cy="170" r="16" fill="#fecaca" stroke="#dc2626" strokeWidth="3" opacity="0.8" />
              )}
              {selectedElement === 'angle-c' && (
                <circle cx="90" cy="60" r="16" fill="#cffafe" stroke="#0891b2" strokeWidth="3" opacity="0.8" />
              )}

              {/* Labels */}
              <text x="25" y="185" className="text-xl font-black fill-slate-900">A</text>
              <text x="170" y="185" className="text-xl font-black fill-slate-900">B</text>
              <text x="90" y="45" textAnchor="middle" className="text-xl font-black fill-slate-900">C</text>
              <text x="100" y="210" textAnchor="middle" className="text-base font-black fill-blue-900">Triangle ABC</text>
            </g>

            {/* Triangle 2 PQR (Congruent partner) */}
            <g>
              <polygon points="210,170 330,170 260,60" fill="#f8fafc" stroke="#94a3b8" strokeWidth="3" />
              {/* Highlighted matching element in same color */}
              {selectedElement === 'side-ab' && (
                <line x1="210" y1="170" x2="330" y2="170" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />
              )}
              {selectedElement === 'side-bc' && (
                <line x1="330" y1="170" x2="260" y2="60" stroke="#16a34a" strokeWidth="6" strokeLinecap="round" />
              )}
              {selectedElement === 'side-ca' && (
                <line x1="260" y1="60" x2="210" y2="170" stroke="#9333ea" strokeWidth="6" strokeLinecap="round" />
              )}
              {selectedElement === 'angle-a' && (
                <circle cx="210" cy="170" r="16" fill="#fed7aa" stroke="#ea580c" strokeWidth="3" opacity="0.8" />
              )}
              {selectedElement === 'angle-b' && (
                <circle cx="330" cy="170" r="16" fill="#fecaca" stroke="#dc2626" strokeWidth="3" opacity="0.8" />
              )}
              {selectedElement === 'angle-c' && (
                <circle cx="260" cy="60" r="16" fill="#cffafe" stroke="#0891b2" strokeWidth="3" opacity="0.8" />
              )}

              {/* Labels */}
              <text x="195" y="185" className="text-xl font-black fill-slate-900">P</text>
              <text x="340" y="185" className="text-xl font-black fill-slate-900">Q</text>
              <text x="260" y="45" textAnchor="middle" className="text-xl font-black fill-slate-900">R</text>
              <text x="270" y="210" textAnchor="middle" className="text-base font-black fill-emerald-900">Triangle PQR</text>
            </g>
          </svg>

          {/* Active Highlight Banner */}
          <div
            className="w-full mt-4 p-4 rounded-2xl border-2 flex items-center justify-between"
            style={{ borderColor: activePair.color, backgroundColor: `${activePair.color}15` }}
          >
            <div>
              <span className="text-xl font-black" style={{ color: activePair.color }}>
                {activePair.label}
              </span>
              <div className="flex gap-4 font-mono font-black text-slate-800 text-lg mt-1">
                <span>{activePair.val1}</span>
                <span>=</span>
                <span>{activePair.val2}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Picker Buttons */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-2.5">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            Matching Pairs:
          </span>
          {pairs.map((p) => {
            const isSel = p.id === selectedElement;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedElement(p.id as any)}
                className={`p-3.5 rounded-2xl text-left border-2 font-black transition-all active:scale-98 flex items-center justify-between ${
                  isSel
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xl scale-102'
                    : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="text-base">{p.label}</div>
                  <div className="text-xs font-mono font-bold opacity-75 mt-0.5">
                    {p.val1} = {p.val2}
                  </div>
                </div>
                {isSel && <Check className="w-5 h-5 text-white stroke-[3]" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-orange-950 font-bold text-lg">
        <span>If Triangle ABC is congruent to Triangle PQR, each side and angle in ABC equals its corresponding part in PQR.</span>
      </div>
    </div>
  );
};
