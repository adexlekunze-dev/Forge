"use client"

import { CheckCircle } from 'lucide-react';

interface CheckoutProgressProps {
  currentStep: number;
  totalSteps: number;
  steps: { number: number; title: string }[];
  estimatedTime?: number;
}

export default function CheckoutProgress({
  currentStep,
  totalSteps,
  steps,
  estimatedTime,
}: CheckoutProgressProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">
          Booking: Forest View Cottage
        </h1>
        {estimatedTime && (
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Approximately {estimatedTime} minutes remaining
          </div>
        )}
      </div>
      
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-4">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className={`flex items-center gap-2 ${currentStep >= step.number ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= step.number ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                {currentStep > step.number ? <CheckCircle className="h-5 w-5" /> : step.number}
              </div>
              <span className="font-medium hidden sm:inline">{step.title}</span>
            </div>
            
            {index < steps.length - 1 && (
              <div className={`flex-1 h-1 mx-2 ${currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>Step {currentStep} of {totalSteps}</span>
      </div>
    </div>
  );
}



