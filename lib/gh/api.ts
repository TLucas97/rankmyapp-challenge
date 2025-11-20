import * as Sentry from '@sentry/nextjs';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { buildMemoryStorage, setupCache } from 'axios-cache-interceptor';
import axiosRetry from 'axios-retry';

const baseApi = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        Accept: 'application/vnd.github+json',
        ...(process.env.GITHUB_TOKEN && {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        }),
    },
    timeout: 10000,
});

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

axiosRetry(baseApi, {
    retries: 3,

    retryDelay: (retryCount: number, error: any) => {
        const retryAfterHeader = error?.response?.headers?.['retry-after'];
        const retryAfterMs = parseRetryAfter(retryAfterHeader);

        if (retryAfterMs !== null) {
            console.warn(`[axios] Retry-After header detected: waiting ${retryAfterMs}ms`);
            return retryAfterMs;
        }

        const base = 500;
        const delay = base * Math.pow(2, retryCount - 1);

        return delay;
    },

    retryCondition: (error: any) => {
        if (error.code === 'ECONNABORTED') return true;
        if (!error.response) return true;

        const status = error.response.status;

        if (status >= 500 && status < 600) return true;
        if (status === 429) return true;

        return false;
    },

    onRetry: (retryCount: number, error: any, config: AxiosRequestConfig) => {
        return console.warn(
            `[axios] Retry ${retryCount} for ${config?.url} — reason: ${error?.response?.status || error?.message}`
        );
    },
});

baseApi.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        const status = error.response?.status;
        const shouldCapture =
            !status ||
            (status >= 500 && status < 600);

        if (shouldCapture) {
            Sentry.captureException(error, {
                tags: {
                    error_type: 'api_error',
                    api_endpoint: error.config?.url || 'unknown',
                },
                contexts: {
                    http: {
                        method: error.config?.method?.toUpperCase() || 'unknown',
                        url: error.config?.url || 'unknown',
                        status_code: error.response?.status,
                    },
                },
                extra: {
                    request_url: error.config?.url,
                    request_method: error.config?.method,
                    response_status: error.response?.status,
                    response_data: error.response?.data,
                },
            });
        }

        return Promise.reject(error);
    }
);

export const api = setupCache(baseApi, {
    storage: buildMemoryStorage(),

    ttl: 5 * 60 * 1000,

    interpretHeader: false,

    methods: ['get'],

    generateKey: (request) => {
        return `${request.method}:${request.baseURL}${request.url}`;
    },
});
