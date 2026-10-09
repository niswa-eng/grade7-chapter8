import React, { useState } from 'react';

export const RegularPolygonConcept: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<'regular-square' | 'rect-nonreg' | 'rhombus-nonreg'>('rhombus-nonreg');
  const [showDiagonals, setShowDiagonals] = useState<boolean>(true);
  const [showSquareCompare, setShowSquareCompare] = useState<boolean>(false);

  // Classic Diamond Rhombus Geometry
  // Center is (160, 120)
  // Semi-diagonals: vertical b = 98, horizontal a = 70
  // Side length = sqrt(70^2 + 98^2) = 120.4 px (representing 6 cm on all 4 sides)
  const cx = 160;
  const cy = 120;
  const a = 70; // horizontal semi-diagonal
  const b = 98; // vertical semi-diagonal

  const topV = { x: cx, y: cy - b };      // (160, 22)
  const botV = { x: cx, y: cy + b };      // (160, 218)
  const leftV = { x: cx - a, y: cy };     // (90, 120)
  const rightV = { x: cx + a, y: cy };    // (230, 120)

  // Midpoints of 4 equal sides
  const midTL = { x: (topV.x + leftV.x) / 2, y: (topV.y + leftV.y) / 2 };     // (125, 71)
  const midTR = { x: (topV.x + rightV.x) / 2, y: (topV.y + rightV.y) / 2 };   // (195, 71)
  const midBL = { x: (botV.x + leftV.x) / 2, y: (botV.y + leftV.y) / 2 };     // (125, 169)
  const midBR = { x: (botV.x + rightV.x) / 2, y: (botV.y + rightV.y) / 2 };   // (195, 169)

  // Unit normal vectors for side ticks (side length L ≈ 120.4, dx = 70, dy = 98)
  const L = Math.sqrt(a * a + b * b);
  const nx = b / L; // 0.814
  const ny = a / L; // 0.581
  const tickLen = 7;

  // Angles
  const acuteAngle = Math.round(2 * Math.atan(a / b) * (180 / Math.PI)); // 71°
  const obtuseAngle = 180 - acuteAngle; // 109°

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-6xl mx-auto p-6 select-none overflow-y-auto">
      {/* Header */}
      <div>
        <span className="text-sm font-black text-emerald-600 uppercase tracking-widest">
          Unit 8.2 · Regular Polygons
        </span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          What Makes a Polygon "Regular"?
        </h2>
        <p className="text-2xl font-bold text-slate-700 leading-snug">
          A regular polygon must satisfy <span className="text-emerald-600 font-extrabold">TWO conditions</span>: ALL sides equal length AND ALL angles equal size!
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-12 gap-8 items-center my-auto">
        {/* Visual Diagram Stage */}
        <div className="col-span-12 md:col-span-7 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl flex flex-col items-center justify-between min-h-[440px]">
          {/* Top Stage Indicator */}
          <div className="w-full flex items-center justify-between mb-2">
            <span
              className={`text-xs font-black uppercase px-3 py-1 rounded-full ${
                selectedDemo === 'regular-square'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              {selectedDemo === 'regular-square'
                ? 'Example: Regular Polygon'
                : 'Non-Example: Not Regular'}
            </span>
            <span className="text-xs font-bold text-slate-500">
              {selectedDemo === 'rhombus-nonreg'
                ? `Rhombus · 4 Equal Sides (6 cm) · Angles ${acuteAngle}° & ${obtuseAngle}°`
                : selectedDemo === 'regular-square'
                ? 'Square · 4 Equal Sides & 4 × 90°'
                : 'Rectangle · 4 × 90° & Unequal Sides'}
            </span>
          </div>

          {/* 1. SQUARE (REGULAR) */}
          {selectedDemo === 'regular-square' && (
            <div className="flex flex-col items-center my-auto">
              <svg viewBox="0 0 280 240" className="w-72 h-64 overflow-visible">
                {/* Regular Square: all sides equal, all angles 90 */}
                <rect x="50" y="30" width="180" height="180" fill="#ecfdf5" stroke="#059669" strokeWidth="4" rx="2" />
                {/* 90 deg corner markers */}
                <rect x="50" y="30" width="18" height="18" fill="none" stroke="#059669" strokeWidth="2.5" />
                <rect x="212" y="30" width="18" height="18" fill="none" stroke="#059669" strokeWidth="2.5" />
                <rect x="50" y="192" width="18" height="18" fill="none" stroke="#059669" strokeWidth="2.5" />
                <rect x="212" y="192" width="18" height="18" fill="none" stroke="#059669" strokeWidth="2.5" />

                {/* 90° badges */}
                <text x="76" y="58" className="text-xs font-black fill-emerald-700">90°</text>
                <text x="204" y="58" textAnchor="end" className="text-xs font-black fill-emerald-700">90°</text>
                <text x="76" y="190" className="text-xs font-black fill-emerald-700">90°</text>
                <text x="204" y="190" textAnchor="end" className="text-xs font-black fill-emerald-700">90°</text>

                {/* Single tick marks on each of the 4 equal sides */}
                <line x1="140" y1="23" x2="140" y2="37" stroke="#059669" strokeWidth="3" />
                <line x1="140" y1="203" x2="140" y2="217" stroke="#059669" strokeWidth="3" />
                <line x1="43" y1="120" x2="57" y2="120" stroke="#059669" strokeWidth="3" />
                <line x1="223" y1="120" x2="237" y2="120" stroke="#059669" strokeWidth="3" />

                {/* Side length tags */}
                <text x="140" y="18" textAnchor="middle" className="text-xs font-bold fill-emerald-800">s = 6 cm</text>
                <text x="140" y="230" textAnchor="middle" className="text-xs font-bold fill-emerald-800">s = 6 cm</text>
                <text x="28" y="124" textAnchor="middle" className="text-xs font-bold fill-emerald-800">6 cm</text>
                <text x="252" y="124" textAnchor="middle" className="text-xs font-bold fill-emerald-800">6 cm</text>
              </svg>

              <div className="text-emerald-900 bg-emerald-100 px-6 py-2.5 rounded-2xl font-black text-base border border-emerald-300 mt-2 text-center">
                ✓ ALL 4 sides equal (6 cm) AND ALL 4 angles equal (90°) → <strong>REGULAR POLYGON</strong>
              </div>
            </div>
          )}

          {/* 2. RECTANGLE (NON-REGULAR) */}
          {selectedDemo === 'rect-nonreg' && (
            <div className="flex flex-col items-center my-auto">
              <svg viewBox="0 0 280 240" className="w-72 h-64 overflow-visible">
                {/* Rectangle: angles equal (all 90), but sides NOT equal */}
                <rect x="30" y="55" width="220" height="130" fill="#fff7ed" stroke="#ea580c" strokeWidth="4" rx="2" />
                {/* All angles 90 */}
                <rect x="30" y="55" width="18" height="18" fill="none" stroke="#16a34a" strokeWidth="2.5" />
                <rect x="232" y="55" width="18" height="18" fill="none" stroke="#16a34a" strokeWidth="2.5" />
                <rect x="30" y="167" width="18" height="18" fill="none" stroke="#16a34a" strokeWidth="2.5" />
                <rect x="232" y="167" width="18" height="18" fill="none" stroke="#16a34a" strokeWidth="2.5" />

                {/* 90° corner labels */}
                <text x="56" y="80" className="text-xs font-black fill-emerald-700">90°</text>
                <text x="224" y="80" textAnchor="end" className="text-xs font-black fill-emerald-700">90°</text>
                <text x="56" y="165" className="text-xs font-black fill-emerald-700">90°</text>
                <text x="224" y="165" textAnchor="end" className="text-xs font-black fill-emerald-700">90°</text>

                {/* Tick marks: double tick on long sides, single on short sides */}
                <line x1="137" y1="48" x2="137" y2="62" stroke="#ea580c" strokeWidth="3" />
                <line x1="143" y1="48" x2="143" y2="62" stroke="#ea580c" strokeWidth="3" />
                <line x1="137" y1="178" x2="137" y2="192" stroke="#ea580c" strokeWidth="3" />
                <line x1="143" y1="178" x2="143" y2="192" stroke="#ea580c" strokeWidth="3" />
                <line x1="23" y1="120" x2="37" y2="120" stroke="#ea580c" strokeWidth="3" />
                <line x1="243" y1="120" x2="257" y2="120" stroke="#ea580c" strokeWidth="3" />

                {/* Length labels */}
                <text x="140" y="42" textAnchor="middle" className="text-xs font-bold fill-orange-800">Length = 8 cm</text>
                <text x="140" y="206" textAnchor="middle" className="text-xs font-bold fill-orange-800">Length = 8 cm</text>
                <text x="14" y="124" textAnchor="middle" className="text-xs font-bold fill-orange-800">5 cm</text>
                <text x="266" y="124" textAnchor="middle" className="text-xs font-bold fill-orange-800">5 cm</text>
              </svg>

              <div className="text-rose-900 bg-rose-100 px-6 py-2.5 rounded-2xl font-black text-base border border-rose-300 mt-2 text-center">
                ✓ Angles all equal (all 90°) BUT ✗ Sides NOT equal (8 cm ≠ 5 cm) → <strong>NOT REGULAR</strong>
              </div>
            </div>
          )}

          {/* 3. RHOMBUS (ACCURATE CLASSIC DIAMOND RHOMBUS) */}
          {selectedDemo === 'rhombus-nonreg' && (
            <div className="flex flex-col items-center w-full my-auto">
              {/* Feature badges & controls */}
              <div className="flex items-center gap-2 mb-2">
                <button
                  onClick={() => setShowDiagonals(!showDiagonals)}
                  className={`px-3 py-1 rounded-xl text-xs font-black transition-all border ${
                    showDiagonals
                      ? 'bg-rose-600 text-white border-rose-700 shadow-sm'
                      : 'bg-white text-rose-700 border-rose-300 hover:bg-rose-50'
                  }`}
                >
                  {showDiagonals ? '✓ Diagonals (90° Bisector)' : 'Show Diagonals (90°)'}
                </button>

                <button
                  onClick={() => setShowSquareCompare(!showSquareCompare)}
                  className={`px-3 py-1 rounded-xl text-xs font-black transition-all border ${
                    showSquareCompare
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {showSquareCompare ? 'Hide Square Comparison' : 'Compare with Square'}
                </button>
              </div>

              {/* Classic Diamond Rhombus SVG */}
              <svg viewBox="0 0 320 240" className="w-80 h-60 overflow-visible">
                {/* Optional Ghost Square to compare Rhombus vs Square */}
                {showSquareCompare && (
                  <rect
                    x="100"
                    y="60"
                    width="120"
                    height="120"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    transform="rotate(45 160 120)"
                  />
                )}

                {/* Perpendicular Diagonals (The definitive geometric property of a rhombus) */}
                {showDiagonals && (
                  <g>
                    {/* Vertical diagonal (top to bottom) */}
                    <line
                      x1={topV.x}
                      y1={topV.y}
                      x2={botV.x}
                      y2={botV.y}
                      stroke="#94a3b8"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                    {/* Horizontal diagonal (left to right) */}
                    <line
                      x1={leftV.x}
                      y1={leftV.y}
                      x2={rightV.x}
                      y2={rightV.y}
                      stroke="#94a3b8"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                    {/* 90° right-angle symbol at the intersection center */}
                    <rect
                      x={cx}
                      y={cy - 12}
                      width="12"
                      height="12"
                      fill="none"
                      stroke="#dc2626"
                      strokeWidth="2"
                    />
                    <text
                      x={cx + 16}
                      y={cy - 14}
                      className="text-[11px] font-black fill-slate-600 font-mono"
                    >
                      90°
                    </text>
                  </g>
                )}

                {/* The Diamond Rhombus Polygon */}
                <polygon
                  points={`${topV.x},${topV.y} ${rightV.x},${rightV.y} ${botV.x},${botV.y} ${leftV.x},${leftV.y}`}
                  fill="#fef2f2"
                  stroke="#dc2626"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />

                {/* 4 Single Tick Marks (one on every equal side) */}
                {/* Top-Left side tick */}
                <line
                  x1={midTL.x - nx * tickLen}
                  y1={midTL.y + ny * tickLen}
                  x2={midTL.x + nx * tickLen}
                  y2={midTL.y - ny * tickLen}
                  stroke="#dc2626"
                  strokeWidth="3"
                />
                {/* Top-Right side tick */}
                <line
                  x1={midTR.x - nx * tickLen}
                  y1={midTR.y - ny * tickLen}
                  x2={midTR.x + nx * tickLen}
                  y2={midTR.y + ny * tickLen}
                  stroke="#dc2626"
                  strokeWidth="3"
                />
                {/* Bottom-Left side tick */}
                <line
                  x1={midBL.x - nx * tickLen}
                  y1={midBL.y - ny * tickLen}
                  x2={midBL.x + nx * tickLen}
                  y2={midBL.y + ny * tickLen}
                  stroke="#dc2626"
                  strokeWidth="3"
                />
                {/* Bottom-Right side tick */}
                <line
                  x1={midBR.x - nx * tickLen}
                  y1={midBR.y + ny * tickLen}
                  x2={midBR.x + nx * tickLen}
                  y2={midBR.y - ny * tickLen}
                  stroke="#dc2626"
                  strokeWidth="3"
                />

                {/* Side length tags: all 4 sides = 6 cm */}
                <text x={midTL.x - 22} y={midTL.y - 4} className="text-xs font-black fill-rose-900 font-mono">
                  6 cm
                </text>
                <text x={midTR.x + 10} y={midTR.y - 4} className="text-xs font-black fill-rose-900 font-mono">
                  6 cm
                </text>
                <text x={midBL.x - 24} y={midBL.y + 14} className="text-xs font-black fill-rose-900 font-mono">
                  6 cm
                </text>
                <text x={midBR.x + 10} y={midBR.y + 14} className="text-xs font-black fill-rose-900 font-mono">
                  6 cm
                </text>

                {/* Acute Angles (Blue Arcs): Top and Bottom Vertices */}
                {/* Top Acute Angle (71°) */}
                <path
                  d={`M ${topV.x - 16} ${topV.y + 22} A 26 26 0 0 0 ${topV.x + 16} ${topV.y + 22}`}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="3"
                />
                <text
                  x={topV.x}
                  y={topV.y - 6}
                  textAnchor="middle"
                  className="text-xs font-black fill-blue-700 font-mono"
                >
                  {acuteAngle}° (Acute)
                </text>

                {/* Bottom Acute Angle (71°) */}
                <path
                  d={`M ${botV.x - 16} ${botV.y - 22} A 26 26 0 0 1 ${botV.x + 16} ${botV.y - 22}`}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="3"
                />
                <text
                  x={botV.x}
                  y={botV.y + 18}
                  textAnchor="middle"
                  className="text-xs font-black fill-blue-700 font-mono"
                >
                  {acuteAngle}° (Acute)
                </text>

                {/* Obtuse Angles (Amber Arcs): Left and Right Vertices */}
                {/* Left Obtuse Angle (109°) */}
                <path
                  d={`M ${leftV.x + 18} ${leftV.y - 22} A 28 28 0 0 1 ${leftV.x + 18} ${leftV.y + 22}`}
                  fill="none"
                  stroke="#ea580c"
                  strokeWidth="3"
                />
                <text
                  x={leftV.x - 8}
                  y={leftV.y + 4}
                  textAnchor="end"
                  className="text-xs font-black fill-amber-700 font-mono"
                >
                  {obtuseAngle}° (Obtuse)
                </text>

                {/* Right Obtuse Angle (109°) */}
                <path
                  d={`M ${rightV.x - 18} ${rightV.y - 22} A 28 28 0 0 0 ${rightV.x - 18} ${rightV.y + 22}`}
                  fill="none"
                  stroke="#ea580c"
                  strokeWidth="3"
                />
                <text
                  x={rightV.x + 8}
                  y={rightV.y + 4}
                  className="text-xs font-black fill-amber-700 font-mono"
                >
                  {obtuseAngle}° (Obtuse)
                </text>
              </svg>

              {/* Informative Rhombus Identity Banner */}
              <div className="w-full mt-2 p-3 bg-rose-50 rounded-2xl border border-rose-200 text-xs font-bold text-rose-950 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-black text-rose-900">Why this is an accurate Rhombus (not a parallelogram):</span>
                  <span className="text-emerald-700 font-black">✓ 4 Equal Sides &amp; 90° Diagonals</span>
                </div>
                <div className="text-slate-700">
                  A general parallelogram has unequal adjacent sides and slanted diagonals. A <strong>Rhombus</strong> has all 4 sides equal (6 cm) and diagonals that meet at 90°.
                </div>
              </div>

              {/* Conclusion Badge */}
              <div className="mt-2 px-4 py-2 rounded-2xl font-black text-sm text-center border w-full bg-rose-100 text-rose-900 border-rose-300">
                ✓ Sides all equal (6 cm) BUT ✗ Angles NOT equal ({acuteAngle}° ≠ {obtuseAngle}°) → <strong>NOT A REGULAR POLYGON</strong>
              </div>
            </div>
          )}
        </div>

        {/* Comparison Selector & Side-by-Side Criteria Card */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-3">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            Compare 2D Quadrilaterals:
          </span>

          <button
            onClick={() => setSelectedDemo('regular-square')}
            className={`p-4 rounded-2xl text-left border-2 font-black transition-all ${
              selectedDemo === 'regular-square'
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-xl scale-102'
                : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-lg">Square</span>
              <span className="text-xs uppercase px-2 py-0.5 rounded bg-emerald-800 text-emerald-100">
                Regular
              </span>
            </div>
            <p className={`text-xs mt-1 ${selectedDemo === 'regular-square' ? 'text-emerald-100' : 'text-slate-500'}`}>
              ✓ Sides all equal (4 equal sides) AND ✓ Angles all equal (90° each).
            </p>
          </button>

          <button
            onClick={() => setSelectedDemo('rect-nonreg')}
            className={`p-4 rounded-2xl text-left border-2 font-black transition-all ${
              selectedDemo === 'rect-nonreg'
                ? 'bg-rose-600 text-white border-rose-700 shadow-xl scale-102'
                : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-lg">Rectangle</span>
              <span className="text-xs uppercase px-2 py-0.5 rounded bg-rose-800 text-rose-100">
                Not Regular
              </span>
            </div>
            <p className={`text-xs mt-1 ${selectedDemo === 'rect-nonreg' ? 'text-rose-100' : 'text-slate-500'}`}>
              ✓ Angles all equal (all 90°), BUT ✗ sides are different lengths.
            </p>
          </button>

          <button
            onClick={() => setSelectedDemo('rhombus-nonreg')}
            className={`p-4 rounded-2xl text-left border-2 font-black transition-all ${
              selectedDemo === 'rhombus-nonreg'
                ? 'bg-rose-600 text-white border-rose-700 shadow-xl scale-102'
                : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-lg">Rhombus (Diamond)</span>
              <span className="text-xs uppercase px-2 py-0.5 rounded bg-rose-800 text-rose-100">
                Not Regular
              </span>
            </div>
            <p className={`text-xs mt-1 ${selectedDemo === 'rhombus-nonreg' ? 'text-rose-100' : 'text-slate-500'}`}>
              ✓ Sides all equal (all 4 are 6 cm), BUT ✗ angles are different sizes ({acuteAngle}° vs {obtuseAngle}°).
            </p>
          </button>

          {/* Quick Criteria Verification Checklist */}
          <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 mt-1">
            <span className="text-xs font-black uppercase text-slate-500 block mb-2">
              Cambridge Regularity Test:
            </span>
            <div className="space-y-1.5 text-xs font-bold">
              <div className="flex items-center justify-between p-1.5 rounded-lg bg-white border border-slate-200">
                <span>1. All side lengths equal?</span>
                <span className={selectedDemo === 'rect-nonreg' ? 'text-rose-600 font-black' : 'text-emerald-700 font-black'}>
                  {selectedDemo === 'rect-nonreg' ? '✗ NO (8 ≠ 5)' : '✓ YES (All 4 = 6 cm)'}
                </span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded-lg bg-white border border-slate-200">
                <span>2. All interior angles equal?</span>
                <span className={selectedDemo === 'rhombus-nonreg' ? 'text-rose-600 font-black' : 'text-emerald-700 font-black'}>
                  {selectedDemo === 'rhombus-nonreg' ? `✗ NO (${acuteAngle}° ≠ ${obtuseAngle}°)` : '✓ YES (All 90°)'}
                </span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-900 text-white font-black">
                <span>Conclusion:</span>
                <span className={selectedDemo === 'regular-square' ? 'text-emerald-400' : 'text-rose-400'}>
                  {selectedDemo === 'regular-square' ? 'REGULAR POLYGON' : 'NOT REGULAR'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Rule */}
      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-bold text-base flex items-center justify-between">
        <span>
          <strong>Rule:</strong> Both equilateral (all sides equal) AND equiangular (all angles equal) must hold true. A quadrilateral is regular ONLY if it is a square.
        </span>
      </div>
    </div>
  );
};


