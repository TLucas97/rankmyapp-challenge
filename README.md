# RankMyApp GitHub Profile Insights Challenge

![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Bun](https://img.shields.io/badge/Bun-Latest-000000?style=flat-square&logo=bun)

## Table of Contents

- [How to Run the Project](#how-to-run-the-project)
- [Server-Side Architecture](#server-side-architecture-ssr-and-server-components)
- [State Management and Interactivity](#state-management-and-interactivity)
- [Performance and Optimizations](#performance-and-optimizations)
- [Error Handling and Monitoring](#error-handling-and-monitoring)
- [Data Visualization and UI](#data-visualization-and-ui)
- [Code Quality and Testing](#code-quality-and-testing)
- [Commit Workflow and Git Hooks](#commit-workflow-and-git-hooks)
- [DevOps and Deployment](#devops-and-deployment)
- [Requirements Checklist](#requirements-checklist)
- [Technologies and Tools](#technologies-and-tools)

## How to Run the Project

### Prerequisites

- [Bun](https://bun.sh/) installed (latest version recommended)
- Node.js 18+ (if not using Bun)
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd rankmyapp-challenge

# Install dependencies
bun install
```

### Development

```bash
# Start development server
bun run dev

# Or using Makefile
make setup
```

The project will be available at `http://localhost:3000`

### Production Build

```bash
# Build the project
bun run build

# Start production server
bun run start

# Or using Makefile
make prod
```

### Tests

```bash
# Run all tests
bun run test

# Run tests in watch mode
bun run test:watch

# Run tests with coverage
bun run test:coverage

# Or using Makefile (with coverage and verbose)
make test-full
```

### Docker

```bash
# Development with hot-reload
docker-compose up --build
# or
make docker-dev

# Build and run in production
make docker-build
make docker-prod
```

### Makefile

Available commands: `install`, `setup`, `prod`, `test-full`, `commit`, `lint`, `clean`, `setup-clean`, `docker-dev`, `docker-build`, `docker-prod`, `docker-stop`

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Optional: GitHub token to increase API rate limit
GITHUB_TOKEN=your_token_here

# Optional: Sentry configuration for error monitoring
NEXT_PUBLIC_SENTRY_DSN=your_dsn_here
SENTRY_ORG=your_org
SENTRY_PROJECT=your_project
```

**Note:** The project works without these variables, but it's recommended to configure `GITHUB_TOKEN` to avoid rate limiting during development.

## Server-Side Architecture (SSR and Server Components)

I designed the project architecture to maximize the use of Next.js Server Components, leveraging server-side rendering capabilities to their fullest and reducing JavaScript sent to the client.

### Architectural Decision: Server Components vs Server Actions

I chose to use **Server Components** instead of Server Actions because:

1. **Focus on Fetching**: The challenge is centered on data fetching and visualization, not complex mutations
2. **Performance**: Server Components allow direct server-side fetching, eliminating unnecessary round-trips
3. **SEO**: Server-side rendering ensures content is indexable by search engines
4. **Simplicity**: For read operations, Server Components are more straightforward and efficient

### Implementation

The main page (`app/p/[username]/page.tsx`) is a Server Component that performs parallel data fetching and server-side processing:

```typescript
const [user, repos] = await Promise.all([getUser(decodedUsername), getRepos(decodedUsername)]);

const { byLanguageCount, starsByLanguage } = aggregateLangStats(repos);
```

Data is fetched and processed on the server before HTML is sent, eliminating unnecessary JavaScript and improving performance and SEO.

### Dynamic Metadata

![Dynamic Metadata Preview](https://ik.imagekit.io/og7loqgh2/profile-metadata.png)

The `generateMetadata` function generates unique metadata for each profile, including:

- Dynamic title with username
- Custom description with user bio
- Open Graph tags for social media sharing
- Twitter Card metadata
- Dynamic OG images

This ensures optimized SEO and rich previews when sharing profile links on social platforms like Discord, Twitter, and LinkedIn.

`Server Components` `SSR` `Metadata API` `Parallel Fetching`

## State Management and Interactivity

The separation between Server and Client Components is strict: only components that require interactivity or hooks are marked as Client Components.

### Separation Strategy

**Server Components** (default):

- `app/p/[username]/page.tsx` - Main page
- `components/UserProfile/index.tsx` - Layout container
- `components/UserProfile/UserCard.tsx` - Static display

**Client Components** (only where necessary):

- `app/page.tsx` - Search form with state
- `components/UserProfile/ReposCard/index.tsx` - Real-time updates
- `components/UserProfile/ChartCard/*` - Interactive charts
- `components/Header/ModeToggle.tsx` - Theme toggle

### Navigation with useTransition

Search uses `useTransition` for non-blocking navigation, keeping the UI responsive.

### Mocked Real-time Updates

Implemented via `setInterval` with proper cleanup, realistic fake data generation, and smooth animations.

`Client Components` `useTransition` `State Management` `Animations`

## Performance and Optimizations

### Caching Strategy

In-memory caching with `axios-cache-interceptor`. Decision based on simplicity and suitability for the use case (GitHub data doesn't change frequently). Differentiated TTL: 10 minutes for profiles, 5 minutes for repositories.

### Intelligent Retry Logic

Retry with support for GitHub API's `Retry-After` header and exponential backoff as fallback. Automatically respects rate limits.

### Lazy Loading of Heavy Components

Charts loaded on demand with `React.lazy` and `Suspense`, reducing initial bundle and improving performance.

Loading states implemented with skeleton screens and appropriate fallbacks.

`Caching` `Retry Logic` `Lazy Loading` `Performance`

## Error Handling and Monitoring

A three-level strategy ensures that errors are handled appropriately in different contexts.

### Three-Level Strategy

1. **Level 1 - Try/Catch on Page**

    ```typescript
    try {
        const [user, repos] = await Promise.all([...]);
        return <UserProfile ... />;
    } catch (error) {
        redirect("/failed");
    }
    ```

2. **Level 2 - Dedicated Error Page**: Route `/failed` for fetching errors
3. **Level 3 - Global Error Boundary**: `app/global-error.tsx` with Sentry integration

### Decision: /failed Page is Sufficient

For this project, a dedicated error page is sufficient because:

- Only 2 main endpoints (getUser, getRepos)
- Errors are mainly from fetching (404, rate limit, etc.)
- More detailed tracking via Sentry covers edge cases

### Monitoring with Sentry

Errors are automatically captured via Axios interceptors and sent to Sentry for tracking.

`Error Handling` `Sentry` `Error Boundaries` `UX`

## Data Visualization and UI

### Charts with Recharts

I use **Recharts** for data visualization:

**Decision:** I chose Recharts for its native React integration, responsiveness, and theme support.

Two charts: Most Used Languages (Area Chart, top 8) and Total Stars by Language (Bar Chart, top 6). They use CSS variables for automatic theme adaptation.

### Design System with ShadCN/UI

Accessible and customizable components via Tailwind.

### Persistent Dark/Light Mode

Implemented with `next-themes`:

```typescript
<ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
>
```

Persistence via localStorage, system theme support, and smooth transitions.

### Responsiveness

Responsive layout with mobile-first approach and adaptive grid.

`Recharts` `ShadCN/UI` `Dark Mode` `Responsive`

## Code Quality and Testing

![Testing](https://ik.imagekit.io/og7loqgh2/test-results.png)

### Testing Structure

I use **Jest** + **React Testing Library**:

**Decision:** I found Jest + RTL sufficient for tests focused on user behavior with a 60% threshold.

Coverage configured with 60% threshold for branches, functions, lines, and statements.

Unit, component, and integration tests with appropriate API mocks and helper functions.

`Jest` `React Testing Library` `Coverage` `Testing`

## Commit Workflow and Git Hooks

This project uses **Commitizen** with **Husky** and **Commitlint** to enforce consistent commit messages following the [Conventional Commits](https://www.conventionalcommits.org/) specification and ensure code quality before commits.

### How to Commit

Instead of `git commit`, use Commitizen:

```bash
# Using npm/bun script
npm run commit
# or
bun run commit

# Using Makefile
make commit
# or
make c

# Or directly with Commitizen
npx cz
```

This launches an interactive prompt guiding you through:

- **Type**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`
- **Scope** (optional): Affected part of codebase
- **Description**: Brief summary and optional detailed explanation
- **Breaking changes** (optional): If any were introduced
- **Issues** (optional): Related issue references

### Quality Gates

**Pre-commit hook** (`.husky/pre-commit`) automatically runs:

1. **Lint-staged**: Formats staged files with Prettier
2. **Build validation**: Ensures project builds successfully
3. **Test execution**: Runs all tests with coverage

**Commit-msg hook** (`.husky/commit-msg`) validates commit message format using Commitlint.

If any check fails, the commit is aborted.

### Why This Setup?

- **Consistency**: Uniform commit format for readable, searchable git history
- **Automation**: Commit messages can be parsed for changelogs and version bumps
- **Quality**: Hooks ensure code is formatted, tested, and builds before commits
- **Collaboration**: Clear commit messages improve code reviews

`Commitizen` `Conventional Commits` `Husky` `Commitlint` `Git Hooks` `Code Quality`

## DevOps and Deployment

### Docker

Optimized Dockerfile with Bun and Docker Compose configured for development with hot-reload.

### GitHub Actions CI/CD

Configured workflow runs tests with coverage and validates build on each PR.

### Decision: Bun as Runtime

I chose it for its superior performance, npm compatibility, and better development experience.

### Production Deployment

![Deployment Architecture](https://ik.imagekit.io/og7loqgh2/deployments.png)

The application is deployed on **Easypanel**, running on a personal VPS server:

- **Platform**: [Easypanel](https://easypanel.io/) - Modern server control panel
- **Build Process**: Uses the production Dockerfile for containerized deployment
- **Auto-Deployment**: Configured via GitHub webhook for continuous deployment
- **Live URL**: [https://rankmyapp-challenge-tarcisio.uflm21.easypanel.host/](https://rankmyapp-challenge-tarcisio.uflm21.easypanel.host/)

Every push to the main branch triggers an automatic deployment, ensuring the live version is always up-to-date with the latest changes.

`Docker` `GitHub Actions` `CI/CD` `Bun` `Easypanel` `VPS`

## Requirements Checklist

### Mandatory Requirements

#### Features

- [x] **GitHub user search**
    - Search field that accepts username
    - Displays basic profile information
    - Endpoint: `https://api.github.com/users/{username}`

- [x] **Public repositories listing**
    - Endpoint: `https://api.github.com/users/{username}/repos`
    - Cards containing:
        - [x] Name
        - [x] Description
        - [x] Main language
        - [x] Number of stars
        - [x] Last update

- [x] **Insights charts**
    - [x] Most used languages (by repository count)
    - [x] Total stars by language
    - Library: Recharts

- [x] **Real-time updates (mocked)**
    - Simulation via `setInterval`
    - New repositories mocked every 30 seconds
    - Realistic fake data generation

- [x] **Dark/Light mode**
    - Persistent via localStorage
    - System theme support
    - Smooth transitions

#### Mandatory Tech Stack

- [x] **Next.js 14+** (16.0.3 with App Router)
- [x] **React 18+** (19.2.0)
- [x] **TypeScript**
- [x] **Tailwind CSS** + **ShadCN/UI**
- [x] **Axios** for HTTP calls
- [x] **Jest** + **React Testing Library** for tests
- [x] **ESLint** + **Prettier** configured
- [x] **SSR** implemented in `app/p/[username]/page.tsx`

### Implemented Differentials

- [x] **React Server Components**
    - Implemented in `app/p/[username]/page.tsx`
    - Server-side data fetching
    - Dynamic metadata for SEO

- [x] **Performance Optimizations**
    - [x] Lazy loading of heavy components (charts)
    - [x] Caching with axios-cache-interceptor
    - [x] Memoization via React.lazy and Suspense
    - [x] Loading states and skeleton screens
    - [x] Intelligent retry logic

- [x] **Docker Integration**
    - Optimized Dockerfile
    - Docker Compose for development
    - Multi-stage build

- [x] **GitHub Actions for automatic lint/test**
    - Workflow configured in `.github/workflows/deploy.yml`
    - Test execution with coverage
    - Build validation

- [x] **Technical Documentation**
    - Detailed README with architectural decisions
    - Explanation of each technical choice
    - Complete execution guide

### Not Implemented Differentials (with Justification)

- [ ] **Server Actions**
    - **Justification:** Not necessary for this use case. The challenge focuses on performant fetching, not data mutations. Server Components already adequately solve the necessary data flow.

## Technologies and Tools

### Core

- **[Next.js 16.0.3](https://nextjs.org/)** - React framework with App Router
- **[React 19.2.0](https://react.dev/)** - UI library
- **[TypeScript 5.0](https://www.typescriptlang.org/)** - Static typing
- **[Bun](https://bun.sh/)** - Runtime and package manager

### Styling

- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[ShadCN/UI](https://ui.shadcn.com/)** - Accessible components
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management

### Data Visualization

- **[Recharts 3.4.1](https://recharts.org/)** - React charting library

### HTTP and Cache

- **[Axios 1.13.2](https://axios-http.com/)** - HTTP client
- **[axios-cache-interceptor 1.8.3](https://axios-cache-interceptor.js.org/)** - Cache for Axios
- **[axios-retry 4.5.0](https://github.com/softonic/axios-retry)** - Retry logic

### Animations

- **[Motion 12.23.24](https://motion.dev/)** - Animation library (Framer Motion)

### Testing

- **[Jest 29.7.0](https://jestjs.io/)** - Testing framework
- **[React Testing Library 14.1.2](https://testing-library.com/react)** - Testing utilities
- **[@testing-library/jest-dom](https://github.com/testing-library/jest-dom)** - Custom matchers

### Code Quality

- **[ESLint 9](https://eslint.org/)** - Linter
- **[Prettier 3.6.2](https://prettier.io/)** - Code formatter
- **[Husky](https://typicode.github.io/husky/)** - Git hooks
- **[lint-staged](https://github.com/okonet/lint-staged)** - Lint staged files
- **[Commitizen](https://github.com/commitizen/cz-cli)** - Semantic commits

### Monitoring

- **[Sentry Next.js 8.0.0](https://sentry.io/for/nextjs/)** - Error tracking

### DevOps

- **[Docker](https://www.docker.com/)** - Containerization
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD

### Utilities

- **[lucide-react](https://lucide.dev/)** - Icons
- **[clsx](https://github.com/lukeed/clsx)** + **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - CSS utilities
- **[class-variance-authority](https://github.com/joe-bell/cva)** - Component variants
