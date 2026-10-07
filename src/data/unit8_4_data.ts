import { VocabTerm, PracticeQuestion } from '../types';

export interface Solid3DInfo {
  id: string;
  name: string;
  faces: number;
  faceDescription: string;
  edges: number;
  edgeDescription: string;
  vertices: number;
  vertexDescription: string;
  hasCurvedSurface: boolean;
  category: 'prism' | 'pyramid' | 'curved' | 'platonic';
  color: string;
  views: {
    front: string; // description
    side: string;
    plan: string;
  };
}

export const solids8_4_data: Solid3DInfo[] = [
  {
    id: 'cube',
    name: 'Cube',
    faces: 6,
    faceDescription: '6 identical square faces',
    edges: 12,
    edgeDescription: '12 straight edges of equal length',
    vertices: 8,
    vertexDescription: '8 vertices (corners)',
    hasCurvedSurface: false,
    category: 'prism',
    color: '#3b82f6',
    views: {
      front: 'Square',
      side: 'Square',
      plan: 'Square'
    }
  },
  {
    id: 'cuboid',
    name: 'Cuboid',
    faces: 6,
    faceDescription: '6 rectangular faces (opposite faces are identical)',
    edges: 12,
    edgeDescription: '12 straight edges',
    vertices: 8,
    vertexDescription: '8 vertices',
    hasCurvedSurface: false,
    category: 'prism',
    color: '#0ea5e9',
    views: {
      front: 'Rectangle',
      side: 'Rectangle',
      plan: 'Rectangle'
    }
  },
  {
    id: 'triangular_prism',
    name: 'Triangular prism',
    faces: 5,
    faceDescription: '5 faces (2 triangular ends, 3 rectangular sides)',
    edges: 9,
    edgeDescription: '9 straight edges',
    vertices: 6,
    vertexDescription: '6 vertices',
    hasCurvedSurface: false,
    category: 'prism',
    color: '#10b981',
    views: {
      front: 'Triangle',
      side: 'Rectangle',
      plan: 'Rectangle (with central apex ridge)'
    }
  },
  {
    id: 'square_pyramid',
    name: 'Square-based pyramid',
    faces: 5,
    faceDescription: '5 faces (1 square base, 4 triangular faces meeting at apex)',
    edges: 8,
    edgeDescription: '8 straight edges (4 base edges, 4 sloping edges)',
    vertices: 5,
    vertexDescription: '5 vertices (4 base corners, 1 apex at top)',
    hasCurvedSurface: false,
    category: 'pyramid',
    color: '#f59e0b',
    views: {
      front: 'Triangle',
      side: 'Triangle',
      plan: 'Square with diagonals meeting at apex'
    }
  },
  {
    id: 'tetrahedron',
    name: 'Tetrahedron',
    faces: 4,
    faceDescription: '4 triangular faces (triangle-based pyramid)',
    edges: 6,
    edgeDescription: '6 straight edges',
    vertices: 4,
    vertexDescription: '4 vertices',
    hasCurvedSurface: false,
    category: 'pyramid',
    color: '#ec4899',
    views: {
      front: 'Triangle',
      side: 'Triangle',
      plan: 'Triangle with three internal lines meeting at top apex'
    }
  },
  {
    id: 'cylinder',
    name: 'Cylinder',
    faces: 3,
    faceDescription: '3 faces (2 flat circular faces, 1 curved surface)',
    edges: 2,
    edgeDescription: '2 curved edges',
    vertices: 0,
    vertexDescription: '0 vertices',
    hasCurvedSurface: true,
    category: 'curved',
    color: '#8b5cf6',
    views: {
      front: 'Rectangle',
      side: 'Rectangle',
      plan: 'Circle'
    }
  },
  {
    id: 'cone',
    name: 'Cone',
    faces: 2,
    faceDescription: '2 faces (1 flat circular base, 1 curved surface)',
    edges: 1,
    edgeDescription: '1 curved edge',
    vertices: 1,
    vertexDescription: '1 vertex (the sharp apex point at the top)',
    hasCurvedSurface: true,
    category: 'curved',
    color: '#f97316',
    views: {
      front: 'Triangle',
      side: 'Triangle',
      plan: 'Circle with center dot (apex point)'
    }
  },
  {
    id: 'sphere',
    name: 'Sphere',
    faces: 1,
    faceDescription: '1 continuous curved surface',
    edges: 0,
    edgeDescription: '0 edges',
    vertices: 0,
    vertexDescription: '0 vertices',
    hasCurvedSurface: true,
    category: 'curved',
    color: '#06b6d4',
    views: {
      front: 'Circle',
      side: 'Circle',
      plan: 'Circle'
    }
  }
];

