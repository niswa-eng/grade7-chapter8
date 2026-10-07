import React from 'react';
import { Scissors, Check, Sparkles } from 'lucide-react';

export const CongruentDefinition: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between max-w-5xl mx-auto p-6 select-none">
      <div>
        <span className="text-sm font-black text-orange-600 uppercase tracking-widest">
          Unit 8.3 · Core Definition
        </span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          What Does Congruent Mean?
        </h2>
        <p className="text-2xl font-bold text-slate-700 leading-snug">
          The mathematical word for identical 2D shapes is <span className="text-orange-600 font-extrabold uppercase">CONGRUENT</span>.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-xl my-auto space-y-8">
        {/* Two Essential Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-orange-50 border-2 border-orange-200 flex flex-col items-center text-center">
            <span className="w-14 h-14 rounded-2xl bg-orange-600 text-white font-black text-2xl flex items-center justify-center mb-3">
              1
            </span>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Same Shape</h3>
            <p className="text-slate-700 font-bold text-lg">
              All corresponding angles must be exactly equal in size.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-orange-50 border-2 border-orange-200 flex flex-col items-center text-center">
            <span className="w-14 h-14 rounded-2xl bg-orange-600 text-white font-black text-2xl flex items-center justify-center mb-3">
              2
            </span>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Same Size</h3>
            <p className="text-slate-700 font-bold text-lg">
              All corresponding sides must be exactly equal in length.
            </p>
          </div>
        </div>

        {/* Paper Cut-out Metaphor */}
        <div className="p-6 rounded-2xl bg-slate-900 text-white flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-white/10 text-amber-400 flex items-center justify-center shrink-0">
            <Scissors className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold text-amber-400 mb-1">The Paper Cut-Out Test</h4>
            <p className="text-xl font-bold text-slate-200 leading-relaxed">
              If you cut out one shape with scissors, it will fit <strong>exactly</strong> onto the other shape, covering it completely without any gaps or overlaps!
            </p>
          </div>
        </div>

        {/* Mathematical Notation & Word note */}
        <div className="p-4 rounded-xl bg-slate-100 flex items-center justify-between text-slate-700 font-bold text-base">
          <span>In Cambridge Mathematics, always use the word <strong>"congruent"</strong> rather than just writing the symbol ≅.</span>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-orange-950 font-bold text-lg">
        Reminder: Position and orientation do NOT matter! A flipped or turned shape can still be congruent.
      </div>
    </div>
  );
};
