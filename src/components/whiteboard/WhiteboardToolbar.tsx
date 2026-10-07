import React, { useState, useEffect } from 'react';
import {
  Pencil,
  Hand,
  Highlighter,
  Eraser,
  Undo2,
  Redo2,
  Trash2,
  Minus,
  Circle,
  Square,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Move,
  Layers,
  X,
  Check
} from 'lucide-react';
import { WhiteboardTool } from '../../types';

interface WhiteboardToolbarProps {
  isDrawMode: boolean;
  onToggleDrawMode: () => void;
  activeTool: WhiteboardTool;
  onChangeTool: (tool: WhiteboardTool) => void;
  activeColor: string;
  onChangeColor: (color: string) => void;
  activeSize: number;
  onChangeSize: (size: number) => void;
  isDashed: boolean;
  onToggleDashed: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const COLORS = [
  { name: 'Navy', hex: '#0f172a', bg: 'bg-[#0f172a]' },
  { name: 'Blue', hex: '#2563eb', bg: 'bg-[#2563eb]' },
  { name: 'Red', hex: '#dc2626', bg: 'bg-[#dc2626]' },
  { name: 'Green', hex: '#16a34a', bg: 'bg-[#16a34a]' },
  { name: 'Orange', hex: '#ea580c', bg: 'bg-[#ea580c]' },
  { name: 'Purple', hex: '#9333ea', bg: 'bg-[#9333ea]' }
];

const SIZES = [
  { label: 'Fine', value: 3 },
  { label: 'Medium', value: 6 },
  { label: 'Thick', value: 12 }
];

export const WhiteboardToolbar: React.FC<WhiteboardToolbarProps> = ({
  isDrawMode,
  onToggleDrawMode,
  activeTool,
  onChangeTool,
  activeColor,
  onChangeColor,
  activeSize,
  onChangeSize,
  isDashed,
  onToggleDashed,
  onUndo,
  onRedo,
  onClear,
  canUndo,
  canRedo
}) => {
  const [dockPosition, setDockPosition] = useState<'left' | 'right' | 'bottom'>('left');
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [showClearConfirm, setShowClearConfirm] = useState<boolean>(false);

  // Restore saved dock position
  useEffect(() => {
    try {
      const saved = localStorage.getItem('teacher_board_toolbar_pos');
      if (saved === 'left' || saved === 'right' || saved === 'bottom') {
        setDockPosition(saved);
      }
    } catch {}
  }, []);

  const handleSetDock = (pos: 'left' | 'right' | 'bottom') => {
    setDockPosition(pos);
    try {
      localStorage.setItem('teacher_board_toolbar_pos', pos);
    } catch {}
  };

  // Position classes
  const getContainerStyle = () => {
    if (dockPosition === 'left') {
      return 'left-4 top-24 flex-col';
    } else if (dockPosition === 'right') {
      return 'right-4 top-24 flex-col';
    } else {
      return 'bottom-20 left-1/2 -translate-x-1/2 flex-row';
    }
  };

  return (
    <>
      {/* Master Mode Switch: Always visible floating prominent button */}
      <div
        className={`fixed z-50 transition-all ${
          dockPosition === 'left'
            ? 'left-4 top-4'
            : dockPosition === 'right'
            ? 'right-4 top-4'
            : 'left-6 top-4'
        }`}
      >
        <button
          onClick={onToggleDrawMode}
          className={`h-16 px-6 rounded-2xl flex items-center gap-3 font-bold text-xl shadow-xl border-2 transition-transform active:scale-95 ${
            isDrawMode
              ? 'bg-amber-400 text-slate-950 border-amber-500 ring-4 ring-amber-300/50 scale-105'
              : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
          }`}
          title={isDrawMode ? 'Draw Mode Active: Handwrite on screen' : 'Interact Mode Active: Tap and drag content'}
          aria-label={isDrawMode ? 'Switch to Interact Mode' : 'Switch to Draw Mode'}
        >
          {isDrawMode ? (
            <>
              <Pencil className="w-8 h-8 text-slate-950 stroke-[2.5]" />
              <div className="flex flex-col text-left">
                <span className="text-lg leading-tight font-extrabold uppercase tracking-wide">DRAW MODE</span>
                <span className="text-xs font-semibold text-slate-700">Writing on canvas</span>
              </div>
            </>
          ) : (
            <>
              <Hand className="w-8 h-8 text-blue-600 stroke-[2.5]" />
              <div className="flex flex-col text-left">
                <span className="text-lg leading-tight font-extrabold uppercase tracking-wide text-blue-900">INTERACT</span>
                <span className="text-xs font-semibold text-slate-500">Tap content underneath</span>
              </div>
            </>
          )}
        </button>
      </div>

      {/* Drawing Toolbar Panel */}
      <aside
        className={`fixed z-40 flex items-center bg-white/95 backdrop-blur-md p-2.5 rounded-3xl shadow-2xl border-2 border-slate-200 transition-all select-none ${getContainerStyle()} ${
          !isDrawMode && isCollapsed ? 'opacity-40 hover:opacity-100' : 'opacity-100'
        }`}
        style={{ touchAction: 'none' }}
        aria-label="Whiteboard drawing toolbar"
      >
        {/* Collapse toggle */}
        <div className="flex items-center justify-between w-full pb-1 mb-1 border-b border-slate-200">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-12 h-10 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 active:scale-95"
            title={isCollapsed ? 'Expand whiteboard tools' : 'Minimize whiteboard tools'}
          >
            {dockPosition === 'left' ? (
              isCollapsed ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />
            ) : dockPosition === 'right' ? (
              isCollapsed ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />
            ) : (
              <Layers className="w-5 h-5" />
            )}
          </button>

          {!isCollapsed && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleSetDock(dockPosition === 'left' ? 'right' : 'left')}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 text-xs font-bold"
                title={`Dock to ${dockPosition === 'left' ? 'Right' : 'Left'}`}
              >
                ⇄
              </button>
            </div>
          )}
        </div>