export interface ClueChainPreset {
  id: string;
  title: string;
  targetSolidId: string;
  clues: {
    text: string;
    filterFn: (solid: Solid3DInfo) => boolean;
  }[];
}

export const clueChainPresets: ClueChainPreset[] = [
  {
    id: 'chain-cube',
    title: 'Mystery Solid A',
    targetSolidId: 'cube',
    clues: [
      {
        text: 'Clue 1: Has exactly 6 faces',
        filterFn: (s) => s.faces === 6
      },
      {
        text: 'Clue 2: ALL faces are squares',
        filterFn: (s) => s.id === 'cube'
      }
    ]
  },
  {
    id: 'chain-pyramid',
    title: 'Mystery Solid B',
    targetSolidId: 'square_pyramid',
    clues: [
      {
        text: 'Clue 1: Has exactly 5 faces',
        filterFn: (s) => s.faces === 5
      },
      {
        text: 'Clue 2: Has exactly 8 edges',
        filterFn: (s) => s.edges === 8
      }
    ]
  },
  {
    id: 'chain-cone',
    title: 'Mystery Solid C',
    targetSolidId: 'cone',
    clues: [
      {
        text: 'Clue 1: Has a curved surface',
        filterFn: (s) => s.hasCurvedSurface
      },
      {
        text: 'Clue 2: Has exactly 1 vertex (apex)',
        filterFn: (s) => s.vertices === 1
      }
    ]
  }
];

export interface CubeStackPreset {
  id: string;
  name: string;
  description: string;
  grid: number[][]; // grid[row][col]: row 0 is back, row 1 is front; col 0 is left
}

export const cubeStackPresets: CubeStackPreset[] = [
  {
    id: 'model-1',
    name: 'Model 1 (5 cubes)',
    description: 'Back row heights [1, 0, 0]; Front row heights [3, 1, 0]',
    grid: [
      [1, 0, 0],
      [3, 1, 0]
    ]
  },
  {
    id: 'model-2',
    name: 'Model 2 (4 cubes)',
    description: 'L-shape of 3 cubes in a row with 1 stacked on the left',
    grid: [
      [0, 0, 0],
      [2, 1, 1]
    ]
  },
  {
    id: 'model-3',
    name: 'Model 3 (6 cubes)',
    description: 'Staircase of heights 1, 2, 3 in a single row',
    grid: [
      [0, 0, 0],
      [1, 2, 3]
    ]
  }
];

export const unit8_4_vocab: VocabTerm[] = [
  {
    term: 'Solid (3D shape)',
    definition: 'A three-dimensional object having length, width, and height. It occupies space in 3 dimensions.',
    example: 'A cube, sphere, or cylinder.',
    iconType: 'solid-cube'
  },
  {
    term: 'Face',
    definition: 'A flat or curved individual surface of a solid.',
    example: 'A cube has 6 flat faces.',
    iconType: 'solid-face'
  },
  {
    term: 'Edge',
    definition: 'A straight or curved line segment where two faces of a solid meet.',
    example: 'A cuboid has 12 straight edges.',
    iconType: 'solid-edge'
  },
  {
    term: 'Vertex (plural: Vertices)',
    definition: 'A sharp corner point where three or more edges meet, or the apex tip of a cone or pyramid.',
    example: 'A cube has 8 vertices.',
    iconType: 'solid-vertex'
  },
  {
    term: 'Curved surface',
    definition: 'A smooth non-flat surface on a solid such as a cylinder, cone, or sphere.',
    example: 'The side of a tin can.',
    iconType: 'curved'
  },
  {
    term: 'Prism',
    definition: 'A solid with identical parallel polygon ends (cross-section) joined by rectangular faces.',
    example: 'Triangular prism, cuboid, hexagonal prism.',
    iconType: 'prism'
  },
  {
    term: 'Pyramid',
    definition: 'A solid with a polygon base and triangular sloping faces meeting at a single top vertex (apex).',
    example: 'Square-based pyramid, tetrahedron.',
    iconType: 'pyramid'
  },
  {
    term: 'Front view',
    definition: 'The 2D orthographic outline seen when looking directly at the solid from the front.',
    example: 'Looking straight at the front elevation.',
    iconType: 'front-view'
  },
  {
    term: 'Side view',
    definition: 'The 2D orthographic outline seen when looking directly at the solid from the side (viewed from the right).',
    example: 'Looking directly at the right-side profile.',
    iconType: 'side-view'
  },
  {
    term: 'Plan view (Top view)',
    definition: 'The 2D orthographic outline seen when looking directly down from above onto the solid.',
    example: 'A bird\'s-eye view looking straight down.',
    iconType: 'plan-view'
  }
];

