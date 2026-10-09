import { VocabTerm, PracticeQuestion } from '../types';

export const unit8_1_vocab: VocabTerm[] = [
  {
    term: 'Line of symmetry',
    definition: 'A straight line (mirror line) dividing a shape into two identical halves that fold exactly onto each other.',
    example: 'A square has 4 lines of symmetry.',
    iconType: 'line-symmetry'
  },
  {
    term: 'Reflective symmetry',
    definition: 'When one half of a shape is the exact reflection (mirror image) of the other half.',
    example: 'A butterfly displays reflective symmetry.',
    iconType: 'reflect'
  },
  {
    term: 'Mirror line',
    definition: 'The line along which a shape can be folded to produce two matching halves.',
    example: 'Dashed line on geometry diagrams.',
    iconType: 'mirror'
  },
  {
    term: 'Rotational symmetry',
    definition: 'When a shape fits onto its own outline more than once during a full 360° turn about its centre.',
    example: 'A pinwheel looks identical multiple times when spun.',
    iconType: 'rotate'
  },
  {
    term: 'Centre of rotation',
    definition: 'The fixed point about which a shape is rotated.',
    example: 'The exact central point of a shape.',
    iconType: 'centre'
  },
  {
    term: 'Order of rotational symmetry',
    definition: 'The total number of times a shape looks exactly the same during one complete 360° turn.',
    example: 'Angle between matches = 360° ÷ order.',
    iconType: 'order'
  },
  {
    term: 'Order 1 (No rotational symmetry)',
    definition: 'Every shape matches at 360° (full turn). If it only matches once at the end, it has NO rotational symmetry.',
    example: 'A scalene triangle has order 1.',
    iconType: 'order1'
  }
];

export interface ShapeSymmetryData {
  name: string;
  lines: number;
  linesDescription: string;
  order: number;
  orderDescription: string;
  anglesOfMatch: number[];
  polygonPoints: [number, number][]; // normalized coordinates in 300x300 viewBox
  mirrorLines: { x1: number; y1: number; x2: number; y2: number; label: string }[];
  isCircle?: boolean;
}

