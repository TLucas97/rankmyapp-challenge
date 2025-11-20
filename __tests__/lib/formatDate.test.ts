function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'today';
  if (diffInDays === 1) return 'yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
}

describe('formatDate', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return "today" for dates from today', () => {
    const now = new Date('2024-01-15T12:00:00Z');
    jest.setSystemTime(now);

    const today = new Date('2024-01-15T10:00:00Z').toISOString();
    expect(formatDate(today)).toBe('today');
  });

  it('should return "yesterday" for dates from yesterday', () => {
    const now = new Date('2024-01-15T12:00:00Z');
    jest.setSystemTime(now);

    const yesterday = new Date('2024-01-14T12:00:00Z').toISOString();
    expect(formatDate(yesterday)).toBe('yesterday');
  });

  it('should return "X days ago" for dates within a week', () => {
    const now = new Date('2024-01-15T12:00:00Z');
    jest.setSystemTime(now);

    const threeDaysAgo = new Date('2024-01-12T12:00:00Z').toISOString();
    expect(formatDate(threeDaysAgo)).toBe('3 days ago');

    const sixDaysAgo = new Date('2024-01-09T12:00:00Z').toISOString();
    expect(formatDate(sixDaysAgo)).toBe('6 days ago');
  });

  it('should return "X weeks ago" for dates within a month', () => {
    const now = new Date('2024-01-15T12:00:00Z');
    jest.setSystemTime(now);

    const oneWeekAgo = new Date('2024-01-08T12:00:00Z').toISOString();
    expect(formatDate(oneWeekAgo)).toBe('1 weeks ago');

    const twoWeeksAgo = new Date('2024-01-01T12:00:00Z').toISOString();
    expect(formatDate(twoWeeksAgo)).toBe('2 weeks ago');

    const fourWeeksAgo = new Date('2023-12-18T12:00:00Z').toISOString();
    expect(formatDate(fourWeeksAgo)).toBe('4 weeks ago');
  });

  it('should return "X months ago" for dates within a year', () => {
    const now = new Date('2024-01-15T12:00:00Z');
    jest.setSystemTime(now);

    const oneMonthAgo = new Date('2023-12-15T12:00:00Z').toISOString();
    expect(formatDate(oneMonthAgo)).toBe('1 months ago');

    const sixMonthsAgo = new Date('2023-07-15T12:00:00Z').toISOString();
    expect(formatDate(sixMonthsAgo)).toBe('6 months ago');

    const elevenMonthsAgo = new Date('2023-02-15T12:00:00Z').toISOString();
    expect(formatDate(elevenMonthsAgo)).toBe('11 months ago');
  });

  it('should return "X years ago" for dates older than a year', () => {
    const now = new Date('2024-01-15T12:00:00Z');
    jest.setSystemTime(now);

    const oneYearAgo = new Date('2023-01-15T12:00:00Z').toISOString();
    expect(formatDate(oneYearAgo)).toBe('1 years ago');

    const twoYearsAgo = new Date('2022-01-15T12:00:00Z').toISOString();
    expect(formatDate(twoYearsAgo)).toBe('2 years ago');

    const fiveYearsAgo = new Date('2019-01-15T12:00:00Z').toISOString();
    expect(formatDate(fiveYearsAgo)).toBe('5 years ago');
  });

  it('should handle edge cases correctly', () => {
    const now = new Date('2024-01-15T12:00:00Z');
    jest.setSystemTime(now);

    const exactly7DaysAgo = new Date('2024-01-08T12:00:00Z').toISOString();
    expect(formatDate(exactly7DaysAgo)).toBe('1 weeks ago');

    const exactly30DaysAgo = new Date('2023-12-16T12:00:00Z').toISOString();
    expect(formatDate(exactly30DaysAgo)).toBe('1 months ago');

    const exactly365DaysAgo = new Date('2023-01-15T12:00:00Z').toISOString();
    expect(formatDate(exactly365DaysAgo)).toBe('1 years ago');
  });
});

