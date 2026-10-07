import React from 'react';
import { GridType } from '../../types';

interface WorkingSpaceGridProps {
  gridType: GridType;
}

export const WorkingSpaceGrid: React.FC<WorkingSpaceGridProps> = ({ gridType }) => {
  if (gridType === 'none') return null;

  if (gridType === 'dots') {
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dot-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="16" cy="16" r="2" fill="#334155" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" />
      </svg>
    );
  }

  if (gridType === 'grid') {
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="square-grid" width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#334155" strokeWidth="1.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#square-grid)" />
      </svg>
    );
  }

  if (gridType === 'lines') {
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="lined-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <line x1="0" y1="40" x2="100%" y2="40" stroke="#334155" strokeWidth="1.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lined-grid)" />
      </svg>
    );
  }

  return null;
};
