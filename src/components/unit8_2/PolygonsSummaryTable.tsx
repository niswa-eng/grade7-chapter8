import React from 'react';
import { regularPolygonsData } from '../../data/unit8_2_data';

export const PolygonsSummaryTable: React.FC = () => {
  const tableItems = [3, 4, 5, 6, 8, 10].map((n) => regularPolygonsData[n]);

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-6xl mx-auto p-6 select-none overflow-y-auto">
      <div>
        <span className="text-sm font-black text-emerald-600 uppercase tracking-widest">
          Unit 8.2 · Reference Summary
        </span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          Regular Polygons Reference Table
        </h2>
        <p className="text-2xl font-bold text-slate-700 leading-snug">
          Essential regular polygon properties tested in Cambridge Mathematics Stage 7.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl my-auto overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-200 bg-slate-100 text-slate-900 text-lg font-black">
              <th className="p-4">Regular Polygon</th>
              <th className="p-4">Number of Sides</th>
              <th className="p-4">Lines of Symmetry</th>
              <th className="p-4">Order of Rotational Symmetry</th>
              <th className="p-4">Each Interior Angle</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-lg font-bold text-slate-800">
            {tableItems.map((poly) => (
              <tr key={poly.n} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-black text-slate-900 text-xl flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-sm font-mono font-black">
                    {poly.n}
                  </span>
                  <span>{poly.name}</span>
                </td>
                <td className="p-4 font-mono font-black text-xl text-slate-700">{poly.sides}</td>
                <td className="p-4 font-mono font-black text-xl text-blue-700">{poly.linesOfSymmetry}</td>
                <td className="p-4 font-mono font-black text-xl text-purple-700">{poly.orderOfRotation}</td>
                <td className="p-4 font-mono font-black text-xl text-emerald-700">{poly.interiorAngleDisplay}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-bold text-lg">
        <span>In every regular polygon: Sides = Angles = Lines of Symmetry = Order of Rotational Symmetry = n.</span>
      </div>
    </div>
  );
};
