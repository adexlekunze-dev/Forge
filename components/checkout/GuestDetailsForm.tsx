"use client"

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlertCircle, CheckCircle, Plus, Minus, Loader2, MapPin, Edit2, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatPhoneNumber, validateEmail, validatePhone } from '@/lib/utils';
import { getAllCountriesSorted, getCountryByPhoneCode, getCountryCodeByPhoneCode } from '@/lib/countries';
import { usePostcodeLookup } from '@/hooks/usePostcodeLookup';

interface GuestDetailsFormProps {
  guestName: string;
  email: string;
  phone: string;
  phoneCountryCode: string;
  country: string;
  postcode: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  county: string;
  adults: number;
  childrenCount: number;
  onGuestNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onPhoneCountryCodeChange: (code: string) => void;
  onCountryChange: (country: string) => void;
  onPostcodeChange: (postcode: string) => void;
  onAddressLine1Change: (line: string) => void;
  onAddressLine2Change: (line: string) => void;
  onCityChange: (city: string) => void;
  onCountyChange: (county: string) => void;
  onAdultsChange: (value: number) => void;
  onChildrenChange: (value: number) => void;
  emailTouched?: boolean;
  phoneTouched?: boolean;
  onContinue?: () => void;
  isValid?: boolean;
}

export default function GuestDetailsForm({
  guestName,
  email,
  phone,
  phoneCountryCode,
  country,
  postcode,
  addressLine1,
  addressLine2,
  city,
  county,
  adults,
  childrenCount,
  onGuestNameChange,
  onEmailChange,
  onPhoneChange,
  onPhoneCountryCodeChange,
  onCountryChange,
  onPostcodeChange,
  onAddressLine1Change,
  onAddressLine2Change,
  onCityChange,
  onCountyChange,
  onAdultsChange,
  onChildrenChange,
  emailTouched = false,
  phoneTouched = false,
  onContinue,
  isValid = false,
}: GuestDetailsFormProps) {
  const emailValid = email ? validateEmail(email).isValid : false;
  const phoneValid = phone ? validatePhone(phone, phoneCountryCode) : false;
  
  const { address, loading: postcodeLoading, error: postcodeError, lookupPostcode, clearAddress } = usePostcodeLookup();
  const countries = getAllCountriesSorted();
  const selectedCountryData = countries.find(c => c.name === country);
  const selectedPhoneCodeData = getCountryByPhoneCode(phoneCountryCode);
  
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [hasAddress, setHasAddress] = useState(false);

  // Handle postcode lookup result
  const handlePostcodeLookup = async () => {
    if (!postcode.trim()) return;
    await lookupPostcode(postcode);
  };

  // Auto-populate address fields when lookup succeeds
  useEffect(() => {
    if (address && address.line1) {
      onAddressLine1Change(address.line1);
      if (address.line2) {
        onAddressLine2Change(address.line2);
      }
      if (address.city) {
        onCityChange(address.city);
      }
      if (address.county) {
        onCountyChange(address.county);
      }
      if (address.postcode && address.postcode !== postcode) {
        onPostcodeChange(address.postcode);
      }
      setHasAddress(true);
      setIsEditingAddress(false);
    }
  }, [address]);

  const handleEditAddress = () => {
    setIsEditingAddress(true);
  };

  const handleSaveAddress = () => {
    if (addressLine1 && city && postcode && county) {
      setHasAddress(true);
      setIsEditingAddress(false);
    }
  };

  const handleRemoveAddress = () => {
    setHasAddress(false);
    setIsEditingAddress(false);
    onAddressLine1Change('');
    onAddressLine2Change('');
    onCityChange('');
    onCountyChange('');
    clearAddress();
  };

  // Handle phone country code change - link to country
  const handlePhoneCodeChange = (code: string) => {
    onPhoneCountryCodeChange(code);
    const countryCode = getCountryCodeByPhoneCode(code);
    if (countryCode) {
      const countryData = countries.find(c => c.code === countryCode);
      if (countryData) {
        onCountryChange(countryData.name);
      }
    }
  };

  // Handle country change - link to phone code
  const handleCountryChange = (countryName: string) => {
    onCountryChange(countryName);
    const countryData = countries.find(c => c.name === countryName);
    if (countryData) {
      onPhoneCountryCodeChange(countryData.phoneCode);
    }
  };

  return (
    <div className="space-y-4">
      {/* Guest name */}
      <div>
        <Label htmlFor="guestName">
          Lead guest name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="guestName"
          placeholder="John Smith"
          value={guestName}
          onChange={(e) => onGuestNameChange(e.target.value)}
          className="h-12 mt-2"
        />
      </div>

      {/* Email with inline validation */}
      <div>
        <Label htmlFor="email">
          Email address <span className="text-red-500">*</span>
        </Label>
        <div className="relative mt-2">
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className={`h-12 pr-10 ${
              emailTouched && !emailValid ? 'border-red-500' : 
              emailTouched && emailValid ? 'border-green-500' : ''
            }`}
          />
          {emailTouched && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {emailValid ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
            </div>
          )}
        </div>
        {emailTouched && !emailValid && (
          <p className="text-sm text-red-500 mt-1">Please enter a valid email address</p>
        )}
        {emailValid && (
          <p className="text-sm text-gray-600 mt-1">
            Confirmation will be sent to <strong>{email}</strong>
          </p>
        )}
      </div>

      {/* Phone with country code dropdown */}
      <div>
        <Label htmlFor="phone">
          Phone number <span className="text-red-500">*</span>
        </Label>
        <div className="flex gap-2 mt-2">
          <div className="w-full sm:w-48">
            <Select value={phoneCountryCode} onValueChange={handlePhoneCodeChange}>
              <SelectTrigger className="h-12">
                <SelectValue>
                  {selectedPhoneCodeData ? (
                    <span className="flex items-center gap-2">
                      {selectedPhoneCodeData.flag && <span>{selectedPhoneCodeData.flag}</span>}
                      <span>{selectedPhoneCodeData.phoneCode}</span>
                      <span className="hidden sm:inline text-gray-500">
                        {selectedPhoneCodeData.name}
                      </span>
                    </span>
                  ) : (
                    phoneCountryCode
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.phoneCode}>
                    <span className="flex items-center gap-2">
                      {country.flag && <span>{country.flag}</span>}
                      <span>{country.phoneCode}</span>
                      <span>{country.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 relative">
            <Input
              id="phone"
              type="tel"
              placeholder="123 456 7890"
              value={phone}
              onChange={(e) => {
                const formatted = formatPhoneNumber(e.target.value, phoneCountryCode);
                onPhoneChange(formatted);
              }}
              className={`h-12 ${
                phoneTouched && !phoneValid ? 'border-red-500' : 
                phoneTouched && phoneValid ? 'border-green-500' : ''
              }`}
            />
            {phoneTouched && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {phoneValid ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
            )}
          </div>
        </div>
        {phoneTouched && !phoneValid && (
          <p className="text-sm text-red-500 mt-1">Please enter a valid phone number</p>
        )}
      </div>

      {/* Country dropdown */}
      <div>
        <Label htmlFor="country">
          Country <span className="text-red-500">*</span>
        </Label>
        <Select value={country} onValueChange={handleCountryChange}>
          <SelectTrigger id="country" className="h-12 mt-2">
            <SelectValue>
              {selectedCountryData ? (
                <span className="flex items-center gap-2">
                  {selectedCountryData.flag && <span>{selectedCountryData.flag}</span>}
                  <span>{selectedCountryData.name}</span>
                </span>
              ) : (
                country
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            {countries.map((c) => (
              <SelectItem key={c.code} value={c.name}>
                <span className="flex items-center gap-2">
                  {c.flag && <span>{c.flag}</span>}
                  <span>{c.name}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Address section */}
      <div className="space-y-4 pt-2 border-t">
        <h3 className="text-lg font-semibold">Address</h3>
        
        {/* Postcode lookup */}
        <div>
          <Label htmlFor="postcode">
            Postcode <span className="text-red-500">*</span>
          </Label>
          <div className="flex gap-2 mt-2">
            <Input
              id="postcode"
              placeholder="SW1A 1AA"
              value={postcode}
              onChange={(e) => onPostcodeChange(e.target.value.toUpperCase())}
              className="h-12 flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handlePostcodeLookup();
                }
              }}
            />
            <Button
              type="button"
              onClick={handlePostcodeLookup}
              disabled={!postcode.trim() || postcodeLoading}
              className="h-12 px-4 sm:px-6"
            >
              {postcodeLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Find Address</span>
                  <span className="sm:hidden">Find</span>
                </>
              )}
            </Button>
          </div>
          {postcodeError && (
            <p className="text-sm text-red-500 mt-1">{postcodeError}</p>
          )}
        </div>

        {/* Display address if found */}
        {hasAddress && addressLine1 && (
          <div className="border-l-4 border-blue-500 pl-4 py-3 bg-gray-50 rounded-r">
            <div className="text-sm text-gray-700 space-y-1">
              <div>{addressLine1}</div>
              {addressLine2 && <div>{addressLine2}</div>}
              <div>{city}</div>
              {county && <div>{county}</div>}
              <div>{postcode}</div>
              <div className="font-medium mt-1">{country}</div>
            </div>
            <div className="flex gap-4 mt-3">
              <button
                type="button"
                onClick={handleEditAddress}
                className="text-sm text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
              >
                <Edit2 className="h-3 w-3" />
                Edit address
              </button>
              <button
                type="button"
                onClick={handleRemoveAddress}
                className="text-sm text-red-600 hover:text-red-800 underline flex items-center gap-1"
              >
                <X className="h-3 w-3" />
                Remove address
              </button>
            </div>
          </div>
        )}

        {/* Edit Address Modal */}
        <Dialog open={isEditingAddress} onOpenChange={setIsEditingAddress}>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Address</DialogTitle>
              <DialogDescription>
                Update your address details below
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {/* Address Line 1 */}
              <div>
                <Label htmlFor="modal-addressLine1">
                  Address Line 1 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="modal-addressLine1"
                  placeholder="Street address"
                  value={addressLine1}
                  onChange={(e) => onAddressLine1Change(e.target.value)}
                  className="h-12 mt-2"
                />
              </div>

              {/* Address Line 2 */}
              <div>
                <Label htmlFor="modal-addressLine2">Address Line 2 (optional)</Label>
                <Input
                  id="modal-addressLine2"
                  placeholder="Apartment, suite, etc."
                  value={addressLine2}
                  onChange={(e) => onAddressLine2Change(e.target.value)}
                  className="h-12 mt-2"
                />
              </div>

              {/* City */}
              <div>
                <Label htmlFor="modal-city">
                  City <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="modal-city"
                  placeholder="City"
                  value={city}
                  onChange={(e) => onCityChange(e.target.value)}
                  className="h-12 mt-2"
                />
              </div>

              {/* County */}
              <div>
                <Label htmlFor="modal-county">
                  County <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="modal-county"
                  placeholder="County"
                  value={county}
                  onChange={(e) => onCountyChange(e.target.value)}
                  className="h-12 mt-2"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  onClick={handleSaveAddress}
                  className="flex-1 h-12"
                  disabled={!addressLine1 || !city || !postcode || !county}
                >
                  Save Address
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditingAddress(false)}
                  className="flex-1 h-12"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Guest count with +/- controls */}
      <div>
        <Label>Number of guests</Label>
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mt-2">
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onAdultsChange(Math.max(1, adults - 1))}
              disabled={adults <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <div className="text-center min-w-[60px]">
              <div className="font-bold">{adults}</div>
              <div className="text-xs text-gray-600">Adults</div>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onAdultsChange(Math.min(10, adults + 1))}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onChildrenChange(Math.max(0, childrenCount - 1))}
              disabled={childrenCount <= 0}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <div className="text-center min-w-[60px]">
              <div className="font-bold">{childrenCount}</div>
              <div className="text-xs text-gray-600">Children</div>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onChildrenChange(Math.min(10, childrenCount + 1))}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Total: {adults + childrenCount} guests
        </p>
      </div>

      {onContinue && (
        <Button
          onClick={onContinue}
          disabled={!isValid}
          className="w-full h-12 mt-6"
        >
          Continue to Insurance →
        </Button>
      )}
    </div>
  );
}
