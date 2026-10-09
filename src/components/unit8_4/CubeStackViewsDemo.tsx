import React, { useState } from 'react';
import { Eye, RotateCcw, Plus, Minus, Layers, Sparkles } from 'lucide-react';

interface PresetModel {
  id: string;
  name: string;
  description: string;
  grid: number[][]; // [row 0 (Back), row 1 (Front)], each with 3 columns [col 0 (Left), col 1 (Mid), col 2 (Right)]
}

const presetModels: PresetModel[] = [
  {
    id: 'model-1',
    name: 'Model 1 (5 cubes)',
    description: 'Cambridge Classic: Back [1, 0, 0], Front [3, 1, 0]',
    grid: [
      [1, 0, 0],
      [3, 1, 0]
    ]
  },
  {
    id: 'model-2',
    name: 'Model 2 (4 cubes)',
    description: 'L-shape with tower: Back [0, 0, 0], Front [2, 1, 1]',
    grid: [
      [0, 0, 0],
      [2, 1, 1]
    ]
  },
  {
    id: 'model-3',
    name: 'Model 3 (6 cubes)',
    description: 'Staircase heights: Back [0, 0, 0], Front [1, 2, 3]',
    grid: [
      [0, 0, 0],
      [1, 2, 3]
    ]
  },
  {
    id: 'model-4',
    name: 'Model 4 (7 cubes)',
    description: 'Twin towers with bridge: Back [2, 0, 2], Front [1, 1, 1]',
    grid: [
      [2, 0, 2],
      [1, 1, 1]
    ]
  }
];

