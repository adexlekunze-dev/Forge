"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LoyaltyPoints } from '@/lib/types';
import { formatCurrency, calculatePercentage } from '@/lib/utils';

interface LoyaltyCardProps {
  loyalty: LoyaltyPoints;
}

export default function LoyaltyCard({ loyalty }: LoyaltyCardProps) {
  const pointsToNextTier = loyalty.nextTier 
    ? loyalty.nextTier.pointsRequired - loyalty.current
    : 0;
  const progressPercentage = loyalty.nextTier
    ? calculatePercentage(
        loyalty.current - loyalty.tier.pointsRequired,
        loyalty.nextTier.pointsRequired - loyalty.tier.pointsRequired
      )
    : 100;

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-teal-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Loyalty Points</span>
          <span className="text-2xl font-bold text-blue-600">
            {loyalty.current.toLocaleString()}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Tier */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              {loyalty.tier.name} Member
            </span>
            <span className="text-xs text-gray-600">
              Level {loyalty.tier.level}
            </span>
          </div>
          
          {/* Tier Badge */}
          <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 ${
            loyalty.tier.color === 'amber' ? 'bg-amber-100 text-amber-800' :
            loyalty.tier.color === 'gray' ? 'bg-gray-100 text-gray-800' :
            loyalty.tier.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {loyalty.tier.name}
          </div>
        </div>

        {/* Progress to Next Tier */}
        {loyalty.nextTier && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">
                Progress to {loyalty.nextTier.name}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {pointsToNextTier.toLocaleString()} points needed
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <p className="text-xs text-gray-500 mt-1">
              {progressPercentage}% complete
            </p>
          </div>
        )}

        {/* Benefits */}
        <div className="pt-4 border-t">
          <p className="text-sm font-medium text-gray-700 mb-2">Current Benefits:</p>
          <ul className="space-y-1">
            {loyalty.tier.benefits.map((benefit, index) => (
              <li key={index} className="text-xs text-gray-600 flex items-center gap-2">
                <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {/* Points Value */}
        <div className="bg-white/50 rounded-lg p-3 mt-4">
          <p className="text-xs text-gray-600 mb-1">Your points are worth:</p>
          <p className="text-lg font-bold text-blue-600">
            {formatCurrency((loyalty.current / 100) * 5)}
          </p>
          <p className="text-xs text-gray-500">100 points = £5 credit</p>
        </div>
      </CardContent>
    </Card>
  );
}



