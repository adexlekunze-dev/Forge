"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Edit, Info, Lock } from 'lucide-react';
import Image from 'next/image';
import UrgencyBadge from './UrgencyBadge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { formatCurrency } from '@/lib/utils';

interface BookingSummaryProps {
  property: {
    name: string;
    location: string;
    image: string;
  };
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: {
    adults: number;
    children: number;
    total: number;
  };
  pricing: {
    nightlyRate: number;
    nights: number;
    subtotal: number;
    cleaningFee: number;
    serviceFee: number;
    total: number;
  };
  insuranceIncluded?: boolean;
  onEditDates?: () => void;
  onCompleteBooking?: () => void;
  canComplete?: boolean;
}

export default function BookingSummary({
  property,
  checkIn,
  checkOut,
  nights,
  guests,
  pricing,
  insuranceIncluded = false,
  onEditDates,
  onCompleteBooking,
  canComplete = false,
}: BookingSummaryProps) {
  const INSURANCE_PRICE = 6;
  const totalWithInsurance = pricing.total + (insuranceIncluded ? INSURANCE_PRICE : 0);
  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Booking Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Property image with urgency badge */}
        <div className="relative">
          <Image
            src={property.image}
            alt={property.name}
            width={400}
            height={250}
            className="rounded-lg object-cover w-full"
          />
          <UrgencyBadge count={2} />
        </div>

        <div>
          <h3 className="font-bold text-lg">{property.name}</h3>
          <p className="text-sm text-gray-600">{property.location}</p>
        </div>

        {/* Dates with edit capability */}
        <div className="bg-gray-50 rounded-lg p-2.5">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 text-sm font-medium">
              <Calendar className="h-3.5 w-3.5" />
              <span>Check-in</span>
            </div>
            <div className="text-sm">{checkIn}</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-sm font-medium">
              <Calendar className="h-3.5 w-3.5" />
              <span>Check-out</span>
            </div>
            <div className="text-sm">{checkOut}</div>
          </div>
        </div>

        {onEditDates && (
          <Button variant="outline" size="sm" className="w-full" onClick={onEditDates}>
            <Edit className="h-4 w-4 mr-2" />
            Edit dates or property
          </Button>
        )}

        {/* Guests */}
        <div className="flex items-center gap-1.5 text-sm">
          <Users className="h-3.5 w-3.5 text-gray-600" />
          <span>{guests.total} guests ({guests.adults} adults, {guests.children} children)</span>
        </div>

        {/* Price breakdown - ALWAYS VISIBLE */}
        <div className="space-y-1.5 pt-3 border-t">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{pricing.nights} nights × {formatCurrency(pricing.nightlyRate)}</span>
            <span>{formatCurrency(pricing.subtotal)}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Cleaning fee</span>
            <span>{formatCurrency(pricing.cleaningFee)}</span>
          </div>
          
          {/* Booking fee with explanation */}
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-1">
              <span className="text-gray-600">Service fee</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-xs">
                      This fee covers payment processing, 24/7 customer support, 
                      and booking protection insurance.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span>{formatCurrency(pricing.serviceFee)}</span>
          </div>

          {/* Insurance (if included) */}
          {insuranceIncluded && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Travel Insurance</span>
              <span>{formatCurrency(INSURANCE_PRICE)}</span>
            </div>
          )}

          <div className="flex justify-between font-bold text-base pt-2 border-t">
            <span>Total</span>
            <span>{formatCurrency(totalWithInsurance)}</span>
          </div>
        </div>

        {/* Trust signals */}
        <div className="space-y-0.5 text-xs text-gray-600 pt-2 border-t">
          <div className="flex items-center gap-1">
            <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Free cancellation up to 7 days before check-in</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Best price guarantee</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Instant confirmation</span>
          </div>
        </div>

        {/* Complete booking CTA */}
        {onCompleteBooking && (
          <>
            <div className="flex items-center gap-2 text-sm text-gray-600 pt-2 border-t">
              <Lock className="h-4 w-4" />
              <span>Secure payment · SSL encrypted</span>
            </div>
            <Button
              onClick={onCompleteBooking}
              disabled={!canComplete}
              className="w-full h-12 text-lg font-bold"
            >
              Complete Booking - {formatCurrency(totalWithInsurance)}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

