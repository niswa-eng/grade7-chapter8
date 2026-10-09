import React, { useState, useEffect } from 'react';
import { Divide, Equal, AlertTriangle, CheckCircle2, RotateCw, RotateCcw, Play, Pause, Sparkles } from 'lucide-react';

interface OrderExample {
  order: number;
  shapeName: string;
  hasSymmetry: boolean;
  angleStep: number;
}

export const OrderOfRotationDemo: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<number>(4);
  const [currentAngle, setCurrentAngle] = useState<number>(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState<boolean>(false);
  const [highlightMatch, setHighlightMatch] = useState<boolean>(false);

  const orderExamples: OrderExample[] = [
    { order: 1, shapeName: 'Scalene Triangle / Kite', hasSymmetry: false, angleStep: 360 },
    { order: 2, shapeName: 'Rectangle / Parallelogram', hasSymmetry: true, angleStep: 180 },
    { order: 3, shapeName: 'Equilateral Triangle', hasSymmetry: true, angleStep: 120 },
    { order: 4, shapeName: 'Square', hasSymmetry: true, angleStep: 90 },
    { order: 5, shapeName: 'Regular Pentagon', hasSymmetry: true, angleStep: 72 },
    { order: 6, shapeName: 'Regular Hexagon', hasSymmetry: true, angleStep: 60 },
    { order: 8, shapeName: 'Regular Octagon', hasSymmetry: true, angleStep: 45 }
  ];

  const current = orderExamples.find((o) => o.order === selectedOrder) || orderExamples[3];

  // Reset angle when changing order
  const handleSelectOrder = (orderNum: number) => {
    setSelectedOrder(orderNum);
    setCurrentAngle(0);
    setIsAutoSpinning(false);
  };

  // Step rotation by exactly angleStep degrees
  const handleStepTurn = () => {
    setIsAutoSpinning(false);
    if (current.order === 1) {
      if (currentAngle >= 360) {
        // Reset instantly then spin 360 smoothly
        setCurrentAngle(0);
        setTimeout(() => {
          setCurrentAngle(360);
          triggerMatchPulse();
        }, 60);
      } else {
        setCurrentAngle(360);
        triggerMatchPulse();
      }
      return;
    }
    setCurrentAngle((prev) => {
      const next = prev + current.angleStep;
      return next > 360 ? current.angleStep : next;
    });
    triggerMatchPulse();
  };

  const triggerMatchPulse = () => {
    setHighlightMatch(true);
    setTimeout(() => setHighlightMatch(false), 1000);
  };

  // Auto spinning loop with slow, comfortable pace for students
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoSpinning) {
      // Slower pace: 2200ms per step for regular orders, 3200ms for order 1
      const stepDuration = current.order === 1 ? 3200 : 2200;
      interval = setInterval(() => {
        setCurrentAngle((prev) => {
          if (prev >= 360) {
            setIsAutoSpinning(false);
            return 360;
          }
          const next = prev + current.angleStep;
          if (next >= 360) {
            setIsAutoSpinning(false);
            return 360;
          }
          return next;
        });
        triggerMatchPulse();
      }, stepDuration);
    }
    return () => clearInterval(interval);
  }, [isAutoSpinning, current.angleStep, current.order]);

  // Calculate matches count
  const currentStepNum = Math.min(
    current.order,
    Math.round(currentAngle / current.angleStep)
  );

  // Render polygon points for order N
  const renderShapeForOrder = (order: number) => {
    const cx = 110;
    const cy = 110;
    if (order === 1) {
      // Scalene triangle
      return (
        <polygon
          points="80,50 170,120 70,155"
          fill="#dbeafe"
          stroke="#2563eb"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
      );
    }
    if (order === 2) {
      // Rectangle
      return (
        <rect
          x="45"
          y="75"
          width="130"
          height="70"
          rx="3"
          fill="#dbeafe"
          stroke="#2563eb"
          strokeWidth="3.5"
        />
      );
    }
    // Regular polygon of N sides
    const R = 65;
    const pts: string[] = [];
    for (let i = 0; i < order; i++) {
      const ang = (-90 + (i * 360) / order) * (Math.PI / 180);
      pts.push(`${(cx + R * Math.cos(ang)).toFixed(1)},${(cy + R * Math.sin(ang)).toFixed(1)}`);
    }
    return (
      <polygon
        points={pts.join(' ')}
        fill="#dbeafe"
        stroke="#2563eb"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
    );
  };

  // Get indicator pin coordinate at starting top vertex
  const getPinCoordinate = (order: number) => {
    if (order === 1) return { x: 80, y: 50 };
    if (order === 2) return { x: 45, y: 75 };
    return { x: 110, y: 45 };
  };

  const pin = getPinCoordinate(selectedOrder);

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-6xl mx-auto p-6 select-none">
      <div>
        <span className="text-sm font-black text-blue-600 uppercase tracking-widest">
          Unit 8.1 · Concept 4
        </span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          Order of Rotational Symmetry
        </h2>
        <p className="text-2xl font-bold text-slate-700 leading-snug">
          The <span className="text-blue-600 font-extrabold">order of rotational symmetry</span> is the number of times a shape looks identical in one 360° turn.
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-12 gap-8 items-center my-auto">
        {/* Left Interactive Animated Simulation */}
        <div className="col-span-12 md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl flex flex-col items-center justify-center min-h-[380px] relative">
          <svg viewBox="0 0 220 220" className="w-64 h-64 overflow-visible">
            {/* Background circular sector pie slices */}
            {Array.from({ length: current.order }).map((_, i) => {
              const startA = -90 + (i * 360) / current.order;
              const rad = (startA * Math.PI) / 180;
              const x2 = 110 + 95 * Math.cos(rad);
              const y2 = 110 + 95 * Math.sin(rad);
              return (
                <line
                  key={i}
                  x1="110"
                  y1="110"
                  x2={x2}
                  y2={y2}
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
              );
            })}
            <circle cx="110" cy="110" r="95" fill="none" stroke="#e2e8f0" strokeWidth="2" />

            {/* Ghost outline */}
            <g opacity="0.3">
              {renderShapeForOrder(selectedOrder)}
            </g>

            {/* Rotating Shape */}
            <g
              style={{
                transformOrigin: '110px 110px',
                transform: `rotate(${currentAngle}deg)`,
                transition:
                  currentAngle === 0
                    ? 'none'
                    : `transform ${current.order === 1 ? '2.5s' : '1.3s'} cubic-bezier(0.25, 1, 0.5, 1)`
              }}
            >
              {renderShapeForOrder(selectedOrder)}

              {/* Red reference pin */}
              <circle
                cx={pin.x}
                cy={pin.y}
                r="6"
                fill="#dc2626"
                stroke="#ffffff"
                strokeWidth="2"
              />
            </g>

            {/* Centre point */}
            <circle cx="110" cy="110" r="7" fill="#ea580c" stroke="#ffffff" strokeWidth="2" />
          </svg>

          {/* Interactive Turn Stepper Controls */}
          <div className="flex items-center gap-2 mt-2 w-full">
            <button
              onClick={handleStepTurn}
              className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
            >
              <RotateCw className="w-4 h-4" />
              <span>{current.order === 1 ? 'Test Full Turn (360°)' : `Step Turn (+${current.angleStep}°)`}</span>
            </button>

            <button
              onClick={() => {
                if (currentAngle >= 360) setCurrentAngle(0);
                setIsAutoSpinning(!isAutoSpinning);
              }}
              className="px-3 h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1 active:scale-95"
            >
              {isAutoSpinning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                setIsAutoSpinning(false);
                setCurrentAngle(0);
              }}
              className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center border border-slate-200 active:scale-95"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Live Match Counter Badge */}
          <div className="mt-3 flex items-center justify-between w-full px-2">
            <span className="text-xs font-mono font-bold text-slate-500">
              Angle: {currentAngle}° / 360°
            </span>
            <div
              className={`px-3 py-1 rounded-xl text-xs font-black font-mono transition-all ${
                highlightMatch
                  ? 'bg-emerald-500 text-white scale-105 shadow-md shadow-emerald-500/30'
                  : 'bg-slate-100 text-slate-800'
              }`}
            >
              Fits: {currentStepNum} / {current.order}
            </div>
          </div>
        </div>

        {/* Right Math & Selector Column */}
        <div className="col-span-12 md:col-span-7 flex flex-col gap-4">
          {/* Big Mathematical Rule Box */}
          <div className="p-5 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-inner">
            <div className="text-base font-bold text-slate-300">
              Formula:
            </div>
            <div className="flex items-center gap-3 text-2xl font-black font-mono">
              <span className="text-amber-400 text-lg sm:text-xl">Angle Step</span>
              <span>=</span>
              <div className="flex flex-col items-center">
                <span className="text-sky-300 border-b-2 border-white/40 pb-0.5 px-3">360°</span>
                <span className="text-emerald-400 pt-0.5">Order</span>
              </div>
            </div>
          </div>

          {/* Active Calculation Card */}
          <div className="p-5 bg-blue-50/80 rounded-2xl border-2 border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-black text-blue-600 uppercase tracking-wider mb-0.5">
                {current.shapeName}
              </div>
              <div className="text-2xl font-black text-slate-900">
                Order {current.order} → 360° ÷ {current.order} = <span className="text-blue-700 font-mono">{current.angleStep}°</span>
              </div>
              <p className="text-xs font-semibold text-slate-600 mt-1">
                Looks identical every <strong className="text-slate-900">{current.angleStep}°</strong> of rotation.
              </p>
            </div>

            {/* Symmetrical status badge */}
            {current.hasSymmetry ? (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-100 text-emerald-800 font-black text-sm border border-emerald-300 shrink-0">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Rotational Symmetry</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-100 text-rose-800 font-black text-sm border border-rose-300 shrink-0">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <span>Order 1 (None)</span>
              </div>
            )}
          </div>

          {/* Order Selector Buttons */}
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2 block">
              Order:
            </span>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {orderExamples.map((item) => (
                <button
                  key={item.order}
                  onClick={() => handleSelectOrder(item.order)}
                  className={`p-2.5 rounded-xl border-2 flex flex-col items-center justify-center transition-all active:scale-95 ${
                    selectedOrder === item.order
                      ? 'bg-blue-600 text-white border-blue-700 shadow-md scale-105'
                      : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-lg font-black font-mono">Order {item.order}</span>
                  <span className={`text-[10px] font-bold mt-0.5 ${selectedOrder === item.order ? 'text-blue-100' : 'text-slate-500'}`}>
                    {item.angleStep}°
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Critical Rule Warning */}
      <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-start gap-4 text-amber-950">
        <AlertTriangle className="w-7 h-7 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-base font-bold leading-snug">
          <span className="font-extrabold uppercase text-amber-900">Rule: </span>
          Every 2D shape matches once at 360° (full turn), so every shape has at least order 1.
          <span className="text-rose-700 font-black"> Order 1 means it has NO rotational symmetry.</span>
        </div>
      </div>
    </div>
  );
};

