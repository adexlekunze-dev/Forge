import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date formatting utilities - using date-fns for consistent server/client rendering
export function formatDate(date: Date | string): string {
  try {
    let d: Date;
    if (typeof date === 'string') {
      d = parseISO(date);
    } else {
      d = date;
    }
    // Validate date
    if (isNaN(d.getTime())) {
      return 'Invalid date';
    }
    return format(d, 'd MMM yyyy');
  } catch (error) {
    return 'Invalid date';
  }
}

export function formatDateLong(date: Date | string): string {
  try {
    let d: Date;
    if (typeof date === 'string') {
      d = parseISO(date);
    } else {
      d = date;
    }
    // Validate date
    if (isNaN(d.getTime())) {
      return 'Invalid date';
    }
    // Use consistent format without locale-dependent commas
    return format(d, 'EEEE d MMMM yyyy');
  } catch (error) {
    return 'Invalid date';
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount);
}

// Phone number formatting - country-aware
export function formatPhoneNumber(value: string, countryCode?: string): string {
  const cleaned = value.replace(/\D/g, '');
  
  // UK formatting (default)
  if (!countryCode || countryCode === 'GB' || countryCode === '+44') {
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 10)}`;
  }
  
  // US/Canada formatting (+1)
  if (countryCode === 'US' || countryCode === 'CA' || countryCode === '+1') {
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  }
  
  // Default: just return cleaned digits with basic spacing
  if (cleaned.length <= 4) return cleaned;
  if (cleaned.length <= 8) return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
  return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 8)} ${cleaned.slice(8, 12)}`;
}

// Card number formatting
export function formatCardNumber(value: string): string {
  const cleaned = value.replace(/\D/g, '');
  const groups = cleaned.match(/.{1,4}/g);
  return groups ? groups.join(' ') : cleaned;
}

// Email validation with typo detection
export function validateEmail(email: string): { isValid: boolean; suggestion?: string } {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);
  
  if (!isValid) {
    return { isValid: false };
  }
  
  // Check for common typos
  const domain = email.split('@')[1];
  const commonTypos: { [key: string]: string } = {
    'gmai.com': 'gmail.com',
    'gmial.com': 'gmail.com',
    'gmal.com': 'gmail.com',
    'yahooo.com': 'yahoo.com',
    'hotmial.com': 'hotmail.com',
    'hotmai.com': 'hotmail.com',
    'outlok.com': 'outlook.com',
    'outlok.co.uk': 'outlook.co.uk',
  };
  
  if (domain && commonTypos[domain]) {
    return { isValid: true, suggestion: commonTypos[domain] };
  }
  
  return { isValid: true };
}

// Phone validation - country-aware
export function validatePhone(phone: string, countryCode?: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  
  // UK validation (default)
  if (!countryCode || countryCode === 'GB' || countryCode === '+44') {
    return cleaned.length >= 10 && cleaned.length <= 11;
  }
  
  // US/Canada validation (+1)
  if (countryCode === 'US' || countryCode === 'CA' || countryCode === '+1') {
    return cleaned.length === 10;
  }
  
  // Australia
  if (countryCode === 'AU' || countryCode === '+61') {
    return cleaned.length === 9 || cleaned.length === 10;
  }
  
  // New Zealand
  if (countryCode === 'NZ' || countryCode === '+64') {
    return cleaned.length >= 8 && cleaned.length <= 10;
  }
  
  // Ireland
  if (countryCode === 'IE' || countryCode === '+353') {
    return cleaned.length >= 9 && cleaned.length <= 10;
  }
  
  // France
  if (countryCode === 'FR' || countryCode === '+33') {
    return cleaned.length === 9;
  }
  
  // Germany
  if (countryCode === 'DE' || countryCode === '+49') {
    return cleaned.length >= 10 && cleaned.length <= 12;
  }
  
  // Italy
  if (countryCode === 'IT' || countryCode === '+39') {
    return cleaned.length >= 9 && cleaned.length <= 11;
  }
  
  // Spain
  if (countryCode === 'ES' || countryCode === '+34') {
    return cleaned.length === 9;
  }
  
  // Default: flexible validation for other countries
  return cleaned.length >= 7 && cleaned.length <= 15;
}

// Calculate days between dates
export function daysBetween(date1: Date, date2: Date): number {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
}

// Generate random ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Calculate percentage
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.min(100, Math.round((value / total) * 100));
}

