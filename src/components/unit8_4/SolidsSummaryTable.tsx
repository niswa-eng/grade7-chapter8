import React, { useState } from 'react';
import { solids8_4_data, Solid3DInfo } from '../../data/unit8_4_data';
import { ThreeSolidViewer } from './ThreeSolidViewer';
import { Check } from 'lucide-react';

interface SolidsSummaryTableProps {
  isInteractMode: boolean;
}

export const SolidsSummaryTable: React.FC<SolidsSummaryTableProps> = ({ isInteractMode }) => {
  const [selectedId, setSelectedId] = useState<string>('cube');

  const activeSolid = solids8_4_data.find((s) => s.id === selectedId) || solids8_4_data[0];

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-6xl mx-auto p-6 select-none overflow-y-auto">
      <div>
        <span className="text-sm font-black text-purple-600 uppercase tracking-widest">
          Unit 8.4 · Reference Summary
        </span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          Summary Table of 3D Solids
        </h2>
        <p className="text-2xl font-bold text-slate-700 leading-snug">
          Tap any row to preview the solid in the 3D viewer on the right!
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6 my-auto items-center">
        {/* Table of 8 Solids */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-xl overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-200 bg-slate-100 text-slate-900 text-sm font-black">
                <th className="p-3">Solid</th>
                <th className="p-3 text-center">Faces</th>
                <th className="p-3 text-center">Edges</th>
                <th className="p-3 text-center">Vertices</th>
                <th className="p-3">Shape of Faces</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-bold text-slate-800">
              {solids8_4_data.map((s) => {
                const isSel = selectedId === s.id;
                return (
                  <tr
                    key={s.id}
                    onClick={() => setSelectedId(s.id)}
                    className={`cursor-pointer transition-colors ${
                      isSel ? 'bg-purple-100/90 text-purple-950 font-black' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="p-3 flex items-center gap-2">
                      {isSel && <Check className="w-4 h-4 text-purple-700 stroke-[3]" />}
                      <span className="text-base">{s.name}</span>
                    </td>
                    <td className="p-3 text-center font-mono text-base text-blue-700">{s.faces}</td>
                    <td className="p-3 text-center font-mono text-base text-rose-700">{s.edges}</td>
                    <td className="p-3 text-center font-mono text-base text-orange-700">{s.vertices}</td>
                    <td className="p-3 text-xs text-slate-600 font-medium max-w-xs">{s.faceDescription}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 3D Preview of Selected Solid */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-3xl p-4 border-2 border-slate-200 shadow-xl flex flex-col items-center justify-center h-[380px] relative">
          <div className="w-full text-center pb-1 border-b border-slate-100 mb-2">
            <span className="text-xl font-black text-slate-900">{activeSolid.name}</span>
          </div>
          <div className="w-full h-full flex-1">
            <ThreeSolidViewer solidId={activeSolid.id} isInteractMode={isInteractMode} />
          </div>
        </div>
      </div>

      <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200 text-purple-950 font-bold text-base mt-2">
        Remember: A vertex is a corner point. A sphere has 0 edges and 0 vertices!
      </div>
    </div>
  );
};
