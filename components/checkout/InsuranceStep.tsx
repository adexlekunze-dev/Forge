"use client"

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, X, ChevronDown, ChevronUp, Shield, Info } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import InsuranceDetailsModal from './InsuranceDetailsModal';

interface InsuranceStepProps {
  bookingTotal: number;
  insuranceIncluded: boolean;
  onInsuranceChange: (included: boolean) => void;
  onContinue: () => void;
}

const INSURANCE_PRICE = 6;

export default function InsuranceStep({
  bookingTotal,
  insuranceIncluded,
  onInsuranceChange,
  onContinue,
}: InsuranceStepProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Value Proposition Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
          <Shield className="h-4 w-4" />
          <span>Protect your {formatCurrency(bookingTotal)} booking for just {formatCurrency(INSURANCE_PRICE)}</span>
        </div>
      </div>

      {/* Insurance Card */}
      <Card className={`border-2 transition-all ${
        insuranceIncluded 
          ? 'border-green-500 bg-green-50' 
          : 'border-gray-200 hover:border-blue-300'
      }`}>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className={`h-6 w-6 ${insuranceIncluded ? 'text-green-600' : 'text-blue-600'}`} />
                  <h3 className="text-xl font-bold">Travel Insurance</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Protect your booking against unforeseen circumstances with our single trip travel insurance with no excess.
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(INSURANCE_PRICE)}
                </div>
                <p className="text-xs text-gray-500">No excess</p>
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t">
              {[
                { label: 'Cancellation', value: 'Up to £10,000' },
                { label: 'Accidental damage', value: 'Up to £25k' },
                { label: 'Personal Liability', value: 'Up to £2m' },
                { label: 'Personal accidents', value: 'Up to £15,000' },
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm">{benefit.label}</div>
                    <div className="text-xs text-gray-600">{benefit.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Expandable Details */}
            <div className="pt-4 border-t">
              <button
                type="button"
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center justify-between w-full text-left text-sm text-blue-600 hover:text-blue-800"
              >
                <span className="flex items-center gap-1">
                  <Info className="h-4 w-4" />
                  {showDetails ? 'Hide' : 'View'} full coverage details
                </span>
                {showDetails ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>

              {showDetails && (
                <div className="mt-4 space-y-4 text-sm">
                  {/* What's not covered */}
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2">What&apos;s not covered:</h4>
                    <ul className="space-y-1">
                      {[
                        'Cancellation due to change of mind',
                        'Customers outside of the UK',
                        'Trips that last over 75 days',
                        'Deliberate damage',
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <X className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Policy Documents Link */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="text-blue-600 hover:text-blue-800 underline text-sm"
                    >
                      View full policy documents and terms →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={() => {
            onInsuranceChange(true);
            onContinue();
          }}
          className="w-full h-12 text-lg font-bold bg-green-600 hover:bg-green-700"
          size="lg"
        >
          <CheckCircle2 className="h-5 w-5 mr-2" />
          Yes, add insurance - {formatCurrency(INSURANCE_PRICE)}
        </Button>
        
        <Button
          onClick={() => {
            onInsuranceChange(false);
            onContinue();
          }}
          variant="outline"
          className="w-full h-12 text-base"
          size="lg"
        >
          No thanks, continue to Payment →
        </Button>
      </div>

      {/* Trust Signals */}
      <div className="flex items-center justify-center gap-4 text-xs text-gray-600 pt-2">
        <div className="flex items-center gap-1">
          <Shield className="h-3 w-3 text-green-600" />
          <span>FCA Regulated</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3 text-green-600" />
          <span>No excess</span>
        </div>
        <div className="flex items-center gap-1">
          <Info className="h-3 w-3 text-blue-600" />
          <span>Instant coverage</span>
        </div>
      </div>

      {/* Insurance Details Modal */}
      <InsuranceDetailsModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
}

