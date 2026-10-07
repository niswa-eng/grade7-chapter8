import React, { useState } from 'react';
import { Maximize, Minimize, HelpCircle, Sparkles, ChevronDown } from 'lucide-react';
import { SubtopicId, SubtopicInfo } from '../../types';

interface TopBarProps {
  subtopics: SubtopicInfo[];
  currentSubtopic: SubtopicInfo;
  onSelectSubtopic: (id: SubtopicId) => void;
  currentStepTitle: string;
  isReducedMotion: boolean;
  onToggleReducedMotion: () => void;
  onOpenHelp: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  subtopics,
  currentSubtopic,
  onSelectSubtopic,
  currentStepTitle,
  isReducedMotion,
  onToggleReducedMotion,
  onOpenHelp
}) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      // In iframes, fullscreen might be restricted
    }
  };

  const getSubtopicBadgeColor = (id: SubtopicId) => {
    switch (id) {
      case '8.1': return 'bg-blue-600 text-white';
      case '8.2': return 'bg-emerald-600 text-white';
      case '8.3': return 'bg-orange-600 text-white';
      case '8.4': return 'bg-purple-600 text-white';
    }
  };

  return (
    <header className="h-20 bg-white/95 backdrop-blur-md border-b-2 border-slate-200 px-6 flex items-center justify-between z-20 shrink-0 select-none">
      {/* Brand & Subtopic Selector */}
      <div className="flex items-center gap-5">
        <div className="hidden lg:flex flex-col">
          <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Shapes &amp; Symmetry
          </span>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Cambridge Stage 7 · Unit 8
          </span>
        </div>

        {/* Large Dropdown Selector */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="h-14 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 flex items-center gap-3 font-bold text-slate-900 text-lg transition-all active:scale-98"
            aria-label="Select Unit 8 Subtopic"
          >
            <span className={`px-2.5 py-1 rounded-lg text-sm font-black ${getSubtopicBadgeColor(currentSubtopic.id)}`}>
              Unit {currentSubtopic.code}
            </span>
            <span className="max-w-[280px] xl:max-w-[380px] truncate">
              {currentSubtopic.title}
            </span>
            <ChevronDown className={`w-5 h-5 text-slate-600 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute left-0 top-16 w-96 bg-white rounded-3xl shadow-2xl border-2 border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 py-2">
                Unit 8 Subtopics (Cambridge Stage 7)
              </div>
              {subtopics.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    onSelectSubtopic(sub.id);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl flex items-center gap-3 transition-colors ${
                    currentSubtopic.id === sub.id
                      ? 'bg-blue-50/80 text-blue-900 font-extrabold'
                      : 'text-slate-700 hover:bg-slate-100 font-semibold'
                  }`}
                >
                  <span className={`px-2.5 py-1 rounded-lg text-sm font-black ${getSubtopicBadgeColor(sub.id)}`}>
                    {sub.code}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-base leading-snug">{sub.title}</span>
                    <span className="text-xs text-slate-500 font-medium">Objective {sub.cambridgeCode}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Current Step Title Display */}
        <div className="hidden md:flex items-center gap-2 pl-4 border-l-2 border-slate-200">
          <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Step:</span>
          <span className="text-base lg:text-lg font-bold text-slate-800 max-w-sm lg:max-w-md truncate">
            {currentStepTitle}
          </span>
        </div>
      </div>

      {/* Right Controls: Motion, Help, Fullscreen */}
      <div className="flex items-center gap-3">
        {/* Reduced Motion Toggle */}
        <button
          onClick={onToggleReducedMotion}
          className={`h-14 px-4 rounded-2xl flex items-center gap-2 font-bold text-sm border-2 transition-all active:scale-95 ${
            isReducedMotion
              ? 'bg-amber-100 text-amber-900 border-amber-300'
              : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
          }`}
          title={isReducedMotion ? 'Motion: Reduced (Fast)' : 'Motion: Smooth Animations'}
        >
          <Sparkles className="w-5 h-5 text-amber-600" />
          <span className="hidden sm:inline">{isReducedMotion ? 'Reduced Motion' : 'Anim: Smooth'}</span>
        </button>

        {/* Help Panel Toggle */}
        <button
          onClick={onOpenHelp}
          className="h-14 w-14 rounded-2xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-200 flex items-center justify-center text-slate-700 transition-all active:scale-95"
          title="Teacher Board Guide"
          aria-label="Help Guide"
        >
          <HelpCircle className="w-6 h-6" />
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          className="h-14 px-5 rounded-2xl bg-slate-900 text-white font-bold text-base flex items-center gap-2 hover:bg-slate-800 shadow-md transition-all active:scale-95"
          title="Toggle Fullscreen for IFP / Projector"
          aria-label="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
          <span className="hidden sm:inline">{isFullscreen ? 'Exit Full' : 'Fullscreen'}</span>
        </button>
      </div>
    </header>
  );
};
