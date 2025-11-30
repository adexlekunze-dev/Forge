"use client"

import { Property } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import { Star, MapPin } from 'lucide-react';

interface RebookCarouselProps {
  properties: Property[];
  onRebook?: (propertyId: string) => void;
}

export default function RebookCarousel({ properties, onRebook }: RebookCarouselProps) {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Your Favorite Properties</h3>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory">
        {properties.map((property) => (
          <Card key={property.id} className="min-w-[280px] sm:min-w-[320px] flex-shrink-0 hover:shadow-lg transition-shadow snap-start">
            <div className="relative h-48">
              <Image
                src={property.image}
                alt={property.name}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
            <CardContent className="p-4">
              <h4 className="font-bold text-lg mb-1 line-clamp-1">{property.name}</h4>
              <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                <MapPin className="h-3 w-3" />
                <span>{property.location}</span>
              </div>
              <div className="flex items-center gap-1 mb-3">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{property.rating}</span>
                <span className="text-xs text-gray-500">({property.reviewCount})</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold">{formatCurrency(property.pricePerNight)}</span>
                <span className="text-xs text-gray-500">per night</span>
              </div>
              <Button
                className="w-full"
                onClick={() => onRebook?.(property.id)}
              >
                Rebook Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

