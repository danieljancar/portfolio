import { describe, expect, it } from 'vitest';
import { DEFAULT_DIM, dimFor } from '../src/lib/tone';

describe('dimFor', () => {
  it('leaves dark images alone', () => {
    expect(dimFor(0.1)).toBe(1);
    expect(dimFor(0.3)).toBe(1);
  });

  it('pulls bright images down, never below 0.65', () => {
    expect(dimFor(0.55)).toBe(0.75);
    expect(dimFor(0.95)).toBe(0.65);
  });

  it('falls back when brightness is unknown', () => {
    expect(dimFor(undefined)).toBe(DEFAULT_DIM);
  });
});
