import React, { useState, useEffect, useCallback } from 'react';
import { SubtopicId, WhiteboardTool } from './types';
import { subtopicsData } from './data/subtopics';
import { unit8_1_vocab, unit8_1_practice } from './data/unit8_1_data';
import { unit8_2_vocab, unit8_2_practice } from './data/unit8_2_data';
import { unit8_3_vocab, unit8_3_practice } from './data/unit8_3_data';
import { unit8_4_vocab, unit8_4_practice } from './data/unit8_4_data';

// Whiteboard
import { WhiteboardCanvas } from './components/whiteboard/WhiteboardCanvas';
import { WhiteboardToolbar } from './components/whiteboard/WhiteboardToolbar';

// Layout
import { TopBar } from './components/layout/TopBar';
import { BottomBar } from './components/layout/BottomBar';
import { HelpModal } from './components/layout/HelpModal';

// Common
import { LearningObjectivesSlide } from './components/common/LearningObjectivesSlide';
import { VocabularyCards } from './components/common/VocabularyCards';
import { PracticeSlide } from './components/common/PracticeSlide';

// Unit 8.1
import { SymmetryHook } from './components/unit8_1/SymmetryHook';
import { LineSymmetryDemo } from './components/unit8_1/LineSymmetryDemo';
import { FindingLinesDemo } from './components/unit8_1/FindingLinesDemo';
import { RotationalSymmetryDemo } from './components/unit8_1/RotationalSymmetryDemo';
import { OrderOfRotationDemo } from './components/unit8_1/OrderOfRotationDemo';
import { ShapeGallery81 } from './components/unit8_1/ShapeGallery81';
import { CommonMistakes81 } from './components/unit8_1/CommonMistakes81';
import { Patterns81 } from './components/unit8_1/Patterns81';

// Unit 8.2
import { CircleBuildDemo } from './components/unit8_2/CircleBuildDemo';
import { CircleSummarySlide } from './components/unit8_2/CircleSummarySlide';
import { PolygonDefinitionDemo } from './components/unit8_2/PolygonDefinitionDemo';
import { RegularPolygonConcept } from './components/unit8_2/RegularPolygonConcept';
import { RegularPolygonExplorer } from './components/unit8_2/RegularPolygonExplorer';
import { PolygonsSummaryTable } from './components/unit8_2/PolygonsSummaryTable';
import { SketchingRegularPolygonDemo } from './components/unit8_2/SketchingRegularPolygonDemo';

// Unit 8.3
import { CongruentHook } from './components/unit8_3/CongruentHook';
import { CongruentDefinition } from './components/unit8_3/CongruentDefinition';
import { CorrespondingPartsDemo } from './components/unit8_3/CorrespondingPartsDemo';
import { TransformationsDemo } from './components/unit8_3/TransformationsDemo';
import { NonExamples83 } from './components/unit8_3/NonExamples83';
import { CongruenceChecklist } from './components/unit8_3/CongruenceChecklist';

// Unit 8.4
import { DimensionsDemo } from './components/unit8_4/DimensionsDemo';
import { CubeElementsDemo } from './components/unit8_4/CubeElementsDemo';
import { SolidExplorer84 } from './components/unit8_4/SolidExplorer84';
import { SolidsSummaryTable } from './components/unit8_4/SolidsSummaryTable';
import { SolidClueDeduction } from './components/unit8_4/SolidClueDeduction';
import { ViewsConcept84 } from './components/unit8_4/ViewsConcept84';
import { ViewsSimpleSolids } from './components/unit8_4/ViewsSimpleSolids';
import { CubeStackViewsDemo } from './components/unit8_4/CubeStackViewsDemo';

