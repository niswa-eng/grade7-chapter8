import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCcw, Play, Pause, Sparkles, Check, ChevronRight } from 'lucide-react';

interface ShapeTest {
  id: string;
  name: string;
  order: number;
  matchAngles: number[]; // degrees where shape matches original
  pinPoint: { x: number; y: number }; // location of reference indicator pin
  renderShape: (fillColor: string, strokeColor?: string) => React.ReactNode;
}

export const RotationalSymmetryDemo: React.FC = () => {
  const [selectedShapeId, setSelectedShapeId] = useState<string>('triangle');
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [justMatched, setJustMatched] = useState<boolean>(false);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const isDraggingRef = useRef<boolean>(false);

  // Exact geometric coordinates centered at (150, 150)
  const shapes: ShapeTest[] = [
    {
      id: 'triangle',
      name: 'Equilateral Triangle',
      order: 3,
      matchAngles: [120, 240, 360],
      pinPoint: { x: 150, y: 60 },
      renderShape: (fillColor, strokeColor = '#1d4ed8') => {
        // Centroid at (150, 150), radius = 90
        // Top: (150, 60)
        // Bottom Right: (150 + 90 * sqrt(3)/2, 150 + 45) = (227.94, 195)
        // Bottom Left: (150 - 90 * sqrt(3)/2, 150 + 45) = (72.06, 195)
        return (
          <polygon
            points="150,60 227.94,195 72.06,195"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="4"
            strokeLinejoin="round"
          />
        );
      }
    },
    {
      id: 'square',
      name: 'Square',
      order: 4,
      matchAngles: [90, 180, 270, 360],
      pinPoint: { x: 75, y: 75 },
      renderShape: (fillColor, strokeColor = '#1d4ed8') => (
        <rect
          x="75"
          y="75"
          width="150"
          height="150"
          rx="2"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="4"
        />
      )
    },
    {
      id: 'rectangle',
      name: 'Rectangle',
      order: 2,
      matchAngles: [180, 360],
      pinPoint: { x: 60, y: 100 },
      renderShape: (fillColor, strokeColor = '#1d4ed8') => (
        <rect
          x="60"
          y="100"
          width="180"
          height="100"
          rx="2"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="4"
        />
      )
    },
    {
      id: 'parallelogram',
      name: 'Parallelogram',
      order: 2,
      matchAngles: [180, 360],
      pinPoint: { x: 90, y: 110 },
      renderShape: (fillColor, strokeColor = '#1d4ed8') => (
        <polygon
          points="90,110 230,110 210,190 70,190"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="4"
          strokeLinejoin="round"
        />
      )
    },
    {
      id: 'hexagon',
      name: 'Regular Hexagon',
      order: 6,
      matchAngles: [60, 120, 180, 240, 300, 360],
      pinPoint: { x: 150, y: 65 },
      renderShape: (fillColor, strokeColor = '#1d4ed8') => {
        // Radius = 85, center (150, 150)
        const pts = [0, 1, 2, 3, 4, 5].map((k) => {
          const ang = (-90 + k * 60) * (Math.PI / 180);
          return `${(150 + 85 * Math.cos(ang)).toFixed(1)},${(150 + 85 * Math.sin(ang)).toFixed(1)}`;
        }).join(' ');
        return (
          <polygon
            points={pts}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="4"
            strokeLinejoin="round"
          />
        );
      }
    },
    {
      id: 'scalene',
      name: 'Scalene Triangle',
      order: 1,
      matchAngles: [360],
      pinPoint: { x: 120, y: 65 },
      renderShape: (fillColor, strokeColor = '#1d4ed8') => (
        <polygon
          points="120,65 235,170 95,215"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="4"
          strokeLinejoin="round"
        />
      )
    }
  ];

  const currentShape = shapes.find((s) => s.id === selectedShapeId) || shapes[0];

  // Count matches achieved up to current angle
  const matchesCount = currentShape.matchAngles.filter(
    (a) => rotationAngle >= a - 2.5
  ).length;

  const isCurrentlyMatching = currentShape.matchAngles.some(
    (a) => Math.abs(rotationAngle - a) < 3.5
  );

  // Trigger match glow pulse
  useEffect(() => {
    if (isCurrentlyMatching) {
      setJustMatched(true);
      const t = setTimeout(() => setJustMatched(false), 900);
      return () => clearTimeout(t);
    }
  }, [isCurrentlyMatching]);

  // Smooth auto-rotation animation loop
  useEffect(() => {
    let animId: number;
    if (isPlaying) {
      const step = () => {
        setRotationAngle((prev) => {
          if (prev >= 360) {
            setIsPlaying(false);
            return 360;
          }
          return Math.min(360, prev + 1.25);
        });
        animId = requestAnimationFrame(step);
      };
      animId = requestAnimationFrame(step);
    }
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  // Calculate pointer angle from SVG center (150, 150)
  const handlePointerMove = useCallback((e: React.PointerEvent<SVGSVGElement> | PointerEvent) => {
    if (!isDraggingRef.current || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    // atan2 gives angle from positive X axis (-PI to +PI)
    // We want 0 at top (negative Y):
    let deg = Math.atan2(y, x) * (180 / Math.PI) + 90;
    if (deg < 0) deg += 360;

    // Snap to match angles if very close (within 4 degrees)
    for (const matchAng of currentShape.matchAngles) {
      if (Math.abs(deg - matchAng) < 4) {
        deg = matchAng;
        break;
      }
    }

    setRotationAngle(Math.round(deg * 10) / 10);
  }, [currentShape]);

  const handlePointerUp = useCallback(() => {
    isDraggingRef.current = false;
    window.removeEventListener('pointerup', handlePointerUp);
    window.removeEventListener('pointermove', handlePointerMove as any);
  }, [handlePointerMove]);

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    setIsPlaying(false);
    isDraggingRef.current = true;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointermove', handlePointerMove as any);
    handlePointerMove(e);
  };

  // Step to next match position
  const handleNextMatch = () => {
    setIsPlaying(false);
    const nextMatch = currentShape.matchAngles.find((a) => a > rotationAngle + 1);
    if (nextMatch !== undefined) {
      setRotationAngle(nextMatch);
    } else {
      setRotationAngle(0);
    }
  };

  // SVG Arc generator for showing angle rotated
  const getArcPath = (angle: number, radius: number = 38) => {
    if (angle <= 0) return '';
    const startAngle = -90; // Start at top
    const endAngle = -90 + Math.min(angle, 359.9);
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = 150 + radius * Math.cos(startRad);
    const y1 = 150 + radius * Math.sin(startRad);
    const x2 = 150 + radius * Math.cos(endRad);
    const y2 = 150 + radius * Math.sin(endRad);

    const largeArcFlag = angle > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
  };

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
        {/* SVG Interactive Rotating Canvas */}
        <div className="col-span-12 md:col-span-7 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl flex flex-col items-center justify-center min-h-[430px] relative">
          <svg
            ref={svgRef}
            viewBox="0 0 300 300"
            className="w-80 h-80 overflow-visible cursor-grab active:cursor-grabbing touch-none"
            onPointerDown={handlePointerDown}
          >
            {/* Outer Reference Dial / Protractor ring */}
            <circle cx="150" cy="150" r="142" fill="none" stroke="#e2e8f0" strokeWidth="1.5" />
            
            {/* Angle tick marks at 0, 90, 180, 270 */}
            {[0, 90, 180, 270].map((deg) => {
              const rad = (deg - 90) * (Math.PI / 180);
              const x1 = 150 + 138 * Math.cos(rad);
              const y1 = 150 + 138 * Math.sin(rad);
              const x2 = 150 + 144 * Math.cos(rad);
              const y2 = 150 + 144 * Math.sin(rad);
              return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#94a3b8" strokeWidth="2" />;
            })}

            {/* Target Match angle markers on the outer rim */}
            {currentShape.matchAngles.map((ang) => {
              const rad = (ang - 90) * (Math.PI / 180);
              const mx = 150 + 142 * Math.cos(rad);
              const my = 150 + 142 * Math.sin(rad);
              const isAchieved = rotationAngle >= ang - 2.5;
              return (
                <g key={ang}>
                  <circle
                    cx={mx}
                    cy={my}
                    r={isAchieved ? 5.5 : 4}
                    fill={isAchieved ? '#10b981' : '#cbd5e1'}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  <text
                    x={150 + 130 * Math.cos(rad)}
                    y={150 + 130 * Math.sin(rad) + 4}
                    textAnchor="middle"
                    className={`text-[9px] font-black ${isAchieved ? 'fill-emerald-700 font-bold' : 'fill-slate-400'}`}
                  >
                    {ang}°
                  </text>
                </g>
              );
            })}

            {/* Angle Sweep Arc & Degrees */}
            {rotationAngle > 4 && (
              <g>
                <path
                  d={getArcPath(rotationAngle, 38)}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </g>
            )}

            {/* 1. Ghost Original Outline (Fixed at 0 degrees) */}
            <g opacity="0.32">
              {currentShape.renderShape('#cbd5e1', '#64748b')}
              {/* Original Pin Ghost ring */}
              <circle
                cx={currentShape.pinPoint.x}
                cy={currentShape.pinPoint.y}
                r="7"
                fill="none"
                stroke="#dc2626"
                strokeWidth="2"
                strokeDasharray="2 2"
              />
            </g>

            {/* 2. Rotating Shape (Mathematically centered at 150, 150) */}
            <g
              style={{
                transformOrigin: '150px 150px',
                transform: `rotate(${rotationAngle}deg)`,
                transition: isPlaying ? 'none' : 'transform 0.04s ease-out'
              }}
            >
              {currentShape.renderShape(
                isCurrentlyMatching ? '#bbf7d0' : '#dbeafe',
                isCurrentlyMatching ? '#15803d' : '#1d4ed8'
              )}

              {/* Red Reference Pin at exact vertex */}
              <circle
                cx={currentShape.pinPoint.x}
                cy={currentShape.pinPoint.y}
                r="7.5"
                fill="#dc2626"
                stroke="#ffffff"
                strokeWidth="2"
              />
            </g>

            {/* 3. Orange Centre Point of Rotation */}
            <circle cx="150" cy="150" r="8" fill="#ea580c" stroke="#ffffff" strokeWidth="2.5" />
            <circle cx="150" cy="150" r="16" fill="none" stroke="#ea580c" strokeWidth="2" strokeDasharray="3 3" />
          </svg>

          {/* Live Fits Counter & Match Flash Badge */}
          <div className="mt-4 flex items-center gap-3">
            <div
              className={`px-6 py-3 rounded-2xl border-2 flex items-center gap-3 transition-all duration-300 ${
                justMatched
                  ? 'bg-emerald-500 text-white border-emerald-600 scale-105 shadow-lg shadow-emerald-500/30'
                  : 'bg-slate-100 text-slate-800 border-slate-300'
              }`}
            >
              <Sparkles className="w-6 h-6 fill-current" />
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
              Shapes:
            </span>
            <div className="grid grid-cols-2 gap-2">
              {shapes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelectedShapeId(s.id);
                    setRotationAngle(0);
                    setIsPlaying(false);
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
                  if (rotationAngle >= 360) setRotationAngle(0);
                  setIsPlaying(!isPlaying);
                }}
                className={`flex-1 h-14 rounded-2xl font-black text-lg flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 ${
                  isPlaying
                    ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/30'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30'
                }`}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                <span>{isPlaying ? 'Pause' : 'Full Turn (360°)'}</span>
              </button>

              <button
                onClick={handleNextMatch}
                className="px-4 h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center gap-1.5 active:scale-95 shadow-md shadow-emerald-600/20"
                title="Rotate to next match"
              >
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  setIsPlaying(false);
                  setRotationAngle(0);
                }}
                className="w-14 h-14 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center active:scale-95 border-2 border-slate-200"
                title="Reset"
              >
                <RotateCcw className="w-6 h-6" />
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
                  setIsPlaying(false);
                  setRotationAngle(parseFloat(e.target.value));
                }}
                className="w-full h-4 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>

          {/* Quick Match Snap Buttons */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-xs font-black uppercase text-slate-500 block mb-2">
              Angles of Match:
            </span>
            <div className="flex gap-2 flex-wrap">
              {currentShape.matchAngles.map((ang, idx) => {
                const isReached = rotationAngle >= ang - 2.5;
                const isSelected = Math.abs(rotationAngle - ang) < 3;
                return (
                  <button
                    key={ang}
                    onClick={() => {
                      setIsPlaying(false);
                      setRotationAngle(ang);
                    }}
                    className={`px-3.5 py-2 rounded-xl font-mono font-black text-sm flex items-center gap-1.5 transition-all ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-md scale-105'
                        : isReached
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {isReached && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    <span>{ang}°</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 font-bold text-lg">
        <span>The red dot marks the reference vertex. The orange dot marks the centre of rotation.</span>
      </div>
    </div>
  );
};