        {!isCollapsed && (
          <div className={`flex gap-3 ${dockPosition === 'bottom' ? 'flex-row items-center' : 'flex-col'}`}>
            {/* Primary Tool Buttons */}
            <div className="flex gap-2">
              {/* Pen */}
              <button
                onClick={() => {
                  onChangeTool('pen');
                  if (!isDrawMode) onToggleDrawMode();
                }}
                className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center transition-all ${
                  activeTool === 'pen'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                title="Pen (Freehand writing)"
              >
                <Pencil className="w-6 h-6" />
                <span className="text-[11px] font-bold mt-0.5">Pen</span>
              </button>

              {/* Highlighter */}
              <button
                onClick={() => {
                  onChangeTool('highlighter');
                  if (!isDrawMode) onToggleDrawMode();
                }}
                className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center transition-all ${
                  activeTool === 'highlighter'
                    ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30 scale-105'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                title="Highlighter (Semi-transparent)"
              >
                <Highlighter className="w-6 h-6" />
                <span className="text-[11px] font-bold mt-0.5">Highlight</span>
              </button>

              {/* Stroke Eraser */}
              <button
                onClick={() => {
                  onChangeTool('eraser');
                  if (!isDrawMode) onToggleDrawMode();
                }}
                className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center transition-all ${
                  activeTool === 'eraser'
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/30 scale-105'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                title="Stroke Eraser (Tap or drag over ink)"
              >
                <Eraser className="w-6 h-6" />
                <span className="text-[11px] font-bold mt-0.5">Eraser</span>
              </button>
            </div>

            {/* Shape Helpers */}
            <div className="flex gap-2 pt-1 border-t border-slate-200">
              <button
                onClick={() => {
                  onChangeTool('line');
                  if (!isDrawMode) onToggleDrawMode();
                }}
                className={`w-16 h-14 rounded-2xl flex flex-col items-center justify-center transition-all ${
                  activeTool === 'line'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                title="Straight Line (Snaps to horizontal/vertical)"
              >
                <Minus className="w-5 h-5 stroke-[3]" />
                <span className="text-[10px] font-bold">Line</span>
              </button>

              <button
                onClick={() => {
                  onChangeTool('circle');
                  if (!isDrawMode) onToggleDrawMode();
                }}
                className={`w-16 h-14 rounded-2xl flex flex-col items-center justify-center transition-all ${
                  activeTool === 'circle'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                title="Circle (Drag outward from centre)"
              >
                <Circle className="w-5 h-5 stroke-[2.5]" />
                <span className="text-[10px] font-bold">Circle</span>
              </button>

              <button
                onClick={() => {
                  onChangeTool('rectangle');
                  if (!isDrawMode) onToggleDrawMode();
                }}
                className={`w-16 h-14 rounded-2xl flex flex-col items-center justify-center transition-all ${
                  activeTool === 'rectangle'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                title="Rectangle"
              >
                <Square className="w-5 h-5 stroke-[2.5]" />
                <span className="text-[10px] font-bold">Box</span>
              </button>
            </div>

            {/* Dashed Line Toggle (Essential for mirror lines!) */}
            <div className="pt-1 border-t border-slate-200">
              <button
                onClick={onToggleDashed}
                className={`w-full h-12 rounded-xl flex items-center justify-center gap-2 font-bold text-xs transition-all ${
                  isDashed
                    ? 'bg-fuchsia-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                title="Toggle Dashed Line (Ideal for drawing mirror lines)"
              >
                <span className="tracking-widest font-mono font-black text-sm">-- --</span>
                <span>{isDashed ? 'Dashed Line ON' : 'Solid Line'}</span>
              </button>
            </div>

            {/* Color Palette (6 distinct colors) */}
            <div className="pt-2 border-t border-slate-200">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 px-1">
                Colours
              </div>
              <div className="grid grid-cols-3 gap-2">
                {COLORS.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => onChangeColor(c.hex)}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                      c.bg
                    } ${
                      activeColor === c.hex
                        ? 'ring-4 ring-offset-2 ring-blue-500 scale-105 shadow-md'
                        : 'hover:scale-95'
                    }`}
                    title={c.name}
                    aria-label={`Select color ${c.name}`}
                  >
                    {activeColor === c.hex && (
                      <Check className="w-6 h-6 text-white stroke-[3] drop-shadow" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Stroke Thickness (3 sizes) */}
            <div className="pt-2 border-t border-slate-200">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 px-1">
                Size
              </div>
              <div className="grid grid-cols-3 gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => onChangeSize(s.value)}
                    className={`h-12 rounded-xl flex items-center justify-center font-bold text-xs transition-all ${
                      activeSize === s.value
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                    title={`${s.label} line thickness`}
                  >
                    <div
                      className="rounded-full bg-current"
                      style={{ width: `${s.value * 2}px`, height: `${s.value * 2}px` }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Undo / Redo / Clear */}
            <div className="pt-2 border-t border-slate-200 flex gap-2">
              <button
                onClick={onUndo}
                disabled={!canUndo}
                className={`w-16 h-14 rounded-2xl flex flex-col items-center justify-center transition-all ${
                  canUndo
                    ? 'bg-slate-100 text-slate-800 hover:bg-slate-200 active:scale-95'
                    : 'bg-slate-50 text-slate-300 cursor-not-allowed'
                }`}
                title="Undo last stroke"
              >
                <Undo2 className="w-5 h-5" />
                <span className="text-[10px] font-bold">Undo</span>
              </button>

              <button
                onClick={onRedo}
                disabled={!canRedo}
                className={`w-16 h-14 rounded-2xl flex flex-col items-center justify-center transition-all ${
                  canRedo
                    ? 'bg-slate-100 text-slate-800 hover:bg-slate-200 active:scale-95'
                    : 'bg-slate-50 text-slate-300 cursor-not-allowed'
                }`}
                title="Redo stroke"
              >
                <Redo2 className="w-5 h-5" />
                <span className="text-[10px] font-bold">Redo</span>
              </button>

              <button
                onClick={() => setShowClearConfirm(true)}
                className="w-16 h-14 rounded-2xl flex flex-col items-center justify-center bg-rose-50 text-rose-700 hover:bg-rose-100 active:scale-95"
                title="Clear current screen ink"
              >
                <Trash2 className="w-5 h-5" />
                <span className="text-[10px] font-bold">Clear</span>
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Big Clear Screen Confirmation Dialog */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border-2 border-slate-200 text-center animate-in fade-in zoom-in-95 duration-150">
            <div className="w-20 h-20 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Clear Screen Ink?</h2>
            <p className="text-slate-600 text-lg mb-8">
              This will remove all drawings and annotations on this screen. (You can still Undo if tapped by mistake).
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="h-16 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xl hover:bg-slate-200 active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onClear();
                  setShowClearConfirm(false);
                }}
                className="h-16 rounded-2xl bg-rose-600 text-white font-bold text-xl hover:bg-rose-700 shadow-lg shadow-rose-600/30 active:scale-95"
              >
                Yes, Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
