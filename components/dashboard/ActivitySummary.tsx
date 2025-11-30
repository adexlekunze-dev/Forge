"use client"

import { Card, CardContent } from '@/components/ui/card';
import { ActivityStats } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { Calendar, TrendingUp, Gift, DollarSign } from 'lucide-react';

interface ActivitySummaryProps {
  stats: ActivityStats;
}

export default function ActivitySummary({ stats }: ActivitySummaryProps) {
  const statItems = [
    {
      icon: Calendar,
      label: 'Total Bookings',
      value: stats.totalBookings.toString(),
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: TrendingUp,
      label: 'Points Earned',
      value: stats.pointsEarned.toLocaleString(),
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: DollarSign,
      label: 'Total Spent',
      value: formatCurrency(stats.totalSpent),
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Gift,
      label: 'Total Savings',
      value: formatCurrency(stats.savings),
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className={`w-12 h-12 rounded-lg ${item.bgColor} flex items-center justify-center mb-3`}>
                <Icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <p className="text-2xl font-bold mb-1">{item.value}</p>
              <p className="text-xs text-gray-600">{item.label}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}



