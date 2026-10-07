import React from 'react';
import { X, Pencil, Hand, Minus, Circle, Undo, Trash2, Smartphone } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-6 select-none">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border-2 border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">Whiteboard &amp; Navigation Guide</h2>
            <p className="text-slate-500 font-semibold text-base">Interactive Whiteboard &amp; Touch Controls</p>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center active:scale-95"
            aria-label="Close Help"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6 py-6 text-slate-700 text-lg">
          {/* Draw vs Interact */}
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50 border border-amber-200">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
              <Pencil className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-xl">1. Draw Mode vs Interact Mode</h3>
              <p className="text-slate-600 text-base mt-1">
                Tap the big <strong>Draw / Interact</strong> button at top-left anytime.
                In <strong>Draw Mode</strong>, your finger or stylus handwrites smoothly across the entire stage.
                In <strong>Interact Mode</strong>, the whiteboard passes touches through so you can drag shapes, spin 3D solids, and trigger animations.
              </p>
            </div>
          </div>

          {/* Palm rejection */}
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-200">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0">
              <Smartphone className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-xl">2. Palm Rejection &amp; Inking</h3>
              <p className="text-slate-600 text-base mt-1">
                Stylus pen input is prioritized. Broad palm contacts and multi-touch gestures in Draw mode are automatically rejected to prevent accidental ink marks while leaning against the panel.
              </p>
            </div>
          </div>

          {/* Per-screen ink persistence */}
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Minus className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-xl">3. Screen-Specific Ink Storage</h3>
              <p className="text-slate-600 text-base mt-1">
                Every slide and practice question retains its own handwriting. You can step forward to explain the next concept and step back later — all student annotations remain intact!
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="h-14 px-8 rounded-2xl bg-slate-900 text-white font-bold text-lg hover:bg-slate-800 active:scale-95 shadow-md"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
