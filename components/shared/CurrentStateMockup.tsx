"use client"

import { ReactNode } from 'react';

interface CurrentStateMockupProps {
  title?: string;
  children: ReactNode;
  issues?: string[];
}

export default function CurrentStateMockup({
  title = 'Current Sykes',
  children,
  issues = [],
}: CurrentStateMockupProps) {
  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <div className="bg-gray-200 p-6 rounded border-2 border-dashed border-gray-400">
        <h3 className="text-lg font-bold mb-4 text-gray-700">
          {title}
        </h3>
        
        {/* Mockup content */}
        <div className="opacity-60 mb-4">
          {children}
        </div>
        
        {/* Issues highlighted */}
        {issues.length > 0 && (
          <div className="mt-6 space-y-2">
            {issues.map((issue, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <span className="text-red-500 font-bold">✗</span>
                <span className="text-gray-600">{issue}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}



