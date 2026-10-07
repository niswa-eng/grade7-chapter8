import React, { useState } from 'react';
import { CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';

interface ShapeCard {
  name: string;
  isPolygon: boolean;
  reason: string;
  renderSVG: () => React.ReactNode;
}

export const PolygonDefinitionDemo: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'polygon' | 'non-polygon'>('all');

  const shapes: ShapeCard[] = [
    {
      name: 'Triangle',
      isPolygon: true,
      reason: 'Closed shape with 3 straight sides.',
      renderSVG: () => (
        <svg viewBox="0 0 100 80" className="w-24 h-20">
          <polygon points="50,15 85,68 15,68" fill="#dcfce7" stroke="#16a34a" strokeWidth="3" />
        </svg>
      )
    },
    {
      name: 'Pentagon',
      isPolygon: true,
      reason: 'Closed shape with 5 straight sides.',
      renderSVG: () => (
        <svg viewBox="0 0 100 80" className="w-24 h-20">
          <polygon points="50,12 85,38 72,72 28,72 15,38" fill="#dcfce7" stroke="#16a34a" strokeWidth="3" />
        </svg>
      )
    },
    {
      name: 'Hexagon',
      isPolygon: true,
      reason: 'Closed shape with 6 straight sides.',
      renderSVG: () => (
        <svg viewBox="0 0 100 80" className="w-24 h-20">
          <polygon points="50,10 85,28 85,62 50,78 15,62 15,28" fill="#dcfce7" stroke="#16a34a" strokeWidth="3" />
        </svg>
      )
    },
    {
      name: 'Circle',
      isPolygon: false,
      reason: 'NOT a polygon because it has a continuous curve, not straight sides.',
      renderSVG: () => (
        <svg viewBox="0 0 100 80" className="w-24 h-20">
          <circle cx="50" cy="45" r="30" fill="#fee2e2" stroke="#dc2626" strokeWidth="3" />
        </svg>
      )
    },
    {
      name: 'Semicircle',
      isPolygon: false,
      reason: 'NOT a polygon because one of its boundaries is curved.',
      renderSVG: () => (
        <svg viewBox="0 0 100 80" className="w-24 h-20">
          <path d="M 15 60 A 35 35 0 0 1 85 60 Z" fill="#fee2e2" stroke="#dc2626" strokeWidth="3" />
        </svg>
      )
    },
    {
      name: 'Open 3-Line Path',
      isPolygon: false,
      reason: 'NOT a polygon because it is not closed! (Gap between endpoints)',
      renderSVG: () => (
        <svg viewBox="0 0 100 80" className="w-24 h-20">
          <polyline points="20,65 50,20 80,65" fill="none" stroke="#dc2626" strokeWidth="3" strokeDasharray="4 2" />
          <circle cx="20" cy="65" r="4" fill="#dc2626" />
          <circle cx="80" cy="65" r="4" fill="#dc2626" />
        </svg>
      )
    }
  ];

  const filtered = shapes.filter((s) => {
    if (filter === 'polygon') return s.isPolygon;
    if (filter === 'non-polygon') return !s.isPolygon;
    return true;
  });

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-6xl mx-auto p-6 select-none">
      <div>
        <span className="text-sm font-black text-emerald-600 uppercase tracking-widest">
          Unit 8.2 · Part B: Polygons
        </span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          What is a Polygon?
        </h2>
        <p className="text-2xl font-bold text-slate-700 leading-snug">
          A <span className="text-emerald-600 font-extrabold">polygon</span> is a closed 2D shape with straight sides. Both conditions must be met!
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 w-fit">
        <button
          onClick={() => setFilter('all')}
          className={`px-5 py-2.5 rounded-xl font-black text-sm transition-all ${
            filter === 'all' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          All Examples
        </button>
        <button
          onClick={() => setFilter('polygon')}
          className={`px-5 py-2.5 rounded-xl font-black text-sm transition-all ${
            filter === 'polygon' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Polygons (✓)
        </button>
        <button
          onClick={() => setFilter('non-polygon')}
          className={`px-5 py-2.5 rounded-xl font-black text-sm transition-all ${
            filter === 'non-polygon' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Non-Polygons (✗)
        </button>
      </div>

      {/* Grid of Shapes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-auto">
        {filtered.map((item) => (
          <div
            key={item.name}
            className={`p-6 rounded-3xl border-2 flex flex-col justify-between bg-white shadow-md ${
              item.isPolygon ? 'border-emerald-200' : 'border-rose-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xl font-black text-slate-900">{item.name}</span>
              <span className={`px-3 py-1 rounded-xl text-xs font-black uppercase flex items-center gap-1 ${
                item.isPolygon ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {item.isPolygon ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                {item.isPolygon ? 'Polygon' : 'NOT a Polygon'}
              </span>
            </div>

            <div className="my-auto flex justify-center py-2">
              {item.renderSVG()}
            </div>

            <p className="text-sm font-bold text-slate-600 mt-2 border-t pt-2">
              {item.reason}
            </p>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-bold text-lg">
        <span>A polygon must be closed and bounded only by straight sides. If any side is curved, it is not a polygon.</span>
      </div>
    </div>
  );
};
