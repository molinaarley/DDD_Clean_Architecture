/**
 * Converts a phone number to E.164 format
 * @param phone - The phone number to convert
 * @param countryCode - The country code (e.g., '+33', '+1')
 * @returns The phone number in E.164 format
 * 
 * TODO: Implement proper phone number validation and formatting
 * - Validate phone number format
 * - Handle different country formats
 * - Remove spaces, dashes, parentheses
 * - Add proper country code validation
 */
export function toE164(phone: string, countryCode: string): string {
  // Remove all non-digit characters except +
  const cleanedPhone = phone.replace(/[^\d+]/g, '');
  
  // If phone already starts with country code, return as is
  if (cleanedPhone.startsWith(countryCode)) {
    return cleanedPhone;
  }
  
  // Otherwise, prepend country code
  return `${countryCode}${cleanedPhone}`;
}

/**
 * Validates if a phone number is in correct format
 * @param phone - The phone number to validate
 * @param countryCode - The country code
 * @returns true if valid, false otherwise
 * 
 * TODO: Implement proper validation rules for different countries
 */
export function isValidPhoneNumber(phone: string, countryCode: string): boolean {
  // Basic validation - at least 8 digits
  const digitsOnly = phone.replace(/\D/g, '');
  return digitsOnly.length >= 8;
}
