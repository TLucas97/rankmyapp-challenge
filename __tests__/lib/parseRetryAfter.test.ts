
function parseRetryAfter(header?: string | null): number | null {
  if (!header) return null;

  const seconds = Number(header);
  if (!isNaN(seconds)) {
    return seconds * 1000;
  }

  const retryDate = new Date(header).getTime();
  const now = Date.now();
  if (!isNaN(retryDate)) {
    const diff = retryDate - now;
    return diff > 0 ? diff : 0;
  }

  return null;
}

describe('parseRetryAfter', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return null for undefined header', () => {
    expect(parseRetryAfter(undefined)).toBeNull();
  });

  it('should return null for null header', () => {
    expect(parseRetryAfter(null)).toBeNull();
  });

  it('should return null for empty string', () => {
    expect(parseRetryAfter('')).toBeNull();
  });

  it('should parse numeric seconds correctly', () => {
    expect(parseRetryAfter('5')).toBe(5000);
    expect(parseRetryAfter('10')).toBe(10000);
    expect(parseRetryAfter('60')).toBe(60000);
    expect(parseRetryAfter('0')).toBe(0);
  });

  it('should parse date strings correctly', () => {
    const now = new Date('2024-01-15T12:00:00Z');
    jest.setSystemTime(now);

    const futureDate = new Date('2024-01-15T12:00:05Z').toISOString();
    const result = parseRetryAfter(futureDate);
    expect(result).toBeGreaterThanOrEqual(4000);
    expect(result).toBeLessThanOrEqual(5000);
    expect(result).toBeLessThan(6000);
  });

  it('should return 0 for past dates', () => {
    const now = new Date('2024-01-15T12:00:00Z');
    jest.setSystemTime(now);

    const pastDate = new Date('2024-01-15T11:59:00Z').toISOString();
    expect(parseRetryAfter(pastDate)).toBe(0);
  });

  it('should return 0 for current date', () => {
    const now = new Date('2024-01-15T12:00:00Z');
    jest.setSystemTime(now);

    const currentDate = now.toISOString();
    expect(parseRetryAfter(currentDate)).toBe(0);
  });

  it('should handle invalid date strings', () => {
    expect(parseRetryAfter('invalid-date')).toBeNull();
    expect(parseRetryAfter('not-a-number')).toBeNull();
    expect(parseRetryAfter('abc123')).toBeNull();
  });

  it('should handle numeric strings that are not valid numbers', () => {
    expect(parseRetryAfter('NaN')).toBeNull();
    expect(parseRetryAfter('Infinity')).toBe(Infinity);
  });

  it('should handle decimal seconds correctly', () => {
    expect(parseRetryAfter('5.5')).toBe(5500);
    expect(parseRetryAfter('10.25')).toBe(10250);
  });

  it('should handle very large numbers', () => {
    expect(parseRetryAfter('999999')).toBe(999999000);
  });
});

