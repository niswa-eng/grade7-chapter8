import React, { useState } from 'react';
import { PracticeQuestion, GridType } from '../../types';
import { PracticeDiagram } from './PracticeDiagram';
import { WorkingSpaceGrid } from '../whiteboard/WorkingSpaceGrid';
import { Grid, Hash, AlignJustify, EyeOff } from 'lucide-react';

interface PracticeSlideProps {
  question: PracticeQuestion;
  allQuestions: PracticeQuestion[];
  onSelectQuestion: (questionIndex: number) => void;
}

export const PracticeSlide: React.FC<PracticeSlideProps> = ({
  question,
  allQuestions,
  onSelectQuestion
}) => {
  const [gridType, setGridType] = useState<GridType>(question.defaultGrid || 'lines');

  // Group questions by level
  const level1Questions = allQuestions.filter((q) => q.level === 1);
  const level2Questions = allQuestions.filter((q) => q.level === 2);
  const level3Questions = allQuestions.filter((q) => q.level === 3);

  const getLevelBadgeColor = (lvl: number) => {
    switch (lvl) {
      case 1: return 'bg-emerald-600 text-white';
      case 2: return 'bg-blue-600 text-white';
      case 3: return 'bg-purple-600 text-white';
      default: return 'bg-slate-700 text-white';
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-6 select-none overflow-hidden">
      {/* Top Bar: Level Selector Chip Row */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-slate-200 shrink-0 gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-sm font-black text-slate-500 uppercase tracking-wider mr-1">
            Practice:
          </span>

          {/* Level 1 Chips */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200">
            <span className="text-xs font-black uppercase text-emerald-700 px-2">L1 Basic</span>
            {level1Questions.map((q) => {
              const qIdx = allQuestions.findIndex((item) => item.id === q.id);
              const isSelected = q.id === question.id;
              return (
                <button
                  key={q.id}
                  onClick={() => onSelectQuestion(qIdx)}
                  className={`w-9 h-9 rounded-xl font-extrabold text-sm transition-all active:scale-95 ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Q{q.number}
                </button>
              );
            })}
          </div>

          {/* Level 2 Chips */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200">
            <span className="text-xs font-black uppercase text-blue-700 px-2">L2 Medium</span>
            {level2Questions.map((q) => {
              const qIdx = allQuestions.findIndex((item) => item.id === q.id);
              const isSelected = q.id === question.id;
              return (
                <button
                  key={q.id}
                  onClick={() => onSelectQuestion(qIdx)}
                  className={`w-9 h-9 rounded-xl font-extrabold text-sm transition-all active:scale-95 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Q{q.number}
                </button>
              );
            })}
          </div>

          {/* Level 3 Chips */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200">
            <span className="text-xs font-black uppercase text-purple-700 px-2">L3 Challenge</span>
            {level3Questions.map((q) => {
              const qIdx = allQuestions.findIndex((item) => item.id === q.id);
              const isSelected = q.id === question.id;
              return (
                <button
                  key={q.id}
                  onClick={() => onSelectQuestion(qIdx)}
                  className={`w-9 h-9 rounded-xl font-extrabold text-sm transition-all active:scale-95 ${
                    isSelected
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Q{q.number}
                </button>
              );
            })}
          </div>
        </div>

        {/* Working Space Background Grid Toggles */}
        <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <span className="text-xs font-bold text-slate-500 uppercase px-2">Grid:</span>
          <button
            onClick={() => setGridType('none')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
              gridType === 'none' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <EyeOff className="w-3.5 h-3.5" /> Plain
          </button>
          <button
            onClick={() => setGridType('dots')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
              gridType === 'dots' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Hash className="w-3.5 h-3.5" /> Dots
          </button>
          <button
            onClick={() => setGridType('grid')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
              gridType === 'grid' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Grid className="w-3.5 h-3.5" /> Squares
          </button>
          <button
            onClick={() => setGridType('lines')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
              gridType === 'lines' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <AlignJustify className="w-3.5 h-3.5" /> Lined
          </button>
        </div>
      </div>

      {/* Main Split: 40% Question / 60% Working Space */}
      <div className="flex-1 grid grid-cols-12 gap-6 pt-4 min-h-0">
        {/* Left: 40% Question Panel */}
        <div className="col-span-12 lg:col-span-5 flex flex-col justify-between bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-lg overflow-y-auto">
          <div>
            {/* Level Tag & Question Number */}
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3.5 py-1.5 rounded-xl text-sm font-black uppercase tracking-wider ${getLevelBadgeColor(question.level)}`}>
                Level {question.level} {question.level === 1 ? '· Basic' : question.level === 2 ? '· Medium' : '· Challenge'}
              </span>
              <span className="text-xl font-black text-slate-900 font-mono">
                Question {question.number}
              </span>
            </div>

            {/* Title & Prompt */}
            <h2 className="text-2xl font-black text-slate-900 leading-tight mb-4">
              {question.title}
            </h2>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-4">
              <p className="text-xl font-bold text-slate-900 leading-snug">
                {question.prompt}
              </p>
            </div>

            {question.subPrompt && (
              <p className="text-base font-semibold text-slate-600 leading-normal mb-4">
                {question.subPrompt}
              </p>
            )}

            {/* Optional crisp diagram */}
            {question.diagramType && (
              <div className="my-4 p-4 rounded-2xl bg-white border border-slate-200 flex justify-center items-center">
                <PracticeDiagram type={question.diagramType} />
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-200 text-xs font-bold text-slate-400">
            Cambridge Stage 7 Practice · Teacher solves live on the whiteboard
          </div>
        </div>

        {/* Right: 60% Working Space */}
        <div className="col-span-12 lg:col-span-7 bg-white rounded-3xl border-2 border-slate-200 shadow-lg relative flex flex-col overflow-hidden">
          {/* Header indicator */}
          <div className="h-12 border-b border-slate-200 px-6 flex items-center justify-between bg-slate-50/80 z-10">
            <span className="text-sm font-extrabold uppercase tracking-widest text-slate-600">
              Teacher Working Space (Live Whiteboard)
            </span>
            <span className="text-xs font-bold text-slate-400">
              Use Pen, Line, or Eraser to write &amp; solve live
            </span>
          </div>

          {/* Canvas Working Space Area */}
          <div className="flex-1 relative w-full h-full">
            <WorkingSpaceGrid gridType={gridType} />
            {/* The transparent whiteboard canvas renders on top of this container across the entire app */}
          </div>
        </div>
      </div>
    </div>
  );
};
