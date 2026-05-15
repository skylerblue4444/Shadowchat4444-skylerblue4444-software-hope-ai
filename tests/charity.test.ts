import { describe, it, expect } from 'vitest';
import { calculateImpact } from '../shared/trump-charity';
describe('Charity Impact Calculator', () => {
  it('calculates boosted impact correctly', () => {
    expect(calculateImpact(100, 2.5)).toBe(275);
  });
});