export function App() {
  const [currentSubtopicId, setCurrentSubtopicId] = useState<SubtopicId>('8.1');
  // Remember last visited step index per subtopic while app is open
  const [subtopicSteps, setSubtopicSteps] = useState<Record<SubtopicId, number>>({
    '8.1': 0,
    '8.2': 0,
    '8.3': 0,
    '8.4': 0
  });

  // Whiteboard drawing state
  const [isDrawMode, setIsDrawMode] = useState<boolean>(false);
  const [activeTool, setActiveTool] = useState<WhiteboardTool>('pen');
  const [activeColor, setActiveColor] = useState<string>('#0f172a');
  const [activeSize, setActiveSize] = useState<number>(6);
  const [isDashed, setIsDashed] = useState<boolean>(false);

  // Whiteboard history triggers
  const [undoTrigger, setUndoTrigger] = useState<number>(0);
  const [redoTrigger, setRedoTrigger] = useState<number>(0);
  const [clearTrigger, setClearTrigger] = useState<number>(0);
  const [canUndo, setCanUndo] = useState<boolean>(false);
  const [canRedo, setCanRedo] = useState<boolean>(false);

  // UI state
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  const currentSubtopic = subtopicsData.find((s) => s.id === currentSubtopicId) || subtopicsData[0];
  const currentStepIndex = subtopicSteps[currentSubtopicId] || 0;
  const currentStep = currentSubtopic.steps[currentStepIndex] || currentSubtopic.steps[0];

  const handleSelectSubtopic = (id: SubtopicId) => {
    setCurrentSubtopicId(id);
  };

  const handleSelectStepIndex = (index: number) => {
    setSubtopicSteps((prev) => ({
      ...prev,
      [currentSubtopicId]: Math.max(0, Math.min(currentSubtopic.steps.length - 1, index))
    }));
  };

  const handlePrev = () => {
    handleSelectStepIndex(currentStepIndex - 1);
  };

  const handleNext = () => {
    handleSelectStepIndex(currentStepIndex + 1);
  };

  // Keyboard navigation for presentation clicker / keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isDrawMode) return; // In draw mode, do not intercept keys
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStepIndex, currentSubtopic, isDrawMode]);

  // Render current lesson slide
  const renderStepContent = () => {
    const type = currentStep.componentType;

    // Common Step Components
    if (type === 'learning-objectives') {
      return <LearningObjectivesSlide subtopic={currentSubtopic} />;
    }

    if (type === 'vocabulary') {
      let terms = unit8_1_vocab;
      if (currentSubtopicId === '8.2') terms = unit8_2_vocab;
      if (currentSubtopicId === '8.3') terms = unit8_3_vocab;
      if (currentSubtopicId === '8.4') terms = unit8_4_vocab;
      return <VocabularyCards terms={terms} title={`Unit ${currentSubtopic.code} Key Vocabulary`} />;
    }

    if (type === 'practice') {
      let allQuestions = unit8_1_practice;
      if (currentSubtopicId === '8.2') allQuestions = unit8_2_practice;
      if (currentSubtopicId === '8.3') allQuestions = unit8_3_practice;
      if (currentSubtopicId === '8.4') allQuestions = unit8_4_practice;

      const q = currentStep.data?.question || allQuestions[0];
      return (
        <PracticeSlide
          question={q}
          allQuestions={allQuestions}
          onSelectQuestion={(qIndex) => {
            // Find step corresponding to question index
            // In subtopicsData, practice steps begin after the theory steps
            const nonPracticeCount = currentSubtopic.steps.findIndex((s) => s.componentType === 'practice');
            handleSelectStepIndex(nonPracticeCount + qIndex);
          }}
        />
      );
    }

    // Unit 8.1
    switch (type) {
      case '8.1-hook': return <SymmetryHook />;
      case '8.1-line-symmetry': return <LineSymmetryDemo />;
      case '8.1-finding-lines': return <FindingLinesDemo />;
      case '8.1-rotational-symmetry': return <RotationalSymmetryDemo />;
      case '8.1-order-of-rotation': return <OrderOfRotationDemo />;
      case '8.1-shape-gallery': return <ShapeGallery81 />;
      case '8.1-common-mistakes': return <CommonMistakes81 />;
      case '8.1-patterns': return <Patterns81 />;

      // Unit 8.2
      case '8.2-circle-build': return <CircleBuildDemo />;
      case '8.2-circle-summary': return <CircleSummarySlide />;
      case '8.2-polygon-definition': return <PolygonDefinitionDemo />;
      case '8.2-regular-concept': return <RegularPolygonConcept />;
      case '8.2-regular-explorer': return <RegularPolygonExplorer />;
      case '8.2-polygon-table': return <PolygonsSummaryTable />;
      case '8.2-sketching-demo': return <SketchingRegularPolygonDemo />;

      // Unit 8.3
      case '8.3-hook': return <CongruentHook />;
      case '8.3-definition': return <CongruentDefinition />;
      case '8.3-corresponding-parts': return <CorrespondingPartsDemo />;
      case '8.3-transformations': return <TransformationsDemo />;
      case '8.3-non-examples': return <NonExamples83 />;
      case '8.3-checklist': return <CongruenceChecklist />;

      // Unit 8.4
      case '8.4-dimensions-demo': return <DimensionsDemo />;
      case '8.4-cube-elements': return <CubeElementsDemo />;
      case '8.4-solid-explorer': return <SolidExplorer84 isInteractMode={!isDrawMode} />;
      case '8.4-solids-table': return <SolidsSummaryTable isInteractMode={!isDrawMode} />;
      case '8.4-clues-deduction': return <SolidClueDeduction />;
      case '8.4-views-concept': return <ViewsConcept84 isInteractMode={!isDrawMode} />;
      case '8.4-views-simple': return <ViewsSimpleSolids />;
      case '8.4-cube-stacks': return <CubeStackViewsDemo />;

      default:
        return <div className="p-12 text-center text-2xl font-bold">Step Content</div>;
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-[#faf8f5] text-[#0f172a] select-none overflow-hidden relative touch-none">
      {/* Top Bar Navigation */}
      <TopBar
        subtopics={subtopicsData}
        currentSubtopic={currentSubtopic}
        onSelectSubtopic={handleSelectSubtopic}
        currentStepTitle={currentStep.title}
        isReducedMotion={isReducedMotion}
        onToggleReducedMotion={() => setIsReducedMotion(!isReducedMotion)}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      {/* Main Classroom Stage Area */}
      <main className="flex-1 relative w-full h-full overflow-hidden">
        {/* Dynamic Underlying Slide Content */}
        <div className={`w-full h-full ${isReducedMotion ? '' : 'transition-all duration-200'}`}>
          {renderStepContent()}
        </div>

        {/* Transparent Digital Whiteboard Layer across entire stage */}
        <WhiteboardCanvas
          currentStepId={currentStep.id}
          isDrawMode={isDrawMode}
          activeTool={activeTool}
          activeColor={activeColor}
          activeSize={activeSize}
          isDashed={isDashed}
          undoTrigger={undoTrigger}
          redoTrigger={redoTrigger}
          clearTrigger={clearTrigger}
          onHistoryChange={(undoable, redoable) => {
            setCanUndo(undoable);
            setCanRedo(redoable);
          }}
        />

        {/* Floating Whiteboard Toolbar */}
        <WhiteboardToolbar
          isDrawMode={isDrawMode}
          onToggleDrawMode={() => setIsDrawMode(!isDrawMode)}
          activeTool={activeTool}
          onChangeTool={setActiveTool}
          activeColor={activeColor}
          onChangeColor={setActiveColor}
          activeSize={activeSize}
          onChangeSize={setActiveSize}
          isDashed={isDashed}
          onToggleDashed={() => setIsDashed(!isDashed)}
          onUndo={() => setUndoTrigger((prev) => prev + 1)}
          onRedo={() => setRedoTrigger((prev) => prev + 1)}
          onClear={() => setClearTrigger((prev) => prev + 1)}
          canUndo={canUndo}
          canRedo={canRedo}
        />
      </main>

      {/* Bottom Bar: Back/Next + Progress dots + Step Counter */}
      <BottomBar
        steps={currentSubtopic.steps}
        currentStepIndex={currentStepIndex}
        onSelectStepIndex={handleSelectStepIndex}
        onPrev={handlePrev}
        onNext={handleNext}
        accentColor={currentSubtopic.accentColor}
      />

      {/* Help Modal */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
}

export default App;
