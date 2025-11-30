"use client"

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/useToast';
import CheckoutProgress from '@/components/checkout/CheckoutProgress';
import BookingSummary from '@/components/checkout/BookingSummary';
import GuestDetailsForm from '@/components/checkout/GuestDetailsForm';
import InsuranceStep from '@/components/checkout/InsuranceStep';
import CurrentStateMockup from '@/components/shared/CurrentStateMockup';
import BenchmarkCallout from '@/components/shared/BenchmarkCallout';
import { 
  CheckCircle, ChevronDown, ChevronUp, CreditCard, 
  Info, Lock, Plus, Minus
} from 'lucide-react';
import { mockCurrentBooking } from '@/lib/mockData';
import { formatDate, formatCardNumber, validateEmail, validatePhone } from '@/lib/utils';
import { getCountryCodeByPhoneCode, getPhoneCodeByCountryCode, getAllCountriesSorted, getCountryByCode } from '@/lib/countries';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function CheckoutPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  // Progress tracking
  const [currentStep, setCurrentStep] = useState(1);
  const [estimatedTime, setEstimatedTime] = useState(2);
  const [showCurrentState, setShowCurrentState] = useState(false);
  
  // Accordion state
  const [guestDetailsComplete, setGuestDetailsComplete] = useState(false);
  const [insuranceStepComplete, setInsuranceStepComplete] = useState(false);
  const [paymentDetailsComplete, setPaymentDetailsComplete] = useState(false);
  
  // Guest details
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneCountryCode, setPhoneCountryCode] = useState('+44');
  const [country, setCountry] = useState('United Kingdom');
  const [postcode, setPostcode] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [county, setCounty] = useState('');
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(2);
  
  // Form validation state
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  
  // Payment
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  
  // Insurance
  const [insuranceIncluded, setInsuranceIncluded] = useState(false);

  // Link phone code and country (prevent infinite loops with refs)
  const linkingRef = useRef({ phoneCode: false, country: false });
  
  useEffect(() => {
    if (linkingRef.current.phoneCode) {
      linkingRef.current.phoneCode = false;
      return;
    }
    const countryCode = getCountryCodeByPhoneCode(phoneCountryCode);
    if (countryCode) {
      // Find country name by code
      const countryData = getAllCountriesSorted().find((c) => c.code === countryCode);
      if (countryData && countryData.name !== country) {
        linkingRef.current.country = true;
        setCountry(countryData.name);
      }
    }
  }, [phoneCountryCode, country]);

  useEffect(() => {
    if (linkingRef.current.country) {
      linkingRef.current.country = false;
      return;
    }
    const countryCode = country === 'United Kingdom' ? 'GB' :
                        country === 'United States' ? 'US' :
                        country === 'Canada' ? 'CA' :
                        country === 'Australia' ? 'AU' :
                        country === 'New Zealand' ? 'NZ' : '';
    if (countryCode) {
      const countryData = getCountryByCode(countryCode);
      if (countryData && countryData.phoneCode !== phoneCountryCode) {
        linkingRef.current.phoneCode = true;
        setPhoneCountryCode(countryData.phoneCode);
      }
    }
  }, [country, phoneCountryCode]);

  // Check if guest details section is valid
  useEffect(() => {
    const emailValid = email ? validateEmail(email).isValid : false;
    const phoneValid = phone ? validatePhone(phone, phoneCountryCode) : false;
    const addressValid = addressLine1.trim().length > 0 && 
                         city.trim().length > 0 && 
                         postcode.trim().length > 0 &&
                         county.trim().length > 0;
    const isValid = 
      guestName.length > 0 &&
      emailValid &&
      phoneValid &&
      addressValid &&
      country.length > 0 &&
      (adults + childrenCount) > 0;
    setGuestDetailsComplete(isValid);
  }, [guestName, email, phone, phoneCountryCode, country, addressLine1, city, postcode, county, adults, childrenCount]);

  // Complete booking
  const handleCompleteBooking = () => {
    if (!guestDetailsComplete || !insuranceStepComplete || !paymentDetailsComplete) {
      toast({
        title: 'Please complete all required sections',
        variant: 'destructive',
      });
      return;
    }
    
    toast({
      title: 'Processing booking...',
      variant: 'info',
    });
    
    setTimeout(() => {
      toast({
        title: 'Booking confirmed! ✓',
        variant: 'success',
      });
      router.push('/dashboard');
    }, 2000);
  };

  const steps = [
    { number: 1, title: 'Guest Details' },
    { number: 2, title: 'Insurance' },
    { number: 3, title: 'Payment' },
    { number: 4, title: 'Confirmation' },
  ];

  // Current state mockup
  const currentState = (
    <CurrentStateMockup
      issues={[
        '9 required fields',
        'Confirm email (anti-pattern)',
        'No inline validation',
        'Hidden price breakdown',
        'Title dropdown (unnecessary)',
        'Country dropdown (200+ options)',
        'Insurance step lacks value proposition',
        'Text-heavy insurance presentation',
        'Unclear decision hierarchy',
        'No visual benefit cards',
      ]}
    >
      <div className="space-y-4">
        <div className="text-sm text-gray-600 mb-2">Step 1: Guest Details</div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-gray-500">
            Title (dropdown)
          </div>
          <div className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-gray-500">
            First name
          </div>
          <div className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-gray-500">
            Last name
          </div>
          <div className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-gray-500">
            Email
          </div>
          <div className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-gray-500">
            Confirm email
          </div>
          <div className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-gray-500">
            Phone
          </div>
          <div className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-gray-500">
            Country (200+ options)
          </div>
          <div className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-gray-500">
            Address
          </div>
          <div className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-gray-500">
            Postcode
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-2 mt-4">Step 2: Extras (Insurance)</div>
        <div className="bg-gray-100 border border-gray-300 rounded p-3 space-y-2">
          <div className="text-xs font-semibold text-gray-700">Travel insurance</div>
          <div className="text-xs text-gray-600">
            Protect your booking against unforeseen circumstances...
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 border border-gray-400 rounded"></div>
              <span className="text-gray-600">Add Insurance - £18.00</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 border border-gray-400 rounded"></div>
              <span className="text-gray-600">No, thanks</span>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            What&apos;s covered: Cancellation, Accidental damage, Personal Liability, Personal accidents
          </div>
          <div className="text-xs text-gray-500">
            What&apos;s not covered: Change of mind, Customers outside UK, Trips over 75 days, Deliberate damage
          </div>
        </div>
      </div>
    </CurrentStateMockup>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">
          Booking Checkout Optimization
        </h1>

        {/* Current State Mockup (Collapsible) */}
        <div className="bg-gray-100 p-4 rounded-lg mb-8">
          <button 
            onClick={() => setShowCurrentState(!showCurrentState)}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-lg font-bold text-gray-700">
              Current Sykes Checkout
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

        {/* Progress Header */}
        <CheckoutProgress
          currentStep={currentStep}
          totalSteps={4}
          steps={steps}
          estimatedTime={estimatedTime}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main content - 2 columns */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* SECTION 1: Guest Details (Accordion) */}
            <Card>
              <CardHeader 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => setCurrentStep(1)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                      guestDetailsComplete ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
                    }`}>
                      {guestDetailsComplete ? <CheckCircle className="h-4 w-4" /> : '1'}
                    </div>
                    <CardTitle>Guest Information</CardTitle>
                  </div>
                  {currentStep === 1 ? <ChevronUp /> : <ChevronDown />}
                </div>
              </CardHeader>
              
              {currentStep === 1 && (
                <CardContent>
                  <GuestDetailsForm
                    guestName={guestName}
                    email={email}
                    phone={phone}
                    phoneCountryCode={phoneCountryCode}
                    country={country}
                    postcode={postcode}
                    addressLine1={addressLine1}
                    addressLine2={addressLine2}
                    city={city}
                    county={county}
                    adults={adults}
                    childrenCount={childrenCount}
                    onGuestNameChange={setGuestName}
                    onEmailChange={(value) => {
                      setEmail(value);
                      setEmailTouched(true);
                    }}
                    onPhoneChange={(value) => {
                      setPhone(value);
                      setPhoneTouched(true);
                    }}
                    onPhoneCountryCodeChange={setPhoneCountryCode}
                    onCountryChange={setCountry}
                    onPostcodeChange={setPostcode}
                    onAddressLine1Change={setAddressLine1}
                    onAddressLine2Change={setAddressLine2}
                    onCityChange={setCity}
                    onCountyChange={setCounty}
                    onAdultsChange={setAdults}
                    onChildrenChange={setChildrenCount}
                    emailTouched={emailTouched}
                    phoneTouched={phoneTouched}
                    onContinue={() => {
                      if (guestDetailsComplete) {
                        setCurrentStep(2);
                        setEstimatedTime(2);
                      }
                    }}
                    isValid={guestDetailsComplete}
                  />
                </CardContent>
              )}
            </Card>

            {/* SECTION 2: Insurance */}
            <Card>
              <CardHeader 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => guestDetailsComplete && setCurrentStep(2)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                      !guestDetailsComplete ? 'bg-gray-300 text-gray-500' :
                      insuranceStepComplete ? 'bg-green-600 text-white' : 
                      'bg-blue-600 text-white'
                    }`}>
                      {insuranceStepComplete ? <CheckCircle className="h-4 w-4" /> : '2'}
                    </div>
                    <CardTitle className={!guestDetailsComplete ? 'text-gray-400' : ''}>
                      Travel Insurance
                    </CardTitle>
                  </div>
                  {currentStep === 2 ? <ChevronUp /> : <ChevronDown />}
                </div>
              </CardHeader>
              
              {currentStep === 2 && guestDetailsComplete && (
                <CardContent>
                  <InsuranceStep
                    bookingTotal={mockCurrentBooking.pricing.total}
                    insuranceIncluded={insuranceIncluded}
                    onInsuranceChange={(included) => {
                      setInsuranceIncluded(included);
                      setInsuranceStepComplete(true);
                    }}
                    onContinue={() => {
                      setInsuranceStepComplete(true);
                      setCurrentStep(3);
                      setEstimatedTime(1);
                    }}
                  />
                </CardContent>
              )}
            </Card>

            {/* SECTION 3: Payment (Accordion) */}
            <Card>
              <CardHeader 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => insuranceStepComplete && setCurrentStep(3)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                      !insuranceStepComplete ? 'bg-gray-300 text-gray-500' :
                      paymentDetailsComplete ? 'bg-green-600 text-white' : 
                      'bg-blue-600 text-white'
                    }`}>
                      {paymentDetailsComplete ? <CheckCircle className="h-4 w-4" /> : '3'}
                    </div>
                    <CardTitle className={!insuranceStepComplete ? 'text-gray-400' : ''}>
                      Payment Details
                    </CardTitle>
                  </div>
                  {currentStep === 3 ? <ChevronUp /> : <ChevronDown />}
                </div>
              </CardHeader>
              
              {currentStep === 3 && insuranceStepComplete && (
                <CardContent className="space-y-4">
                  {/* Payment method tabs */}
                  <div className="flex gap-2 border-b">
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`px-4 py-2 font-medium border-b-2 -mb-px ${
                        paymentMethod === 'card' 
                          ? 'border-blue-600 text-blue-600' 
                          : 'border-transparent text-gray-600'
                      }`}
                    >
                      <CreditCard className="h-4 w-4 inline mr-2" />
                      Credit Card
                    </button>
                    <button
                      onClick={() => setPaymentMethod('paypal')}
                      className={`px-4 py-2 font-medium border-b-2 -mb-px ${
                        paymentMethod === 'paypal' 
                          ? 'border-blue-600 text-blue-600' 
                          : 'border-transparent text-gray-600'
                      }`}
                    >
                      PayPal
                    </button>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          maxLength={19}
                          className="h-12 mt-2"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry date</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            maxLength={5}
                            className="h-12 mt-2"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="cvv" className="flex items-center gap-1">
                            CVV
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Info className="h-4 w-4 text-gray-400" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>3-digit security code on back of card</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            maxLength={3}
                            type="password"
                            className="h-12 mt-2"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="cardName">Name on card</Label>
                        <Input
                          id="cardName"
                          placeholder="John Smith"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          className="h-12 mt-2"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'paypal' && (
                    <div className="p-8 text-center bg-gray-50 rounded-lg">
                      <p className="text-gray-600 mb-4">
                        You will be redirected to PayPal to complete payment
                      </p>
                      <Button variant="outline">
                        Continue to PayPal
                      </Button>
                    </div>
                  )}

                  {/* Trust signals */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 pt-4 border-t">
                    <Lock className="h-4 w-4" />
                    <span>Secure payment · SSL encrypted</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="text-xs text-gray-500">We accept:</div>
                    <div className="flex gap-2 text-xs text-gray-600">
                      <span>💳 Visa</span>
                      <span>💳 Mastercard</span>
                      <span>💳 Amex</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      if (cardNumber && expiryDate && cvv && cardName) {
                        setPaymentDetailsComplete(true);
                        setCurrentStep(4);
                      }
                    }}
                    className="w-full h-12"
                  >
                    Complete Booking →
                  </Button>
                </CardContent>
              )}
            </Card>
          </div>

          {/* Sidebar - Booking Summary */}
          <div className="lg:col-span-1">
            <BookingSummary
              property={mockCurrentBooking.property}
              checkIn={formatDate(mockCurrentBooking.checkIn)}
              checkOut={formatDate(mockCurrentBooking.checkOut)}
              nights={mockCurrentBooking.nights}
              guests={{
                adults,
                children: childrenCount,
                total: adults + childrenCount,
              }}
              pricing={mockCurrentBooking.pricing}
              insuranceIncluded={insuranceIncluded}
              onEditDates={() => {
                toast({
                  title: 'Edit dates functionality',
                  variant: 'info',
                });
              }}
              onCompleteBooking={handleCompleteBooking}
              canComplete={guestDetailsComplete && insuranceStepComplete && paymentDetailsComplete}
            />
          </div>
        </div>

        <BenchmarkCallout
          title="Industry Benchmark"
          text="Baymard Institute: Transparent pricing (all fees shown upfront) reduces cart abandonment 18%. Trust signals increase checkout completion 12%. Single-page accordion design improves mobile conversion 25%. Inline validation reduces form errors 40%. Dedicated insurance steps with value-first messaging and clear decision hierarchy increase insurance uptake 35-50% compared to inline checkboxes."
          source="Baymard Institute, 2024; ConversionXL, 2024"
          expectedImpact={{
            checkoutCompletion: "+15%",
            mobileConversion: "+25%",
            cartAbandonment: "-18%",
            formErrors: "-40%",
            insuranceUptake: "+35-50%"
          }}
        />
      </div>
    </div>
  );
}

