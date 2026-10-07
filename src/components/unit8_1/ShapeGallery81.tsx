import React, { useState } from 'react';
import { shapes8_1_gallery, ShapeSymmetryData } from '../../data/unit8_1_data';
import { RotateCw, Sparkles, Eye, Table, Layers, Play, Check } from 'lucide-react';

export const ShapeGallery81: React.FC = () => {
  const [selectedShapeName, setSelectedShapeName] = useState<string>('Square');
  const [showMirrorLines, setShowMirrorLines] = useState<boolean>(true);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'visual' | 'table'>('visual');

  const shape = shapes8_1_gallery.find((s) => s.name === selectedShapeName) || shapes8_1_gallery[0];

  const handleRotateStep = () => {
    const step = shape.order === 999 ? 45 : 360 / Math.max(1, shape.order);
    setRotationAngle((prev) => (prev + step) % 360);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-6xl mx-auto p-6 select-none overflow-y-auto">
      {/* Header with Visual / Table toggle */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <span className="text-sm font-black text-blue-600 uppercase tracking-widest">
            Unit 8.1 · Concept 5
          </span>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-0.5">
            2D Shape Symmetry Gallery
          </h2>
        </div>

        {/* View Switcher: Interactive Demo vs Summary Table */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveTab('visual')}
            className={`px-5 py-2.5 rounded-xl font-extrabold text-sm flex items-center gap-2 transition-all ${
              activeTab === 'visual'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Interactive Shape Demo</span>
          </button>
          <button
            onClick={() => setActiveTab('table')}
            className={`px-5 py-2.5 rounded-xl font-extrabold text-sm flex items-center gap-2 transition-all ${
              activeTab === 'table'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Table className="w-4 h-4" />
            <span>All 10 Shapes Table</span>
          </button>
        </div>
      </div>

      {activeTab === 'visual' ? (
        <div className="grid grid-cols-12 gap-6 my-auto items-center pt-2">
          {/* Main Visual Display */}
          <div className="col-span-12 lg:col-span-7 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl flex flex-col items-center justify-center min-h-[420px] relative">
            <div className="w-full flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
              <span className="text-2xl font-black text-slate-900">{shape.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase bg-blue-100 text-blue-800 px-3 py-1 rounded-xl">
                  {shape.lines === 999 ? 'Infinite Lines' : `${shape.lines} Lines of Symmetry`}
                </span>
                <span className="text-xs font-black uppercase bg-purple-100 text-purple-800 px-3 py-1 rounded-xl">
                  {shape.order === 999 ? 'Infinite Order' : `Order ${shape.order}`}
                </span>
              </div>
            </div>

            {/* SVG Renderer */}
            <div className="relative w-80 h-72 flex items-center justify-center">
              <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible">
                {/* Ghost original outline if rotated */}
                {rotationAngle > 0 && (
                  <g opacity="0.3">
                    {shape.isCircle ? (
                      <circle cx="150" cy="150" r="105" fill="#f8fafc" stroke="#64748b" strokeWidth="4" />
                    ) : (
                      <polygon
                        points={shape.polygonPoints.map((p) => p.join(',')).join(' ')}
                        fill="#f8fafc"
                        stroke="#64748b"
                        strokeWidth="4"
                      />
                    )}
                  </g>
                )}

                {/* Rotating Active Shape */}
                <g
                  style={{
                    transformOrigin: '150px 150px',
                    transform: `rotate(${rotationAngle}deg)`,
                    transition: 'transform 0.3s ease-out'
                  }}
                >
                  {shape.isCircle ? (
                    <circle cx="150" cy="150" r="105" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="4" />
                  ) : (
                    <polygon
                      points={shape.polygonPoints.map((p) => p.join(',')).join(' ')}
                      fill="#dbeafe"
                      stroke="#1d4ed8"
                      strokeWidth="4"
                    />
                  )}

                  {/* Corner indicator */}
                  {!shape.isCircle && shape.polygonPoints[0] && (
                    <circle cx={shape.polygonPoints[0][0]} cy={shape.polygonPoints[0][1]} r="6" fill="#dc2626" />
                  )}
                </g>

                {/* Mirror Lines in Magenta */}
                {showMirrorLines && (
                  <g>
                    {shape.mirrorLines.map((ml, idx) => (
                      <line
                        key={idx}
                        x1={ml.x1}
                        y1={ml.y1}
                        x2={ml.x2}
                        y2={ml.y2}
                        stroke="#c026d3"
                        strokeWidth="3.5"
                        strokeDasharray="8 6"
                      />
                    ))}
                  </g>
                )}

                {/* Orange Centre Point of Rotation */}
                <circle cx="150" cy="150" r="7" fill="#ea580c" stroke="#ffffff" strokeWidth="2" />
              </svg>
            </div>

            {/* Teaching Description */}
            <div className="w-full mt-3 p-3 bg-slate-50 rounded-2xl border border-slate-200 text-sm font-bold text-slate-700 text-center">
              {shape.linesDescription} · {shape.orderDescription}
            </div>

            {/* Interaction controls for current shape */}
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={() => setShowMirrorLines(!showMirrorLines)}
                className={`h-12 px-5 rounded-xl font-black text-sm flex items-center gap-2 border-2 transition-all ${
                  showMirrorLines
                    ? 'bg-fuchsia-600 text-white border-fuchsia-700'
                    : 'bg-slate-100 text-slate-700 border-slate-300'
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>{showMirrorLines ? 'Hide Mirror Lines' : 'Show Mirror Lines'}</span>
              </button>

              <button
                onClick={handleRotateStep}
                className="h-12 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm flex items-center gap-2 shadow-md active:scale-95"
              >
                <RotateCw className="w-4 h-4" />
                <span>Step Rotate ({rotationAngle}°)</span>
              </button>

              {rotationAngle > 0 && (
                <button
                  onClick={() => setRotationAngle(0)}
                  className="h-12 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Shape Picker Grid (All 10 shapes) */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 px-1">
              Select Shape from Cambridge 10:
            </span>
            <div className="grid grid-cols-2 gap-2">
              {shapes8_1_gallery.map((s) => (
                <button
                  key={s.name}
                  onClick={() => {
                    setSelectedShapeName(s.name);
                    setRotationAngle(0);
                  }}
                  className={`p-3 rounded-2xl text-left border-2 font-black transition-all active:scale-98 ${
                    selectedShapeName === s.name
                      ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                      : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-base truncate">{s.name}</div>
                  <div className="text-xs font-semibold opacity-75 mt-0.5">
                    Lines: {s.lines === 999 ? '∞' : s.lines} · Order: {s.order === 999 ? '∞' : s.order}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Summary Table Slide */
        <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl my-auto overflow-hidden">
          <div className="text-sm font-bold text-slate-500 mb-3">
            Tap any row to select and highlight that shape.
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200 bg-slate-100 text-slate-900 text-base font-black">
                  <th className="p-3.5">2D Shape</th>
                  <th className="p-3.5">Lines of Symmetry</th>
                  <th className="p-3.5">Order of Rotational Symmetry</th>
                  <th className="p-3.5">Key Characteristic</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-base font-bold text-slate-800">
                {shapes8_1_gallery.map((s) => {
                  const isSel = selectedShapeName === s.name;
                  return (
                    <tr
                      key={s.name}
                      onClick={() => setSelectedShapeName(s.name)}
                      className={`cursor-pointer transition-colors ${
                        isSel ? 'bg-blue-100/90 text-blue-950 font-black' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="p-3.5 flex items-center gap-2">
                        {isSel && <Check className="w-5 h-5 text-blue-700 stroke-[3]" />}
                        <span>{s.name}</span>
                      </td>
                      <td className="p-3.5 font-mono text-lg text-blue-700 font-extrabold">
                        {s.lines === 999 ? 'Infinitely many' : s.lines}
                      </td>
                      <td className="p-3.5 font-mono text-lg text-purple-700 font-extrabold">
                        {s.order === 999 ? 'Infinite' : s.order}
                      </td>
                      <td className="p-3.5 text-xs text-slate-600 font-semibold max-w-xs">
                        {s.linesDescription}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Classroom Prompt */}
      <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 font-bold text-base mt-2">
        Notice: Parallelogram has order 2 but 0 lines of symmetry. Order 1 means NO rotational symmetry!
      </div>
    </div>
  );
};
