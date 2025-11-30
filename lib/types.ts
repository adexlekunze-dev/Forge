// User and Authentication Types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  memberSince: Date;
}

// Property Types
export interface Property {
  id: string;
  name: string;
  location: string;
  region: string;
  image: string;
  images?: string[];
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  amenities: string[];
  description: string;
}

// Booking Types
export interface Booking {
  id: string;
  propertyId: string;
  property: Property;
  checkIn: Date;
  checkOut: Date;
  nights: number;
  guests: {
    adults: number;
    children: number;
    total: number;
  };
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  pricing: {
    nightlyRate: number;
    nights: number;
    subtotal: number;
    cleaningFee: number;
    serviceFee: number;
    total: number;
  };
  status: 'upcoming' | 'completed' | 'cancelled';
  bookingDate: Date;
  confirmationCode: string;
}

// Loyalty Program Types
export interface LoyaltyTier {
  name: string;
  level: number;
  pointsRequired: number;
  benefits: string[];
  color: string;
}

export interface LoyaltyPoints {
  current: number;
  lifetime: number;
  tier: LoyaltyTier;
  nextTier: LoyaltyTier | null;
  progressToNextTier: number; // percentage
}

export interface LoyaltyReward {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  discount?: number;
  type: 'discount' | 'upgrade' | 'benefit';
}

// Activity and Stats Types
export interface ActivityStats {
  totalBookings: number;
  totalSpent: number;
  pointsEarned: number;
  savings: number;
  favoriteRegions: string[];
}

// Referral Types
export interface Referral {
  code: string;
  totalReferrals: number;
  activeReferrals: number;
  pointsEarned: number;
  shareableLink: string;
}

// Toast Notification Types
export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

// Form Validation Types
export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

// Checkout Types
export interface CheckoutStep {
  number: number;
  title: string;
  completed: boolean;
  active: boolean;
}

export interface PaymentMethod {
  type: 'card' | 'paypal' | 'apple-pay' | 'google-pay';
  label: string;
  icon?: string;
}

// Dashboard Types
export interface DashboardData {
  user: User;
  loyalty: LoyaltyPoints;
  upcomingTrip: Booking | null;
  activityStats: ActivityStats;
  favoriteProperties: Property[];
  bookingHistory: Booking[];
  referral: Referral;
}

// Address Types
export interface Address {
  line1: string;
  line2?: string;
  city: string;
  county: string;
  postcode: string;
  country: string;
}



