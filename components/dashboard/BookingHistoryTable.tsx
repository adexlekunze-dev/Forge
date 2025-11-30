"use client"

import { Booking } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDate, formatCurrency } from '@/lib/utils';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface BookingHistoryTableProps {
  bookings: Booking[];
  onRebook?: (bookingId: string) => void;
}

export default function BookingHistoryTable({ bookings, onRebook }: BookingHistoryTableProps) {
  const completedBookings = bookings.filter(b => b.status === 'completed');
  const upcomingBookings = bookings.filter(b => b.status === 'upcoming');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking History</CardTitle>
      </CardHeader>
      <CardContent>
        {upcomingBookings.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold mb-3 text-gray-700">Upcoming</h4>
            <div className="space-y-3">
              {upcomingBookings.map((booking) => (
                <BookingRow key={booking.id} booking={booking} onRebook={onRebook} />
              ))}
            </div>
          </div>
        )}

        {completedBookings.length > 0 && (
          <div>
            <h4 className="font-semibold mb-3 text-gray-700">Past Bookings</h4>
            <div className="space-y-3">
              {completedBookings.map((booking) => (
                <BookingRow key={booking.id} booking={booking} onRebook={onRebook} />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function BookingRow({ booking, onRebook }: { booking: Booking; onRebook?: (id: string) => void }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="relative w-full sm:w-24 h-48 sm:h-24 flex-shrink-0">
        <Image
          src={booking.property.image}
          alt={booking.property.name}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h5 className="font-bold text-base sm:text-lg mb-1">{booking.property.name}</h5>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <MapPin className="h-3 w-3" />
          <span>{booking.property.location}</span>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-sm text-gray-600 mb-2">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{booking.guests.total} guests</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <p className="text-xs text-gray-500 mb-1">Confirmation</p>
            <p className="font-mono text-sm font-medium break-all">{booking.confirmationCode}</p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-xs text-gray-500 mb-1">Total</p>
            <p className="font-bold">{formatCurrency(booking.pricing.total)}</p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-row sm:flex-col justify-start sm:justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onRebook?.(booking.id)}
          className="flex-1 sm:flex-none min-h-[44px]"
        >
          <ArrowRight className="h-4 w-4 mr-2" />
          Rebook
        </Button>
        <Button variant="ghost" size="sm" className="flex-1 sm:flex-none min-h-[44px]">
          View Details
        </Button>
      </div>
    </div>
  );
}

