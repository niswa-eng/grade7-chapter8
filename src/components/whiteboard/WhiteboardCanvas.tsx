import React, { useRef, useEffect, useState, useCallback } from 'react';
import { WhiteboardStroke, WhiteboardTool, Point } from '../../types';

interface WhiteboardCanvasProps {
  currentStepId: string;
  isDrawMode: boolean;
  activeTool: WhiteboardTool;
  activeColor: string;
  activeSize: number;
  isDashed: boolean;
  onStrokeAdded?: () => void;
  // History controls exposed
  undoTrigger?: number;
  redoTrigger?: number;
  clearTrigger?: number;
  onHistoryChange?: (canUndo: boolean, canRedo: boolean) => void;
}

const STORAGE_PREFIX = 'teacher_board_ink_';

export const WhiteboardCanvas: React.FC<WhiteboardCanvasProps> = ({
  currentStepId,
  isDrawMode,
  activeTool,
  activeColor,
  activeSize,
  isDashed,
  onStrokeAdded,
  undoTrigger,
  redoTrigger,
  clearTrigger,
  onHistoryChange
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const strokesRef = useRef<WhiteboardStroke[]>([]);
  const redoStackRef = useRef<WhiteboardStroke[]>([]);
  const isDrawingRef = useRef<boolean>(false);
  const currentPointsRef = useRef<Point[]>([]);
  const activePointerIdRef = useRef<number | null>(null);
  const hasPenDetectedRef = useRef<boolean>(false);

  // Load strokes for currentStepId
  const loadStrokesForStep = useCallback((stepId: string) => {
    try {
      const saved = localStorage.getItem(`${STORAGE_PREFIX}${stepId}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        strokesRef.current = Array.isArray(parsed) ? parsed : [];
      } else {
        strokesRef.current = [];
      }
    } catch {
      strokesRef.current = [];
    }
    redoStackRef.current = [];
    notifyHistory();
    redrawCanvas();
  }, []);

  // Save strokes for currentStepId
  const saveStrokesForStep = useCallback((stepId: string) => {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${stepId}`, JSON.stringify(strokesRef.current));
    } catch {
      // Storage quota or blocked, ignore gracefully
    }
  }, []);

  const notifyHistory = useCallback(() => {
    if (onHistoryChange) {
      onHistoryChange(strokesRef.current.length > 0, redoStackRef.current.length > 0);
    }
  }, [onHistoryChange]);

  // Redraw all strokes onto canvas
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const stroke of strokesRef.current) {
      drawStroke(ctx, stroke);
    }
  }, []);

  // Render a single stroke
  const drawStroke = (ctx: CanvasRenderingContext2D, stroke: WhiteboardStroke) => {
    const pts = stroke.points;
    if (!pts || pts.length === 0) return;

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.size;

    if (stroke.tool === 'highlighter') {
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = stroke.size * 2.5;
    } else {
      ctx.globalAlpha = 1.0;
    }

    if (stroke.isDashed) {
      ctx.setLineDash([12, 10]);
    } else {
      ctx.setLineDash([]);
    }

    if (stroke.tool === 'line') {
      if (pts.length >= 2) {
        const p1 = pts[0];
        const p2 = pts[pts.length - 1];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    } else if (stroke.tool === 'rectangle') {
      if (pts.length >= 2) {
        const p1 = pts[0];
        const p2 = pts[pts.length - 1];
        const minX = Math.min(p1.x, p2.x);
        const minY = Math.min(p1.y, p2.y);
        const w = Math.abs(p2.x - p1.x);
        const h = Math.abs(p2.y - p1.y);
        ctx.beginPath();
        ctx.strokeRect(minX, minY, w, h);
      }
    } else if (stroke.tool === 'circle') {
      if (pts.length >= 2) {
        const p1 = pts[0];
        const p2 = pts[pts.length - 1];
        const radius = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    } else {
      // Freehand pen or highlighter with smooth Bezier curves
      if (pts.length === 1) {
        ctx.beginPath();
        ctx.arc(pts[0].x, pts[0].y, stroke.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = stroke.color;
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);

        for (let i = 1; i < pts.length - 1; i++) {
          const midX = (pts[i].x + pts[i + 1].x) / 2;
          const midY = (pts[i].y + pts[i + 1].y) / 2;
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, midX, midY);
        }
        ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
        ctx.stroke();
      }
    }

    ctx.restore();
  };

  // Resize canvas according to device pixel ratio
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
      redrawCanvas();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [redrawCanvas]);

  // Load step strokes on currentStepId change
  useEffect(() => {
    loadStrokesForStep(currentStepId);
  }, [currentStepId, loadStrokesForStep]);

  // Handle Undo
  useEffect(() => {
    if (undoTrigger === undefined || undoTrigger === 0) return;
    if (strokesRef.current.length > 0) {
      const popped = strokesRef.current.pop();
      if (popped) {
        redoStackRef.current.push(popped);
        saveStrokesForStep(currentStepId);
        redrawCanvas();
        notifyHistory();
      }
    }
  }, [undoTrigger, currentStepId, redrawCanvas, saveStrokesForStep, notifyHistory]);

  // Handle Redo
  useEffect(() => {
    if (redoTrigger === undefined || redoTrigger === 0) return;
    if (redoStackRef.current.length > 0) {
      const popped = redoStackRef.current.pop();
      if (popped) {
        strokesRef.current.push(popped);
        saveStrokesForStep(currentStepId);
        redrawCanvas();
        notifyHistory();
      }
    }
  }, [redoTrigger, currentStepId, redrawCanvas, saveStrokesForStep, notifyHistory]);

  // Handle Clear
  useEffect(() => {
    if (clearTrigger === undefined || clearTrigger === 0) return;
    if (strokesRef.current.length > 0) {
      redoStackRef.current = [...strokesRef.current];
      strokesRef.current = [];
      saveStrokesForStep(currentStepId);
      redrawCanvas();
      notifyHistory();
    }
  }, [clearTrigger, currentStepId, redrawCanvas, saveStrokesForStep, notifyHistory]);

  // Pointer event handlers with palm rejection
  const getCanvasCoords = (e: React.PointerEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      pressure: e.pressure || 0.5
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawMode) return;

    // Palm rejection checks:
    // 1. Detect if stylus pen is active
    if (e.pointerType === 'pen') {
      hasPenDetectedRef.current = true;
    } else if (hasPenDetectedRef.current && e.pointerType === 'touch') {
      // If stylus previously used on this board, reject finger/palm touches
      return;
    }

    // 2. Reject palm-sized touches (width or height > 36)
    if (e.pointerType === 'touch' && (e.width > 36 || e.height > 36)) {
      return;
    }

    // 3. Single active pointer only
    if (activePointerIdRef.current !== null && activePointerIdRef.current !== e.pointerId) {
      return;
    }

    activePointerIdRef.current = e.pointerId;
    isDrawingRef.current = true;

    const pt = getCanvasCoords(e);

    if (activeTool === 'eraser') {
      eraseStrokesNear(pt.x, pt.y, 24);
      return;
    }

    currentPointsRef.current = [pt];
    redrawCanvas();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawMode || !isDrawingRef.current) return;
    if (activePointerIdRef.current !== e.pointerId) return;

    const pt = getCanvasCoords(e);

    if (activeTool === 'eraser') {
      eraseStrokesNear(pt.x, pt.y, 24);
      return;
    }

    // Shape snap helper for straight line: snap to horizontal or vertical if angle <= 5°
    if (activeTool === 'line' && currentPointsRef.current.length > 0) {
      const startPt = currentPointsRef.current[0];
      const dx = pt.x - startPt.x;
      const dy = pt.y - startPt.y;
      const angle = Math.abs((Math.atan2(dy, dx) * 180) / Math.PI);

      let adjustedPt = { ...pt };
      // Horizontal snap: near 0° or 180°
      if (angle < 6 || angle > 174) {
        adjustedPt.y = startPt.y;
      }
      // Vertical snap: near 90°
      else if (Math.abs(angle - 90) < 6) {
        adjustedPt.x = startPt.x;
      }

      currentPointsRef.current = [startPt, adjustedPt];
    } else if (activeTool === 'circle' || activeTool === 'rectangle') {
      const startPt = currentPointsRef.current[0];
      currentPointsRef.current = [startPt, pt];
    } else {
      currentPointsRef.current.push(pt);
    }

    // Live preview
    redrawCanvas();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx && currentPointsRef.current.length > 0) {
      const tempStroke: WhiteboardStroke = {
        id: 'preview',
        tool: activeTool,
        color: activeColor,
        size: activeSize,
        points: currentPointsRef.current,
        isDashed
      };
      drawStroke(ctx, tempStroke);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (activePointerIdRef.current !== e.pointerId) return;
    activePointerIdRef.current = null;

    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;

    if (activeTool === 'eraser') {
      saveStrokesForStep(currentStepId);
      notifyHistory();
      return;
    }

    if (currentPointsRef.current.length > 0) {
      const newStroke: WhiteboardStroke = {
        id: `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        tool: activeTool,
        color: activeColor,
        size: activeSize,
        points: [...currentPointsRef.current],
        isDashed
      };

      strokesRef.current.push(newStroke);
      redoStackRef.current = []; // Clear redo on new stroke
      saveStrokesForStep(currentStepId);
      currentPointsRef.current = [];
      redrawCanvas();
      notifyHistory();
      if (onStrokeAdded) onStrokeAdded();
    }
  };

  // Stroke eraser: test distance to stroke line segments
  const eraseStrokesNear = (x: number, y: number, radius: number) => {
    const initialLen = strokesRef.current.length;
    strokesRef.current = strokesRef.current.filter((stroke) => {
      // Test if any point or segment is within radius
      const pts = stroke.points;
      for (let i = 0; i < pts.length; i++) {
        const dist = Math.hypot(pts[i].x - x, pts[i].y - y);
        if (dist <= radius + stroke.size / 2) return false;
      }
      // Check segment interpolation
      for (let i = 0; i < pts.length - 1; i++) {
        const d = distToSegment({ x, y }, pts[i], pts[i + 1]);
        if (d <= radius + stroke.size / 2) return false;
      }
      return true;
    });

    if (strokesRef.current.length !== initialLen) {
      redrawCanvas();
      notifyHistory();
    }
  };

  const distToSegment = (p: Point, v: Point, w: Point) => {
    const l2 = (v.x - w.x) ** 2 + (v.y - w.y) ** 2;
    if (l2 === 0) return Math.hypot(p.x - v.x, p.y - v.y);
    let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(p.x - (v.x + t * (w.x - v.x)), p.y - (v.y + t * (w.y - v.y)));
  };

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`absolute inset-0 w-full h-full z-30 ${
        isDrawMode ? 'pointer-events-auto cursor-crosshair' : 'pointer-events-none'
      }`}
      style={{ touchAction: 'none' }}
    />
  );
};
