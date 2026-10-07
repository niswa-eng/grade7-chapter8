import { SubtopicInfo, StepDefinition } from '../types';
import { unit8_1_practice } from './unit8_1_data';
import { unit8_2_practice } from './unit8_2_data';
import { unit8_3_practice } from './unit8_3_data';
import { unit8_4_practice } from './unit8_4_data';

// Helper to build practice steps
function createPracticeSteps(subtopicId: '8.1' | '8.2' | '8.3' | '8.4', questions: typeof unit8_1_practice): StepDefinition[] {
  return questions.map((q, idx) => ({
    id: `${subtopicId}-step-practice-${q.id}`,
    subtopicId,
    title: `Practice: Level ${q.level} (Q${q.number})`,
    componentType: 'practice',
    data: { questionIndex: idx, question: q }
  }));
}

export const subtopicsData: SubtopicInfo[] = [
  {
    id: '8.1',
    code: '8.1',
    title: 'Identifying the symmetry of 2D shapes',
    shortTitle: '8.1 Symmetry of 2D shapes',
    cambridgeCode: '7Gg.10',
    accentColor: 'blue',
    bgGradient: 'from-blue-50/70 to-indigo-50/40',
    steps: [
      { id: '8.1-1', subtopicId: '8.1', title: 'Learning Objectives', componentType: 'learning-objectives' },
      { id: '8.1-2', subtopicId: '8.1', title: 'Hook: Symmetrical Things in Everyday Life', componentType: '8.1-hook' },
      { id: '8.1-3', subtopicId: '8.1', title: 'Line Symmetry & The Fold Test', componentType: '8.1-line-symmetry' },
      { id: '8.1-4', subtopicId: '8.1', title: 'Testing Candidate Lines of Symmetry', componentType: '8.1-finding-lines' },
      { id: '8.1-5', subtopicId: '8.1', title: 'Rotational Symmetry & Full Turn Test', componentType: '8.1-rotational-symmetry' },
      { id: '8.1-6', subtopicId: '8.1', title: 'Order of Rotational Symmetry', componentType: '8.1-order-of-rotation' },
      { id: '8.1-7', subtopicId: '8.1', title: 'Shape Gallery & Symmetries Table', componentType: '8.1-shape-gallery' },
      { id: '8.1-8', subtopicId: '8.1', title: 'Common Mistakes in Symmetry', componentType: '8.1-common-mistakes' },
      { id: '8.1-9', subtopicId: '8.1', title: 'Symmetry in Patterns & Logos', componentType: '8.1-patterns' },
      { id: '8.1-10', subtopicId: '8.1', title: 'Unit 8.1 Vocabulary Cards', componentType: 'vocabulary' },
      ...createPracticeSteps('8.1', unit8_1_practice)
    ]
  },
  {
    id: '8.2',
    code: '8.2',
    title: 'Circles and polygons',
    shortTitle: '8.2 Circles & polygons',
    cambridgeCode: '7Gg.01 & 7Gg.03',
    accentColor: 'emerald',
    bgGradient: 'from-emerald-50/70 to-teal-50/40',
    steps: [
      { id: '8.2-1', subtopicId: '8.2', title: 'Learning Objectives', componentType: 'learning-objectives' },
      { id: '8.2-2', subtopicId: '8.2', title: 'Part A: Building the Circle Step-by-Step', componentType: '8.2-circle-build' },
      { id: '8.2-3', subtopicId: '8.2', title: 'Parts of a Circle Summary', componentType: '8.2-circle-summary' },
      { id: '8.2-4', subtopicId: '8.2', title: 'Part B: What is a Polygon?', componentType: '8.2-polygon-definition' },
      { id: '8.2-5', subtopicId: '8.2', title: 'Regular Polygons & Non-Examples', componentType: '8.2-regular-concept' },
      { id: '8.2-6', subtopicId: '8.2', title: 'Regular Polygon Explorer (n = 3 to 10)', componentType: '8.2-regular-explorer' },
      { id: '8.2-7', subtopicId: '8.2', title: 'Regular Polygons Reference Table', componentType: '8.2-polygon-table' },
      { id: '8.2-8', subtopicId: '8.2', title: 'Sketching a Regular Polygon (Circle Method)', componentType: '8.2-sketching-demo' },
      { id: '8.2-9', subtopicId: '8.2', title: 'Unit 8.2 Vocabulary Cards', componentType: 'vocabulary' },
      ...createPracticeSteps('8.2', unit8_2_practice)
    ]
  },
  {
    id: '8.3',
    code: '8.3',
    title: 'Recognising congruent shapes',
    shortTitle: '8.3 Congruent shapes',
    cambridgeCode: '7Gg.02',
    accentColor: 'orange',
    bgGradient: 'from-amber-50/70 to-orange-50/40',
    steps: [
      { id: '8.3-1', subtopicId: '8.3', title: 'Learning Objectives', componentType: 'learning-objectives' },
      { id: '8.3-2', subtopicId: '8.3', title: 'Hook: The Perfect Fit', componentType: '8.3-hook' },
      { id: '8.3-3', subtopicId: '8.3', title: 'What Does Congruent Mean?', componentType: '8.3-definition' },
      { id: '8.3-4', subtopicId: '8.3', title: 'Corresponding Sides & Corresponding Angles', componentType: '8.3-corresponding-parts' },
      { id: '8.3-5', subtopicId: '8.3', title: 'Same Shape, Different Position (Turn, Slide, Flip)', componentType: '8.3-transformations' },
      { id: '8.3-6', subtopicId: '8.3', title: 'Non-Examples: Not Congruent', componentType: '8.3-non-examples' },
      { id: '8.3-7', subtopicId: '8.3', title: 'Congruence Checklist', componentType: '8.3-checklist' },
      { id: '8.3-8', subtopicId: '8.3', title: 'Unit 8.3 Vocabulary Cards', componentType: 'vocabulary' },
      ...createPracticeSteps('8.3', unit8_3_practice)
    ]
  },
  {
    id: '8.4',
    code: '8.4',
    title: '3D shapes',
    shortTitle: '8.4 3D shapes',
    cambridgeCode: '7Gg.06 & 7Gg.08',
    accentColor: 'purple',
    bgGradient: 'from-purple-50/70 to-violet-50/40',
    steps: [
      { id: '8.4-1', subtopicId: '8.4', title: 'Learning Objectives', componentType: 'learning-objectives' },
      { id: '8.4-2', subtopicId: '8.4', title: '2D Shapes vs 3D Solids', componentType: '8.4-dimensions-demo' },
      { id: '8.4-3', subtopicId: '8.4', title: 'Faces, Edges, and Vertices on a Cube', componentType: '8.4-cube-elements' },
      { id: '8.4-4', subtopicId: '8.4', title: 'Interactive Solid Explorer (8 Solids)', componentType: '8.4-solid-explorer' },
      { id: '8.4-5', subtopicId: '8.4', title: 'Summary Table of 3D Solids', componentType: '8.4-solids-table' },
      { id: '8.4-6', subtopicId: '8.4', title: 'Describing a Solid from Clues', componentType: '8.4-clues-deduction' },
      { id: '8.4-7', subtopicId: '8.4', title: 'Front, Side, and Plan Views Concept', componentType: '8.4-views-concept' },
      { id: '8.4-8', subtopicId: '8.4', title: 'Views of Simple 3D Solids', componentType: '8.4-views-simple' },
      { id: '8.4-9', subtopicId: '8.4', title: 'Views of Cube Stacks & Preset Models', componentType: '8.4-cube-stacks' },
      { id: '8.4-10', subtopicId: '8.4', title: 'Unit 8.4 Vocabulary Cards', componentType: 'vocabulary' },
      ...createPracticeSteps('8.4', unit8_4_practice)
    ]
  }
];
