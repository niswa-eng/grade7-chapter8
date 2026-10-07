import React, { useState } from 'react';
import { Divide, Equal, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface OrderExample {
  order: number;
  shapeName: string;
  hasSymmetry: boolean;
  angleStep: number;
}

export const OrderOfRotationDemo: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<number>(4);

  const orderExamples: OrderExample[] = [
    { order: 1, shapeName: 'Scalene Triangle / Kite', hasSymmetry: false, angleStep: 360 },
    { order: 2, shapeName: 'Rectangle / Parallelogram / Rhombus', hasSymmetry: true, angleStep: 180 },
    { order: 3, shapeName: 'Equilateral Triangle', hasSymmetry: true, angleStep: 120 },
    { order: 4, shapeName: 'Square', hasSymmetry: true, angleStep: 90 },
    { order: 5, shapeName: 'Regular Pentagon', hasSymmetry: true, angleStep: 72 },
    { order: 6, shapeName: 'Regular Hexagon', hasSymmetry: true, angleStep: 60 },
    { order: 8, shapeName: 'Regular Octagon', hasSymmetry: true, angleStep: 45 }
  ];

  const current = orderExamples.find((o) => o.order === selectedOrder) || orderExamples[3];

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-6xl mx-auto p-6 select-none">
      <div>
        <span className="text-sm font-black text-blue-600 uppercase tracking-widest">
          Unit 8.1 · Concept 4
        </span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          Order of Rotational Symmetry
        </h2>
        <p className="text-2xl font-bold text-slate-700 leading-snug">
          The <span className="text-blue-600 font-extrabold">order of rotational symmetry</span> is the number of times a shape looks identical in one 360° turn.
        </p>
      </div>

      {/* Main Formula & Visual Math Card */}
      <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-xl my-auto">
        {/* Big Cambridge Mathematical Formula Box */}
        <div className="p-6 bg-slate-900 text-white rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 mb-8 shadow-inner">
          <div className="text-xl font-bold text-slate-300">
            Mathematical Rule:
          </div>
          <div className="flex items-center gap-4 text-3xl font-black font-mono">
            <span className="text-amber-400">Angle Between Matches</span>
            <span>=</span>
            <div className="flex flex-col items-center">
              <span className="text-sky-300 border-b-2 border-white/40 pb-1 px-4">360°</span>
              <span className="text-emerald-400 pt-1">Order</span>
            </div>
          </div>
        </div>

        {/* Live Calculation for Selected Order */}
        <div className="p-6 bg-blue-50/80 rounded-2xl border-2 border-blue-200 flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div>
            <div className="text-sm font-black text-blue-600 uppercase tracking-wider mb-1">
              Active Example: {current.shapeName}
            </div>
            <div className="text-3xl font-black text-slate-900">
              Order {current.order} → 360° ÷ {current.order} = <span className="text-blue-700 font-mono">{current.angleStep}°</span>
            </div>
            <p className="text-base font-semibold text-slate-600 mt-1">
              Matches its outline every <span className="font-bold text-slate-900">{current.angleStep}°</span> during the full turn.
            </p>
          </div>

          {/* Symmetrical status badge */}
          {current.hasSymmetry ? (
            <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-100 text-emerald-800 font-black text-lg border border-emerald-300 shrink-0">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <span>Has Rotational Symmetry</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-rose-100 text-rose-800 font-black text-lg border border-rose-300 shrink-0">
              <AlertTriangle className="w-6 h-6 text-rose-600" />
              <span>Order 1 = NO Rotational Symmetry</span>
            </div>
          )}
        </div>

        {/* Order Selector Buttons */}
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2 block">
            Tap an Order to Inspect:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {orderExamples.map((item) => (
              <button
                key={item.order}
                onClick={() => setSelectedOrder(item.order)}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center transition-all active:scale-95 ${
                  selectedOrder === item.order
                    ? 'bg-blue-600 text-white border-blue-700 shadow-lg shadow-blue-600/30 scale-105'
                    : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className="text-2xl font-black font-mono">Order {item.order}</span>
                <span className={`text-xs font-bold mt-1 ${selectedOrder === item.order ? 'text-blue-100' : 'text-slate-500'}`}>
                  {item.angleStep}° step
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Critical Cambridge Teaching Misconception Warning */}
      <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-start gap-4 text-amber-950">
        <AlertTriangle className="w-8 h-8 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-lg font-bold leading-snug">
          <span className="font-extrabold uppercase text-amber-900">Key Cambridge Rule: </span>
          Every single shape matches once at 360° (full turn). Therefore, every shape has at least order 1.
          <span className="text-rose-700 font-black"> Order 1 means it has NO rotational symmetry!</span>
        </div>
      </div>
    </div>
  );
};
