import React, { useState } from 'react';
import { VocabTerm } from '../../types';
import { RotateCw, Sparkles, BookOpen } from 'lucide-react';

interface VocabularyCardsProps {
  terms: VocabTerm[];
  title: string;
}

export const VocabularyCards: React.FC<VocabularyCardsProps> = ({ terms, title }) => {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const toggleFlip = (index: number) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <div className="w-full h-full flex flex-col justify-start max-w-6xl mx-auto px-6 py-4 select-none overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">
            Key Terminology
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h2>
        </div>
        <div className="text-sm font-bold text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-200">
          Tap any card to flip &amp; reveal definition
        </div>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-12">
        {terms.map((item, idx) => {
          const isFlipped = flippedIndex === idx;

          return (
            <div
              key={item.term}
              onClick={() => toggleFlip(idx)}
              className={`min-h-[200px] rounded-3xl p-6 transition-all duration-300 cursor-pointer border-2 relative flex flex-col justify-between active:scale-98 shadow-md ${
                isFlipped
                  ? 'bg-slate-900 text-white border-slate-800 shadow-xl'
                  : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-200 hover:border-blue-400'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <span className={`text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                  isFlipped ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {isFlipped ? 'Definition' : 'Term # ' + (idx + 1)}
                </span>
                <RotateCw className={`w-5 h-5 transition-transform ${isFlipped ? 'text-amber-400 rotate-180' : 'text-slate-400'}`} />
              </div>

              {/* Card Body */}
              <div className="my-auto py-2">
                {!isFlipped ? (
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 leading-tight mb-2">
                      {item.term}
                    </h3>
                    <p className="text-sm font-semibold text-slate-500">
                      Tap card to see meaning &amp; example
                    </p>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-black text-amber-300 leading-tight mb-2">
                      {item.term}
                    </h3>
                    <p className="text-lg font-bold text-slate-100 leading-snug mb-3">
                      {item.definition}
                    </p>
                    <div className="text-sm font-semibold text-slate-300 bg-white/10 p-2.5 rounded-xl border border-white/10">
                      <span className="font-extrabold text-white">Example: </span>
                      {item.example}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom hint */}
              <div className={`text-xs font-bold pt-2 border-t ${
                isFlipped ? 'border-white/15 text-slate-400' : 'border-slate-100 text-slate-400'
              }`}>
                {isFlipped ? 'Tap to flip back' : 'Tap to reveal definition'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
