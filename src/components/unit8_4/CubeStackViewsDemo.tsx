import React, { useState } from 'react';
import { cubeStackPresets, CubeStackPreset } from '../../data/unit8_4_data';
import { Plus, Minus, RotateCcw, Sparkles, Check, Layers } from 'lucide-react';

export const CubeStackViewsDemo: React.FC = () => {
  // Grid: 2 rows (row 0 = Back, row 1 = Front), 3 columns (col 0 = Left, 1 = Middle, 2 = Right)
  const [grid, setGrid] = useState<number[][]>([
    [1, 0, 0], // Back row
    [3, 1, 0]  // Front row (Model 1 default)
  ]);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('model-1');
  const [highlightedView, setHighlightedView] = useState<'front' | 'side' | 'plan' | null>('front');

  // Load preset
  const handleLoadPreset = (preset: CubeStackPreset) => {
    setSelectedPresetId(preset.id);
    setGrid(preset.grid.map((r) => [...r]));
  };

  // Add / Remove cube at [row][col]
  const adjustHeight = (row: number, col: number, delta: number) => {
    setGrid((prev) => {
      const next = prev.map((r) => [...r]);
      next[row][col] = Math.max(0, Math.min(4, next[row][col] + delta));
      return next;
    });
  };

  // Automatic computation of Front View:
  // Front view is seen looking from the front (towards row 1 then row 0).
  // For each column (col 0, 1, 2), max height = max(grid[0][col], grid[1][col])
  const frontViewHeights = [
    Math.max(grid[0][0], grid[1][0]),
    Math.max(grid[0][1], grid[1][1]),
    Math.max(grid[0][2], grid[1][2])
  ];

  // Automatic computation of Side View:
  // Side view is seen from the right (looking from right to left).
  // Front row is on the left of side view, back row is on the right of side view!
  // Row 1 (Front) max height = grid[1][2] ? No, looking from the right across the row:
  // max height in row 1 = max(grid[1][0], grid[1][1], grid[1][2])
  // max height in row 0 = max(grid[0][0], grid[0][1], grid[0][2])
  const sideViewHeights = [
    Math.max(grid[1][0], grid[1][1], grid[1][2]), // Front row (left in side profile)
    Math.max(grid[0][0], grid[0][1], grid[0][2])  // Back row (right in side profile)
  ];

  // Plan view: occupied cells where height > 0
  const planOccupied = [
    [grid[0][0] > 0, grid[0][1] > 0, grid[0][2] > 0],
    [grid[1][0] > 0, grid[1][1] > 0, grid[1][2] > 0]
  ];

  // Count total cubes
  const totalCubes = grid.reduce((acc, row) => acc + row.reduce((rAcc, h) => rAcc + h, 0), 0);

  // Isometric 3D rendering function
  const renderIsometric3D = () => {
    const cubeW = 48;
    const cubeH = 26;
    const cubeHeight = 36;
    const originX = 140;
    const originY = 220;

    // Draw order: back row first (row 0), then front row (row 1); left to right
    const cubesToDraw: { row: number; col: number; level: number; sx: number; sy: number }[] = [];

    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 3; c++) {
        const h = grid[r][c];
        for (let l = 0; l < h; l++) {
          // Iso projection:
          // c increases to +X and +Y
          // r increases to -X and +Y
          const sx = originX + (c - r) * cubeW;
          const sy = originY + (c + r) * (cubeH / 1.1) - l * cubeHeight;
          cubesToDraw.push({ row: r, col: c, level: l, sx, sy });
        }
      }
    }

    return (
      <svg viewBox="0 0 340 320" className="w-full h-full overflow-visible">
        {/* Floor grid */}
        <g stroke="#cbd5e1" strokeWidth="1.5" fill="none">
          {[-1, 0, 1, 2, 3].map((i) => (
            <line key={`g1-${i}`} x1={originX + (i - 2) * cubeW} y1={originY + (i + 2) * (cubeH / 1.1)} x2={originX + (i + 1) * cubeW} y2={originY + (i - 1) * (cubeH / 1.1)} />
          ))}
        </g>

        {/* Direction arrows on floor */}
        <g>
          {/* Front arrow (Looking from bottom towards row 1) */}
          <line x1={originX + 20} y1={originY + 65} x2={originX + 20} y2={originY + 25} stroke="#2563eb" strokeWidth="4" markerEnd="url(#arrow)" />
          <text x={originX + 20} y={originY + 80} textAnchor="middle" className="text-xs font-black fill-blue-700">FRONT VIEW</text>

          {/* Side arrow (Looking from right side) */}
          <line x1={originX + 130} y1={originY + 25} x2={originX + 90} y2={originY + 25} stroke="#16a34a" strokeWidth="4" markerEnd="url(#arrow)" />
          <text x={originX + 145} y={originY + 40} className="text-xs font-black fill-emerald-700">SIDE VIEW</text>
        </g>

        {/* Cubes */}
        {cubesToDraw.map((cube, idx) => {
          const isFrontMatch = highlightedView === 'front';
          const isSideMatch = highlightedView === 'side';
          const isPlanMatch = highlightedView === 'plan';

          return (
            <g key={idx} transform={`translate(${cube.sx}, ${cube.sy})`}>
              {/* Top Face */}
              <polygon
                points={`0,${-cubeH} ${cubeW / 2},${-cubeH - cubeH / 2} ${cubeW},${-cubeH} ${cubeW / 2},${-cubeH / 2}`}
                fill={isPlanMatch ? '#f3e8ff' : '#e0e7ff'}
                stroke="#312e81"
                strokeWidth="2"
              />
              {/* Left Face (Front-facing in this iso) */}
              <polygon
                points={`0,${-cubeH} ${cubeW / 2},${-cubeH / 2} ${cubeW / 2},${0} 0,${-cubeH / 2}`}
                fill={isFrontMatch ? '#93c5fd' : '#818cf8'}
                stroke="#312e81"
                strokeWidth="2"
              />
              {/* Right Face (Side-facing) */}
              <polygon
                points={`${cubeW / 2},${-cubeH / 2} ${cubeW},${-cubeH} ${cubeW},${-cubeH / 2} ${cubeW / 2},${0}`}
                fill={isSideMatch ? '#a7f3d0' : '#6366f1'}
                stroke="#312e81"
                strokeWidth="2"
              />
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-6xl mx-auto p-6 select-none overflow-y-auto">
      <div>
        <span className="text-sm font-black text-purple-600 uppercase tracking-widest">
          Unit 8.4 · Cambridge Core Skill
        </span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          Views of Cube Stacks &amp; Models
        </h2>
        <p className="text-2xl font-bold text-slate-700 leading-snug">
          The app computes <span className="text-blue-600 font-extrabold">Front</span>, <span className="text-emerald-600 font-extrabold">Side</span>, and <span className="text-purple-600 font-extrabold">Plan</span> views automatically. Add or remove cubes to test!
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6 my-auto items-center">
        {/* Left: 3D Isometric View */}
        <div className="col-span-12 lg:col-span-6 bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-xl flex flex-col items-center justify-center h-[420px] relative">
          <div className="w-full flex items-center justify-between pb-1 border-b border-slate-100 mb-2">
            <span className="text-sm font-black text-slate-700 uppercase">3D Isometric Model</span>
            <span className="text-xs font-black uppercase px-3 py-1 rounded-xl bg-purple-100 text-purple-900 font-mono">
              Total: {totalCubes} Cubes
            </span>
          </div>

          <div className="flex-1 w-full flex items-center justify-center">
            {renderIsometric3D()}
          </div>
        </div>

        {/* Right: Computed 2D Projections (Front, Side, Plan) */}
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
          {/* Preset Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase text-slate-500">Presets:</span>
            {cubeStackPresets.map((p) => (
              <button
                key={p.id}
                onClick={() => handleLoadPreset(p)}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs border-2 transition-all ${
                  selectedPresetId === p.id
                    ? 'bg-purple-600 text-white border-purple-700 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {p.name.split('(')[0]}
              </button>
            ))}
          </div>

          {/* 3 Computed Views Grid */}
          <div className="grid grid-cols-3 gap-3">
            {/* Front View (3 columns) */}
            <div
              onClick={() => setHighlightedView('front')}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                highlightedView === 'front'
                  ? 'bg-blue-50 border-blue-400 shadow-md ring-2 ring-blue-300'
                  : 'bg-white border-slate-200'
              }`}
            >
              <span className="text-xs font-black uppercase text-blue-700 block mb-2">
                Front View
              </span>
              {/* 2D Grid: max 4 rows tall, 3 cols wide */}
              <div className="flex justify-center items-end gap-1.5 h-24 p-1 bg-white rounded-xl border border-slate-200">
                {frontViewHeights.map((h, c) => (
                  <div key={c} className="flex flex-col-reverse gap-1">
                    {[...Array(h)].map((_, rIdx) => (
                      <div key={rIdx} className="w-6 h-5 rounded-md bg-blue-500 border border-blue-700 shadow-xs" />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Side View (2 rows deep) */}
            <div
              onClick={() => setHighlightedView('side')}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                highlightedView === 'side'
                  ? 'bg-emerald-50 border-emerald-400 shadow-md ring-2 ring-emerald-300'
                  : 'bg-white border-slate-200'
              }`}
            >
              <span className="text-xs font-black uppercase text-emerald-700 block mb-2">
                Side View
              </span>
              <div className="flex justify-center items-end gap-1.5 h-24 p-1 bg-white rounded-xl border border-slate-200">
                {sideViewHeights.map((h, rIdx) => (
                  <div key={rIdx} className="flex flex-col-reverse gap-1">
                    {[...Array(h)].map((_, cIdx) => (
                      <div key={cIdx} className="w-7 h-5 rounded-md bg-emerald-500 border border-emerald-700 shadow-xs" />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Plan View (Top: 2 rows x 3 cols) */}
            <div
              onClick={() => setHighlightedView('plan')}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                highlightedView === 'plan'
                  ? 'bg-purple-50 border-purple-400 shadow-md ring-2 ring-purple-300'
                  : 'bg-white border-slate-200'
              }`}
            >
              <span className="text-xs font-black uppercase text-purple-700 block mb-2">
                Plan View (Top)
              </span>
              <div className="flex flex-col justify-center items-center gap-1 h-24 p-1 bg-white rounded-xl border border-slate-200">
                {planOccupied.map((row, rIdx) => (
                  <div key={rIdx} className="flex gap-1">
                    {row.map((occ, cIdx) => (
                      <div
                        key={cIdx}
                        className={`w-6 h-6 rounded-md border ${
                          occ ? 'bg-purple-500 border-purple-700' : 'bg-slate-100 border-slate-200 opacity-40'
                        }`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Teacher Height Control Matrix */}
          <div className="bg-white rounded-3xl p-4 border-2 border-slate-200 shadow-md">
            <span className="text-xs font-black uppercase text-slate-500 block mb-2">
              Adjust Heights on Grid (Back Row &amp; Front Row):
            </span>
            <div className="grid grid-cols-3 gap-2 text-center">
              {[0, 1].map((r) =>
                [0, 1, 2].map((c) => (
                  <div key={`${r}-${c}`} className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">
                      {r === 0 ? 'Back' : 'Front'} [{c + 1}]:
                    </span>
                    <span className="text-lg font-black font-mono text-slate-900">{grid[r][c]}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => adjustHeight(r, c, -1)}
                        className="w-7 h-7 rounded-lg bg-slate-200 hover:bg-slate-300 flex items-center justify-center font-black active:scale-90"
                      >
                        -
                      </button>
                      <button
                        onClick={() => adjustHeight(r, c, 1)}
                        className="w-7 h-7 rounded-lg bg-purple-600 text-white hover:bg-purple-700 flex items-center justify-center font-black active:scale-90"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200 text-purple-950 font-bold text-base mt-2">
        Notice: Front view height = highest cube in that column! Side view height = highest cube in that row as seen from the right!
      </div>
    </div>
  );
};
