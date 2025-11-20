import '@testing-library/jest-dom';

const originalError = console.error;

const svgWarningPatterns = [
    'The tag <stop>',
    'The tag <linearGradient>',
    'The tag <defs>',
    '<linearGradient /> is using incorrect casing',
    '<stop /> is using incorrect casing',
    '<defs /> is using incorrect casing',
];

const errorSpy = jest.spyOn(console, 'error').mockImplementation((message?: any, ...optionalParams: any[]) => {
    const messageStr = String(message || '');
    const isSvgWarning = svgWarningPatterns.some(pattern => messageStr.includes(pattern));

    if (isSvgWarning) {
        return;
    }

    originalError(message, ...optionalParams);
});

afterAll(() => {
    errorSpy.mockRestore();
});

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
        back: jest.fn(),
        forward: jest.fn(),
        refresh: jest.fn(),
    }),
    usePathname: () => '/',
    useSearchParams: () => new URLSearchParams(),
    redirect: jest.fn(),
}));

jest.mock('next-themes', () => ({
    useTheme: () => ({
        theme: 'light',
        setTheme: jest.fn(),
        resolvedTheme: 'light',
        themes: ['light', 'dark', 'system'],
    }),
    ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('motion/react', () => {
    const React = require('react');
    return {
        motion: {
            div: ({ children, layout, initial, animate, exit, transition, ...props }: any) => {
                return React.createElement('div', props, children);
            },
        },
        AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    };
});

jest.mock('@sentry/nextjs', () => ({
    captureException: jest.fn(),
    init: jest.fn(),
}));
