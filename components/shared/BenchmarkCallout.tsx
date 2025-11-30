"use client"

import { Card, CardContent } from '@/components/ui/card';
import { Info } from 'lucide-react';

interface ExpectedImpact {
  [key: string]: string;
}

interface BenchmarkCalloutProps {
  title?: string;
  text: string;
  source: string;
  expectedImpact?: ExpectedImpact;
}

export default function BenchmarkCallout({
  title = 'Industry Benchmark',
  text,
  source,
  expectedImpact,
}: BenchmarkCalloutProps) {
  return (
    <Card className="bg-blue-50 border-blue-200 mt-8">
      <CardContent className="p-6">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <Info className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-blue-900 mb-2">{title}</h4>
            <p className="text-sm text-blue-800 mb-3">{text}</p>
            <p className="text-xs text-blue-600 italic mb-3">Source: {source}</p>
            
            {expectedImpact && Object.keys(expectedImpact).length > 0 && (
              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-xs font-semibold text-blue-900 mb-2">Expected Impact:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {Object.entries(expectedImpact).map(([key, value]) => (
                    <div key={key} className="text-xs">
                      <span className="text-blue-700 font-medium">{key}:</span>{' '}
                      <span className="text-blue-900 font-bold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}



