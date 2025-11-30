"use client"

import { useState, useCallback } from 'react';

export interface PostcodeAddress {
  postcode: string;
  line1: string;
  line2?: string;
  city: string;
  county: string;
  country: string;
}

interface PostcodeLookupResult {
  address: PostcodeAddress | null;
  loading: boolean;
  error: string | null;
  lookupPostcode: (postcode: string) => Promise<void>;
  clearAddress: () => void;
}

export function usePostcodeLookup(): PostcodeLookupResult {
  const [address, setAddress] = useState<PostcodeAddress | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lookupPostcode = useCallback(async (postcode: string) => {
    // Clean postcode: remove spaces and convert to uppercase
    const cleanedPostcode = postcode.replace(/\s+/g, '').toUpperCase();
    
    // Basic UK postcode validation
    const ukPostcodeRegex = /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i;
    if (!ukPostcodeRegex.test(cleanedPostcode)) {
      setError('Please enter a valid UK postcode');
      setAddress(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Format postcode for API (with space if needed)
      const formattedPostcode = cleanedPostcode.length === 6 
        ? `${cleanedPostcode.slice(0, 3)} ${cleanedPostcode.slice(3)}`
        : cleanedPostcode;

      const response = await fetch(
        `https://api.postcodes.io/postcodes/${encodeURIComponent(formattedPostcode)}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          setError('Postcode not found. Please check and try again.');
        } else {
          setError('Unable to lookup postcode. Please try again.');
        }
        setAddress(null);
        setLoading(false);
        return;
      }

      const data = await response.json();

      if (data.status === 200 && data.result) {
        const result = data.result;
        
        // Build address line 1 from thoroughfare and premises
        let line1 = '';
        if (result.premises) {
          line1 = result.premises;
        }
        if (result.thoroughfare) {
          line1 = line1 ? `${line1} ${result.thoroughfare}` : result.thoroughfare;
        }
        if (!line1 && result.postcode) {
          // Fallback if no thoroughfare/premises
          line1 = result.postcode;
        }

        const addressData: PostcodeAddress = {
          postcode: result.postcode || formattedPostcode,
          line1: line1 || '',
          line2: result.dependent_thoroughfare || undefined,
          city: result.post_town || result.admin_ward || '',
          county: result.admin_county || result.admin_district || result.county || '',
          country: 'United Kingdom',
        };

        setAddress(addressData);
        setError(null);
      } else {
        setError('Postcode not found. Please check and try again.');
        setAddress(null);
      }
    } catch (err) {
      console.error('Postcode lookup error:', err);
      setError('Unable to lookup postcode. Please check your connection and try again.');
      setAddress(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearAddress = useCallback(() => {
    setAddress(null);
    setError(null);
  }, []);

  return {
    address,
    loading,
    error,
    lookupPostcode,
    clearAddress,
  };
}

