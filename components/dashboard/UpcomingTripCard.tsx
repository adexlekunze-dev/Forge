"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Booking } from '@/lib/types';
import { useCountdown } from '@/hooks/useCountdown';
import { formatDateLong, formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';

interface UpcomingTripCardProps {
  booking: Booking;
}

export default function UpcomingTripCard({ booking }: UpcomingTripCardProps) {
  const countdown = useCountdown(booking.checkIn);

  // Format dates consistently using date-fns
  const checkInFormatted = formatDateLong(booking.checkIn);
  const checkOutFormatted = formatDateLong(booking.checkOut);

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image
          src={booking.property.image}
          alt={booking.property.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-xl font-bold mb-1">{booking.property.name}</h3>
          <p className="text-sm text-white/90">{booking.property.location}</p>
        </div>
      </div>
      
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Upcoming Trip</span>
          {!countdown.isExpired && (
            <div className="flex items-center gap-1 text-sm font-normal text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{countdown.formatted}</span>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Trip Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-gray-700">
              {checkInFormatted} - {checkOutFormatted}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-gray-700">
              {booking.guests.total} guests · {booking.nights} nights
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="text-gray-700">{booking.property.location}</span>
          </div>
        </div>

        {/* Confirmation Code */}
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-600 mb-1">Confirmation Code</p>
          <p className="font-mono font-bold text-lg">{booking.confirmationCode}</p>
        </div>

        {/* Total Price */}
        <div className="flex items-center justify-between pt-2 border-t">
          <span className="text-sm text-gray-600">Total Paid</span>
          <span className="text-lg font-bold">{formatCurrency(booking.pricing.total)}</span>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" className="flex-1" size="sm">
            View Details
          </Button>
          <Button variant="outline" className="flex-1" size="sm">
            Modify Booking
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

