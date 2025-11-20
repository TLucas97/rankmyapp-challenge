import { GHRepo } from '@/lib/gh/types';
import { aggregateLangStats } from '@/lib/utils';

describe('aggregateLangStats', () => {
  it('should return empty objects for empty repos array', () => {
    const result = aggregateLangStats([]);
    expect(result).toEqual({
      byLanguageCount: {},
      starsByLanguage: {},
    });
  });

  it('should count repositories by language', () => {
    const repos: GHRepo[] = [
      {
        id: 1,
        name: 'repo1',
        description: null,
        stargazers_count: 10,
        language: 'TypeScript',
        html_url: 'https://github.com/user/repo1',
        updated_at: '2024-01-01T00:00:00Z',
      },
      {
        id: 2,
        name: 'repo2',
        description: null,
        stargazers_count: 5,
        language: 'TypeScript',
        html_url: 'https://github.com/user/repo2',
        updated_at: '2024-01-01T00:00:00Z',
      },
      {
        id: 3,
        name: 'repo3',
        description: null,
        stargazers_count: 20,
        language: 'JavaScript',
        html_url: 'https://github.com/user/repo3',
        updated_at: '2024-01-01T00:00:00Z',
      },
    ];

    const result = aggregateLangStats(repos);
    expect(result.byLanguageCount).toEqual({
      TypeScript: 2,
      JavaScript: 1,
    });
  });

  it('should sum stars by language', () => {
    const repos: GHRepo[] = [
      {
        id: 1,
        name: 'repo1',
        description: null,
        stargazers_count: 10,
        language: 'TypeScript',
        html_url: 'https://github.com/user/repo1',
        updated_at: '2024-01-01T00:00:00Z',
      },
      {
        id: 2,
        name: 'repo2',
        description: null,
        stargazers_count: 5,
        language: 'TypeScript',
        html_url: 'https://github.com/user/repo2',
        updated_at: '2024-01-01T00:00:00Z',
      },
      {
        id: 3,
        name: 'repo3',
        description: null,
        stargazers_count: 20,
        language: 'JavaScript',
        html_url: 'https://github.com/user/repo3',
        updated_at: '2024-01-01T00:00:00Z',
      },
    ];

    const result = aggregateLangStats(repos);
    expect(result.starsByLanguage).toEqual({
      TypeScript: 15,
      JavaScript: 20,
    });
  });

  it('should handle repos with null language as "Other"', () => {
    const repos: GHRepo[] = [
      {
        id: 1,
        name: 'repo1',
        description: null,
        stargazers_count: 10,
        language: null,
        html_url: 'https://github.com/user/repo1',
        updated_at: '2024-01-01T00:00:00Z',
      },
      {
        id: 2,
        name: 'repo2',
        description: null,
        stargazers_count: 5,
        language: null,
        html_url: 'https://github.com/user/repo2',
        updated_at: '2024-01-01T00:00:00Z',
      },
    ];

    const result = aggregateLangStats(repos);
    expect(result.byLanguageCount).toEqual({
      Other: 2,
    });
    expect(result.starsByLanguage).toEqual({
      Other: 15,
    });
  });

  it('should handle repos with zero stars', () => {
    const repos: GHRepo[] = [
      {
        id: 1,
        name: 'repo1',
        description: null,
        stargazers_count: 0,
        language: 'TypeScript',
        html_url: 'https://github.com/user/repo1',
        updated_at: '2024-01-01T00:00:00Z',
      },
    ];

    const result = aggregateLangStats(repos);
    expect(result.starsByLanguage).toEqual({
      TypeScript: 0,
    });
  });

  it('should handle mixed languages and null languages', () => {
    const repos: GHRepo[] = [
      {
        id: 1,
        name: 'repo1',
        description: null,
        stargazers_count: 10,
        language: 'TypeScript',
        html_url: 'https://github.com/user/repo1',
        updated_at: '2024-01-01T00:00:00Z',
      },
      {
        id: 2,
        name: 'repo2',
        description: null,
        stargazers_count: 5,
        language: null,
        html_url: 'https://github.com/user/repo2',
        updated_at: '2024-01-01T00:00:00Z',
      },
      {
        id: 3,
        name: 'repo3',
        description: null,
        stargazers_count: 20,
        language: 'JavaScript',
        html_url: 'https://github.com/user/repo3',
        updated_at: '2024-01-01T00:00:00Z',
      },
    ];

    const result = aggregateLangStats(repos);
    expect(result.byLanguageCount).toEqual({
      TypeScript: 1,
      Other: 1,
      JavaScript: 1,
    });
    expect(result.starsByLanguage).toEqual({
      TypeScript: 10,
      Other: 5,
      JavaScript: 20,
    });
  });
});

