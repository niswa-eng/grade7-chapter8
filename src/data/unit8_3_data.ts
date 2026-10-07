import { VocabTerm, PracticeQuestion } from '../types';

export const unit8_3_vocab: VocabTerm[] = [
  {
    term: 'Congruent',
    definition: 'Two shapes are congruent if they have exactly the same shape AND exactly the same size. One fits perfectly on top of the other.',
    example: 'Identical puzzle pieces or stamped coins.',
    iconType: 'congruent'
  },
  {
    term: 'Corresponding sides',
    definition: 'Matching pairs of sides between two congruent shapes. Corresponding sides are always equal in length.',
    example: 'Side AB corresponds to side PQ: AB = PQ.',
    iconType: 'matching-sides'
  },
  {
    term: 'Corresponding angles',
    definition: 'Matching pairs of angles between two congruent shapes. Corresponding angles are always equal in size.',
    example: 'Angle A corresponds to angle P: ∠A = ∠P.',
    iconType: 'matching-angles'
  },
  {
    term: 'Translate (Slide)',
    definition: 'Sliding a shape along a straight path without turning or flipping it. The shape stays congruent.',
    example: 'Sliding a book across a flat desk.',
    iconType: 'translate'
  },
  {
    term: 'Rotate (Turn)',
    definition: 'Turning a shape around a fixed pivot point. The shape stays congruent.',
    example: 'Hands of a clock turning.',
    iconType: 'rotate'
  },
  {
    term: 'Reflect (Flip)',
    definition: 'Flipping a shape over a mirror line to produce a mirror image. The shape stays congruent.',
    example: 'Looking at your hand in a mirror.',
    iconType: 'reflect'
  },
  {
    term: 'Similar (Different size)',
    definition: 'Shapes that have the same shape but different sizes are SIMILAR, not congruent.',
    example: 'A photo and an enlarged copy of the photo.',
    iconType: 'similar'
  }
];

export const unit8_3_practice: PracticeQuestion[] = [
  // Level 1 Basic
  {
    id: '8.3-l1-q1',
    level: 1,
    number: 1,
    title: 'Spotting the Congruent Pair',
    prompt: 'Four shapes labelled A to D (A and C are congruent, one is rotated; B is the same shape but bigger; D is a different shape). Which two shapes are congruent?',
    subPrompt: 'Examine both shape and size carefully. Explain why shape B and shape D are not congruent.',
    diagramType: 'congruent-four-shapes-a-d',
    defaultGrid: 'lines'
  },
  {
    id: '8.3-l1-q2',
    level: 1,
    number: 2,
    title: 'Corresponding Side Length',
    prompt: 'Triangles ABC and PQR are congruent with AB corresponding to PQ. AB = 5 cm. Write down the length of PQ.',
    subPrompt: 'State the rule connecting corresponding sides in congruent shapes.',
    diagramType: 'triangles-abc-pqr-side',
    defaultGrid: 'lines'
  },
  {
    id: '8.3-l1-q3',
    level: 1,
    number: 3,
    title: 'Corresponding Angle Size',
    prompt: 'In two congruent shapes, angle A = 70° and angle A corresponds to angle P. Write down the size of angle P.',
    subPrompt: 'State the rule connecting corresponding angles in congruent shapes.',
    diagramType: 'congruent-angles-70',
    defaultGrid: 'lines'
  },
  // Level 2 Medium
  {
    id: '8.3-l2-q4',
    level: 2,
    number: 4,
    title: 'Reflected Shapes Congruence',
    prompt: 'Triangle A is flipped across a mirror line to give triangle B. Are they congruent? Explain.',
    subPrompt: 'Does flipping a shape change its size or side lengths?',
    diagramType: 'reflected-triangles-grid',
    defaultGrid: 'grid'
  },
  {
    id: '8.3-l2-q5',
    level: 2,
    number: 5,
    title: 'Rotated Rectangles Comparison',
    prompt: 'A rectangle 6 cm by 3 cm and a rectangle 3 cm by 6 cm: Are they congruent? Explain.',
    subPrompt: 'Check if one rectangle can be turned to fit exactly onto the other.',
    diagramType: 'rectangles-turned-compare',
    defaultGrid: 'lines'
  },
  {
    id: '8.3-l2-q6',
    level: 2,
    number: 6,
    title: 'Enlarged Rectangle Comparison',
    prompt: 'A rectangle 6 cm by 3 cm and a rectangle 12 cm by 6 cm: Are they congruent? Explain.',
    subPrompt: 'What mathematical term describes these two shapes instead of congruent?',
    diagramType: 'rectangles-similar-compare',
    defaultGrid: 'lines'
  },
  // Level 3 Challenge
  {
    id: '8.3-l3-q7',
    level: 3,
    number: 7,
    title: 'Same Sides but Different Angles',
    prompt: 'A rectangle and a parallelogram both have sides 8 cm and 2 cm. Explain why they are not congruent.',
    subPrompt: 'Which part of the definition of congruence fails?',
    diagramType: 'rect-vs-parallelogram-sides',
    defaultGrid: 'lines'
  },
  {
    id: '8.3-l3-q8',
    level: 3,
    number: 8,
    title: 'All Corresponding Pairs in Triangles',
    prompt: 'Two congruent triangles ABC and PQR where one has been rotated: Write down the three pairs of corresponding sides and the three pairs of corresponding angles.',
    subPrompt: 'List all 6 equality equations: 3 for sides and 3 for angles.',
    diagramType: 'congruent-triangles-rotated-pairs',
    defaultGrid: 'lines'
  },
  {
    id: '8.3-l3-q9',
    level: 3,
    number: 9,
    title: 'Reflecting an L-Shape on a Grid',
    prompt: 'On a grid, draw a shape that is congruent to a given L-shape by reflecting it in a given mirror line.',
    subPrompt: 'Count grid units from each vertex to the mirror line and draw the reflected shape.',
    diagramType: 'l-shape-reflection-grid',
    defaultGrid: 'grid'
  }
];
