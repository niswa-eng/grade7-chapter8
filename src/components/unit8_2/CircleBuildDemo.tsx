import React, { useState } from 'react';
import { RotateCcw, ChevronLeft, ChevronRight, Layers, Check } from 'lucide-react';

type PartId = 'centre' | 'radius' | 'diameter' | 'circumference' | 'chord' | 'tangent' | 'all';

interface PartConfig {
  id: PartId;
  title: string;
  shortName: string;
  subtitle: string;
  def: string;
  keyFact: string;
  color: string;
  bgLight: string;
  borderLight: string;
}

export const CircleBuildDemo: React.FC = () => {
  const [activePart, setActivePart] = useState<PartId>('centre');
  const [radiusAngle, setRadiusAngle] = useState<number>(30);
  const [diaAngle, setDiaAngle] = useState<number>(150);
  const [chordAngle1, setChordAngle1] = useState<number>(40);
  const [chordAngle2, setChordAngle2] = useState<number>(200);
  const [tangentAngle, setTangentAngle] = useState<number>(315);

  const parts: PartConfig[] = [
    {
      id: 'centre',
      title: '1. The Centre',
      shortName: 'Centre',
      subtitle: 'The Middle Point',
      def: 'The point located in the exact middle of the circle. Every single point on the outer boundary is at the exact same distance from this centre.',
      keyFact: 'Labelled O. It is the reference point for the radius and diameter.',
      color: '#ea580c',
      bgLight: 'bg-orange-50',
      borderLight: 'border-orange-200'
    },
    {
      id: 'radius',
      title: '2. Radius (Radii)',
      shortName: 'Radius',
      subtitle: 'Centre to Circumference',
      def: 'A straight line segment from the centre O to any point on the circumference. Plural form is radii. Every radius in the same circle has the exact same length!',
      keyFact: 'Length is denoted as r. If r = 5 cm, all radii in this circle measure 5 cm.',
      color: '#2563eb',
      bgLight: 'bg-blue-50',
      borderLight: 'border-blue-200'
    },
    {
      id: 'diameter',
      title: '3. Diameter (d = 2r)',
      shortName: 'Diameter',
      subtitle: 'Straight Across Through Centre',
      def: 'A straight line passing straight through the centre, connecting two opposite points on the circle. It cuts the circle into two equal semicircles.',
      keyFact: 'Formula: Diameter = 2 × Radius (d = 2r). The diameter is also the longest chord.',
      color: '#16a34a',
      bgLight: 'bg-emerald-50',
      borderLight: 'border-emerald-200'
    },
    {
      id: 'circumference',
      title: '4. Circumference',
      shortName: 'Circumference',
      subtitle: 'Perimeter of the Circle',
      def: 'The curved outer boundary of the circle. It is the total perimeter or distance all the way around the outside of the circle.',
      keyFact: 'Circumference = π × diameter = 2πr.',
      color: '#0f172a',
      bgLight: 'bg-slate-100',
      borderLight: 'border-slate-300'
    },
    {
      id: 'chord',
      title: '5. Chord',
      shortName: 'Chord',
      subtitle: 'Line Joining Any Two Points',
      def: 'A straight line segment connecting any two points on the circle circumference. Unlike a diameter, a general chord does not need to pass through the centre.',
      keyFact: 'The diameter is a special chord that passes through the centre — it is the longest possible chord!',
      color: '#9333ea',
      bgLight: 'bg-purple-50',
      borderLight: 'border-purple-200'
    },
    {
      id: 'tangent',
      title: '6. Tangent (90° Rule)',
      shortName: 'Tangent',
      subtitle: 'Touches at Exactly One Point',
      def: 'A straight line outside the circle that touches the circumference at exactly ONE point (the point of contact P). It never cuts inside the circle.',
      keyFact: 'The 90° Rule: The tangent meets the radius drawn to the point of contact at a right angle (90°).',
      color: '#dc2626',
      bgLight: 'bg-red-50',
      borderLight: 'border-red-200'
    }
  ];

  const singlePartKeys: PartId[] = ['centre', 'radius', 'diameter', 'circumference', 'chord', 'tangent'];
  const currentIndex = singlePartKeys.indexOf(activePart);

  // Circle Geometry
  const cx = 160;
  const cy = 160;
  const r = 100;

  // Radius endpoint
  const radX = cx + r * Math.cos((radiusAngle * Math.PI) / 180);
  const radY = cy + r * Math.sin((radiusAngle * Math.PI) / 180);

  // Diameter endpoints
  const diaX1 = cx + r * Math.cos((diaAngle * Math.PI) / 180);
  const diaY1 = cy + r * Math.sin((diaAngle * Math.PI) / 180);
  const diaX2 = cx - r * Math.cos((diaAngle * Math.PI) / 180);
  const diaY2 = cy - r * Math.sin((diaAngle * Math.PI) / 180);

  // Chord endpoints
  const chordX1 = cx + r * Math.cos((chordAngle1 * Math.PI) / 180);
  const chordY1 = cy + r * Math.sin((chordAngle1 * Math.PI) / 180);
  const chordX2 = cx + r * Math.cos((chordAngle2 * Math.PI) / 180);
  const chordY2 = cy + r * Math.sin((chordAngle2 * Math.PI) / 180);
  const chordDx = chordX2 - chordX1;
  const chordDy = chordY2 - chordY1;
  const chordLen = Math.round(Math.sqrt(chordDx * chordDx + chordDy * chordDy));
  const isChordDiameter = Math.abs(chordLen - 2 * r) < 4;

  // Tangent point and line
  const tanPx = cx + r * Math.cos((tangentAngle * Math.PI) / 180);
  const tanPy = cy + r * Math.sin((tangentAngle * Math.PI) / 180);
  const tanDx = -Math.sin((tangentAngle * Math.PI) / 180);
  const tanDy = Math.cos((tangentAngle * Math.PI) / 180);
  const tanLineLen = 95;
  const tanLineX1 = tanPx - tanDx * tanLineLen;
  const tanLineY1 = tanPy - tanDy * tanLineLen;
  const tanLineX2 = tanPx + tanDx * tanLineLen;
  const tanLineY2 = tanPy + tanDy * tanLineLen;

  // Active configuration card
  const activeConfig =
    parts.find((p) => p.id === activePart) || {
      id: 'all' as PartId,
      title: 'All Parts of a Circle',
      shortName: 'All Parts',
      subtitle: 'Complete Circle Anatomy',
      def: 'Viewing all 6 core features of the circle simultaneously: Centre O, Radius, Diameter, Circumference, Chord, and Tangent with its 90° contact rule.',
      keyFact: 'Notice how each part relates: Diameter = 2 × Radius, Diameter is the longest chord, and Tangent meets Radius at 90°.',
      color: '#0284c7',
      bgLight: 'bg-sky-50',
      borderLight: 'border-sky-200'
    };

  const handleNext = () => {
    if (activePart === 'all') {
      setActivePart('centre');
    } else {
      const nextIdx = (currentIndex + 1) % singlePartKeys.length;
      setActivePart(singlePartKeys[nextIdx]);
    }
  };

  const handlePrev = () => {
    if (activePart === 'all') {
      setActivePart('tangent');
    } else {
      const prevIdx = (currentIndex - 1 + singlePartKeys.length) % singlePartKeys.length;
      setActivePart(singlePartKeys[prevIdx]);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-6xl mx-auto p-6 select-none overflow-y-auto">
      {/* Slide Header */}
      <div>
        <span className="text-sm font-black text-emerald-600 uppercase tracking-widest">
          Unit 8.2 · Part A: Circles
        </span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          Parts of a Circle
        </h2>
        <p className="text-2xl font-bold text-slate-700 leading-snug">
          Explore each circle feature individually or view all parts together.
        </p>
      </div>

      {/* Main Grid: Visual Canvas + Information & Controls */}
      <div className="grid grid-cols-12 gap-8 items-center my-4">
        {/* Visual Circle Canvas */}
        <div className="col-span-12 md:col-span-7 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl flex flex-col items-center justify-between min-h-[460px] relative">
          {/* Top Canvas Tag */}
          <div className="w-full flex items-center justify-between mb-2">
            <span
              className="text-xs font-black uppercase px-3 py-1 rounded-full text-white"
              style={{ backgroundColor: activeConfig.color }}
            >
              {activePart === 'all' ? 'Combined View' : `Showing: ${activeConfig.shortName} only`}
            </span>
            <span className="text-xs font-bold text-slate-500">
              Radius r = {r} px
            </span>
          </div>

          {/* SVG Canvas */}
          <div className="relative flex items-center justify-center my-auto">
            <svg viewBox="0 0 320 320" className="w-80 h-80 overflow-visible">
              {/* Base Faint Circle Boundary (Always exists as geometrical foundation) */}
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="#f8fafc"
                stroke={activePart === 'circumference' || activePart === 'all' ? '#0f172a' : '#cbd5e1'}
                strokeWidth={activePart === 'circumference' ? '6' : activePart === 'all' ? '4' : '2.5'}
                strokeDasharray={activePart === 'circumference' || activePart === 'all' ? 'none' : '4 4'}
              />

              {/* 1. CENTRE: Only shown when activePart === 'centre' or 'all' (or as faint pivot) */}
              {(activePart === 'centre' || activePart === 'all' || activePart === 'radius' || activePart === 'diameter' || activePart === 'tangent') && (
                <g>
                  {activePart === 'centre' && (
                    <>
                      <circle cx={cx} cy={cy} r="18" fill="#ea580c" opacity="0.2" className="animate-ping" />
                      <circle cx={cx} cy={cy} r="14" fill="#ea580c" opacity="0.3" />
                    </>
                  )}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={activePart === 'centre' ? '8' : '5.5'}
                    fill="#ea580c"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                  />
                  {(activePart === 'centre' || activePart === 'all') && (
                    <text
                      x={cx}
                      y={cy - 14}
                      textAnchor="middle"
                      className="text-base font-black fill-orange-600 drop-shadow-sm"
                    >
                      O (Centre)
                    </text>
                  )}
                </g>
              )}

              {/* 2. RADIUS: Only shown when activePart === 'radius' or 'all' */}
              {(activePart === 'radius' || activePart === 'all') && (
                <g>
                  <line
                    x1={cx}
                    y1={cy}
                    x2={radX}
                    y2={radY}
                    stroke="#2563eb"
                    strokeWidth={activePart === 'radius' ? '5' : '4'}
                    strokeLinecap="round"
                  />
                  <circle cx={radX} cy={radY} r="5.5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
                  <text
                    x={(cx + radX) / 2 + 10}
                    y={(cy + radY) / 2 - 8}
                    className="text-base font-black fill-blue-700 font-mono"
                  >
                    r (Radius)
                  </text>
                </g>
              )}

              {/* 3. DIAMETER: Only shown when activePart === 'diameter' or 'all' */}
              {(activePart === 'diameter' || activePart === 'all') && (
                <g>
                  <line
                    x1={diaX1}
                    y1={diaY1}
                    x2={diaX2}
                    y2={diaY2}
                    stroke="#16a34a"
                    strokeWidth={activePart === 'diameter' ? '5.5' : '4'}
                    strokeLinecap="round"
                  />
                  <circle cx={diaX1} cy={diaY1} r="5" fill="#16a34a" />
                  <circle cx={diaX2} cy={diaY2} r="5" fill="#16a34a" />
                  <text
                    x={cx}
                    y={cy + 32}
                    textAnchor="middle"
                    className="text-base font-black fill-emerald-800"
                  >
                    d = 2r (Diameter)
                  </text>
                </g>
              )}

              {/* 4. CIRCUMFERENCE: Highlight & animation when activePart === 'circumference' or 'all' */}
              {activePart === 'circumference' && (
                <g>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="10"
                    opacity="0.3"
                  />
                  <text
                    x={cx}
                    y={cy - r - 14}
                    textAnchor="middle"
                    className="text-base font-black fill-slate-900"
                  >
                    Circumference (Perimeter)
                  </text>
                </g>
              )}

              {/* 5. CHORD: ONLY shown when activePart === 'chord' or 'all' (NEVER when tangent or radius selected) */}
              {(activePart === 'chord' || activePart === 'all') && (
                <g>
                  <line
                    x1={chordX1}
                    y1={chordY1}
                    x2={chordX2}
                    y2={chordY2}
                    stroke="#9333ea"
                    strokeWidth={activePart === 'chord' ? '5.5' : '4'}
                    strokeLinecap="round"
                  />
                  <circle cx={chordX1} cy={chordY1} r="6" fill="#9333ea" stroke="#ffffff" strokeWidth="2" />
                  <circle cx={chordX2} cy={chordY2} r="6" fill="#9333ea" stroke="#ffffff" strokeWidth="2" />
                  <text
                    x={chordX1 + (chordX1 > cx ? 12 : -18)}
                    y={chordY1 + 5}
                    className="text-sm font-black fill-purple-900"
                  >
                    A
                  </text>
                  <text
                    x={chordX2 + (chordX2 > cx ? 12 : -18)}
                    y={chordY2 + 5}
                    className="text-sm font-black fill-purple-900"
                  >
                    B
                  </text>
                  <text
                    x={(chordX1 + chordX2) / 2}
                    y={(chordY1 + chordY2) / 2 - 10}
                    textAnchor="middle"
                    className="text-base font-black fill-purple-800"
                  >
                    Chord AB
                  </text>
                </g>
              )}

              {/* 6. TANGENT: ONLY shown when activePart === 'tangent' or 'all' (NEVER when chord or radius selected) */}
              {(activePart === 'tangent' || activePart === 'all') && (
                <g>
                  {/* Dashed perpendicular radius connecting centre O to point of contact P */}
                  <line
                    x1={cx}
                    y1={cy}
                    x2={tanPx}
                    y2={tanPy}
                    stroke="#ef4444"
                    strokeWidth="3"
                    strokeDasharray="4 4"
                  />
                  {/* Tangent line touching at point P */}
                  <line
                    x1={tanLineX1}
                    y1={tanLineY1}
                    x2={tanLineX2}
                    y2={tanLineY2}
                    stroke="#dc2626"
                    strokeWidth={activePart === 'tangent' ? '5' : '4'}
                    strokeLinecap="round"
                  />
                  {/* Point of contact P */}
                  <circle cx={tanPx} cy={tanPy} r="6.5" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
                  <text
                    x={tanPx + (tanPx > cx ? 16 : -20)}
                    y={tanPy + (tanPy > cy ? 16 : -14)}
                    className="text-base font-black fill-red-700"
                  >
                    Tangent at P
                  </text>

                  {/* 90° right-angle square indicator at contact point */}
                  <rect
                    x={tanPx - 10}
                    y={tanPy - 10}
                    width="12"
                    height="12"
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="2.5"
                    transform={`rotate(${tangentAngle} ${tanPx} ${tanPy})`}
                  />
                </g>
              )}
            </svg>
          </div>

          {/* Contextual Interactive Slider / Controls for the Active Part */}
          <div className="w-full mt-3">
            {activePart === 'radius' && (
              <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200 flex items-center justify-between gap-3">
                <span className="text-xs font-black text-blue-900 whitespace-nowrap">Rotate Radius:</span>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={radiusAngle}
                  onChange={(e) => setRadiusAngle(parseFloat(e.target.value))}
                  className="flex-1 accent-blue-600"
                />
                <span className="text-xs font-mono font-bold text-blue-800 w-12 text-right">{radiusAngle}°</span>
              </div>
            )}

            {activePart === 'diameter' && (
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between gap-3">
                <span className="text-xs font-black text-emerald-900 whitespace-nowrap">Rotate Diameter:</span>
                <input
                  type="range"
                  min="0"
                  max="180"
                  value={diaAngle}
                  onChange={(e) => setDiaAngle(parseFloat(e.target.value))}
                  className="flex-1 accent-emerald-600"
                />
                <span className="text-xs font-mono font-bold text-emerald-800 w-12 text-right">{diaAngle}°</span>
              </div>
            )}

            {activePart === 'chord' && (
              <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 flex flex-col gap-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-black text-purple-900 whitespace-nowrap">Move Chord:</span>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={chordAngle2}
                    onChange={(e) => setChordAngle2(parseFloat(e.target.value))}
                    className="flex-1 accent-purple-600"
                  />
                  <span className="text-xs font-mono font-bold text-purple-900">{chordLen} px</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      setChordAngle1(0);
                      setChordAngle2(180);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                      isChordDiameter
                        ? 'bg-purple-800 text-white shadow'
                        : 'bg-purple-200 text-purple-900 hover:bg-purple-300'
                    }`}
                  >
                    Snap to Diameter (Longest Chord)
                  </button>
                  <button
                    onClick={() => {
                      setChordAngle1(40);
                      setChordAngle2(130);
                    }}
                    className="px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-900 rounded-xl text-xs font-black"
                  >
                    Short Chord
                  </button>
                </div>
              </div>
            )}

            {activePart === 'tangent' && (
              <div className="p-3 bg-red-50 rounded-2xl border border-red-200 flex items-center justify-between gap-3">
                <span className="text-xs font-black text-red-900 whitespace-nowrap">Point P Position:</span>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={tangentAngle}
                  onChange={(e) => setTangentAngle(parseFloat(e.target.value))}
                  className="flex-1 accent-red-600"
                />
                <span className="text-xs font-mono font-bold text-red-700 w-12 text-right">{tangentAngle}°</span>
              </div>
            )}

            {activePart === 'circumference' && (
              <div className="p-3 bg-slate-100 rounded-2xl border border-slate-300 flex items-center justify-between text-xs font-bold text-slate-800">
                <span>Perimeter boundary: distance all the way around</span>
                <span className="font-mono font-black text-slate-900">2 × π × r ≈ 628 px</span>
              </div>
            )}

            {activePart === 'centre' && (
              <div className="p-3 bg-orange-50 rounded-2xl border border-orange-200 flex items-center justify-between text-xs font-bold text-orange-950">
                <span>Centre O is equidistant from every point on the circumference</span>
                <span className="font-mono font-black text-orange-700">Distance = r</span>
              </div>
            )}

            {activePart === 'all' && (
              <div className="p-3 bg-sky-50 rounded-2xl border border-sky-200 flex items-center justify-between text-xs font-bold text-sky-950">
                <span>All 6 features visible simultaneously on the circle</span>
                <span className="font-black text-sky-800">Select any part below to isolate</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Part Navigation & Clear Definition Card */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
          {/* Active Part Definition Card */}
          <div
            className={`rounded-3xl p-6 border-2 shadow-lg transition-all ${activeConfig.bgLight} ${activeConfig.borderLight}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-xs font-black uppercase px-2.5 py-1 rounded-lg text-white"
                style={{ backgroundColor: activeConfig.color }}
              >
                {activePart === 'all' ? 'Combined View' : activeConfig.title.split('.')[0] + ' of 6'}
              </span>
              <span className="text-xs font-bold text-slate-600 font-mono">
                {activeConfig.subtitle}
              </span>
            </div>

            <h3 className="text-3xl font-black mb-3" style={{ color: activeConfig.color }}>
              {activeConfig.title}
            </h3>

            <p className="text-xl font-bold text-slate-800 leading-snug mb-4">
              {activeConfig.def}
            </p>

            <div className="p-3.5 bg-white/90 rounded-2xl border border-slate-200 text-slate-900 font-black text-sm">
              <span className="text-slate-500 uppercase text-xs block mb-0.5">Key Cambridge Fact:</span>
              <span>{activeConfig.keyFact}</span>
            </div>
          </div>

          {/* Stepper Buttons: Prev / Next / Show All */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="h-14 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center border-2 border-slate-200 active:scale-95"
              title="Previous Part"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="flex-1 h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 active:scale-95"
            >
              <span>{activePart === 'all' ? 'Start from Centre' : 'Next Part'}</span>
              <ChevronRight className="w-6 h-6" />
            </button>

            <button
              onClick={() => setActivePart(activePart === 'all' ? 'centre' : 'all')}
              className={`h-14 px-4 rounded-2xl font-black text-sm flex items-center justify-center gap-1.5 border-2 transition-all active:scale-95 ${
                activePart === 'all'
                  ? 'bg-sky-600 text-white border-sky-700 shadow-md'
                  : 'bg-white text-sky-800 border-sky-300 hover:bg-sky-50'
              }`}
              title="Toggle all parts view"
            >
              <Layers className="w-5 h-5" />
              <span>{activePart === 'all' ? 'Single View' : 'Show All'}</span>
            </button>
          </div>

          {/* Quick Select Buttons for Each Individual Part + All Parts */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">
              Select One Part to View Alone:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {parts.map((p) => {
                const isSelected = activePart === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActivePart(p.id)}
                    className={`p-2.5 rounded-xl text-center font-bold text-xs border-2 transition-all flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: p.color }}
                    />
                    <span className="truncate">{p.shortName}</span>
                  </button>
                );
              })}
            </div>

            {/* Show All Parts Dedicated Full Button */}
            <button
              onClick={() => setActivePart('all')}
              className={`w-full py-2.5 px-4 rounded-xl font-black text-xs border-2 flex items-center justify-center gap-2 transition-all ${
                activePart === 'all'
                  ? 'bg-sky-700 text-white border-sky-800 shadow-md'
                  : 'bg-sky-50 text-sky-900 border-sky-200 hover:bg-sky-100'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Show All Parts Together on One Circle</span>
              {activePart === 'all' && <Check className="w-4 h-4 stroke-[3]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Cambridge Reference Summary Footer */}
      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-bold text-base flex items-center justify-between">
        <span>
          <strong>Key Rule:</strong> A chord connects any 2 points on the circumference. The diameter is the longest chord. A tangent touches at 1 point and meets the radius at 90°.
        </span>
        <button
          onClick={() => {
            setActivePart('centre');
            setRadiusAngle(30);
            setDiaAngle(150);
            setChordAngle1(40);
            setChordAngle2(200);
            setTangentAngle(315);
          }}
          className="ml-4 px-3 py-1.5 bg-white text-emerald-800 border border-emerald-300 rounded-xl text-xs font-black hover:bg-emerald-100 active:scale-95 flex items-center gap-1 shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};

