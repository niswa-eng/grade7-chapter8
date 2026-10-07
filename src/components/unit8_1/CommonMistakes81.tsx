import React, { useState } from 'react';
import { AlertCircle, Play, RotateCcw, Check, X } from 'lucide-react';

interface MistakeItem {
  id: string;
  letter: string;
  title: string;
  claim: string;
  truth: string;
  renderDemo: (isFolded: boolean) => React.ReactNode;
}

export const CommonMistakes81: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('mistake-a');
  const [isFolded, setIsFolded] = useState<boolean>(false);

  const mistakes: MistakeItem[] = [
    {
      id: 'mistake-a',
      letter: 'A',
      title: 'Rectangle Diagonal Misconception',
      claim: '"A diagonal divides a rectangle into two equal triangles, so it must be a line of symmetry!"',
      truth: 'FALSE: Even though both triangles have equal area, folding across the diagonal makes the corners stick out. They do NOT overlap.',
      renderDemo: (folded) => (
        <svg viewBox="0 0 300 240" className="w-80 h-64 overflow-visible">
          {/* Base Rectangle: 40,50 to 260,190 */}
          <rect x="40" y="50" width="220" height="140" fill="#f1f5f9" stroke="#64748b" strokeWidth="3" />
          {/* Diagonal */}
          <line x1="40" y1="50" x2="260" y2="190" stroke="#dc2626" strokeWidth="4" strokeDasharray="8 6" />

          {/* If folded: show rotated/folded triangle mismatch */}
          {folded ? (
            <polygon points="40,50 260,190 190,240" fill="#fca5a5" stroke="#dc2626" strokeWidth="3" opacity="0.85" />
          ) : (
            <polygon points="40,50 260,50 260,190" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" opacity="0.5" />
          )}
          <circle cx="260" cy="50" r="5" fill="#dc2626" />
          <text x="260" y="40" className="text-xs font-bold fill-red-600">Corner moves here when folded</text>
        </svg>
      )
    },
    {
      id: 'mistake-b',
      letter: 'B',
      title: 'Parallelogram Diagonal Misconception',
      claim: '"A diagonal connects opposite corners of a parallelogram, so it must be a line of symmetry."',
      truth: 'FALSE: A parallelogram has NO lines of symmetry (0 lines). A fold along either diagonal fails completely.',
      renderDemo: (folded) => (
        <svg viewBox="0 0 300 240" className="w-80 h-64 overflow-visible">
          {/* Parallelogram */}
          <polygon points="80,50 260,50 210,190 30,190" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />
          <line x1="80" y1="50" x2="210" y2="190" stroke="#dc2626" strokeWidth="4" strokeDasharray="8 6" />

          {folded && (
            <polygon points="80,50 210,190 120,230" fill="#fca5a5" stroke="#dc2626" strokeWidth="3" opacity="0.85" />
          )}
        </svg>
      )
    },
    {
      id: 'mistake-c',
      letter: 'C',
      title: 'Thinking Order 1 Means Having Rotational Symmetry',
      claim: '"My scalene triangle has order of rotational symmetry 1, so it has rotational symmetry."',
      truth: 'FALSE: Every object returns to its starting point after 360°. Order 1 simply means it only matches at the very end — thus it has NO rotational symmetry!',
      renderDemo: (folded) => (
        <svg viewBox="0 0 300 240" className="w-80 h-64 overflow-visible">
          <polygon points="70,50 250,150 60,210" fill="#faf5ff" stroke="#9333ea" strokeWidth="3" />
          <circle cx="150" cy="135" r="7" fill="#ea580c" />
          <text x="150" y="165" textAnchor="middle" className="text-sm font-bold fill-purple-900">
            Only matches at 360° (End of turn)
          </text>
          <path d="M 120 70 A 50 50 0 1 1 119 71" fill="none" stroke="#ea580c" strokeWidth="3" strokeDasharray="4 4" />
        </svg>
      )
    },
    {
      id: 'mistake-d',
      letter: 'D',
      title: 'Can a Shape Have Rotation But NO Reflection?',
      claim: '"If a shape has rotational symmetry, it must also have at least one line of symmetry."',
      truth: 'FALSE: A standard parallelogram has Order 2 rotational symmetry, but EXACTLY 0 lines of symmetry! Rotational and line symmetry are independent.',
      renderDemo: (folded) => (
        <svg viewBox="0 0 300 240" className="w-80 h-64 overflow-visible">
          <g
            style={{
              transformOrigin: '145px 120px',
              transform: folded ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.5s ease-out'
            }}
          >
            <polygon points="80,50 260,50 210,190 30,190" fill="#dbeafe" stroke="#2563eb" strokeWidth="4" />
          </g>
          <circle cx="145" cy="120" r="7" fill="#ea580c" />
          <text x="145" y="225" textAnchor="middle" className="text-sm font-black fill-blue-900">
            Lines: 0 · Order: 2 (Matches at 180° and 360°)
          </text>
        </svg>
      )
    }
  ];

  const active = mistakes.find((m) => m.id === selectedId) || mistakes[0];

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-6xl mx-auto p-6 select-none">
      <div>
        <span className="text-sm font-black text-rose-600 uppercase tracking-widest flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4" /> Common Misconceptions
        </span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          Don't Fall Into These Symmetry Traps!
        </h2>
        <p className="text-2xl font-bold text-slate-700 leading-snug">
          Examine the four most common Cambridge student errors and see why they fail.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8 items-center my-auto">
        {/* Visual Demo Stage */}
        <div className="col-span-12 md:col-span-7 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-full p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 mb-3">
            <span className="text-xs font-black uppercase text-rose-700 block">Student Claim:</span>
            <span className="text-lg font-bold italic">{active.claim}</span>
          </div>

          <div className="my-2">{active.renderDemo(isFolded)}</div>

          <div className="w-full p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 mt-2">
            <span className="text-xs font-black uppercase text-emerald-700 block">Correct Mathematical Fact:</span>
            <span className="text-base font-bold">{active.truth}</span>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={() => setIsFolded(!isFolded)}
              className="h-14 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-lg flex items-center gap-2 shadow-md active:scale-95"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>{isFolded ? 'Reset View' : 'Demonstrate Failure'}</span>
            </button>
          </div>
        </div>

        {/* Mistakes Selector Column */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-3">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            Select Misconception:
          </span>
          {mistakes.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setSelectedId(m.id);
                setIsFolded(false);
              }}
              className={`p-4 rounded-2xl text-left border-2 font-black transition-all active:scale-98 ${
                selectedId === m.id
                  ? 'bg-rose-600 text-white border-rose-700 shadow-xl shadow-rose-600/25 scale-102'
                  : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black ${
                  selectedId === m.id ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-700'
                }`}>
                  {m.letter}
                </span>
                <span className="text-base leading-tight">{m.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 font-bold text-lg">
        Teacher prompt: "Ask the class: if you cut out the rectangle with scissors and fold across the diagonal, why does the point stick out?"
      </div>
    </div>
  );
};
