import React, { useState } from 'react';
import { Sparkles, Check } from 'lucide-react';

interface PartSummary {
  id: string;
  name: string;
  colorHex: string;
  bgClass: string;
  def: string;
  renderSVGPart: () => React.ReactNode;
}

export const CircleSummarySlide: React.FC = () => {
  const [highlightedId, setHighlightedId] = useState<string>('radius');

  const cx = 160;
  const cy = 150;
  const r = 95;

  const parts: PartSummary[] = [
    {
      id: 'centre',
      name: 'Centre',
      colorHex: '#ea580c',
      bgClass: 'bg-orange-500',
      def: 'The point O located in the exact middle of the circle.',
      renderSVGPart: () => (
        <g>
          <circle cx={cx} cy={cy} r="8" fill="#ea580c" stroke="#ffffff" strokeWidth="2.5" />
          <text x={cx} y={cy - 14} textAnchor="middle" className="text-base font-black fill-orange-600">O (Centre)</text>
        </g>
      )
    },
    {
      id: 'radius',
      name: 'Radius (Radii)',
      colorHex: '#2563eb',
      bgClass: 'bg-blue-600',
      def: 'A straight line segment from centre to circumference. Plural is radii.',
      renderSVGPart: () => (
        <g>
          <line x1={cx} y1={cy} x2={cx + r * 0.866} y2={cy - r * 0.5} stroke="#2563eb" strokeWidth="4.5" />
          <circle cx={cx + r * 0.866} cy={cy - r * 0.5} r="5" fill="#2563eb" />
          <text x={cx + 45} y={cy - 35} className="text-base font-black fill-blue-700">Radius</text>
        </g>
      )
    },
    {
      id: 'diameter',
      name: 'Diameter',
      colorHex: '#16a34a',
      bgClass: 'bg-emerald-600',
      def: 'A line segment through the centre joining two points on the circle. Diameter = 2 × radius.',
      renderSVGPart: () => (
        <g>
          <line x1={cx - r * 0.707} y1={cy + r * 0.707} x2={cx + r * 0.707} y2={cy - r * 0.707} stroke="#16a34a" strokeWidth="4.5" />
          <text x={cx - 30} y={cy + 40} className="text-base font-black fill-emerald-700">Diameter</text>
        </g>
      )
    },
    {
      id: 'circumference',
      name: 'Circumference',
      colorHex: '#0f172a',
      bgClass: 'bg-slate-900',
      def: 'The outer perimeter or perimeter boundary of the circle.',
      renderSVGPart: () => (
        <g>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#0f172a" strokeWidth="5.5" />
          <text x={cx} y={cy - r - 12} textAnchor="middle" className="text-base font-black fill-slate-900">
            Circumference (Perimeter)
          </text>
        </g>
      )
    },
    {
      id: 'chord',
      name: 'Chord',
      colorHex: '#9333ea',
      bgClass: 'bg-purple-600',
      def: 'A straight line joining any two points on the circle. Diameter is the longest chord.',
      renderSVGPart: () => (
        <g>
          <line x1={cx - r * 0.95} y1={cy - 20} x2={cx - 10} y2={cy + r * 0.95} stroke="#9333ea" strokeWidth="4.5" />
          <circle cx={cx - r * 0.95} cy={cy - 20} r="5" fill="#9333ea" />
          <circle cx={cx - 10} cy={cy + r * 0.95} r="5" fill="#9333ea" />
          <text x={cx - 70} y={cy + 30} className="text-base font-black fill-purple-700">Chord</text>
        </g>
      )
    },
    {
      id: 'tangent',
      name: 'Tangent',
      colorHex: '#dc2626',
      bgClass: 'bg-red-600',
      def: 'A line that touches the circle at exactly ONE point. Radius meets tangent at 90°.',
      renderSVGPart: () => (
        <g>
          {/* Tangent line at right edge */}
          <line x1={cx + r} y1={cy - 85} x2={cx + r} y2={cy + 85} stroke="#dc2626" strokeWidth="4.5" />
          <circle cx={cx + r} cy={cy} r="6" fill="#dc2626" />
          <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke="#dc2626" strokeWidth="2.5" strokeDasharray="4 4" />
          <rect x={cx + r - 14} y={cy - 14} width="14" height="14" fill="none" stroke="#dc2626" strokeWidth="2" />
          <text x={cx + r + 15} y={cy + 5} className="text-base font-black fill-red-700">Tangent (90°)</text>
        </g>
      )
    }
  ];

  const activePart = parts.find((p) => p.id === highlightedId) || parts[0];

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-6xl mx-auto p-6 select-none">
      <div>
        <span className="text-sm font-black text-emerald-600 uppercase tracking-widest">
          Unit 8.2 · Reference Summary
        </span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          Parts of a Circle Summary
        </h2>
        <p className="text-2xl font-bold text-slate-700 leading-snug">
          Tap any of the 6 parts on the right to highlight it on the diagram.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8 items-center my-auto">
        {/* Big Complete SVG Circle */}
        <div className="col-span-12 md:col-span-7 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl flex flex-col items-center justify-center min-h-[420px] relative">
          <svg viewBox="0 0 340 300" className="w-96 h-80 overflow-visible">
            {/* Base Circle boundary */}
            <circle cx={cx} cy={cy} r={r} fill="#f8fafc" stroke="#94a3b8" strokeWidth="3" />

            {/* Render all 6 parts, dim non-active ones if selected */}
            {parts.map((p) => {
              const isHighlight = p.id === highlightedId;
              return (
                <g key={p.id} opacity={isHighlight ? 1 : 0.4} className="transition-opacity duration-200">
                  {p.renderSVGPart()}
                </g>
              );
            })}
          </svg>

          {/* Active Highlight Banner */}
          <div
            className="w-full mt-4 p-4 rounded-2xl border-2 flex items-center justify-between"
            style={{ borderColor: activePart.colorHex, backgroundColor: `${activePart.colorHex}15` }}
          >
            <div>
              <span className="text-xl font-black" style={{ color: activePart.colorHex }}>
                {activePart.name}
              </span>
              <p className="text-base font-bold text-slate-700 mt-0.5">
                {activePart.def}
              </p>
            </div>
          </div>
        </div>

        {/* 6 Part Cards */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-2.5">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            Tap a part to highlight on circle:
          </span>
          {parts.map((p) => {
            const isSel = p.id === highlightedId;
            return (
              <button
                key={p.id}
                onClick={() => setHighlightedId(p.id)}
                className={`p-3.5 rounded-2xl text-left border-2 flex items-center justify-between transition-all active:scale-98 ${
                  isSel
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xl scale-102'
                    : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-5 h-5 rounded-full shrink-0"
                    style={{ backgroundColor: p.colorHex }}
                  />
                  <span className="text-lg font-black">{p.name}</span>
                </div>
                {isSel && <Check className="w-5 h-5 text-white stroke-[3]" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-bold text-lg">
        Classroom note: Six key circle terms to master in Cambridge Stage 7!
      </div>
    </div>
  );
};
