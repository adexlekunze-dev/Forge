import { User, Property, Booking, LoyaltyPoints, LoyaltyTier, ActivityStats, Referral, DashboardData } from './types';

// Mock User Data
export const mockUser: User = {
  id: 'user-1',
  firstName: 'Sarah',
  lastName: 'Johnson',
  email: 'sarah.johnson@example.com',
  phone: '+44 7700 900123',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
  memberSince: new Date('2022-03-15'),
};

// Mock Loyalty Tiers
export const loyaltyTiers: LoyaltyTier[] = [
  {
    name: 'Bronze',
    level: 1,
    pointsRequired: 0,
    benefits: ['5% off bookings', 'Early access to sales'],
    color: 'amber',
  },
  {
    name: 'Silver',
    level: 2,
    pointsRequired: 500,
    benefits: ['10% off bookings', 'Free cancellation', 'Priority support'],
    color: 'gray',
  },
  {
    name: 'Gold',
    level: 3,
    pointsRequired: 2000,
    benefits: ['15% off bookings', 'Free cleaning fee', 'Room upgrades'],
    color: 'yellow',
  },
  {
    name: 'Platinum',
    level: 4,
    pointsRequired: 5000,
    benefits: ['20% off bookings', 'VIP concierge', 'Exclusive properties'],
    color: 'blue',
  },
];

// Mock Loyalty Points
export const mockLoyaltyPoints: LoyaltyPoints = {
  current: 1250,
  lifetime: 1250,
  tier: loyaltyTiers[1], // Silver
  nextTier: loyaltyTiers[2], // Gold
  progressToNextTier: 25, // 1250 / 2000 = 62.5%, but showing 25% progress within current tier range
};

// Mock Properties
export const mockProperties: Property[] = [
  {
    id: 'prop-1',
    name: 'Forest View Cottage',
    location: 'Lake District, Cumbria',
    region: 'Lake District',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    pricePerNight: 150,
    rating: 4.8,
    reviewCount: 127,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    amenities: ['WiFi', 'Parking', 'Pet Friendly', 'Fireplace'],
    description: 'A charming cottage with stunning forest views in the heart of the Lake District.',
  },
  {
    id: 'prop-2',
    name: 'Coastal Retreat',
    location: 'Cornwall, St Ives',
    region: 'Cornwall',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    pricePerNight: 180,
    rating: 4.9,
    reviewCount: 89,
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    amenities: ['WiFi', 'Parking', 'Sea View', 'Hot Tub'],
    description: 'Beautiful coastal property with sea views and modern amenities.',
  },
  {
    id: 'prop-3',
    name: 'Countryside Manor',
    location: 'Cotswolds, Gloucestershire',
    region: 'Cotswolds',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    pricePerNight: 220,
    rating: 4.7,
    reviewCount: 156,
    bedrooms: 5,
    bathrooms: 4,
    maxGuests: 10,
    amenities: ['WiFi', 'Parking', 'Garden', 'BBQ', 'Games Room'],
    description: 'Spacious manor house perfect for large families and groups.',
  },
  {
    id: 'prop-4',
    name: 'Mountain Lodge',
    location: 'Snowdonia, Wales',
    region: 'Snowdonia',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
    pricePerNight: 140,
    rating: 4.6,
    reviewCount: 203,
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    amenities: ['WiFi', 'Parking', 'Mountain View', 'Hiking Trails'],
    description: 'Cosy lodge with breathtaking mountain views.',
  },
];

// Mock Bookings
export const mockBookings: Booking[] = [
  {
    id: 'booking-1',
    propertyId: 'prop-1',
    property: mockProperties[0],
    checkIn: new Date('2025-12-20'),
    checkOut: new Date('2025-12-23'),
    nights: 3,
    guests: {
      adults: 2,
      children: 2,
      total: 4,
    },
    guestName: 'Sarah Johnson',
    guestEmail: 'sarah.johnson@example.com',
    guestPhone: '+44 7700 900123',
    pricing: {
      nightlyRate: 150,
      nights: 3,
      subtotal: 450,
      cleaningFee: 35,
      serviceFee: 15,
      total: 500,
    },
    status: 'upcoming',
    bookingDate: new Date('2025-11-15'),
    confirmationCode: 'SYKE-2025-ABC123',
  },
  {
    id: 'booking-2',
    propertyId: 'prop-2',
    property: mockProperties[1],
    checkIn: new Date('2025-08-10'),
    checkOut: new Date('2025-08-17'),
    nights: 7,
    guests: {
      adults: 4,
      children: 2,
      total: 6,
    },
    guestName: 'Sarah Johnson',
    guestEmail: 'sarah.johnson@example.com',
    guestPhone: '+44 7700 900123',
    pricing: {
      nightlyRate: 180,
      nights: 7,
      subtotal: 1260,
      cleaningFee: 50,
      serviceFee: 30,
      total: 1340,
    },
    status: 'completed',
    bookingDate: new Date('2025-07-01'),
    confirmationCode: 'SYKE-2025-XYZ789',
  },
  {
    id: 'booking-3',
    propertyId: 'prop-3',
    property: mockProperties[2],
    checkIn: new Date('2025-06-15'),
    checkOut: new Date('2025-06-20'),
    nights: 5,
    guests: {
      adults: 6,
      children: 2,
      total: 8,
    },
    guestName: 'Sarah Johnson',
    guestEmail: 'sarah.johnson@example.com',
    guestPhone: '+44 7700 900123',
    pricing: {
      nightlyRate: 220,
      nights: 5,
      subtotal: 1100,
      cleaningFee: 60,
      serviceFee: 40,
      total: 1200,
    },
    status: 'completed',
    bookingDate: new Date('2025-05-10'),
    confirmationCode: 'SYKE-2025-DEF456',
  },
];

// Mock Activity Stats
export const mockActivityStats: ActivityStats = {
  totalBookings: 3,
  totalSpent: 3040,
  pointsEarned: 1250,
  savings: 380,
  favoriteRegions: ['Lake District', 'Cornwall', 'Cotswolds'],
};

// Mock Referral
export const mockReferral: Referral = {
  code: 'SARAH2025',
  totalReferrals: 3,
  activeReferrals: 2,
  pointsEarned: 150,
  shareableLink: 'https://sykes.co.uk/ref/SARAH2025',
};

// Mock Dashboard Data
export const mockDashboardData: DashboardData = {
  user: mockUser,
  loyalty: mockLoyaltyPoints,
  upcomingTrip: mockBookings[0],
  activityStats: mockActivityStats,
  favoriteProperties: [mockProperties[0], mockProperties[1], mockProperties[3]],
  bookingHistory: mockBookings,
  referral: mockReferral,
};

// Mock current booking for checkout page
export const mockCurrentBooking = {
  property: mockProperties[0],
  checkIn: '2025-12-20',
  checkOut: '2025-12-23',
  nights: 3,
  pricing: {
    nightlyRate: 150,
    nights: 3,
    subtotal: 450,
    cleaningFee: 35,
    serviceFee: 15,
    total: 500,
  },
};

