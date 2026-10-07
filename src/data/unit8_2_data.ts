import { VocabTerm, PracticeQuestion } from '../types';

export const unit8_2_vocab: VocabTerm[] = [
  {
    term: 'Centre',
    definition: 'The point exactly in the middle of a circle, equidistant from every point on the circumference.',
    example: 'Usually labelled with letter O.',
    iconType: 'centre-point'
  },
  {
    term: 'Radius (plural: Radii)',
    definition: 'A straight line segment from the centre to any point on the circumference. All radii in a circle are equal.',
    example: 'Radius r = 5 cm.',
    iconType: 'radius'
  },
  {
    term: 'Diameter',
    definition: 'A straight line passing through the centre joining two points on the circle. Diameter = 2 × radius.',
    example: 'Diameter = 10 cm when radius = 5 cm.',
    iconType: 'diameter'
  },
  {
    term: 'Circumference',
    definition: 'The perimeter or total distance all the way around the outer boundary of the circle.',
    example: 'The outer boundary of a coin or wheel.',
    iconType: 'circumference'
  },
  {
    term: 'Chord',
    definition: 'A straight line segment connecting any two points on a circle. The diameter is the longest possible chord.',
    example: 'Any straight cut across a circle.',
    iconType: 'chord'
  },
  {
    term: 'Tangent',
    definition: 'A straight line that touches the circle at exactly ONE point. It meets the radius to that point at right angles (90°).',
    example: 'A bicycle wheel touching flat road.',
    iconType: 'tangent'
  },
  {
    term: 'Polygon',
    definition: 'A closed 2D shape with straight sides. Curved shapes (such as circles) are not polygons.',
    example: 'Triangles, quadrilaterals, pentagons.',
    iconType: 'polygon'
  },
  {
    term: 'Regular polygon',
    definition: 'A polygon where ALL sides are equal in length AND ALL interior angles are equal in size.',
    example: 'Both conditions must be true!',
    iconType: 'regular-polygon'
  },
  {
    term: 'Interior angle',
    definition: 'An angle inside a polygon formed between two adjacent sides.',
    example: 'Each interior angle in a square is 90°.',
    iconType: 'angle'
  }
];

export interface RegularPolygonInfo {
  n: number;
  name: string;
  sides: number;
  angles: number;
  interiorAngleDisplay: string;
  linesOfSymmetry: number;
  orderOfRotation: number;
}

export const regularPolygonsData: Record<number, RegularPolygonInfo> = {
  3: {
    n: 3,
    name: 'Equilateral triangle',
    sides: 3,
    angles: 3,
    interiorAngleDisplay: '60°',
    linesOfSymmetry: 3,
    orderOfRotation: 3
  },
  4: {
    n: 4,
    name: 'Square',
    sides: 4,
    angles: 4,
    interiorAngleDisplay: '90°',
    linesOfSymmetry: 4,
    orderOfRotation: 4
  },
  5: {
    n: 5,
    name: 'Regular pentagon',
    sides: 5,
    angles: 5,
    interiorAngleDisplay: '108°',
    linesOfSymmetry: 5,
    orderOfRotation: 5
  },
  6: {
    n: 6,
    name: 'Regular hexagon',
    sides: 6,
    angles: 6,
    interiorAngleDisplay: '120°',
    linesOfSymmetry: 6,
    orderOfRotation: 6
  },
  7: {
    n: 7,
    name: 'Regular heptagon',
    sides: 7,
    angles: 7,
    interiorAngleDisplay: '— (Not an integer)',
    linesOfSymmetry: 7,
    orderOfRotation: 7
  },
  8: {
    n: 8,
    name: 'Regular octagon',
    sides: 8,
    angles: 8,
    interiorAngleDisplay: '135°',
    linesOfSymmetry: 8,
    orderOfRotation: 8
  },
  9: {
    n: 9,
    name: 'Regular nonagon',
    sides: 9,
    angles: 9,
    interiorAngleDisplay: '— (Not an integer)',
    linesOfSymmetry: 9,
    orderOfRotation: 9
  },
  10: {
    n: 10,
    name: 'Regular decagon',
    sides: 10,
    angles: 10,
    interiorAngleDisplay: '144°',
    linesOfSymmetry: 10,
    orderOfRotation: 10
  }
};

