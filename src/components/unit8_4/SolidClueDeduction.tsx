import React, { useState } from 'react';
import { clueChainPresets, solids8_4_data, Solid3DInfo } from '../../data/unit8_4_data';
import { Sparkles, CheckCircle2, RotateCcw, Search, ChevronRight } from 'lucide-react';

export const SolidClueDeduction: React.FC = () => {
  const [selectedChainId, setSelectedChainId] = useState<string>('chain-pyramid');
  const [revealedCluesCount, setRevealedCluesCount] = useState<number>(1);

  const chain = clueChainPresets.find((c) => c.id === selectedChainId) || clueChainPresets[0];

  // Filter solids matching all revealed clues
  const matchingSolids = solids8_4_data.filter((solid) => {
    for (let i = 0; i < revealedCluesCount; i++) {
      if (!chain.clues[i].filterFn(solid)) return false;
    }
    return true;
  });

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-6xl mx-auto p-6 select-none overflow-y-auto">
      <div>
        <span className="text-sm font-black text-purple-600 uppercase tracking-widest">
          Unit 8.4 · Deduction Skill
        </span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          Describing a Solid from Its Properties
        </h2>
        <p className="text-2xl font-bold text-slate-700 leading-snug">
          One clue alone may fit several solids. Combining clues narrows it down to exactly <span className="text-purple-600 font-extrabold">ONE</span> solid!
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8 items-center my-auto">
        {/* Left: Clue Cards & Stepper */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
          {/* Chain Selector */}
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2 block">
              Choose Mystery Problem:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {clueChainPresets.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedChainId(c.id);
                    setRevealedCluesCount(1);
                  }}
                  className={`p-3 rounded-2xl font-black text-sm border-2 transition-all ${
                    selectedChainId === c.id
                      ? 'bg-purple-600 text-white border-purple-700 shadow-md'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  {c.title}
                </button>
              ))}
            </div>
          </div>

          {/* Clues Display */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-sm font-black text-purple-700 uppercase">Clue Deck</span>
              <span className="text-xs font-bold text-slate-400">
                {revealedCluesCount} of {chain.clues.length} revealed
              </span>
            </div>

            {chain.clues.map((clue, idx) => {
              const isRevealed = idx < revealedCluesCount;
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    isRevealed
                      ? 'bg-purple-50 border-purple-300 text-purple-950 font-black text-lg'
                      : 'bg-slate-50 border-dashed border-slate-200 text-slate-400 font-bold text-base'
                  }`}
                >
                  {isRevealed ? clue.text : `Clue ${idx + 1}: Tap "Reveal Next Clue"`}
                </div>
              );
            })}

            {/* Stepper Buttons */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setRevealedCluesCount((prev) => Math.min(chain.clues.length, prev + 1))}
                disabled={revealedCluesCount >= chain.clues.length}
                className={`flex-1 h-14 rounded-2xl font-black text-base flex items-center justify-center gap-2 transition-all active:scale-95 ${
                  revealedCluesCount >= chain.clues.length
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-600/30'
                }`}
              >
                <span>Reveal Next Clue</span>
                <ChevronRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => setRevealedCluesCount(1)}
                className="w-14 h-14 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center active:scale-95 border border-slate-200"
                title="Reset clues"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Grid of All 8 Solids, dimming non-matching ones */}
        <div className="col-span-12 md:col-span-7 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-black uppercase text-slate-500">
              Solids Filter ({matchingSolids.length} remaining):
            </span>
            {matchingSolids.length === 1 && (
              <span className="text-xs font-black uppercase bg-emerald-100 text-emerald-800 px-3 py-1 rounded-xl flex items-center gap-1 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" /> Solved! Exactly 1 Match
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {solids8_4_data.map((s) => {
              const isMatch = matchingSolids.some((m) => m.id === s.id);
              const isUniqueAnswer = matchingSolids.length === 1 && isMatch;

              return (
                <div
                  key={s.id}
                  className={`p-4 rounded-2xl border-2 transition-all text-center flex flex-col justify-between ${
                    isUniqueAnswer
                      ? 'bg-emerald-500 text-white border-emerald-600 shadow-2xl scale-105 ring-4 ring-emerald-300'
                      : isMatch
                      ? 'bg-purple-50 text-purple-950 border-purple-300 shadow-md font-bold'
                      : 'bg-slate-50 text-slate-300 border-slate-200 opacity-30 grayscale'
                  }`}
                >
                  <span className="text-lg font-black block leading-tight">{s.name}</span>
                  <div className="mt-2 text-xs font-mono">
                    F:{s.faces} · E:{s.edges} · V:{s.vertices}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Solved Conclusion Card */}
          {matchingSolids.length === 1 && (
            <div className="mt-6 p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 flex items-center gap-3">
              <Sparkles className="w-7 h-7 text-emerald-600 shrink-0" />
              <div>
                <span className="text-lg font-black">
                  Identified Solid: {matchingSolids[0].name}!
                </span>
                <p className="text-sm font-semibold text-emerald-800">
                  {matchingSolids[0].faceDescription}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-purple-950 font-bold text-lg">
        Classroom method: Teach students to eliminate non-qualifying shapes with each successive clue!
      </div>
    </div>
  );
};
