import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { StepDefinition } from '../../types';

interface BottomBarProps {
  steps: StepDefinition[];
  currentStepIndex: number;
  onSelectStepIndex: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  accentColor: string;
}

export const BottomBar: React.FC<BottomBarProps> = ({
  steps,
  currentStepIndex,
  onSelectStepIndex,
  onPrev,
  onNext,
  accentColor
}) => {
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === steps.length - 1;

  const getAccentBtnStyle = () => {
    switch (accentColor) {
      case 'blue': return 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25';
      case 'emerald': return 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/25';
      case 'orange': return 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-500/25';
      case 'purple': return 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/25';
      default: return 'bg-slate-900 hover:bg-slate-800 text-white';
    }
  };

  return (
    <footer className="h-24 bg-white/95 backdrop-blur-md border-t-2 border-slate-200 px-6 flex items-center justify-between z-20 shrink-0 select-none">
      {/* Big Back Button (min 64px touch target) */}
      <button
        onClick={onPrev}
        disabled={isFirst}
        className={`h-16 px-8 rounded-2xl flex items-center gap-3 font-extrabold text-xl border-2 transition-all active:scale-95 ${
          isFirst
            ? 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed'
            : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100 shadow-md'
        }`}
        aria-label="Previous Step"
      >
        <ChevronLeft className="w-8 h-8 stroke-[3]" />
        <span>BACK</span>
      </button>

      {/* Center: Step Counter & Progress Strip */}
      <div className="flex flex-col items-center gap-2 max-w-xl w-full px-4">
        {/* Step Counter */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-black text-slate-900 tracking-wide font-mono tabular-nums">
            Step {currentStepIndex + 1}
          </span>
          <span className="text-slate-400 font-bold text-base">/</span>
          <span className="text-base font-bold text-slate-500 font-mono tabular-nums">
            {steps.length}
          </span>
          <span className="text-xs font-bold text-slate-400 hidden sm:inline ml-2">
            ({steps[currentStepIndex]?.title})
          </span>
        </div>

        {/* Tappable Progress Dots / Strip */}
        <div className="flex items-center gap-1.5 w-full max-w-md justify-center overflow-x-auto py-1">
          {steps.map((step, idx) => {
            const isCurrent = idx === currentStepIndex;
            const isPractice = step.componentType === 'practice';
            return (
              <button
                key={step.id}
                onClick={() => onSelectStepIndex(idx)}
                className={`h-3 rounded-full transition-all active:scale-90 ${
                  isCurrent
                    ? 'w-8 bg-slate-900 shadow-sm'
                    : isPractice
                    ? 'w-3 bg-amber-400/80 hover:bg-amber-500'
                    : 'w-3 bg-slate-300 hover:bg-slate-400'
                }`}
                title={`Jump to step ${idx + 1}: ${step.title}`}
                aria-label={`Jump to step ${idx + 1}`}
              />
            );
          })}
        </div>
      </div>

      {/* Big Next Button (min 64px touch target) */}
      <button
        onClick={onNext}
        disabled={isLast}
        className={`h-16 px-8 rounded-2xl flex items-center gap-3 font-extrabold text-xl shadow-lg border-2 border-transparent transition-all active:scale-95 ${
          isLast
            ? 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed shadow-none'
            : getAccentBtnStyle()
        }`}
        aria-label="Next Step"
      >
        <span>NEXT</span>
        <ChevronRight className="w-8 h-8 stroke-[3]" />
      </button>
    </footer>
  );
};
