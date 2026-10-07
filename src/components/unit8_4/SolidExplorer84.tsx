import React, { useState } from 'react';
import { solids8_4_data, Solid3DInfo } from '../../data/unit8_4_data';
import { ThreeSolidViewer } from './ThreeSolidViewer';
import { Box, Layers, Check } from 'lucide-react';

interface SolidExplorer84Props {
  isInteractMode: boolean;
}

export const SolidExplorer84: React.FC<SolidExplorer84Props> = ({ isInteractMode }) => {
  const [selectedId, setSelectedId] = useState<string>('cube');

  const solid = solids8_4_data.find((s) => s.id === selectedId) || solids8_4_data[0];

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-6xl mx-auto p-6 select-none overflow-y-auto">
      <div>
        <span className="text-sm font-black text-purple-600 uppercase tracking-widest">
          Unit 8.4 · Concept 3
        </span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          3D Solid Explorer (8 Solids)
        </h2>
        <p className="text-2xl font-bold text-slate-700 leading-snug">
          Inspect each 3D solid, rotate it in 3D, and count its faces, edges, and vertices!
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6 my-auto items-center">
        {/* Three.js 3D Viewport */}
        <div className="col-span-12 md:col-span-7 bg-white rounded-3xl p-4 border-2 border-slate-200 shadow-xl flex flex-col items-center justify-center h-[420px] relative">
          <ThreeSolidViewer solidId={solid.id} isInteractMode={isInteractMode} />
        </div>

        {/* Solid Properties & Counts Panel */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-3">
          {/* Header Title */}
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-black text-slate-900">{solid.name}</h3>
            <span className="text-xs font-black uppercase px-3 py-1 rounded-xl bg-purple-100 text-purple-900">
              {solid.category}
            </span>
          </div>

          {/* Counts Matrix */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-center">
              <span className="text-xs font-black uppercase text-blue-700 block">Faces</span>
              <span className="text-3xl font-black font-mono text-blue-900">{solid.faces}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-center">
              <span className="text-xs font-black uppercase text-rose-700 block">Edges</span>
              <span className="text-3xl font-black font-mono text-rose-900">{solid.edges}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-200 text-center">
              <span className="text-xs font-black uppercase text-orange-700 block">Vertices</span>
              <span className="text-3xl font-black font-mono text-orange-900">{solid.vertices}</span>
            </div>
          </div>

          {/* Detailed Descriptions */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-sm font-bold text-slate-700">
            <div>
              <span className="text-slate-900 font-extrabold">Face Shapes: </span>
              {solid.faceDescription}
            </div>
            <div>
              <span className="text-slate-900 font-extrabold">Edges: </span>
              {solid.edgeDescription}
            </div>
            <div>
              <span className="text-slate-900 font-extrabold">Vertices: </span>
              {solid.vertexDescription}
            </div>
          </div>

          {/* Quick 8 Solids Selector */}
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5 block">
              Choose Solid:
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              {solids8_4_data.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedId(s.id)}
                  className={`p-2 rounded-xl text-center font-bold text-xs border-2 transition-all truncate ${
                    selectedId === s.id
                      ? 'bg-purple-600 text-white border-purple-700 shadow-md font-black'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                  title={s.name}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200 text-purple-950 font-bold text-base mt-2">
        <span>A prism has identical polygon ends, while a pyramid has a polygon base meeting at an apex.</span>
      </div>
    </div>
  );
};
