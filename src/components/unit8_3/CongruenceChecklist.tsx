import React, { useState } from 'react';
import { CheckSquare, Square, CheckCircle2, Check, Sparkles } from 'lucide-react';

export const CongruenceChecklist: React.FC = () => {
  const [checked, setChecked] = useState<boolean[]>([true, true, true, true]);

  const items = [
    { title: '1. Exactly the same shape', desc: 'The outlines and proportions match identically.' },
    { title: '2. Exactly the same size', desc: 'No enlargement or reduction; scale factor is exactly 1.' },
    { title: '3. Corresponding sides are equal in length', desc: 'Every matching pair of sides has the exact same measurement in cm/mm.' },
    { title: '4. Corresponding angles are equal in size', desc: 'Every matching pair of angles has the exact same measurement in degrees.' }
  ];

  const toggleCheck = (idx: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-5xl mx-auto p-6 select-none">
      <div>
        <span className="text-sm font-black text-orange-600 uppercase tracking-widest">
          Unit 8.3 · Summary Checklist
        </span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          The Congruence Checklist
        </h2>
        <p className="text-2xl font-bold text-slate-700 leading-snug">
          Use this 4-point checklist to test whether any two 2D shapes are congruent.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-xl my-auto space-y-4">
        {items.map((item, idx) => {
          const isDone = checked[idx];
          return (
            <div
              key={item.title}
              onClick={() => toggleCheck(idx)}
              className={`p-5 rounded-2xl border-2 flex items-center gap-5 cursor-pointer transition-all active:scale-98 ${
                isDone
                  ? 'bg-orange-50/90 border-orange-300 text-orange-950'
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-black ${
                isDone ? 'bg-orange-600 text-white shadow-md' : 'bg-slate-200 text-slate-400'
              }`}>
                {isDone ? <Check className="w-6 h-6 stroke-[3]" /> : idx + 1}
              </div>
              <div>
                <h3 className="text-2xl font-black leading-tight">{item.title}</h3>
                <p className="text-base font-bold opacity-80 mt-0.5">{item.desc}</p>
              </div>
            </div>
          );
        })}

        {/* Vital Rule Card */}
        <div className="p-6 rounded-2xl bg-slate-900 text-white flex items-center gap-4 mt-6">
          <Sparkles className="w-8 h-8 text-amber-400 shrink-0" />
          <div className="text-xl font-bold text-slate-100">
            <span className="text-amber-400 font-extrabold">Remember: </span>
            Position and direction <strong className="text-white underline">DO NOT MATTER</strong>! A shape can be turned upside down, slid across the page, or flipped into a mirror image — it is still 100% congruent!
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-orange-950 font-bold text-lg">
        <span>If two shapes have all matching sides and angles equal, they are congruent regardless of orientation.</span>
      </div>
    </div>
  );
};
