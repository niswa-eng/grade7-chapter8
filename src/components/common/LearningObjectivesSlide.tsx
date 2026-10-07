import React from 'react';
import { Target, CheckCircle2, BookOpen } from 'lucide-react';
import { SubtopicInfo } from '../../types';

interface LearningObjectivesSlideProps {
  subtopic: SubtopicInfo;
}

const OBJECTIVES_MAP: Record<string, { studentGoals: string[]; cambridgeCode: string; formalObjective: string }> = {
  '8.1': {
    studentGoals: [
      'Find and draw lines of symmetry (mirror lines) on 2D shapes.',
      'Test whether a shape has line symmetry by folding along a line.',
      'Understand rotational symmetry and find the order of rotational symmetry in a full 360° turn.',
      'Recognise that order 1 means a shape has NO rotational symmetry.'
    ],
    cambridgeCode: '7Gg.10',
    formalObjective: 'Identify reflective symmetry and order of rotational symmetry of 2D shapes and patterns.'
  },
  '8.2': {
    studentGoals: [
      'Identify and name all 6 parts of a circle: centre, radius, diameter, circumference, chord, and tangent.',
      'Understand that a diameter is twice the radius (d = 2r) and the longest chord.',
      'Explain what makes a 2D shape a polygon, and what makes a polygon REGULAR (all sides equal and all angles equal).',
      'Explore regular polygons from 3 to 10 sides and understand the circle sketching method.'
    ],
    cambridgeCode: '7Gg.01 & 7Gg.03',
    formalObjective: 'Identify, describe and sketch regular polygons including sides, angles and symmetrical properties; identify parts of a circle.'
  },
  '8.3': {
    studentGoals: [
      'Understand that congruent shapes have exactly the same shape AND exactly the same size.',
      'Identify matching (corresponding) sides and corresponding angles between congruent shapes.',
      'Recognise that turning, sliding, or flipping a shape does not change its congruence.',
      'Distinguish congruent shapes from similar shapes (which have different sizes).'
    ],
    cambridgeCode: '7Gg.02',
    formalObjective: 'Understand that if two 2D shapes are congruent, corresponding sides and angles are equal.'
  },
  '8.4': {
    studentGoals: [
      'Distinguish 2D flat shapes from 3D solids (length, width, and height).',
      'Count faces, edges, and vertices on solids accurately.',
      'Describe and compare 8 key 3D solids (prisms, pyramids, and curved solids).',
      'Visualise and draw Front, Side, and Plan (top) views of 3D solids and cube stacks.'
    ],
    cambridgeCode: '7Gg.06 & 7Gg.08',
    formalObjective: 'Identify and describe properties that determine a 3D shape; visualise and represent front, side and top views of 3D shapes.'
  }
};

export const LearningObjectivesSlide: React.FC<LearningObjectivesSlideProps> = ({ subtopic }) => {
  const info = OBJECTIVES_MAP[subtopic.id] || OBJECTIVES_MAP['8.1'];

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-5xl mx-auto px-8 py-6 select-none">
      {/* Top Banner */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center">
          <Target className="w-8 h-8" />
        </div>
        <div>
          <span className="text-sm font-black text-blue-600 uppercase tracking-widest">
            Unit {subtopic.code} Overview
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Learning Objectives
          </h1>
        </div>
      </div>

      {/* Main Student-Friendly Goals */}
      <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-xl mb-6">
        <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
          <span>In this unit, we will learn how to:</span>
        </h2>

        <div className="space-y-4">
          {info.studentGoals.map((goal, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
              </div>
              <p className="text-2xl font-bold text-slate-800 leading-snug">
                {goal}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Cambridge Official Curriculum Footnote */}
      <div className="bg-slate-100/90 rounded-2xl px-6 py-4 flex items-center gap-4 text-slate-600 border border-slate-200">
        <BookOpen className="w-6 h-6 text-slate-500 shrink-0" />
        <div className="text-sm font-semibold">
          <span className="font-bold text-slate-800">Cambridge Mathematics Stage 7 Curriculum: </span>
          <span className="font-mono text-blue-700 font-bold">[{info.cambridgeCode}]</span> {info.formalObjective}
        </div>
      </div>
    </div>
  );
};
