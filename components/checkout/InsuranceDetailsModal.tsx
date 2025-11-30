"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ExternalLink } from 'lucide-react';

interface InsuranceDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function InsuranceDetailsModal({
  open,
  onOpenChange,
}: InsuranceDetailsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Travel Insurance Details</DialogTitle>
          <DialogDescription>
            Protect your booking against unforeseen circumstances
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Introduction */}
          <div>
            <p className="text-gray-700 leading-relaxed">
              Protect your booking against unforeseen circumstances with our single trip travel insurance with no excess.
            </p>
          </div>

          {/* What's covered */}
          <div>
            <h3 className="text-lg font-bold mb-3 text-green-700">What&apos;s covered:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-1">•</span>
                <div>
                  <span className="font-semibold">Cancellation</span>
                  <p className="text-sm text-gray-600">
                    Death, bodily injury or illness, as certified by a Medical Practitioner, up to the point of departure, up to £10,000.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-1">•</span>
                <div>
                  <span className="font-semibold">Accidental damage</span>
                  <p className="text-sm text-gray-600">
                    Accidental damage to your holiday accommodation, up to £25k.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-1">•</span>
                <div>
                  <span className="font-semibold">Personal Liability</span>
                  <p className="text-sm text-gray-600">
                    Personal Liability for any legal liability arising through causing bodily injury or loss to 3rd party property, up to £2m.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-1">•</span>
                <div>
                  <span className="font-semibold">Personal accidents</span>
                  <p className="text-sm text-gray-600">
                    Up to £15,000, dependent on age.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* What's not covered */}
          <div>
            <h3 className="text-lg font-bold mb-3 text-red-700">What&apos;s not covered:</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold mt-1">•</span>
                <span className="text-gray-700">Cancellation due to change of mind</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold mt-1">•</span>
                <span className="text-gray-700">Customers outside of the UK</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold mt-1">•</span>
                <span className="text-gray-700">Trips that last over 75 days</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold mt-1">•</span>
                <span className="text-gray-700">Deliberate damage</span>
              </li>
            </ul>
          </div>

          {/* Policy Documents */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-bold mb-3">Policy Documents:</h3>
            <p className="text-sm text-gray-600 mb-3">
              See our policy documents for further information about the level of cover.
            </p>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1 text-sm"
                  onClick={(e) => e.preventDefault()}
                >
                  Terms and Conditions
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1 text-sm"
                  onClick={(e) => e.preventDefault()}
                >
                  Status Disclosure Agreement
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1 text-sm"
                  onClick={(e) => e.preventDefault()}
                >
                  Insurance Product Information Document
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Alternative options */}
          <div className="border-t pt-4 bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Not the right level of cover?</h3>
            <p className="text-sm text-gray-700 mb-3">
              If we can&apos;t offer you the cover to meet your needs, or your premium is higher than you wanted because you have medical conditions, you may be able to get help by accessing the MoneyHelper travel directory at:
            </p>
            <div className="space-y-1 text-sm">
              <div>
                <a 
                  href="https://www.moneyhelper.org.uk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
                >
                  www.moneyhelper.org.uk
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div className="text-gray-700">
                <a href="tel:08001387777" className="text-blue-600 hover:text-blue-800 underline">
                  0800 138 7777
                </a>
                <span className="ml-2">(Open Monday to Friday, 8am to 6pm)</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

