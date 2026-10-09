import React, { useState, useEffect } from 'react';
import { AlertTriangle, Layers, Play, Pause, RotateCcw } from 'lucide-react';

export const NonExamples83: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<'size' | 'angles' | 'shape'>('size');
  const [overlayProgress, setOverlayProgress] = useState<number>(0); // 0 (separated) to 1 (overlaid)
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Animation Loop for overlay transition
  useEffect(() => {
    let animId: number;
    if (isPlaying) {
      const duration = 1200;
      const startTime = performance.now() - overlayProgress * duration;

      const animate = (time: number) => {
        const elapsed = time - startTime;
        const p = Math.min(1, elapsed / duration);
        setOverlayProgress(p);
        if (p < 1) {
          animId = requestAnimationFrame(animate);
        } else {
          setIsPlaying(false);
        }
      };
      animId = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  const handleToggleOverlay = () => {
    if (overlayProgress >= 0.95) {
      setIsPlaying(false);
      setOverlayProgress(0);
    } else {
      setIsPlaying(true);
    }
  };

  const handleCaseChange = (c: 'size' | 'angles' | 'shape') => {
    setSelectedCase(c);
    setIsPlaying(false);
    setOverlayProgress(0);
  };

  const isFullyOverlaid = overlayProgress >= 0.95;
  const isPartiallyOverlaid = overlayProgress > 0.05;

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-6xl mx-auto p-6 select-none overflow-y-auto">
      {/* Header */}
      <div>
        <span className="text-sm font-black text-rose-600 uppercase tracking-widest flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4" /> Non-Examples · Unit 8.3
        </span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          When Shapes Are NOT Congruent
        </h2>
        <p className="text-2xl font-bold text-slate-700 leading-snug">
          If either the <span className="text-rose-600 font-extrabold">shape</span> OR the <span className="text-rose-600 font-extrabold">size</span> is different, the shapes are <span className="underline decoration-rose-500 font-extrabold text-slate-900">NOT congruent</span>!
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-12 gap-8 items-center my-auto">
        {/* SVG Display Stage */}
        <div className="col-span-12 md:col-span-7 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl flex flex-col items-center justify-between min-h-[460px] relative">
          {/* Top Subtitle Indicator */}
          <div className="w-full flex items-center justify-between mb-1">
            <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-rose-100 text-rose-800 font-mono">
              {selectedCase === 'size'
                ? 'Case 1: Same Shape, Different Size'
                : selectedCase === 'angles'
                ? 'Case 2: Same Sides, Different Angles'
                : 'Case 3: Different Arm Proportions'}
            </span>
            <span className="text-xs font-bold text-slate-500 font-mono">
              Fit Test: {Math.round(overlayProgress * 100)}%
            </span>
          </div>

          {/* SVG Canvas for Case 1 (Squares: Different Sizes) */}
          {selectedCase === 'size' && (
            <div className="w-full flex flex-col items-center my-auto">
              <svg viewBox="0 0 360 220" className="w-full h-56 overflow-visible">
                {/* Background Grid */}
                <defs>
                  <pattern id="grid-c1" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#f1f5f9" strokeWidth="1.5" />
                  </pattern>
                </defs>
                <rect x="10" y="10" width="340" height="200" fill="url(#grid-c1)" rx="12" />

                {/* Fixed Base: Square B (5 cm x 5 cm = 120 x 120 px) at x=195, y=50 */}
                <rect x="195" y="50" width="120" height="120" fill="#eff6ff" stroke="#2563eb" strokeWidth="3.5" rx="2" />

                {/* When overlaid: highlight uncovered margin on Square B */}
                {isPartiallyOverlaid && (
                  <g opacity={overlayProgress}>
                    {/* Right 2 cm margin */}
                    <rect x="267" y="50" width="48" height="120" fill="#fecdd3" opacity="0.65" />
                    {/* Top 2 cm margin */}
                    <rect x="195" y="50" width="72" height="48" fill="#fecdd3" opacity="0.65" />
                    {/* Dimension marks on uncovered border */}
                    <line x1="267" y1="180" x2="315" y2="180" stroke="#e11d48" strokeWidth="2" />
                    <line x1="267" y1="176" x2="267" y2="184" stroke="#e11d48" strokeWidth="2" />
                    <line x1="315" y1="176" x2="315" y2="184" stroke="#e11d48" strokeWidth="2" />
                    <text x="291" y="196" textAnchor="middle" className="text-[10px] font-black fill-rose-700 font-mono">
                      Gap: 2 cm
                    </text>
                  </g>
                )}

                {/* Corner 90° markers on Square B */}
                <rect x="195" y="50" width="10" height="10" fill="none" stroke="#2563eb" strokeWidth="1.5" />
                <rect x="305" y="50" width="10" height="10" fill="none" stroke="#2563eb" strokeWidth="1.5" />
                <rect x="195" y="160" width="10" height="10" fill="none" stroke="#2563eb" strokeWidth="1.5" />
                <rect x="305" y="160" width="10" height="10" fill="none" stroke="#2563eb" strokeWidth="1.5" />

                {/* Square B Dimensions */}
                {!isFullyOverlaid && (
                  <g>
                    <line x1="195" y1="38" x2="315" y2="38" stroke="#2563eb" strokeWidth="2" />
                    <line x1="195" y1="34" x2="195" y2="42" stroke="#2563eb" strokeWidth="2" />
                    <line x1="315" y1="34" x2="315" y2="42" stroke="#2563eb" strokeWidth="2" />
                    <text x="255" y="32" textAnchor="middle" className="text-xs font-black fill-blue-800 font-mono">5 cm</text>
                    <text x="255" y="115" textAnchor="middle" className="text-xs font-black fill-blue-900">Square B (5 cm)</text>
                  </g>
                )}

                {/* Moving Square A (3 cm x 3 cm = 72 x 72 px) */}
                {/* Starts at x=45, y=74; glides to x=195, y=98 (bottom-left alignment) */}
                {(() => {
                  const sqAX = 45 + overlayProgress * (195 - 45);
                  const sqAY = 74 + overlayProgress * (98 - 74);
                  return (
                    <g transform={`translate(${sqAX}, ${sqAY})`}>
                      <rect
                        x="0"
                        y="0"
                        width="72"
                        height="72"
                        fill="#ffedd5"
                        stroke="#ea580c"
                        strokeWidth="3.5"
                        opacity={isFullyOverlaid ? 0.9 : 1}
                        rx="2"
                      />
                      {/* Corner markers on Square A */}
                      <rect x="0" y="0" width="8" height="8" fill="none" stroke="#ea580c" strokeWidth="1.5" />
                      <rect x="64" y="0" width="8" height="8" fill="none" stroke="#ea580c" strokeWidth="1.5" />
                      <rect x="0" y="64" width="8" height="8" fill="none" stroke="#ea580c" strokeWidth="1.5" />
                      <rect x="64" y="64" width="8" height="8" fill="none" stroke="#ea580c" strokeWidth="1.5" />
                      <text x="36" y="40" textAnchor="middle" className="text-xs font-black fill-orange-900">
                        Square A
                      </text>
                      <text x="36" y="54" textAnchor="middle" className="text-[10px] font-bold fill-orange-700">
                        (3 cm)
                      </text>
                    </g>
                  );
                })()}

                {/* Dimension callouts for Square A when separated */}
                {!isPartiallyOverlaid && (
                  <g>
                    <line x1="45" y1="62" x2="117" y2="62" stroke="#ea580c" strokeWidth="2" />
                    <line x1="45" y1="58" x2="45" y2="66" stroke="#ea580c" strokeWidth="2" />
                    <line x1="117" y1="58" x2="117" y2="66" stroke="#ea580c" strokeWidth="2" />
                    <text x="81" y="56" textAnchor="middle" className="text-xs font-black fill-orange-800 font-mono">3 cm</text>
                  </g>
                )}

                {/* Mismatch Alert Box when fully overlaid */}
                {isFullyOverlaid && (
                  <g>
                    <rect x="25" y="45" width="125" height="52" fill="#fff1f2" stroke="#f43f5e" rx="10" />
                    <text x="87" y="66" textAnchor="middle" className="text-[11px] font-black fill-rose-800">
                      DOES NOT FIT!
                    </text>
                    <text x="87" y="82" textAnchor="middle" className="text-[9px] font-bold fill-rose-600 font-mono">
                      Square A leaves 2 cm gap
                    </text>
                  </g>
                )}
              </svg>

              {/* Status Banner */}
              <div className="w-full mt-2 p-3 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-950 font-bold text-xs flex flex-col gap-1 text-center">
                <span className="text-sm font-black text-rose-900">
                  {isFullyOverlaid
                    ? '✗ Fit Test Failed: Square A leaves a 2 cm margin uncovered!'
                    : 'Same Shape (Squares, 90° angles), but DIFFERENT SIZES (3 cm vs 5 cm)'}
                </span>
                <span className="text-slate-700">
                  Mathematically <strong className="text-purple-700 font-extrabold underline">SIMILAR</strong> (enlargement), but strictly <strong className="text-rose-700 font-extrabold">NOT CONGRUENT</strong>.
                </span>
              </div>
            </div>
          )}

          {/* SVG Canvas for Case 2 (Angles: Rectangle vs Parallelogram) */}
          {selectedCase === 'angles' && (
            <div className="w-full flex flex-col items-center my-auto">
              <svg viewBox="0 0 360 220" className="w-full h-56 overflow-visible">
                {/* Background Grid */}
                <defs>
                  <pattern id="grid-c2" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="1.5" />
                  </pattern>
                </defs>
                <rect x="10" y="10" width="340" height="200" fill="url(#grid-c2)" rx="12" />

                {/* Fixed Target on Right: Parallelogram (Base: 120 px, Slant: 60 px) at base x=190, y=145 */}
                {/* Vertices: (190,145), (310,145), (345,85), (225,85) */}
                <polygon
                  points="190,145 310,145 345,85 225,85"
                  fill="#fef3c7"
                  stroke="#d97706"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />

                {/* Angle arcs on Parallelogram */}
                <path d="M 215 145 A 25 25 0 0 1 202 123" fill="none" stroke="#b45309" strokeWidth="2.5" />
                <text x="222" y="138" className="text-[10px] font-black fill-amber-900 font-mono">60°</text>

                {!isFullyOverlaid && (
                  <g>
                    <text x="265" y="115" textAnchor="middle" className="text-xs font-black fill-amber-900">Parallelogram</text>
                    <text x="265" y="172" textAnchor="middle" className="text-xs font-black fill-amber-800 font-mono">Base: 6 cm · Sides: 3.5 cm</text>
                  </g>
                )}

                {/* Moving Shape: Rectangle (width: 120, height: 60) */}
                {/* Starts at x=35, y=85; glides horizontally to x=190, y=85 to align bottom base with Parallelogram */}
                {(() => {
                  const rectX = 35 + overlayProgress * (190 - 35);
                  return (
                    <g transform={`translate(${rectX}, 85)`}>
                      <rect
                        x="0"
                        y="0"
                        width="120"
                        height="60"
                        fill="#dbeafe"
                        stroke="#2563eb"
                        strokeWidth="3.5"
                        opacity={isFullyOverlaid ? 0.75 : 1}
                        rx="2"
                      />
                      {/* Four 90° right angle markers */}
                      <rect x="0" y="0" width="8" height="8" fill="none" stroke="#2563eb" strokeWidth="1.5" />
                      <rect x="112" y="0" width="8" height="8" fill="none" stroke="#2563eb" strokeWidth="1.5" />
                      <rect x="0" y="52" width="8" height="8" fill="none" stroke="#2563eb" strokeWidth="1.5" />
                      <rect x="112" y="52" width="8" height="8" fill="none" stroke="#2563eb" strokeWidth="1.5" />

                      <text x="60" y="35" textAnchor="middle" className="text-xs font-black fill-blue-900">
                        Rectangle
                      </text>
                    </g>
                  );
                })()}

                {/* When fully overlaid: highlight angular clash */}
                {isFullyOverlaid && (
                  <g>
                    {/* Left gap on Rectangle where Parallelogram slants right: triangle (190,145 to 225,85 to 190,85) */}
                    <polygon points="190,145 225,85 190,85" fill="#fecdd3" opacity="0.8" />
                    <text x="194" y="105" className="text-[9px] font-black fill-rose-800 font-mono">Gap!</text>

                    {/* Right overhang where Parallelogram sticks out: triangle (310,145 to 345,85 to 310,85) */}
                    <polygon points="310,145 345,85 310,85" fill="#fecdd3" opacity="0.8" />
                    <text x="318" y="105" className="text-[9px] font-black fill-rose-800 font-mono">Pokes Out!</text>

                    {/* Mismatch Alert Box */}
                    <rect x="25" y="45" width="130" height="52" fill="#fff1f2" stroke="#f43f5e" rx="10" />
                    <text x="90" y="66" textAnchor="middle" className="text-[11px] font-black fill-rose-800">
                      ANGLES CLASH!
                    </text>
                    <text x="90" y="82" textAnchor="middle" className="text-[9px] font-bold fill-rose-600 font-mono">
                      90° ≠ 60° (Corners Slant)
                    </text>
                  </g>
                )}
              </svg>

              {/* Status Banner */}
              <div className="w-full mt-2 p-3 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-950 font-bold text-xs flex flex-col gap-1 text-center">
                <span className="text-sm font-black text-rose-900">
                  {isFullyOverlaid
                    ? '✗ Fit Test Failed: Slanted sides poke out and leave uncovered gaps!'
                    : 'Same Side Lengths (6 cm & 3.5 cm), but DIFFERENT ANGLES (90° vs 60°)'}
                </span>
                <span className="text-slate-700">
                  Equal sides alone are not enough! Interior angles must also match → <strong className="text-rose-700 font-extrabold">NOT CONGRUENT</strong>.
                </span>
              </div>
            </div>
          )}

          {/* SVG Canvas for Case 3 (Proportions: Different Arm Lengths) */}
          {selectedCase === 'shape' && (
            <div className="w-full flex flex-col items-center my-auto">
              <svg viewBox="0 0 360 220" className="w-full h-56 overflow-visible">
                {/* Background Grid */}
                <defs>
                  <pattern id="grid-c3" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="1.5" />
                  </pattern>
                </defs>
                <rect x="10" y="10" width="340" height="200" fill="url(#grid-c3)" rx="12" />

                {/* Fixed Target Shape B on Right at x=180, y=55 */}
                {/* Shape B dimensions: Top Arm = 110 px (11 cm), Height = 90 px (9 cm), Stem = 30 px */}
                {/* Vertices: (180,55) -> (290,55) -> (290,85) -> (210,85) -> (210,145) -> (180,145) */}
                <polygon
                  points="180,55 290,55 290,85 210,85 210,145 180,145"
                  fill="#fee2e2"
                  stroke="#dc2626"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />

                {/* Dimensions on Shape B when separated */}
                {!isFullyOverlaid && (
                  <g>
                    {/* Top Arm Dimension: 11 cm */}
                    <line x1="180" y1="43" x2="290" y2="43" stroke="#dc2626" strokeWidth="2" />
                    <line x1="180" y1="39" x2="180" y2="47" stroke="#dc2626" strokeWidth="2" />
                    <line x1="290" y1="39" x2="290" y2="47" stroke="#dc2626" strokeWidth="2" />
                    <text x="235" y="37" textAnchor="middle" className="text-xs font-black fill-red-800 font-mono">
                      Arm: 11 cm
                    </text>
                    <text x="245" y="115" textAnchor="middle" className="text-xs font-black fill-red-900">Shape B</text>
                    <text x="245" y="130" textAnchor="middle" className="text-[10px] font-bold fill-red-700">Longer Arm (11 cm)</text>
                  </g>
                )}

                {/* Moving Shape A (Starts at x=40, glides smoothly to x=180 to align with Shape B) */}
                {/* Shape A dimensions: Top Arm = 70 px (7 cm), Height = 90 px, Stem = 30 px */}
                {(() => {
                  const currX = 40 + overlayProgress * (180 - 40);
                  const p1 = `${currX},55`;
                  const p2 = `${currX + 70},55`;
                  const p3 = `${currX + 70},85`;
                  const p4 = `${currX + 30},85`;
                  const p5 = `${currX + 30},145`;
                  const p6 = `${currX},145`;
                  return (
                    <g>
                      <polygon
                        points={`${p1} ${p2} ${p3} ${p4} ${p5} ${p6}`}
                        fill="#dbeafe"
                        stroke="#2563eb"
                        strokeWidth="3.5"
                        opacity={isFullyOverlaid ? 0.85 : 1}
                        strokeLinejoin="round"
                      />
                      <text x={currX + 15} y="115" textAnchor="middle" className="text-xs font-black fill-blue-900">
                        Shape A
                      </text>
                      {!isFullyOverlaid && (
                        <text x={currX + 35} y="74" textAnchor="middle" className="text-[10px] font-black fill-blue-800">
                          7 cm
                        </text>
                      )}
                    </g>
                  );
                })()}

                {/* Dimension on Shape A when separated */}
                {!isPartiallyOverlaid && (
                  <g>
                    <line x1="40" y1="43" x2="110" y2="43" stroke="#2563eb" strokeWidth="2" />
                    <line x1="40" y1="39" x2="40" y2="47" stroke="#2563eb" strokeWidth="2" />
                    <line x1="110" y1="39" x2="110" y2="47" stroke="#2563eb" strokeWidth="2" />
                    <text x="75" y="37" textAnchor="middle" className="text-xs font-black fill-blue-800 font-mono">
                      Arm: 7 cm
                    </text>
                    <text x="55" y="170" textAnchor="middle" className="text-[10px] font-bold fill-blue-700">Height: 9 cm</text>
                  </g>
                )}

                {/* When fully overlaid: highlight the 4 cm overhang of Shape B */}
                {isFullyOverlaid && (
                  <g>
                    {/* Extra overhang of Shape B: from x=250 to 290, width=40 px = 4 cm */}
                    <rect x="250" y="55" width="40" height="30" fill="#fecdd3" stroke="#e11d48" strokeWidth="2.5" strokeDasharray="3 3" />
                    <text x="270" y="74" textAnchor="middle" className="text-[10px] font-black fill-rose-800 font-mono">
                      +4 cm
                    </text>

                    {/* Overhang measurement arrow */}
                    <line x1="250" y1="43" x2="290" y2="43" stroke="#e11d48" strokeWidth="2" />
                    <line x1="250" y1="39" x2="250" y2="47" stroke="#e11d48" strokeWidth="2" />
                    <line x1="290" y1="39" x2="290" y2="47" stroke="#e11d48" strokeWidth="2" />
                    <text x="270" y="37" textAnchor="middle" className="text-xs font-black fill-rose-700 font-mono">
                      4 cm Overhang!
                    </text>

                    {/* Mismatch Alert Box on left */}
                    <rect x="25" y="45" width="135" height="52" fill="#fff1f2" stroke="#f43f5e" rx="10" />
                    <text x="92" y="66" textAnchor="middle" className="text-[11px] font-black fill-rose-800">
                      DOES NOT OVERLAP!
                    </text>
                    <text x="92" y="82" textAnchor="middle" className="text-[9px] font-bold fill-rose-600 font-mono">
                      Arm 11 cm ≠ 7 cm
                    </text>
                  </g>
                )}
              </svg>

              {/* Status Banner */}
              <div className="w-full mt-2 p-3 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-950 font-bold text-xs flex flex-col gap-1 text-center">
                <span className="text-sm font-black text-rose-900">
                  {isFullyOverlaid
                    ? '✗ Fit Test Failed: Shape B has an extra 4 cm arm overhang!'
                    : 'Same Height & Stem, but DIFFERENT PROPORTIONS (Arm 7 cm vs 11 cm)'}
                </span>
                <span className="text-slate-700">
                  Different proportions make them different shapes → strictly <strong className="text-rose-700 font-extrabold">NOT CONGRUENT</strong>.
                </span>
              </div>
            </div>
          )}

          {/* Interactive Scrub Slider & Fit Test Controls */}
          <div className="w-full mt-2 p-3 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={handleToggleOverlay}
                className={`px-4 py-2 rounded-xl text-white font-black text-xs flex items-center gap-1.5 active:scale-95 transition-all shadow-sm ${
                  isFullyOverlaid
                    ? 'bg-slate-700 hover:bg-slate-800'
                    : isPlaying
                    ? 'bg-amber-600 hover:bg-amber-700'
                    : 'bg-rose-600 hover:bg-rose-700'
                }`}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : isFullyOverlaid ? (
                  <RotateCcw className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4 fill-current" />
                )}
                <span>{isFullyOverlaid ? 'Separate Shapes' : isPlaying ? 'Pause' : 'Overlay Shapes (Test Fit)'}</span>
              </button>

              <div className="flex-1 flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-500">Overlay:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={Math.round(overlayProgress * 100)}
                  onChange={(e) => {
                    setIsPlaying(false);
                    setOverlayProgress(parseFloat(e.target.value) / 100);
                  }}
                  className="flex-1 accent-rose-600 cursor-pointer"
                />
              </div>

              <button
                onClick={() => {
                  setIsPlaying(false);
                  setOverlayProgress(0);
                }}
                className="px-3 py-2 rounded-xl bg-white text-slate-700 border border-slate-300 font-bold text-xs hover:bg-slate-100 active:scale-95 flex items-center gap-1"
                title="Reset view"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Case Selector & Step-by-Step Instructions */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-3">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            Non-Congruent Counterexamples:
          </span>

          {/* Case 1 Button */}
          <button
            onClick={() => handleCaseChange('size')}
            className={`p-3.5 rounded-2xl text-left border-2 font-black transition-all ${
              selectedCase === 'size'
                ? 'bg-rose-600 text-white border-rose-700 shadow-xl scale-101'
                : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-base">Case 1: Same Shape, Different Size</span>
              <span className={`text-[10px] uppercase px-2 py-0.5 rounded ${selectedCase === 'size' ? 'bg-rose-800 text-rose-100' : 'bg-slate-100 text-slate-700'}`}>
                Scale Error
              </span>
            </div>
            <p className={`text-xs mt-1 ${selectedCase === 'size' ? 'text-rose-100' : 'text-slate-500'}`}>
              3 cm square vs 5 cm square. They are similar, NOT congruent.
            </p>
          </button>

          {/* Case 2 Button */}
          <button
            onClick={() => handleCaseChange('angles')}
            className={`p-3.5 rounded-2xl text-left border-2 font-black transition-all ${
              selectedCase === 'angles'
                ? 'bg-rose-600 text-white border-rose-700 shadow-xl scale-101'
                : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-base">Case 2: Same Sides, Different Angles</span>
              <span className={`text-[10px] uppercase px-2 py-0.5 rounded ${selectedCase === 'angles' ? 'bg-rose-800 text-rose-100' : 'bg-slate-100 text-slate-700'}`}>
                Angle Error
              </span>
            </div>
            <p className={`text-xs mt-1 ${selectedCase === 'angles' ? 'text-rose-100' : 'text-slate-500'}`}>
              Rectangle vs Parallelogram with sides 6 cm &amp; 3.5 cm.
            </p>
          </button>

          {/* Case 3 Button */}
          <button
            onClick={() => handleCaseChange('shape')}
            className={`p-3.5 rounded-2xl text-left border-2 font-black transition-all ${
              selectedCase === 'shape'
                ? 'bg-rose-600 text-white border-rose-700 shadow-xl scale-101'
                : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-base">Case 3: Slightly Different Shape</span>
              <span className={`text-[10px] uppercase px-2 py-0.5 rounded ${selectedCase === 'shape' ? 'bg-rose-800 text-rose-100' : 'bg-slate-100 text-slate-700'}`}>
                Shape Error
              </span>
            </div>
            <p className={`text-xs mt-1 ${selectedCase === 'shape' ? 'text-rose-100' : 'text-slate-500'}`}>
              Two L-shapes where one arm length is different (7 cm vs 11 cm).
            </p>
          </button>

          {/* Detailed Instructional Card for the Active Case */}
          <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs">
            <span className="font-black uppercase tracking-wider text-slate-700 block mb-1.5">
              Instruction for {selectedCase === 'size' ? 'Case 1' : selectedCase === 'angles' ? 'Case 2' : 'Case 3'}:
            </span>
            {selectedCase === 'size' && (
              <div className="space-y-1.5 text-slate-700 font-bold leading-relaxed">
                <p>
                  <strong>1. Compare Angles:</strong> Both figures are squares with all four interior angles equal to 90°. (They have the exact same shape!)
                </p>
                <p>
                  <strong>2. Compare Side Lengths:</strong> Square A has sides of 3 cm. Square B has sides of 5 cm. Because 3 cm ≠ 5 cm, their sizes are <em>different</em>!
                </p>
                <p>
                  <strong>3. Test Overlay:</strong> Click <strong>"Overlay Shapes"</strong> or drag the slider to place Square A on Square B. Notice the uncovered 2 cm border gap — Square A is too small to cover Square B!
                </p>
                <p className="p-2 bg-rose-100 text-rose-900 rounded-xl font-black mt-2">
                  Cambridge Rule: Same shape + different size = <strong>SIMILAR</strong>, NOT CONGRUENT! Congruent shapes must be identical in BOTH shape AND size.
                </p>
              </div>
            )}
            {selectedCase === 'angles' && (
              <div className="space-y-1.5 text-slate-700 font-bold leading-relaxed">
                <p>
                  <strong>1. Compare Side Lengths:</strong> Both shapes have side lengths of 6 cm and 3.5 cm.
                </p>
                <p>
                  <strong>2. Compare Angles:</strong> The rectangle has 90° angles. The parallelogram has 60° and 120° angles.
                </p>
                <p>
                  <strong>3. Test Overlay:</strong> Click <strong>"Overlay Shapes"</strong> to slide the rectangle onto the parallelogram. The slanted 60° corners poke out and leave uncovered gaps on the rectangle!
                </p>
                <p className="p-2 bg-rose-100 text-rose-900 rounded-xl font-black mt-2">
                  Equal sides alone are not enough! Because interior angles differ (90° ≠ 60°), they are <strong>NOT CONGRUENT</strong>.
                </p>
              </div>
            )}
            {selectedCase === 'shape' && (
              <div className="space-y-1.5 text-slate-700 font-bold leading-relaxed">
                <p>
                  <strong>1. Compare Dimensions:</strong> Shape A has a 7 cm top arm. Shape B has an 11 cm top arm. Both have height 9 cm.
                </p>
                <p>
                  <strong>2. Compare Proportions:</strong> Even though both are L-shapes, their arm lengths differ (7 cm ≠ 11 cm).
                </p>
                <p>
                  <strong>3. Test Overlay:</strong> Click <strong>"Overlay Shapes"</strong> or drag the slider. Watch Shape A glide across to Shape B: Shape B&apos;s arm extends 4 cm beyond Shape A!
                </p>
                <p className="p-2 bg-rose-100 text-rose-900 rounded-xl font-black mt-2">
                  Different proportions make them completely different shapes → <strong>NOT CONGRUENT</strong>.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Rule */}
      <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-orange-950 font-bold text-base flex items-center justify-between">
        <span>
          <strong>Key Cambridge Definition:</strong> &quot;Congruent&quot; means EXACTLY the same shape AND EXACTLY the same size. If either fails, the shapes are not congruent.
        </span>
      </div>
    </div>
  );
};