export const CubeStackViewsDemo: React.FC = () => {
  // Grid: row 0 = Back row, row 1 = Front row; cols 0, 1, 2 = Left, Mid, Right
  const [grid, setGrid] = useState<number[][]>([
    [1, 0, 0], // Back row
    [3, 1, 0]  // Front row
  ]);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('model-1');
  const [activeView, setActiveView] = useState<'all' | 'front' | 'side' | 'plan'>('all');

  const handleSelectPreset = (preset: PresetModel) => {
    setSelectedPresetId(preset.id);
    setGrid(preset.grid.map((r) => [...r]));
  };

  const adjustHeight = (row: number, col: number, delta: number) => {
    setSelectedPresetId('custom');
    setGrid((prev) => {
      const next = prev.map((r) => [...r]);
      next[row][col] = Math.max(0, Math.min(4, next[row][col] + delta));
      return next;
    });
  };

  // 1. FRONT VIEW:
  // Looking from the front towards row 1 then row 0.
  // For each column (0, 1, 2), max height = max(grid[0][col], grid[1][col])
  const frontViewHeights = [
    Math.max(grid[0][0], grid[1][0]),
    Math.max(grid[0][1], grid[1][1]),
    Math.max(grid[0][2], grid[1][2])
  ];

  // 2. SIDE VIEW:
  // Looking from the right side towards the left.
  // In the side view, the Front row is on the LEFT, and the Back row is on the RIGHT!
  const sideViewHeights = [
    Math.max(grid[1][0], grid[1][1], grid[1][2]), // Front row (seen on left of side view)
    Math.max(grid[0][0], grid[0][1], grid[0][2])  // Back row (seen on right of side view)
  ];

  // Total cubes count
  const totalCubes = grid.reduce((acc, row) => acc + row.reduce((sum, h) => sum + h, 0), 0);

  // ----------------------------------------------------
  // MATHEMATICALLY EXACT ISOMETRIC 3D ENGINE
  // ----------------------------------------------------
  // Cube size in isometric projection
  const s = 38; // edge length in px
  const dx = s * Math.cos((30 * Math.PI) / 180); // ~32.91 px
  const dy = s * Math.sin((30 * Math.PI) / 180); // 19.0 px
  const dz = s; // 38 px (vertical height, dz = 2 * dy)

  // Origin point of cell (row 0, col 0) center on ground
  const baseX = 220;
  const baseY = 240;

  // Ground tile center for cell (row, col)
  const getTileCenter = (row: number, col: number) => {
    // col moves down-right (+dx, +dy)
    // row moves down-left (-dx, +dy)
    const cx = baseX + col * dx - row * dx;
    const cy = baseY + col * dy + row * dy;
    return { cx, cy };
  };

  // Render the 3D isometric scene
  const renderIsometricScene = () => {
    // Generate all cubes in strict back-to-front depth order:
    // row 0 before row 1, col 0 before col 2, level 0 before level 3
    interface CubeData {
      row: number;
      col: number;
      level: number;
      cx: number;
      cy: number;
    }

    const cubes: CubeData[] = [];
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 3; c++) {
        const height = grid[r][c];
        const { cx, cy } = getTileCenter(r, c);
        for (let l = 0; l < height; l++) {
          cubes.push({ row: r, col: c, level: l, cx, cy });
        }
      }
    }

    // Platform corners for 3D base bevel
    const bevelH = 10;
    // Corners of the 2x3 grid boundary on ground:
    // Back: tile (0, 0) back vertex: (baseX, baseY - dy)
    // Far right: tile (0, 2) right vertex: (baseX + 3*dx, baseY + 2*dy)
    // Front corner: tile (1, 2) front vertex: (baseX + 2*dx - dx, baseY + 2*dy + dy + dy) = (baseX + dx, baseY + 4*dy)
    // Left corner: tile (1, 0) left vertex: (baseX - 2*dx, baseY + dy)
    const pFarBack = `${baseX},${baseY - dy}`;
    const pFarRight = `${baseX + 3 * dx},${baseY + 2 * dy}`;
    const pFrontCorner = `${baseX + dx},${baseY + 4 * dy}`;
    const pFarLeft = `${baseX - 2 * dx},${baseY + dy}`;

    return (
      <svg viewBox="0 0 460 360" className="w-full h-72 max-h-[300px] overflow-visible select-none">
        <defs>
          {/* Arrowhead marker for Front View (Blue) */}
          <marker id="arrow-blue" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
            <polygon points="0 0, 8 3.5, 0 7" fill="#2563eb" />
          </marker>
          {/* Arrowhead marker for Side View (Emerald) */}
          <marker id="arrow-green" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
            <polygon points="0 0, 8 3.5, 0 7" fill="#059669" />
          </marker>
          {/* Arrowhead marker for Plan View (Purple) */}
          <marker id="arrow-purple" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
            <polygon points="0 0, 8 3.5, 0 7" fill="#7c3aed" />
          </marker>

          {/* Gradients for polished 3D tray */}
          <linearGradient id="tray-bevel-left" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
          <linearGradient id="tray-bevel-right" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
        </defs>

        {/* -------------------------------------------------- */}
        {/* 1. 3D PLATFORM / BUILDING BASE TRAY               */}
        {/* -------------------------------------------------- */}
        {/* Bevel thickness on front-left side */}
        <polygon
          points={`${pFarLeft} ${pFrontCorner} ${baseX + dx},${baseY + 4 * dy + bevelH} ${baseX - 2 * dx},${baseY + dy + bevelH}`}
          fill="url(#tray-bevel-left)"
          stroke="#475569"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Bevel thickness on front-right side */}
        <polygon
          points={`${pFrontCorner} ${pFarRight} ${baseX + 3 * dx},${baseY + 2 * dy + bevelH} ${baseX + dx},${baseY + 4 * dy + bevelH}`}
          fill="url(#tray-bevel-right)"
          stroke="#475569"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Base floor surface plate */}
        <polygon
          points={`${pFarBack} ${pFarRight} ${pFrontCorner} ${pFarLeft}`}
          fill="#f8fafc"
          stroke="#64748b"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* -------------------------------------------------- */}
        {/* 2. GROUND GRID CELLS (2 rows x 3 columns)          */}
        {/* -------------------------------------------------- */}
        {[0, 1].map((r) =>
          [0, 1, 2].map((c) => {
            const { cx, cy } = getTileCenter(r, c);
            const isOccupied = grid[r][c] > 0;
            const pTop = `${cx},${cy - dy}`;
            const pRight = `${cx + dx},${cy}`;
            const pBottom = `${cx},${cy + dy}`;
            const pLeft = `${cx - dx},${cy}`;

            return (
              <g key={`tile-${r}-${c}`}>
                <polygon
                  points={`${pTop} ${pRight} ${pBottom} ${pLeft}`}
                  fill={isOccupied ? '#e2e8f0' : '#f1f5f9'}
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                  strokeDasharray={isOccupied ? 'none' : '3,3'}
                />
                {/* Empty cell footprint label */}
                {!isOccupied && (
                  <text
                    x={cx}
                    y={cy + 3}
                    textAnchor="middle"
                    className="text-[9px] font-black fill-slate-400 font-mono select-none"
                  >
                    0
                  </text>
                )}
              </g>
            );
          })
        )}

        {/* Base Grid Labels: Column tags along front-left edge */}
        {[0, 1, 2].map((c) => {
          // Point on the front edge of row 1 (Front Row)
          const { cx, cy } = getTileCenter(1, c);
          // Label placed slightly in front of the tile
          const labelX = cx - 10;
          const labelY = cy + dy + 14;
          return (
            <text
              key={`col-label-${c}`}
              x={labelX}
              y={labelY}
              textAnchor="middle"
              className={`text-[9px] font-black uppercase font-mono ${
                activeView === 'front' ? 'fill-blue-700' : 'fill-slate-500'
              }`}
            >
              Col {c + 1}
            </text>
          );
        })}

        {/* Base Grid Labels: Row tags along the side */}
        <text
          x={baseX + 2.7 * dx + 12}
          y={baseY + 1.2 * dy}
          textAnchor="start"
          className={`text-[9px] font-black uppercase font-mono ${
            activeView === 'side' ? 'fill-emerald-700' : 'fill-slate-500'
          }`}
        >
          Back Row
        </text>
        <text
          x={baseX + 1.7 * dx + 12}
          y={baseY + 3.2 * dy}
          textAnchor="start"
          className={`text-[9px] font-black uppercase font-mono ${
            activeView === 'side' ? 'fill-emerald-700' : 'fill-slate-500'
          }`}
        >
          Front Row
        </text>

        {/* -------------------------------------------------- */}
        {/* 3. 3D CUBES (Strictly Sorted in Depth Order)       */}
        {/* -------------------------------------------------- */}
        {cubes.map((cube) => {
          const { cx, cy, row, col, level } = cube;
          const bElev = level * dz;
          const tElev = (level + 1) * dz;

          // Vertices of this cube
          // Top face corners:
          const tBack = { x: cx, y: cy - dy - tElev };
          const tRight = { x: cx + dx, y: cy - tElev };
          const tFront = { x: cx, y: cy + dy - tElev };
          const tLeft = { x: cx - dx, y: cy - tElev };

          // Bottom face corners:
          const bFront = { x: cx, y: cy + dy - bElev };
          const bLeft = { x: cx - dx, y: cy - bElev };
          const bRight = { x: cx + dx, y: cy - bElev };

          // Color highlighting based on active view:
          // Plan (Top face)
          const isPlanActive = activeView === 'plan' || activeView === 'all';
          const topFill =
            activeView === 'plan'
              ? '#c084fc' // Bright illuminated purple
              : activeView === 'all'
              ? '#e9d5ff' // Clean lavender
              : '#f1f5f9'; // Dimmed neutral
          const topStroke =
            activeView === 'plan' ? '#7c3aed' : activeView === 'all' ? '#1e293b' : '#94a3b8';
          const topStrokeWidth = activeView === 'plan' ? 2.5 : 2;

          // Front (Left face - faces Front viewer)
          const isFrontActive = activeView === 'front' || activeView === 'all';
          const frontFill =
            activeView === 'front'
              ? '#60a5fa' // Bright illuminated blue
              : activeView === 'all'
              ? '#93c5fd' // Clean soft blue
              : '#f8fafc'; // Dimmed neutral
          const frontStroke =
            activeView === 'front' ? '#1d4ed8' : activeView === 'all' ? '#1e293b' : '#94a3b8';
          const frontStrokeWidth = activeView === 'front' ? 2.5 : 2;

          // Side (Right face - faces Side viewer)
          const isSideActive = activeView === 'side' || activeView === 'all';
          const sideFill =
            activeView === 'side'
              ? '#34d399' // Bright illuminated emerald
              : activeView === 'all'
              ? '#a7f3d0' // Clean soft mint
              : '#f8fafc'; // Dimmed neutral
          const sideStroke =
            activeView === 'side' ? '#047857' : activeView === 'all' ? '#1e293b' : '#94a3b8';
          const sideStrokeWidth = activeView === 'side' ? 2.5 : 2;

          const isTopmost = level === grid[row][col] - 1;

          return (
            <g key={`cube-${row}-${col}-${level}`}>
              {/* 1. FRONT FACE (Front View) */}
              <polygon
                points={`${tLeft.x},${tLeft.y} ${tFront.x},${tFront.y} ${bFront.x},${bFront.y} ${bLeft.x},${bLeft.y}`}
                fill={frontFill}
                stroke={frontStroke}
                strokeWidth={frontStrokeWidth}
                strokeLinejoin="round"
              />

              {/* 2. SIDE FACE (Side View) */}
              <polygon
                points={`${tFront.x},${tFront.y} ${tRight.x},${tRight.y} ${bRight.x},${bRight.y} ${bFront.x},${bFront.y}`}
                fill={sideFill}
                stroke={sideStroke}
                strokeWidth={sideStrokeWidth}
                strokeLinejoin="round"
              />

              {/* 3. TOP FACE (Plan View) */}
              <polygon
                points={`${tBack.x},${tBack.y} ${tRight.x},${tRight.y} ${tFront.x},${tFront.y} ${tLeft.x},${tLeft.y}`}
                fill={topFill}
                stroke={topStroke}
                strokeWidth={topStrokeWidth}
                strokeLinejoin="round"
              />

              {/* Subtle top-face inner highlight bevel */}
              <polyline
                points={`${tLeft.x + 2},${tLeft.y} ${tFront.x},${tFront.y - 1} ${tRight.x - 2},${tRight.y}`}
                fill="none"
                stroke="white"
                strokeWidth="1.2"
                opacity="0.6"
              />

              {/* Height number on topmost cube when Plan view is active */}
              {isPlanActive && isTopmost && activeView === 'plan' && (
                <text
                  x={cx}
                  y={cy - tElev + 4}
                  textAnchor="middle"
                  className="text-xs font-black fill-purple-950 font-mono select-none"
                >
                  {grid[row][col]}
                </text>
              )}
            </g>
          );
        })}

        {/* -------------------------------------------------- */}
        {/* 4. INTERACTIVE OBSERVER STATIONS & SIGHTLINES      */}
        {/* -------------------------------------------------- */}

        {/* FRONT VIEW OBSERVER (Bottom-Left) */}
        <g
          className="cursor-pointer group"
          onClick={() => setActiveView(activeView === 'front' ? 'all' : 'front')}
        >
          {/* Sightline beam / arrow pointing towards Front faces */}
          <line
            x1="70"
            y1="310"
            x2="125"
            y2="280"
            stroke="#2563eb"
            strokeWidth={activeView === 'front' ? '4' : '2.5'}
            strokeDasharray={activeView === 'front' ? 'none' : '4,3'}
            markerEnd="url(#arrow-blue)"
          />
          {/* Observer Badge */}
          <g transform="translate(65, 326)">
            <rect
              x="-56"
              y="-13"
              width="112"
              height="26"
              rx="13"
              fill={activeView === 'front' ? '#2563eb' : '#eff6ff'}
              stroke="#2563eb"
              strokeWidth="2"
              className="transition-colors group-hover:brightness-95"
            />
            {/* Eye icon circle + text */}
            <circle
              cx="-38"
              cy="0"
              r="6"
              fill={activeView === 'front' ? '#ffffff' : '#2563eb'}
            />
            <circle
              cx="-38"
              cy="0"
              r="2.5"
              fill={activeView === 'front' ? '#2563eb' : '#ffffff'}
            />
            <text
              x="6"
              y="4"
              textAnchor="middle"
              className={`text-[10px] font-black uppercase tracking-wider ${
                activeView === 'front' ? 'fill-white' : 'fill-blue-700'
              }`}
            >
              FRONT VIEW ➔
            </text>
          </g>
        </g>

        {/* SIDE VIEW OBSERVER (Bottom-Right) */}
        <g
          className="cursor-pointer group"
          onClick={() => setActiveView(activeView === 'side' ? 'all' : 'side')}
        >
          {/* Sightline beam / arrow pointing towards Side faces */}
          <line
            x1="390"
            y1="310"
            x2="335"
            y2="280"
            stroke="#059669"
            strokeWidth={activeView === 'side' ? '4' : '2.5'}
            strokeDasharray={activeView === 'side' ? 'none' : '4,3'}
            markerEnd="url(#arrow-green)"
          />
          {/* Observer Badge */}
          <g transform="translate(390, 326)">
            <rect
              x="-56"
              y="-13"
              width="112"
              height="26"
              rx="13"
              fill={activeView === 'side' ? '#059669' : '#ecfdf5'}
              stroke="#059669"
              strokeWidth="2"
              className="transition-colors group-hover:brightness-95"
            />
            <circle
              cx="-38"
              cy="0"
              r="6"
              fill={activeView === 'side' ? '#ffffff' : '#059669'}
            />
            <circle
              cx="-38"
              cy="0"
              r="2.5"
              fill={activeView === 'side' ? '#059669' : '#ffffff'}
            />
            <text
              x="6"
              y="4"
              textAnchor="middle"
              className={`text-[10px] font-black uppercase tracking-wider ${
                activeView === 'side' ? 'fill-white' : 'fill-emerald-700'
              }`}
            >
              ⬅ SIDE VIEW
            </text>
          </g>
        </g>

        {/* PLAN VIEW OBSERVER (Top-Center) */}
        <g
          className="cursor-pointer group"
          onClick={() => setActiveView(activeView === 'plan' ? 'all' : 'plan')}
        >
          {/* Sightline arrow pointing straight down at top faces */}
          <line
            x1="220"
            y1="36"
            x2="220"
            y2="62"
            stroke="#7c3aed"
            strokeWidth={activeView === 'plan' ? '4' : '2.5'}
            strokeDasharray={activeView === 'plan' ? 'none' : '4,3'}
            markerEnd="url(#arrow-purple)"
          />
          {/* Observer Badge */}
          <g transform="translate(220, 20)">
            <rect
              x="-66"
              y="-13"
              width="132"
              height="26"
              rx="13"
              fill={activeView === 'plan' ? '#7c3aed' : '#f5f3ff'}
              stroke="#7c3aed"
              strokeWidth="2"
              className="transition-colors group-hover:brightness-95"
            />
            <circle
              cx="-46"
              cy="0"
              r="6"
              fill={activeView === 'plan' ? '#ffffff' : '#7c3aed'}
            />
            <circle
              cx="-46"
              cy="0"
              r="2.5"
              fill={activeView === 'plan' ? '#7c3aed' : '#ffffff'}
            />
            <text
              x="8"
              y="4"
              textAnchor="middle"
              className={`text-[10px] font-black uppercase tracking-wider ${
                activeView === 'plan' ? 'fill-white' : 'fill-purple-700'
              }`}
            >
              PLAN (TOP) VIEW ⬇
            </text>
          </g>
        </g>
      </svg>
    );
  };

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-6xl mx-auto p-6 select-none overflow-y-auto">
      {/* Header */}
      <div>
        <span className="text-sm font-black text-purple-600 uppercase tracking-widest flex items-center gap-1.5">
          <Layers className="w-4 h-4" /> Unit 8.4 · 3D Shapes &amp; Views
        </span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          Views of Cube Stacks (Front, Side &amp; Plan)
        </h2>
        <p className="text-2xl font-bold text-slate-700 leading-snug">
          Look at the 3D model from 3 directions: <span className="text-blue-600 font-extrabold">Front</span> (blue), <span className="text-emerald-600 font-extrabold">Side</span> (green), and <span className="text-purple-600 font-extrabold">Plan</span> (top-down purple).
        </p>
      </div>

      {/* Main Classroom Stage */}
      <div className="grid grid-cols-12 gap-6 my-auto items-center">
        {/* Left Column: 3D Isometric Model */}
        <div className="col-span-12 lg:col-span-6 bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-xl flex flex-col items-center justify-between min-h-[480px] relative">
          {/* Card Subheader with View Selector Tabs */}
          <div className="w-full flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveView('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                  activeView === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Views
              </button>
              <button
                onClick={() => setActiveView('front')}
                className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                  activeView === 'front'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-blue-700 hover:bg-blue-50'
                }`}
              >
                Front
              </button>
              <button
                onClick={() => setActiveView('side')}
                className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                  activeView === 'side'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                Side
              </button>
              <button
                onClick={() => setActiveView('plan')}
                className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                  activeView === 'plan'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-purple-700 hover:bg-purple-50'
                }`}
              >
                Plan
              </button>
            </div>

            <span className="text-xs font-black uppercase px-3 py-1 rounded-xl bg-purple-100 text-purple-900 font-mono">
              Total: {totalCubes} Cubes
            </span>
          </div>

          {/* 3D Canvas */}
          <div className="w-full flex-1 flex items-center justify-center my-auto py-1">
            {renderIsometricScene()}
          </div>

          {/* Live Teacher & Student Guidance Callout */}
          <div className="w-full p-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-bold mt-2">
            {activeView === 'all' && (
              <p>
                💡 <strong className="text-slate-900">Color Key:</strong> Blue faces = <span className="text-blue-600">Front View</span>, Green faces = <span className="text-emerald-600">Side View</span>, Purple faces = <span className="text-purple-600">Plan View</span>. Click any observer eye to isolate!
              </p>
            )}
            {activeView === 'front' && (
              <p>
                👁️ <strong className="text-blue-700">Looking from Front:</strong> You see 3 columns across: <strong>Col 1</strong> ({frontViewHeights[0]} cubes tall), <strong>Col 2</strong> ({frontViewHeights[1]} cubes tall), <strong>Col 3</strong> ({frontViewHeights[2]} cubes tall).
              </p>
            )}
            {activeView === 'side' && (
              <p>
                👁️ <strong className="text-emerald-700">Looking from Side (Right):</strong> Front row is on your left ({sideViewHeights[0]} cubes), Back row is on your right ({sideViewHeights[1]} cubes).
              </p>
            )}
            {activeView === 'plan' && (
              <p>
                👁️ <strong className="text-purple-700">Looking from Above (Plan):</strong> You see the top footprint grid. The numbers show how many cubes are in each vertical stack!
              </p>
            )}
          </div>
        </div>

        {/* Right Column: 2D Orthographic Projections (Front, Side, Plan) & Controls */}
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-3.5">
          {/* Preset Models Row */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-black uppercase text-slate-500 whitespace-nowrap">
              Presets:
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {presetModels.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectPreset(p)}
                  className={`px-3 py-1.5 rounded-xl font-black text-xs border-2 transition-all ${
                    selectedPresetId === p.id
                      ? 'bg-purple-600 text-white border-purple-700 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* 3 Orthographic View Cards */}
          <div className="grid grid-cols-3 gap-3">
            {/* 1. FRONT VIEW CARD */}
            <div
              onClick={() => setActiveView('front')}
              className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                activeView === 'front'
                  ? 'bg-blue-50 border-blue-500 shadow-md ring-2 ring-blue-300'
                  : 'bg-white border-slate-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-black uppercase text-blue-700 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> Front View
                </span>
              </div>
              {/* 2D Block Diagram (3 columns: Col 1, Col 2, Col 3) */}
              <div className="flex justify-center items-end gap-2 h-24 p-2 bg-slate-50 rounded-xl border border-slate-200">
                {frontViewHeights.map((h, colIdx) => (
                  <div key={colIdx} className="flex flex-col-reverse items-center gap-1">
                    <span className="text-[9px] font-bold text-slate-400 font-mono mt-0.5">
                      C{colIdx + 1}
                    </span>
                    {[...Array(h)].map((_, rIdx) => (
                      <div
                        key={rIdx}
                        className="w-5 h-5 rounded-md bg-blue-500 border border-blue-700 shadow-xs"
                      />
                    ))}
                    {h === 0 && (
                      <div className="w-5 h-5 rounded-md border border-dashed border-slate-300 bg-white opacity-40" />
                    )}
                  </div>
                ))}
              </div>
              <span className="text-[10px] font-bold text-blue-900 block text-center mt-1.5 font-mono">
                Heights: [{frontViewHeights.join(', ')}]
              </span>
            </div>

            {/* 2. SIDE VIEW CARD */}
            <div
              onClick={() => setActiveView('side')}
              className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                activeView === 'side'
                  ? 'bg-emerald-50 border-emerald-500 shadow-md ring-2 ring-emerald-300'
                  : 'bg-white border-slate-200 hover:border-emerald-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-black uppercase text-emerald-700 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> Side View
                </span>
              </div>
              {/* 2D Block Diagram (2 columns: Front row, Back row) */}
              <div className="flex justify-center items-end gap-3 h-24 p-2 bg-slate-50 rounded-xl border border-slate-200">
                {sideViewHeights.map((h, rowIdx) => (
                  <div key={rowIdx} className="flex flex-col-reverse items-center gap-1">
                    <span className="text-[9px] font-bold text-slate-400 font-mono mt-0.5">
                      {rowIdx === 0 ? 'Front' : 'Back'}
                    </span>
                    {[...Array(h)].map((_, cIdx) => (
                      <div
                        key={cIdx}
                        className="w-6 h-5 rounded-md bg-emerald-500 border border-emerald-700 shadow-xs"
                      />
                    ))}
                    {h === 0 && (
                      <div className="w-6 h-5 rounded-md border border-dashed border-slate-300 bg-white opacity-40" />
                    )}
                  </div>
                ))}
              </div>
              <span className="text-[10px] font-bold text-emerald-900 block text-center mt-1.5 font-mono">
                Heights: [{sideViewHeights.join(', ')}]
              </span>
            </div>

            {/* 3. PLAN VIEW (TOP) CARD */}
            <div
              onClick={() => setActiveView('plan')}
              className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                activeView === 'plan'
                  ? 'bg-purple-50 border-purple-500 shadow-md ring-2 ring-purple-300'
                  : 'bg-white border-slate-200 hover:border-purple-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-black uppercase text-purple-700 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> Plan (Top)
                </span>
              </div>
              {/* Top-down 2x3 Grid with Height Numbers */}
              <div className="flex flex-col justify-center items-center gap-1 h-24 p-2 bg-slate-50 rounded-xl border border-slate-200">
                {[0, 1].map((r) => (
                  <div key={r} className="flex gap-1 items-center">
                    <span className="text-[8px] font-bold text-slate-400 w-6 text-right">
                      {r === 0 ? 'Back' : 'Front'}
                    </span>
                    {[0, 1, 2].map((c) => {
                      const h = grid[r][c];
                      return (
                        <div
                          key={c}
                          className={`w-6 h-6 rounded-md flex items-center justify-center font-black font-mono text-xs border ${
                            h > 0
                              ? 'bg-purple-500 border-purple-700 text-white shadow-xs'
                              : 'bg-white border-slate-200 text-slate-300'
                          }`}
                        >
                          {h > 0 ? h : '0'}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
              <span className="text-[10px] font-bold text-purple-900 block text-center mt-1.5 font-mono">
                Top-down footprint
              </span>
            </div>
          </div>

          {/* Interactive Height Controller (Adjust Cubes Live) */}
          <div className="bg-white rounded-3xl p-4 border-2 border-slate-200 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase text-slate-700 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" /> Custom Height Controls (2×3 Base):
              </span>
              <button
                onClick={() => handleSelectPreset(presetModels[0])}
                className="text-[11px] font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset Model 1
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[0, 1].map((r) =>
                [0, 1, 2].map((c) => {
                  const h = grid[r][c];
                  return (
                    <div
                      key={`ctrl-${r}-${c}`}
                      className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                    >
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase text-slate-500">
                          {r === 0 ? 'Back' : 'Front'} {c + 1}
                        </span>
                        <span className="text-base font-black font-mono text-slate-900">{h}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => adjustHeight(r, c, -1)}
                          disabled={h <= 0}
                          className="w-6 h-6 rounded-lg bg-slate-200 hover:bg-slate-300 disabled:opacity-30 disabled:hover:bg-slate-200 flex items-center justify-center font-black active:scale-90"
                          title="Remove cube"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => adjustHeight(r, c, 1)}
                          disabled={h >= 4}
                          className="w-6 h-6 rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-30 flex items-center justify-center font-black active:scale-90"
                          title="Add cube"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Teacher's Cambridge Key Rule Banner */}
      <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 text-purple-950 font-bold text-sm mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span>
          <strong>Cambridge Rule:</strong> Front view shows the tallest cube in each <em>column</em> (C1, C2, C3). Side view shows the tallest cube in each <em>row</em> (Front, Back). Plan view shows the top footprint with numbers!
        </span>
      </div>
    </div>
  );
};