export const unit8_2_practice: PracticeQuestion[] = [
  // Level 1 Basic
  {
    id: '8.2-l1-q1',
    level: 1,
    number: 1,
    title: 'Identify Parts of a Circle',
    prompt: 'A circle diagram has six features labelled A to F. Write the name of each labelled part.',
    subPrompt: 'Identify: Centre, Radius, Diameter, Chord, Tangent, Circumference.',
    diagramType: 'circle-labelled-a-f',
    defaultGrid: 'lines'
  },
  {
    id: '8.2-l1-q2',
    level: 1,
    number: 2,
    title: 'Calculating Diameter from Radius',
    prompt: 'A circle has radius 7 cm. Write down its diameter.',
    subPrompt: 'State the relationship between radius and diameter: Diameter = 2 × radius.',
    diagramType: 'radius-calc-circle',
    defaultGrid: 'lines'
  },
  {
    id: '8.2-l1-q3',
    level: 1,
    number: 3,
    title: 'Properties of a Regular Hexagon',
    prompt: 'A regular hexagon: Write down its number of sides, lines of symmetry and order of rotational symmetry.',
    subPrompt: 'Recall the rule for a regular polygon with n sides.',
    diagramType: 'regular-hexagon',
    defaultGrid: 'lines'
  },
  // Level 2 Medium
  {
    id: '8.2-l2-q4',
    level: 2,
    number: 4,
    title: 'Why a Rectangle is Not Regular',
    prompt: 'Explain why a rectangle is not a regular polygon.',
    subPrompt: 'State the TWO conditions required for a polygon to be regular and test each on a rectangle.',
    diagramType: 'rectangle-non-regular',
    defaultGrid: 'lines'
  },
  {
    id: '8.2-l2-q5',
    level: 2,
    number: 5,
    title: 'Regular Octagon Symmetries and Angles',
    prompt: 'A regular octagon: Write down the number of lines of symmetry, the order of rotational symmetry, and the size of each interior angle.',
    subPrompt: 'Write down each value with its mathematical unit.',
    diagramType: 'regular-octagon',
    defaultGrid: 'lines'
  },
  {
    id: '8.2-l2-q6',
    level: 2,
    number: 6,
    title: 'Radius-Tangent Angle Rule',
    prompt: 'A circle with centre O. A tangent touches the circle at point P. Write down the size of the angle between the radius OP and the tangent.',
    subPrompt: 'Sketch the circle, radius OP, and the tangent line at P. Mark the right-angle symbol.',
    diagramType: 'tangent-radius-diagram',
    defaultGrid: 'dots'
  },
  // Level 3 Challenge
  {
    id: '8.2-l3-q7',
    level: 3,
    number: 7,
    title: 'Chord Length Limitation',
    prompt: 'A circle has radius 9 cm. Ali says a chord can be 20 cm long. Explain why he is wrong.',
    subPrompt: 'What is the maximum possible length of any chord in this circle?',
    diagramType: 'circle-chord-limit',
    defaultGrid: 'lines'
  },
  {
    id: '8.2-l3-q8',
    level: 3,
    number: 8,
    title: 'Order 10 Regular Polygon',
    prompt: 'A regular polygon has order of rotational symmetry 10. Write down its name, its number of sides and the size of each interior angle.',
    subPrompt: 'Show how the order of symmetry connects directly to the number of sides.',
    diagramType: 'decagon-geometry',
    defaultGrid: 'lines'
  },
  {
    id: '8.2-l3-q9',
    level: 3,
    number: 9,
    title: 'Sketching a Regular Hexagon: Circle Method',
    prompt: 'Sketch a regular hexagon using the circle method.',
    subPrompt: 'Explain each step: 360° ÷ 6 = 60° angle intervals around the circle, or marking radius lengths around the circumference.',
    diagramType: 'circle-sketch-grid',
    defaultGrid: 'dots'
  }
];
