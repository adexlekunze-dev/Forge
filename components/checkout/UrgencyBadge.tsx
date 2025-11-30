"use client"

import { AlertCircle } from 'lucide-react';

interface UrgencyBadgeProps {
  count: number;
  text?: string;
}

export default function UrgencyBadge({ count, text = 'guests viewing' }: UrgencyBadgeProps) {
  return (
    <div className="absolute top-2 left-2 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
      <AlertCircle className="h-3 w-3" />
      {count} {text}
    </div>
  );
}



