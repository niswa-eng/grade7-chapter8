export type SubtopicId = '8.1' | '8.2' | '8.3' | '8.4';

export type WhiteboardTool = 'pen' | 'highlighter' | 'eraser' | 'line' | 'circle' | 'rectangle';

export interface Point {
  x: number;
  y: number;
  pressure?: number;
}

export interface WhiteboardStroke {
  id: string;
  tool: WhiteboardTool;
  color: string;
  size: number;
  points: Point[];
  isDashed?: boolean;
}

export type GridType = 'none' | 'dots' | 'grid' | 'lines';

export interface VocabTerm {
  term: string;
  definition: string;
  example: string;
  iconType: string;
}

export interface PracticeQuestion {
  id: string;
  level: 1 | 2 | 3;
  number: number;
  title: string;
  prompt: string;
  subPrompt?: string;
  diagramType?: string;
  diagramData?: any;
  defaultGrid?: GridType;
}

export interface StepDefinition {
  id: string;
  subtopicId: SubtopicId;
  title: string;
  componentType: string;
  cambridgeCode?: string;
  data?: any;
}

export interface SubtopicInfo {
  id: SubtopicId;
  code: string;
  title: string;
  shortTitle: string;
  cambridgeCode: string;
  accentColor: string; // e.g., 'blue', 'green', 'orange', 'purple'
  bgGradient: string;
  steps: StepDefinition[];
}
