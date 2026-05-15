import { describe, it, expect } from 'vitest';
import { MOCK_MINI_PROGRAMS } from '../shared/mini-programs';
describe('Mini-Programs', () => {
  it('should have 5 active programs', () => {
    expect(MOCK_MINI_PROGRAMS.length).toBe(5);
  });
});