export const shapes8_1_gallery: ShapeSymmetryData[] = [
  {
    name: 'Square',
    lines: 4,
    linesDescription: '4 lines (2 vertical/horizontal through midpoints, 2 diagonals)',
    order: 4,
    orderDescription: 'Order 4 (matches every 90°: 90°, 180°, 270°, 360°)',
    anglesOfMatch: [90, 180, 270, 360],
    polygonPoints: [[60, 60], [240, 60], [240, 240], [60, 240]],
    mirrorLines: [
      { x1: 150, y1: 30, x2: 150, y2: 270, label: 'Vertical' },
      { x1: 30, y1: 150, x2: 270, y2: 150, label: 'Horizontal' },
      { x1: 30, y1: 30, x2: 270, y2: 270, label: 'Diagonal 1' },
      { x1: 270, y1: 30, x2: 30, y2: 270, label: 'Diagonal 2' }
    ]
  },
  {
    name: 'Rectangle',
    lines: 2,
    linesDescription: '2 lines (horizontal & vertical through edge midpoints; diagonals are NOT lines of symmetry)',
    order: 2,
    orderDescription: 'Order 2 (matches every 180°: 180°, 360°)',
    anglesOfMatch: [180, 360],
    polygonPoints: [[40, 85], [260, 85], [260, 215], [40, 215]],
    mirrorLines: [
      { x1: 150, y1: 45, x2: 150, y2: 255, label: 'Vertical' },
      { x1: 20, y1: 150, x2: 280, y2: 150, label: 'Horizontal' }
    ]
  },
  {
    name: 'Rhombus',
    lines: 2,
    linesDescription: '2 lines (both diagonals joining opposite vertices)',
    order: 2,
    orderDescription: 'Order 2 (matches every 180°: 180°, 360°)',
    anglesOfMatch: [180, 360],
    polygonPoints: [[150, 45], [265, 150], [150, 255], [35, 150]],
    mirrorLines: [
      { x1: 150, y1: 20, x2: 150, y2: 280, label: 'Vertical diagonal' },
      { x1: 20, y1: 150, x2: 280, y2: 150, label: 'Horizontal diagonal' }
    ]
  },
  {
    name: 'Parallelogram',
    lines: 0,
    linesDescription: '0 lines (neither diagonals nor midlines are lines of symmetry)',
    order: 2,
    orderDescription: 'Order 2 (matches every 180°: 180°, 360°)',
    anglesOfMatch: [180, 360],
    polygonPoints: [[80, 85], [275, 85], [220, 215], [25, 215]],
    mirrorLines: []
  },
  {
    name: 'Kite',
    lines: 1,
    linesDescription: '1 line (main diagonal joining vertices between equal pairs of sides)',
    order: 1,
    orderDescription: 'Order 1 (matches only at full turn 360° - NO rotational symmetry)',
    anglesOfMatch: [360],
    polygonPoints: [[150, 40], [245, 120], [150, 265], [55, 120]],
    mirrorLines: [
      { x1: 150, y1: 20, x2: 150, y2: 280, label: 'Main vertical axis' }
    ]
  },
  {
    name: 'Isosceles trapezium',
    lines: 1,
    linesDescription: '1 line (vertical midline through parallel bases)',
    order: 1,
    orderDescription: 'Order 1 (matches only at full turn 360° - NO rotational symmetry)',
    anglesOfMatch: [360],
    polygonPoints: [[95, 75], [205, 75], [265, 225], [35, 225]],
    mirrorLines: [
      { x1: 150, y1: 45, x2: 150, y2: 255, label: 'Vertical midline' }
    ]
  },
  {
    name: 'Equilateral triangle',
    lines: 3,
    linesDescription: '3 lines (each from a vertex to midpoint of opposite side)',
    order: 3,
    orderDescription: 'Order 3 (matches every 120°: 120°, 240°, 360°)',
    anglesOfMatch: [120, 240, 360],
    polygonPoints: [[150, 55], [232.3, 197.5], [67.7, 197.5]],
    mirrorLines: [
      { x1: 150, y1: 25, x2: 150, y2: 250, label: 'Vertical' },
      { x1: 255, y1: 210, x2: 45, y2: 90, label: 'Vertex 2 to opposite' },
      { x1: 45, y1: 210, x2: 255, y2: 90, label: 'Vertex 3 to opposite' }
    ]
  },
  {
    name: 'Isosceles triangle',
    lines: 1,
    linesDescription: '1 line (from vertex between equal sides to midpoint of base)',
    order: 1,
    orderDescription: 'Order 1 (matches only at full turn 360° - NO rotational symmetry)',
    anglesOfMatch: [360],
    polygonPoints: [[150, 45], [235, 245], [65, 245]],
    mirrorLines: [
      { x1: 150, y1: 25, x2: 150, y2: 265, label: 'Vertical bisector' }
    ]
  },
  {
    name: 'Scalene triangle',
    lines: 0,
    linesDescription: '0 lines (all sides and angles different)',
    order: 1,
    orderDescription: 'Order 1 (matches only at full turn 360° - NO rotational symmetry)',
    anglesOfMatch: [360],
    polygonPoints: [[120, 65], [235, 170], [95, 215]],
    mirrorLines: []
  },
  {
    name: 'Circle',
    lines: 999,
    linesDescription: 'Infinitely many lines (every diameter is a line of symmetry)',
    order: 999,
    orderDescription: 'Infinite order (looks identical at any angle of rotation)',
    anglesOfMatch: [0, 45, 90, 135, 180, 225, 270, 315, 360],
    polygonPoints: [],
    isCircle: true,
    mirrorLines: [
      { x1: 150, y1: 25, x2: 150, y2: 275, label: 'Vertical diameter' },
      { x1: 25, y1: 150, x2: 275, y2: 150, label: 'Horizontal diameter' },
      { x1: 60, y1: 60, x2: 240, y2: 240, label: 'Diagonal 1' },
      { x1: 240, y1: 60, x2: 60, y2: 240, label: 'Diagonal 2' }
    ]
  }
];