export const unit8_4_practice: PracticeQuestion[] = [
  // Level 1 Basic
  {
    id: '8.4-l1-q1',
    level: 1,
    number: 1,
    title: 'Solid with 6 Square Faces',
    prompt: 'A solid has 6 square faces. Write down its name.',
    subPrompt: 'State the geometric name and count how many edges and vertices it has.',
    diagramType: 'solid-cube-outline',
    defaultGrid: 'lines'
  },
  {
    id: '8.4-l1-q2',
    level: 1,
    number: 2,
    title: 'Properties of a Cuboid',
    prompt: 'A cuboid: Write down the number of faces, edges and vertices.',
    subPrompt: 'Write down: Faces = __, Edges = __, Vertices = __.',
    diagramType: 'solid-cuboid-outline',
    defaultGrid: 'lines'
  },
  {
    id: '8.4-l1-q3',
    level: 1,
    number: 3,
    title: 'Flat Faces of a Cylinder',
    prompt: 'A tin of beans is a cylinder. Write down the shape of its two flat faces.',
    subPrompt: 'Identify the geometric shape of the top and bottom base faces.',
    diagramType: 'solid-cylinder-outline',
    defaultGrid: 'lines'
  },
  // Level 2 Medium
  {
    id: '8.4-l2-q4',
    level: 2,
    number: 4,
    title: 'Deducing a 5-Faced Solid',
    prompt: 'A solid has 5 faces, 8 edges and 5 vertices. Write down its name.',
    subPrompt: 'Describe the shape of its base and the shapes of its other faces.',
    diagramType: 'solid-pyramid-outline',
    defaultGrid: 'lines'
  },
  {
    id: '8.4-l2-q5',
    level: 2,
    number: 5,
    title: 'Faces of a Triangular Prism',
    prompt: 'A triangular prism: Describe its faces, and write down the number of edges and vertices.',
    subPrompt: 'List the 2 types of 2D shapes that make up its 5 faces.',
    diagramType: 'solid-tri-prism-outline',
    defaultGrid: 'lines'
  },
  {
    id: '8.4-l2-q6',
    level: 2,
    number: 6,
    title: 'Front and Plan Views of an Upright Cylinder',
    prompt: 'A cylinder stands upright on its circular base. Draw its front view and its plan view.',
    subPrompt: 'Label which drawing is the Front view and which is the Plan view (top).',
    diagramType: 'cylinder-views-grid',
    defaultGrid: 'grid'
  },
  // Level 3 Challenge
  {
    id: '8.4-l3-q7',
    level: 3,
    number: 7,
    title: 'Solid with 2 Faces and 1 Vertex',
    prompt: 'A solid has 2 faces, 1 edge and 1 vertex. Write down its name.',
    subPrompt: 'Describe each of its 2 faces and its 1 curved edge.',
    diagramType: 'solid-cone-outline',
    defaultGrid: 'lines'
  },
  {
    id: '8.4-l3-q8',
    level: 3,
    number: 8,
    title: 'Front, Side, and Plan Views of Cube Model 1',
    prompt: 'A model is made of 5 cubes (Model 1: back row heights [1, 0, 0], front row heights [3, 1, 0]). Draw its front view, side view and plan view on the grid.',
    subPrompt: 'Show column heights as seen from the front, from the right side, and from directly above.',
    diagramType: 'model-1-views-grid',
    defaultGrid: 'grid'
  },
  {
    id: '8.4-l3-q9',
    level: 3,
    number: 9,
    title: 'Deduce Solid from Plan and Front Views',
    prompt: 'The plan view of a solid is a circle and its front view is a triangle. Write down the name of the solid.',
    subPrompt: 'Explain why the views produce these shapes and state what feature sits at the top.',
    diagramType: 'solid-views-cone-deduce',
    defaultGrid: 'lines'
  }
];
