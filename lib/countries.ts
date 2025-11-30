export interface Country {
  code: string; // ISO 3166-1 alpha-2
  name: string;
  phoneCode: string; // with + prefix
  flag?: string; // emoji flag
}

// Comprehensive list of countries with phone codes
export const countries: Country[] = [
  { code: 'GB', name: 'United Kingdom', phoneCode: '+44', flag: '🇬🇧' },
  { code: 'US', name: 'United States', phoneCode: '+1', flag: '🇺🇸' },
  { code: 'CA', name: 'Canada', phoneCode: '+1', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', phoneCode: '+61', flag: '🇦🇺' },
  { code: 'NZ', name: 'New Zealand', phoneCode: '+64', flag: '🇳🇿' },
  { code: 'IE', name: 'Ireland', phoneCode: '+353', flag: '🇮🇪' },
  { code: 'FR', name: 'France', phoneCode: '+33', flag: '🇫🇷' },
  { code: 'DE', name: 'Germany', phoneCode: '+49', flag: '🇩🇪' },
  { code: 'IT', name: 'Italy', phoneCode: '+39', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', phoneCode: '+34', flag: '🇪🇸' },
  { code: 'NL', name: 'Netherlands', phoneCode: '+31', flag: '🇳🇱' },
  { code: 'BE', name: 'Belgium', phoneCode: '+32', flag: '🇧🇪' },
  { code: 'CH', name: 'Switzerland', phoneCode: '+41', flag: '🇨🇭' },
  { code: 'AT', name: 'Austria', phoneCode: '+43', flag: '🇦🇹' },
  { code: 'SE', name: 'Sweden', phoneCode: '+46', flag: '🇸🇪' },
  { code: 'NO', name: 'Norway', phoneCode: '+47', flag: '🇳🇴' },
  { code: 'DK', name: 'Denmark', phoneCode: '+45', flag: '🇩🇰' },
  { code: 'FI', name: 'Finland', phoneCode: '+358', flag: '🇫🇮' },
  { code: 'PL', name: 'Poland', phoneCode: '+48', flag: '🇵🇱' },
  { code: 'PT', name: 'Portugal', phoneCode: '+351', flag: '🇵🇹' },
  { code: 'GR', name: 'Greece', phoneCode: '+30', flag: '🇬🇷' },
  { code: 'CZ', name: 'Czech Republic', phoneCode: '+420', flag: '🇨🇿' },
  { code: 'HU', name: 'Hungary', phoneCode: '+36', flag: '🇭🇺' },
  { code: 'RO', name: 'Romania', phoneCode: '+40', flag: '🇷🇴' },
  { code: 'BG', name: 'Bulgaria', phoneCode: '+359', flag: '🇧🇬' },
  { code: 'HR', name: 'Croatia', phoneCode: '+385', flag: '🇭🇷' },
  { code: 'SI', name: 'Slovenia', phoneCode: '+386', flag: '🇸🇮' },
  { code: 'SK', name: 'Slovakia', phoneCode: '+421', flag: '🇸🇰' },
  { code: 'EE', name: 'Estonia', phoneCode: '+372', flag: '🇪🇪' },
  { code: 'LV', name: 'Latvia', phoneCode: '+371', flag: '🇱🇻' },
  { code: 'LT', name: 'Lithuania', phoneCode: '+370', flag: '🇱🇹' },
  { code: 'JP', name: 'Japan', phoneCode: '+81', flag: '🇯🇵' },
  { code: 'CN', name: 'China', phoneCode: '+86', flag: '🇨🇳' },
  { code: 'KR', name: 'South Korea', phoneCode: '+82', flag: '🇰🇷' },
  { code: 'IN', name: 'India', phoneCode: '+91', flag: '🇮🇳' },
  { code: 'SG', name: 'Singapore', phoneCode: '+65', flag: '🇸🇬' },
  { code: 'MY', name: 'Malaysia', phoneCode: '+60', flag: '🇲🇾' },
  { code: 'TH', name: 'Thailand', phoneCode: '+66', flag: '🇹🇭' },
  { code: 'PH', name: 'Philippines', phoneCode: '+63', flag: '🇵🇭' },
  { code: 'ID', name: 'Indonesia', phoneCode: '+62', flag: '🇮🇩' },
  { code: 'VN', name: 'Vietnam', phoneCode: '+84', flag: '🇻🇳' },
  { code: 'HK', name: 'Hong Kong', phoneCode: '+852', flag: '🇭🇰' },
  { code: 'TW', name: 'Taiwan', phoneCode: '+886', flag: '🇹🇼' },
  { code: 'AE', name: 'United Arab Emirates', phoneCode: '+971', flag: '🇦🇪' },
  { code: 'SA', name: 'Saudi Arabia', phoneCode: '+966', flag: '🇸🇦' },
  { code: 'IL', name: 'Israel', phoneCode: '+972', flag: '🇮🇱' },
  { code: 'TR', name: 'Turkey', phoneCode: '+90', flag: '🇹🇷' },
  { code: 'ZA', name: 'South Africa', phoneCode: '+27', flag: '🇿🇦' },
  { code: 'EG', name: 'Egypt', phoneCode: '+20', flag: '🇪🇬' },
  { code: 'NG', name: 'Nigeria', phoneCode: '+234', flag: '🇳🇬' },
  { code: 'KE', name: 'Kenya', phoneCode: '+254', flag: '🇰🇪' },
  { code: 'BR', name: 'Brazil', phoneCode: '+55', flag: '🇧🇷' },
  { code: 'MX', name: 'Mexico', phoneCode: '+52', flag: '🇲🇽' },
  { code: 'AR', name: 'Argentina', phoneCode: '+54', flag: '🇦🇷' },
  { code: 'CL', name: 'Chile', phoneCode: '+56', flag: '🇨🇱' },
  { code: 'CO', name: 'Colombia', phoneCode: '+57', flag: '🇨🇴' },
  { code: 'PE', name: 'Peru', phoneCode: '+51', flag: '🇵🇪' },
  { code: 'VE', name: 'Venezuela', phoneCode: '+58', flag: '🇻🇪' },
  { code: 'RU', name: 'Russia', phoneCode: '+7', flag: '🇷🇺' },
  { code: 'UA', name: 'Ukraine', phoneCode: '+380', flag: '🇺🇦' },
  { code: 'BY', name: 'Belarus', phoneCode: '+375', flag: '🇧🇾' },
  { code: 'KZ', name: 'Kazakhstan', phoneCode: '+7', flag: '🇰🇿' },
];

// Get country by country code
export function getCountryByCode(code: string): Country | undefined {
  return countries.find(c => c.code === code);
}

// Get country by phone code
export function getCountryByPhoneCode(phoneCode: string): Country | undefined {
  return countries.find(c => c.phoneCode === phoneCode);
}

// Get all countries with the same phone code (for shared codes like +1)
export function getCountriesByPhoneCode(phoneCode: string): Country[] {
  return countries.filter(c => c.phoneCode === phoneCode);
}

// Get all countries sorted alphabetically
export function getAllCountriesSorted(): Country[] {
  return [...countries].sort((a, b) => a.name.localeCompare(b.name));
}

// Get phone code by country code
export function getPhoneCodeByCountryCode(countryCode: string): string | undefined {
  const country = getCountryByCode(countryCode);
  return country?.phoneCode;
}

// Get country code by phone code (returns first match, or most common for shared codes)
export function getCountryCodeByPhoneCode(phoneCode: string): string | undefined {
  const countriesWithCode = getCountriesByPhoneCode(phoneCode);
  if (countriesWithCode.length === 0) return undefined;
  
  // For shared codes, prefer most common countries
  // +1: US is most common, then CA
  if (phoneCode === '+1') {
    const us = countriesWithCode.find(c => c.code === 'US');
    return us?.code || countriesWithCode[0].code;
  }
  
  // +7: Russia is most common, then KZ
  if (phoneCode === '+7') {
    const ru = countriesWithCode.find(c => c.code === 'RU');
    return ru?.code || countriesWithCode[0].code;
  }
  
  return countriesWithCode[0].code;
}