export const unit8_1_practice: PracticeQuestion[] = [
  // Level 1 Basic
  {
    id: '8.1-l1-q1',
    level: 1,
    number: 1,
    title: 'Lines of Symmetry: Equilateral Triangle',
    prompt: 'Equilateral triangle: Draw all its lines of symmetry.',
    subPrompt: 'How many lines of symmetry does an equilateral triangle have? Use the whiteboard tools to sketch them directly on the triangle below.',
    diagramType: 'equilateral-triangle',
    defaultGrid: 'dots'
  },
  {
    id: '8.1-l1-q2',
    level: 1,
    number: 2,
    title: 'Rotational Symmetry: Rectangle',
    prompt: 'Rectangle: Write down the order of rotational symmetry.',
    subPrompt: 'State the order of rotational symmetry and write down the angles in one full turn where it matches its outline.',
    diagramType: 'rectangle',
    defaultGrid: 'lines'
  },
  {
    id: '8.1-l1-q3',
    level: 1,
    number: 3,
    title: 'Symmetry of a Scalene Triangle',
    prompt: 'Scalene triangle: Write down its number of lines of symmetry and its order of rotational symmetry.',
    subPrompt: 'Explain what order 1 means for rotational symmetry.',
    diagramType: 'scalene-triangle',
    defaultGrid: 'lines'
  },
  // Level 2 Medium
  {
    id: '8.1-l2-q4',
    level: 2,
    number: 4,
    title: 'Diagonal of a Parallelogram Misconception',
    prompt: 'A student says: "A diagonal of this parallelogram is a line of symmetry." Explain why the student is wrong.',
    subPrompt: 'Draw the parallelogram, draw the diagonal, and show why folding across it does NOT produce overlapping halves.',
    diagramType: 'parallelogram-diagonal',
    defaultGrid: 'grid'
  },
  {
    id: '8.1-l2-q5',
    level: 2,
    number: 5,
    title: 'Comparing Kite and Rhombus',
    prompt: 'Kite and rhombus: For each, write the number of lines of symmetry and the order of rotational symmetry.',
    subPrompt: 'List both shapes side by side and compare their lines of symmetry and orders.',
    diagramType: 'kite-rhombus-compare',
    defaultGrid: 'lines'
  },
  {
    id: '8.1-l2-q6',
    level: 2,
    number: 6,
    title: 'Reflective Grid Completion',
    prompt: 'A grid with half a shape and a dashed mirror line: Complete the shape so the dashed line is a line of symmetry.',
    subPrompt: 'Reflect each vertex across the mirror line count by count and connect them on the grid.',
    diagramType: 'half-shape-grid',
    defaultGrid: 'grid'
  },
  // Level 3 Challenge
  {
    id: '8.1-l3-q7',
    level: 3,
    number: 7,
    title: 'Pinwheel Symmetry Analysis',
    prompt: 'The three-bladed pinwheel pattern: Write down its number of lines of symmetry and the order of rotational symmetry.',
    subPrompt: 'Consider whether curved blades permit any mirror line reflection.',
    diagramType: 'pinwheel-pattern',
    defaultGrid: 'lines'
  },
  {
    id: '8.1-l3-q8',
    level: 3,
    number: 8,
    title: 'Draw a Special Quadrilateral',
    prompt: 'Draw a quadrilateral with order of rotational symmetry 2 and NO lines of symmetry. Name it.',
    subPrompt: 'State the exact geometric definition and mark equal parallel sides.',
    diagramType: 'blank-grid',
    defaultGrid: 'grid'
  },
  {
    id: '8.1-l3-q9',
    level: 3,
    number: 9,
    title: 'Reverse Symmetry Deduction',
    prompt: 'A shape has exactly 1 line of symmetry and order 1. Write down the names of two different shapes that fit.',
    subPrompt: 'Explain why both shapes satisfy both conditions.',
    diagramType: 'blank-workspace',
    defaultGrid: 'lines'
  }
];
