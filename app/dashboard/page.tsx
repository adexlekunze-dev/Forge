"use client"

import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense, useState } from 'react';
import { useToast } from '@/hooks/useToast';
import { mockDashboardData } from '@/lib/mockData';
import LoyaltyCard from '@/components/dashboard/LoyaltyCard';
import UpcomingTripCard from '@/components/dashboard/UpcomingTripCard';
import ActivitySummary from '@/components/dashboard/ActivitySummary';
import RebookCarousel from '@/components/dashboard/RebookCarousel';
import ReferralCard from '@/components/dashboard/ReferralCard';
import BookingHistoryTable from '@/components/dashboard/BookingHistoryTable';
import CurrentStateMockup from '@/components/shared/CurrentStateMockup';
import BenchmarkCallout from '@/components/shared/BenchmarkCallout';

function DashboardContent() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [showCurrentState, setShowCurrentState] = useState(false);

  useEffect(() => {
    // Show welcome message if coming from signup
    if (searchParams.get('welcome') === 'true') {
      toast({
        title: 'Welcome to Sykes! 🎉',
        description: 'Start earning points on your next booking',
        variant: 'success',
      });
    }
  }, [searchParams, toast]);

  const handleRebook = (propertyId: string) => {
    toast({
      title: 'Redirecting to booking...',
      variant: 'info',
    });
    // In a real app, this would navigate to the booking page with the property pre-selected
  };

  // Current state mockup
  const currentState = (
    <CurrentStateMockup
      issues={[
        'No personalization (generic "Welcome")',
        'Yellow warning banner (negative first impression)',
        '6 static cards with verbose descriptions',
        'No loyalty program visible',
        'No upcoming trip preview',
        'No activity summary',
        '"Saved properties" has no count',
        '"Help centre" wastes space',
        '"Letting your property" misplaced (wrong audience)',
        'No quick actions',
        'Zero interactivity or gamification',
      ]}
    >
      <div className="space-y-3">
        <div className="bg-yellow-100 border border-yellow-300 rounded px-3 py-2 text-xs text-yellow-800 mb-3">
          ⚠️ Warning: Please update your profile information
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white border border-gray-300 rounded px-2 py-3 text-xs text-gray-500">
            <div className="font-bold mb-1">My Bookings</div>
            <div className="text-xs">View and manage your bookings</div>
          </div>
          <div className="bg-white border border-gray-300 rounded px-2 py-3 text-xs text-gray-500">
            <div className="font-bold mb-1">Saved Properties</div>
            <div className="text-xs">Properties you&apos;ve saved</div>
          </div>
          <div className="bg-white border border-gray-300 rounded px-2 py-3 text-xs text-gray-500">
            <div className="font-bold mb-1">Account Settings</div>
            <div className="text-xs">Manage your account</div>
          </div>
          <div className="bg-white border border-gray-300 rounded px-2 py-3 text-xs text-gray-500">
            <div className="font-bold mb-1">Help Centre</div>
            <div className="text-xs">Get help and support</div>
          </div>
          <div className="bg-white border border-gray-300 rounded px-2 py-3 text-xs text-gray-500">
            <div className="font-bold mb-1">Payment Methods</div>
            <div className="text-xs">Manage payment options</div>
          </div>
          <div className="bg-white border border-gray-300 rounded px-2 py-3 text-xs text-gray-500">
            <div className="font-bold mb-1">Letting your property</div>
            <div className="text-xs">List your property</div>
          </div>
        </div>
      </div>
    </CurrentStateMockup>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">
          Loyalty Dashboard Optimization
        </h1>

        {/* Current State Mockup (Collapsible) */}
        <div className="bg-gray-100 p-4 rounded-lg mb-8">
          <button 
            onClick={() => setShowCurrentState(!showCurrentState)}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-lg font-bold text-gray-700">
              Current Sykes Dashboard
            </h3>
            <span className="text-gray-500">
              {showCurrentState ? '▼ Hide' : '▶ Show'}
            </span>
          </button>
          
          {showCurrentState && (
            <div className="mt-4">
              {currentState}
            </div>
          )}
        </div>

        {/* Personalized Welcome */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
            Welcome back, {mockDashboardData.user.firstName}! 👋
          </h2>
          <p className="text-sm sm:text-base text-blue-100">
            You&apos;ve earned {mockDashboardData.loyalty.current.toLocaleString()} points so far. 
            Keep booking to unlock exclusive rewards!
          </p>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Trip */}
            {mockDashboardData.upcomingTrip && (
              <UpcomingTripCard booking={mockDashboardData.upcomingTrip} />
            )}

            {/* Activity Summary */}
            <ActivitySummary stats={mockDashboardData.activityStats} />

            {/* Rebook Carousel */}
            <RebookCarousel
              properties={mockDashboardData.favoriteProperties}
              onRebook={handleRebook}
            />

            {/* Booking History */}
            <BookingHistoryTable
              bookings={mockDashboardData.bookingHistory}
              onRebook={handleRebook}
            />
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Loyalty Card */}
            <LoyaltyCard loyalty={mockDashboardData.loyalty} />

            {/* Referral Card */}
            <ReferralCard referral={mockDashboardData.referral} />
          </div>
        </div>

        {/* Benchmark Callout */}
        <BenchmarkCallout
          title="Industry Benchmark"
          text="McKinsey Research: Personalized dashboards increase engagement 35%. Gamification elements (points, tiers, progress bars) boost repeat bookings 28%. Interactive loyalty programs drive 40% higher lifetime value compared to static programs."
          source="McKinsey & Company, 2023; Baymard Institute, 2024"
          expectedImpact={{
            userEngagement: "+35%",
            repeatBookings: "+28%",
            lifetimeValue: "+40%",
            dashboardVisits: "+45%"
          }}
        />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}

