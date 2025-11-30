"use client"

import { ReactNode } from 'react';

interface ComparisonViewProps {
  currentState: ReactNode;
  optimizedState: ReactNode;
  currentTitle?: string;
  optimizedTitle?: string;
}

export default function ComparisonView({
  currentState,
  optimizedState,
  currentTitle = 'Current Sykes',
  optimizedTitle = 'Optimized Version',
}: ComparisonViewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {/* Current State - 40% */}
      <div className="md:col-span-2">
        <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-700">
          {currentTitle}
        </h3>
        {currentState}
      </div>

      {/* Optimized State - 60% */}
      <div className="md:col-span-3">
        <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-700">
          {optimizedTitle}
        </h3>
        {optimizedState}
      </div>
    </div>
  );
}

