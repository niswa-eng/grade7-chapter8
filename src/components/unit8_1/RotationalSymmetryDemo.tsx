import React, { useState, useEffect } from 'react';
import { RotateCw, RotateCcw, Play, Sparkles } from 'lucide-react';

interface ShapeTest {
  id: string;
  name: string;
  order: number;
  matchAngles: number[]; // degrees where shape matches original
  renderShape: (color: string) => React.ReactNode;
}

export const RotationalSymmetryDemo: React.FC = () => {
  const [selectedShapeId, setSelectedShapeId] = useState<string>('triangle');
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(false);
  const [justMatched, setJustMatched] = useState<boolean>(false);

  const shapes: ShapeTest[] = [
    {
      id: 'triangle',
      name: 'Equilateral Triangle',
      order: 3,
      matchAngles: [120, 240, 360],
      renderShape: (color) => (
        <polygon points="150,45 250,225 50,225" fill={color} stroke="#1d4ed8" strokeWidth="4" />
      )
    },
    {
      id: 'square',
      name: 'Square',
      order: 4,
      matchAngles: [90, 180, 270, 360],
      renderShape: (color) => (
        <rect x="65" y="65" width="170" height="170" rx="2" fill={color} stroke="#1d4ed8" strokeWidth="4" />
      )
    },
    {
      id: 'rectangle',
      name: 'Rectangle',
      order: 2,
      matchAngles: [180, 360],
      renderShape: (color) => (
        <rect x="40" y="90" width="220" height="120" rx="2" fill={color} stroke="#1d4ed8" strokeWidth="4" />
      )
    },
    {
      id: 'scalene',
      name: 'Scalene Triangle',
      order: 1,
      matchAngles: [360],
      renderShape: (color) => (
        <polygon points="70,55 255,165 60,235" fill={color} stroke="#1d4ed8" strokeWidth="4" />
      )
    }
  ];

  const currentShape = shapes.find((s) => s.id === selectedShapeId) || shapes[0];

  // Count matches up to current angle
  const matchesCount = currentShape.matchAngles.filter(
    (a) => rotationAngle >= a - 3 && rotationAngle >= a
  ).length;

  const isCurrentlyMatching = currentShape.matchAngles.some(
    (a) => Math.abs(rotationAngle - a) < 4
  );

  // Trigger match glow animation
  useEffect(() => {
    if (isCurrentlyMatching) {
      setJustMatched(true);
      const t = setTimeout(() => setJustMatched(false), 800);
      return () => clearTimeout(t);
    }
  }, [isCurrentlyMatching]);

  // Auto rotation
  useEffect(() => {
    let animId: number;
    if (isAutoRotating) {
      const step = () => {
        setRotationAngle((prev) => {
          if (prev >= 360) {
            setIsAutoRotating(false);
            return 360;
          }
          return Math.min(360, prev + 1.2);
        });
        animId = requestAnimationFrame(step);
      };
      animId = requestAnimationFrame(step);
    }
    return () => cancelAnimationFrame(animId);
  }, [isAutoRotating]);

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-6xl mx-auto p-6 select-none">
      <div>
        <span className="text-sm font-black text-blue-600 uppercase tracking-widest">
          Unit 8.1 · Concept 3
        </span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          Rotational Symmetry &amp; Full Turn Test
        </h2>
        <p className="text-2xl font-bold text-slate-700 leading-snug">
          Rotate the shape one full turn (360°) about the <span className="text-orange-600 font-extrabold">orange centre point</span>. How many times does it fit onto its original outline?
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8 items-center my-auto">
        {/* SVG Rotating Canvas */}
        <div className="col-span-12 md:col-span-7 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl flex flex-col items-center justify-center min-h-[420px] relative">
          <svg viewBox="0 0 300 300" className="w-80 h-80 overflow-visible">
            {/* Ghost outline staying behind */}
            <g opacity="0.35">
              {currentShape.renderShape('#e2e8f0')}
            </g>

            {/* Rotating Shape */}
            <g
              style={{
                transformOrigin: '150px 150px',
                transform: `rotate(${rotationAngle}deg)`,
                transition: isAutoRotating ? 'none' : 'transform 0.05s ease-out'
              }}
            >
              {currentShape.renderShape(isCurrentlyMatching ? '#bbf7d0' : '#dbeafe')}

              {/* Direction Marker dot on top corner */}
              <circle cx="150" cy="50" r="7" fill="#dc2626" />
            </g>

            {/* Orange Centre Point of Rotation */}
            <circle cx="150" cy="150" r="8" fill="#ea580c" stroke="#ffffff" strokeWidth="2.5" />
            <circle cx="150" cy="150" r="16" fill="none" stroke="#ea580c" strokeWidth="2" strokeDasharray="3 3" />
          </svg>

          {/* Live Fits Counter & Match Flash */}
          <div className="mt-4 flex items-center gap-4">
            <div
              className={`px-6 py-3 rounded-2xl border-2 flex items-center gap-3 transition-all duration-300 ${
                justMatched
                  ? 'bg-emerald-500 text-white border-emerald-600 scale-110 shadow-lg shadow-emerald-500/40 ring-4 ring-emerald-300'
                  : 'bg-slate-100 text-slate-800 border-slate-300'
              }`}
            >
              <Sparkles className="w-7 h-7 fill-current" />
              <span className="text-2xl font-black font-mono tabular-nums">
                Looks the same: {matchesCount} / {currentShape.order}
              </span>
            </div>
          </div>
        </div>

        {/* Controls & Angle Slider */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
          {/* Shape Selector */}
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2 block">
              Choose Shape:
            </span>
            <div className="grid grid-cols-2 gap-2">
              {shapes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelectedShapeId(s.id);
                    setRotationAngle(0);
                    setIsAutoRotating(false);
                  }}
                  className={`p-3.5 rounded-2xl text-left border-2 font-black transition-all ${
                    selectedShapeId === s.id
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                      : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-base leading-tight">{s.name}</div>
                  <div className={`text-xs mt-1 ${selectedShapeId === s.id ? 'text-amber-300' : 'text-slate-500'}`}>
                    Order: {s.order}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Rotation Controls */}
          <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => {
                  setRotationAngle(0);
                  setIsAutoRotating(true);
                }}
                className="flex-1 h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 active:scale-95"
              >
                <Play className="w-6 h-6 fill-current" />
                <span>Full Turn (360°)</span>
              </button>

              <button
                onClick={() => {
                  setIsAutoRotating(false);
                  setRotationAngle(0);
                }}
                className="w-16 h-16 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center active:scale-95 border-2 border-slate-200"
                title="Reset angle to 0°"
              >
                <RotateCcw className="w-7 h-7" />
              </button>
            </div>

            {/* Slider */}
            <div>
              <div className="flex justify-between text-sm font-extrabold text-slate-700 mb-1">
                <span>Angle of Turn:</span>
                <span className="font-mono text-blue-700 text-lg tabular-nums">
                  {Math.round(rotationAngle)}° / 360°
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                step="1"
                value={rotationAngle}
                onChange={(e) => {
                  setIsAutoRotating(false);
                  setRotationAngle(parseFloat(e.target.value));
                }}
                className="w-full h-4 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>

          {/* Quick Match Snap Buttons */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-xs font-black uppercase text-slate-500 block mb-2">
              Match Angles for this Shape:
            </span>
            <div className="flex gap-2 flex-wrap">
              {currentShape.matchAngles.map((ang) => (
                <button
                  key={ang}
                  onClick={() => {
                    setIsAutoRotating(false);
                    setRotationAngle(ang);
                  }}
                  className={`px-4 py-2 rounded-xl font-mono font-black text-base transition-all ${
                    Math.abs(rotationAngle - ang) < 3
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {ang}°
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 font-bold text-lg">
        Classroom note: The red reference dot shows how far the shape has turned! An orange dot marks the centre of rotation.
      </div>
    </div>
  );
};
