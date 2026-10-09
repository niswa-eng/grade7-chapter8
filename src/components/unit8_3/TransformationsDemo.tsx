import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, RotateCw, FlipHorizontal, MoveHorizontal } from 'lucide-react';

export const TransformationsDemo: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'rotated' | 'reflected' | 'translated'>('rotated');
  const [animProgress, setAnimProgress] = useState<number>(0); // 0 to 1
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Animation Loop
  useEffect(() => {
    let animId: number;
    if (isPlaying) {
      const startTime = performance.now() - animProgress * 2000;
      const duration = 2000;

      const animate = (time: number) => {
        const elapsed = time - startTime;
        const p = Math.min(1, elapsed / duration);
        setAnimProgress(p);
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

  const handlePlayToggle = () => {
    if (animProgress >= 1) {
      setAnimProgress(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setAnimProgress(0);
  };

  const handleModeChange = (mode: 'rotated' | 'reflected' | 'translated') => {
    setActiveMode(mode);
    setIsPlaying(false);
    setAnimProgress(0);
  };

  // Base L-shape centered at (0, 0)
  // Width: 50, Height: 60
  const lPath = '-25,-30 25,-30 25,-10 -5,-10 -5,30 -25,30';

  // Centre of Rotation (Point O)
  const originX = 190;
  const originY = 190;
  const rotRadius = 100;

  // Target Shape B position
  const targetX = originX + rotRadius * Math.cos((-45 * Math.PI) / 180); // ~260.7 px
  const targetY = originY + rotRadius * Math.sin((-45 * Math.PI) / 180); // ~119.3 px

  // Starting position of Shape A
  const startX = originX + rotRadius * Math.cos((-135 * Math.PI) / 180); // ~119.3 px
  const startY = originY + rotRadius * Math.sin((-135 * Math.PI) / 180); // ~119.3 px

  // Dynamic coordinates of moving Shape A
  let shapeAX = startX;
  let shapeAY = startY;
  let shapeAngle = 0;
  let shapeScaleX = 1;

  if (activeMode === 'rotated') {
    // Pure rotation around Centre of Rotation O (190, 190)
    const angleDeg = -135 + animProgress * 90;
    const rad = (angleDeg * Math.PI) / 180;
    shapeAX = originX + rotRadius * Math.cos(rad);
    shapeAY = originY + rotRadius * Math.sin(rad);
    shapeAngle = animProgress * 90;
    shapeScaleX = 1;
  } else if (activeMode === 'reflected') {
    // Mirror line at x = 190
    // Shape A starts on the left (unflipped, scaleX = 1)
    // As it flips over the mirror line, it ends on Shape B flipped (scaleX = -1)
    shapeAX = startX + animProgress * (targetX - startX);
    shapeAY = startY;
    shapeAngle = 0;
    shapeScaleX = Math.cos(animProgress * Math.PI);
  } else {
    // Translated: straight horizontal slide from left to right
    shapeAX = startX + animProgress * (targetX - startX);
    shapeAY = startY;
    shapeAngle = 0;
    shapeScaleX = 1;
  }

  // Circular trajectory arc for Rotated mode
  const rotArcPath = `M ${startX.toFixed(1)} ${startY.toFixed(1)} A ${rotRadius} ${rotRadius} 0 0 1 ${targetX.toFixed(1)} ${targetY.toFixed(1)}`;

  const isMatched = animProgress >= 0.98;

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-6xl mx-auto p-6 select-none overflow-y-auto">
      {/* Header */}
      <div>
        <span className="text-sm font-black text-orange-600 uppercase tracking-widest">
          Unit 8.3 · Congruent Shapes
        </span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          Same Shape, Different Position
        </h2>
        <p className="text-2xl font-bold text-slate-700 leading-snug">
          Congruent shapes remain congruent even if they are <span className="text-orange-600 font-extrabold">turned (rotated)</span>, <span className="text-fuchsia-600 font-extrabold">flipped (reflected)</span>, or <span className="text-blue-600 font-extrabold">slid (translated)</span>!
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-12 gap-8 items-center my-auto">
        {/* SVG Display Stage */}
        <div className="col-span-12 md:col-span-7 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl flex flex-col items-center justify-between min-h-[460px] relative">
          {/* Stage Subheader (clean, no numbers) */}
          <div className="w-full flex items-center justify-between mb-1">
            <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-slate-100 text-slate-800">
              {activeMode === 'rotated'
                ? 'Rotation around Centre (O)'
                : activeMode === 'reflected'
                ? 'Reflection across Mirror Line'
                : 'Translation (Slide)'}
            </span>
            <span className="text-xs font-bold text-slate-400">
              Grade 7 Geometry
            </span>
          </div>

          {/* SVG Canvas */}
          <div className="relative w-full flex items-center justify-center my-auto">
            <svg viewBox="0 0 380 270" className="w-full h-64 overflow-visible">
              {/* --- TRANSLATED MODE GUIDES --- */}
              {activeMode === 'translated' && (
                <g>
                  {/* Guideline line */}
                  <line x1={startX} y1={startY} x2={targetX} y2={targetY} stroke="#cbd5e1" strokeWidth="2.5" strokeDasharray="4 4" />
                  {/* Slide Direction Arrow */}
                  <line x1={startX} y1={startY + 45} x2={targetX} y2={targetY + 45} stroke="#2563eb" strokeWidth="2.5" />
                  <polygon points={`${targetX},${targetY + 45} ${targetX - 10},${targetY + 40} ${targetX - 10},${targetY + 50}`} fill="#2563eb" />
                  <text x={(startX + targetX) / 2} y={targetY + 65} textAnchor="middle" className="text-xs font-black fill-blue-800">
                    Slide Direction
                  </text>
                </g>
              )}

              {/* --- ROTATED MODE: ONLY CENTRE (O) AND ROTATION ARC --- */}
              {activeMode === 'rotated' && (
                <g>
                  {/* Circular Arc Trajectory */}
                  <path
                    d={rotArcPath}
                    fill="none"
                    stroke="#ea580c"
                    strokeWidth="2.5"
                    strokeDasharray="4 4"
                    opacity="0.6"
                  />

                  {/* Direction Arrow on Arc Apex */}
                  <g transform={`translate(${originX}, ${originY - rotRadius})`}>
                    <polygon points="6,0 -6,-4 -3,0 -6,4" fill="#ea580c" />
                  </g>

                  {/* Fixed Reference Line to Target Shape B */}
                  <line
                    x1={originX}
                    y1={originY}
                    x2={targetX}
                    y2={targetY}
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    opacity="0.6"
                  />

                  {/* Active Radial Line to Moving Shape A */}
                  <line
                    x1={originX}
                    y1={originY}
                    x2={shapeAX}
                    y2={shapeAY}
                    stroke="#ea580c"
                    strokeWidth="2.5"
                    strokeDasharray="4 4"
                  />

                  {/* CENTRE OF ROTATION (POINT O) */}
                  <g>
                    {/* Outer glow ring */}
                    <circle cx={originX} cy={originY} r="16" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" strokeDasharray="3 3" />
                    {/* Solid core pin */}
                    <circle cx={originX} cy={originY} r="7" fill="#ea580c" stroke="white" strokeWidth="2" />
                    <circle cx={originX} cy={originY} r="2.5" fill="white" />

                    {/* Centre Label Badge */}
                    <g transform={`translate(${originX}, ${originY + 28})`}>
                      <rect x="-75" y="-12" width="150" height="24" rx="12" fill="#fff7ed" stroke="#ea580c" strokeWidth="2" />
                      <text x="0" y="4" textAnchor="middle" className="text-xs font-black fill-orange-950 uppercase tracking-wide">
                        Centre of Rotation (O)
                      </text>
                    </g>
                  </g>
                </g>
              )}

              {/* --- REFLECTED MODE GUIDES --- */}
              {activeMode === 'reflected' && (
                <g>
                  {/* Mirror Line */}
                  <line x1={originX} y1="25" x2={originX} y2="245" stroke="#c026d3" strokeWidth="3" strokeDasharray="6 6" />
                  <g transform={`translate(${originX}, 20)`}>
                    <rect x="-55" y="-12" width="110" height="22" rx="11" fill="#fdf4ff" stroke="#c026d3" strokeWidth="1.5" />
                    <text x="0" y="3" textAnchor="middle" className="text-[10px] font-black fill-fuchsia-900 uppercase">
                      Mirror Line
                    </text>
                  </g>

                  {/* Connecting dashed line across mirror line */}
                  <line x1={startX} y1={startY} x2={targetX} y2={startY} stroke="#c026d3" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
                </g>
              )}

              {/* Target Partner Shape B on Right */}
              <g
                transform={
                  activeMode === 'rotated'
                    ? `translate(${targetX}, ${targetY}) rotate(90)`
                    : activeMode === 'reflected'
                    ? `translate(${targetX}, ${targetY}) scale(-1, 1)`
                    : `translate(${targetX}, ${targetY})`
                }
              >
                <polygon
                  points={lPath}
                  fill="#f8fafc"
                  stroke="#64748b"
                  strokeWidth="3.5"
                  strokeDasharray={isMatched ? 'none' : '4 4'}
                />
                <text x="0" y="-38" textAnchor="middle" className="text-xs font-black fill-slate-500">
                  Shape B (Target)
                </text>
              </g>

              {/* Moving Shape A */}
              <g
                transform={`translate(${shapeAX}, ${shapeAY}) rotate(${shapeAngle}) scale(${shapeScaleX}, 1)`}
              >
                <polygon
                  points={lPath}
                  fill={isMatched ? '#bbf7d0' : activeMode === 'rotated' ? '#fed7aa' : activeMode === 'reflected' ? '#fbcfe8' : '#bfdbfe'}
                  stroke={isMatched ? '#16a34a' : activeMode === 'rotated' ? '#ea580c' : activeMode === 'reflected' ? '#c026d3' : '#2563eb'}
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
                {!isMatched && (
                  <text
                    x="0"
                    y="5"
                    textAnchor="middle"
                    className={`text-xs font-black ${activeMode === 'rotated' ? 'fill-orange-800' : activeMode === 'reflected' ? 'fill-fuchsia-800' : 'fill-blue-800'}`}
                  >
                    Shape A
                  </text>
                )}
              </g>
            </svg>
          </div>

          {/* Interactive Controls (Clean & Simple) */}
          <div className="w-full mt-2 p-3 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={handlePlayToggle}
                className={`px-4 py-2 rounded-xl text-white font-black text-xs flex items-center gap-1.5 active:scale-95 transition-all shadow-sm ${
                  isPlaying ? 'bg-amber-600 hover:bg-amber-700' : 'bg-slate-900 hover:bg-slate-800'
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isPlaying ? 'Pause' : animProgress >= 1 ? 'Replay' : 'Play'}</span>
              </button>

              <div className="flex-1 flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-500">Transform:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={Math.round(animProgress * 100)}
                  onChange={(e) => {
                    setIsPlaying(false);
                    setAnimProgress(parseFloat(e.target.value) / 100);
                  }}
                  className="flex-1 accent-orange-600 cursor-pointer"
                />
              </div>

              <button
                onClick={handleReset}
                className="px-3 py-2 rounded-xl bg-white text-slate-700 border border-slate-300 font-bold text-xs hover:bg-slate-100 active:scale-95 flex items-center gap-1"
                title="Reset animation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Match Status Banner */}
            <div
              className={`p-2 rounded-xl text-center text-xs font-black transition-all border ${
                isMatched
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  : 'bg-white text-slate-700 border-slate-200'
              }`}
            >
              {isMatched ? (
                <div className="flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span>
                    Exact Match! All sides &amp; angles align perfectly → Shape A ≅ Shape B (Congruent).
                  </span>
                </div>
              ) : (
                <span>
                  {activeMode === 'rotated'
                    ? 'Shape A turns around Centre (O) along the curved path onto Shape B.'
                    : activeMode === 'reflected'
                    ? 'Shape A flips across the mirror line onto Shape B.'
                    : 'Shape A slides across along a straight line onto Shape B.'}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Modes & Step-by-Step Instructions */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-3">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            Select Transformation to Test:
          </span>

          <div className="grid grid-cols-1 gap-2.5">
            {/* 1. Rotated */}
            <button
              onClick={() => handleModeChange('rotated')}
              className={`p-3.5 rounded-2xl text-left border-2 font-black transition-all ${
                activeMode === 'rotated'
                  ? 'bg-orange-600 text-white border-orange-700 shadow-xl scale-101'
                  : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-base flex items-center gap-1.5">
                  <RotateCw className="w-4 h-4" /> 1. Rotated (Turned)
                </span>
                <span className={`text-[10px] uppercase px-2 py-0.5 rounded ${activeMode === 'rotated' ? 'bg-orange-800 text-orange-100' : 'bg-slate-100 text-slate-700'}`}>
                  Turn Test
                </span>
              </div>
              <p className={`text-xs mt-1 ${activeMode === 'rotated' ? 'text-orange-100' : 'text-slate-500'}`}>
                Turns around Centre of Rotation (Point O).
              </p>
            </button>

            {/* 2. Reflected */}
            <button
              onClick={() => handleModeChange('reflected')}
              className={`p-3.5 rounded-2xl text-left border-2 font-black transition-all ${
                activeMode === 'reflected'
                  ? 'bg-fuchsia-600 text-white border-fuchsia-700 shadow-xl scale-101'
                  : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-base flex items-center gap-1.5">
                  <FlipHorizontal className="w-4 h-4" /> 2. Reflected (Flipped)
                </span>
                <span className={`text-[10px] uppercase px-2 py-0.5 rounded ${activeMode === 'reflected' ? 'bg-fuchsia-800 text-fuchsia-100' : 'bg-slate-100 text-slate-700'}`}>
                  Mirror Test
                </span>
              </div>
              <p className={`text-xs mt-1 ${activeMode === 'reflected' ? 'text-fuchsia-100' : 'text-slate-500'}`}>
                Flips across the mirror line into a mirror image.
              </p>
            </button>

            {/* 3. Translated */}
            <button
              onClick={() => handleModeChange('translated')}
              className={`p-3.5 rounded-2xl text-left border-2 font-black transition-all ${
                activeMode === 'translated'
                  ? 'bg-blue-600 text-white border-blue-700 shadow-xl scale-101'
                  : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-base flex items-center gap-1.5">
                  <MoveHorizontal className="w-4 h-4" /> 3. Translated (Slid)
                </span>
                <span className={`text-[10px] uppercase px-2 py-0.5 rounded ${activeMode === 'translated' ? 'bg-blue-800 text-blue-100' : 'bg-slate-100 text-slate-700'}`}>
                  Slide Test
                </span>
              </div>
              <p className={`text-xs mt-1 ${activeMode === 'translated' ? 'text-blue-100' : 'text-slate-500'}`}>
                Slides along a straight line without turning or flipping.
              </p>
            </button>
          </div>

          {/* Student-Facing Step-by-Step Instructions Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs">
            <span className="font-black uppercase tracking-wider text-slate-700 block mb-1.5">
              Instruction for {activeMode === 'rotated' ? 'Rotation' : activeMode === 'reflected' ? 'Reflection' : 'Translation'}:
            </span>
            {activeMode === 'rotated' && (
              <div className="space-y-1.5 text-slate-700 font-bold leading-relaxed">
                <p>
                  <strong>1. Centre of Rotation (O):</strong> Look at the orange pin <strong>Centre (O)</strong>. The shape turns around this fixed centre point.
                </p>
                <p>
                  <strong>2. Turn around Centre O:</strong> Click Play or drag the slider. Shape A turns around Centre O along the curved path until it lands on Shape B.
                </p>
                <p>
                  <strong>3. Conclusion:</strong> Turning does not change side lengths or angles. Because Shape A fits Shape B exactly, they are <strong>CONGRUENT</strong>!
                </p>
              </div>
            )}
            {activeMode === 'reflected' && (
              <div className="space-y-1.5 text-slate-700 font-bold leading-relaxed">
                <p>
                  <strong>1. Mirror Line:</strong> Shape A and Shape B face each other across the mirror line as mirror images.
                </p>
                <p>
                  <strong>2. Flip across Mirror Line:</strong> Click Play or drag the slider. Shape A flips across the line and lands directly on Shape B.
                </p>
                <p>
                  <strong>3. Conclusion:</strong> Flipping creates a mirror image, but all side lengths and angles stay identical. Therefore, Shape A and Shape B are <strong>CONGRUENT</strong>!
                </p>
              </div>
            )}
            {activeMode === 'translated' && (
              <div className="space-y-1.5 text-slate-700 font-bold leading-relaxed">
                <p>
                  <strong>1. Slide along a Line:</strong> Shape A has the exact same orientation.
                </p>
                <p>
                  <strong>2. Action:</strong> Click Play or drag the slider to slide Shape A across to Shape B.
                </p>
                <p>
                  <strong>3. Conclusion:</strong> Sliding only changes position. All dimensions match perfectly, so Shape A and Shape B are <strong>CONGRUENT</strong>!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Rule */}
      <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-orange-950 font-bold text-base flex items-center justify-between">
        <span>
          <strong>Cambridge Rule:</strong> Turn it (around Centre O), slide it, or flip it (across a mirror line) — if all side lengths and angles match and the shape fits exactly, it is <strong>CONGRUENT</strong>.
        </span>
      </div>
    </div>
  );
};
