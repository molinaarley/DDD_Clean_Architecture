// TODO: Implémenter les tests unitaires

import { validators } from '@/shared/utils/validators';

describe('Validators', () => {
  describe('email', () => {
    it('should validate correct email addresses', () => {
      expect(validators.email('test@example.com')).toBe(true);
      expect(validators.email('user.name@domain.co.uk')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(validators.email('invalid-email')).toBe(false);
      expect(validators.email('@domain.com')).toBe(false);
      expect(validators.email('user@')).toBe(false);
    });
  });

  describe('password', () => {
    it('should validate strong passwords', () => {
      const result = validators.password('Password123');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject weak passwords', () => {
      const result = validators.password('weak');
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('username', () => {
    it('should validate correct usernames', () => {
      const result = validators.username('user123');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject invalid usernames', () => {
      const result = validators.username('ab');
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });
});
